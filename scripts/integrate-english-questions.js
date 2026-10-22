const fs = require('fs');
const path = require('path');

const TARGET_PATH = path.join(__dirname, '../lib/data/imported-questions.json');
const BACKUP_PATH = path.join(__dirname, '../lib/data/imported-questions.backup-before-1300.json');

const englishQuestions = require('./english-questions-data.js');
console.log(`Loaded ${englishQuestions.length} Amazing English Adventure questions.`);

if (englishQuestions.length !== 100) {
  console.error("ERROR: Exactly 100 questions required for Amazing English Adventure.");
  process.exit(1);
}

// Read existing 1,200 questions
const existingQuestions = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Existing questions in bank: ${existingQuestions.length}`);

// Backup
fs.writeFileSync(BACKUP_PATH, JSON.stringify(existingQuestions, null, 2), 'utf8');
console.log(`Created backup at: ${BACKUP_PATH}`);

const now = new Date().toISOString();

// Format Amazing English Adventure questions
const formattedEnglishQuestions = englishQuestions.map((q, idx) => {
  const num = String(idx + 1).padStart(3, '0');
  const id = `q-eng-${num}`;

  // Multi-topic resolution based on grammar domain
  const topicSet = new Set(["Amazing English Adventure", "English & Language Arts"]);

  if (q.tags.includes("nouns") || q.tags.includes("pronouns") || q.tags.includes("proper-nouns") || q.tags.includes("collective-noun")) {
    topicSet.add("Nouns & Pronouns");
  }
  if (q.tags.includes("verbs") || q.tags.includes("tenses") || q.tags.includes("linking-verbs") || q.tags.includes("subjunctive-mood")) {
    topicSet.add("Verbs & Tenses");
  }
  if (q.tags.includes("adjectives") || q.tags.includes("comparatives") || q.tags.includes("superlative")) {
    topicSet.add("Adjectives & Adverbs");
  }
  if (q.tags.includes("sentence-formation") || q.tags.includes("clauses") || q.tags.includes("parallelism") || q.tags.includes("sentence-fragment")) {
    topicSet.add("Sentence Formation & Structure");
  }
  if (q.tags.includes("punctuation") || q.tags.includes("semicolon") || q.tags.includes("apostrophe") || q.tags.includes("commas")) {
    topicSet.add("Punctuation & Capitalization");
  }
  if (q.tags.includes("capitalization") || q.tags.includes("proper-nouns") || q.tags.includes("titles")) {
    topicSet.add("Punctuation & Capitalization");
  }

  return {
    id,
    title: q.title,
    type: "mcq_single",
    subject: "English & Language Arts",
    category: "English & Language Arts",
    topic: "Amazing English Adventure",
    topics: Array.from(topicSet),
    difficulty: q.difficulty || "Medium",
    gradeLevel: "Grade 9-10",
    marks: 4,
    negativeMarks: 1,
    timeLimitSeconds: 30,
    options: q.options.map((opt, oIdx) => ({
      id: `opt-eng-${num}-${oIdx + 1}`,
      text: opt.text,
      isCorrect: opt.isCorrect,
      explanation: opt.explanation || (opt.isCorrect ? "Correct answer." : "Incorrect choice.")
    })),
    explanation: q.explanation,
    tags: Array.from(new Set([...q.tags, "amazing-english-adventure", "english-language-arts"])),
    createdAt: now,
    updatedAt: now
  };
});

// Remove any existing questions with q-eng- prefix if re-running
const filteredBase = existingQuestions.filter(q => !q.id.startsWith("q-eng-"));

const fullNewBank = [
  ...filteredBase,
  ...formattedEnglishQuestions
];

console.log(`Writing ${fullNewBank.length} questions to ${TARGET_PATH}...`);
fs.writeFileSync(TARGET_PATH, JSON.stringify(fullNewBank, null, 2), 'utf8');

// Verification
const reloaded = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Successfully verified stored count: ${reloaded.length}`);

const englishCount = reloaded.filter(q => (q.topics || [q.topic]).includes("Amazing English Adventure")).length;
console.log(`- Questions in 'Amazing English Adventure': ${englishCount}`);

let errors = 0;
formattedEnglishQuestions.forEach((q, idx) => {
  if (!q.options || q.options.length !== 4) {
    console.error(`Invalid options count at #${idx}`);
    errors++;
  }
  const correct = q.options.filter(o => o.isCorrect);
  if (correct.length !== 1) {
    console.error(`Wrong correct count at #${idx} (${q.id}): ${correct.length}`);
    errors++;
  }
});

console.log(`New questions answer key audit: ${100 - errors} / 100 verified. Errors: ${errors}`);
