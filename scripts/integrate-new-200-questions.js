const fs = require('fs');
const path = require('path');

const TARGET_PATH = path.join(__dirname, '../lib/data/imported-questions.json');
const BACKUP_PATH = path.join(__dirname, '../lib/data/imported-questions.backup-before-1200.json');

const animalQuestions = require('./animal-questions-data.js');
const oceansQuestionsRaw = require('./oceans-questions-data.js');
const oceansQuestions = oceansQuestionsRaw.slice(0, 100);

console.log(`Loaded ${animalQuestions.length} Animal Encyclopedia questions.`);
console.log(`Loaded ${oceansQuestions.length} World Continents and oceans questions.`);

if (animalQuestions.length !== 100 || oceansQuestions.length !== 100) {
  console.error("ERROR: Exactly 100 questions required for each topic.");
  process.exit(1);
}

// Read existing 1,000 questions
const existingQuestions = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Existing questions in bank: ${existingQuestions.length}`);

// Backup
fs.writeFileSync(BACKUP_PATH, JSON.stringify(existingQuestions, null, 2), 'utf8');
console.log(`Created backup at: ${BACKUP_PATH}`);

const now = new Date().toISOString();

// Format Animal Encyclopedia questions
const formattedAnimalQuestions = animalQuestions.map((q, idx) => {
  const num = String(idx + 1).padStart(3, '0');
  const id = `q-animal-${num}`;

  // Multi-topic resolution
  const topicSet = new Set(["Animal Encyclopedia", "Life Sciences & Health"]);
  if (q.tags.includes("adaptation") || q.tags.includes("ecology")) {
    topicSet.add("Ecology & Environmental Systems");
  }
  if (q.tags.includes("physiology")) {
    topicSet.add("Human Physiology & Anatomy");
  }
  if (q.tags.includes("genetics") || q.tags.includes("cell-biology")) {
    topicSet.add("Genetics & Molecular Biology");
  }
  if (q.tags.includes("marine-life")) {
    topicSet.add("Oceanography & Water Systems");
  }
  if (q.tags.includes("conservation") || q.tags.includes("wildlife")) {
    topicSet.add("Environmental Ecology & Conservation");
  }

  return {
    id,
    title: q.title,
    type: "mcq_single",
    subject: "Life Sciences & Health",
    category: "Life Sciences & Health",
    topic: "Animal Encyclopedia",
    topics: Array.from(topicSet),
    difficulty: q.difficulty || "Medium",
    gradeLevel: "Grade 11-12",
    marks: 4,
    negativeMarks: 1,
    timeLimitSeconds: 30,
    options: q.options.map((opt, oIdx) => ({
      id: `opt-animal-${num}-${oIdx + 1}`,
      text: opt.text,
      isCorrect: opt.isCorrect,
      explanation: opt.explanation || (opt.isCorrect ? "Correct answer." : "Incorrect choice.")
    })),
    explanation: q.explanation,
    tags: Array.from(new Set([...q.tags, "animal-encyclopedia", "life-sciences-health"])),
    createdAt: now,
    updatedAt: now
  };
});

// Format World Continents and oceans questions
const formattedOceansQuestions = oceansQuestions.map((q, idx) => {
  const num = String(idx + 1).padStart(3, '0');
  const id = `q-continents-oceans-${num}`;

  // Multi-topic resolution
  const topicSet = new Set(["World Continents and oceans", "Geography & Environment"]);
  topicSet.add("Physical Geography & Earth Systems");
  if (q.tags.includes("oceans") || q.tags.includes("strait") || q.tags.includes("trench") || q.tags.includes("salinity")) {
    topicSet.add("Oceanography & Water Systems");
  }
  if (q.tags.includes("climate-science-meteorology") || q.tags.includes("deserts") || q.tags.includes("monsoon")) {
    topicSet.add("Climate Science & Meteorology");
  }
  if (q.tags.includes("economic-resource-geography") || q.tags.includes("canal") || q.tags.includes("strait")) {
    topicSet.add("Economic & Resource Geography");
  }
  if (q.tags.includes("environmental-ecology-conservation") || q.tags.includes("conservation") || q.tags.includes("pollution")) {
    topicSet.add("Environmental Ecology & Conservation");
  }
  if (q.tags.includes("antarctic-treaty") || q.tags.includes("governance")) {
    topicSet.add("Political Systems & International Relations");
  }

  return {
    id,
    title: q.title,
    type: "mcq_single",
    subject: "Geography & Environment",
    category: "Geography & Environment",
    topic: "World Continents and oceans",
    topics: Array.from(topicSet),
    difficulty: q.difficulty || "Medium",
    gradeLevel: "Grade 11-12",
    marks: 4,
    negativeMarks: 1,
    timeLimitSeconds: 30,
    options: q.options.map((opt, oIdx) => ({
      id: `opt-oceans-${num}-${oIdx + 1}`,
      text: opt.text,
      isCorrect: opt.isCorrect,
      explanation: opt.explanation || (opt.isCorrect ? "Correct answer." : "Incorrect choice.")
    })),
    explanation: q.explanation,
    tags: Array.from(new Set([...q.tags, "world-continents-and-oceans", "geography-environment"])),
    createdAt: now,
    updatedAt: now
  };
});

// Remove any existing questions with these prefix IDs if re-running
const filteredBase = existingQuestions.filter(q => 
  !q.id.startsWith("q-animal-") && !q.id.startsWith("q-continents-oceans-")
);

const fullNewBank = [
  ...filteredBase,
  ...formattedAnimalQuestions,
  ...formattedOceansQuestions
];

console.log(`Writing ${fullNewBank.length} questions to ${TARGET_PATH}...`);
fs.writeFileSync(TARGET_PATH, JSON.stringify(fullNewBank, null, 2), 'utf8');

// Verification
const reloaded = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Successfully verified stored count: ${reloaded.length}`);

const animalCount = reloaded.filter(q => (q.topics || [q.topic]).includes("Animal Encyclopedia")).length;
const oceansCount = reloaded.filter(q => (q.topics || [q.topic]).includes("World Continents and oceans")).length;

console.log(`- Questions in 'Animal Encyclopedia': ${animalCount}`);
console.log(`- Questions in 'World Continents and oceans': ${oceansCount}`);

let errors = 0;
reloaded.forEach((q, idx) => {
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

console.log(`Answer key audit completed: ${reloaded.length - errors} / ${reloaded.length} verified. Errors: ${errors}`);
