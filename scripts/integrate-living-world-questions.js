const fs = require('fs');
const path = require('path');

const TARGET_PATH = path.join(__dirname, '../lib/data/imported-questions.json');
const BACKUP_PATH = path.join(__dirname, '../lib/data/imported-questions.backup-before-1400.json');

const livingQuestions = require('./living-world-questions-data.js');
console.log(`Loaded ${livingQuestions.length} Living World Explorers questions.`);

if (livingQuestions.length !== 100) {
  console.error("ERROR: Exactly 100 questions required for Living World Explorers.");
  process.exit(1);
}

// Read existing 1,300 questions
const existingQuestions = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Existing questions in bank: ${existingQuestions.length}`);

// Backup
fs.writeFileSync(BACKUP_PATH, JSON.stringify(existingQuestions, null, 2), 'utf8');
console.log(`Created backup at: ${BACKUP_PATH}`);

const now = new Date().toISOString();

// Format Living World Explorers questions
const formattedLivingQuestions = livingQuestions.map((q, idx) => {
  const num = String(idx + 1).padStart(3, '0');
  const id = `q-living-${num}`;

  // Multi-topic resolution based on life science domains
  const topicSet = new Set(["Living World Explorers", "Life Sciences & Health"]);

  if (q.tags.includes("ecology") || q.tags.includes("habitats") || q.tags.includes("biomes") || q.tags.includes("food-chains") || q.tags.includes("food-web")) {
    topicSet.add("Ecology & Environmental Systems");
  }
  if (q.tags.includes("cell-biology") || q.tags.includes("chloroplast") || q.tags.includes("photosynthesis") || q.tags.includes("protists")) {
    topicSet.add("Cell Biology & Microbiology");
  }
  if (q.tags.includes("animals") || q.tags.includes("invertebrates") || q.tags.includes("mammals") || q.tags.includes("zoology")) {
    topicSet.add("Animal Encyclopedia");
  }
  if (q.tags.includes("conservation") || q.tags.includes("pollution") || q.tags.includes("biomagnification")) {
    topicSet.add("Environmental Ecology & Conservation");
  }
  if (q.tags.includes("genetics") || q.tags.includes("alternation-of-generations")) {
    topicSet.add("Genetics & Molecular Biology");
  }
  if (q.tags.includes("biomes") || q.tags.includes("tundra") || q.tags.includes("taiga") || q.tags.includes("rainforest")) {
    topicSet.add("Physical Geography & Earth Systems");
  }

  return {
    id,
    title: q.title,
    type: "mcq_single",
    subject: "Life Sciences & Health",
    category: "Life Sciences & Health",
    topic: "Living World Explorers",
    topics: Array.from(topicSet),
    difficulty: q.difficulty || "Medium",
    gradeLevel: "Grade 9-10",
    marks: 4,
    negativeMarks: 1,
    timeLimitSeconds: 30,
    options: q.options.map((opt, oIdx) => ({
      id: `opt-living-${num}-${oIdx + 1}`,
      text: opt.text,
      isCorrect: opt.isCorrect,
      explanation: opt.explanation || (opt.isCorrect ? "Correct answer." : "Incorrect choice.")
    })),
    explanation: q.explanation,
    tags: Array.from(new Set([...q.tags, "living-world-explorers", "life-sciences-health"])),
    createdAt: now,
    updatedAt: now
  };
});

// Remove any existing questions with q-living- prefix if re-running
const filteredBase = existingQuestions.filter(q => !q.id.startsWith("q-living-"));

const fullNewBank = [
  ...filteredBase,
  ...formattedLivingQuestions
];

console.log(`Writing ${fullNewBank.length} questions to ${TARGET_PATH}...`);
fs.writeFileSync(TARGET_PATH, JSON.stringify(fullNewBank, null, 2), 'utf8');

// Verification
const reloaded = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Successfully verified stored count: ${reloaded.length}`);

const livingCount = reloaded.filter(q => (q.topics || [q.topic]).includes("Living World Explorers")).length;
console.log(`- Questions in 'Living World Explorers': ${livingCount}`);

let errors = 0;
formattedLivingQuestions.forEach((q, idx) => {
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
