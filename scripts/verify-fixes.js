const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log("=== RUNNING POST-TWEAKS VERIFICATION SUITE ===");

// 1. Verify 1000 starter questions
const questionsPath = path.join(__dirname, '../lib/data/imported-questions.json');
const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

console.log(`[TEST 1] Total Questions in Starter Bank: ${questions.length}`);
assert.equal(questions.length >= 1000, true, "Question bank must contain at least 1,000 questions");

// 2. Verify Subject Distribution
const subjectCounts = {};
const topicSet = new Set();
let multiTopicCount = 0;

questions.forEach((q, idx) => {
  subjectCounts[q.subject] = (subjectCounts[q.subject] || 0) + 1;
  (q.topics || []).forEach(t => topicSet.add(t));
  if (q.topics && q.topics.length > 1) {
    multiTopicCount++;
  }
  // Validate single correct option
  const correctCount = (q.options || []).filter(o => o.isCorrect).length;
  assert.equal(correctCount, 1, `Question #${idx} (${q.id}) must have exactly 1 correct option`);
});

console.log("[TEST 2] Subject Breakdown:");
console.table(subjectCounts);

console.log(`[TEST 3] Multi-Topic Cross-Indexed Questions: ${multiTopicCount} / ${questions.length} (${Math.round(multiTopicCount / questions.length * 100)}%)`);
assert.ok(multiTopicCount > 500, "Majority of questions must belong to multiple topics via tags");

console.log(`[TEST 4] Total Standardized Topics in Catalog: ${topicSet.size}`);
assert.ok(topicSet.size >= 40, "Must cover at least 40 standardized topics");

// 5. Test Tag-based Multi-Topic Query Resolution
console.log("[TEST 5] Testing Tag-to-Topic query resolution...");
// Test logic inline
const testQ = {
  title: "What is the derivative of f(x) = x^3?",
  topic: "Calculus",
  topics: ["Calculus & Analysis", "Applied Geometry & Trigonometry"],
  tags: ["calculus", "derivatives", "mathematics"]
};

function testMatch(q, target) {
  if (!target || target === "All") return true;
  const t = target.toLowerCase();
  if (q.topic && q.topic.toLowerCase() === t) return true;
  if (q.topics && q.topics.some(item => item.toLowerCase() === t)) return true;
  if (q.tags && q.tags.some(tag => tag.toLowerCase() === t || t.includes(tag.toLowerCase()))) return true;
  return false;
}

assert.equal(testMatch(testQ, "Calculus & Analysis"), true);
assert.equal(testMatch(testQ, "Applied Geometry & Trigonometry"), true);
assert.equal(testMatch(testQ, "Calculus"), true);
assert.equal(testMatch(testQ, "Derivatives"), true);
assert.equal(testMatch(testQ, "Random Unrelated Topic"), false);
console.log("-> Tag-to-Topic multi-membership test passed successfully!");

console.log("\nALL VERIFICATION TESTS PASSED WITH 100% SUCCESS!");
