/**
 * Scalable Subject, Topic & Tag Taxonomy for QuizDorm
 * Designed for 1,000 starter questions and architected to scale to 1,000,000 questions.
 * A single question can belong to multiple topics depending on its tags and concepts.
 */

export interface SubjectTaxonomyItem {
  id: string;
  name: string;
  topics: string[];
}

export const STANDARD_TAXONOMY: SubjectTaxonomyItem[] = [
  {
    id: "cs_ai",
    name: "Computer Science & AI",
    topics: [
      "Artificial Intelligence & Machine Learning",
      "Data Structures & Algorithms",
      "Database Systems & SQL",
      "Web Technologies & Cloud Computing",
      "Cybersecurity & Cryptography",
    ],
  },
  {
    id: "math_quant",
    name: "Mathematics & Quantitative",
    topics: [
      "Calculus & Analysis",
      "Linear Algebra & Matrices",
      "Probability & Statistics",
      "Number Theory & Discrete Math",
      "Applied Geometry & Trigonometry",
    ],
  },
  {
    id: "physics",
    name: "Physical Sciences",
    topics: [
      "Mechanics & Kinematics",
      "Thermodynamics & Heat",
      "Electromagnetism & Circuits",
      "Optics & Wave Physics",
      "Modern Physics & Quantum Theory",
      "Space Explorers",
    ],
  },
  {
    id: "chemistry",
    name: "Chemical Sciences",
    topics: [
      "Organic Chemistry & Mechanisms",
      "Periodic Table & Chemical Bonding",
      "Physical Chemistry & Solutions",
      "Inorganic Chemistry & Coordination",
      "Biochemistry & Polymers",
    ],
  },
  {
    id: "life_health",
    name: "Life Sciences & Health",
    topics: [
      "Human Physiology & Anatomy",
      "Genetics & Molecular Biology",
      "Cell Biology & Microbiology",
      "Ecology & Environmental Systems",
      "Endocrinology & Immunology",
      "Animal Encyclopedia",
      "Living World Explorers",
      "Human Body Heroes",
    ],
  },
  {
    id: "history_polity",
    name: "History & Polity",
    topics: [
      "Indian Constitution & Governance",
      "Modern Indian History & Movements",
      "World History & Global Conflicts",
      "Political Systems & International Relations",
      "Public Administration & Policy",
      "History Time Machine",
    ],
  },
  {
    id: "geography_env",
    name: "Geography & Environment",
    topics: [
      "Physical Geography & Earth Systems",
      "Climate Science & Meteorology",
      "Environmental Ecology & Conservation",
      "Economic & Resource Geography",
      "Oceanography & Water Systems",
      "World Continents and oceans",
    ],
  },
  {
    id: "general_awareness",
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
      "Junior Current Affairs",
    ],
  },
  {
    id: "english_language",
    name: "English & Language Arts",
    topics: [
      "Amazing English Adventure",
      "Nouns & Pronouns",
      "Verbs & Tenses",
      "Adjectives & Adverbs",
      "Sentence Formation & Structure",
      "Punctuation & Capitalization",
    ],
  },
];

/**
 * Semantic Tag to Topic mapping rules.
 * Enables dynamic multi-topic resolution: a single question with tags
 * ['calculus', 'derivatives', 'ai'] maps to both 'Calculus & Analysis' and 'Artificial Intelligence & Machine Learning'.
 */
export const TAG_TO_TOPICS_MAP: Record<string, string[]> = {
  // AI & CS
  ai: ["Artificial Intelligence & Machine Learning"],
  "artificial-intelligence": ["Artificial Intelligence & Machine Learning"],
  "machine-learning": ["Artificial Intelligence & Machine Learning"],
  "neural-networks": ["Artificial Intelligence & Machine Learning"],
  "deep-learning": ["Artificial Intelligence & Machine Learning"],
  nlp: ["Artificial Intelligence & Machine Learning"],
  "computer-vision": ["Artificial Intelligence & Machine Learning"],
  algorithms: ["Data Structures & Algorithms"],
  "data-structures": ["Data Structures & Algorithms"],
  sorting: ["Data Structures & Algorithms"],
  trees: ["Data Structures & Algorithms"],
  graphs: ["Data Structures & Algorithms", "Number Theory & Discrete Math"],
  sql: ["Database Systems & SQL"],
  database: ["Database Systems & SQL"],
  databases: ["Database Systems & SQL"],
  rdbms: ["Database Systems & SQL"],
  nosql: ["Database Systems & SQL"],
  cloud: ["Web Technologies & Cloud Computing"],
  "cloud-computing": ["Web Technologies & Cloud Computing"],
  web: ["Web Technologies & Cloud Computing"],
  internet: ["Web Technologies & Cloud Computing"],
  networking: ["Web Technologies & Cloud Computing"],
  cybersecurity: ["Cybersecurity & Cryptography"],
  cryptography: ["Cybersecurity & Cryptography", "Number Theory & Discrete Math"],
  security: ["Cybersecurity & Cryptography"],
  encryption: ["Cybersecurity & Cryptography"],

  // Mathematics
  calculus: ["Calculus & Analysis"],
  derivatives: ["Calculus & Analysis"],
  integrals: ["Calculus & Analysis"],
  differential: ["Calculus & Analysis"],
  analysis: ["Calculus & Analysis"],
  algebra: ["Linear Algebra & Matrices", "Number Theory & Discrete Math"],
  "linear-algebra": ["Linear Algebra & Matrices"],
  matrices: ["Linear Algebra & Matrices"],
  vectors: ["Linear Algebra & Matrices", "Mechanics & Kinematics"],
  probability: ["Probability & Statistics"],
  statistics: ["Probability & Statistics"],
  combinatorics: ["Probability & Statistics", "Number Theory & Discrete Math"],
  "discrete-math": ["Number Theory & Discrete Math"],
  "number-theory": ["Number Theory & Discrete Math"],
  primes: ["Number Theory & Discrete Math"],
  geometry: ["Applied Geometry & Trigonometry"],
  trigonometry: ["Applied Geometry & Trigonometry"],

  // Physical Sciences
  physics: ["Mechanics & Kinematics"],
  mechanics: ["Mechanics & Kinematics"],
  kinematics: ["Mechanics & Kinematics"],
  motion: ["Mechanics & Kinematics"],
  gravity: ["Mechanics & Kinematics"],
  force: ["Mechanics & Kinematics"],
  thermodynamics: ["Thermodynamics & Heat", "Physical Chemistry & Solutions"],
  heat: ["Thermodynamics & Heat"],
  entropy: ["Thermodynamics & Heat"],
  electromagnetism: ["Electromagnetism & Circuits"],
  circuits: ["Electromagnetism & Circuits"],
  electricity: ["Electromagnetism & Circuits"],
  magnetism: ["Electromagnetism & Circuits"],
  optics: ["Optics & Wave Physics"],
  waves: ["Optics & Wave Physics"],
  light: ["Optics & Wave Physics"],
  quantum: ["Modern Physics & Quantum Theory"],
  "quantum-physics": ["Modern Physics & Quantum Theory"],
  "modern-physics": ["Modern Physics & Quantum Theory"],
  relativity: ["Modern Physics & Quantum Theory"],
  astronomy: ["Space Explorers", "Modern Physics & Quantum Theory", "Physical Geography & Earth Systems"],
  astrophysics: ["Space Explorers", "Modern Physics & Quantum Theory"],
  "space-explorers": ["Space Explorers", "Physical Sciences", "Science & Technology Milestones"],
  space: ["Space Explorers", "Physical Sciences"],
  "solar-system": ["Space Explorers", "Physical Sciences", "Physical Geography & Earth Systems"],
  sun: ["Space Explorers", "Physical Sciences"],
  planets: ["Space Explorers", "Physical Sciences"],
  planet: ["Space Explorers", "Physical Sciences"],
  moon: ["Space Explorers", "Physical Geography & Earth Systems"],
  lunar: ["Space Explorers", "Physical Geography & Earth Systems"],
  stars: ["Space Explorers", "Modern Physics & Quantum Theory"],
  star: ["Space Explorers", "Modern Physics & Quantum Theory"],
  constellations: ["Space Explorers", "Physical Sciences"],
  constellation: ["Space Explorers", "Physical Sciences"],
  astronauts: ["Space Explorers", "Science & Technology Milestones"],
  astronaut: ["Space Explorers", "Science & Technology Milestones"],
  cosmonaut: ["Space Explorers", "Science & Technology Milestones"],
  isro: ["Space Explorers", "Science & Technology Milestones"],
  nasa: ["Space Explorers", "Science & Technology Milestones"],
  "space-missions": ["Space Explorers", "Science & Technology Milestones"],
  satellites: ["Space Explorers", "Science & Technology Milestones"],
  satellite: ["Space Explorers", "Science & Technology Milestones"],
  chandrayaan: ["Space Explorers", "Science & Technology Milestones"],
  mangalyaan: ["Space Explorers", "Science & Technology Milestones"],
  gaganyaan: ["Space Explorers", "Science & Technology Milestones"],
  "aditya-l1": ["Space Explorers", "Science & Technology Milestones"],
  telescope: ["Space Explorers", "Optics & Wave Physics"],
  "black-hole": ["Space Explorers", "Modern Physics & Quantum Theory"],
  supernova: ["Space Explorers", "Modern Physics & Quantum Theory"],

  // Chemistry
  chemistry: ["Chemical Sciences"],
  organic: ["Organic Chemistry & Mechanisms"],
  "organic-chemistry": ["Organic Chemistry & Mechanisms"],
  benzene: ["Organic Chemistry & Mechanisms"],
  toluene: ["Organic Chemistry & Mechanisms"],
  hydrocarbons: ["Organic Chemistry & Mechanisms"],
  "periodic-table": ["Periodic Table & Chemical Bonding"],
  bonding: ["Periodic Table & Chemical Bonding"],
  chemical: ["Periodic Table & Chemical Bonding"],
  solutions: ["Physical Chemistry & Solutions"],
  kinetics: ["Physical Chemistry & Solutions"],
  equilibrium: ["Physical Chemistry & Solutions"],
  inorganic: ["Inorganic Chemistry & Coordination"],
  metals: ["Inorganic Chemistry & Coordination"],
  biochemistry: ["Biochemistry & Polymers", "Human Physiology & Anatomy"],
  polymers: ["Biochemistry & Polymers"],

  // Biology & Health
  // Life Sciences & Animals
  biology: ["Life Sciences & Health"],
  "living-world": ["Living World Explorers", "Life Sciences & Health", "Ecology & Environmental Systems"],
  plants: ["Living World Explorers", "Life Sciences & Health", "Ecology & Environmental Systems"],
  plant: ["Living World Explorers", "Life Sciences & Health", "Ecology & Environmental Systems"],
  botany: ["Living World Explorers", "Life Sciences & Health"],
  flora: ["Living World Explorers", "Life Sciences & Health"],
  photosynthesis: ["Living World Explorers", "Ecology & Environmental Systems", "Cell Biology & Microbiology"],
  habitats: ["Living World Explorers", "Ecology & Environmental Systems", "Environmental Ecology & Conservation"],
  habitat: ["Living World Explorers", "Ecology & Environmental Systems"],
  biomes: ["Living World Explorers", "Ecology & Environmental Systems", "Physical Geography & Earth Systems"],
  biome: ["Living World Explorers", "Ecology & Environmental Systems"],
  "food-chains": ["Living World Explorers", "Ecology & Environmental Systems"],
  "food-chain": ["Living World Explorers", "Ecology & Environmental Systems"],
  "food-web": ["Living World Explorers", "Ecology & Environmental Systems"],
  trophic: ["Living World Explorers", "Ecology & Environmental Systems"],
  "life-cycles": ["Living World Explorers", "Life Sciences & Health"],
  "life-cycle": ["Living World Explorers", "Life Sciences & Health"],
  metamorphosis: ["Living World Explorers", "Life Sciences & Health"],
  classification: ["Living World Explorers", "Life Sciences & Health"],
  taxonomy: ["Living World Explorers", "Life Sciences & Health"],
  decomposers: ["Living World Explorers", "Ecology & Environmental Systems"],
  animal: ["Animal Encyclopedia", "Life Sciences & Health", "Ecology & Environmental Systems"],
  animals: ["Animal Encyclopedia", "Life Sciences & Health", "Ecology & Environmental Systems"],
  zoology: ["Animal Encyclopedia", "Life Sciences & Health"],
  fauna: ["Animal Encyclopedia", "Life Sciences & Health"],
  wildlife: ["Animal Encyclopedia", "Environmental Ecology & Conservation"],
  mammals: ["Animal Encyclopedia", "Life Sciences & Health"],
  birds: ["Animal Encyclopedia", "Life Sciences & Health"],
  reptiles: ["Animal Encyclopedia", "Life Sciences & Health"],
  amphibians: ["Animal Encyclopedia", "Life Sciences & Health"],
  invertebrates: ["Animal Encyclopedia", "Life Sciences & Health"],
  "marine-life": ["Animal Encyclopedia", "Oceanography & Water Systems"],
  predators: ["Animal Encyclopedia", "Ecology & Environmental Systems"],
  adaptation: ["Animal Encyclopedia", "Ecology & Environmental Systems"],
  physiology: ["Human Physiology & Anatomy"],
  "human-physiology": ["Human Physiology & Anatomy"],
  anatomy: ["Human Physiology & Anatomy"],
  organs: ["Human Physiology & Anatomy"],
  circulation: ["Human Physiology & Anatomy"],
  "endocrine-system": ["Endocrinology & Immunology", "Human Physiology & Anatomy"],
  hormones: ["Endocrinology & Immunology"],
  immunology: ["Endocrinology & Immunology"],
  immune: ["Endocrinology & Immunology"],
  genetics: ["Genetics & Molecular Biology"],
  dna: ["Genetics & Molecular Biology"],
  rna: ["Genetics & Molecular Biology"],
  inheritance: ["Genetics & Molecular Biology"],
  cells: ["Cell Biology & Microbiology"],
  microbiology: ["Cell Biology & Microbiology"],
  bacteria: ["Cell Biology & Microbiology"],
  viruses: ["Cell Biology & Microbiology"],
  health: ["Human Physiology & Anatomy", "Endocrinology & Immunology", "Human Body Heroes"],
  medicine: ["Human Physiology & Anatomy", "Human Body Heroes"],
  "human-body": ["Human Body Heroes", "Human Physiology & Anatomy", "Life Sciences & Health"],
  "body-systems": ["Human Body Heroes", "Human Physiology & Anatomy"],
  circulatory: ["Human Body Heroes", "Human Physiology & Anatomy"],
  respiratory: ["Human Body Heroes", "Human Physiology & Anatomy"],
  digestive: ["Human Body Heroes", "Human Physiology & Anatomy"],
  "nervous-system": ["Human Body Heroes", "Human Physiology & Anatomy"],
  skeletal: ["Human Body Heroes", "Human Physiology & Anatomy"],
  muscular: ["Human Body Heroes", "Human Physiology & Anatomy"],
  "sense-organs": ["Human Body Heroes", "Human Physiology & Anatomy"],
  vision: ["Human Body Heroes", "Human Physiology & Anatomy"],
  hearing: ["Human Body Heroes", "Human Physiology & Anatomy"],
  nutrition: ["Human Body Heroes", "Life Sciences & Health"],
  vitamins: ["Human Body Heroes", "Life Sciences & Health"],
  minerals: ["Human Body Heroes", "Life Sciences & Health"],
  "healthy-habits": ["Human Body Heroes", "Life Sciences & Health"],
  diseases: ["Human Body Heroes", "Cell Biology & Microbiology", "Endocrinology & Immunology"],
  pathology: ["Human Body Heroes", "Cell Biology & Microbiology"],
  "first-aid": ["Human Body Heroes", "Life Sciences & Health"],
  cpr: ["Human Body Heroes", "Life Sciences & Health"],

  // History & Polity
  constitution: ["Indian Constitution & Governance", "History Time Machine"],
  polity: ["Indian Constitution & Governance"],
  parliament: ["Indian Constitution & Governance"],
  judiciary: ["Indian Constitution & Governance"],
  "fundamental-rights": ["Indian Constitution & Governance"],
  governance: ["Indian Constitution & Governance", "Public Administration & Policy"],
  history: ["Modern Indian History & Movements", "History Time Machine"],
  "modern-history": ["Modern Indian History & Movements", "History Time Machine"],
  "freedom-movement": ["Modern Indian History & Movements", "History Time Machine"],
  "world-history": ["World History & Global Conflicts", "History Time Machine"],
  wars: ["World History & Global Conflicts", "History Time Machine"],
  "cold-war": ["World History & Global Conflicts"],
  revolutions: ["World History & Global Conflicts", "History Time Machine"],
  "international-relations": ["Political Systems & International Relations", "Global Current Affairs & Summits"],
  treaties: ["Political Systems & International Relations", "History Time Machine"],
  diplomacy: ["Political Systems & International Relations"],
  civics: ["Public Administration & Policy"],
  administration: ["Public Administration & Policy"],
  "history-time-machine": ["History Time Machine", "History & Polity"],
  "ancient-india": ["History Time Machine", "History & Polity"],
  "indus-valley": ["History Time Machine", "History & Polity"],
  harappa: ["History Time Machine", "History & Polity"],
  "mohenjo-daro": ["History Time Machine", "History & Polity"],
  vedic: ["History Time Machine", "History & Polity"],
  maurya: ["History Time Machine", "History & Polity"],
  ashoka: ["History Time Machine", "History & Polity"],
  "gupta-empire": ["History Time Machine", "History & Polity"],
  "freedom-fighters": ["History Time Machine", "Modern Indian History & Movements"],
  gandhi: ["History Time Machine", "Modern Indian History & Movements"],
  "subhas-chandra-bose": ["History Time Machine", "Modern Indian History & Movements"],
  "bhagat-singh": ["History Time Machine", "Modern Indian History & Movements"],
  "sardar-patel": ["History Time Machine", "Modern Indian History & Movements"],
  ambedkar: ["History Time Machine", "Indian Constitution & Governance"],
  "1857-revolt": ["History Time Machine", "Modern Indian History & Movements"],
  "dandi-march": ["History Time Machine", "Modern Indian History & Movements"],
  "quit-india": ["History Time Machine", "Modern Indian History & Movements"],
  inventions: ["Super Scientists & Inventors", "History Time Machine", "Science & Technology Milestones"],
  invention: ["Super Scientists & Inventors", "History Time Machine", "Science & Technology Milestones"],
  "industrial-revolution": ["History Time Machine", "Science & Technology Milestones", "World History & Global Conflicts"],
  timelines: ["History Time Machine", "History & Polity"],
  chronology: ["History Time Machine", "History & Polity"],

  // Geography, Continents & Oceans
  geography: ["Physical Geography & Earth Systems", "World Continents and oceans"],
  "earth-science": ["Physical Geography & Earth Systems"],
  geology: ["Physical Geography & Earth Systems"],
  landforms: ["Physical Geography & Earth Systems", "World Continents and oceans"],
  continents: ["World Continents and oceans", "Physical Geography & Earth Systems"],
  continent: ["World Continents and oceans"],
  asia: ["World Continents and oceans"],
  africa: ["World Continents and oceans"],
  europe: ["World Continents and oceans"],
  australia: ["World Continents and oceans"],
  antarctica: ["World Continents and oceans"],
  "north-america": ["World Continents and oceans"],
  "south-america": ["World Continents and oceans"],
  oceans: ["World Continents and oceans", "Oceanography & Water Systems"],
  ocean: ["World Continents and oceans", "Oceanography & Water Systems"],
  pacific: ["World Continents and oceans", "Oceanography & Water Systems"],
  atlantic: ["World Continents and oceans", "Oceanography & Water Systems"],
  "indian-ocean": ["World Continents and oceans", "Oceanography & Water Systems"],
  "arctic-ocean": ["World Continents and oceans", "Oceanography & Water Systems"],
  "southern-ocean": ["World Continents and oceans", "Oceanography & Water Systems"],
  seas: ["World Continents and oceans", "Oceanography & Water Systems"],
  strait: ["World Continents and oceans", "Oceanography & Water Systems"],
  straits: ["World Continents and oceans", "Oceanography & Water Systems"],
  trench: ["World Continents and oceans", "Oceanography & Water Systems"],
  mountains: ["Physical Geography & Earth Systems", "World Continents and oceans"],
  plateau: ["Physical Geography & Earth Systems", "World Continents and oceans"],
  deserts: ["Physical Geography & Earth Systems", "World Continents and oceans"],
  rivers: ["Physical Geography & Earth Systems", "Oceanography & Water Systems", "World Continents and oceans"],
  climate: ["Climate Science & Meteorology"],
  "climate-change": ["Climate Science & Meteorology", "Environmental Ecology & Conservation"],
  meteorology: ["Climate Science & Meteorology"],
  atmosphere: ["Climate Science & Meteorology"],
  environment: ["Environmental Ecology & Conservation"],
  ecology: ["Environmental Ecology & Conservation", "Ecology & Environmental Systems"],
  conservation: ["Environmental Ecology & Conservation"],
  biodiversity: ["Environmental Ecology & Conservation", "Ecology & Environmental Systems"],
  pollution: ["Environmental Ecology & Conservation"],
  resources: ["Economic & Resource Geography"],
  oceanography: ["Oceanography & Water Systems"],

  // General Awareness & Logic
  "current-affairs": ["Junior Current Affairs", "Global Current Affairs & Summits"],
  summits: ["Junior Current Affairs", "Global Current Affairs & Summits"],
  global: ["Global Current Affairs & Summits"],
  milestones: ["Science & Technology Milestones"],
  reasoning: ["Logical Reasoning & Problem Solving"],
  logic: ["Logical Reasoning & Problem Solving"],
  puzzles: ["Logical Reasoning & Problem Solving"],
  literature: ["Literature, Awards & Culture", "Art, Music & Culture"],
  books: ["Literature, Awards & Culture", "Art, Music & Culture"],
  authors: ["Literature, Awards & Culture", "Art, Music & Culture"],
  awards: ["Literature, Awards & Culture", "Art, Music & Culture"],
  culture: ["Literature, Awards & Culture", "Art, Music & Culture"],
  heritage: ["Literature, Awards & Culture", "Art, Music & Culture"],
  art: ["Literature, Awards & Culture", "Art, Music & Culture"],
  "art-music-culture": ["Art, Music & Culture", "General Awareness & Logic"],
  music: ["Art, Music & Culture", "Literature, Awards & Culture"],
  dance: ["Art, Music & Culture", "Literature, Awards & Culture"],
  "classical-dance": ["Art, Music & Culture", "Literature, Awards & Culture"],
  paintings: ["Art, Music & Culture", "Literature, Awards & Culture"],
  painting: ["Art, Music & Culture", "Literature, Awards & Culture"],
  festivals: ["Art, Music & Culture", "Literature, Awards & Culture"],
  festival: ["Art, Music & Culture", "Literature, Awards & Culture"],
  unesco: ["Art, Music & Culture", "Global Current Affairs & Summits"],
  "unesco-heritage": ["Art, Music & Culture", "Global Current Affairs & Summits"],
  "musical-instruments": ["Art, Music & Culture", "Literature, Awards & Culture"],
  economics: ["Macroeconomics, Banking & Trade"],
  banking: ["Macroeconomics, Banking & Trade"],
  finance: ["Macroeconomics, Banking & Trade"],
  trade: ["Macroeconomics, Banking & Trade"],
  inflation: ["Macroeconomics, Banking & Trade"],
  gdp: ["Macroeconomics, Banking & Trade"],
  sports: ["Sports Legends", "General Awareness & Logic", "Global Current Affairs & Summits"],
  "sports-legends": ["Sports Legends", "General Awareness & Logic"],
  olympics: ["Sports Legends", "Global Current Affairs & Summits"],
  olympic: ["Sports Legends", "Global Current Affairs & Summits"],
  "commonwealth-games": ["Sports Legends", "Global Current Affairs & Summits"],
  cricket: ["Sports Legends", "General Awareness & Logic"],
  football: ["Sports Legends", "General Awareness & Logic"],
  fifa: ["Sports Legends", "Global Current Affairs & Summits"],
  chess: ["Sports Legends", "Logical Reasoning & Problem Solving"],
  athletics: ["Sports Legends", "General Awareness & Logic"],
  "track-and-field": ["Sports Legends", "General Awareness & Logic"],
  tennis: ["Sports Legends", "General Awareness & Logic"],
  badminton: ["Sports Legends", "General Awareness & Logic"],
  hockey: ["Sports Legends", "General Awareness & Logic"],

  // English & Language Arts
  english: ["Amazing English Adventure", "English & Language Arts"],
  grammar: ["Amazing English Adventure", "English & Language Arts"],
  "english-adventure": ["Amazing English Adventure"],
  nouns: ["Amazing English Adventure", "Nouns & Pronouns"],
  noun: ["Amazing English Adventure", "Nouns & Pronouns"],
  pronouns: ["Amazing English Adventure", "Nouns & Pronouns"],
  pronoun: ["Amazing English Adventure", "Nouns & Pronouns"],
  verbs: ["Amazing English Adventure", "Verbs & Tenses"],
  verb: ["Amazing English Adventure", "Verbs & Tenses"],
  tenses: ["Amazing English Adventure", "Verbs & Tenses"],
  adjectives: ["Amazing English Adventure", "Adjectives & Adverbs"],
  adjective: ["Amazing English Adventure", "Adjectives & Adverbs"],
  "sentence-formation": ["Amazing English Adventure", "Sentence Formation & Structure"],
  sentences: ["Amazing English Adventure", "Sentence Formation & Structure"],
  clauses: ["Amazing English Adventure", "Sentence Formation & Structure"],
  punctuation: ["Amazing English Adventure", "Punctuation & Capitalization"],
  capitalization: ["Amazing English Adventure", "Punctuation & Capitalization"],

  // Super Scientists & Inventors
  "super-scientists": ["Super Scientists & Inventors", "Science & Technology Milestones"],
  "super-scientists-inventors": ["Super Scientists & Inventors", "Science & Technology Milestones"],
  scientists: ["Super Scientists & Inventors", "Science & Technology Milestones"],
  scientist: ["Super Scientists & Inventors", "Science & Technology Milestones"],
  inventors: ["Super Scientists & Inventors", "Science & Technology Milestones"],
  inventor: ["Super Scientists & Inventors", "Science & Technology Milestones"],
  discoveries: ["Super Scientists & Inventors", "Science & Technology Milestones"],
  discovery: ["Super Scientists & Inventors", "Science & Technology Milestones"],
  "nobel-prize": ["Super Scientists & Inventors", "Literature, Awards & Culture", "Science & Technology Milestones"],
  "nobel-laureates": ["Super Scientists & Inventors", "Literature, Awards & Culture", "Science & Technology Milestones"],
  nobel: ["Super Scientists & Inventors", "Literature, Awards & Culture"],
  "indian-scientists": ["Super Scientists & Inventors", "Science & Technology Milestones", "Modern Indian History & Movements"],
  "indian-scientist": ["Super Scientists & Inventors", "Science & Technology Milestones"],

  // Junior Current Affairs
  "junior-current-affairs": ["Junior Current Affairs", "Global Current Affairs & Summits"],
  "national-news": ["Junior Current Affairs", "Indian Constitution & Governance"],
  "international-news": ["Junior Current Affairs", "Global Current Affairs & Summits"],
  "science-updates": ["Junior Current Affairs", "Science & Technology Milestones"],
  "sports-updates": ["Junior Current Affairs", "Sports Legends"],
  "awards-honors": ["Junior Current Affairs", "Literature, Awards & Culture"],
  "important-events": ["Junior Current Affairs", "Global Current Affairs & Summits"],
};

/**
 * Resolves all matching topics for a question based on its primary topic, subject, and tags.
 */
export function resolveTopicsForQuestion(q: {
  topic?: string;
  topics?: string[];
  subject?: string;
  tags?: string[];
  title?: string;
}): string[] {
  const result = new Set<string>();

  // 1. Existing topics array if explicitly assigned
  if (Array.isArray(q.topics)) {
    q.topics.forEach((t) => {
      if (t && t.trim()) result.add(t.trim());
    });
  }

  // 2. Primary topic
  if (q.topic && q.topic.trim()) {
    result.add(q.topic.trim());
  }

  // 3. Resolve from semantic tags
  const tags = (q.tags || []).map((t) => t.toLowerCase().trim());
  for (const tag of tags) {
    const mapped = TAG_TO_TOPICS_MAP[tag];
    if (mapped) {
      mapped.forEach((topic) => result.add(topic));
    }
    // Check partial tag matching (e.g. "machine learning" -> "machine-learning")
    const hyphenated = tag.replace(/\s+/g, "-");
    if (TAG_TO_TOPICS_MAP[hyphenated]) {
      TAG_TO_TOPICS_MAP[hyphenated].forEach((topic) => result.add(topic));
    }
  }

  // 4. Fallback: Check if primary topic matches any standard taxonomy topic partially
  if (result.size <= 1) {
    const raw = `${q.topic || ""} ${q.subject || ""} ${tags.join(" ")}`.toLowerCase();
    for (const subjectItem of STANDARD_TAXONOMY) {
      for (const topic of subjectItem.topics) {
        const topicWords = topic.toLowerCase().split(/[ &,/]+/);
        const hasMatch = topicWords.some((w) => w.length > 3 && raw.includes(w));
        if (hasMatch) {
          result.add(topic);
        }
      }
    }
  }

  return Array.from(result);
}

/**
 * Checks whether a question matches a selected topic filter.
 * Enables questions to belong to multiple topics depending on tags!
 */
export function doesQuestionMatchTopic(
  q: {
    topic?: string;
    topics?: string[];
    tags?: string[];
    subject?: string;
  },
  selectedTopic: string
): boolean {
  if (!selectedTopic || selectedTopic === "All") return true;

  const target = selectedTopic.toLowerCase().trim();

  // 1. Direct topic match
  if (q.topic && q.topic.toLowerCase().trim() === target) {
    return true;
  }

  // 2. Multi-topic array match
  if (Array.isArray(q.topics) && q.topics.some((t) => t.toLowerCase().trim() === target)) {
    return true;
  }

  // 3. Resolved topics from tags
  const resolved = resolveTopicsForQuestion(q);
  if (resolved.some((t) => t.toLowerCase().trim() === target)) {
    return true;
  }

  // 4. Direct tag match (e.g. user selected a topic that matches a tag directly)
  if (q.tags && q.tags.some((tag) => tag.toLowerCase().trim() === target || target.includes(tag.toLowerCase()))) {
    return true;
  }

  return false;
}

/**
 * Get list of all standard subject names
 */
export function getAllStandardSubjects(): string[] {
  return STANDARD_TAXONOMY.map((s) => s.name);
}

/**
 * Get list of all standard topics
 */
export function getAllStandardTopics(): string[] {
  const topics: string[] = [];
  for (const s of STANDARD_TAXONOMY) {
    topics.push(...s.topics);
  }
  return topics;
}
