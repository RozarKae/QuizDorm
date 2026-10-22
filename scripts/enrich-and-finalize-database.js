// scripts/enrich-and-finalize-database.js
const fs = require('fs');
const path = require('path');
const { doesQuestionMatchTopic, getAllStandardTopics } = require('../lib/data/taxonomy.ts');

const boosterQuestions = [
  // Database Systems & SQL (5)
  {
    id: "q-boost-db-001",
    title: "In relational database engine architecture, how does Multi-Version Concurrency Control (MVCC) eliminate read-write contention?",
    subject: "Computer Science & AI",
    topic: "Database Systems & SQL",
    topics: ["Database Systems & SQL", "Computer Science & AI"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Readers never block writers and writers never block readers because readers access a snapshot of data at a transaction timestamp", isCorrect: true },
      { id: "opt-2", text: "By acquiring exclusive table-level locks before every SELECT statement", isCorrect: false },
      { id: "opt-3", text: "By storing all database tables entirely in unindexed volatile cache", isCorrect: false },
      { id: "opt-4", text: "By converting all concurrent write queries into synchronous single-threaded operations", isCorrect: false }
    ],
    explanation: "MVCC maintains multiple version snapshots of tuple records with transaction IDs (xmin/xmax), ensuring read queries see consistent historic snapshots without acquiring shared read locks that block concurrent updates.",
    tags: ["mvcc", "concurrency", "database-systems", "sql"]
  },
  {
    id: "q-boost-db-002",
    title: "Why are B+ Tree index structures universally preferred over standard binary search trees in relational disk storage engines?",
    subject: "Computer Science & AI",
    topic: "Database Systems & SQL",
    topics: ["Database Systems & SQL", "Computer Science & AI"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "High branching factor minimizes disk I/O page accesses and leaves are linked sequentially for efficient range scans", isCorrect: true },
      { id: "opt-2", text: "B+ Trees consume zero disk memory by compressing all indices into CPU registers", isCorrect: false },
      { id: "opt-3", text: "B+ Trees prevent any duplicate key inserts through binary parity hashing", isCorrect: false },
      { id: "opt-4", text: "B+ Trees execute search algorithms in strict O(1) constant time regardless of depth", isCorrect: false }
    ],
    explanation: "Disk I/O is the bottleneck in databases; B+ Trees store hundreds of child pointers per node page, keeping tree depth shallow (typically 3-4 levels) and linking all leaf nodes for fast range scans (e.g., WHERE age BETWEEN 20 AND 30).",
    tags: ["b-plus-tree", "indexing", "database-systems", "disk-io"]
  },
  {
    id: "q-boost-db-003",
    title: "In database transaction management, what fundamental role does Write-Ahead Logging (WAL) perform during crash recovery?",
    subject: "Computer Science & AI",
    topic: "Database Systems & SQL",
    topics: ["Database Systems & SQL", "Computer Science & AI"],
    difficulty: "hard",
    options: [
      { id: "opt-1", text: "Guarantees Atomicity and Durability by ensuring changes are flushed to append-only log disk before data pages are modified", isCorrect: true },
      { id: "opt-2", text: "Automatically normalizes all schemas into Boyce-Codd Normal Form", isCorrect: false },
      { id: "opt-3", text: "Eliminates network latency across distributed shards", isCorrect: false },
      { id: "opt-4", text: "Encrypts database passwords using quantum hashing", isCorrect: false }
    ],
    explanation: "WAL ensures that any change must be recorded in durable non-volatile log storage before dirty buffer pool pages are written to disk. On recovery, REDO and UNDO passes restore consistency.",
    tags: ["write-ahead-logging", "wal", "acid", "durability", "database-systems"]
  },
  {
    id: "q-boost-db-004",
    title: "A relation is in Boyce-Codd Normal Form (BCNF) if and only if for every non-trivial functional dependency X -> Y:",
    subject: "Computer Science & AI",
    topic: "Database Systems & SQL",
    topics: ["Database Systems & SQL", "Computer Science & AI"],
    difficulty: "hard",
    options: [
      { id: "opt-1", text: "X is a superkey of the relation", isCorrect: true },
      { id: "opt-2", text: "Y is a prime attribute of any candidate key", isCorrect: false },
      { id: "opt-3", text: "The table contains no foreign keys", isCorrect: false },
      { id: "opt-4", text: "All attributes are non-null text strings", isCorrect: false }
    ],
    explanation: "BCNF is a stricter form of 3NF. While 3NF permits non-prime attributes to depend on candidate keys or Y to be a prime attribute, BCNF strictly mandates that every determinant X must be a superkey.",
    tags: ["bcnf", "normalization", "functional-dependency", "database-systems"]
  },
  {
    id: "q-boost-db-005",
    title: "According to Eric Brewer's CAP Theorem, when an inevitable network partition (P) occurs in a distributed data store, the system must choose between:",
    subject: "Computer Science & AI",
    topic: "Database Systems & SQL",
    topics: ["Database Systems & SQL", "Computer Science & AI", "Web Technologies & Cloud Computing"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Consistency (CP: return errors or wait) or Availability (AP: return potentially stale responses immediately)", isCorrect: true },
      { id: "opt-2", text: "Encryption speed or compression ratio", isCorrect: false },
      { id: "opt-3", text: "Relational tables or document collections", isCorrect: false },
      { id: "opt-4", text: "TCP transport or UDP datagrams", isCorrect: false }
    ],
    explanation: "Under network partition, nodes cannot synchronize state in real time. The system must either reject writes to guarantee consistency (CP) or accept writes on isolated nodes sacrificing linearizability (AP).",
    tags: ["cap-theorem", "distributed-databases", "consistency", "availability"]
  },

  // Cybersecurity & Cryptography (4)
  {
    id: "q-boost-cyber-001",
    title: "The Diffie-Hellman Key Exchange algorithm enables two parties to securely establish a shared secret over an insecure channel based on the computational difficulty of:",
    subject: "Computer Science & AI",
    topic: "Cybersecurity & Cryptography",
    topics: ["Cybersecurity & Cryptography", "Computer Science & AI"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "The Discrete Logarithm Problem in a finite cyclic group", isCorrect: true },
      { id: "opt-2", text: "Finding collisions in SHA-256 hash digests", isCorrect: false },
      { id: "opt-3", text: "Sorting arbitrary arrays in sub-linear time", isCorrect: false },
      { id: "opt-4", text: "Decompressing Lempel-Ziv-Welch archives", isCorrect: false }
    ],
    explanation: "Given g, p, and g^a mod p, computing the exponent 'a' is the Discrete Logarithm Problem, which is computationally intractable for sufficiently large prime modulus p.",
    tags: ["diffie-hellman", "discrete-logarithm", "cryptography", "key-exchange"]
  },
  {
    id: "q-boost-cyber-002",
    title: "Which HTTP security header is the primary browser-level defense mechanism against Stored and Reflected Cross-Site Scripting (XSS) attacks?",
    subject: "Computer Science & AI",
    topic: "Cybersecurity & Cryptography",
    topics: ["Cybersecurity & Cryptography", "Computer Science & AI", "Web Technologies & Cloud Computing"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Content-Security-Policy (CSP) restricting authorized script origins and disallowing inline scripts", isCorrect: true },
      { id: "opt-2", text: "Strict-Transport-Security (HSTS) forcing TLS protocols", isCorrect: false },
      { id: "opt-3", text: "X-Frame-Options preventing iframe clickjacking", isCorrect: false },
      { id: "opt-4", text: "Access-Control-Allow-Origin for cross-origin resource sharing", isCorrect: false }
    ],
    explanation: "Content-Security-Policy (CSP) allows server administrators to declare whitelisted script sources and forbid arbitrary inline script execution ('unsafe-inline'), neutralizing injected script payloads.",
    tags: ["csp", "xss", "web-security", "cybersecurity"]
  },
  {
    id: "q-boost-cyber-003",
    title: "In zero-knowledge cryptography, what three fundamental properties must every Zero-Knowledge Proof (ZKP) satisfy?",
    subject: "Computer Science & AI",
    topic: "Cybersecurity & Cryptography",
    topics: ["Cybersecurity & Cryptography", "Computer Science & AI"],
    difficulty: "hard",
    options: [
      { id: "opt-1", text: "Completeness (honest prover convinces verifier), Soundness (dishonest prover cannot convince verifier), and Zero-Knowledge (reveals nothing beyond validity)", isCorrect: true },
      { id: "opt-2", text: "Confidentiality, Integrity, and Non-repudiation", isCorrect: false },
      { id: "opt-3", text: "Authentication, Authorization, and Accounting", isCorrect: false },
      { id: "opt-4", text: "Symmetric encryption, Asymmetric signature, and Key encapsulation", isCorrect: false }
    ],
    explanation: "Goldwasser, Micali, and Rackoff formulated ZKPs requiring: Completeness (true statements are accepted), Soundness (false statements are rejected with overwhelming probability), and Zero-Knowledge (no information leakage).",
    tags: ["zkp", "zero-knowledge", "cryptography", "soundness"]
  },
  {
    id: "q-boost-cyber-004",
    title: "In RSA asymmetric public key encryption, the public exponent 'e' and private exponent 'd' satisfy which mathematical congruence relation with Euler's totient function φ(n)?",
    subject: "Computer Science & AI",
    topic: "Cybersecurity & Cryptography",
    topics: ["Cybersecurity & Cryptography", "Computer Science & AI", "Number Theory & Discrete Math"],
    difficulty: "hard",
    options: [
      { id: "opt-1", text: "e * d ≡ 1 (mod φ(n)), meaning d is the modular multiplicative inverse of e modulo φ(n)", isCorrect: true },
      { id: "opt-2", text: "e + d = φ(n)", isCorrect: false },
      { id: "opt-3", text: "e * d = n²", isCorrect: false },
      { id: "opt-4", text: "d ≡ e² (mod n)", isCorrect: false }
    ],
    explanation: "By Euler's theorem, m^(φ(n)) ≡ 1 (mod n). Setting e * d = 1 + k*φ(n) ensures (m^e)^d ≡ m^(e*d) ≡ m (mod n), recovering the original plaintext.",
    tags: ["rsa", "eulers-totient", "asymmetric-cryptography", "modular-arithmetic"]
  },

  // Nouns & Pronouns (4)
  {
    id: "q-boost-noun-001",
    title: "Which sentence correctly demonstrates singular subject-verb agreement with a collective noun acting as a single unified entity?",
    subject: "English & Language Arts",
    topic: "Nouns & Pronouns",
    topics: ["Nouns & Pronouns", "English & Language Arts", "Amazing English Adventure"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The jury has reached its unanimous verdict after three hours of deliberation.", isCorrect: true },
      { id: "opt-2", text: "The jury have reached its unanimous verdict after three hours of deliberation.", isCorrect: false },
      { id: "opt-3", text: "The jury are reaching their singular verdict unanimously.", isCorrect: false },
      { id: "opt-4", text: "The jury has reached their unanimous verdict together.", isCorrect: false }
    ],
    explanation: "When a collective noun (jury, committee, team) functions as a single unified unit, it takes a singular verb ('has reached') and singular pronoun ('its').",
    tags: ["collective-nouns", "pronoun-agreement", "nouns", "grammar"]
  },
  {
    id: "q-boost-noun-002",
    title: "In the sentence 'The scientist who discovered the cure was awarded the medal', what type of pronoun is 'who'?",
    subject: "English & Language Arts",
    topic: "Nouns & Pronouns",
    topics: ["Nouns & Pronouns", "English & Language Arts", "Amazing English Adventure"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Relative pronoun introducing a defining adjective clause", isCorrect: true },
      { id: "opt-2", text: "Interrogative pronoun asking a direct question", isCorrect: false },
      { id: "opt-3", text: "Demonstrative pronoun pointing to a physical object", isCorrect: false },
      { id: "opt-4", text: "Indefinite pronoun referring to unspecified persons", isCorrect: false }
    ],
    explanation: "'Who' functions as a relative pronoun connecting the dependent relative clause ('who discovered the cure') to its antecedent noun ('The scientist').",
    tags: ["relative-pronouns", "pronouns", "english-grammar"]
  },
  {
    id: "q-boost-noun-003",
    title: "In the sentence 'The prime minister herself inspected the relief camp', how does the pronoun 'herself' grammatically function?",
    subject: "English & Language Arts",
    topic: "Nouns & Pronouns",
    topics: ["Nouns & Pronouns", "English & Language Arts", "Amazing English Adventure"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Intensive (emphatic) pronoun adding emphasis to the subject noun, which can be omitted without altering grammatical completeness", isCorrect: true },
      { id: "opt-2", text: "Reflexive pronoun acting as the essential direct object of the verb", isCorrect: false },
      { id: "opt-3", text: "Reciprocal pronoun indicating mutual action between two agents", isCorrect: false },
      { id: "opt-4", text: "Possessive pronoun modifying a noun phrase", isCorrect: false }
    ],
    explanation: "An intensive pronoun emphasizes its antecedent ('the prime minister') and can be removed without making the sentence ungrammatical, unlike a reflexive pronoun.",
    tags: ["intensive-pronoun", "reflexive-pronoun", "pronouns", "grammar"]
  },
  {
    id: "q-boost-noun-004",
    title: "In formal standard English grammar, which pronoun case must modify a gerund (verbal noun ending in -ing)?",
    subject: "English & Language Arts",
    topic: "Nouns & Pronouns",
    topics: ["Nouns & Pronouns", "English & Language Arts", "Sentence Formation & Structure"],
    difficulty: "hard",
    options: [
      { id: "opt-1", text: "Possessive case (e.g., 'We appreciated their submitting the report on time')", isCorrect: true },
      { id: "opt-2", text: "Objective case (e.g., 'them submitting')", isCorrect: false },
      { id: "opt-3", text: "Nominative case (e.g., 'they submitting')", isCorrect: false },
      { id: "opt-4", text: "Reflexive case (e.g., 'themselves submitting')", isCorrect: false }
    ],
    explanation: "Because a gerund functions as a noun, the modifier showing who performs the action must be in the possessive case ('their submitting', 'his arriving').",
    tags: ["possessive-case", "gerunds", "pronouns", "syntax"]
  },

  // Verbs & Tenses (4)
  {
    id: "q-boost-verb-001",
    title: "Which sentence correctly uses the present subjunctive mood to express a formal demand or recommendation?",
    subject: "English & Language Arts",
    topic: "Verbs & Tenses",
    topics: ["Verbs & Tenses", "English & Language Arts", "Amazing English Adventure"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "The board recommended that the director submit his resignation immediately.", isCorrect: true },
      { id: "opt-2", text: "The board recommended that the director submits his resignation immediately.", isCorrect: false },
      { id: "opt-3", text: "The board recommended that the director submitted his resignation immediately.", isCorrect: false },
      { id: "opt-4", text: "The board recommended that the director will submit his resignation immediately.", isCorrect: false }
    ],
    explanation: "The subjunctive mood uses the bare infinitive verb form ('submit', not 'submits' or 'submitted') following verbs of demand, recommendation, or necessity (mandative subjunctive).",
    tags: ["subjunctive-mood", "verbs", "tenses", "grammar"]
  },
  {
    id: "q-boost-verb-002",
    title: "Which tense is correctly employed to describe an action that started in the past, has continued continuously up to the present moment, and may continue into the future?",
    subject: "English & Language Arts",
    topic: "Verbs & Tenses",
    topics: ["Verbs & Tenses", "English & Language Arts", "Amazing English Adventure"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Present Perfect Continuous (e.g., 'She has been researching vaccines for five years')", isCorrect: true },
      { id: "opt-2", text: "Past Perfect Continuous", isCorrect: false },
      { id: "opt-3", text: "Simple Present Tense", isCorrect: false },
      { id: "opt-4", text: "Future Continuous Tense", isCorrect: false }
    ],
    explanation: "Present Perfect Continuous (has/have been + V-ing) denotes an ongoing activity spanning from the past right up to the current moment.",
    tags: ["present-perfect-continuous", "tenses", "verbs"]
  },
  {
    id: "q-boost-verb-003",
    title: "In English grammar, how does a transitive verb differ fundamentally from an intransitive verb?",
    subject: "English & Language Arts",
    topic: "Verbs & Tenses",
    topics: ["Verbs & Tenses", "English & Language Arts", "Amazing English Adventure"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "A transitive verb requires a direct object to complete its meaning, whereas an intransitive verb does not take a direct object", isCorrect: true },
      { id: "opt-2", text: "A transitive verb only occurs in the future tense", isCorrect: false },
      { id: "opt-3", text: "An intransitive verb cannot have an adverb modifier", isCorrect: false },
      { id: "opt-4", text: "Transitive verbs can never be converted into passive voice", isCorrect: false }
    ],
    explanation: "Transitive verbs transfer action directly to an object (e.g., 'She wrote a letter'), whereas intransitive verbs express action that does not pass over to an object (e.g., 'He slept').",
    tags: ["transitive-verbs", "intransitive-verbs", "grammar", "verbs"]
  },
  {
    id: "q-boost-verb-004",
    title: "Which modal verb construction correctly expresses a strong logical deduction about a past event that almost certainly occurred?",
    subject: "English & Language Arts",
    topic: "Verbs & Tenses",
    topics: ["Verbs & Tenses", "English & Language Arts", "Amazing English Adventure"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "must have + past participle (e.g., 'The streets are soaking wet; it must have rained heavily')", isCorrect: true },
      { id: "opt-2", text: "should have + past participle", isCorrect: false },
      { id: "opt-3", text: "might have + present participle", isCorrect: false },
      { id: "opt-4", text: "could have + base form", isCorrect: false }
    ],
    explanation: "'Must have + V3' expresses near certainty based on concrete present evidence in past deduction.",
    tags: ["modal-verbs", "past-deduction", "verbs", "grammar"]
  },

  // Sentence Formation & Structure (4)
  {
    id: "q-boost-sent-001",
    title: "In English rhetoric and syntax, what defines a 'periodic sentence'?",
    subject: "English & Language Arts",
    topic: "Sentence Formation & Structure",
    topics: ["Sentence Formation & Structure", "English & Language Arts", "Amazing English Adventure"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "A sentence that withholds its main independent clause or predicate until the very end, building suspense", isCorrect: true },
      { id: "opt-2", text: "A sentence that repeats the same conjunction between every item in a list", isCorrect: false },
      { id: "opt-3", text: "A sentence composed solely of two coordinating independent clauses", isCorrect: false },
      { id: "opt-4", text: "A sentence missing its subject or finite verb", isCorrect: false }
    ],
    explanation: "A periodic sentence places modifying phrases and subordinate clauses first, saving the main clause until the end near the period for rhetorical climax (e.g., 'Despite the rain, the delay, and the biting cold, we arrived victoriously').",
    tags: ["periodic-sentence", "syntax", "sentence-structure"]
  },
  {
    id: "q-boost-sent-002",
    title: "Which sentence correctly repairs the dangling modifier present in 'Walking into the laboratory, the beaker shattered'?",
    subject: "English & Language Arts",
    topic: "Sentence Formation & Structure",
    topics: ["Sentence Formation & Structure", "English & Language Arts", "Amazing English Adventure"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Walking into the laboratory, the chemist dropped and shattered the beaker.", isCorrect: true },
      { id: "opt-2", text: "Walking into the laboratory, a sudden crash was heard from the beaker.", isCorrect: false },
      { id: "opt-3", text: "The beaker, walking into the laboratory, shattered on the floor.", isCorrect: false },
      { id: "opt-4", text: "Having walked into the laboratory, the floor was covered in broken glass.", isCorrect: false }
    ],
    explanation: "A participial introductory modifier must logically modify the grammatical subject immediately following the comma. Beakers cannot walk; the chemist walks.",
    tags: ["dangling-modifier", "sentence-structure", "grammar"]
  },
  {
    id: "q-boost-sent-003",
    title: "Which sentence demonstrates flawless parallel grammatical structure when using correlative conjunctions?",
    subject: "English & Language Arts",
    topic: "Sentence Formation & Structure",
    topics: ["Sentence Formation & Structure", "English & Language Arts", "Amazing English Adventure"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The architect was praised not only for her innovative blueprint but also for her sustainable materials.", isCorrect: true },
      { id: "opt-2", text: "The architect was praised not only for her blueprint but also because she used sustainable materials.", isCorrect: false },
      { id: "opt-3", text: "Not only the architect designed blueprints but also used materials.", isCorrect: false },
      { id: "opt-4", text: "The architect not only was praised for blueprints but also materials.", isCorrect: false }
    ],
    explanation: "Correlative conjunctions ('not only... but also') must link grammatically parallel elements (here, two parallel prepositional phrases 'for her innovative blueprint' and 'for her sustainable materials').",
    tags: ["parallel-structure", "correlative-conjunctions", "syntax"]
  },
  {
    id: "q-boost-sent-004",
    title: "A 'compound-complex sentence' is grammatically defined as containing at least:",
    subject: "English & Language Arts",
    topic: "Sentence Formation & Structure",
    topics: ["Sentence Formation & Structure", "English & Language Arts", "Amazing English Adventure"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Two independent clauses and at least one dependent (subordinate) clause", isCorrect: true },
      { id: "opt-2", text: "One independent clause and two subordinate clauses only", isCorrect: false },
      { id: "opt-3", text: "Three independent clauses connected by semicolons without subordinating conjunctions", isCorrect: false },
      { id: "opt-4", text: "One independent clause with compound subjects and predicates", isCorrect: false }
    ],
    explanation: "A compound-complex sentence blends compound structure (two or more main clauses joined by coordinating conjunctions) with complex structure (one or more dependent clauses).",
    tags: ["compound-complex", "clause-analysis", "syntax"]
  },

  // Periodic Table & Chemical Bonding (3)
  {
    id: "q-boost-pt-001",
    title: "According to Fajans' Rules in chemical bonding, which combination of ionic attributes produces the highest degree of covalent character in an ionic bond?",
    subject: "Chemical Sciences",
    topic: "Periodic Table & Chemical Bonding",
    topics: ["Periodic Table & Chemical Bonding", "Chemical Sciences"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Small cation with high positive charge and large, easily polarizable anion", isCorrect: true },
      { id: "opt-2", text: "Large cation with low charge and small anion with high electronegativity", isCorrect: false },
      { id: "opt-3", text: "Both cation and anion with equal large radii and +1/-1 charges", isCorrect: false },
      { id: "opt-4", text: "Noble gas electron configurations in giant anions", isCorrect: false }
    ],
    explanation: "Fajans' Rules dictate that high polarizing power of a small, highly charged cation distorts the polarizable electron cloud of a large anion, introducing significant covalent character.",
    tags: ["fajans-rules", "chemical-bonding", "polarization", "ionic-covalent"]
  },
  {
    id: "q-boost-pt-002",
    title: "The 'Lanthanide Contraction' refers to the steady decrease in atomic and ionic radii across the 4f elements, which causes which remarkable chemical phenomenon in the d-block?",
    subject: "Chemical Sciences",
    topic: "Periodic Table & Chemical Bonding",
    topics: ["Periodic Table & Chemical Bonding", "Chemical Sciences", "Inorganic Chemistry & Coordination"],
    difficulty: "hard",
    options: [
      { id: "opt-1", text: "Nearly identical atomic radii and chemical properties between 4d and 5d elements of the same group (e.g., Zr and Hf)", isCorrect: true },
      { id: "opt-2", text: "Sudden transition of transition metals into non-conductive insulators", isCorrect: false },
      { id: "opt-3", text: "Complete absence of paramagnetic states across period 6", isCorrect: false },
      { id: "opt-4", text: "Sharp drop in electronegativity between groups 3 and 12", isCorrect: false }
    ],
    explanation: "Because 4f electrons provide poor nuclear shielding, effective nuclear charge increases rapidly across the lanthanides, shrinking 5d transition metals so that Zirconium (Zr, 160 pm) and Hafnium (Hf, 159 pm) share almost identical radii.",
    tags: ["lanthanide-contraction", "periodic-table", "atomic-radii"]
  },
  {
    id: "q-boost-pt-003",
    title: "Using Molecular Orbital (MO) Theory, what is the calculated bond order and magnetic behavior of the ground-state diatomic oxygen molecule (O2)?",
    subject: "Chemical Sciences",
    topic: "Periodic Table & Chemical Bonding",
    topics: ["Periodic Table & Chemical Bonding", "Chemical Sciences"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Bond order = 2.0, Paramagnetic (due to two unpaired electrons in antibonding π*2px and π*2py orbitals)", isCorrect: true },
      { id: "opt-2", text: "Bond order = 1.0, Diamagnetic", isCorrect: false },
      { id: "opt-3", text: "Bond order = 3.0, Ferromagnetic", isCorrect: false },
      { id: "opt-4", text: "Bond order = 2.5, Antiferromagnetic", isCorrect: false }
    ],
    explanation: "O2 has 10 bonding electrons and 6 antibonding electrons: Bond Order = (10 - 6) / 2 = 2. Hund's rule leaves 1 unpaired electron in each degenerate π*2p orbital, explaining its experimental paramagnetism.",
    tags: ["molecular-orbital-theory", "bond-order", "paramagnetism", "bonding"]
  },

  // World History & Global Conflicts (3)
  {
    id: "q-boost-wh-001",
    title: "The Peace of Westphalia (1648), ending the devastating Thirty Years' War in Central Europe, established which cornerstone concept of modern international law?",
    subject: "History & Polity",
    topic: "World History & Global Conflicts",
    topics: ["World History & Global Conflicts", "History & Polity", "Political Systems & International Relations"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Westphalian sovereignty: the principle of sovereign state equality and non-intervention in domestic affairs", isCorrect: true },
      { id: "opt-2", text: "The establishment of the United Nations Security Council", isCorrect: false },
      { id: "opt-3", text: "A unified global currency tied to silver reserves", isCorrect: false },
      { id: "opt-4", text: "The abolition of standing standing armies across European monarchies", isCorrect: false }
    ],
    explanation: "The treaties of Münster and Osnabrück recognized territorial sovereignty, religious self-determination (cuius regio, eius religio), and inter-state legal equality without papal supremacy.",
    tags: ["peace-of-westphalia", "sovereignty", "world-history", "treaties"]
  },
  {
    id: "q-boost-wh-002",
    title: "Convened in 1814-1815 after the defeat of Napoleon Bonaparte, the Congress of Vienna sought primarily to:",
    subject: "History & Polity",
    topic: "World History & Global Conflicts",
    topics: ["World History & Global Conflicts", "History & Polity"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Restore a conservative balance of power in Europe and contain revolutionary upheaval through the Concert of Europe", isCorrect: true },
      { id: "opt-2", text: "Partition the Ottoman Empire among African colonies", isCorrect: false },
      { id: "opt-3", text: "Institute direct universal democratic suffrage across all participant states", isCorrect: false },
      { id: "opt-4", text: "Dissolve all European monarchies into constitutional republics", isCorrect: false }
    ],
    explanation: "Led by Austrian statesman Klemens von Metternich, the Congress redrew European borders to balance major powers (Austria, Prussia, Russia, Britain, France) preventing continental hegemony.",
    tags: ["congress-of-vienna", "metternich", "balance-of-power", "world-history"]
  },
  {
    id: "q-boost-wh-003",
    title: "Officially known as the European Recovery Program, the Marshall Plan (1948) provided over $13 billion in US economic aid to Western Europe primarily to:",
    subject: "History & Polity",
    topic: "World History & Global Conflicts",
    topics: ["World History & Global Conflicts", "History & Polity"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Rebuild war-devastated economies, remove trade barriers, and prevent the expansion of Soviet communism", isCorrect: true },
      { id: "opt-2", text: "Repay British war debts directly to Imperial Japan", isCorrect: false },
      { id: "opt-3", text: "Fund space exploration missions across the Atlantic alliance", isCorrect: false },
      { id: "opt-4", text: "Construct the Suez Canal under Anglo-American mandate", isCorrect: false }
    ],
    explanation: "Announced by Secretary of State George C. Marshall, the initiative fostered rapid European industrial resurgence and stabilized democratic governments against Cold War Soviet influence.",
    tags: ["marshall-plan", "cold-war", "post-wwii", "world-history"]
  },

  // Macroeconomics, Banking & Trade (3)
  {
    id: "q-boost-econ-001",
    title: "The classic short-run Phillips Curve demonstrates an inverse relationship between which two macroeconomic variables?",
    subject: "General Awareness & Logic",
    topic: "Macroeconomics, Banking & Trade",
    topics: ["Macroeconomics, Banking & Trade", "General Awareness & Logic"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Inflation rate and Unemployment rate", isCorrect: true },
      { id: "opt-2", text: "Gross Domestic Product and Foreign Exchange reserves", isCorrect: false },
      { id: "opt-3", text: "Import tariffs and National debt", isCorrect: false },
      { id: "opt-4", text: "Money supply and Corporate tax rate", isCorrect: false }
    ],
    explanation: "A.W. Phillips showed that lower unemployment tends to push up wages and prices, resulting in higher inflation in the short run (trade-off).",
    tags: ["phillips-curve", "macroeconomics", "inflation", "unemployment"]
  },
  {
    id: "q-boost-econ-002",
    title: "When a central bank conducts Open Market Operations (OMO) by selling government securities in the open market, what is the direct monetary effect?",
    subject: "General Awareness & Logic",
    topic: "Macroeconomics, Banking & Trade",
    topics: ["Macroeconomics, Banking & Trade", "General Awareness & Logic"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Absorbs liquidity from the banking system, reducing money supply and increasing short-term interest rates", isCorrect: true },
      { id: "opt-2", text: "Injects fresh cash reserves into commercial banks, lowering interest rates", isCorrect: false },
      { id: "opt-3", text: "Immediately increases the budget deficit of the federal government", isCorrect: false },
      { id: "opt-4", text: "Directly fixes foreign exchange exchange rates at a pegged parity", isCorrect: false }
    ],
    explanation: "Selling securities withdraws liquidity from commercial banks' reserve accounts, contracting money supply to curb inflationary pressure.",
    tags: ["open-market-operations", "central-banking", "monetary-policy"]
  },
  {
    id: "q-boost-econ-003",
    title: "David Ricardo's Law of Comparative Advantage demonstrates that international trade is mutually beneficial for two nations whenever:",
    subject: "General Awareness & Logic",
    topic: "Macroeconomics, Banking & Trade",
    topics: ["Macroeconomics, Banking & Trade", "General Awareness & Logic"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Each nation specializes in goods it can produce at a lower relative opportunity cost, even if one nation has an absolute advantage in all goods", isCorrect: true },
      { id: "opt-2", text: "Both nations have identical labor productivity and wage levels", isCorrect: false },
      { id: "opt-3", text: "Tariffs are maximized on all non-agricultural goods", isCorrect: false },
      { id: "opt-4", text: "One country exports all manufactured products while the other exports only raw bullion", isCorrect: false }
    ],
    explanation: "Comparative advantage hinges on opportunity cost. As long as countries specialize in goods where their opportunity cost is lowest, total global output and consumption expand.",
    tags: ["comparative-advantage", "david-ricardo", "international-trade"]
  },

  // Applied Geometry & Trigonometry (2)
  {
    id: "q-boost-geom-001",
    title: "In an arbitrary oblique triangle ABC with sides a, b, c and angle C opposite to side c, the Law of Cosines is formulated as:",
    subject: "Mathematics & Quantitative",
    topic: "Applied Geometry & Trigonometry",
    topics: ["Applied Geometry & Trigonometry", "Mathematics & Quantitative"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "c² = a² + b² - 2ab * cos(C)", isCorrect: true },
      { id: "opt-2", text: "c² = a² + b² + 2ab * sin(C)", isCorrect: false },
      { id: "opt-3", text: "c = a * cos(A) + b * cos(B)", isCorrect: false },
      { id: "opt-4", text: "c² = a² - b² + ab * tan(C)", isCorrect: false }
    ],
    explanation: "The Law of Cosines generalizes the Pythagorean theorem for any triangle; when C = 90°, cos(90°) = 0, reducing to c² = a² + b².",
    tags: ["law-of-cosines", "trigonometry", "geometry"]
  },
  {
    id: "q-boost-geom-002",
    title: "According to Euler's polyhedral formula, for any convex three-dimensional polyhedron with V vertices, E edges, and F faces:",
    subject: "Mathematics & Quantitative",
    topic: "Applied Geometry & Trigonometry",
    topics: ["Applied Geometry & Trigonometry", "Mathematics & Quantitative", "Number Theory & Discrete Math"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "V - E + F = 2", isCorrect: true },
      { id: "opt-2", text: "V + E - F = 0", isCorrect: false },
      { id: "opt-3", text: "V * F = 2E", isCorrect: false },
      { id: "opt-4", text: "V + E + F = 12", isCorrect: false }
    ],
    explanation: "Euler's characteristic χ = V - E + F = 2 holds for all spherical/convex polyhedra (e.g., cube: 8 vertices, 12 edges, 6 faces: 8 - 12 + 6 = 2).",
    tags: ["eulers-formula", "polyhedra", "geometry"]
  },

  // Endocrinology & Immunology (2)
  {
    id: "q-boost-endo-001",
    title: "The hypothalamic-pituitary-adrenal (HPA) neuroendocrine axis regulates the human physiological response to chronic stress through which primary glucocorticoid hormone?",
    subject: "Life Sciences & Health",
    topic: "Endocrinology & Immunology",
    topics: ["Endocrinology & Immunology", "Life Sciences & Health", "Human Body Heroes"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Cortisol (released from the adrenal cortex zona fasciculata)", isCorrect: true },
      { id: "opt-2", text: "Glucagon (from pancreatic alpha cells)", isCorrect: false },
      { id: "opt-3", text: "Melatonin (from the pineal gland)", isCorrect: false },
      { id: "opt-4", text: "Thyroxine (from the thyroid follicles)", isCorrect: false }
    ],
    explanation: "Hypothalamic CRH stimulates pituitary ACTH, prompting adrenal cortisol release, which mediates gluconeogenesis, immunosuppression, and stress homeostasis.",
    tags: ["hpa-axis", "cortisol", "endocrinology", "stress"]
  },
  {
    id: "q-boost-endo-002",
    title: "Major Histocompatibility Complex Class I (MHC-I) molecules present endogenous peptide antigens to which specific subset of immune cells?",
    subject: "Life Sciences & Health",
    topic: "Endocrinology & Immunology",
    topics: ["Endocrinology & Immunology", "Life Sciences & Health"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "CD8+ Cytotoxic T lymphocytes", isCorrect: true },
      { id: "opt-2", text: "CD4+ T helper lymphocytes", isCorrect: false },
      { id: "opt-3", text: "Mature B-cell plasma lymphocytes", isCorrect: false },
      { id: "opt-4", text: "Circulating basophils and eosinophils", isCorrect: false }
    ],
    explanation: "MHC Class I is expressed on all nucleated cells, presenting intracellular viral/tumor peptides to CD8+ cytotoxic T cells to trigger apoptosis.",
    tags: ["mhc-class-1", "immunology", "cytotoxic-t-cells"]
  },

  // Political Systems & International Relations (2)
  {
    id: "q-boost-pol-001",
    title: "In international relations theory, the Realist school of thought posits that the international system is characterized primarily by:",
    subject: "History & Polity",
    topic: "Political Systems & International Relations",
    topics: ["Political Systems & International Relations", "History & Polity"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Anarchy (absence of a central sovereign authority), where rational unitary states pursue national security and power", isCorrect: true },
      { id: "opt-2", text: "Universal moral consensus governed by international charity tribunals", isCorrect: false },
      { id: "opt-3", text: "Subjugation of states to transnational corporate monopolies", isCorrect: false },
      { id: "opt-4", text: "Complete military disarmament supervised by the World Court", isCorrect: false }
    ],
    explanation: "Realism (Morgenthau, Mearsheimer, Waltz) models sovereign states navigating an anarchic arena where self-help and balance of power determine survival.",
    tags: ["realism", "international-relations", "political-theory"]
  },
  {
    id: "q-boost-pol-002",
    title: "In presidential federal republics such as the United States, how does the presidential veto illustrate institutional checks and balances?",
    subject: "History & Polity",
    topic: "Political Systems & International Relations",
    topics: ["Political Systems & International Relations", "History & Polity", "Indian Constitution & Governance"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The President can reject legislation passed by Congress, which Congress can then override with a two-thirds supermajority in both chambers", isCorrect: true },
      { id: "opt-2", text: "The President can dissolve the legislature permanently without re-election", isCorrect: false },
      { id: "opt-3", text: "The President can rewrite bills into law without legislative consent", isCorrect: false },
      { id: "opt-4", text: "The Supreme Court automatically vetoes all executive executive orders", isCorrect: false }
    ],
    explanation: "The executive veto checks legislative overreach, while the legislative power to override with a 2/3 supermajority checks executive obstructionism.",
    tags: ["checks-and-balances", "presidential-system", "veto-power"]
  },

  // Public Administration & Policy (2)
  {
    id: "q-boost-pub-001",
    title: "Max Weber's ideal-typical model of rational-legal bureaucracy is distinguished by which core structural feature?",
    subject: "History & Polity",
    topic: "Public Administration & Policy",
    topics: ["Public Administration & Policy", "History & Polity"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Hierarchical authority, merit-based recruitment, jurisdictional competence, and impersonal application of written rules", isCorrect: true },
      { id: "opt-2", text: "Hereditary transfer of administrative titles based on feudal lineage", isCorrect: false },
      { id: "opt-3", text: "Spontaneous consensus decision-making without written documentation", isCorrect: false },
      { id: "opt-4", text: "Arbitrary executive decree without constitutional boundaries", isCorrect: false }
    ],
    explanation: "Weber defined modern bureaucracy as rational-legal rule based on impersonality, strict functional division of labor, formal hierarchy, and meritocratic appointment.",
    tags: ["weberian-bureaucracy", "public-administration", "rational-legal"]
  },
  {
    id: "q-boost-pub-002",
    title: "The New Public Management (NPM) administrative reform movement that emerged in the late 20th century emphasizes:",
    subject: "History & Polity",
    topic: "Public Administration & Policy",
    topics: ["Public Administration & Policy", "History & Polity"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Adopting private-sector managerial techniques, performance targets, market competition, and citizen-customer orientation", isCorrect: true },
      { id: "opt-2", text: "Total nationalization of all private utility companies", isCorrect: false },
      { id: "opt-3", text: "Abolishing all public oversight and accountability metrics", isCorrect: false },
      { id: "opt-4", text: "Restricting public service delivery solely to military personnel", isCorrect: false }
    ],
    explanation: "NPM championed 'reinventing government' through decentralized management, output measurement, contracting out, and customer-centric public service ethos.",
    tags: ["new-public-management", "npm", "administrative-reform"]
  },

  // Climate Science & Meteorology (2)
  {
    id: "q-boost-clim-001",
    title: "Due to the Coriolis effect caused by Earth's counterclockwise eastward rotation, large-scale cyclonic storms circulate:",
    subject: "Geography & Environment",
    topic: "Climate Science & Meteorology",
    topics: ["Climate Science & Meteorology", "Geography & Environment", "Physical Geography & Earth Systems"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Counterclockwise in the Northern Hemisphere and Clockwise in the Southern Hemisphere", isCorrect: true },
      { id: "opt-2", text: "Clockwise in both Northern and Southern Hemispheres", isCorrect: false },
      { id: "opt-3", text: "Clockwise in the Northern Hemisphere and Counterclockwise in the Southern Hemisphere", isCorrect: false },
      { id: "opt-4", text: "In a straight longitudinal line towards the equator", isCorrect: false }
    ],
    explanation: "The Coriolis force deflects moving air to the right in the Northern Hemisphere (inducing counterclockwise cyclonic inflow) and to the left in the Southern Hemisphere (clockwise inflow).",
    tags: ["coriolis-effect", "cyclones", "meteorology", "atmospheric-circulation"]
  },
  {
    id: "q-boost-clim-002",
    title: "Milankovitch cycles explain the periodic pacing of glacial and interglacial ice ages on Earth over geological epochs through cyclic variations in:",
    subject: "Geography & Environment",
    topic: "Climate Science & Meteorology",
    topics: ["Climate Science & Meteorology", "Geography & Environment"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Orbital eccentricity, axial tilt (obliquity), and precession of the equinoxes", isCorrect: true },
      { id: "opt-2", text: "Solar wind magnetic polarity flips every 11 years", isCorrect: false },
      { id: "opt-3", text: "Continental tectonic drift velocities across ocean trenches", isCorrect: false },
      { id: "opt-4", text: "Volcanic ash sedimentation in subglacial lakes", isCorrect: false }
    ],
    explanation: "Serbian geophysicist Milutin Milanković identified eccentricity (~100 kyr), obliquity (~41 kyr), and precession (~26 kyr) as drivers of summer insolation changes in high northern latitudes.",
    tags: ["milankovitch-cycles", "ice-ages", "paleoclimatology", "climate-science"]
  }
];

console.log(`Prepared ${boosterQuestions.length} handcrafted booster questions.`);

// Load existing database
const jsonPath = path.join(__dirname, '../lib/data/imported-questions.json');
const existingQuestions = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
console.log(`Current questions in imported-questions.json: ${existingQuestions.length}`);

// Combine
const combined = [...existingQuestions, ...boosterQuestions];
console.log(`Combined total: ${combined.length}`);

// Synchronize topics array with taxonomy resolution
const standardTopics = getAllStandardTopics();

const updatedDatabase = combined.map(item => {
  const topicSet = new Set(Array.isArray(item.topics) ? item.topics : [item.topic]);
  // Always include primary topic
  if (item.topic) topicSet.add(item.topic);
  
  // Test against all standard topics via doesQuestionMatchTopic
  standardTopics.forEach(t => {
    if (doesQuestionMatchTopic(item, t)) {
      topicSet.add(t);
    }
  });

  return {
    ...item,
    topics: Array.from(topicSet)
  };
});

// Verification audit
console.log("\n=================================================");
console.log(">>> AUDITING ALL 56 TOPICS (Strict > 100 Guarantee)");
console.log("=================================================");

let failCount = 0;
const report = [];

standardTopics.forEach(t => {
  const rawCount = updatedDatabase.filter(item => (item.topics || [item.topic]).includes(t)).length;
  const taxCount = updatedDatabase.filter(item => doesQuestionMatchTopic(item, t)).length;
  const passed = rawCount > 100 && taxCount > 100;
  if (!passed) failCount++;
  report.push({ topic: t, rawCount, taxCount, passed });
});

report.sort((a,b) => a.rawCount - b.rawCount);

report.forEach(r => {
  const mark = r.passed ? "PASS" : "FAIL";
  console.log(`[${mark}] ${r.topic.padEnd(46)} | Raw: ${String(r.rawCount).padStart(3)} | Tax: ${String(r.taxCount).padStart(3)}`);
});

if (failCount > 0) {
  console.error(`\nFAILED: ${failCount} topics have <= 100 questions!`);
  process.exit(1);
}

// Check question integrity
console.log("\n-> Validating question schemas & IDs...");
const idMap = new Set();
let schemaErrs = 0;

updatedDatabase.forEach(q => {
  if (idMap.has(q.id)) {
    console.error(`Duplicate ID: ${q.id}`);
    schemaErrs++;
  }
  idMap.add(q.id);

  if (!q.title || !q.explanation || !q.subject || !q.topic) {
    console.error(`Missing core field in ${q.id}`);
    schemaErrs++;
  }

  const expectedOptions = q.type === 'true_false' ? 2 : 4;
  if (!Array.isArray(q.options) || q.options.length !== expectedOptions) {
    console.error(`Question ${q.id} does not have exactly ${expectedOptions} options (has ${(q.options || []).length})`);
    schemaErrs++;
  }

  const correctOpts = (q.options || []).filter(o => o.isCorrect);
  if (correctOpts.length !== 1) {
    console.error(`Question ${q.id} has ${correctOpts.length} correct options (expected 1)`);
    schemaErrs++;
  }
});

if (schemaErrs > 0) {
  console.error(`Schema validation failed with ${schemaErrs} errors!`);
  process.exit(1);
}

console.log("-> 100% of questions passed schema and unique ID validation!");

// Backup & Save
const backupPath = path.join(__dirname, '../lib/data/imported-questions.backup-before-final.json');
fs.writeFileSync(backupPath, JSON.stringify(existingQuestions, null, 2), 'utf8');
console.log(`Backup saved to ${backupPath}`);

fs.writeFileSync(jsonPath, JSON.stringify(updatedDatabase, null, 2), 'utf8');
console.log(`Updated database written to ${jsonPath}! Total items: ${updatedDatabase.length}`);
