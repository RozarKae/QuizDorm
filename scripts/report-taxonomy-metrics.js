const fs = require('fs');

const taxContent = fs.readFileSync('lib/data/taxonomy.ts', 'utf8');
const q = JSON.parse(fs.readFileSync('lib/data/imported-questions.json', 'utf8'));

// Extract subjects and topics from taxonomy.ts
const standardSubjects = [
  {
    name: "Computer Science & AI",
    topics: [
      "Artificial Intelligence & Machine Learning",
      "Data Structures & Algorithms",
      "Database Systems & SQL",
      "Web Technologies & Cloud Computing",
      "Cybersecurity & Cryptography"
    ]
  },
  {
    name: "Mathematics & Quantitative",
    topics: [
      "Calculus & Analysis",
      "Linear Algebra & Matrices",
      "Probability & Statistics",
      "Number Theory & Discrete Math",
      "Applied Geometry & Trigonometry"
    ]
  },
  {
    name: "Physical Sciences",
    topics: [
      "Mechanics & Kinematics",
      "Thermodynamics & Heat",
      "Electromagnetism & Circuits",
      "Optics & Wave Physics",
      "Modern Physics & Quantum Theory",
      "Space Explorers"
    ]
  },
  {
    name: "Chemical Sciences",
    topics: [
      "Organic Chemistry & Mechanisms",
      "Periodic Table & Chemical Bonding",
      "Physical Chemistry & Solutions",
      "Inorganic Chemistry & Coordination",
      "Biochemistry & Polymers"
    ]
  },
  {
    name: "Life Sciences & Health",
    topics: [
      "Human Physiology & Anatomy",
      "Genetics & Molecular Biology",
      "Cell Biology & Microbiology",
      "Ecology & Environmental Systems",
      "Endocrinology & Immunology",
      "Animal Encyclopedia",
      "Living World Explorers",
      "Human Body Heroes"
    ]
  },
  {
    name: "History & Polity",
    topics: [
      "Indian Constitution & Governance",
      "Modern Indian History & Movements",
      "World History & Global Conflicts",
      "Political Systems & International Relations",
      "Public Administration & Policy",
      "History Time Machine"
    ]
  },
  {
    name: "Geography & Environment",
    topics: [
      "Physical Geography & Earth Systems",
      "Climate Science & Meteorology",
      "Environmental Ecology & Conservation",
      "Economic & Resource Geography",
      "Oceanography & Water Systems",
      "World Continents and oceans"
    ]
  },
  {
    name: "General Awareness & Logic",
    topics: [
      "Global Current Affairs & Summits",
      "Science & Technology Milestones",
      "Logical Reasoning & Problem Solving",
      "Literature, Awards & Culture",
      "Macroeconomics, Banking & Trade",
      "Sports Legends",
      "Art, Music & Culture",
      "Super Scientists & Inventors",
      "Junior Current Affairs"
    ]
  },
  {
    name: "English & Language Arts",
    topics: [
      "Amazing English Adventure",
      "Nouns & Pronouns",
      "Verbs & Tenses",
      "Adjectives & Adverbs",
      "Sentence Formation & Structure",
      "Punctuation & Capitalization"
    ]
  }
];

console.log("=================================================");
console.log("    QUIZDORM TAXONOMY & QUESTION BANK METRICS   ");
console.log("=================================================");
console.log(`Total Stored Questions: ${q.length}`);

let multiTopicCount = 0;
let totalTopicOccurrences = 0;

q.forEach(item => {
  const tList = item.topics || [item.topic];
  if (tList.length > 1) multiTopicCount++;
  totalTopicOccurrences += tList.length;
});

console.log(`Multi-Topic Questions: ${multiTopicCount} (${Math.round((multiTopicCount / q.length) * 100)}%)`);
console.log(`Average Topics per Question: ${(totalTopicOccurrences / q.length).toFixed(2)}`);
console.log("\n--- Breakdown by Core Subject and Standard Topics ---\n");

standardSubjects.forEach(s => {
  const subjQuestions = q.filter(item => item.subject === s.name);
  console.log(`### ${s.name} (Direct Questions: ${subjQuestions.length})`);
  s.topics.forEach(t => {
    // A question matches topic if its topics array includes t or tag resolution matches
    const matched = q.filter(item => {
      const tops = item.topics || [item.topic];
      return tops.includes(t);
    });
    console.log(`  - ${t.padEnd(46, ' ')}: ${matched.length} questions`);
  });
  console.log("");
});
