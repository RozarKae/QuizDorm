// scripts/scientists-questions-data.js
// 100 High-Quality Questions for:
// "Super Scientists & Inventors – Scientists, inventors, discoveries, inventions, Nobel Prize winners, Indian scientists"

const scientistsQuestions = [
  // ==========================================
  // GROUP 1: Indian Scientists & Pioneers (001 - 020)
  // ==========================================
  {
    id: "q-scientist-001",
    title: "Which Indian physicist was awarded the 1930 Nobel Prize in Physics for discovering the inelastic scattering of light?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "Modern Physics & Quantum Theory"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Sir C. V. Raman", isCorrect: true },
      { id: "opt-2", text: "Homi Jehangir Bhabha", isCorrect: false },
      { id: "opt-3", text: "Satyendra Nath Bose", isCorrect: false },
      { id: "opt-4", text: "Jagadish Chandra Bose", isCorrect: false }
    ],
    explanation: "Sir C. V. Raman discovered the Raman Effect—the inelastic scattering of photons by molecules when light traverses a transparent material—announced on February 28, 1928, which is commemorated annually in India as National Science Day.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "nobel-prize", "optics", "physics"]
  },
  {
    id: "q-scientist-002",
    title: "Sir Jagadish Chandra Bose invented which sensitive laboratory instrument capable of magnifying and measuring plant growth and cellular responses?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "Living World Explorers"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Crescograph", isCorrect: true },
      { id: "opt-2", text: "Galvanometer", isCorrect: false },
      { id: "opt-3", text: "Seismograph", isCorrect: false },
      { id: "opt-4", text: "Sphygmomanometer", isCorrect: false }
    ],
    explanation: "Sir J. C. Bose invented the crescograph in the early 20th century. Using a series of clockwise gears and a smoked glass plate, it magnified plant movements up to 10,000 times, demonstrating that plants respond physiologically to external stimuli.",
    tags: ["super-scientists-inventors", "inventors", "indian-scientists", "discoveries", "biology"]
  },
  {
    id: "q-scientist-003",
    title: "Who is widely revered as the 'Father of the Indian Nuclear Programme' and formulated India's unique three-stage thorium nuclear power roadmap?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Homi Jehangir Bhabha", isCorrect: true },
      { id: "opt-2", text: "A. P. J. Abdul Kalam", isCorrect: false },
      { id: "opt-3", text: "Vikram Sarabhai", isCorrect: false },
      { id: "opt-4", text: "Raja Ramanna", isCorrect: false }
    ],
    explanation: "Dr. Homi Jehangir Bhabha was the founding director of the Tata Institute of Fundamental Research (TIFR) and the Atomic Energy Commission of India. He architected India's 3-stage nuclear energy plan to utilize domestic thorium reserves.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "nuclear-physics"]
  },
  {
    id: "q-scientist-004",
    title: "Which visionary scientist established the Indian Space Research Organisation (ISRO) and is celebrated as the 'Father of the Indian Space Programme'?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Space Explorers", "Science & Technology Milestones"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Dr. Vikram Sarabhai", isCorrect: true },
      { id: "opt-2", text: "Prof. Satish Dhawan", isCorrect: false },
      { id: "opt-3", text: "Dr. K. Sivan", isCorrect: false },
      { id: "opt-4", text: "Dr. U. R. Rao", isCorrect: false }
    ],
    explanation: "Dr. Vikram Sarabhai spearheaded the establishment of ISRO in 1969 and set up the Thumba Equatorial Rocket Launching Station (TERLS) near Thiruvananthapuram, launching India's space odyssey.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "isro", "space-mission"]
  },
  {
    id: "q-scientist-005",
    title: "Dr. A. P. J. Abdul Kalam earned the enduring title 'Missile Man of India' primarily for his leadership in which national defense milestone?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Integrated Guided Missile Development Programme (IGMDP)", isCorrect: true },
      { id: "opt-2", text: "Operation Smiling Buddha", isCorrect: false },
      { id: "opt-3", text: "Project Seabird Naval Base", isCorrect: false },
      { id: "opt-4", text: "Tejas Light Combat Aircraft Consortium", isCorrect: false }
    ],
    explanation: "Dr. Kalam led the Integrated Guided Missile Development Programme (IGMDP) at DRDO, spearheading the operational development of indigenous missile systems including Agni and Prithvi, and served as the 11th President of India.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "missiles", "defense"]
  },
  {
    id: "q-scientist-006",
    title: "Subatomic particles with integer spin that follow Bose-Einstein statistics were named 'bosons' by Paul Dirac in honor of which Indian theoretical physicist?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Modern Physics & Quantum Theory", "Science & Technology Milestones"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Satyendra Nath Bose", isCorrect: true },
      { id: "opt-2", text: "Jagadish Chandra Bose", isCorrect: false },
      { id: "opt-3", text: "Meghnad Saha", isCorrect: false },
      { id: "opt-4", text: "K. S. Krishnan", isCorrect: false }
    ],
    explanation: "Satyendra Nath Bose derived Planck's quantum radiation law without reference to classical physics in 1924. Collaborating with Albert Einstein, he formulated Bose-Einstein statistics, leading to the prediction of the Bose-Einstein condensate (BEC).",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "quantum-physics", "physics"]
  },
  {
    id: "q-scientist-007",
    title: "The Chandrasekhar Limit, which establishes the maximum mass threshold (~1.44 solar masses) for a stable white dwarf star, was discovered by which Nobel laureate?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Space Explorers", "Modern Physics & Quantum Theory"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Subrahmanyan Chandrasekhar", isCorrect: true },
      { id: "opt-2", text: "C. V. Raman", isCorrect: false },
      { id: "opt-3", text: "Jayant Narlikar", isCorrect: false },
      { id: "opt-4", text: "Meghnad Saha", isCorrect: false }
    ],
    explanation: "Subrahmanyan Chandrasekhar determined that electron degeneracy pressure cannot prevent the gravitational collapse of a stellar core exceeding ~1.44 times the solar mass. He shared the 1983 Nobel Prize in Physics with William A. Fowler.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "nobel-prize", "astrophysics"]
  },
  {
    id: "q-scientist-008",
    title: "Which self-taught Indian mathematical prodigy compiled nearly 3,900 identities and equations and collaborated with G. H. Hardy at Cambridge?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Number Theory & Discrete Math", "Literature, Awards & Culture"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Srinivasa Ramanujan", isCorrect: true },
      { id: "opt-2", text: "Prasanta Chandra Mahalanobis", isCorrect: false },
      { id: "opt-3", text: "Harish-Chandra", isCorrect: false },
      { id: "opt-4", text: "D. R. Kaprekar", isCorrect: false }
    ],
    explanation: "Srinivasa Ramanujan made groundbreaking contributions to mathematical analysis, infinite series, continued fractions, and mock theta functions. The number 1729 is famously celebrated as the Hardy-Ramanujan number.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "mathematics"]
  },
  {
    id: "q-scientist-009",
    title: "Whose birthday on September 15 is observed across India as National Engineer's Day in tribute to his pioneering civil and hydraulic engineering feats?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Sir M. Visvesvaraya", isCorrect: true },
      { id: "opt-2", text: "Dr. E. Sreedharan", isCorrect: false },
      { id: "opt-3", text: "Sir Ganga Ram", isCorrect: false },
      { id: "opt-4", text: "Satish Dhawan", isCorrect: false }
    ],
    explanation: "Mokshagundam Visvesvaraya designed and patented automatic sluice gates at Khadakwasla reservoir, designed the Krishna Raja Sagara Dam in Karnataka, and planned Hyderabad's flood mitigation system. He received the Bharat Ratna in 1955.",
    tags: ["super-scientists-inventors", "inventors", "indian-scientists", "engineering"]
  },
  {
    id: "q-scientist-010",
    title: "Indian-American biochemist Har Gobind Khorana shared the 1968 Nobel Prize in Physiology or Medicine for which groundbreaking scientific discovery?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Genetics & Molecular Biology", "Science & Technology Milestones"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Deciphering the genetic code and its role in protein synthesis", isCorrect: true },
      { id: "opt-2", text: "Discovery of DNA polymerase enzyme", isCorrect: false },
      { id: "opt-3", text: "Isolation of the insulin hormone", isCorrect: false },
      { id: "opt-4", text: "Discovery of retroviral reverse transcriptase", isCorrect: false }
    ],
    explanation: "Dr. Har Gobind Khorana, along with Marshall Nirenberg and Robert Holley, received the Nobel Prize for cracking the genetic code by demonstrating that specific nucleotide triplets (codons) specify particular amino acids in protein construction.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "nobel-prize", "genetics"]
  },
  {
    id: "q-scientist-011",
    title: "Venkatraman 'Venki' Ramakrishnan was awarded the 2009 Nobel Prize in Chemistry for elucidating the atomic structure and mechanism of which cellular machine?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Genetics & Molecular Biology", "Cell Biology & Microbiology"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Ribosome", isCorrect: true },
      { id: "opt-2", text: "Mitochondria", isCorrect: false },
      { id: "opt-3", text: "Golgi apparatus", isCorrect: false },
      { id: "opt-4", text: "Endoplasmic reticulum", isCorrect: false }
    ],
    explanation: "Venki Ramakrishnan, alongside Thomas Steitz and Ada Yonath, used X-ray crystallography to map the 3D atomic structure of the 30S ribosomal subunit, revealing how ribosomes translate genetic mRNA instructions into proteins.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "nobel-prize", "chemistry"]
  },
  {
    id: "q-scientist-012",
    title: "Which legendary Indian scientist founded the Institute of Palaeosciences in Lucknow and is honored as the 'Father of Indian Paleobotany'?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Living World Explorers", "Physical Geography & Earth Systems"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Birbal Sahni", isCorrect: true },
      { id: "opt-2", text: "Panchanan Maheshwari", isCorrect: false },
      { id: "opt-3", text: "K. C. Mehta", isCorrect: false },
      { id: "opt-4", text: "M. S. Swaminathan", isCorrect: false }
    ],
    explanation: "Prof. Birbal Sahni investigated plant fossils from the Rajmahal Hills of Bihar, discovered the extinct gymnosperm genus Pentoxylon sahnii, and founded the world-renowned Birbal Sahni Institute of Palaeosciences (BSIP).",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "paleontology", "botany"]
  },
  {
    id: "q-scientist-013",
    title: "The thermal ionization equation that relates the spectral classification of stars to their atmospheric temperature and pressure was derived by which Indian astrophysicist?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Space Explorers", "Modern Physics & Quantum Theory"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Meghnad Saha", isCorrect: true },
      { id: "opt-2", text: "Homi Bhabha", isCorrect: false },
      { id: "opt-3", text: "K. S. Krishnan", isCorrect: false },
      { id: "opt-4", text: "D. S. Kothari", isCorrect: false }
    ],
    explanation: "The Saha Ionization Equation (1920), formulated by Meghnad Saha, allowed astronomers to accurately deduce temperatures and pressures of stellar atmospheres from spectral absorption lines, laying the foundation for modern astrophysics.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "astronomy", "physics"]
  },
  {
    id: "q-scientist-014",
    title: "The premier annual prize for notable scientific research awarded by the CSIR in India is named after which pioneering chemist and its first Director-General?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "Literature, Awards & Culture"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Shanti Swaroop Bhatnagar", isCorrect: true },
      { id: "opt-2", text: "Prafulla Chandra Ray", isCorrect: false },
      { id: "opt-3", text: "C. N. R. Rao", isCorrect: false },
      { id: "opt-4", text: "T. R. Seshadri", isCorrect: false }
    ],
    explanation: "Sir Shanti Swaroop Bhatnagar was the architect of India's national research laboratory network under CSIR. The annual Shanti Swarup Bhatnagar (SSB) Prize is India's most prestigious multidisciplinary award for scientists under 45.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "awards", "chemistry"]
  },
  {
    id: "q-scientist-015",
    title: "Which pioneering Indian woman botanist and cytogeneticist developed high-sweetness sugarcane hybrids and co-authored the 'Chromosome Atlas of Cultivated Plants'?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Living World Explorers", "Genetics & Molecular Biology"],
    difficulty: "hard",
    options: [
      { id: "opt-1", text: "Edavalath Kakkat Janaki Ammal", isCorrect: true },
      { id: "opt-2", text: "Asima Chatterjee", isCorrect: false },
      { id: "opt-3", text: "Kamala Sohonie", isCorrect: false },
      { id: "opt-4", text: "Anna Mani", isCorrect: false }
    ],
    explanation: "E. K. Janaki Ammal was India's first female doctorate in botany (Univ. of Michigan, 1931). At the Sugarcane Breeding Institute in Coimbatore, she hybridized native cane varieties with bamboo and wild grass, boosting sweetness and disease resistance.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "botany", "genetics"]
  },
  {
    id: "q-scientist-016",
    title: "Asima Chatterjee was the first woman to be awarded a Doctor of Science (D.Sc.) by an Indian university for her landmark pharmaceutical research on which class of compounds?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Organic Chemistry & Mechanisms", "Human Body Heroes"],
    difficulty: "hard",
    options: [
      { id: "opt-1", text: "Plant alkaloids and coumarins", isCorrect: true },
      { id: "opt-2", text: "Synthetic organometallic polymers", isCorrect: false },
      { id: "opt-3", text: "Petroleum distillates and kerosene fractions", isCorrect: false },
      { id: "opt-4", text: "Inorganic zeolites and silicates", isCorrect: false }
    ],
    explanation: "Dr. Asima Chatterjee conducted pioneering research on vinca alkaloids derived from Madagascar periwinkle and developed 'Ayush-56' (an anti-epileptic medication) and anti-malarial therapies from native medicinal plants at the University of Calcutta.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "chemistry", "medicine"]
  },
  {
    id: "q-scientist-017",
    title: "Who established the Indian Statistical Institute (ISI) in Kolkata and formulated the statistical distance metric that bears his name?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Probability & Statistics", "Macroeconomics, Banking & Trade"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Prasanta Chandra Mahalanobis", isCorrect: true },
      { id: "opt-2", text: "C. R. Rao", isCorrect: false },
      { id: "opt-3", text: "D. D. Kosambi", isCorrect: false },
      { id: "opt-4", text: "P. V. Sukhatme", isCorrect: false }
    ],
    explanation: "Prof. P. C. Mahalanobis introduced the Mahalanobis Distance in 1936, founded the Indian Statistical Institute (ISI), and designed the strategy for India's Second Five-Year Plan. His birth anniversary on June 29 is celebrated as National Statistics Day.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "statistics", "mathematics"]
  },
  {
    id: "q-scientist-018",
    title: "Known universally as the 'Birdman of India', which naturalist conducted systematic ornithological surveys across the subcontinent and helped save Silent Valley?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Animal Encyclopedia", "Living World Explorers"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Dr. Sálim Ali", isCorrect: true },
      { id: "opt-2", text: "E. P. Gee", isCorrect: false },
      { id: "opt-3", text: "Jim Corbett", isCorrect: false },
      { id: "opt-4", text: "M. Krishnan", isCorrect: false }
    ],
    explanation: "Sálim Moizuddin Abdul Ali conducted landmark regional bird surveys across princely states and co-authored the 10-volume 'Handbook of the Birds of India and Pakistan'. He played a pivotal role in the creation of Keoladeo National Park.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "zoology", "ornithology"]
  },
  {
    id: "q-scientist-020",
    title: "Which prominent aerospace scientist, who served as Project Director for Agni-IV and Agni-V, is affectionately known as the 'Missile Woman of India'?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "Space Explorers"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Dr. Tessy Thomas", isCorrect: true },
      { id: "opt-2", text: "Ritu Karidhal", isCorrect: false },
      { id: "opt-3", text: "Muthayya Vanitha", isCorrect: false },
      { id: "opt-4", text: "Nandini Harinath", isCorrect: false }
    ],
    explanation: "Dr. Tessy Thomas is a senior defense scientist at DRDO who served as the Project Director for the 5,000-km range intercontinental ballistic missile Agni-V, becoming the first woman engineer to lead a missile project in India.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "defense", "engineering"]
  },
  {
    id: "q-scientist-019",
    title: "The Ramachandran plot, a fundamental tool in structural biology that maps permissible dihedral angles (phi and psi) of amino acid residues, was devised by:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Biochemistry & Polymers", "Human Body Heroes"],
    difficulty: "hard",
    options: [
      { id: "opt-1", text: "G. N. Ramachandran", isCorrect: true },
      { id: "opt-2", text: "C. N. R. Rao", isCorrect: false },
      { id: "opt-3", text: "Obaid Siddiqi", isCorrect: false },
      { id: "opt-4", text: "G. Padmanaban", isCorrect: false }
    ],
    explanation: "Gopalasamudram Narayana Ramachandran formulated the Ramachandran Plot in 1963 at the University of Madras to predict sterically allowed polypeptide backbone conformations, and proposed the triple-helical model of collagen.",
    tags: ["super-scientists-inventors", "scientists", "indian-scientists", "biochemistry", "biology"]
  },

  // ==========================================
  // GROUP 2: Nobel Laureates & Breakthroughs (021 - 040)
  // ==========================================
  {
    id: "q-scientist-021",
    title: "Who remains the only person in history to win two Nobel Prizes in two completely different scientific disciplines?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "Modern Physics & Quantum Theory"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Marie Curie", isCorrect: true },
      { id: "opt-2", text: "Linus Pauling", isCorrect: false },
      { id: "opt-3", text: "John Bardeen", isCorrect: false },
      { id: "opt-4", text: "Frederick Sanger", isCorrect: false }
    ],
    explanation: "Marie Skłodowska Curie won the 1903 Nobel Prize in Physics (with Pierre Curie and Henri Becquerel) for radiation phenomena, and the 1911 Nobel Prize in Chemistry for discovering radium and polonium.",
    tags: ["super-scientists-inventors", "scientists", "nobel-prize", "physics", "chemistry"]
  },
  {
    id: "q-scientist-022",
    title: "Albert Einstein was officially awarded the 1921 Nobel Prize in Physics for which specific theoretical breakthrough?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Modern Physics & Quantum Theory", "Science & Technology Milestones"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "His explanation of the law of the photoelectric effect", isCorrect: true },
      { id: "opt-2", text: "His General Theory of Relativity and spacetime curvature", isCorrect: false },
      { id: "opt-3", text: "His mass-energy equivalence equation (E = mc²)", isCorrect: false },
      { id: "opt-4", text: "His discovery of gravitational lensing", isCorrect: false }
    ],
    explanation: "Albert Einstein received the 1921 Nobel Prize in Physics 'for his services to Theoretical Physics, and especially for his discovery of the law of the photoelectric effect', which proved that light behaves as quantized packets (photons).",
    tags: ["super-scientists-inventors", "scientists", "nobel-prize", "quantum-physics", "physics"]
  },
  {
    id: "q-scientist-023",
    title: "Which German mechanical engineer and physicist discovered electromagnetic X-radiation in 1895 and received the inaugural Nobel Prize in Physics in 1901?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Modern Physics & Quantum Theory", "Human Body Heroes"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Wilhelm Conrad Röntgen", isCorrect: true },
      { id: "opt-2", text: "Heinrich Hertz", isCorrect: false },
      { id: "opt-3", text: "Philipp Lenard", isCorrect: false },
      { id: "opt-4", text: "Max von Laue", isCorrect: false }
    ],
    explanation: "Wilhelm Röntgen discovered mysterious penetrating rays emitted by Crookes cathode-ray tubes on November 8, 1895, naming them 'X-rays'. His discovery transformed diagnostic medical imaging worldwide.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "nobel-prize", "physics"]
  },
  {
    id: "q-scientist-024",
    title: "Sir Alexander Fleming discovered penicillin, the world's first widely effective clinical antibiotic, after observing contamination by which fungus in 1928?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Cell Biology & Microbiology", "Human Body Heroes"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Penicillium notatum", isCorrect: true },
      { id: "opt-2", text: "Aspergillus niger", isCorrect: false },
      { id: "opt-3", text: "Saccharomyces cerevisiae", isCorrect: false },
      { id: "opt-4", text: "Candida albicans", isCorrect: false }
    ],
    explanation: "Fleming observed that a stray mold colony of Penicillium notatum on an uncovered Petri dish had produced a halo of lysed Staphylococcus bacteria. He shared the 1945 Nobel Prize in Medicine with Howard Florey and Ernst Chain.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "nobel-prize", "medicine"]
  },
  {
    id: "q-scientist-025",
    title: "The 1962 Nobel Prize in Physiology or Medicine was awarded to James Watson, Francis Crick, and Maurice Wilkins for determining which molecular architecture?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Genetics & Molecular Biology", "Biochemistry & Polymers"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The double-helix structure of DNA", isCorrect: true },
      { id: "opt-2", text: "The globular structure of hemoglobin", isCorrect: false },
      { id: "opt-3", text: "The primary sequence of insulin", isCorrect: false },
      { id: "opt-4", text: "The secondary alpha-helix folding of keratin", isCorrect: false }
    ],
    explanation: "Watson and Crick deduced the antiparallel double-helix structure of deoxyribonucleic acid (DNA) with complementary base pairing (A-T, G-C) in 1953, heavily relying on X-ray diffraction Photo 51 taken by Rosalind Franklin.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "nobel-prize", "genetics"]
  },
  {
    id: "q-scientist-026",
    title: "Who proposed that radiant electromagnetic energy is emitted and absorbed only in discrete packets called quanta (E = h*nu), winning the 1918 Nobel Prize in Physics?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Modern Physics & Quantum Theory", "Physical Sciences"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Max Planck", isCorrect: true },
      { id: "opt-2", text: "Ludwig Boltzmann", isCorrect: false },
      { id: "opt-3", text: "Werner Heisenberg", isCorrect: false },
      { id: "opt-4", text: "Erwin Schrödinger", isCorrect: false }
    ],
    explanation: "In 1900, Max Planck solved the blackbody radiation ultraviolet catastrophe by postulating that vibrational energy is quantized proportional to frequency through Planck's constant (h = 6.626 x 10^-34 J*s).",
    tags: ["super-scientists-inventors", "scientists", "nobel-prize", "quantum-physics", "physics"]
  },
  {
    id: "q-scientist-027",
    title: "Which Danish physicist received the 1922 Nobel Prize for proposing an atomic model featuring electrons traveling in stationary quantized orbits around a central nucleus?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Modern Physics & Quantum Theory", "Periodic Table & Chemical Bonding"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Niels Bohr", isCorrect: true },
      { id: "opt-2", text: "Ernest Rutherford", isCorrect: false },
      { id: "opt-3", text: "J. J. Thomson", isCorrect: false },
      { id: "opt-4", text: "Wolfgang Pauli", isCorrect: false }
    ],
    explanation: "Niels Bohr formulated the planetary Bohr model of the atom in 1913, explaining that electrons absorb or emit discrete radiation quanta only when transitioning between fixed, non-radiating angular momentum orbits.",
    tags: ["super-scientists-inventors", "scientists", "nobel-prize", "atomic-structure", "physics"]
  },
  {
    id: "q-scientist-028",
    title: "Ernest Rutherford deduced the existence of a dense, positively charged atomic nucleus through which historic experiment in 1909?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Modern Physics & Quantum Theory", "Physical Sciences"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "The Alpha Particle Gold Foil Scattering Experiment", isCorrect: true },
      { id: "opt-2", text: "The Oil Drop Terminal Velocity Experiment", isCorrect: false },
      { id: "opt-3", text: "The Cathode Ray Tube Deflection Experiment", isCorrect: false },
      { id: "opt-4", text: "The Stern-Gerlach Magnetic Deflection Experiment", isCorrect: false }
    ],
    explanation: "Conducted with Hans Geiger and Ernest Marsden, alpha particles were fired at thin gold foil. The rare backward deflection of particles proved that atomic mass and positive charge are concentrated in a tiny central nucleus.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "physics", "atomic-physics"]
  },
  {
    id: "q-scientist-029",
    title: "Who is the only person to have been awarded two unshared (solo) Nobel Prizes—one in Chemistry (1954) and one in Peace (1962)?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Periodic Table & Chemical Bonding", "Literature, Awards & Culture"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Linus Pauling", isCorrect: true },
      { id: "opt-2", text: "Norman Borlaug", isCorrect: false },
      { id: "opt-3", text: "Albert Schweitzer", isCorrect: false },
      { id: "opt-4", text: "Harold Urey", isCorrect: false }
    ],
    explanation: "Linus Pauling won the 1954 Nobel Prize in Chemistry for his research on the nature of chemical bonds and molecular hybridization, and the 1962 Nobel Peace Prize for his tireless crusade against above-ground nuclear weapons testing.",
    tags: ["super-scientists-inventors", "scientists", "nobel-prize", "chemistry"]
  },
  {
    id: "q-scientist-030",
    title: "Which colorful American theoretical physicist shared the 1965 Nobel Prize for developing Quantum Electrodynamics (QED) and visual Feynman diagrams?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Modern Physics & Quantum Theory", "Physical Sciences"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Richard Feynman", isCorrect: true },
      { id: "opt-2", text: "Murray Gell-Mann", isCorrect: false },
      { id: "opt-3", text: "Julian Schwinger", isCorrect: false },
      { id: "opt-4", text: "Freeman Dyson", isCorrect: false }
    ],
    explanation: "Richard Feynman revolutionized particle physics by introducing Feynman diagrams to visualize and calculate interactions between light and matter in Quantum Electrodynamics (QED). He also envisioned nanotechnology in 1959.",
    tags: ["super-scientists-inventors", "scientists", "nobel-prize", "quantum-physics", "physics"]
  },
  {
    id: "q-scientist-031",
    title: "Emmanuelle Charpentier and Jennifer Doudna made history in 2020 as the first all-female duo to win the Nobel Prize in Chemistry for developing:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Genetics & Molecular Biology", "Science & Technology Milestones"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "CRISPR-Cas9 genome editing method", isCorrect: true },
      { id: "opt-2", text: "Polymerase Chain Reaction (PCR) thermal cycling", isCorrect: false },
      { id: "opt-3", text: "Sanger dideoxy sequencing chemistry", isCorrect: false },
      { id: "opt-4", text: "Monoclonal antibody hybridoma technology", isCorrect: false }
    ],
    explanation: "Charpentier and Doudna adapted the bacterial CRISPR-Cas9 adaptive immune mechanism into programmable genetic scissors capable of editing DNA sequences in animals, plants, and microorganisms with unprecedented precision.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "nobel-prize", "genetics", "biotechnology"]
  },
  {
    id: "q-scientist-032",
    title: "Katalin Karikó and Drew Weissman received the 2023 Nobel Prize in Physiology or Medicine for which critical biochemical discovery that enabled mRNA COVID-19 vaccines?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Human Body Heroes", "Genetics & Molecular Biology"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Nucleoside base modifications suppressing inflammatory response", isCorrect: true },
      { id: "opt-2", text: "Synthesis of reverse transcriptase inhibitors", isCorrect: false },
      { id: "opt-3", text: "Discovery of adenovirus replication capsid vectors", isCorrect: false },
      { id: "opt-4", text: "Isolation of neutralizing monoclonal antibodies", isCorrect: false }
    ],
    explanation: "Karikó and Weissman discovered that replacing uridine with pseudouridine in synthetic mRNA prevents inflammatory immune responses and dramatically boosts intracellular protein translation, making safe mRNA vaccines viable.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "nobel-prize", "medicine", "immunology"]
  },
  {
    id: "q-scientist-033",
    title: "Swedish geneticist Svante Pääbo won the 2022 Nobel Prize in Physiology or Medicine for pioneering ancient DNA extraction and sequencing the genome of:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Genetics & Molecular Biology", "History Time Machine"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Neanderthals and newly discovered Denisovans", isCorrect: true },
      { id: "opt-2", text: "Woolly mammoths and saber-toothed tigers", isCorrect: false },
      { id: "opt-3", text: "Dodo birds and passenger pigeons", isCorrect: false },
      { id: "opt-4", text: "Ancient Egyptian mummified pharaohs", isCorrect: false }
    ],
    explanation: "Svante Pääbo founded the field of paleogenomics by overcoming massive DNA degradation and contamination to sequence the complete Neanderthal genome and identify a previously unknown archaic hominin, the Denisovans.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "nobel-prize", "genetics", "evolution"]
  },
  {
    id: "q-scientist-034",
    title: "Guglielmo Marconi was awarded the 1909 Nobel Prize in Physics (shared with Karl Ferdinand Braun) for his pioneering work in developing:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "Physical Sciences"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Wireless telegraphy and radio communication", isCorrect: true },
      { id: "opt-2", text: "Incandescent carbon filament lighting", isCorrect: false },
      { id: "opt-3", text: "Steam turbine electrical generators", isCorrect: false },
      { id: "opt-4", text: "Cathode-ray television display tubes", isCorrect: false }
    ],
    explanation: "Marconi demonstrated practical long-distance wireless radio telegraphy, achieving the first transatlantic radio transmission from Cornwall to Newfoundland in December 1901, revolutionizing maritime and global communications.",
    tags: ["super-scientists-inventors", "inventors", "nobel-prize", "telecom", "physics"]
  },
  {
    id: "q-scientist-035",
    title: "British biochemist Frederick Sanger is the only person to have been awarded the Nobel Prize in Chemistry twice, for sequencing:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Genetics & Molecular Biology", "Biochemistry & Polymers"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "The amino acid sequence of insulin and DNA chain-termination sequencing", isCorrect: true },
      { id: "opt-2", text: "The secondary structure of collagen and synthetic insulin synthesis", isCorrect: false },
      { id: "opt-3", text: "The chemical structure of penicillin and vitamin B12", isCorrect: false },
      { id: "opt-4", text: "The active site of hemoglobin and transfer RNA folding", isCorrect: false }
    ],
    explanation: "Sanger won the 1958 Nobel Prize for determining the complete primary amino acid sequence of the protein hormone insulin, and the 1980 Nobel Prize for developing the dideoxy chain-termination method for sequencing DNA.",
    tags: ["super-scientists-inventors", "scientists", "nobel-prize", "biochemistry", "genetics"]
  },
  {
    id: "q-scientist-036",
    title: "Who is the only physicist to have been awarded the Nobel Prize in Physics twice (1956 for the transistor and 1972 for superconductivity)?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Modern Physics & Quantum Theory", "Science & Technology Milestones"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "John Bardeen", isCorrect: true },
      { id: "opt-2", text: "William Shockley", isCorrect: false },
      { id: "opt-3", text: "Walter Brattain", isCorrect: false },
      { id: "opt-4", text: "Leon Cooper", isCorrect: false }
    ],
    explanation: "John Bardeen co-invented the point-contact transistor at Bell Labs in 1947 (1956 Nobel) and later co-formulated the microscopic BCS theory of low-temperature superconductivity with Cooper and Schrieffer (1972 Nobel).",
    tags: ["super-scientists-inventors", "scientists", "nobel-prize", "physics", "semiconductors"]
  },
  {
    id: "q-scientist-037",
    title: "British crystallographer Dorothy Crowfoot Hodgkin won the 1964 Nobel Prize in Chemistry for solving the complex three-dimensional structures of which vital biomolecules?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Biochemistry & Polymers", "Human Body Heroes"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Penicillin, Vitamin B12, and Insulin", isCorrect: true },
      { id: "opt-2", text: "DNA, RNA, and Ribosomes", isCorrect: false },
      { id: "opt-3", text: "Myoglobin, Hemoglobin, and Cytochrome", isCorrect: false },
      { id: "opt-4", text: "Chlorophyll, Carotene, and Rhodopsin", isCorrect: false }
    ],
    explanation: "Dorothy Hodgkin mastered X-ray crystallography to map the atomic coordinates of penicillin (1945), vitamin B12 (1955), and eventually insulin (1969), setting a gold standard for structural biochemistry.",
    tags: ["super-scientists-inventors", "scientists", "nobel-prize", "chemistry", "crystallography"]
  },
  {
    id: "q-scientist-038",
    title: "Which German chemist received the 1918 Nobel Prize in Chemistry for synthesizing ammonia directly from atmospheric nitrogen and hydrogen gas?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Physical Chemistry & Solutions", "Science & Technology Milestones"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Fritz Haber", isCorrect: true },
      { id: "opt-2", text: "Carl Bosch", isCorrect: false },
      { id: "opt-3", text: "Wilhelm Ostwald", isCorrect: false },
      { id: "opt-4", text: "Walther Nernst", isCorrect: false }
    ],
    explanation: "Fritz Haber developed high-pressure, catalytic fixation of nitrogen gas (N2 + 3H2 -> 2NH3), scaled industrially by Carl Bosch. The Haber-Bosch process underpins synthetic nitrogen fertilizers feeding nearly half the global human population.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "nobel-prize", "chemistry"]
  },
  {
    id: "q-scientist-039",
    title: "Arthur Ashkin won the 2018 Nobel Prize in Physics for inventing which revolutionary laser tool capable of trapping and moving microscopic living organisms?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Optics & Wave Physics", "Cell Biology & Microbiology"],
    difficulty: "hard",
    options: [
      { id: "opt-1", text: "Optical tweezers", isCorrect: true },
      { id: "opt-2", text: "Atomic force microscope", isCorrect: false },
      { id: "opt-3", text: "Scanning tunneling probe", isCorrect: false },
      { id: "opt-4", text: "Electron beam lithographer", isCorrect: false }
    ],
    explanation: "Ashkin realized that focused laser beams exert radiation pressure and gradient forces that can trap and manipulate microscopic dielectric particles, viruses, and living bacteria without thermal damage, creating 'optical tweezers'.",
    tags: ["super-scientists-inventors", "inventors", "nobel-prize", "optics", "physics"]
  },
  {
    id: "q-scientist-040",
    title: "Shinya Yamanaka and Sir John Gurdon shared the 2012 Nobel Prize in Physiology or Medicine for discovering that mature differentiated cells can be reprogrammed into:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Genetics & Molecular Biology", "Cell Biology & Microbiology"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Induced pluripotent stem cells (iPSCs)", isCorrect: true },
      { id: "opt-2", text: "Totipotent embryonic blastomeres", isCorrect: false },
      { id: "opt-3", text: "Immortalized cancer cell lines", isCorrect: false },
      { id: "opt-4", text: "Unipotent epidermal keratinocytes", isCorrect: false }
    ],
    explanation: "Yamanaka discovered in 2006 that introducing four transcription factors (Oct3/4, Sox2, Klf4, c-Myc) into mature mouse and human adult skin cells could reprogram them back into pluripotent stem cells capable of forming any tissue.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "nobel-prize", "medicine", "stem-cells"]
  },

  // ==========================================
  // GROUP 3: Famous Inventions & Inventors (041 - 060)
  // ==========================================
  {
    id: "q-scientist-041",
    title: "Thomas Alva Edison established the world's first industrial research laboratory at Menlo Park, New Jersey, and commercially perfected which device in 1879?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Long-lasting incandescent electric light bulb", isCorrect: true },
      { id: "opt-2", text: "Cathode-ray television display", isCorrect: false },
      { id: "opt-3", text: "Direct current steam dynamo", isCorrect: false },
      { id: "opt-4", text: "Electromechanical digital computer", isCorrect: false }
    ],
    explanation: "While arc lamps and preliminary bulbs existed, Edison invented a practical incandescent lamp using a carbonized bamboo filament in a high vacuum that could burn for over 1,200 hours, backed by a complete electric utility distribution system.",
    tags: ["super-scientists-inventors", "inventors", "inventions", "electricity"]
  },
  {
    id: "q-scientist-042",
    title: "Which brilliant Serbian-American inventor championed Alternating Current (AC) electrical systems and patented the rotating magnetic field induction motor?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Electromagnetism & Circuits", "Science & Technology Milestones"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Nikola Tesla", isCorrect: true },
      { id: "opt-2", text: "Thomas Edison", isCorrect: false },
      { id: "opt-3", text: "George Westinghouse", isCorrect: false },
      { id: "opt-4", text: "Michael Faraday", isCorrect: false }
    ],
    explanation: "Nikola Tesla patented polyphase alternating current power generation, transmission, and motors. His AC system triumphed over Edison's Direct Current (DC) in the 'War of Currents', powering the Niagara Falls hydroelectric project.",
    tags: ["super-scientists-inventors", "inventors", "inventions", "electricity", "physics"]
  },
  {
    id: "q-scientist-043",
    title: "Scottish-born inventor Alexander Graham Bell was granted US Patent No. 174,465 in March 1876 for which transformative telecommunications apparatus?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The acoustic telegraph (Telephone)", isCorrect: true },
      { id: "opt-2", text: "The radio transmitter", isCorrect: false },
      { id: "opt-3", text: "The mechanical phonograph", isCorrect: false },
      { id: "opt-4", text: "The underwater sonar transducer", isCorrect: false }
    ],
    explanation: "Alexander Graham Bell was granted the fundamental patent for the telephone in 1876, uttering the famous first words to his assistant: 'Mr. Watson, come here, I want to see you.'",
    tags: ["super-scientists-inventors", "inventors", "inventions", "telecom"]
  },
  {
    id: "q-scientist-044",
    title: "At Kitty Hawk, North Carolina, on December 17, 1903, the Wright brothers made aviation history by achieving the world's first:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Controlled, sustained, powered heavier-than-air human flight", isCorrect: true },
      { id: "opt-2", text: "Hot air balloon ascent across the English Channel", isCorrect: false },
      { id: "opt-3", text: "Supersonic jet aircraft flight", isCorrect: false },
      { id: "opt-4", text: "Helicopter vertical autorotation takeoff", isCorrect: false }
    ],
    explanation: "Orville and Wilbur Wright flew their 12-horsepower 'Wright Flyer' biplane four times at Kill Devil Hills, with Orville making the first flight of 120 feet in 12 seconds, utilizing their patented three-axis wing-warping control system.",
    tags: ["super-scientists-inventors", "inventors", "inventions", "aviation", "history"]
  },
  {
    id: "q-scientist-045",
    title: "Scottish instrument maker James Watt radically improved Thomas Newcomen's primitive steam engine by introducing which crucial innovation in 1769?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Thermodynamics & Heat", "History Time Machine"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "A separate steam condenser chamber", isCorrect: true },
      { id: "opt-2", text: "An internal combustion spark plug", isCorrect: false },
      { id: "opt-3", text: "A multi-stage centrifugal compressor", isCorrect: false },
      { id: "opt-4", text: "A solid-state thermocouple heat sink", isCorrect: false }
    ],
    explanation: "In Newcomen's engine, the cylinder was repeatedly heated and cooled with cold water spray, wasting massive energy. Watt added a separate condenser kept constantly cold while the cylinder stayed hot, multiplying fuel efficiency by 75%.",
    tags: ["super-scientists-inventors", "inventors", "inventions", "thermodynamics", "engineering"]
  },
  {
    id: "q-scientist-046",
    title: "Johannes Gutenberg revolutionized the dissemination of knowledge across Renaissance Europe around 1440 by inventing:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "History Time Machine", "Literature, Awards & Culture"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Movable metal type mechanical printing press", isCorrect: true },
      { id: "opt-2", text: "Lithographic offset rotary press", isCorrect: false },
      { id: "opt-3", text: "Papyrus paper-making water mill", isCorrect: false },
      { id: "opt-4", text: "Engraved copperplate cylinder press", isCorrect: false }
    ],
    explanation: "Gutenberg combined movable metal alloy type (lead, tin, antimony), oil-based ink, and a wooden screw press in Mainz, Germany, printing his celebrated 42-line Gutenberg Bible and sparking the Printing Revolution.",
    tags: ["super-scientists-inventors", "inventors", "inventions", "printing", "history"]
  },
  {
    id: "q-scientist-047",
    title: "Who is celebrated as the 'Father of the Computer' for designing the steam-powered mechanical Difference Engine and the programmable Analytical Engine?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Computer Science & AI", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Charles Babbage", isCorrect: true },
      { id: "opt-2", text: "Alan Turing", isCorrect: false },
      { id: "opt-3", text: "John Atanasoff", isCorrect: false },
      { id: "opt-4", text: "Herman Hollerith", isCorrect: false }
    ],
    explanation: "Charles Babbage conceptualized the Analytical Engine (1837), which incorporated all basic elements of modern general-purpose digital computers: an arithmetic logic unit ('mill'), control flow via punched cards, and memory ('store').",
    tags: ["super-scientists-inventors", "inventors", "inventions", "computer-science"]
  },
  {
    id: "q-scientist-048",
    title: "Who is widely acknowledged as the world's first computer programmer for publishing the first machine algorithm intended for Babbage's Analytical Engine?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Computer Science & AI", "Science & Technology Milestones"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Ada Lovelace", isCorrect: true },
      { id: "opt-2", text: "Grace Hopper", isCorrect: false },
      { id: "opt-3", text: "Katherine Johnson", isCorrect: false },
      { id: "opt-4", text: "Margaret Hamilton", isCorrect: false }
    ],
    explanation: "Augusta Ada King, Countess of Lovelace, translated Luigi Menabrea's paper on the Analytical Engine, appending extensive 'Notes'. Note G contained an algorithm to compute Bernoulli numbers, making her the first programmer in history.",
    tags: ["super-scientists-inventors", "scientists", "inventions", "computer-science"]
  },
  {
    id: "q-scientist-049",
    title: "While working at CERN in 1989, British software scientist Tim Berners-Lee invented which revolutionary global information architecture?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Web Technologies & Cloud Computing", "Computer Science & AI"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The World Wide Web (WWW)", isCorrect: true },
      { id: "opt-2", text: "The ARPANET packet switching protocol", isCorrect: false },
      { id: "opt-3", text: "The Transmission Control Protocol (TCP/IP)", isCorrect: false },
      { id: "opt-4", text: "The Ethernet local area network standard", isCorrect: false }
    ],
    explanation: "Sir Tim Berners-Lee drafted the proposal for the World Wide Web in March 1989. By late 1990, he had created HTML (Hypertext Markup Language), HTTP (Hypertext Transfer Protocol), URLs, and the first web client and server.",
    tags: ["super-scientists-inventors", "inventors", "inventions", "web-technologies", "internet"]
  },
  {
    id: "q-scientist-050",
    title: "French chemist and microbiologist Louis Pasteur developed which thermal treatment process to prevent microbial spoilage in beverages and created the first vaccine for:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Cell Biology & Microbiology", "Human Body Heroes"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Pasteurization; Rabies", isCorrect: true },
      { id: "opt-2", text: "Sterilization; Tuberculosis", isCorrect: false },
      { id: "opt-3", text: "Homogenization; Cholera", isCorrect: false },
      { id: "opt-4", text: "Fermentation; Polio", isCorrect: false }
    ],
    explanation: "Pasteur disproved spontaneous generation, established the germ theory of fermentation, invented pasteurization (heating liquids to kill pathogenic bacteria), and developed attenuated vaccines for rabies and anthrax.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "biology", "medicine"]
  },
  {
    id: "q-scientist-051",
    title: "English physician Edward Jenner is revered as the 'Father of Immunology' for developing the first successful vaccine in human history in 1796 against:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Human Body Heroes", "Science & Technology Milestones"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Smallpox (using cowpox pustules)", isCorrect: true },
      { id: "opt-2", text: "Polio (using inactivated virus)", isCorrect: false },
      { id: "opt-3", text: "Tetanus (using formalin toxoid)", isCorrect: false },
      { id: "opt-4", text: "Diphtheria (using horse antiserum)", isCorrect: false }
    ],
    explanation: "Jenner noticed that milkmaids appeared immune to deadly smallpox after contracting mild cowpox. In May 1796, he inoculated 8-year-old James Phipps with cowpox fluid, demonstrating effective cross-protective immunity.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "medicine", "immunology"]
  },
  {
    id: "q-scientist-052",
    title: "Samuel Morse revolutionized long-distance telecommunications in the 1830s and 1840s by co-inventing the electric telegraph and:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Morse code (encoding text as sequences of dots and dashes)", isCorrect: true },
      { id: "opt-2", text: "Baudot code binary teleprinter tape", isCorrect: false },
      { id: "opt-3", text: "ASCII computer character representation", isCorrect: false },
      { id: "opt-4", text: "Braille embossed tactile literacy script", isCorrect: false }
    ],
    explanation: "Samuel Morse and Alfred Vail developed the single-wire electric telegraph and Morse code, transmitting the first historic telegraph message 'What hath God wrought' between Washington D.C. and Baltimore in May 1844.",
    tags: ["super-scientists-inventors", "inventors", "inventions", "telecom", "history"]
  },
  {
    id: "q-scientist-053",
    title: "German mechanical engineer Rudolf Diesel patented an internal combustion engine in 1892 that operates without electrical spark plugs, relying instead on:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Thermodynamics & Heat", "Physical Sciences"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "High compression of air to heat and ignite injected fuel", isCorrect: true },
      { id: "opt-2", text: "Pre-heated glow chambers ignited by external kerosene torches", isCorrect: false },
      { id: "opt-3", text: "Exothermic catalytic decomposition of hydrogen peroxide", isCorrect: false },
      { id: "opt-4", text: "Piezoelectric crystal impact spark generation", isCorrect: false }
    ],
    explanation: "The diesel engine achieves compression ignition: drawing pure air into the cylinder and compressing it to high pressure (~15:1 to 22:1), raising the air temperature above fuel autoignition before atomized diesel is injected.",
    tags: ["super-scientists-inventors", "inventors", "inventions", "engineering", "thermodynamics"]
  },
  {
    id: "q-scientist-054",
    title: "Swedish chemist Alfred Nobel patented dynamite in 1867 by discovering that dangerous nitroglycerin could be safely handled and stabilized when mixed with:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Chemical Sciences", "Literature, Awards & Culture"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Kieselguhr (porous diatomaceous earth)", isCorrect: true },
      { id: "opt-2", text: "Activated charcoal powder", isCorrect: false },
      { id: "opt-3", text: "Hydrated calcium sulfate (plaster of Paris)", isCorrect: false },
      { id: "opt-4", text: "Finely ground volcanic pumice ash", isCorrect: false }
    ],
    explanation: "Alfred Nobel mixed volatile liquid nitroglycerin with inert kieselguhr (diatomaceous earth), forming a pliable paste that could be shaped into cylinders and safely detonated with a blasting cap. He endowed the Nobel Prizes in his 1895 will.",
    tags: ["super-scientists-inventors", "inventors", "inventions", "chemistry", "nobel-prize"]
  },
  {
    id: "q-scientist-055",
    title: "In 1609-1610, Galileo Galilei constructed an improved refracting telescope and made which monumental observational discoveries that dismantled geocentrism?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Space Explorers", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The four large moons of Jupiter and the phases of Venus", isCorrect: true },
      { id: "opt-2", text: "The rings of Saturn and Uranus with its moons", isCorrect: false },
      { id: "opt-3", text: "The spiral arms of the Andromeda galaxy", isCorrect: false },
      { id: "opt-4", text: "The canals of Mars and the Kuiper belt", isCorrect: false }
    ],
    explanation: "Galileo discovered Jupiter's four largest moons (Io, Europa, Ganymede, Callisto), proving bodies orbit entities other than Earth, and observed Venus exhibiting a full set of phases like the Moon, confirming Copernicus's heliocentric theory.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "astronomy", "space"]
  },
  {
    id: "q-scientist-056",
    title: "Which German mechanical engineer is credited with inventing the world's first practical commercial petrol-powered automobile (Benz Patent-Motorwagen) in 1886?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Karl Benz", isCorrect: true },
      { id: "opt-2", text: "Gottlieb Daimler", isCorrect: false },
      { id: "opt-3", text: "Wilhelm Maybach", isCorrect: false },
      { id: "opt-4", text: "Ferdinand Porsche", isCorrect: false }
    ],
    explanation: "Karl Benz patented his three-wheeled 'Motorwagen' powered by a high-speed four-stroke internal combustion engine in January 1886. His wife Bertha Benz completed the famous first long-distance automobile road trip in 1888.",
    tags: ["super-scientists-inventors", "inventors", "inventions", "automotive", "history"]
  },
  {
    id: "q-scientist-057",
    title: "American inventor Eli Whitney transformed 19th-century agriculture and industrial manufacturing by patenting which two revolutionary innovations?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "History Time Machine"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "The mechanical cotton gin and standardized interchangeable parts", isCorrect: true },
      { id: "opt-2", text: "The mechanical grain reaper and vulcanized rubber tires", isCorrect: false },
      { id: "opt-3", text: "The steel-bladed moldboard plow and steam threshing machine", isCorrect: false },
      { id: "opt-4", text: "The seed drill and modern crop rotation nitrogen cycle", isCorrect: false }
    ],
    explanation: "Whitney patented the cotton gin in 1794 to mechanically strip cotton fibers from seeds, multiplying cotton processing 50-fold, and later championed manufacturing muskets using interchangeable standardized components.",
    tags: ["super-scientists-inventors", "inventors", "inventions", "agriculture", "manufacturing"]
  },
  {
    id: "q-scientist-058",
    title: "American industrialist Henry Ford revolutionized modern manufacturing in 1913 by introducing which method to assemble the Model T car?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "Macroeconomics, Banking & Trade"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The continuously moving conveyor-belt assembly line", isCorrect: true },
      { id: "opt-2", text: "Robotic laser welding automated workstations", isCorrect: false },
      { id: "opt-3", text: "Just-In-Time modular craftsmanship cells", isCorrect: false },
      { id: "opt-4", text: "Hydroformed aluminum monocoque extrusion", isCorrect: false }
    ],
    explanation: "Henry Ford installed a moving assembly line at Highland Park, Michigan, cutting chassis production time from 12 hours to 93 minutes. This slashed costs, making personal automobiles affordable to working-class families.",
    tags: ["super-scientists-inventors", "inventors", "inventions", "manufacturing", "automotive"]
  },
  {
    id: "q-scientist-059",
    title: "American prodigy Philo T. Farnsworth is recognized for inventing which foundational electronic television component in 1927?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Science & Technology Milestones", "Physical Sciences"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "The Image Dissector (all-electronic video camera tube)", isCorrect: true },
      { id: "opt-2", text: "The mechanical spinning Nipkow disc", isCorrect: false },
      { id: "opt-3", text: "The liquid crystal active-matrix display panel", isCorrect: false },
      { id: "opt-4", text: "The charge-coupled device (CCD) semiconductor sensor", isCorrect: false }
    ],
    explanation: "At age 21, Philo Farnsworth transmitted the first all-electronic television image (a straight line) using his electronic image dissector tube, which converted optical images into electron streams scanned magnetically.",
    tags: ["super-scientists-inventors", "inventors", "inventions", "television", "electronics"]
  },
  {
    id: "q-scientist-060",
    title: "In 1839, Charles Goodyear accidentally discovered the process of vulcanization—transforming sticky raw natural latex rubber into durable, elastic rubber—by heating it with:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Biochemistry & Polymers", "Chemical Sciences"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Sulfur", isCorrect: true },
      { id: "opt-2", text: "Carbon black", isCorrect: false },
      { id: "opt-3", text: "Phosphorus", isCorrect: false },
      { id: "opt-4", text: "Silicon dioxide", isCorrect: false }
    ],
    explanation: "Goodyear discovered that heating natural polyisoprene rubber with sulfur causes disulfide cross-links between polymer chains, preventing the rubber from melting in summer heat or turning brittle in winter cold.",
    tags: ["super-scientists-inventors", "inventors", "inventions", "polymers", "chemistry"]
  },

  // ==========================================
  // GROUP 4: Classical Discoveries & Universal Laws (061 - 080)
  // ==========================================
  {
    id: "q-scientist-061",
    title: "Sir Isaac Newton's monumental 1687 treatise 'Philosophiae Naturalis Principia Mathematica' laid the foundation for classical physics by formulating:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Mechanics & Kinematics", "Physical Sciences"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The Three Laws of Motion and Universal Gravitation", isCorrect: true },
      { id: "opt-2", text: "The Kinetic Theory of Gases and Entropy", isCorrect: false },
      { id: "opt-3", text: "The Special Theory of Relativity and Light Quanta", isCorrect: false },
      { id: "opt-4", text: "Electromagnetic Induction and Wave Equations", isCorrect: false }
    ],
    explanation: "Newton's Principia introduced his Three Laws of Motion (inertia, F=ma, action-reaction) and the Universal Law of Gravitation (F = G*m1*m2/r^2), mathematically unifying terrestrial and celestial mechanics.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "physics", "mechanics"]
  },
  {
    id: "q-scientist-062",
    title: "Archimedes of Syracuse discovered his famous Principle of Buoyancy—which states that a body immersed in a fluid experiences an upward force equal to:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Physical Sciences", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The weight of the fluid displaced by the body", isCorrect: true },
      { id: "opt-2", text: "The total surface area of the immersed submerged object", isCorrect: false },
      { id: "opt-3", text: "The hydrostatic atmospheric pressure at the container bottom", isCorrect: false },
      { id: "opt-4", text: "The absolute density of the solid body itself", isCorrect: false }
    ],
    explanation: "Archimedes realized this principle while stepping into a bath, famously shouting 'Eureka!'. Archimedes' Principle states that the buoyant force on a submerged object equals the weight of the displaced liquid.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "physics", "fluid-mechanics"]
  },
  {
    id: "q-scientist-063",
    title: "Michael Faraday demonstrated in 1831 that an electric current can be induced across a conductor by a changing magnetic field, establishing the principle of:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Electromagnetism & Circuits", "Physical Sciences"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Electromagnetic Induction", isCorrect: true },
      { id: "opt-2", text: "Thermoelectric Seebeck Effect", isCorrect: false },
      { id: "opt-3", text: "Piezoelectric Resonance", isCorrect: false },
      { id: "opt-4", text: "Photoelectric Electron Emission", isCorrect: false }
    ],
    explanation: "Faraday discovered electromagnetic induction by moving a magnet through a wire coil, inducing an electromotive force (EMF). This single breakthrough forms the foundational operating principle of all electric dynamos, motors, and transformers.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "electromagnetism", "physics"]
  },
  {
    id: "q-scientist-064",
    title: "Austrian monk Gregor Mendel is celebrated as the 'Father of Modern Genetics' for deducing the laws of inheritance through breeding experiments on which plant?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Genetics & Molecular Biology", "Living World Explorers"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Garden pea (Pisum sativum)", isCorrect: true },
      { id: "opt-2", text: "Fruit fly (Drosophila melanogaster)", isCorrect: false },
      { id: "opt-3", text: "Common bread wheat (Triticum aestivum)", isCorrect: false },
      { id: "opt-4", text: "Field mustard (Arabidopsis thaliana)", isCorrect: false }
    ],
    explanation: "Between 1856 and 1863, Gregor Mendel cultivated ~29,000 pea plants, tracking seven contrasting traits to formulate the fundamental Law of Segregation and the Law of Independent Assortment.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "genetics", "biology"]
  },
  {
    id: "q-scientist-065",
    title: "Russian chemist Dmitri Mendeleev published the first widely accepted Periodic Table in 1869, arranging chemical elements primarily by atomic weight and famously:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Periodic Table & Chemical Bonding", "Chemical Sciences"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Leaving blank gaps predicting the properties of undiscovered elements", isCorrect: true },
      { id: "opt-2", text: "Grouping elements purely by their electrical conductivity", isCorrect: false },
      { id: "opt-3", text: "Classifying elements strictly into radioactive and non-radioactive pairs", isCorrect: false },
      { id: "opt-4", text: "Ordering elements according to their nuclear neutron-to-proton ratio", isCorrect: false }
    ],
    explanation: "Mendeleev organized elements with recurring valence trends and left gaps for unknown elements (e.g., eka-aluminum, eka-silicon, eka-boron), which were later discovered as gallium, germanium, and scandium with properties matching his predictions.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "periodic-table", "chemistry"]
  },
  {
    id: "q-scientist-066",
    title: "Charles Darwin's revolutionary 1859 book 'On the Origin of Species' proposed which unifying mechanism driving biological evolution?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Living World Explorers", "Animal Encyclopedia"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Natural selection acting on heritable variation", isCorrect: true },
      { id: "opt-2", text: "Lamarckian inheritance of acquired physical characteristics", isCorrect: false },
      { id: "opt-3", text: "Spontaneous saltational macromutations without intermediate forms", isCorrect: false },
      { id: "opt-4", text: "Directed horizontal gene transfer driven by environmental desire", isCorrect: false }
    ],
    explanation: "Darwin synthesized observations from his 5-year voyage on HMS Beagle, proposing that organisms possessing variations better adapted to their environment are more likely to survive and reproduce ('descent with modification by natural selection').",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "evolution", "biology"]
  },
  {
    id: "q-scientist-067",
    title: "English polymath Robert Hooke coined the biological term 'cell' in his 1665 masterpiece 'Micrographia' after observing microscopic structures in:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Cell Biology & Microbiology", "Living World Explorers"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Thin slices of dead cork tree bark", isCorrect: true },
      { id: "opt-2", text: "Human cheek epithelial scrapings", isCorrect: false },
      { id: "opt-3", text: "Stagnant pond water drops", isCorrect: false },
      { id: "opt-4", text: "Silkworm intestinal lining", isCorrect: false }
    ],
    explanation: "Hooke viewed dead plant cork tissue under his compound microscope. The porous, box-like honeycomb compartments reminded him of the small bare rooms ('cellulae') inhabited by Christian monks in a monastery.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "cell-biology", "biology"]
  },
  {
    id: "q-scientist-068",
    title: "Dutch draper and microscopist Antonie van Leeuwenhoek is celebrated as the 'Father of Microbiology' for being the first human to observe:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Cell Biology & Microbiology", "Human Body Heroes"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Living microscopic single-celled organisms ('animalcules')", isCorrect: true },
      { id: "opt-2", text: "The double-helix molecular geometry of DNA", isCorrect: false },
      { id: "opt-3", text: "Sub-microscopic bacteriophage viral capsids", isCorrect: false },
      { id: "opt-4", text: "Cellular mitochondrial cristae organelles", isCorrect: false }
    ],
    explanation: "Leeuwenhoek crafted powerful single-lens glass microscopes magnifying up to 300x. In 1674-1676, he discovered protozoa, bacteria from dental plaque, red blood cells, and spermatozoa, terming them 'animalcules'.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "microbiology", "biology"]
  },
  {
    id: "q-scientist-069",
    title: "French chemist Antoine Lavoisier earned the title 'Father of Modern Chemistry' by disproving the phlogiston theory and formulating which fundamental law?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Chemical Sciences", "Physical Chemistry & Solutions"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Law of Conservation of Mass in chemical reactions", isCorrect: true },
      { id: "opt-2", text: "Law of Multiple Proportions for molecular ratios", isCorrect: false },
      { id: "opt-3", text: "Law of Partial Pressures for ideal gaseous mixtures", isCorrect: false },
      { id: "opt-4", text: "Law of Octaves for chemical periodicity", isCorrect: false }
    ],
    explanation: "Lavoisier performed precise quantitative combustion experiments in sealed vessels, proving that matter is neither created nor destroyed during chemical transformations. He also correctly identified and named oxygen and hydrogen.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "chemistry"]
  },
  {
    id: "q-scientist-070",
    title: "Nicolaus Copernicus triggered the Scientific Revolution with his 1543 book 'De revolutionibus orbium coelestium' by proposing that:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Space Explorers", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The Sun is at the center of the universe with Earth orbiting it", isCorrect: true },
      { id: "opt-2", text: "The Earth is static at the geometric center of celestial crystal spheres", isCorrect: false },
      { id: "opt-3", text: "Planets follow hyperbolic parabolic escape trajectories", isCorrect: false },
      { id: "opt-4", text: "Gravity travels as ripples in the cosmic ether medium", isCorrect: false }
    ],
    explanation: "Copernicus displaced Ptolemy's 1,400-year-old geocentric orthodoxy by demonstrating mathematically that Earth and other known planets revolve around the Sun, establishing heliocentrism.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "astronomy", "space"]
  },
  {
    id: "q-scientist-071",
    title: "Johannes Kepler deduced the Three Laws of Planetary Motion using meticulous astronomical observational data recorded by which Danish astronomer?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Space Explorers", "Physical Sciences"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Tycho Brahe", isCorrect: true },
      { id: "opt-2", text: "Christiaan Huygens", isCorrect: false },
      { id: "opt-3", text: "Ole Rømer", isCorrect: false },
      { id: "opt-4", text: "Edmond Halley", isCorrect: false }
    ],
    explanation: "Kepler analyzed Tycho Brahe's extensive planetary position catalogs (especially Mars), determining that planetary orbits are ellipses with the Sun at one focus, sweeping out equal areas in equal times.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "astronomy", "physics"]
  },
  {
    id: "q-scientist-072",
    title: "English physician William Harvey published 'De Motu Cordis' in 1628, becoming the first scientist in human history to accurately describe:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Human Body Heroes", "Human Physiology & Anatomy"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "The systemic circulation of blood pumped continuously by the heart", isCorrect: true },
      { id: "opt-2", text: "The chemical transmission of nerve impulses across synapses", isCorrect: false },
      { id: "opt-3", text: "The filtration of urea through nephron glomeruli in the kidney", isCorrect: false },
      { id: "opt-4", text: "The production of bile by hepatocytes in the human liver", isCorrect: false }
    ],
    explanation: "Overturning Galenic dogma that claimed blood was constantly manufactured in the liver and consumed by tissues, Harvey proved mathematically and experimentally that blood circulates in a closed one-way loop pumped by the heart.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "anatomy", "physiology"]
  },
  {
    id: "q-scientist-073",
    title: "Flemish anatomist Andreas Vesalius is recognized as the 'Father of Modern Anatomy' for publishing which 1543 masterwork based on human dissection?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Human Body Heroes", "Human Physiology & Anatomy"],
    difficulty: "hard",
    options: [
      { id: "opt-1", text: "De humani corporis fabrica (On the Fabric of the Human Body)", isCorrect: true },
      { id: "opt-2", text: "Micrographia Illustrata", isCorrect: false },
      { id: "opt-3", text: "Exercitatio Anatomica de Motu Cordis", isCorrect: false },
      { id: "opt-4", text: "Articella Medicinae Antiqua", isCorrect: false }
    ],
    explanation: "Vesalius performed his own human dissections, correcting more than 200 ancient anatomical errors that had persisted for centuries from Galen's dissections of Barbary macaques and animals.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "anatomy", "medicine"]
  },
  {
    id: "q-scientist-074",
    title: "Blaise Pascal formulated Pascal's Law of Fluid Mechanics, which states that external pressure applied to a confined static liquid:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Physical Sciences", "Mechanics & Kinematics"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Is transmitted undiminished in all directions throughout the fluid", isCorrect: true },
      { id: "opt-2", text: "Decreases exponentially with the depth of the fluid column", isCorrect: false },
      { id: "opt-3", text: "Concentrates exclusively toward the narrowest containment orifice", isCorrect: false },
      { id: "opt-4", text: "Increases proportional to the square of atmospheric surface area", isCorrect: false }
    ],
    explanation: "Pascal's principle states that when pressure is exerted on an enclosed fluid, the change is transmitted undiminished to every part of the fluid and vessel walls, serving as the foundational principle of hydraulic brakes and presses.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "fluid-mechanics", "physics"]
  },
  {
    id: "q-scientist-075",
    title: "Robert Boyle formulated Boyle's Law in 1662, which establishes that for a fixed mass of an ideal gas at constant temperature:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Physical Chemistry & Solutions", "Physical Sciences"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Pressure is inversely proportional to volume (P * V = constant)", isCorrect: true },
      { id: "opt-2", text: "Volume is directly proportional to absolute Kelvin temperature", isCorrect: false },
      { id: "opt-3", text: "Pressure is directly proportional to molecular molar mass", isCorrect: false },
      { id: "opt-4", text: "Total internal heat energy remains constant regardless of volume", isCorrect: false }
    ],
    explanation: "Using a J-shaped mercury manometer tube, Robert Boyle proved that compressing a gas to half its volume doubles its pressure (P1*V1 = P2*V2), establishing the first empirical gas law of modern physical chemistry.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "gas-laws", "chemistry"]
  },
  {
    id: "q-scientist-076",
    title: "Scottish physicist James Clerk Maxwell unified electricity, magnetism, and light into a single comprehensive field theory in the 1860s through:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Electromagnetism & Circuits", "Optics & Wave Physics"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Maxwell's Four Electromagnetic Equations", isCorrect: true },
      { id: "opt-2", text: "The Navier-Stokes Fluid Field Equations", isCorrect: false },
      { id: "opt-3", text: "The Schrödinger Wave Probability Equations", isCorrect: false },
      { id: "opt-4", text: "The Dirac Relativistic Spinor Equations", isCorrect: false }
    ],
    explanation: "Maxwell synthesized Gauss's laws, Faraday's law, and Ampere's law (adding displacement current). His equations revealed that light is an electromagnetic wave propagating through space at speed c = 1/sqrt(mu0*epsilon0).",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "electromagnetism", "physics"]
  },
  {
    id: "q-scientist-077",
    title: "Italian physicist Alessandro Volta invented the first continuous chemical source of electric current in 1800, known as the:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Physical Chemistry & Solutions", "Electromagnetism & Circuits"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Voltaic Pile (alternating zinc and copper discs in brine)", isCorrect: true },
      { id: "opt-2", text: "Leyden jar static charge electrostatic capacitor", isCorrect: false },
      { id: "opt-3", text: "Lead-acid rechargeable storage accumulator", isCorrect: false },
      { id: "opt-4", text: "Van de Graaff high-voltage electrostatic belt generator", isCorrect: false }
    ],
    explanation: "Volta stacked alternating pairs of zinc and copper discs separated by cardboard soaked in brine electrolyte, producing the world's first electrochemical battery. The SI unit of electric potential, the volt (V), is named in his honor.",
    tags: ["super-scientists-inventors", "inventors", "inventions", "electricity", "chemistry"]
  },
  {
    id: "q-scientist-078",
    title: "Hans Christian Ørsted discovered the fundamental link between electricity and magnetism in 1820 when he noticed that:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Electromagnetism & Circuits", "Physical Sciences"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "An electric current flowing in a wire deflected a nearby magnetic compass needle", isCorrect: true },
      { id: "opt-2", text: "Heating a magnetic lodestone destroyed its external magnetic field", isCorrect: false },
      { id: "opt-3", text: "A lightning strike shattered an iron bar into polarized magnetic shards", isCorrect: false },
      { id: "opt-4", text: "Static electricity sparks generated visible blue ultraviolet light", isCorrect: false }
    ],
    explanation: "During a lecture demonstration in Copenhagen, Ørsted closed an electric circuit and saw a magnetic compass needle rotate perpendicular to the conducting wire, proving that moving electric charges generate magnetic fields.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "electromagnetism", "physics"]
  },
  {
    id: "q-scientist-079",
    title: "Austrian physicist Christian Doppler described the Doppler Effect in 1842, which explains why the observed frequency of waves changes when:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Optics & Wave Physics", "Physical Sciences"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "There is relative motion between the wave source and the observer", isCorrect: true },
      { id: "opt-2", text: "The propagating medium undergoes a sudden adiabatic phase change", isCorrect: false },
      { id: "opt-3", text: "A wave traverses through an intensely magnetized crystalline lattice", isCorrect: false },
      { id: "opt-4", text: "The wave amplitude exceeds the structural elastic limit of the medium", isCorrect: false }
    ],
    explanation: "The Doppler effect explains why siren pitch sounds higher as an ambulance approaches and lower as it recedes. In astrophysics, Doppler shifts (redshift and blueshift) reveal whether stars and galaxies are moving toward or away from Earth.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "waves", "physics"]
  },
  {
    id: "q-scientist-080",
    title: "French physicist Louis de Broglie was awarded the 1929 Nobel Prize in Physics for proposing which radical wave-particle hypothesis?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Modern Physics & Quantum Theory", "Physical Sciences"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "All moving matter exhibits wave-like properties (lambda = h / p)", isCorrect: true },
      { id: "opt-2", text: "Electrons lose mass as their kinetic energy approaches the speed of light", isCorrect: false },
      { id: "opt-3", text: "Light travels along geodesics bent solely by gravitational potential", isCorrect: false },
      { id: "opt-4", text: "Photons decay spontaneously into electron-positron pairs in vacuum", isCorrect: false }
    ],
    explanation: "De Broglie proposed in 1924 that if electromagnetic waves display particle-like behavior (photons), then material particles like electrons must also possess wave properties with wavelength lambda = h/p, experimentally confirmed in 1927.",
    tags: ["super-scientists-inventors", "scientists", "nobel-prize", "quantum-physics", "physics"]
  },

  // ==========================================
  // GROUP 5: Computing Pioneers, Modern Space & Contemporary Icons (081 - 100)
  // ==========================================
  {
    id: "q-scientist-081",
    title: "Which British mathematical genius formulated the concept of universal computing machines and helped crack Nazi Enigma ciphers at Bletchley Park?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Artificial Intelligence & Machine Learning", "Computer Science & AI"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Alan Turing", isCorrect: true },
      { id: "opt-2", text: "John von Neumann", isCorrect: false },
      { id: "opt-3", text: "Norbert Wiener", isCorrect: false },
      { id: "opt-4", text: "Claude Shannon", isCorrect: false }
    ],
    explanation: "Alan Turing laid the theoretical foundation of computer science with the Turing Machine (1936), designed the electro-mechanical 'Bombe' to break Enigma codes during WWII, and proposed the Turing Test for Artificial Intelligence in 1950.",
    tags: ["super-scientists-inventors", "scientists", "computer-science", "ai", "cryptography"]
  },
  {
    id: "q-scientist-082",
    title: "The stored-program computer architecture featuring a shared memory holding both instructions and data with a CPU and arithmetic logic unit is named after:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Computer Science & AI", "Science & Technology Milestones"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "John von Neumann", isCorrect: true },
      { id: "opt-2", text: "Alan Turing", isCorrect: false },
      { id: "opt-3", text: "J. Presper Eckert", isCorrect: false },
      { id: "opt-4", text: "John Mauchly", isCorrect: false }
    ],
    explanation: "Hungarian-American polymath John von Neumann authored the 1945 'First Draft of a Report on the EDVAC', describing the universal stored-program architecture (CPU, memory, ALU, registers, I/O) that powers modern computers.",
    tags: ["super-scientists-inventors", "scientists", "computer-science", "architecture"]
  },
  {
    id: "q-scientist-083",
    title: "US Navy Rear Admiral Grace Hopper developed the first programming language compiler (A-0) and co-designed which major business language?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Computer Science & AI", "Science & Technology Milestones"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "COBOL (Common Business-Oriented Language)", isCorrect: true },
      { id: "opt-2", text: "FORTRAN (Formula Translation)", isCorrect: false },
      { id: "opt-3", text: "BASIC (Beginner's All-purpose Symbolic Code)", isCorrect: false },
      { id: "opt-4", text: "PASCAL procedural programming language", isCorrect: false }
    ],
    explanation: "Grace Hopper pioneered machine-independent programming languages and created the first linker/compiler. She also popularized the term 'computer bug' when an actual moth was extracted from a Mark II relay at Harvard in 1947.",
    tags: ["super-scientists-inventors", "scientists", "inventors", "computer-science", "programming"]
  },
  {
    id: "q-scientist-084",
    title: "American theoretical physicist J. Robert Oppenheimer served as the scientific director of the Los Alamos Laboratory during which secret WWII initiative?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "History Time Machine", "Science & Technology Milestones"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The Manhattan Project", isCorrect: true },
      { id: "opt-2", text: "Operation Paperclip", isCorrect: false },
      { id: "opt-3", text: "The Apollo Program", isCorrect: false },
      { id: "opt-4", text: "Project Blue Book", isCorrect: false }
    ],
    explanation: "Oppenheimer, often hailed as the 'Father of the Atomic Bomb', directed the Los Alamos laboratory that developed the world's first nuclear weapons, culminated in the Trinity test in the New Mexico desert on July 16, 1945.",
    tags: ["super-scientists-inventors", "scientists", "history", "nuclear-physics"]
  },
  {
    id: "q-scientist-085",
    title: "Enrico Fermi achieved the world's first controlled, self-sustaining nuclear chain reaction in December 1942 inside which reactor built beneath a university stadium?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Modern Physics & Quantum Theory", "History Time Machine"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Chicago Pile-1 (CP-1)", isCorrect: true },
      { id: "opt-2", text: "Oak Ridge X-10 Graphite Reactor", isCorrect: false },
      { id: "opt-3", text: "Hanford B Reactor", isCorrect: false },
      { id: "opt-4", text: "Los Alamos Omega West Pile", isCorrect: false }
    ],
    explanation: "Enrico Fermi engineered Chicago Pile-1 using natural uranium fuel pellets encased in a massive lattice of graphite moderator blocks beneath the Stagg Field stands at the University of Chicago, ushering in the Atomic Age.",
    tags: ["super-scientists-inventors", "scientists", "inventions", "nuclear-physics", "history"]
  },
  {
    id: "q-scientist-086",
    title: "Theoretical physicist Stephen Hawking mathematically demonstrated that black holes are not completely black, but emit thermal radiation due to:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Space Explorers", "Modern Physics & Quantum Theory"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Quantum particle-antiparticle vacuum fluctuations near the event horizon", isCorrect: true },
      { id: "opt-2", text: "Centrifugal accretion disc plasma collisions at relativistic speeds", isCorrect: false },
      { id: "opt-3", text: "Thermonuclear fusion reactions within the central singularity", isCorrect: false },
      { id: "opt-4", text: "Decay of dark matter WIMPs within the surrounding ergosphere", isCorrect: false }
    ],
    explanation: "In 1974, Hawking showed that quantum virtual particle pairs near a black hole's event horizon can separate—one falling into the black hole while the other escapes—causing the black hole to slowly emit 'Hawking radiation' and evaporate.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "black-holes", "astrophysics"]
  },
  {
    id: "q-scientist-087",
    title: "English biophysicist Rosalind Franklin captured which historic X-ray diffraction photograph that provided crucial evidence for the helical structure of DNA?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Genetics & Molecular Biology", "Biochemistry & Polymers"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Photo 51", isCorrect: true },
      { id: "opt-2", text: "Plate 7B", isCorrect: false },
      { id: "opt-3", text: "Diagram 42", isCorrect: false },
      { id: "opt-4", text: "Diffraction 101", isCorrect: false }
    ],
    explanation: "At King's College London in May 1952, Rosalind Franklin and PhD student Raymond Gosling obtained 'Photo 51', an exceptionally clear X-ray diffraction pattern of hydrated B-DNA whose distinct 'X' shape proved the double-helix geometry.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "genetics", "crystallography"]
  },
  {
    id: "q-scientist-088",
    title: "Which charismatic astronomer hosted the acclaimed 1980 television series 'Cosmos: A Personal Voyage' and spearheaded the Voyager Golden Record message to deep space?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Space Explorers", "Science & Technology Milestones"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Carl Sagan", isCorrect: true },
      { id: "opt-2", text: "Neil deGrasse Tyson", isCorrect: false },
      { id: "opt-3", text: "Frank Drake", isCorrect: false },
      { id: "opt-4", text: "Edwin Hubble", isCorrect: false }
    ],
    explanation: "Dr. Carl Sagan popularized astronomy and planetary science through his book and series 'Cosmos'. He confirmed Venus's greenhouse effect, proposed liquid oceans on Europa, and chaired the committee that created the Voyager Golden Record.",
    tags: ["super-scientists-inventors", "scientists", "astronomy", "space"]
  },
  {
    id: "q-scientist-089",
    title: "British primatologist Dame Jane Goodall revolutionized our understanding of animal behavior through her 60-year study of wild chimpanzees at Gombe Stream, documenting that:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Animal Encyclopedia", "Living World Explorers"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Chimpanzees manufacture and use tools (stripping twigs to fish for termites)", isCorrect: true },
      { id: "opt-2", text: "Chimpanzees possess fully articulated vocal syntactical speech", isCorrect: false },
      { id: "opt-3", text: "Chimpanzees migrate annually across desert biomes using celestial navigation", isCorrect: false },
      { id: "opt-4", text: "Chimpanzees rely exclusively on a symbiotic bacterial digestive diet", isCorrect: false }
    ],
    explanation: "In 1960, Jane Goodall observed chimpanzee David Greybeard strip leaves off twigs to probe termite mounds, shattering the scientific orthodoxy that humans were the only tool-making animals. Louis Leakey famously remarked: 'Now we must redefine man, redefine tool, or accept chimpanzees as humans.'",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "zoology", "primatology"]
  },
  {
    id: "q-scientist-090",
    title: "American agricultural scientist George Washington Carver transformed Southern agriculture by promoting crop rotation with nitrogen-fixing peanuts and developing:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Living World Explorers", "Science & Technology Milestones"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Over 300 commercial food, cosmetic, and industrial products from peanuts", isCorrect: true },
      { id: "opt-2", text: "Synthetic chemical organophosphate insecticides", isCorrect: false },
      { id: "opt-3", text: "Genetically modified hybrid high-fructose corn syrup", isCorrect: false },
      { id: "opt-4", text: "Mechanical hydraulic combines for harvesting wheat", isCorrect: false }
    ],
    explanation: "At the Tuskegee Institute, Carver urged farmers to plant legumes like peanuts and sweet potatoes to restore nitrogen depleted by repetitive cotton planting, and invented hundreds of uses (dyes, plastics, cosmetics, oils) to create market demand.",
    tags: ["super-scientists-inventors", "scientists", "inventors", "agriculture", "botany"]
  },
  {
    id: "q-scientist-091",
    title: "Marine biologist Rachel Carson ignited the modern global environmental movement in 1962 with which landmark book warning against synthetic pesticides like DDT?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Environmental Ecology & Conservation", "Literature, Awards & Culture"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Silent Spring", isCorrect: true },
      { id: "opt-2", text: "The Sea Around Us", isCorrect: false },
      { id: "opt-3", text: "Under the Sea-Wind", isCorrect: false },
      { id: "opt-4", text: "Our Stolen Future", isCorrect: false }
    ],
    explanation: "Rachel Carson's 'Silent Spring' meticulously documented how indiscriminately sprayed synthetic pesticides (especially DDT) bioaccumulate in food chains, thinning bird eggshells and poisoning ecosystems, leading to the establishment of the US EPA.",
    tags: ["super-scientists-inventors", "scientists", "ecology", "environment", "books"]
  },
  {
    id: "q-scientist-092",
    title: "American geneticist Barbara McClintock was awarded the 1983 Nobel Prize in Physiology or Medicine for her discovery of mobile genetic elements in maize, known as:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Genetics & Molecular Biology", "Cell Biology & Microbiology"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Transposons ('jumping genes')", isCorrect: true },
      { id: "opt-2", text: "Ribozymes (catalytic RNA strands)", isCorrect: false },
      { id: "opt-3", text: "Okazaki fragments in lagging DNA strands", isCorrect: false },
      { id: "opt-4", text: "Histone protein acetylating complexes", isCorrect: false }
    ],
    explanation: "Through decades of meticulous cytogenetic breeding of Indian corn (maize), McClintock proved that genetic elements (transposons) can change position within the genome, turning adjacent genes on or off, decades before molecular biology caught up.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "nobel-prize", "genetics"]
  },
  {
    id: "q-scientist-093",
    title: "American mathematician Claude Shannon is recognized as the 'Father of Information Theory' for his 1948 landmark paper that quantified data using:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Computer Science & AI", "Number Theory & Discrete Math"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Information entropy and the fundamental binary unit 'bit'", isCorrect: true },
      { id: "opt-2", text: "Turing computable decision algorithms", isCorrect: false },
      { id: "opt-3", text: "Quantum entanglement Bell inequalities", isCorrect: false },
      { id: "opt-4", text: "Relativistic spacetime packet tensors", isCorrect: false }
    ],
    explanation: "Claude Shannon's 'A Mathematical Theory of Communication' introduced information entropy, proved the noisy-channel coding theorem, and established the binary digit ('bit') as the fundamental universal measure of data.",
    tags: ["super-scientists-inventors", "scientists", "computer-science", "information-theory", "mathematics"]
  },
  {
    id: "q-scientist-094",
    title: "Which legendary computer scientist created the C programming language and co-developed the Unix operating system at Bell Labs?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Computer Science & AI", "Science & Technology Milestones"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Dennis Ritchie", isCorrect: true },
      { id: "opt-2", text: "Bjarne Stroustrup", isCorrect: false },
      { id: "opt-3", text: "Linus Torvalds", isCorrect: false },
      { id: "opt-4", text: "Ken Thompson", isCorrect: false }
    ],
    explanation: "Dennis Ritchie developed the C programming language between 1969 and 1973 and rewrote the Unix kernel in C with Ken Thompson, laying the foundation for modern systems programming, Linux, macOS, Android, and Windows.",
    tags: ["super-scientists-inventors", "scientists", "inventors", "computer-science", "programming"]
  },
  {
    id: "q-scientist-095",
    title: "American chemist Stephanie Kwolek invented which bullet-resistant synthetic aramid polymer fiber five times stronger than steel at DuPont in 1965?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Biochemistry & Polymers", "Chemical Sciences"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Kevlar (poly-paraphenylene terephthalamide)", isCorrect: true },
      { id: "opt-2", text: "Nylon-6,6 polyamide", isCorrect: false },
      { id: "opt-3", text: "Teflon (polytetrafluoroethylene)", isCorrect: false },
      { id: "opt-4", text: "Dacron polyester fiber", isCorrect: false }
    ],
    explanation: "Stephanie Kwolek formulated a liquid-crystalline poly-paraphenylene terephthalamide solution that could be spun into fibers with exceptional tensile strength and modulus, trademarked as Kevlar, utilized in body armor and aerospace composites.",
    tags: ["super-scientists-inventors", "scientists", "inventors", "polymers", "chemistry"]
  },
  {
    id: "q-scientist-096",
    title: "Chinese pharmaceutical chemist Tu Youyou received the 2015 Nobel Prize in Physiology or Medicine for discovering artemisinin, a breakthrough therapy against:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Human Body Heroes", "Cell Biology & Microbiology"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Malaria (Plasmodium falciparum parasite)", isCorrect: true },
      { id: "opt-2", text: "Tuberculosis (Mycobacterium tuberculosis)", isCorrect: false },
      { id: "opt-3", text: "Dengue hemorrhagic fever virus", isCorrect: false },
      { id: "opt-4", text: "Schistosomiasis parasitic flatworms", isCorrect: false }
    ],
    explanation: "Tu Youyou combed through ancient Chinese medical texts, discovering that low-temperature ether extraction of sweet wormwood (Artemisia annua) yielded artemisinin, which became the world's most potent antimalarial agent, saving millions of lives.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "nobel-prize", "medicine"]
  },
  {
    id: "q-scientist-097",
    title: "Rainer Weiss, Barry Barish, and Kip Thorne were awarded the 2017 Nobel Prize in Physics for decisive contributions to the LIGO detector and the first observation of:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Modern Physics & Quantum Theory", "Space Explorers"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Gravitational waves emitted by colliding binary black holes", isCorrect: true },
      { id: "opt-2", text: "The Higgs boson scalar excitation field at CERN", isCorrect: false },
      { id: "opt-3", text: "Cosmic microwave background acoustic oscillations", isCorrect: false },
      { id: "opt-4", text: "High-energy cosmic neutrino bursts from blazar TXS 0506", isCorrect: false }
    ],
    explanation: "On September 14, 2015, the twin LIGO laser interferometers detected gravitational waves (GW150914) from the merger of two black holes 1.3 billion light-years away, confirming Albert Einstein's 100-year-old General Relativity prediction.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "nobel-prize", "physics", "astronomy"]
  },
  {
    id: "q-scientist-098",
    title: "British mathematical physicist Sir Roger Penrose was awarded the 2020 Nobel Prize in Physics for mathematically proving that:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Space Explorers", "Modern Physics & Quantum Theory"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Black hole formation is a robust prediction of the General Theory of Relativity", isCorrect: true },
      { id: "opt-2", text: "The universe's expansion is accelerating driven by dark energy", isCorrect: false },
      { id: "opt-3", text: "Neutrinos oscillate between flavors and possess non-zero mass", isCorrect: false },
      { id: "opt-4", text: "Superstring compactification occurs exclusively in 11 dimensions", isCorrect: false }
    ],
    explanation: "In 1965, Roger Penrose developed the mathematical concept of 'trapped surfaces' to prove that gravitational collapse inevitably leads to a physical spacetime singularity, demonstrating black holes are natural features of Einstein's relativity.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "nobel-prize", "physics", "relativity"]
  },
  {
    id: "q-scientist-099",
    title: "Chinese-American experimental physicist Chien-Shiung Wu, known as the 'First Lady of Physics', famously conducted the 1956 Wu Experiment that proved:",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Modern Physics & Quantum Theory", "Physical Sciences"],
    difficulty: "hard",
    options: [
      { id: "opt-1", text: "The violation of parity conservation in weak nuclear beta decay", isCorrect: true },
      { id: "opt-2", text: "The existence of neutral strange kaon meson oscillations", isCorrect: false },
      { id: "opt-3", text: "The quantization of electric charge on falling oil droplets", isCorrect: false },
      { id: "opt-4", text: "The non-existence of magnetic monopoles in cosmic radiation", isCorrect: false }
    ],
    explanation: "Using supercooled Cobalt-60 atoms at the National Bureau of Standards, Dr. C. S. Wu demonstrated that beta particles were emitted preferentially in the direction opposite to the nuclear spin, proving nature distinguishes left from right in weak interactions.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "physics", "nuclear-physics"]
  },
  {
    id: "q-scientist-100",
    title: "Which Austrian-Swedish nuclear physicist provided the theoretical explanation of nuclear fission alongside Otto Frisch, but was unjustly overlooked by the Nobel Committee?",
    subject: "General Awareness & Logic",
    topic: "Super Scientists & Inventors",
    topics: ["Super Scientists & Inventors", "Modern Physics & Quantum Theory", "Physical Sciences"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Lise Meitner", isCorrect: true },
      { id: "opt-2", text: "Marie Curie", isCorrect: false },
      { id: "opt-3", text: "Irène Joliot-Curie", isCorrect: false },
      { id: "opt-4", text: "Maria Goeppert Mayer", isCorrect: false }
    ],
    explanation: "Lise Meitner and Otto Frisch interpreted Otto Hahn's bombarding of uranium with neutrons, realizing the uranium nucleus had split into barium and krypton, coining the term 'fission'. Element 109, Meitnerium (Mt), is named in her honor.",
    tags: ["super-scientists-inventors", "scientists", "discoveries", "nuclear-physics", "physics"]
  }
];

module.exports = { scientistsQuestions };
