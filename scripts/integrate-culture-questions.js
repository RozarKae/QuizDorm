const fs = require('fs');
const path = require('path');

const TARGET_PATH = path.join(__dirname, '../lib/data/imported-questions.json');
const BACKUP_PATH = path.join(__dirname, '../lib/data/imported-questions.backup-before-1900.json');

const cultureQuestions = require('./culture-questions-data.js');
console.log(`Loaded ${cultureQuestions.length} Art, Music & Culture questions.`);

if (cultureQuestions.length !== 100) {
  console.error("ERROR: Exactly 100 questions required for Art, Music & Culture.");
  process.exit(1);
}

// Read existing questions
const existingQuestions = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Existing questions in bank: ${existingQuestions.length}`);

// Backup
fs.writeFileSync(BACKUP_PATH, JSON.stringify(existingQuestions, null, 2), 'utf8');
console.log(`Created backup at: ${BACKUP_PATH}`);

const now = new Date().toISOString();

// Format Art, Music & Culture questions
const formattedQuestions = cultureQuestions.map((q, idx) => {
  const num = String(idx + 1).padStart(3, '0');
  const id = `q-culture-${num}`;

  // Multi-topic resolution based on culture, arts & humanities domains
  const topicSet = new Set(["Art, Music & Culture", "General Awareness & Logic", "Literature, Awards & Culture"]);

  const tagList = q.tags || [];

  // Cross-indexing into History Time Machine & History & Polity
  if (tagList.some(t => [
    "history", "ancient-india", "ancient-epics", "mahabharata", "ramayana",
    "valmiki", "chaturanga", "ahom-dynasty", "moidams", "mughal-architecture",
    "shah-jahan", "taj-mahal", "red-fort", "hampi", "vijayanagara", "khajuraho",
    "chandela", "ajanta-caves", "ellora-caves", "kailash-temple", "konark-sun-temple",
    "hoysala-temples", "santiniketan", "rabindranath-tagore", "buddhism", "oral-tradition",
    "vedic-chanting", "ramlila"
  ].includes(t))) {
    topicSet.add("History Time Machine");
    topicSet.add("History & Polity");
  }

  // Cross-indexing into Global Current Affairs & Summits
  if (tagList.some(t => [
    "unesco", "unesco-heritage", "intangible-heritage", "world-festivals",
    "rio-carnival", "nobel-prize", "booker-prize", "grammy-awards", "international-yoga-day",
    "world-literature", "world-classics", "renaissance"
  ].includes(t))) {
    topicSet.add("Global Current Affairs & Summits");
  }

  // Cross-indexing into Physical Geography & Earth Systems (for natural UNESCO sites)
  if (tagList.some(t => [
    "western-ghats", "sundarbans", "kaziranga", "biodiversity", "mangroves",
    "geography", "harvest-festival", "harvest"
  ].includes(t))) {
    topicSet.add("Physical Geography & Earth Systems");
  }

  return {
    id,
    title: q.title,
    type: "mcq_single",
    subject: "General Awareness & Logic",
    category: "General Awareness & Logic",
    topic: "Art, Music & Culture",
    topics: Array.from(topicSet),
    difficulty: q.difficulty || "Medium",
    gradeLevel: "Grade 9-10",
    marks: 4,
    negativeMarks: 1,
    timeLimitSeconds: 30,
    options: q.options.map((opt, oIdx) => ({
      id: `opt-culture-${num}-${oIdx + 1}`,
      text: opt.text,
      isCorrect: opt.isCorrect,
      explanation: opt.explanation || (opt.isCorrect ? "Correct answer." : "Incorrect choice.")
    })),
    explanation: q.explanation,
    tags: Array.from(new Set([...tagList, "art-music-culture", "general-awareness-logic"])),
    createdAt: now,
    updatedAt: now
  };
});

// Remove any existing questions with q-culture- prefix if re-running
const filteredBase = existingQuestions.filter(q => !q.id.startsWith("q-culture-"));

const fullNewBank = [
  ...filteredBase,
  ...formattedQuestions
];

console.log(`Writing ${fullNewBank.length} questions to ${TARGET_PATH}...`);
fs.writeFileSync(TARGET_PATH, JSON.stringify(fullNewBank, null, 2), 'utf8');

// Verification
const reloaded = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Successfully verified stored count: ${reloaded.length}`);

const cultureCount = reloaded.filter(q => (q.topics || [q.topic]).includes("Art, Music & Culture")).length;
console.log(`- Questions in 'Art, Music & Culture': ${cultureCount}`);

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
  console.log("All 100 Art, Music & Culture questions formatted and merged successfully with zero errors!");
} else {
  console.error(`Found ${errors} errors during formatting.`);
  process.exit(1);
}
