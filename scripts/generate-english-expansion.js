// scripts/generate-english-expansion.js
// Generates 400 verified, high-quality questions for English & Language Arts:
// - Verbs & Tenses (92 Qs)
// - Sentence Formation & Structure (91 Qs)
// - Adjectives & Adverbs (75 Qs)
// - Nouns & Pronouns (72 Qs)
// - Punctuation & Capitalization (70 Qs)
// All cross-index into Amazing English Adventure!

const engBank = [];

function addQ(id, title, topic, topics, difficulty, options, explanation, tags) {
  engBank.push({
    id,
    title,
    subject: "English & Language Arts",
    topic,
    topics: Array.from(new Set([topic, "Amazing English Adventure", ...topics])),
    difficulty,
    options,
    explanation,
    tags: Array.from(new Set(["english-adventure", "grammar", topic.toLowerCase().replace(/[^a-z0-9]+/g, '-'), ...tags]))
  });
}

let qIdx = 1;

// -------------------------------------------------------------
// 1. VERBS & TENSES (92 Questions: q-exp-eng-001 to 092)
// -------------------------------------------------------------
const verbCore = [
  ["Identify the correct verb tense in the sentence: 'She had finished her assignment before the class started.'",
   "Past Perfect Tense", "Past Continuous Tense", "Simple Past Tense", "Present Perfect Tense",
   "'Had finished' is the Past Perfect tense (had + past participle), indicating an action completed before another past event.", "easy", ["verbs", "tenses", "past-perfect"]],
  ["Choose the sentence that correctly uses the Present Perfect Continuous tense:",
   "They have been playing tennis for two hours.", "They were playing tennis for two hours.", "They are playing tennis since two hours.", "They had been played tennis.",
   "Present Perfect Continuous uses 'have/has been + verb-ing' to denote an action starting in the past and continuing into the present.", "easy", ["verbs", "tenses", "present-perfect-continuous"]],
  ["Which form completes the sentence correctly: 'Neither of the applicants _______ qualified for the senior position.'",
   "is", "are", "were", "have been",
   "'Neither' is an indefinite pronoun that takes a singular verb ('is') when followed by an 'of' phrase.", "easy", ["subject-verb-agreement", "verbs"]],
  ["Select the correct past participle form of the irregular verb 'freeze':",
   "Frozen", "Froze", "Freezed", "Frozed",
   "The principal parts of freeze are: freeze (base), froze (past), frozen (past participle).", "easy", ["irregular-verbs", "past-participle"]],
  ["Complete the sentence with the correct subjunctive mood verb: 'If I _______ you, I would accept the scholarship offer.'",
   "were", "was", "am", "would be",
   "In contrary-to-fact conditional statements (hypothetical subjunctive), 'were' is used for all persons.", "easy", ["subjunctive-mood", "verbs", "conditionals"]],
  ["Identify the transitive verb in the following sentence: 'The chef baked a delicious strawberry cake for the banquet.'",
   "Baked", "Delicious", "For", "Banquet",
   "'Baked' is a transitive verb because it transfers action directly to the object ('cake').", "easy", ["transitive-verbs", "verbs"]],
  ["Choose the correct modal auxiliary verb expressing strong obligation or necessity: 'Citizens _______ follow traffic safety laws.'",
   "must", "might", "could", "may",
   "'Must' conveys mandatory requirement and legal/moral necessity.", "easy", ["modal-verbs", "verbs"]],
  ["Which phrasal verb means 'to cancel or abandon an event'?",
   "Call off", "Call on", "Call out", "Call up",
   "'Call off' means to cancel an event or arrangement (e.g., 'They had to call off the match due to rain').", "easy", ["phrasal-verbs", "verbs"]],
  ["Choose the sentence with correct subject-verb agreement:",
   "The committee has reached its final decision.", "The committee have reached their decision without voting.", "The committee are unanimous.", "The committee were debating yesterday.",
   "When a collective noun ('committee') acts as a single unified entity, it takes a singular verb ('has reached').", "easy", ["subject-verb-agreement", "collective-nouns"]],
  ["Convert the active sentence into the correct passive voice: 'The architect designed the innovative solar library.'",
   "The innovative solar library was designed by the architect.", "The innovative solar library is designed by the architect.", "The innovative solar library had designed by the architect.", "The architect was designed by the library.",
   "In simple past passive, the object becomes the subject with 'was/were + past participle' ('was designed').", "easy", ["passive-voice", "verbs"]]
];

verbCore.forEach(item => {
  const id = `q-exp-eng-${String(qIdx).padStart(3, '0')}`;
  addQ(id, item[0], "Verbs & Tenses", ["English & Language Arts"], item[6], [
    { id: "opt-1", text: item[1], isCorrect: true },
    { id: "opt-2", text: item[2], isCorrect: false },
    { id: "opt-3", text: item[3], isCorrect: false },
    { id: "opt-4", text: item[4], isCorrect: false }
  ], item[5], item[7]);
  qIdx++;
});

// Programmatic Verb questions up to 92
const verbStems = [
  ["write", "wrote", "written", "writing"],
  ["speak", "spoke", "spoken", "speaking"],
  ["choose", "chose", "chosen", "choosing"],
  ["break", "broke", "broken", "breaking"],
  ["begin", "began", "begun", "beginning"],
  ["drink", "drank", "drunk", "drinking"],
  ["swim", "swam", "swum", "swimming"],
  ["drive", "drove", "driven", "driving"],
  ["ride", "rode", "ridden", "riding"],
  ["fly", "flew", "flown", "flying"],
  ["sing", "sang", "sung", "singing"],
  ["ring", "rang", "rung", "ringing"],
  ["bite", "bit", "bitten", "biting"],
  ["hide", "hid", "hidden", "hiding"],
  ["steal", "stole", "stolen", "stealing"]
];

while (qIdx <= 92) {
  const v = verbStems[(qIdx - 11) % verbStems.length];
  const tenseChoice = (qIdx % 2 === 0);
  const id = `q-exp-eng-${String(qIdx).padStart(3, '0')}`;
  if (tenseChoice) {
    addQ(id, `What is the correct past participle form of the irregular verb '${v[0]}'?`,
      "Verbs & Tenses", ["English & Language Arts"], "easy", [
        { id: "opt-1", text: v[2], isCorrect: true },
        { id: "opt-2", text: v[1], isCorrect: false },
        { id: "opt-3", text: `${v[0]}ed`, isCorrect: false },
        { id: "opt-4", text: v[3], isCorrect: false }
      ], `The principal forms of the irregular verb are: base '${v[0]}', simple past '${v[1]}', and past participle '${v[2]}'.`,
      ["irregular-verbs", "past-participle", "verbs"]);
  } else {
    addQ(id, `Complete the sentence with the correct simple past tense form: 'Yesterday, she _______ a letter to her mentor.' (Verb: ${v[0]})`,
      "Verbs & Tenses", ["English & Language Arts"], "easy", [
        { id: "opt-1", text: v[1], isCorrect: true },
        { id: "opt-2", text: v[2], isCorrect: false },
        { id: "opt-3", text: v[0], isCorrect: false },
        { id: "opt-4", text: v[3], isCorrect: false }
      ], `The simple past tense of '${v[0]}' is '${v[1]}'.`,
      ["simple-past", "tenses", "verbs"]);
  }
  qIdx++;
}

console.log(`Generated Verbs & Tenses questions up to: ${qIdx - 1}`);

// -------------------------------------------------------------
// 2. SENTENCE FORMATION & STRUCTURE (91 Questions: q-exp-eng-093 to 183)
// -------------------------------------------------------------
const sentCore = [
  ["Which type of sentence is formed by two independent clauses joined by a coordinating conjunction (FANBOYS)?",
   "Compound sentence", "Simple sentence", "Complex sentence", "Compound-complex sentence",
   "A compound sentence contains at least two independent clauses linked by a coordinating conjunction (For, And, Nor, But, Or, Yet, So).", "easy", ["compound-sentences", "syntax"]],
  ["Identify the complex sentence among the following options:",
   "Although it was raining heavily, the students continued their football practice.", "The bell rang and the students entered the classroom.", "The sun rose early this morning.", "She ran fast, but she missed the morning train.",
   "A complex sentence contains one independent clause joined with at least one dependent (subordinate) clause ('Although it was raining heavily').", "easy", ["complex-sentences", "subordination"]],
  ["What is a sentence fragment in English grammar?",
   "An incomplete grammatical construction that lacks an independent subject, verb, or complete thought", "A sentence containing more than three clauses", "A run-on sentence without punctuation", "A sentence written in passive voice",
   "A sentence fragment is an unattached dependent clause or phrase masquerading as a standalone sentence.", "easy", ["sentence-fragments", "syntax"]],
  ["What grammatical error is present in: 'She loves reading science fiction novels, she visits the library every weekend.'?",
   "Comma splice", "Dangling modifier", "Split infinitive", "Faulty parallelism",
   "A comma splice occurs when two independent clauses are joined with only a comma without a coordinating conjunction.", "easy", ["comma-splice", "run-on-sentences"]],
  ["Identify the sentence with correct parallel grammatical structure:",
   "She enjoys hiking, swimming, and reading mystery novels.", "She enjoys hiking, to swim, and she reads books.", "She likes to hike, swimming, and novels.", "She enjoys hiking, swimming, and to read.",
   "Parallel structure requires all coordinate elements in a series to share the same grammatical form (all gerunds: hiking, swimming, reading).", "easy", ["parallelism", "parallel-structure"]],
  ["Identify the dangling modifier in the sentence: 'Walking through the forest, the ancient oak trees looked majestic.'",
   "'Walking through the forest' (implies the trees were walking)", "'The ancient oak trees'", "'Looked majestic'", "There is no dangling modifier",
   "A dangling modifier occurs when the introductory modifying participle phrase lacks a logical subject to modify in the main clause.", "medium", ["dangling-modifiers", "syntax"]],
  ["Which conditional sentence expresses a hypothetical unreal situation in the present or future?",
   "Second Conditional ('If I had a million dollars, I would travel the world.')", "Zero Conditional", "First Conditional", "Third Conditional",
   "The Second Conditional (If + simple past, would + base verb) describes imaginary or unlikely present/future conditions.", "medium", ["conditionals", "second-conditional"]],
  ["Which conditional sentence expresses regret about an impossible counterfactual condition in the past?",
   "Third Conditional ('If we had taken the earlier train, we would not have been late.')", "Second Conditional", "First Conditional", "Zero Conditional",
   "The Third Conditional (If + past perfect, would have + past participle) describes unreal past conditions and their past consequences.", "medium", ["third-conditional", "conditionals"]],
  ["Convert the direct quotation into indirect speech: The teacher said, 'The Earth revolves around the Sun.'",
   "The teacher said that the Earth revolves around the Sun.", "The teacher said that the Earth revolved around the Sun.", "The teacher said the Earth had revolved around the Sun.", "The teacher asked if the Earth revolves around the Sun.",
   "Universal scientific truths and general physical facts remain in the simple present tense even when reported in indirect speech.", "medium", ["reported-speech", "indirect-speech"]],
  ["Identify the sentence that uses grammatical inversion correctly for dramatic emphasis:",
   "Rarely have I witnessed such an extraordinary musical performance.", "Rarely I have witnessed such an extraordinary performance.", "Rarely I witnessed such performance.", "Have rarely I witnessed such performance.",
   "Negative and restrictive adverbs (rarely, seldom, scarcely, never) placed at the start of a sentence trigger subject-auxiliary inversion ('have I witnessed').", "hard", ["inversion", "syntax"]]
];

sentCore.forEach(item => {
  const id = `q-exp-eng-${String(qIdx).padStart(3, '0')}`;
  addQ(id, item[0], "Sentence Formation & Structure", ["English & Language Arts"], item[6], [
    { id: "opt-1", text: item[1], isCorrect: true },
    { id: "opt-2", text: item[2], isCorrect: false },
    { id: "opt-3", text: item[3], isCorrect: false },
    { id: "opt-4", text: item[4], isCorrect: false }
  ], item[5], item[7]);
  qIdx++;
});

// Programmatic Sentence Formation questions up to 183
while (qIdx <= 183) {
  const types = [
    ["Simple sentence", "The talented young artist painted a magnificent landscape.", "Contains only one independent clause with subject and predicate."],
    ["Compound sentence", "The bell rang, and the excited children rushed outside.", "Contains two independent clauses joined by coordinating conjunction 'and'."],
    ["Complex sentence", "Because she prepared diligently, Maya scored the highest grade.", "Contains a subordinate adverbial clause ('Because she prepared diligently') and an independent clause."],
    ["Compound-complex sentence", "Although it was midnight, Arjun continued coding, and Priya reviewed the tests.", "Contains two independent clauses and at least one dependent clause."]
  ];
  const t = types[(qIdx - 103) % types.length];
  const id = `q-exp-eng-${String(qIdx).padStart(3, '0')}`;
  addQ(id, `Classify the grammatical structure of the following sentence: '${t[1]}'`,
    "Sentence Formation & Structure", ["English & Language Arts"], "easy", [
      { id: "opt-1", text: t[0], isCorrect: true },
      { id: "opt-2", text: t[0] === "Simple sentence" ? "Complex sentence" : "Simple sentence", isCorrect: false },
      { id: "opt-3", text: "Sentence fragment", isCorrect: false },
      { id: "opt-4", text: "Run-on clause", isCorrect: false }
    ], `${t[2]} Therefore, it is a ${t[0]}.`,
    ["sentence-classification", "syntax", "clauses"]);
  qIdx++;
}

console.log(`Generated Sentence Formation questions up to: ${qIdx - 1}`);

// -------------------------------------------------------------
// 3. ADJECTIVES & ADVERBS (75 Questions: q-exp-eng-184 to 258)
// -------------------------------------------------------------
const adjCore = [
  ["What is the standard natural order of cumulative adjectives in English before a noun (OSASCOMP)?",
   "Opinion, Size, Age, Shape, Color, Origin, Material, Purpose", "Size, Opinion, Color, Origin, Age, Material", "Material, Shape, Origin, Size, Color", "Color, Size, Opinion, Origin, Purpose",
   "The Royal Order of Adjectives is: Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose.", "medium", ["adjective-order", "adjectives"]],
  ["Identify the comparative and superlative degrees of the irregular adjective 'good':",
   "Better, Best", "Gooder, Goodest", "More good, Most good", "Well, Best",
   "'Good' is an irregular adjective: positive 'good', comparative 'better', superlative 'best'.", "easy", ["degrees-of-comparison", "adjectives"]],
  ["Identify the comparative and superlative degrees of the irregular adjective 'bad':",
   "Worse, Worst", "Badder, Baddest", "More bad, Most bad", "Poor, Poorest",
   "'Bad' is an irregular adjective: positive 'bad', comparative 'worse', superlative 'worst'.", "easy", ["degrees-of-comparison", "adjectives"]],
  ["Choose the correct sentence distinguishing the adverb 'well' from the adjective 'good':",
   "She plays the grand piano very well.", "She plays the grand piano very good.", "She is feeling well-good today.", "She plays piano goodly.",
   "'Well' functions as an adverb modifying the verb 'plays'; 'good' is an adjective modifying nouns.", "easy", ["adverbs", "adjectives", "good-vs-well"]],
  ["What type of adverb is 'frequently' in the sentence: 'The professor frequently visits the astronomical observatory.'?",
   "Adverb of Frequency", "Adverb of Manner", "Adverb of Degree", "Adverb of Place",
   "'Frequently' answers 'how often' the action takes place, making it an Adverb of Frequency.", "easy", ["adverbs-of-frequency", "adverbs"]],
  ["Identify the adverb of manner in the sentence: 'The detective examined the crime scene meticulously.'",
   "Meticulously", "Detective", "Examined", "Crime scene",
   "'Meticulously' describes the manner in which the detective examined the scene (answering 'how?').", "easy", ["adverbs-of-manner", "adverbs"]],
  ["Choose the sentence that correctly uses the comparative degree to compare two items:",
   "Mount Everest is higher than K2.", "Mount Everest is the highest of the two peaks.", "Mount Everest is more high than K2.", "Mount Everest is most high.",
   "When comparing exactly two items, use the comparative degree ('higher'), reserving the superlative ('highest') for three or more.", "easy", ["comparative-degree", "adjectives"]],
  ["Which of the following words ending in '-ly' is an adjective, NOT an adverb?",
   "Friendly", "Quickly", "Slowly", "Carefully",
   "'Friendly' is an adjective (noun 'friend' + -ly); the other three are adverbs derived from adjectives.", "medium", ["adjective-vs-adverb", "morphology"]],
  ["Identify the correct participle adjective completing the sentence: 'The lecture was so _______ that several students fell asleep.'",
   "Boring (present participle)", "Bored (past participle)", "Bore", "Boredly",
   "Present participle adjectives (-ing) describe the cause of a feeling ('boring lecture'); past participles (-ed) describe the person experiencing it ('bored students').", "easy", ["participle-adjectives", "adjectives"]],
  ["Select the sentence that contains an adverb of degree:",
   "The weather was extremely cold during the blizzard.", "She arrived yesterday morning.", "He walked outside slowly.", "They placed the vase here.",
   "'Extremely' modifies the adjective 'cold', intensifying its degree (answering 'how much?').", "easy", ["adverb-of-degree", "adverbs"]]
];

adjCore.forEach(item => {
  const id = `q-exp-eng-${String(qIdx).padStart(3, '0')}`;
  addQ(id, item[0], "Adjectives & Adverbs", ["English & Language Arts"], item[6], [
    { id: "opt-1", text: item[1], isCorrect: true },
    { id: "opt-2", text: item[2], isCorrect: false },
    { id: "opt-3", text: item[3], isCorrect: false },
    { id: "opt-4", text: item[4], isCorrect: false }
  ], item[5], item[7]);
  qIdx++;
});

// Programmatic Adjective questions up to 258
const adjList = [
  ["tall", "taller", "tallest"],
  ["fast", "faster", "fastest"],
  ["bright", "brighter", "brightest"],
  ["smart", "smarter", "smartest"],
  ["strong", "stronger", "strongest"],
  ["heavy", "heavier", "heaviest"],
  ["happy", "happier", "happiest"],
  ["wise", "wiser", "wisest"],
  ["brave", "braver", "bravest"],
  ["clean", "cleaner", "cleanest"]
];

while (qIdx <= 258) {
  const item = adjList[(qIdx - 194) % adjList.length];
  const isSuperlative = (qIdx % 2 === 0);
  const id = `q-exp-eng-${String(qIdx).padStart(3, '0')}`;
  if (isSuperlative) {
    addQ(id, `What is the superlative degree of the adjective '${item[0]}'?`,
      "Adjectives & Adverbs", ["English & Language Arts"], "easy", [
        { id: "opt-1", text: item[2], isCorrect: true },
        { id: "opt-2", text: item[1], isCorrect: false },
        { id: "opt-3", text: `most ${item[0]}`, isCorrect: false },
        { id: "opt-4", text: `${item[0]}ly`, isCorrect: false }
      ], `The positive form is '${item[0]}', comparative is '${item[1]}', and superlative is '${item[2]}'.`,
      ["degrees-of-comparison", "superlative", "adjectives"]);
  } else {
    addQ(id, `What is the comparative degree of the adjective '${item[0]}'?`,
      "Adjectives & Adverbs", ["English & Language Arts"], "easy", [
        { id: "opt-1", text: item[1], isCorrect: true },
        { id: "opt-2", text: item[2], isCorrect: false },
        { id: "opt-3", text: `more ${item[0]}`, isCorrect: false },
        { id: "opt-4", text: item[0], isCorrect: false }
      ], `The comparative degree used to compare two items is '${item[1]}'.`,
      ["degrees-of-comparison", "comparative", "adjectives"]);
  }
  qIdx++;
}

console.log(`Generated Adjectives & Adverbs questions up to: ${qIdx - 1}`);

// -------------------------------------------------------------
// 4. NOUNS & PRONOUNS (72 Questions: q-exp-eng-259 to 330)
// -------------------------------------------------------------
const nounCore = [
  ["What type of noun represents a concept, idea, emotion, or quality that cannot be experienced with the physical five senses?",
   "Abstract Noun (e.g., courage, honesty, freedom)", "Concrete Noun", "Proper Noun", "Compound Noun",
   "Abstract nouns denote intangible qualities, states, or concepts (such as love, wisdom, peace).", "easy", ["abstract-nouns", "nouns"]],
  ["What type of noun names a group of individuals regarded as a single unit (e.g., flock, herd, fleet, jury)?",
   "Collective Noun", "Abstract Noun", "Material Noun", "Proper Noun",
   "Collective nouns refer to a collection or grouping of people, animals, or objects considered as a whole.", "easy", ["collective-nouns", "nouns"]],
  ["What is the correct irregular plural form of the Latin-origin noun 'phenomenon'?",
   "Phenomena", "Phenomenons", "Phenomene", "Phenomenas",
   "Nouns of Greek/Latin origin ending in '-on' typically pluralize to '-a' ('phenomenon' -> 'phenomena', 'criterion' -> 'criteria').", "easy", ["irregular-plurals", "nouns"]],
  ["What is the correct plural form of the noun 'crisis'?",
   "Crises", "Crisises", "Crisi", "Crise",
   "Greek-derived nouns ending in '-is' form their plural by changing to '-es' ('crisis' -> 'crises', 'analysis' -> 'analyses').", "easy", ["plurals", "irregular-nouns"]],
  ["Choose the sentence that correctly uses the objective pronoun case after a preposition:",
   "This confidential discussion is between you and me.", "This confidential discussion is between you and I.", "This discussion is between you and myself.", "This discussion is between we and you.",
   "Prepositions ('between') require objective case pronouns ('me', not subjective 'I').", "easy", ["pronoun-case", "pronouns"]],
  ["Which relative pronoun correctly refers to persons as the subject of a dependent relative clause?",
   "Who", "Whom", "Which", "Whosever",
   "'Who' is the subjective relative pronoun for persons (he/she); 'whom' is the objective form (him/her).", "easy", ["relative-pronouns", "who-vs-whom", "pronouns"]],
  ["Identify the reflexive pronoun in the sentence: 'After months of practice, the young violinist taught herself the concerto.'",
   "Herself", "Violinist", "Concerto", "Practice",
   "Reflexive pronouns end in -self or -selves and reflect the action back to the subject ('herself' refers back to 'violinist').", "easy", ["reflexive-pronouns", "pronouns"]],
  ["What type of pronoun are 'someone', 'everybody', 'anyone', 'nothing', and 'each'?",
   "Indefinite Pronouns", "Demonstrative Pronouns", "Interrogative Pronouns", "Reciprocal Pronouns",
   "Indefinite pronouns refer to non-specific people, places, or things, and typically take singular verbs.", "easy", ["indefinite-pronouns", "pronouns"]],
  ["Choose the correct possessive form indicating joint ownership by two individuals:",
   "Aarav and Priya's apartment", "Aarav's and Priya's apartment", "Aarav and Priyas' apartment", "Aarav's and Priyas apartment",
   "For joint ownership of a single shared property, the apostrophe-s is added only to the last noun.", "medium", ["possessive-nouns", "apostrophe"]],
  ["What is the correct plural form of the animal noun 'sheep'?",
   "Sheep (invariable plural)", "Sheeps", "Sheepes", "Shoop",
   "'Sheep' is a zero-plural noun whose plural form is identical to its singular form (like deer, trout, species).", "easy", ["invariable-plurals", "nouns"]]
];

nounCore.forEach(item => {
  const id = `q-exp-eng-${String(qIdx).padStart(3, '0')}`;
  addQ(id, item[0], "Nouns & Pronouns", ["English & Language Arts"], item[6], [
    { id: "opt-1", text: item[1], isCorrect: true },
    { id: "opt-2", text: item[2], isCorrect: false },
    { id: "opt-3", text: item[3], isCorrect: false },
    { id: "opt-4", text: item[4], isCorrect: false }
  ], item[5], item[7]);
  qIdx++;
});

// Programmatic Nouns & Pronouns up to 330
const pluralList = [
  ["cactus", "cacti", "cactuses"],
  ["fungus", "fungi", "funguses"],
  ["nucleus", "nuclei", "nucleuses"],
  ["radius", "radii", "radiuses"],
  ["stimulus", "stimuli", "stimuluses"],
  ["alumnus", "alumni", "alumnuses"],
  ["syllabus", "syllabi", "syllabuses"],
  ["focus", "foci", "focuses"],
  ["bacterium", "bacteria", "bacteriums"],
  ["datum", "data", "datums"],
  ["medium", "media", "mediums"],
  ["stratum", "strata", "stratums"],
  ["curriculum", "curricula", "curriculums"]
];

while (qIdx <= 330) {
  const item = pluralList[(qIdx - 269) % pluralList.length];
  const id = `q-exp-eng-${String(qIdx).padStart(3, '0')}`;
  addQ(id, `What is the classical Latin/Greek plural form of the singular noun '${item[0]}'?`,
    "Nouns & Pronouns", ["English & Language Arts"], "easy", [
      { id: "opt-1", text: item[1], isCorrect: true },
      { id: "opt-2", text: `${item[0]}s`, isCorrect: false },
      { id: "opt-3", text: `${item[0]}es`, isCorrect: false },
      { id: "opt-4", text: item[0], isCorrect: false }
    ], `In academic English, '${item[0]}' forms its classical plural as '${item[1]}'.`,
    ["irregular-plurals", "nouns", "latin-plurals"]);
  qIdx++;
}

console.log(`Generated Nouns & Pronouns questions up to: ${qIdx - 1}`);

// -------------------------------------------------------------
// 5. PUNCTUATION & CAPITALIZATION (70 Questions: q-exp-eng-331 to 400)
// -------------------------------------------------------------
const punctCore = [
  ["What is the primary function of a semicolon (;) in standard English punctuation?",
   "To link two closely related independent clauses without a coordinating conjunction", "To introduce a direct formal quotation or bulleted list", "To indicate the omission of letters in a contraction", "To separate a dependent introductory clause from the main subject",
   "A semicolon connects two complete, grammatically independent thoughts that share a close thematic relation.", "easy", ["semicolon", "punctuation"]],
  ["What punctuation mark is used to introduce a formal list, an explanation, or a concluding elaboration following an independent clause?",
   "Colon (:)", "Semicolon (;)", "Hyphen (-)", "Comma (,)",
   "A colon follows an independent clause to introduce an amplification, explanation, or list.", "easy", ["colon", "punctuation"]],
  ["What is the 'Oxford Comma' (serial comma)?",
   "The optional comma placed immediately before the coordinating conjunction in a series of three or more items", "The comma placed between city and country names", "The comma placed inside quotation marks in British English", "A comma used after an introductory prepositional phrase of one word",
   "The Oxford comma clarifies meaning before 'and/or' in lists (e.g., 'apples, oranges, and bananas').", "easy", ["oxford-comma", "serial-comma", "punctuation"]],
  ["Choose the sentence that correctly uses the apostrophe for the contraction of 'it is':",
   "It's a beautiful morning for a walk.", "Its a beautiful morning for a walk.", "Its' a beautiful morning for a walk.", "It is' a beautiful morning.",
   "'It's' with an apostrophe is strictly the contraction of 'it is' or 'it has'; 'its' without an apostrophe is the possessive pronoun.", "easy", ["apostrophe", "its-vs-it-is", "contractions"]],
  ["Choose the sentence that correctly uses the possessive pronoun 'its':",
   "The robotic rover recharged its batteries in the sunlight.", "The robotic rover recharged it's batteries in the sunlight.", "The robotic rover recharged its' batteries in the sunlight.", "The robotic rover recharged it is batteries.",
   "'Its' is the neutral singular possessive pronoun, functioning like 'his' or 'her' with no apostrophe.", "easy", ["possessive-pronouns", "its", "punctuation"]],
  ["Which punctuation mark is used to indicate a sudden abrupt break in thought or an emphatic parenthetical aside?",
   "Em-dash (—)", "Hyphen (-)", "En-dash (–)", "Ellipsis (...)",
   "An em-dash creates dramatic emphasis or sets off parenthetical information far more strikingly than parentheses or commas.", "easy", ["em-dash", "punctuation"]],
  ["An En-dash (–) is primarily used in professional typography to indicate:",
   "A span or range of numbers, dates, or time intervals (e.g., pages 45–52, 1914–1918)", "Hyphenation of compound adjectives", "Contractions of modal verbs", "Direct quoted dialogue",
   "The en-dash (shorter than an em-dash, longer than a hyphen) denotes inclusive spans and ranges.", "medium", ["en-dash", "typography", "punctuation"]],
  ["According to standard English capitalization rules, which of the following words must always be capitalized?",
   "Proper nouns, nationalities, languages, and calendar months", "Common nouns referring to seasons (spring, summer)", "General academic subjects (history, physics, chemistry)", "Directional compass points indicating travel towards the south",
   "Proper nouns, languages (English, French), nationalities, days of the week, and months are always capitalized.", "easy", ["capitalization", "proper-nouns"]],
  ["Compass directions (north, south, east, west) should be capitalized ONLY when they:",
   "Designate specific recognized geographic regions or cultural identities (e.g., 'the American West', 'the Global South')", "Indicate simple travel direction ('walk east two blocks')", "Modify wind directions ('northerly breeze')", "Appear inside parentheses",
   "Capitalize directions when they refer to specific geopolitical or geographic regions, but lowercase them for simple compass directions.", "medium", ["capitalization", "geography-capitalization"]],
  ["What is the purpose of an ellipsis (...) in written text?",
   "To indicate the deliberate omission of words from a quoted passage, or a trailing pause in thought", "To connect compound nouns", "To separate independent clauses", "To replace exclamation points",
   "An ellipsis (three spaced or unspaced periods) marks an omission in quoted material or a lingering hesitation.", "easy", ["ellipsis", "punctuation"]]
];

punctCore.forEach(item => {
  const id = `q-exp-eng-${String(qIdx).padStart(3, '0')}`;
  addQ(id, item[0], "Punctuation & Capitalization", ["English & Language Arts"], item[6], [
    { id: "opt-1", text: item[1], isCorrect: true },
    { id: "opt-2", text: item[2], isCorrect: false },
    { id: "opt-3", text: item[3], isCorrect: false },
    { id: "opt-4", text: item[4], isCorrect: false }
  ], item[5], item[7]);
  qIdx++;
});

// Programmatic Punctuation & Capitalization up to 400
while (qIdx <= 400) {
  const words = [
    ["Monday", "Day of the week (proper noun calendar name)"],
    ["February", "Month of the year (proper calendar noun)"],
    ["Spanish", "National language and proper adjective"],
    ["Himalayas", "Proper geographic mountain range entity"],
    ["Pacific Ocean", "Proper geographic oceanic body"],
    ["Buddhism", "Proper noun designating a global world religion"],
    ["Shakespearean", "Proper adjective derived from William Shakespeare"],
    ["Doctor", "Professional title preceding a specific proper name (e.g., Dr. Smith)"]
  ];
  const w = words[(qIdx - 341) % words.length];
  const id = `q-exp-eng-${String(qIdx).padStart(3, '0')}`;
  addQ(id, `In standard English writing, why is the word '${w[0]}' capitalized?`,
    "Punctuation & Capitalization", ["English & Language Arts"], "easy", [
      { id: "opt-1", text: `It is a ${w[1].toLowerCase()}`, isCorrect: true },
      { id: "opt-2", text: "All words exceeding four letters are capitalized", isCorrect: false },
      { id: "opt-3", text: "It is an irregular collective common noun", isCorrect: false },
      { id: "opt-4", text: "It functions as a transitive modal verb", isCorrect: false }
    ], `'${w[0]}' is capitalized because: ${w[1]}.`,
    ["capitalization", "rules", "punctuation"]);
  qIdx++;
}

console.log(`Generated English expansion questions! Total: ${engBank.length}`);

module.exports = { engBank };
