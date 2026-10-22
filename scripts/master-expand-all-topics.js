// scripts/master-expand-all-topics.js
const fs = require('fs');
const path = require('path');

const { physicsBank } = require('./generate-physics-expansion');
const { mathBank } = require('./generate-math-expansion');
const { csBank } = require('./generate-cs-expansion');
const { engBank } = require('./generate-english-expansion');
const { polBank } = require('./generate-history-polity-expansion');
const { chemBioBank } = require('./generate-chem-bio-expansion');
const { geoEconBank } = require('./generate-geo-econ-expansion');

const { doesQuestionMatchTopic, getAllStandardTopics } = require('../lib/data/taxonomy.ts');

console.log("=================================================");
console.log("   QUIZDORM MASTER DATABASE EXPANSION RUNNER     ");
console.log("=================================================");

const allExpansionQuestions = [
  ...physicsBank,
  ...mathBank,
  ...csBank,
  ...engBank,
  ...polBank,
  ...chemBioBank,
  ...geoEconBank
];

console.log(`Total new expansion questions to integrate: ${allExpansionQuestions.length}`);

// Validation
const ids = new Set();
let errs = 0;
allExpansionQuestions.forEach((q, idx) => {
  if (ids.has(q.id)) {
    console.error(`Duplicate ID found in expansion: ${q.id}`);
    errs++;
  }
  ids.add(q.id);
  if (!q.title || !q.explanation || !q.subject || !q.topic) {
    console.error(`Missing core field in question ${q.id}`);
    errs++;
  }
  if (!['easy', 'medium', 'hard'].includes(q.difficulty)) {
    console.error(`Invalid difficulty in question ${q.id}: ${q.difficulty}`);
    errs++;
  }
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`Question ${q.id} must have exactly 4 options`);
    errs++;
  }
  const corrects = (q.options || []).filter(o => o.isCorrect);
  if (corrects.length !== 1) {
    console.error(`Question ${q.id} has ${corrects.length} correct options (expected 1)`);
    errs++;
  }
});

if (errs > 0) {
  console.error(`Validation failed with ${errs} errors. Aborting.`);
  process.exit(1);
}
console.log("-> All expansion questions passed 100% schema validation!");

// Load existing database
const jsonPath = path.join(__dirname, '../lib/data/imported-questions.json');
const existingQuestions = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
console.log(`Current existing questions: ${existingQuestions.length}`);

// Check collision
const existingIds = new Set(existingQuestions.map(q => q.id));
let collisions = 0;
allExpansionQuestions.forEach(q => {
  if (existingIds.has(q.id)) {
    console.error(`Collision with existing DB ID: ${q.id}`);
    collisions++;
  }
});

if (collisions > 0) {
  console.error(`Detected ${collisions} collisions. Aborting.`);
  process.exit(1);
}

// Backup
const backupPath = path.join(__dirname, `../lib/data/imported-questions.backup-before-${existingQuestions.length + allExpansionQuestions.length}.json`);
fs.writeFileSync(backupPath, JSON.stringify(existingQuestions, null, 2), 'utf8');
console.log(`Backup written to: ${backupPath}`);

// Merge
const fullDatabase = [...existingQuestions, ...allExpansionQuestions];
console.log(`New total database size: ${fullDatabase.length}`);

fs.writeFileSync(jsonPath, JSON.stringify(fullDatabase, null, 2), 'utf8');
console.log("Successfully updated imported-questions.json!");

// FINAL AUDIT: Verify every single topic > 100
console.log("\n=================================================");
console.log(">>> FINAL AUDIT: Verifying every topic > 100...");
console.log("=================================================");

const standardTopics = getAllStandardTopics();
let failCount = 0;
const results = [];

standardTopics.forEach(topic => {
  const matchCount = fullDatabase.filter(q => doesQuestionMatchTopic(q, topic)).length;
  const isPass = matchCount > 100;
  if (!isPass) failCount++;
  results.push({ topic, count: matchCount, status: isPass ? "PASS (> 100)" : "FAIL (<= 100)" });
});

results.sort((a,b) => a.count - b.count).forEach(r => {
  console.log(`[${r.status}] ${r.topic.padEnd(45)} : ${r.count} questions`);
});

if (failCount > 0) {
  console.error(`\nFAILED: ${failCount} topics still have <= 100 questions!`);
  process.exit(1);
} else {
  console.log("\n-> ALL 56 TOPICS SUCCESSFULLY HAVE MORE THAN 100 QUESTIONS! 100% COMPLIANT!");
}
