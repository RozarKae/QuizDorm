const fs = require('fs');
const path = require('path');

const TARGET_PATH = path.join(__dirname, '../lib/data/imported-questions.json');
const BACKUP_PATH = path.join(__dirname, '../lib/data/imported-questions.backup-before-1800.json');

const sportsQuestions = require('./sports-questions-data.js');
console.log(`Loaded ${sportsQuestions.length} Sports Legends questions.`);

if (sportsQuestions.length !== 100) {
  console.error("ERROR: Exactly 100 questions required for Sports Legends.");
  process.exit(1);
}

// Read existing questions
const existingQuestions = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Existing questions in bank: ${existingQuestions.length}`);

// Backup
fs.writeFileSync(BACKUP_PATH, JSON.stringify(existingQuestions, null, 2), 'utf8');
console.log(`Created backup at: ${BACKUP_PATH}`);

const now = new Date().toISOString();

// Format Sports Legends questions
const formattedQuestions = sportsQuestions.map((q, idx) => {
  const num = String(idx + 1).padStart(3, '0');
  const id = `q-sports-${num}`;

  // Multi-topic resolution based on sports & general awareness domains
  const topicSet = new Set(["Sports Legends", "General Awareness & Logic"]);

  const tagList = q.tags || [];

  // Cross-indexing into Global Current Affairs & Summits
  if (tagList.some(t => [
    "olympics", "commonwealth-games", "winter-olympics", "fifa-world-cup",
    "world-cup", "2024-t20-world-cup", "qatar-2022", "chess-olympiad",
    "uefa-euro", "tokyo-2020", "paris-2024", "london-2012", "records"
  ].includes(t))) {
    topicSet.add("Global Current Affairs & Summits");
  }

  // Cross-indexing into Literature, Awards & Culture
  if (tagList.some(t => [
    "awards", "ballon-dor", "national-sports-day", "dhyan-chand", "history",
    "ancient-greece", "chaturanga", "biography", "traditions", "golden-boot",
    "golden-slam", "latin", "symbolism", "continents"
  ].includes(t))) {
    topicSet.add("Literature, Awards & Culture");
  }

  // Cross-indexing into Logical Reasoning & Problem Solving
  if (tagList.some(t => [
    "chess", "tactics", "rules", "en-passant", "castling", "chessboard",
    "candidates-tournament", "grandmaster", "world-champion"
  ].includes(t))) {
    topicSet.add("Logical Reasoning & Problem Solving");
  }

  // Cross-indexing into Science & Technology Milestones
  if (tagList.some(t => [
    "deep-blue", "artificial-intelligence"
  ].includes(t))) {
    topicSet.add("Science & Technology Milestones");
  }

  return {
    id,
    title: q.title,
    type: "mcq_single",
    subject: "General Awareness & Logic",
    category: "General Awareness & Logic",
    topic: "Sports Legends",
    topics: Array.from(topicSet),
    difficulty: q.difficulty || "Medium",
    gradeLevel: "Grade 9-10",
    marks: 4,
    negativeMarks: 1,
    timeLimitSeconds: 30,
    options: q.options.map((opt, oIdx) => ({
      id: `opt-sports-${num}-${oIdx + 1}`,
      text: opt.text,
      isCorrect: opt.isCorrect,
      explanation: opt.explanation || (opt.isCorrect ? "Correct answer." : "Incorrect choice.")
    })),
    explanation: q.explanation,
    tags: Array.from(new Set([...tagList, "sports-legends", "general-awareness-logic"])),
    createdAt: now,
    updatedAt: now
  };
});

// Remove any existing questions with q-sports- prefix if re-running
const filteredBase = existingQuestions.filter(q => !q.id.startsWith("q-sports-"));

const fullNewBank = [
  ...filteredBase,
  ...formattedQuestions
];

console.log(`Writing ${fullNewBank.length} questions to ${TARGET_PATH}...`);
fs.writeFileSync(TARGET_PATH, JSON.stringify(fullNewBank, null, 2), 'utf8');

// Verification
const reloaded = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Successfully verified stored count: ${reloaded.length}`);

const sportsCount = reloaded.filter(q => (q.topics || [q.topic]).includes("Sports Legends")).length;
console.log(`- Questions in 'Sports Legends': ${sportsCount}`);

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
  console.log("All 100 Sports Legends questions formatted and merged successfully with zero errors!");
} else {
  console.error(`Found ${errors} errors during formatting.`);
  process.exit(1);
}
