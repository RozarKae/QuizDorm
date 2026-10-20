import { GeneratedQuestion, GeneratedOption } from "../ai/schemas/questionGenerationSchema";

export type IssueSeverity = "error" | "warning" | "info";

export interface ValidationIssue {
  code: string;
  field: "title" | "options" | "distractors" | "answer" | "metadata" | "explanation";
  severity: IssueSeverity;
  message: string;
  suggestedFix?: string;
}

export interface QuestionValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
  qualityScore: number;
  stemClarityScore: number;
  distractorHomogeneityScore: number;
  recommendedStatus: "approved" | "needs_improvement" | "rejected";
  summary: string;
}

export class QuestionIntelligenceValidator {
  /**
   * Run full multi-point pedagogical and structural validation
   */
  public static validate(question: Partial<GeneratedQuestion>): QuestionValidationResult {
    const issues: ValidationIssue[] = [];

    // 1. Stem & Context Validation
    const stemScore = this.validateStem(question, issues);

    // 2. Answer & Distractor Structural Validation
    this.validateOptionsStructure(question, issues);

    // 3. Duplicate Option Detection
    this.validateDuplicateOptions(question.options || [], issues);

    // 4. Categorical & Homogeneity Validation (The Misconception / Anti-Randomness Gate)
    const distractorScore = this.validateDistractorHomogeneity(question, issues);

    // 5. Option Rationales & Educational Value Validation
    this.validateEducationalExplanations(question, issues);

    // Calculate overall score (0 - 100)
    const errorCount = issues.filter((i) => i.severity === "error").length;
    const warningCount = issues.filter((i) => i.severity === "warning").length;

    let overallScore = Math.round(stemScore * 0.4 + distractorScore * 0.6);
    overallScore = Math.max(0, overallScore - errorCount * 20 - warningCount * 5);

    // CRITICAL REQUIREMENT: Never approve a question solely because numerical score is high!
    // Any error forces isValid = false and status != approved.
    const isValid = errorCount === 0;

    const FATAL_ERROR_CODES = new Set([
      "NO_CORRECT_ANSWER_DESIGNATED",
      "STEM_EMPTY",
      "STEM_CONTAINS_OCR_ARTIFACTS",
      "OPTIONS_EMPTY",
      "CATEGORICAL_YEAR_MISMATCH",
    ]);

    const hasFatalError = issues.some((i) => FATAL_ERROR_CODES.has(i.code));

    let recommendedStatus: "approved" | "needs_improvement" | "rejected";
    if (hasFatalError || errorCount > 2 || distractorScore < 40 || stemScore < 40) {
      recommendedStatus = "rejected";
    } else if (errorCount > 0 || warningCount > 2 || overallScore < 75) {
      recommendedStatus = "needs_improvement";
    } else {
      recommendedStatus = "approved";
    }

    const summary = isValid
      ? `Question passed all quality gates with score ${overallScore}/100. Status: ${recommendedStatus.toUpperCase()}.`
      : `Question failed validation with ${errorCount} error(s) and ${warningCount} warning(s). Status: ${recommendedStatus.toUpperCase()}.`;

    return {
      isValid,
      issues,
      qualityScore: overallScore,
      stemClarityScore: stemScore,
      distractorHomogeneityScore: distractorScore,
      recommendedStatus,
      summary,
    };
  }

  /**
   * Validate stem clarity, context, pronoun references, and text artifacts
   */
  private static validateStem(
    question: Partial<GeneratedQuestion>,
    issues: ValidationIssue[]
  ): number {
    let score = 100;
    const stem = (question.title || "").trim();

    if (!stem || stem.length === 0) {
      issues.push({
        code: "STEM_EMPTY",
        field: "title",
        severity: "error",
        message: "Question stem is missing or empty.",
        suggestedFix: "Provide a clear, self-contained question statement.",
      });
      return 0;
    }

    if (stem.length < 15) {
      issues.push({
        code: "STEM_TOO_SHORT",
        field: "title",
        severity: "error",
        message: `Question stem is too short (${stem.length} chars). It lacks context to test genuine understanding.`,
        suggestedFix: "Expand the stem to clearly define the problem or scenario.",
      });
      score -= 30;
    }

    // 1. Check for raw OCR / Page delimiter artifacts
    if (/<<<PAGE_\d+>>>/i.test(stem) || /PAGE_\d+/i.test(stem) || stem.includes("\f")) {
      issues.push({
        code: "STEM_CONTAINS_OCR_ARTIFACTS",
        field: "title",
        severity: "error",
        message: "Question stem contains raw document page delimiters (e.g. '<<<PAGE_...>>>').",
        suggestedFix: "Clean all OCR pagination markers from the text.",
      });
      score -= 40;
    }

    // 2. Check for orphan pronouns lacking antecedents (e.g. "Who is he?", "Where did it occur?")
    const orphanPronounPattern = /^(who\s+(?:is|was)\s+(?:he|she)|what\s+(?:is|was)\s+it|where\s+(?:did|is)\s+(?:it|they)|who\s+is\s+he\s+succeeding)\b/i;
    if (orphanPronounPattern.test(stem)) {
      issues.push({
        code: "STEM_ORPHAN_PRONOUN",
        field: "title",
        severity: "error",
        message: "Question stem relies on an orphan pronoun without naming the subject entity (e.g. 'Who is he?').",
        suggestedFix: "Name the specific entity, event, or person explicitly in the question stem.",
      });
      score -= 40;
    }

    // 3. Trailing punctuation check
    if (!/[.?!:]$/.test(stem)) {
      issues.push({
        code: "STEM_MISSING_PUNCTUATION",
        field: "title",
        severity: "warning",
        message: "Question stem does not end with standard punctuation (?, ., or :).",
        suggestedFix: "Append a question mark '?' to the end of the stem.",
      });
      score -= 10;
    }

    // 4. Lowercase start check
    if (/^[a-z]/.test(stem)) {
      issues.push({
        code: "STEM_LOWERCASE_START",
        field: "title",
        severity: "warning",
        message: "Question stem starts with a lowercase letter.",
        suggestedFix: "Capitalize the first letter of the question.",
      });
      score -= 10;
    }

    // 5. Negative phrasing check (should use uppercase NOT / EXCEPT for clarity)
    if (/\b(?:not|except|least|false)\b/.test(stem) && !/\b(?:NOT|EXCEPT|LEAST|FALSE)\b/.test(stem)) {
      issues.push({
        code: "NEGATIVE_STEM_UNEMPHASIZED",
        field: "title",
        severity: "info",
        message: "Negative question stem should capitalize 'NOT' or 'EXCEPT' to prevent misreading.",
        suggestedFix: "Capitalize negative keywords (e.g. 'Which of the following is NOT...').",
      });
    }

    // 6. Missing mathematical premise check: e.g. "Find the value of x" with no equation given
    if (
      /\b(?:find|solve\s+for|what\s+is\s+the\s+value\s+of)\s+[xyz]\b/i.test(stem) &&
      !stem.includes("=") &&
      !(question.context && question.context.includes("="))
    ) {
      issues.push({
        code: "MISSING_MATHEMATICAL_EQUATION",
        field: "title",
        severity: "error",
        message: "Question stem asks to solve for a variable without providing the underlying equation.",
        suggestedFix: "Provide the complete equation in the stem or context (e.g. 'Solve for x: 2x + 5 = 15').",
      });
      score -= 30;
    }

    return Math.max(0, score);
  }

  /**
   * Validate option counts, answer key assignments, and choice formats
   */
  private static validateOptionsStructure(
    question: Partial<GeneratedQuestion>,
    issues: ValidationIssue[]
  ): void {
    const options = question.options || [];
    const type = question.type || "mcq_single";

    // Handle Match Following format
    if (type === "match_following") {
      const pairs = question.matchingPairs || [];
      if (pairs.length < 2) {
        issues.push({
          code: "INSUFFICIENT_MATCHING_PAIRS",
          field: "options",
          severity: "error",
          message: `Matching question must have at least 2 pairs, found ${pairs.length}.`,
          suggestedFix: "Provide at least 2 matching pairs.",
        });
      }

      const leftItems = new Set<string>();
      const rightItems = new Set<string>();

      pairs.forEach((p, idx) => {
        if (!p.leftItem || p.leftItem.trim().length === 0) {
          issues.push({
            code: "EMPTY_MATCH_PAIR_LEFT",
            field: "options",
            severity: "error",
            message: `Matching pair #${idx + 1} has an empty left item.`,
            suggestedFix: "Provide a valid left item.",
          });
        } else {
          const normLeft = p.leftItem.trim().toLowerCase();
          if (leftItems.has(normLeft)) {
            issues.push({
              code: "DUPLICATE_MATCH_PAIR_LEFT",
              field: "options",
              severity: "error",
              message: `Duplicate left item found in pair #${idx + 1} ("${p.leftItem}"). Matches must be unambiguous.`,
              suggestedFix: "Ensure all left items are distinct.",
            });
          }
          leftItems.add(normLeft);
        }

        if (!p.rightItem || p.rightItem.trim().length === 0) {
          issues.push({
            code: "EMPTY_MATCH_PAIR_RIGHT",
            field: "options",
            severity: "error",
            message: `Matching pair #${idx + 1} has an empty right item.`,
            suggestedFix: "Provide a valid right item.",
          });
        } else {
          const normRight = p.rightItem.trim().toLowerCase();
          if (rightItems.has(normRight)) {
            issues.push({
              code: "DUPLICATE_MATCH_PAIR_RIGHT",
              field: "options",
              severity: "error",
              message: `Duplicate right item found in pair #${idx + 1} ("${p.rightItem}"). Matches must be unambiguous.`,
              suggestedFix: "Ensure all right items are distinct.",
            });
          }
          rightItems.add(normRight);
        }
      });

      return;
    }

    // Handle Fill in the Blank format
    if (type === "fill_in_the_blank") {
      const blanks = question.fillBlanks || [];
      const correctOpt = options.filter((o) => o.isCorrect);
      const validAnswers = [
        ...blanks.filter((b) => typeof b === "string" && b.trim().length > 0),
        ...correctOpt.map((o) => o.text.trim()),
      ];

      if (validAnswers.length === 0) {
        issues.push({
          code: "NO_CORRECT_ANSWER_DESIGNATED",
          field: "answer",
          severity: "error",
          message: "No accepted answer is designated for this fill-in-the-blank question.",
          suggestedFix: "Provide at least one accepted answer in fillBlanks or mark an option as correct.",
        });
      }

      const stem = (question.title || "").toLowerCase();
      const hasBlankIndicator =
        stem.includes("[blank]") ||
        stem.includes("___") ||
        stem.includes("fill in the blank") ||
        stem.includes("fill in") ||
        stem.includes("(blank)") ||
        stem.includes(".....");

      if (!hasBlankIndicator) {
        issues.push({
          code: "FILL_BLANK_MISSING_MARKER",
          field: "title",
          severity: "warning",
          message: "Fill in the blank question stem lacks an explicit placeholder (e.g. '[blank]' or '_____').",
          suggestedFix: "Insert '[blank]' or '_____' at the position where the missing word should be filled.",
        });
      }

      return;
    }

    // Handle Sequence Ordering format
    if (type === "sequence_ordering") {
      const items = question.sequenceItems || [];
      if (items.length < 2) {
        issues.push({
          code: "INSUFFICIENT_SEQUENCE_ITEMS",
          field: "options",
          severity: "error",
          message: `Sequence ordering question must have at least 2 steps, found ${items.length}.`,
          suggestedFix: "Provide at least 2 items to sequence.",
        });
      }
      return;
    }

    // Handle Drag and Drop Categorization format
    if (type === "drag_drop_categorize") {
      const categories = question.dragDropCategories || [];
      const items = question.dragDropItems || [];
      if (categories.length < 2) {
        issues.push({
          code: "INSUFFICIENT_DRAG_DROP_CATEGORIES",
          field: "options",
          severity: "error",
          message: `Drag & drop question must have at least 2 target categories, found ${categories.length}.`,
          suggestedFix: "Provide at least 2 categories.",
        });
      }
      if (items.length < 2) {
        issues.push({
          code: "INSUFFICIENT_DRAG_DROP_ITEMS",
          field: "options",
          severity: "error",
          message: `Drag & drop question must have at least 2 items to categorize, found ${items.length}.`,
          suggestedFix: "Provide at least 2 draggable items.",
        });
      }
      return;
    }

    if (options.length === 0) {
      issues.push({
        code: "OPTIONS_EMPTY",
        field: "options",
        severity: "error",
        message: "Question has no answer options defined.",
        suggestedFix: "Add answer options and mark the correct choice.",
      });
      return;
    }

    // Check option count
    if (type === "true_false") {
      if (options.length !== 2) {
        issues.push({
          code: "TRUE_FALSE_OPTION_COUNT_INVALID",
          field: "options",
          severity: "error",
          message: `True/False question must have exactly 2 options, found ${options.length}.`,
          suggestedFix: "Provide exactly two choices: 'True' and 'False'.",
        });
      }
    } else {
      if (options.length < 3) {
        issues.push({
          code: "INSUFFICIENT_OPTION_COUNT",
          field: "options",
          severity: "error",
          message: `Multiple choice question must have at least 3 options (found ${options.length}). Standard is 4.`,
          suggestedFix: "Add plausible distractors so the question has 4 options.",
        });
      } else if (options.length > 6) {
        issues.push({
          code: "EXCESSIVE_OPTION_COUNT",
          field: "options",
          severity: "warning",
          message: `Question has ${options.length} options. Standard multiple-choice should have 4 (max 5) options.`,
          suggestedFix: "Reduce options to the 4 best plausible choices.",
        });
      }
    }

    // Check correct answer counts
    const correctOptions = options.filter((o) => o.isCorrect);

    if (type === "mcq_single" || type === "true_false") {
      if (correctOptions.length === 0) {
        issues.push({
          code: "NO_CORRECT_ANSWER_DESIGNATED",
          field: "answer",
          severity: "error",
          message: "No correct answer is marked for this single-choice question.",
          suggestedFix: "Set isCorrect: true on exactly one option.",
        });
      } else if (correctOptions.length > 1) {
        issues.push({
          code: "MULTIPLE_CORRECT_ANSWERS_FOR_SINGLE_CHOICE",
          field: "answer",
          severity: "error",
          message: `Single-choice question has ${correctOptions.length} options marked correct.`,
          suggestedFix: "Ensure only one option is designated as correct, or change type to 'mcq_multiple'.",
        });
      }
    } else if (type === "mcq_multiple") {
      if (correctOptions.length === 0) {
        issues.push({
          code: "NO_CORRECT_ANSWER_DESIGNATED",
          field: "answer",
          severity: "error",
          message: "No correct answers are marked for this multi-select question.",
          suggestedFix: "Mark at least one option as correct.",
        });
      } else if (correctOptions.length === options.length) {
        issues.push({
          code: "ALL_OPTIONS_CORRECT_MULTI_SELECT",
          field: "answer",
          severity: "warning",
          message: "All options are marked correct in a multi-select item, removing discrimination power.",
          suggestedFix: "Include at least one incorrect distractor.",
        });
      }
    }

    // Check for empty option texts
    options.forEach((opt, idx) => {
      if (!opt.text || opt.text.trim().length === 0) {
        issues.push({
          code: "EMPTY_OPTION_TEXT",
          field: "options",
          severity: "error",
          message: `Option #${idx + 1} has empty text.`,
          suggestedFix: "Provide non-empty option text.",
        });
      }
    });
  }

  /**
   * Validate duplicate and near-duplicate options
   */
  private static validateDuplicateOptions(
    options: GeneratedOption[],
    issues: ValidationIssue[]
  ): void {
    if (options.length < 2) return;

    const seenNormalized = new Map<string, number>();

    options.forEach((opt, idx) => {
      const norm = opt.text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();

      if (norm.length > 0) {
        if (seenNormalized.has(norm)) {
          const firstIdx = seenNormalized.get(norm)!;
          issues.push({
            code: "DUPLICATE_OPTION_DETECTED",
            field: "options",
            severity: "error",
            message: `Option #${idx + 1} ("${opt.text}") is identical or near-identical to Option #${firstIdx + 1}.`,
            suggestedFix: "Replace duplicate choice with a distinct plausible distractor.",
          });
        } else {
          seenNormalized.set(norm, idx);
        }
      }
    });

    // Check for "4" vs "Four" overlapping numeric words
    const texts = options.map((o) => o.text.trim().toLowerCase());
    if (texts.includes("4") && texts.includes("four")) {
      issues.push({
        code: "OVERLAPPING_NUMERIC_OPTIONS",
        field: "options",
        severity: "error",
        message: "Options contain overlapping numeric representations ('4' and 'four').",
        suggestedFix: "Use a single formatting style and distinct values.",
      });
    }

    // Check for numerically equivalent options in different formats (e.g. '0.5' and '1/2', or '50%' and '0.5')
    const parsedValues: { index: number; text: string; value: number }[] = [];
    options.forEach((opt, idx) => {
      const val = this.parseNumericalValue(opt.text);
      if (val !== null) {
        parsedValues.push({ index: idx, text: opt.text, value: val });
      }
    });

    for (let i = 0; i < parsedValues.length; i++) {
      for (let j = i + 1; j < parsedValues.length; j++) {
        if (Math.abs(parsedValues[i].value - parsedValues[j].value) < 1e-6) {
          issues.push({
            code: "NUMERICALLY_EQUIVALENT_OPTIONS",
            field: "options",
            severity: "error",
            message: `Option #${parsedValues[i].index + 1} ("${parsedValues[i].text}") and Option #${parsedValues[j].index + 1} ("${parsedValues[j].text}") are mathematically equivalent (${parsedValues[i].value}).`,
            suggestedFix: "Ensure all numerical options represent distinct mathematical quantities.",
          });
        }
      }
    }

    // Check for synonymous / interchangeable options that create multiple defensible answers
    const SYNONYM_PAIRS = [
      ["water", "h2o"],
      ["speed of light", "velocity of light"],
      ["atp", "adenosine triphosphate"],
      ["dna", "deoxyribonucleic acid"],
      ["table salt", "sodium chloride"],
      ["nacl", "sodium chloride"],
    ];

    const lowerTexts = options.map((o) => (o.text || "").trim().toLowerCase());
    for (const [synA, synB] of SYNONYM_PAIRS) {
      const idxA = lowerTexts.findIndex((t) => t === synA || t.includes(synA));
      const idxB = lowerTexts.findIndex((t) => t === synB || t.includes(synB));
      if (idxA !== -1 && idxB !== -1 && idxA !== idxB) {
        issues.push({
          code: "SYNONYMOUS_DEFENSIBLE_OPTIONS",
          field: "options",
          severity: "error",
          message: `Options #${idxA + 1} ("${options[idxA].text}") and #${idxB + 1} ("${options[idxB].text}") are conceptually or chemically synonymous, creating multiple defensible choices.`,
          suggestedFix: "Replace one of the synonymous choices with a distinct conceptual distractor.",
        });
      }
    }
  }

  /**
   * Helper to parse numerical value from fractions, decimals, integers, and percentages
   */
  private static parseNumericalValue(raw: string): number | null {
    if (!raw) return null;
    const text = raw.trim().toLowerCase();

    // Fraction: e.g. "1/2", "3/4", "5/10"
    const fractionMatch = text.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
    if (fractionMatch) {
      const num = parseFloat(fractionMatch[1]);
      const den = parseFloat(fractionMatch[2]);
      if (den !== 0) return num / den;
    }

    // Percentage: e.g. "50%", "25.5%"
    const percentMatch = text.match(/^(\d+(?:\.\d+)?)\s*%$/);
    if (percentMatch) {
      return parseFloat(percentMatch[1]) / 100;
    }

    // Standard decimal or integer with optional commas: e.g. "1,000", "0.5", "-42"
    const cleanNumber = text.replace(/,/g, "");
    if (/^-?\d+(?:\.\d+)?$/.test(cleanNumber)) {
      const parsed = parseFloat(cleanNumber);
      return isNaN(parsed) ? null : parsed;
    }

    return null;
  }

  /**
   * Deep categorical homogeneity check: Ensures options belong to the same semantic category.
   * Prevents questions like:
   * "UPSC established in which year?" -> [1926, Amar Preet Singh, 3D concrete project, Four]
   */
  private static validateDistractorHomogeneity(
    question: Partial<GeneratedQuestion>,
    issues: ValidationIssue[]
  ): number {
    let score = 100;
    const type = question.type || "mcq_single";
    if (
      type === "match_following" ||
      type === "fill_in_the_blank" ||
      type === "sequence_ordering" ||
      type === "drag_drop_categorize"
    ) {
      return score;
    }

    const options = question.options || [];
    if (options.length < 2) return score;

    const correctOpt = options.find((o) => o.isCorrect);
    if (!correctOpt) return score;

    const correctText = correctOpt.text.trim();
    const distractors = options.filter((o) => !o.isCorrect);

    // 1. "All/None of the above" check
    const hasAllNone = options.some((o) => {
      const t = o.text.toLowerCase();
      return (
        t.includes("all of the above") ||
        t.includes("none of the above") ||
        t.includes("all the above") ||
        t.includes("both a and b")
      );
    });
    if (hasAllNone) {
      issues.push({
        code: "AVOID_ALL_OR_NONE_ABOVE",
        field: "distractors",
        severity: "warning",
        message: "Avoid using 'All of the above' or 'None of the above'. It degrades diagnostic value.",
        suggestedFix: "Replace with specific conceptual alternatives.",
      });
      score -= 15;
    }

    // 2. Year Homogeneity Check
    // e.g. "1926" or "2026"
    const isYear = /^\b(1[789]\d\d|20\d\d)\b$/.test(correctText);
    if (isYear) {
      const correctYear = parseInt(correctText, 10);
      distractors.forEach((d, dIdx) => {
        const dText = d.text.trim();
        const dIsYear = /^\b(1[789]\d\d|20\d\d)\b$/.test(dText);

        if (!dIsYear) {
          issues.push({
            code: "CATEGORICAL_YEAR_MISMATCH",
            field: "distractors",
            severity: "error",
            message: `Correct answer is a historical year ('${correctText}'), but Distractor #${dIdx + 1} ('${dText}') is not a year.`,
            suggestedFix: "All distractors must be plausible 4-digit years within the same era.",
          });
          score -= 30;
        } else {
          const dYear = parseInt(dText, 10);
          if (Math.abs(dYear - correctYear) > 75) {
            issues.push({
              code: "TEMPORAL_OUTLIER_DISTRACTOR",
              field: "distractors",
              severity: "warning",
              message: `Distractor year '${dYear}' is chronologically far from '${correctYear}' (>75 years apart).`,
              suggestedFix: "Use plausible years within the same historical decade or century.",
            });
            score -= 10;
          }
        }
      });
    }

    // 3. Numerical & Unit Homogeneity Check
    // e.g. "128 km", "375", "4", "30%", "$500"
    const numberUnitMatch = correctText.match(/^([$€£₹]?)\s*([\d,.]+)\s*([a-zA-Z/%]*)$/);
    if (numberUnitMatch && !isYear) {
      const [, correctPrefix, correctNumStr, correctUnit] = numberUnitMatch;
      const hasUnit = Boolean(correctPrefix || correctUnit);

      distractors.forEach((d, dIdx) => {
        const dText = d.text.trim();
        const dMatch = dText.match(/^([$€£₹]?)\s*([\d,.]+)\s*([a-zA-Z/%]*)$/);

        if (!dMatch) {
          // Correct answer is a pure number or quantity, but distractor is descriptive prose
          issues.push({
            code: "CATEGORICAL_NUMERICAL_MISMATCH",
            field: "distractors",
            severity: "error",
            message: `Correct answer is a numerical quantity ('${correctText}'), but Distractor #${dIdx + 1} ('${dText}') is a text phrase.`,
            suggestedFix: "All distractors must be numerical values of the same unit/magnitude.",
          });
          score -= 30;
        } else if (hasUnit) {
          const [, dPrefix, , dUnit] = dMatch;
          const CALENDAR_MONTHS = new Set([
            "january", "february", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december"
          ]);
          const isDateUnit = CALENDAR_MONTHS.has(correctUnit.toLowerCase());
          const isDDateUnit = CALENDAR_MONTHS.has(dUnit.toLowerCase());
          const isOrdinalUnit = ["st", "nd", "rd", "th"].includes(correctUnit.toLowerCase());
          const isDOrdinalUnit = ["st", "nd", "rd", "th"].includes(dUnit.toLowerCase());

          // Distractors sharing calendar month category or ordinal ranking category are homogeneous
          const isCategoryCompatible = (isDateUnit && isDDateUnit) || (isOrdinalUnit && isDOrdinalUnit);

          if (!isCategoryCompatible && (dPrefix.toLowerCase() !== correctPrefix.toLowerCase() || dUnit.toLowerCase() !== correctUnit.toLowerCase())) {
            issues.push({
              code: "UNIT_INCONSISTENCY_DISTRACTOR",
              field: "distractors",
              severity: "error",
              message: `Correct answer unit ('${correctPrefix}${correctUnit}') does not match distractor unit ('${dPrefix}${dUnit}').`,
              suggestedFix: `Ensure all choices use '${correctPrefix}${correctUnit}'.`,
            });
            score -= 20;
          }
        }
      });
    }

    // 4. Person Name vs Object / Program Mismatch
    // Check if correct answer is a Person's Name (e.g. "Ashutosh Dixit", "Air Chief Marshal Amar Preet Singh")
    const isPersonTitle = /^(?:Air\s+Chief\s+Marshal|Air\s+Marshal|General|Admiral|Dr\.|Prof\.|President|Prime\s+Minister|Justice)\s+[A-Z]/i.test(correctText);
    const isPersonName = isPersonTitle || /^[A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?$/.test(correctText);

    if (isPersonName && correctText.length < 40) {
      distractors.forEach((d, dIdx) => {
        const dText = d.text.trim();
        // If distractor is a number, date, or long sentence, flag mismatch
        if (/^\d+$/.test(dText) || /^\d+\s+[A-Za-z]+\s+\d+/.test(dText) || dText.includes("project") || dText.includes("scheme") || dText.includes("Security")) {
          issues.push({
            code: "CATEGORICAL_PERSON_MISMATCH",
            field: "distractors",
            severity: "error",
            message: `Correct answer is a person ('${correctText}'), but Distractor #${dIdx + 1} ('${dText}') appears to be a date, number, or organization/scheme.`,
            suggestedFix: "Provide plausible alternative individual names in the same domain.",
          });
          score -= 30;
        }
      });
    }

    // 5. Length Balance Check (Allows natural variance, but flags extreme outliers)
    const lengths = options.map((o) => o.text.trim().length);
    const avgDistractorLength =
      distractors.reduce((acc, d) => acc + d.text.length, 0) / (distractors.length || 1);

    if (correctOpt.text.length > avgDistractorLength * 2.5 && correctOpt.text.length > 50) {
      issues.push({
        code: "CORRECT_ANSWER_EXCESSIVELY_DETAILED",
        field: "answer",
        severity: "warning",
        message: "The correct answer is more than 2.5x longer than the distractors, providing an unintentional clue.",
        suggestedFix: "Balance the level of detail across all choices.",
      });
      score -= 10;
    }

    return Math.max(0, score);
  }

  /**
   * Validate that explanations and rationales exist for learning feedback
   */
  private static validateEducationalExplanations(
    question: Partial<GeneratedQuestion>,
    issues: ValidationIssue[]
  ): void {
    if (!question.generalExplanation || question.generalExplanation.trim().length < 15) {
      issues.push({
        code: "MISSING_GENERAL_EXPLANATION",
        field: "explanation",
        severity: "warning",
        message: "Question lacks a comprehensive master solution explanation.",
        suggestedFix: "Provide a detailed step-by-step educational breakdown.",
      });
    }

    const options = question.options || [];
    const missingOptionExplanations = options.filter(
      (o) => !o.explanation || o.explanation.trim().length < 5
    );

    if (missingOptionExplanations.length > 0) {
      issues.push({
        code: "MISSING_DISTRACTOR_RATIONALES",
        field: "distractors",
        severity: "warning",
        message: `${missingOptionExplanations.length} option(s) lack specific educational explanations detailing why they are correct or incorrect.`,
        suggestedFix: "Include individual rationale for every option.",
      });
    }
  }
}
