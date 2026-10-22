const fs = require('fs');
const path = require('path');

const TARGET_PATH = path.join(__dirname, '../lib/data/imported-questions.json');
const BACKUP_PATH = path.join(__dirname, '../lib/data/imported-questions.backup-before-1700.json');

const historyQuestions = require('./history-questions-data.js');
console.log(`Loaded ${historyQuestions.length} History Time Machine questions.`);

if (historyQuestions.length !== 100) {
  console.error("ERROR: Exactly 100 questions required for History Time Machine.");
  process.exit(1);
}

// Read existing questions
const existingQuestions = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Existing questions in bank: ${existingQuestions.length}`);

// Backup
fs.writeFileSync(BACKUP_PATH, JSON.stringify(existingQuestions, null, 2), 'utf8');
console.log(`Created backup at: ${BACKUP_PATH}`);

const now = new Date().toISOString();

// Format History Time Machine questions
const formattedQuestions = historyQuestions.map((q, idx) => {
  const num = String(idx + 1).padStart(3, '0');
  const id = `q-history-${num}`;

  // Multi-topic resolution based on history & polity domains
  const topicSet = new Set(["History Time Machine", "History & Polity"]);

  const tagList = q.tags || [];

  // Cross-indexing into Modern Indian History & Movements
  if (tagList.some(t => [
    "freedom-fighters", "gandhi", "bhagat-singh", "sardar-patel", "subhas-chandra-bose",
    "1857-revolt", "dandi-march", "quit-india", "jallianwala-bagh", "champaran",
    "bardoli", "inc", "swadeshi", "partition", "mangal-pandey", "rani-lakshmibai",
    "bahadur-shah-zafar", "birsa-munda", "bal-gangadhar-tilak", "lal-bal-pal",
    "chandrashekhar-azad", "khudiram-bose", "ram-prasad-bismil", "sarojini-naidu",
    "annie-besant", "udham-singh", "jawaharlal-nehru", "khan-abdul-ghaffar-khan",
    "alluri-sitarama-raju", "maulana-azad", "jyotirao-phule", "battle-of-plassey",
    "battle-of-buxar", "treaty-of-allahabad", "independence-day", "gandhian-movements"
  ].includes(t))) {
    topicSet.add("Modern Indian History & Movements");
  }

  // Cross-indexing into Indian Constitution & Governance
  if (tagList.some(t => [
    "constitution", "polity", "ambedkar", "republic-day", "constitution-day",
    "sabha-samiti", "constitutional-acts", "national-emblem", "satyameva-jayate"
  ].includes(t))) {
    topicSet.add("Indian Constitution & Governance");
  }

  // Cross-indexing into Science & Technology Milestones
  if (tagList.some(t => [
    "inventions", "technology", "steam-engine", "light-bulb", "telephone",
    "transistor", "world-wide-web", "printing-press", "airplane", "penicillin",
    "vaccines", "zero", "the-wheel", "marconi", "j-c-bose", "edward-jenner",
    "alfred-nobel", "leeuwenhoek", "metallurgy", "iron-pillar", "water-conservation"
  ].includes(t))) {
    topicSet.add("Science & Technology Milestones");
  }

  // Cross-indexing into World History & Global Conflicts
  if (tagList.some(t => [
    "world-history", "french-revolution", "american-revolution", "world-war-1",
    "world-war-2", "berlin-wall", "russian-revolution", "united-nations",
    "industrial-revolution", "cold-war", "treaties", "dates"
  ].includes(t))) {
    topicSet.add("World History & Global Conflicts");
  }

  // Cross-indexing into Literature, Awards & Culture
  if (tagList.some(t => [
    "literature", "poetry", "art", "architecture", "sanskrit", "kalidasa",
    "rigveda", "upanishads", "vedanta", "chola", "brihadisvara", "pallavas",
    "mahabalipuram", "nobel-prizes", "rabindranath-tagore"
  ].includes(t))) {
    topicSet.add("Literature, Awards & Culture");
  }

  return {
    id,
    title: q.title,
    type: "mcq_single",
    subject: "History & Polity",
    category: "History & Polity",
    topic: "History Time Machine",
    topics: Array.from(topicSet),
    difficulty: q.difficulty || "Medium",
    gradeLevel: "Grade 9-10",
    marks: 4,
    negativeMarks: 1,
    timeLimitSeconds: 30,
    options: q.options.map((opt, oIdx) => ({
      id: `opt-history-${num}-${oIdx + 1}`,
      text: opt.text,
      isCorrect: opt.isCorrect,
      explanation: opt.explanation || (opt.isCorrect ? "Correct answer." : "Incorrect choice.")
    })),
    explanation: q.explanation,
    tags: Array.from(new Set([...tagList, "history-time-machine", "history-polity"])),
    createdAt: now,
    updatedAt: now
  };
});

// Remove any existing questions with q-history- prefix if re-running
const filteredBase = existingQuestions.filter(q => !q.id.startsWith("q-history-"));

const fullNewBank = [
  ...filteredBase,
  ...formattedQuestions
];

console.log(`Writing ${fullNewBank.length} questions to ${TARGET_PATH}...`);
fs.writeFileSync(TARGET_PATH, JSON.stringify(fullNewBank, null, 2), 'utf8');

// Verification
const reloaded = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
console.log(`Successfully verified stored count: ${reloaded.length}`);

const historyCount = reloaded.filter(q => (q.topics || [q.topic]).includes("History Time Machine")).length;
console.log(`- Questions in 'History Time Machine': ${historyCount}`);

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
  console.log("All 100 History Time Machine questions formatted and merged successfully with zero errors!");
} else {
  console.error(`Found ${errors} errors during formatting.`);
  process.exit(1);
}
