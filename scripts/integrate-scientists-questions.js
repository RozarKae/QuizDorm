// scripts/integrate-scientists-questions.js
const fs = require('fs');
const path = require('path');
const { scientistsQuestions } = require('./scientists-questions-data');

const jsonPath = path.join(__dirname, '../lib/data/imported-questions.json');
const backupPath = path.join(__dirname, '../lib/data/imported-questions.backup-before-2000.json');

console.log("Reading existing questions from:", jsonPath);
const existingQuestions = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
console.log(`Current questions count: ${existingQuestions.length}`);

// Backup
fs.writeFileSync(backupPath, JSON.stringify(existingQuestions, null, 2), 'utf8');
console.log(`Backup saved to: ${backupPath}`);

// Check for collisions
const existingIds = new Set(existingQuestions.map(q => q.id));
scientistsQuestions.forEach(q => {
  if (existingIds.has(q.id)) {
    throw new Error(`ID Collision detected: ${q.id}`);
  }
});

const mergedQuestions = [...existingQuestions, ...scientistsQuestions];
console.log(`Merged questions count: ${mergedQuestions.length}`);

if (mergedQuestions.length !== 2000) {
  throw new Error(`Expected exactly 2000 questions, got ${mergedQuestions.length}`);
}

// Write back
fs.writeFileSync(jsonPath, JSON.stringify(mergedQuestions, null, 2), 'utf8');
console.log("Successfully wrote 2,000 questions to imported-questions.json!");
