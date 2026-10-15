import { GeneratedQuestion } from "../lib/ai/schemas/questionGenerationSchema";
import { QuestionIntelligenceValidator } from "../lib/quality/questionIntelligenceValidator";

export interface EvaluationItem {
  id: string;
  categoryName: string;
  topic: string;
  gradeLevel: string;
  bloomsLevel: string;
  difficulty: string;
  timeSensitive: boolean;
  referenceDate?: string;
  authoritativeSource?: string;
  question: GeneratedQuestion;
}

export const BENCHMARK_EVALUATION_DATASET: EvaluationItem[] = [
  {
    id: "eval-01-gk-affairs",
    categoryName: "1. General Knowledge & Current Affairs",
    topic: "International Sports Events & Governance",
    gradeLevel: "Grade 9-10",
    bloomsLevel: "Remember",
    difficulty: "Medium",
    timeSensitive: true,
    referenceDate: "2026-10-14",
    authoritativeSource: "Olympic Council of Asia (OCA) Official Host City Contract & Aichi-Nagoya 2026 Organizing Committee",
    question: {
      title: "Which country and metropolitan region are designated to host the 20th Asian Games in 2026?",
      type: "mcq_single",
      subject: "Current Affairs & Sports",
      category: "International Affairs",
      topic: "Asian Games 2026",
      subtopic: "Host City Selection",
      gradeLevel: "Grade 9-10",
      learningObjective: "Identify the host nation and organizing prefecture for major international sporting championships.",
      bloomsLevel: "Remember",
      difficulty: "Medium",
      options: [
        {
          id: "opt-1",
          text: "Japan (Aichi Prefecture and Nagoya City)",
          isCorrect: true,
          explanation: "The Olympic Council of Asia unanimously selected Aichi Prefecture and its capital city Nagoya, Japan to host the 2026 Asian Games.",
        },
        {
          id: "opt-2",
          text: "Qatar (Doha Municipality)",
          isCorrect: false,
          explanation: "Doha hosted the 2006 Asian Games and is scheduled to host the 2030 Asian Games, not 2026.",
          misconceptionType: "chronological_confusion",
        },
        {
          id: "opt-3",
          text: "Saudi Arabia (Riyadh Province)",
          isCorrect: false,
          explanation: "Riyadh is scheduled to host the 2034 Asian Games, not the 2026 edition.",
          misconceptionType: "chronological_confusion",
        },
        {
          id: "opt-4",
          text: "South Korea (Incheon Metropolitan City)",
          isCorrect: false,
          explanation: "Incheon hosted the 17th Asian Games in 2014.",
          misconceptionType: "past_host_confusion",
        },
      ],
      generalExplanation: "The 2026 Asian Games (XX Asiad) are scheduled to be held in Aichi Prefecture and Nagoya, Japan. The event returns to Japan for the third time following Tokyo 1958 and Hiroshima 1994.",
      hints: ["The host nation previously staged the games in Hiroshima (1994)."],
      tags: ["sports", "asian-games", "current-affairs", "japan"],
    },
  },
  {
    id: "eval-02-history-geo",
    categoryName: "2. History & Geography",
    topic: "Modern Indian History & Constitutional Development",
    gradeLevel: "Grade 11-12",
    bloomsLevel: "Understand",
    difficulty: "Medium",
    timeSensitive: false,
    authoritativeSource: "Section 96C Government of India Act 1919; Report of the Royal Commission on Superior Civil Services in India (Lee Commission, 1924)",
    question: {
      title: "Pursuant to the recommendations of the 1924 Lee Commission, in which year was the Public Service Commission of India first established?",
      type: "mcq_single",
      subject: "History",
      category: "Indian Constitutional History",
      topic: "Civil Services Evolution",
      subtopic: "Lee Commission & UPSC Precursor",
      gradeLevel: "Grade 11-12",
      learningObjective: "Recall and comprehend the institutional timeline of constitutional public bodies in pre-independence India.",
      bloomsLevel: "Understand",
      difficulty: "Medium",
      options: [
        {
          id: "opt-1",
          text: "1926",
          isCorrect: true,
          explanation: "The Public Service Commission of India was formally constituted on October 1, 1926 under the chairmanship of Sir Ross Barker.",
        },
        {
          id: "opt-2",
          text: "1919",
          isCorrect: false,
          explanation: "1919 was the year the Government of India Act 1919 was enacted, which provided the statutory authority but did not establish the commission until 1926.",
          misconceptionType: "enactment_vs_constitution_confusion",
        },
        {
          id: "opt-3",
          text: "1935",
          isCorrect: false,
          explanation: "1935 was the Government of India Act 1935, which renamed the body to the Federal Public Service Commission.",
          misconceptionType: "structural_reform_year_confusion",
        },
        {
          id: "opt-4",
          text: "1950",
          isCorrect: false,
          explanation: "On January 26, 1950, with the commencement of the Constitution of India, the Federal Public Service Commission became the Union Public Service Commission (UPSC).",
          misconceptionType: "post_independence_constitutional_transition",
        },
      ],
      generalExplanation: "Section 96C of the Government of India Act 1919 provided for the establishment of a Public Service Commission. Following the recommendations of the Lee Commission in 1924, the Public Service Commission was established on October 1, 1926.",
      hints: ["The commission celebrated its centenary milestone in 2026."],
      tags: ["history", "constitution", "civil-services", "upsc"],
    },
  },
  {
    id: "eval-03-science",
    categoryName: "3. Science (Cellular & Molecular Biology)",
    topic: "Cellular Respiration & Bioenergetics",
    gradeLevel: "Grade 11-12",
    bloomsLevel: "Analyze",
    difficulty: "Hard",
    timeSensitive: false,
    authoritativeSource: "Campbell Biology (12th Edition), Chapter 9: Cellular Respiration and Fermentation; Mitchell Chemiosmotic Hypothesis (Nobel Prize in Chemistry 1978)",
    question: {
      title: "During eukaryotic oxidative phosphorylation, across which mitochondrial membrane or compartment does the electron transport chain pump hydrogen ions (protons) to establish the electrochemical proton-motive force?",
      type: "mcq_single",
      subject: "Science",
      category: "Cellular Biology",
      topic: "Mitochondrial Bioenergetics",
      subtopic: "Chemiosmosis & Electron Transport",
      gradeLevel: "Grade 11-12",
      learningObjective: "Analyze the directional flow of protons during chemiosmosis and differentiate mitochondrial sub-compartments.",
      bloomsLevel: "Analyze",
      difficulty: "Hard",
      options: [
        {
          id: "opt-1",
          text: "From the mitochondrial matrix into the intermembrane space",
          isCorrect: true,
          explanation: "Complexes I, III, and IV pump protons from the matrix across the inner mitochondrial membrane into the intermembrane space, creating a steep pH and electrical potential gradient.",
        },
        {
          id: "opt-2",
          text: "From the intermembrane space into the mitochondrial matrix",
          isCorrect: false,
          explanation: "Protons flow down their electrochemical gradient from the intermembrane space back into the matrix through ATP synthase; they are not actively pumped in that direction by the ETC.",
          misconceptionType: "directional_gradient_inversion",
        },
        {
          id: "opt-3",
          text: "From the cytosol across the outer membrane into the intermembrane space",
          isCorrect: false,
          explanation: "The outer mitochondrial membrane possesses porous porins and does not maintain the active electrochemical gradient created by the ETC.",
          misconceptionType: "outer_vs_inner_membrane_confusion",
        },
        {
          id: "opt-4",
          text: "From the thylakoid stroma into the intrathylakoid lumen",
          isCorrect: false,
          explanation: "This describes the proton pumping mechanism of chloroplast photophosphorylation during plant photosynthesis, not mitochondrial respiration.",
          misconceptionType: "mitochondria_chloroplast_mechanism_confusion",
        },
      ],
      generalExplanation: "In eukaryotic oxidative phosphorylation, the electron transport chain embedded in the inner mitochondrial membrane transfers electrons through redox reactions, coupling this exergonic transfer to the pumping of H+ ions from the mitochondrial matrix into the intermembrane space.",
      hints: ["Recall which compartment has a higher proton concentration (lower pH) before ATP synthase allows them back into the matrix."],
      tags: ["biology", "biochemistry", "cellular-respiration", "mitochondria"],
    },
  },
  {
    id: "eval-04-math",
    categoryName: "4. Mathematics & Numerical Reasoning",
    topic: "Differential Calculus & Power Rule",
    gradeLevel: "Grade 11-12",
    bloomsLevel: "Apply",
    difficulty: "Medium",
    timeSensitive: false,
    authoritativeSource: "James Stewart Calculus (8th Edition), Chapter 3: Differentiation Rules",
    question: {
      title: "What is the first derivative of the polynomial function f(x) = 3x^3 - 5x^2 + 8x - 14 with respect to x?",
      type: "mcq_single",
      subject: "Mathematics",
      category: "Calculus",
      topic: "Differential Calculus",
      subtopic: "Power Rule & Linearity",
      gradeLevel: "Grade 11-12",
      learningObjective: "Apply the power rule and linearity of differentiation to compute the exact derivative of a polynomial.",
      bloomsLevel: "Apply",
      difficulty: "Medium",
      options: [
        {
          id: "opt-1",
          text: "9x^2 - 10x + 8",
          isCorrect: true,
          explanation: "Applying the power rule d/dx(ax^n) = a*n*x^(n-1): d/dx(3x^3) = 9x^2, d/dx(-5x^2) = -10x, d/dx(8x) = 8, and d/dx(-14) = 0.",
        },
        {
          id: "opt-2",
          text: "9x^2 - 5x + 8",
          isCorrect: false,
          explanation: "Fails to multiply the power (2) by the existing coefficient (-5), resulting in -5x instead of -10x.",
          misconceptionType: "coefficient_multiplication_omission",
        },
        {
          id: "opt-3",
          text: "3x^2 - 10x + 8",
          isCorrect: false,
          explanation: "Reduced the power of the cubic term without multiplying the existing coefficient 3 by the exponent 3.",
          misconceptionType: "exponent_multiplication_slip",
        },
        {
          id: "opt-4",
          text: "9x^2 - 10x - 14",
          isCorrect: false,
          explanation: "Incorrectly retained the constant term (-14) instead of differentiating it to zero.",
          misconceptionType: "constant_rule_neglect",
        },
      ],
      generalExplanation: "Using standard differentiation rules: d/dx[3x^3] = 3*(3x^2) = 9x^2; d/dx[-5x^2] = -5*(2x) = -10x; d/dx[8x] = 8; d/dx[-14] = 0. Combining terms yields f'(x) = 9x^2 - 10x + 8.",
      hints: ["The derivative of any isolated constant term is zero."],
      tags: ["mathematics", "calculus", "derivatives", "algebra"],
    },
  },
  {
    id: "eval-05-school-concept",
    categoryName: "5. School-Level Conceptual Understanding",
    topic: "Plant Physiology & Photosynthesis",
    gradeLevel: "Grade 9-10",
    bloomsLevel: "Understand",
    difficulty: "Medium",
    timeSensitive: false,
    authoritativeSource: "NCERT Science Textbook for Class X, Chapter 6: Life Processes; Taiz and Zeiger Plant Physiology",
    question: {
      title: "During the light-dependent reactions of photosynthesis in green plant chloroplasts, what is the essential physiological role of water (H2O) molecules?",
      type: "mcq_single",
      subject: "Science",
      category: "Biology",
      topic: "Plant Physiology",
      subtopic: "Photolysis in Photosystem II",
      gradeLevel: "Grade 9-10",
      learningObjective: "Comprehend the photolysis of water as the ultimate source of electrons and atmospheric oxygen in the light reactions.",
      bloomsLevel: "Understand",
      difficulty: "Medium",
      options: [
        {
          id: "opt-1",
          text: "Supplying replacement electrons to Photosystem II through photolysis while releasing molecular oxygen (O2) and protons",
          isCorrect: true,
          explanation: "Water molecules are split in the oxygen-evolving complex of Photosystem II (2H2O -> 4H+ + 4e- + O2), replenishing oxidized P680 reaction centers.",
        },
        {
          id: "opt-2",
          text: "Directly fixing atmospheric carbon dioxide into 3-carbon phosphoglycerate sugars in the stroma",
          isCorrect: false,
          explanation: "Carbon fixation is carried out by the enzyme RuBisCO in the light-independent Calvin cycle using CO2 and RuBP, not water photolysis.",
          misconceptionType: "light_vs_dark_reaction_confusion",
        },
        {
          id: "opt-3",
          text: "Transporting synthesized sucrose through xylem vessels to non-photosynthetic sink organs",
          isCorrect: false,
          explanation: "Sucrose is translocated via phloem sieve tubes, while xylem primarily conducts water and dissolved mineral ions upward from roots.",
          misconceptionType: "vascular_tissue_translocation_confusion",
        },
        {
          id: "opt-4",
          text: "Acting as the terminal electron acceptor at the end of the non-cyclic electron transport chain",
          isCorrect: false,
          explanation: "NADP+ (forming NADPH) serves as the terminal electron acceptor in the photosynthetic electron transport chain; water is the electron donor.",
          misconceptionType: "donor_acceptor_inversion",
        },
      ],
      generalExplanation: "In the thylakoid membranes, light energy excites electrons in Photosystem II. To replace these lost electrons, an enzyme splits water molecules into protons, electrons, and oxygen gas. This process (photolysis) is the primary source of all atmospheric oxygen produced by plants.",
      hints: ["Think about what happens to the oxygen atom in water when plants are exposed to light."],
      tags: ["biology", "photosynthesis", "chloroplast", "school-science"],
    },
  },
  {
    id: "eval-06-higher-reasoning",
    categoryName: "6. Application & Higher-Order Reasoning",
    topic: "Macroeconomic Policy & Inflationary Interventions",
    gradeLevel: "Undergraduate",
    bloomsLevel: "Evaluate",
    difficulty: "Hard",
    timeSensitive: false,
    authoritativeSource: "N. Gregory Mankiw Macroeconomics (10th Edition), Chapter 14: Aggregate Demand and Monetary Policy; Mishkin Economics of Money, Banking and Financial Markets",
    question: {
      title: "An open economy experiences an unexpected demand-pull inflationary shock where real GDP exceeds potential output (a positive output gap). Under standard central bank transmission models, which combination of monetary policy actions is most appropriate to stabilize consumer price inflation back toward its target rate?",
      type: "mcq_single",
      subject: "Economics",
      category: "Macroeconomics",
      topic: "Monetary Policy Transmission",
      subtopic: "Counter-Cyclical Stabilization",
      gradeLevel: "Undergraduate",
      learningObjective: "Evaluate counter-cyclical monetary policy instruments to correct an inflationary output gap.",
      bloomsLevel: "Evaluate",
      difficulty: "Hard",
      options: [
        {
          id: "opt-1",
          text: "Raising the central bank benchmark policy interest rate and conducting open-market sales of government securities",
          isCorrect: true,
          explanation: "Contractionary monetary policy increases borrowing costs, dampens debt-financed investment and consumption expenditure, drains reserve liquidity from commercial banks, and reduces inflationary pressures.",
        },
        {
          id: "opt-2",
          text: "Lowering the statutory cash reserve requirement (CRR) to expand commercial bank lending margins",
          isCorrect: false,
          explanation: "Lowering reserve ratios is an expansionary policy that expands the money multiplier and bank lending capacity, exacerbating demand-pull inflation.",
          misconceptionType: "expansionary_vs_contractionary_instrument_inversion",
        },
        {
          id: "opt-3",
          text: "Purchasing long-term treasury bonds through quantitative easing to depress sovereign yields",
          isCorrect: false,
          explanation: "Quantitative easing injects central bank reserves and compresses yields to stimulate economic activity; executing QE during an inflationary boom would accelerate price surges.",
          misconceptionType: "liquidity_injection_error",
        },
        {
          id: "opt-4",
          text: "Devaluing the nominal exchange rate to stimulate net export revenues and expand foreign reserves",
          isCorrect: false,
          explanation: "Currency devaluation increases import prices (imported inflation) and raises aggregate demand via net exports, worsening the positive output gap.",
          misconceptionType: "external_balance_misapplication",
        },
      ],
      generalExplanation: "To counteract a positive output gap and demand-pull inflation, central banks deploy contractionary monetary policy. By raising policy rates and selling government securities in open market operations, commercial bank liquidity is absorbed, elevating real interest rates, cooling aggregate demand, and realigning output with potential GDP.",
      hints: ["The central bank needs to dampen aggregate spending, not expand credit."],
      tags: ["economics", "monetary-policy", "inflation", "central-banking"],
    },
  },
];

export function runBenchmarkEvaluation() {
  console.log("================================================================================");
  console.log("QUIZDORM QUESTION INTELLIGENCE BENCHMARK EVALUATION (STEP 2.1)");
  console.log("================================================================================\n");

  const results = BENCHMARK_EVALUATION_DATASET.map((item) => {
    const validation = QuestionIntelligenceValidator.validate(item.question);
    return {
      id: item.id,
      category: item.categoryName,
      title: item.question.title,
      difficulty: item.difficulty,
      bloomsLevel: item.bloomsLevel,
      isValid: validation.isValid,
      status: validation.recommendedStatus,
      qualityScore: validation.qualityScore,
      stemClarityScore: validation.stemClarityScore,
      distractorScore: validation.distractorHomogeneityScore,
      issueCount: validation.issues.length,
      issues: validation.issues,
      timeSensitive: item.timeSensitive,
      authoritativeSource: item.authoritativeSource,
    };
  });

  results.forEach((r, idx) => {
    console.log(`[${idx + 1}/${results.length}] ${r.category}`);
    console.log(`    ID: ${r.id} | Bloom: ${r.bloomsLevel} | Diff: ${r.difficulty}`);
    console.log(`    Stem: "${r.title.slice(0, 75)}..."`);
    console.log(`    Valid: ${r.isValid ? "PASS" : "FAIL"} | Status: ${r.status} | Quality: ${r.qualityScore}/100 | Distractor: ${r.distractorScore}/100`);
    if (r.timeSensitive) {
      console.log(`    Time-Sensitive: YES | Source: ${r.authoritativeSource}`);
    } else {
      console.log(`    Authoritative Source: ${r.authoritativeSource}`);
    }
    console.log(`    Issues Detected: ${r.issueCount}\n`);
  });

  const passCount = results.filter((r) => r.isValid).length;
  console.log("--------------------------------------------------------------------------------");
  console.log(`SUMMARY: ${passCount}/${results.length} Passed Schema & Quality Gates (${((passCount / results.length) * 100).toFixed(1)}%)`);
  console.log("--------------------------------------------------------------------------------\n");

  return results;
}

if (process.argv[1] && process.argv[1].includes("benchmark-quality-evaluation")) {
  runBenchmarkEvaluation();
}

