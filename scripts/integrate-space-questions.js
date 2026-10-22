const fs = require('fs');
const path = require('path');

const TARGET_PATH = path.join(__dirname, '../lib/data/imported-questions.json');
const BACKUP_PATH = path.join(__dirname, '../lib/data/imported-questions.backup-before-1600.json');

const spaceQuestions = require('./space-questions-data.js');
console.log(`Loaded ${spaceQuestions.length} Space Explorers questions.`);

if (spaceQuestions.length !== 100) {
  console.error("ERROR: Exactly 100 questions required for Space Explorers.");
  process.exit(1);
}

// Read existing questions
const existingQuestions = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Existing questions in bank: ${existingQuestions.length}`);

// Backup
fs.writeFileSync(BACKUP_PATH, JSON.stringify(existingQuestions, null, 2), 'utf8');
console.log(`Created backup at: ${BACKUP_PATH}`);

const now = new Date().toISOString();

// Format Space Explorers questions
const formattedQuestions = spaceQuestions.map((q, idx) => {
  const num = String(idx + 1).padStart(3, '0');
  const id = `q-space-${num}`;

  // Multi-topic resolution based on physical science & space domains
  const topicSet = new Set(["Space Explorers", "Physical Sciences"]);

  const tagList = q.tags || [];

  // Cross-indexing into Science & Technology Milestones
  if (tagList.some(t => ["isro", "nasa", "space-missions", "astronauts", "chandrayaan", "mangalyaan", "aditya-l1", "gaganyaan", "history", "satellites", "apollo", "vostok", "iss", "spacewalk"].includes(t))) {
    topicSet.add("Science & Technology Milestones");
  }

  // Cross-indexing into Modern Physics & Quantum Theory
  if (tagList.some(t => ["stars", "nuclear-fusion", "black-hole", "supernova", "pulsar", "white-dwarf", "gravitational-lensing", "general-relativity", "astrophysics", "singularity", "schwarzschild-radius"].includes(t))) {
    topicSet.add("Modern Physics & Quantum Theory");
  }

  // Cross-indexing into Physical Geography & Earth Systems
  if (tagList.some(t => ["moon", "lunar", "tides", "eclipses", "ecliptic", "solar-system", "astronomy", "atmosphere"].includes(t))) {
    topicSet.add("Physical Geography & Earth Systems");
  }

  // Cross-indexing into Mechanics & Kinematics
  if (tagList.some(t => ["gravity", "gravitation", "escape-velocity", "microgravity", "celestial-mechanics", "orbital-mechanics", "barycenter"].includes(t))) {
    topicSet.add("Mechanics & Kinematics");
  }

  // Cross-indexing into Optics & Wave Physics
  if (tagList.some(t => ["optics", "rayleigh-scattering", "light-year", "telescope"].includes(t))) {
    topicSet.add("Optics & Wave Physics");
  }

  return {
    id,
    title: q.title,
    type: "mcq_single",
    subject: "Physical Sciences",
    category: "Physical Sciences",
    topic: "Space Explorers",
    topics: Array.from(topicSet),
    difficulty: q.difficulty || "Medium",
    gradeLevel: "Grade 9-10",
    marks: 4,
    negativeMarks: 1,
    timeLimitSeconds: 30,
    options: q.options.map((opt, oIdx) => ({
      id: `opt-space-${num}-${oIdx + 1}`,
      text: opt.text,
      isCorrect: opt.isCorrect,
      explanation: opt.explanation || (opt.isCorrect ? "Correct answer." : "Incorrect choice.")
    })),
    explanation: q.explanation,
    tags: Array.from(new Set([...tagList, "space-explorers", "physical-sciences"])),
    createdAt: now,
    updatedAt: now
  };
});

// Remove any existing questions with q-space- prefix if re-running
const filteredBase = existingQuestions.filter(q => !q.id.startsWith("q-space-"));

const fullNewBank = [
  ...filteredBase,
  ...formattedQuestions
];

console.log(`Writing ${fullNewBank.length} questions to ${TARGET_PATH}...`);
fs.writeFileSync(TARGET_PATH, JSON.stringify(fullNewBank, null, 2), 'utf8');

// Verification
const reloaded = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Successfully verified stored count: ${reloaded.length}`);

const spaceCount = reloaded.filter(q => (q.topics || [q.topic]).includes("Space Explorers")).length;
console.log(`- Questions in 'Space Explorers': ${spaceCount}`);

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
  console.log("All 100 Space Explorers questions formatted and merged successfully with zero errors!");
} else {
  console.error(`Found ${errors} errors during formatting.`);
  process.exit(1);
}
