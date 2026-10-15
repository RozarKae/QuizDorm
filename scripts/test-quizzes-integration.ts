import { getStoredQuizzes, ALL_DEFAULT_QUIZZES } from "../lib/data/quizzes";
import { getStoredQuestions } from "../lib/data/question-bank";

const questions = getStoredQuestions();
const quizzes = getStoredQuizzes();

console.log(`Questions loaded: ${questions.length}`);
console.log(`Default quizzes built: ${quizzes.length}`);
for (const q of quizzes) {
  console.log(`Quiz: "${q.title}" (Subject: ${q.subject}) -> ${q.questions.length} questions, Total Marks: ${q.totalMarks}`);
}
