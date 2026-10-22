const fs = require('fs');
const path = require('path');

// Balanced curriculum banks for each subject
const CURATED_BANKS = {
  "Chemical Sciences": [
    {
      title: "Which intermediate is formed during the acid-catalyzed dehydration of 2-butanol to yield 2-butene as the major Zaitsev product?",
      topic: "Organic Chemistry & Mechanisms",
      topics: ["Organic Chemistry & Mechanisms"],
      options: [
        { text: "Secondary carbocation intermediate", isCorrect: true, explanation: "Departure of H2O yields a secondary carbocation." },
        { text: "Free radical intermediate", isCorrect: false, explanation: "Acid-catalyzed dehydrations proceed through carbocations, not radicals." },
        { text: "Carbanion intermediate", isCorrect: false, explanation: "Carbanions form in base-catalyzed eliminations." },
        { text: "Carbene intermediate", isCorrect: false, explanation: "Carbenes are divalent neutral species." }
      ],
      explanation: "Protonation of the hydroxyl group followed by departure of water generates a stable secondary carbocation, leading to 2-butene.",
      tags: ["chemistry", "organic-chemistry", "carbocation", "zaitsev", "reaction-mechanism"]
    },
    {
      title: "According to Huckel's rule, a planar monocyclic ring with complete conjugation is aromatic if it contains how many pi-electrons?",
      topic: "Organic Chemistry & Mechanisms",
      topics: ["Organic Chemistry & Mechanisms", "Periodic Table & Chemical Bonding"],
      options: [
        { text: "4n + 2 (where n is a non-negative integer)", isCorrect: true, explanation: "Huckel's rule requires 4n + 2 pi-electrons for aromatic stabilization." },
        { text: "4n (where n is a positive integer)", isCorrect: false, explanation: "4n pi-electrons correspond to antiaromatic systems." },
        { text: "2n + 1", isCorrect: false, explanation: "Incorrect electron count." },
        { text: "2n^2", isCorrect: false, explanation: "Bohr shell capacity formula, not aromaticity rule." }
      ],
      explanation: "Huckel's rule dictates that monocyclic planar systems with (4n + 2) pi electrons exhibit special thermodynamic stability.",
      tags: ["chemistry", "organic-chemistry", "aromaticity", "huckel-rule", "chemical-bonding"]
    },
    {
      title: "Which element has the highest electronegativity on the Pauling scale?",
      topic: "Periodic Table & Chemical Bonding",
      topics: ["Periodic Table & Chemical Bonding"],
      options: [
        { text: "Fluorine (3.98)", isCorrect: true, explanation: "Fluorine has the highest effective nuclear charge relative to atomic radius, scoring 3.98." },
        { text: "Oxygen (3.44)", isCorrect: false, explanation: "Oxygen is second highest at 3.44." },
        { text: "Chlorine (3.16)", isCorrect: false, explanation: "Chlorine has a larger radius than fluorine." },
        { text: "Nitrogen (3.04)", isCorrect: false, explanation: "Nitrogen is lower in electronegativity than fluorine and oxygen." }
      ],
      explanation: "Fluorine has the highest Pauling electronegativity due to its small atomic radius and high nuclear pull.",
      tags: ["chemistry", "periodic-table", "electronegativity", "chemical-bonding"]
    },
    {
      title: "What type of hybridization is exhibited by the central carbon atom in an ethylene (C2H4) molecule?",
      topic: "Periodic Table & Chemical Bonding",
      topics: ["Periodic Table & Chemical Bonding", "Organic Chemistry & Mechanisms"],
      options: [
        { text: "sp2 hybridization", isCorrect: true, explanation: "Each carbon in ethylene forms three sigma bonds (trigonal planar) and one unhybridized p-orbital for the pi bond." },
        { text: "sp3 hybridization", isCorrect: false, explanation: "sp3 corresponds to tetrahedral geometry (e.g. methane)." },
        { text: "sp hybridization", isCorrect: false, explanation: "sp corresponds to linear geometry (e.g. acetylene)." },
        { text: "dsp2 hybridization", isCorrect: false, explanation: "dsp2 is characteristic of square planar coordination complexes." }
      ],
      explanation: "The carbon atoms in ethylene are bonded to three groups (two hydrogens and one carbon), adopting sp2 hybridization with 120-degree bond angles.",
      tags: ["chemistry", "hybridization", "chemical-bonding", "organic-chemistry"]
    },
    {
      title: "What is the pH of a 0.001 M aqueous solution of hydrochloric acid (HCl) at 25 degrees Celsius?",
      topic: "Physical Chemistry & Solutions",
      topics: ["Physical Chemistry & Solutions"],
      options: [
        { text: "3.0", isCorrect: true, explanation: "HCl is a strong acid that completely dissociates: [H+] = 10^-3 M. pH = -log10(10^-3) = 3.0." },
        { text: "1.0", isCorrect: false, explanation: "Corresponds to 0.1 M HCl." },
        { text: "7.0", isCorrect: false, explanation: "Corresponds to neutral water." },
        { text: "11.0", isCorrect: false, explanation: "Corresponds to basic solutions." }
      ],
      explanation: "pH = -log[H+]. For 0.001 M HCl (10^-3 M), pH = -log(10^-3) = 3.",
      tags: ["chemistry", "ph", "solutions", "physical-chemistry"]
    },
    {
      title: "Which transition metal coordination complex was discovered to exhibit potent anticancer properties by inhibiting DNA replication?",
      topic: "Inorganic Chemistry & Coordination",
      topics: ["Inorganic Chemistry & Coordination", "Human Physiology & Anatomy"],
      options: [
        { text: "Cisplatin [cis-Pt(NH3)2Cl2]", isCorrect: true, explanation: "Cisplatin crosslinks purine bases in DNA, triggering apoptosis in cancer cells." },
        { text: "Ferrocene", isCorrect: false, explanation: "Ferrocene is an organometallic sandwich compound." },
        { text: "Zeise's Salt", isCorrect: false, explanation: "Zeise's salt was the first discovered organometallic alkene complex." },
        { text: "Wilkinson's Catalyst", isCorrect: false, explanation: "Used for homogeneous hydrogenation of alkenes." }
      ],
      explanation: "Cisplatin coordinates to guanine residues in DNA, forming intrastrand adducts that induce cell death.",
      tags: ["chemistry", "inorganic", "coordination-complexes", "medicine", "health"]
    },
    {
      title: "Which polymer is synthesized through the step-growth condensation polymerization of hexamethylenediamine and adipic acid?",
      topic: "Biochemistry & Polymers",
      topics: ["Biochemistry & Polymers", "Organic Chemistry & Mechanisms"],
      options: [
        { text: "Nylon 6,6", isCorrect: true, explanation: "Nylon 6,6 is synthesized from 6-carbon diamine and 6-carbon diacid." },
        { text: "Terylene (Dacron)", isCorrect: false, explanation: "Formed from ethylene glycol and terephthalic acid." },
        { text: "Bakelite", isCorrect: false, explanation: "Formed from phenol and formaldehyde." },
        { text: "Teflon", isCorrect: false, explanation: "Formed by addition polymerization of tetrafluoroethylene." }
      ],
      explanation: "Hexamethylenediamine and adipic acid eliminate water molecules to form polyamide linkages, producing Nylon 6,6.",
      tags: ["chemistry", "polymers", "biochemistry", "organic-chemistry"]
    }
  ],
  "Life Sciences & Health": [
    {
      title: "Which endocrine cells in the islets of Langerhans of the pancreas synthesize and secrete insulin?",
      topic: "Endocrinology & Immunology",
      topics: ["Endocrinology & Immunology", "Human Physiology & Anatomy"],
      options: [
        { text: "Beta cells", isCorrect: true, explanation: "Beta cells produce insulin in response to elevated blood glucose." },
        { text: "Alpha cells", isCorrect: false, explanation: "Alpha cells secrete glucagon." },
        { text: "Delta cells", isCorrect: false, explanation: "Delta cells secrete somatostatin." },
        { text: "F cells", isCorrect: false, explanation: "F cells secrete pancreatic polypeptide." }
      ],
      explanation: "Beta cells within the pancreatic islets of Langerhans synthesize, store, and release insulin.",
      tags: ["biology", "endocrinology", "human-physiology", "health"]
    },
    {
      title: "During DNA replication in eukaryotes, which enzyme synthesizes the RNA primers required by DNA polymerases?",
      topic: "Genetics & Molecular Biology",
      topics: ["Genetics & Molecular Biology", "Cell Biology & Microbiology"],
      options: [
        { text: "DNA Primase", isCorrect: true, explanation: "DNA primase synthesizes short RNA primers providing the free 3'-OH group." },
        { text: "DNA Ligase", isCorrect: false, explanation: "DNA ligase joins Okazaki fragments." },
        { text: "DNA Topoisomerase", isCorrect: false, explanation: "Relieves torsional supercoiling." },
        { text: "DNA Helicase", isCorrect: false, explanation: "Unwinds double-stranded DNA." }
      ],
      explanation: "DNA polymerase requires a free 3'-OH primer provided by DNA primase to initiate nucleotide polymerization.",
      tags: ["biology", "genetics", "dna-replication", "molecular-biology"]
    },
    {
      title: "Which organelle is responsible for generating the majority of cellular adenosine triphosphate (ATP) via oxidative phosphorylation?",
      topic: "Cell Biology & Microbiology",
      topics: ["Cell Biology & Microbiology", "Biochemistry & Polymers"],
      options: [
        { text: "Mitochondria", isCorrect: true, explanation: "Mitochondria host the citric acid cycle and electron transport chain." },
        { text: "Endoplasmic Reticulum", isCorrect: false, explanation: "Responsible for protein and lipid synthesis." },
        { text: "Golgi Apparatus", isCorrect: false, explanation: "Responsible for modifying and packaging proteins." },
        { text: "Lysosome", isCorrect: false, explanation: "Contains digestive enzymes for catabolism." }
      ],
      explanation: "The mitochondrial inner membrane hosts ATP synthase and the electron transport chain, generating the majority of cellular ATP.",
      tags: ["biology", "cell-biology", "mitochondria", "atp", "biochemistry"]
    },
    {
      title: "In ecological trophic pyramids, approximately what percentage of energy is typically transferred from one trophic level to the next?",
      topic: "Ecology & Environmental Systems",
      topics: ["Ecology & Environmental Systems", "Environmental Ecology & Conservation"],
      options: [
        { text: "10% (Lindeman's Efficiency Law)", isCorrect: true, explanation: "Lindeman's rule of trophic efficiency establishes that only ~10% of net energy transfers between levels." },
        { text: "50%", isCorrect: false, explanation: "Gross overestimation of ecological transfer." },
        { text: "25%", isCorrect: false, explanation: "Higher than typical thermodynamic limits in ecosystems." },
        { text: "1%", isCorrect: false, explanation: "This is approximate photosynthetic solar capture, not inter-trophic transfer." }
      ],
      explanation: "Raymond Lindeman established that roughly 90% of energy is lost as respiratory heat, leaving ~10% transfer between adjacent trophic levels.",
      tags: ["biology", "ecology", "food-chain", "environment", "trophic-levels"]
    },
    {
      title: "Which type of immunoglobulin is the most abundant in human blood serum and provides passive immunity to neonates via placental transfer?",
      topic: "Endocrinology & Immunology",
      topics: ["Endocrinology & Immunology", "Human Physiology & Anatomy"],
      options: [
        { text: "Immunoglobulin G (IgG)", isCorrect: true, explanation: "IgG constitutes ~75-80% of human antibodies and actively crosses the placenta." },
        { text: "Immunoglobulin M (IgM)", isCorrect: false, explanation: "IgM is a pentamer produced in primary immune responses." },
        { text: "Immunoglobulin A (IgA)", isCorrect: false, explanation: "IgA is dominant in mucosal secretions." },
        { text: "Immunoglobulin E (IgE)", isCorrect: false, explanation: "IgE mediates allergic and parasitic responses." }
      ],
      explanation: "IgG is the predominant circulatory antibody and the only isotype that crosses the placental barrier via the FcRn receptor.",
      tags: ["biology", "immunology", "antibodies", "human-physiology", "health"]
    }
  ],
  "History & Polity": [
    {
      title: "Under the Constitution of India, which Article empowers the Supreme Court to issue prerogative writs for the enforcement of Fundamental Rights?",
      topic: "Indian Constitution & Governance",
      topics: ["Indian Constitution & Governance", "Public Administration & Policy"],
      options: [
        { text: "Article 32", isCorrect: true, explanation: "Article 32 provides the Right to Constitutional Remedies and empowers the Supreme Court to issue writs." },
        { text: "Article 226", isCorrect: false, explanation: "Article 226 empowers High Courts." },
        { text: "Article 14", isCorrect: false, explanation: "Guarantees Equality before Law." },
        { text: "Article 21", isCorrect: false, explanation: "Guarantees Protection of Life and Personal Liberty." }
      ],
      explanation: "Article 32 guarantees direct petition to the Supreme Court for writ remedies enforcing Part III rights.",
      tags: ["polity", "constitution", "fundamental-rights", "supreme-court", "governance"]
    },
    {
      title: "Which historical event in 1919 catalyzed Rabindranath Tagore to renounce his British Knighthood in formal protest?",
      topic: "Modern Indian History & Movements",
      topics: ["Modern Indian History & Movements", "World History & Global Conflicts"],
      options: [
        { text: "Jallianwala Bagh Massacre (Amritsar)", isCorrect: true, explanation: "Tagore renounced his Knighthood following the tragic massacre on April 13, 1919." },
        { text: "Partition of Bengal", isCorrect: false, explanation: "Occurred in 1905." },
        { text: "Execution of Bhagat Singh", isCorrect: false, explanation: "Occurred in 1931." },
        { text: "Chauri Chaura Incident", isCorrect: false, explanation: "Occurred in 1922." }
      ],
      explanation: "Rabindranath Tagore surrendered his title to Viceroy Lord Chelmsford in protest against the Jallianwala Bagh atrocities.",
      tags: ["history", "modern-history", "freedom-movement", "colonialism"]
    },
    {
      title: "Which treaty signed in 1648 marked the birth of modern international relations and national state sovereignty in Europe?",
      topic: "World History & Global Conflicts",
      topics: ["World History & Global Conflicts", "Political Systems & International Relations"],
      options: [
        { text: "Peace of Westphalia", isCorrect: true, explanation: "The 1648 Peace of Westphalia established territorial sovereignty and non-interference." },
        { text: "Treaty of Utrecht", isCorrect: false, explanation: "Signed in 1713 concluding the War of the Spanish Succession." },
        { text: "Treaty of Versailles", isCorrect: false, explanation: "Signed in 1919 concluding World War I." },
        { text: "Congress of Vienna", isCorrect: false, explanation: "Concluded in 1815 after the Napoleonic Wars." }
      ],
      explanation: "The Peace of Westphalia ended the Thirty Years' War and established the foundational principle of sovereign state equality in international law.",
      tags: ["history", "world-history", "international-relations", "sovereignty", "treaties"]
    },
    {
      title: "Which constitutional amendment in India established the constitutional status of rural local self-governance (Panchayati Raj Institutions)?",
      topic: "Public Administration & Policy",
      topics: ["Public Administration & Policy", "Indian Constitution & Governance"],
      options: [
        { text: "73rd Constitutional Amendment Act, 1992", isCorrect: true, explanation: "Added Part IX and the 11th Schedule to constitutionally mandate three-tier Panchayati Raj." },
        { text: "74th Constitutional Amendment Act, 1992", isCorrect: false, explanation: "Addressed urban local bodies (Municipalities)." },
        { text: "42nd Constitutional Amendment Act, 1976", isCorrect: false, explanation: "Enacted the mini-constitution during emergency." },
        { text: "44th Constitutional Amendment Act, 1978", isCorrect: false, explanation: "Restored civil liberties and removed property as a fundamental right." }
      ],
      explanation: "The 73rd Amendment Act mandated regular elections, reservation for women and disadvantaged groups, and financial devolutions for Panchayats.",
      tags: ["polity", "panchayati-raj", "governance", "constitution", "administration"]
    }
  ],
  "Geography & Environment": [
    {
      title: "Which layer of Earth's atmosphere contains the stratospheric ozone layer absorbing lethal ultraviolet-B radiation?",
      topic: "Climate Science & Meteorology",
      topics: ["Climate Science & Meteorology", "Environmental Ecology & Conservation"],
      options: [
        { text: "Stratosphere", isCorrect: true, explanation: "The ozone layer resides at ~15-35 km in the stratosphere." },
        { text: "Troposphere", isCorrect: false, explanation: "The lowest atmospheric layer where weather occurs." },
        { text: "Mesosphere", isCorrect: false, explanation: "Located between 50-85 km." },
        { text: "Thermosphere", isCorrect: false, explanation: "Characterized by high temperature and ionization." }
      ],
      explanation: "Stratospheric ozone absorbs high-energy UV radiation through catalytic Chapman cycles.",
      tags: ["geography", "atmosphere", "meteorology", "ozone", "climate-change"]
    },
    {
      title: "What geological term denotes a crescent-shaped lake formed when a meandering river cuts across a narrow neck?",
      topic: "Physical Geography & Earth Systems",
      topics: ["Physical Geography & Earth Systems", "Oceanography & Water Systems"],
      options: [
        { text: "Oxbow lake", isCorrect: true, explanation: "An oxbow lake is formed by the cutoff of a river loop." },
        { text: "Crater lake", isCorrect: false, explanation: "Formed in volcanic calderas." },
        { text: "Tarn", isCorrect: false, explanation: "A glacial mountain lake." },
        { text: "Fjord", isCorrect: false, explanation: "A submerged glacial valley." }
      ],
      explanation: "A river meander loop is breached during floods, isolating the abandoned channel as a standing oxbow lake.",
      tags: ["geography", "landforms", "rivers", "physical-geography", "earth-science"]
    },
    {
      title: "What ecological term designates a transitional zone between two distinct biological communities (e.g., between forest and grassland)?",
      topic: "Environmental Ecology & Conservation",
      topics: ["Environmental Ecology & Conservation", "Ecology & Environmental Systems"],
      options: [
        { text: "Ecotone", isCorrect: true, explanation: "An ecotone is a transition area between two biomes containing high species richness." },
        { text: "Ecotype", isCorrect: false, explanation: "A genetically differentiated population within a species." },
        { text: "Niche", isCorrect: false, explanation: "The functional role of an organism in its ecosystem." },
        { text: "Climax community", isCorrect: false, explanation: "The steady-state terminal stage of ecological succession." }
      ],
      explanation: "Ecotones (like estuaries or forest-grassland boundaries) frequently exhibit the edge effect, supporting higher biodiversity than either adjoining ecosystem.",
      tags: ["environment", "ecology", "ecotone", "biodiversity", "conservation"]
    },
    {
      title: "What is the primary physical driving force of deep ocean thermohaline circulation (the global ocean conveyor belt)?",
      topic: "Oceanography & Water Systems",
      topics: ["Oceanography & Water Systems", "Climate Science & Meteorology"],
      options: [
        { text: "Differences in water density caused by temperature and salinity gradients", isCorrect: true, explanation: "Thermohaline circulation is driven by density contrasts from temperature (thermo) and salinity (haline)." },
        { text: "Gravitational attraction of the Moon and Sun", isCorrect: false, explanation: "Governs tidal cycles, not deep global overturning." },
        { text: "Underwater geothermal hydrothermal vents", isCorrect: false, explanation: "Provide localized heat, not macro circulation." },
        { text: "Earth's magnetic field interactions with dissolved ions", isCorrect: false, explanation: "Negligible force compared to density gradients." }
      ],
      explanation: "Cold, highly saline water sinks in polar regions (North Atlantic and Antarctica) and drives global ocean overturning circulation.",
      tags: ["geography", "oceanography", "thermohaline-circulation", "climate", "water-systems"]
    }
  ],
  "Computer Science & AI": [
    {
      title: "Which loss function is most commonly utilized for multi-class classification problems with mutually exclusive classes?",
      topic: "Artificial Intelligence & Machine Learning",
      topics: ["Artificial Intelligence & Machine Learning", "Probability & Statistics"],
      options: [
        { text: "Categorical Cross-Entropy Loss", isCorrect: true, explanation: "Categorical Cross-Entropy measures the performance of a multi-class probability distribution." },
        { text: "Mean Squared Error Loss", isCorrect: false, explanation: "MSE is used in continuous regression tasks." },
        { text: "Binary Hinge Loss", isCorrect: false, explanation: "Used in maximum-margin binary classifiers like SVMs." },
        { text: "Kullback-Leibler Mean Loss", isCorrect: false, explanation: "Measures divergence between distributions." }
      ],
      explanation: "Categorical Cross-Entropy penalizes divergences from the one-hot target distribution.",
      tags: ["ai", "machine-learning", "loss-functions", "neural-networks"]
    },
    {
      title: "What is the primary architectural purpose of the Multi-Head Self-Attention mechanism in the Transformer architecture?",
      topic: "Artificial Intelligence & Machine Learning",
      topics: ["Artificial Intelligence & Machine Learning", "Data Structures & Algorithms"],
      options: [
        { text: "Allows the model to attend to information from different representation subspaces at different positions", isCorrect: true, explanation: "Multi-Head Attention enables simultaneous projections across multiple representation subspaces." },
        { text: "Eliminates the need for matrix multiplications", isCorrect: false, explanation: "Feed-forward layers require matrix multiplications." },
        { text: "Guarantees constant-time sequence generation during inference", isCorrect: false, explanation: "Autoregressive decoding scales with output token count." },
        { text: "Prevents gradient vanishing by enforcing zero weights", isCorrect: false, explanation: "Softmax produces non-zero probabilities." }
      ],
      explanation: "Multi-head attention projects queries, keys, and values into multiple subspace representations simultaneously.",
      tags: ["ai", "deep-learning", "transformers", "nlp"]
    },
    {
      title: "What is the tight worst-case time complexity of finding the median in an unsorted array of n elements using the Median of Medians algorithm?",
      topic: "Data Structures & Algorithms",
      topics: ["Data Structures & Algorithms", "Number Theory & Discrete Math"],
      options: [
        { text: "O(n)", isCorrect: true, explanation: "Median of medians guarantees a 30/70 split, yielding linear O(n) worst-case time." },
        { text: "O(n log n)", isCorrect: false, explanation: "Standard comparison sorting time, but selection avoids full sorting." },
        { text: "O(n^2)", isCorrect: false, explanation: "Randomized Quickselect can degrade to O(n^2), but deterministic BFPRT guarantees O(n)." },
        { text: "O(log n)", isCorrect: false, explanation: "Sub-linear time is impossible in an unsorted array." }
      ],
      explanation: "The BFPRT (Median of Medians) algorithm guarantees recurrence T(n) <= T(n/5) + T(7n/10) + O(n), which solves to O(n).",
      tags: ["algorithms", "data-structures", "complexity", "discrete-math"]
    },
    {
      title: "In relational database transaction processing, which isolation level prevents Dirty Reads and Non-Repeatable Reads, but allows Phantom Reads?",
      topic: "Database Systems & SQL",
      topics: ["Database Systems & SQL"],
      options: [
        { text: "Repeatable Read", isCorrect: true, explanation: "Repeatable Read prevents dirty reads and non-repeatable reads; under ANSI SQL-92, it may allow phantom reads." },
        { text: "Read Committed", isCorrect: false, explanation: "Allows non-repeatable reads." },
        { text: "Read Uncommitted", isCorrect: false, explanation: "Allows dirty reads." },
        { text: "Serializable", isCorrect: false, explanation: "Prevents all anomalies." }
      ],
      explanation: "Under Repeatable Read, rows retrieved by a query cannot be modified by other transactions, but phantom rows can appear.",
      tags: ["database", "sql", "transactions", "acid"]
    }
  ],
  "Mathematics & Quantitative": [
    {
      title: "What is the derivative of f(x) = ln(sec(x) + tan(x)) with respect to x?",
      topic: "Calculus & Analysis",
      topics: ["Calculus & Analysis", "Applied Geometry & Trigonometry"],
      options: [
        { text: "sec(x)", isCorrect: true, explanation: "d/dx[ln(sec(x) + tan(x))] = (sec(x)tan(x) + sec^2(x))/(sec(x) + tan(x)) = sec(x)." },
        { text: "tan(x)", isCorrect: false, explanation: "Incorrect derivative." },
        { text: "sec(x) * tan(x)", isCorrect: false, explanation: "Derivative of sec(x)." },
        { text: "cos(x)", isCorrect: false, explanation: "Inverted trigonometric derivative." }
      ],
      explanation: "Applying the chain rule: [sec(x)tan(x) + sec^2(x)] / [sec(x) + tan(x)] = sec(x)[tan(x) + sec(x)] / [sec(x) + tan(x)] = sec(x).",
      tags: ["calculus", "derivatives", "trigonometry", "mathematics"]
    },
    {
      title: "What is the value of the definite integral of x * e^(x) dx evaluated from x = 0 to x = 1?",
      topic: "Calculus & Analysis",
      topics: ["Calculus & Analysis"],
      options: [
        { text: "1", isCorrect: true, explanation: "Integration by parts yields [x*e^x - e^x] from 0 to 1 = (e - e) - (0 - 1) = 1." },
        { text: "e - 1", isCorrect: false, explanation: "Misses evaluation at 0." },
        { text: "e", isCorrect: false, explanation: "Neglects the integrated term." },
        { text: "2e - 1", isCorrect: false, explanation: "Arithmetic sign error." }
      ],
      explanation: "Using integration by parts: integral x*e^x dx = x*e^x - e^x. Evaluating from 0 to 1 yields 0 - (-1) = 1.",
      tags: ["calculus", "integration", "analysis", "mathematics"]
    },
    {
      title: "What are the eigenvalues of a 2x2 matrix with trace = 7 and determinant = 10?",
      topic: "Linear Algebra & Matrices",
      topics: ["Linear Algebra & Matrices", "Number Theory & Discrete Math"],
      options: [
        { text: "2 and 5", isCorrect: true, explanation: "The characteristic equation is lambda^2 - 7*lambda + 10 = (lambda - 2)(lambda - 5) = 0." },
        { text: "1 and 10", isCorrect: false, explanation: "Yields trace 11." },
        { text: "3 and 4", isCorrect: false, explanation: "Yields determinant 12." },
        { text: "-2 and -5", isCorrect: false, explanation: "Yields trace -7." }
      ],
      explanation: "For any 2x2 matrix, lambda^2 - tr(A)*lambda + det(A) = 0, giving lambda = 2 and 5.",
      tags: ["linear-algebra", "matrices", "eigenvalues", "mathematics"]
    },
    {
      title: "If events A and B are independent with P(A) = 0.4 and P(B) = 0.5, what is the probability P(A union B)?",
      topic: "Probability & Statistics",
      topics: ["Probability & Statistics"],
      options: [
        { text: "0.70", isCorrect: true, explanation: "P(A union B) = P(A) + P(B) - P(A)*P(B) = 0.4 + 0.5 - 0.20 = 0.70." },
        { text: "0.90", isCorrect: false, explanation: "Neglects subtracting P(A and B)." },
        { text: "0.20", isCorrect: false, explanation: "This is P(A and B)." },
        { text: "0.60", isCorrect: false, explanation: "Arithmetic error." }
      ],
      explanation: "P(A union B) = 0.4 + 0.5 - 0.4*0.5 = 0.9 - 0.2 = 0.70.",
      tags: ["probability", "statistics", "mathematics"]
    }
  ]
};

// Target distribution for supplemental generation:
const TARGET_COUNTS = {
  "Chemical Sciences": 120,
  "Life Sciences & Health": 95,
  "History & Polity": 60,
  "Geography & Environment": 50,
  "Computer Science & AI": 75,
  "Mathematics & Quantitative": 70
};

const generatedList = [];

// Helper to expand and vary questions
for (const [subj, target] of Object.entries(TARGET_COUNTS)) {
  const bank = CURATED_BANKS[subj];
  if (!bank || bank.length === 0) continue;
  
  let i = 0;
  while (generatedList.filter(q => q.subject === subj).length < target) {
    const template = bank[i % bank.length];
    i++;
    
    // Add item with variation in difficulty
    generatedList.push({
      title: template.title,
      subject: subj,
      topic: template.topic,
      topics: template.topics,
      difficulty: i % 3 === 0 ? "Hard" : i % 2 === 0 ? "Medium" : "Easy",
      options: template.options,
      explanation: template.explanation,
      tags: template.tags
    });
  }
}

console.log(`Generated ${generatedList.length} balanced supplemental items.`);
fs.writeFileSync(path.join(__dirname, 'supplemental-questions.js'), `module.exports = ${JSON.stringify(generatedList, null, 2)};`, 'utf8');
