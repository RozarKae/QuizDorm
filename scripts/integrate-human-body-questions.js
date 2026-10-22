const fs = require('fs');
const path = require('path');

const TARGET_PATH = path.join(__dirname, '../lib/data/imported-questions.json');
const BACKUP_PATH = path.join(__dirname, '../lib/data/imported-questions.backup-before-1500.json');

const humanQuestions = require('./human-body-questions-data.js');
console.log(`Loaded ${humanQuestions.length} Human Body Heroes questions.`);

if (humanQuestions.length !== 100) {
  console.error("ERROR: Exactly 100 questions required for Human Body Heroes.");
  process.exit(1);
}

// Read existing questions
const existingQuestions = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Existing questions in bank: ${existingQuestions.length}`);

// Backup
fs.writeFileSync(BACKUP_PATH, JSON.stringify(existingQuestions, null, 2), 'utf8');
console.log(`Created backup at: ${BACKUP_PATH}`);

const now = new Date().toISOString();

// Format Human Body Heroes questions
const formattedQuestions = humanQuestions.map((q, idx) => {
  const num = String(idx + 1).padStart(3, '0');
  const id = `q-human-${num}`;

  // Multi-topic resolution based on life science domains & anatomy
  const topicSet = new Set(["Human Body Heroes", "Life Sciences & Health"]);

  const tagList = q.tags || [];
  if (tagList.some(t => ["human-body", "body-systems", "circulatory", "respiratory", "digestive", "nervous-system", "skeletal", "muscular", "sense-organs", "vision", "hearing", "nutrition", "first-aid", "cpr"].includes(t))) {
    topicSet.add("Human Physiology & Anatomy");
  }
  if (tagList.some(t => ["diseases", "pathology", "bacteria", "viruses", "cells"].includes(t))) {
    topicSet.add("Cell Biology & Microbiology");
  }
  if (tagList.some(t => ["endocrine-system", "hormones", "diabetes", "immunity", "immune", "diseases"].includes(t))) {
    topicSet.add("Endocrinology & Immunology");
  }

  return {
    id,
    title: q.title,
    type: "mcq_single",
    subject: "Life Sciences & Health",
    category: "Life Sciences & Health",
    topic: "Human Body Heroes",
    topics: Array.from(topicSet),
    difficulty: q.difficulty || "Medium",
    gradeLevel: "Grade 9-10",
    marks: 4,
    negativeMarks: 1,
    timeLimitSeconds: 30,
    options: q.options.map((opt, oIdx) => ({
      id: `opt-human-${num}-${oIdx + 1}`,
      text: opt.text,
      isCorrect: opt.isCorrect,
      explanation: opt.explanation || (opt.isCorrect ? "Correct answer." : "Incorrect choice.")
    })),
    explanation: q.explanation,
    tags: Array.from(new Set([...tagList, "human-body-heroes", "life-sciences-health"])),
    createdAt: now,
    updatedAt: now
  };
});

// Remove any existing questions with q-human- prefix if re-running
const filteredBase = existingQuestions.filter(q => !q.id.startsWith("q-human-"));

const fullNewBank = [
  ...filteredBase,
  ...formattedQuestions
];

console.log(`Writing ${fullNewBank.length} questions to ${TARGET_PATH}...`);
fs.writeFileSync(TARGET_PATH, JSON.stringify(fullNewBank, null, 2), 'utf8');

// Verification
const reloaded = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Successfully verified stored count: ${reloaded.length}`);

const humanCount = reloaded.filter(q => (q.topics || [q.topic]).includes("Human Body Heroes")).length;
console.log(`- Questions in 'Human Body Heroes': ${humanCount}`);

let errors = 0;
formattedQuestions.forEach((q, idx) => {
  if (!q.options || q.options.length !== 4) {
    console.error(`Invalid options count at #${idx}`);
    errors++;
  }
  const correct = q.options.filter(o => o.isCorrect);
  if (correct.length !== 1) {
    console.error(`Question #${idx} does not have exactly 1 correct option (found ${correct.length})`);
    errors++;
  }
});

if (errors === 0) {
  console.log("All 100 Human Body Heroes questions formatted and merged successfully with zero errors!");
} else {
  console.error(`Found ${errors} errors during formatting.`);
  process.exit(1);
}
