// 100 Comprehensive Questions for "Living World Explorers"
// Subject: Life Sciences & Health
// Subtopics: Plants (15), Animals (15), Habitats (15), Food Chains (15), Life Cycles (15), Adaptations (15), Classification (10)

module.exports = [
  // ==========================================
  // SECTION 1: PLANTS (Questions 1 to 15)
  // ==========================================
  {
    title: "In vascular plants, which specialized tissue is responsible for transporting water and dissolved inorganic minerals upward from roots to leaves?",
    difficulty: "Easy",
    options: [
      { text: "Xylem (composed of tracheids and vessel elements)", isCorrect: true, explanation: "Xylem conducts water and soil minerals unidirectionally upward driven by transpirational pull and root pressure." },
      { text: "Phloem", isCorrect: false, explanation: "Phloem transports organic nutrients (sucrose) bidirectionally via translocation." },
      { text: "Cambium", isCorrect: false, explanation: "Vascular cambium is lateral meristematic tissue responsible for secondary growth (wood and bark)." },
      { text: "Collenchyma", isCorrect: false, explanation: "Collenchyma provides mechanical structural support in young growing stems and petioles." }
    ],
    explanation: "Xylem vessels form continuous non-living capillary conduits utilizing cohesion and adhesion of water molecules during transpirational pull.",
    tags: ["living-world", "plants", "botany", "xylem", "vascular-plants", "life-sciences-health"]
  },
  {
    title: "Why do plant leaves appear green to human eyes during the peak of the growing season?",
    difficulty: "Easy",
    options: [
      { text: "Chlorophyll pigments absorb blue and red wavelengths of light while reflecting green light", isCorrect: true, explanation: "Chlorophyll a and b absorb photon energy strongly in the blue (430-450 nm) and red (640-660 nm) spectral regions, transmitting and reflecting unabsorbed green light (500-550 nm)." },
      { text: "Chlorophyll actively generates green light through bioluminescence", isCorrect: false, explanation: "Chlorophyll does not emit green light; it reflects ambient green wavelengths." },
      { text: "Plant cell walls are composed of green cellulose crystals", isCorrect: false, explanation: "Cellulose is colorless and transparent." },
      { text: "Carotenoid pigments destroy all blue and violet sunlight", isCorrect: false, explanation: "Carotenoids absorb blue-green light and appear yellow, orange, or red." }
    ],
    explanation: "Green light is least absorbed by photosynthetic pigments, so it bounces off leaves into our eyes.",
    tags: ["living-world", "plants", "photosynthesis", "chlorophyll", "botany", "life-sciences-health"]
  },
  {
    title: "How do guard cells regulate the opening and closing of microscopic stomata on the underside of plant leaves?",
    difficulty: "Medium",
    options: [
      { text: "By pumping in potassium ions (K+), which draws in water via osmosis, causing the guard cells to swell and bow outward into an open pore", isCorrect: true, explanation: "Active influx of K+ lowers water potential, causing water to rush in; turgid guard cells with thickened inner cell walls curve outward to open the stomatal aperture." },
      { text: "By releasing pressurized oxygen gas bubbles that mechanically force the stomata open", isCorrect: false, explanation: "Stomatal mechanics are driven by ion-mediated osmotic turgor pressure, not gas bubbles." },
      { text: "By shedding epidermal skin cells whenever sunlight is detected", isCorrect: false, explanation: "Guard cells remain permanently positioned surrounding each stoma." },
      { text: "By contracting microscopic actin-myosin muscle fibers identical to animal sphincters", isCorrect: false, explanation: "Plants lack animal muscle fibers; movement is driven by osmotic turgor changes." }
    ],
    explanation: "When water is scarce, potassium exits the guard cells, water follows by osmosis, and the flaccid cells close the pore to prevent desiccation.",
    tags: ["living-world", "plants", "stomata", "transpiration", "botany", "life-sciences-health"]
  },
  {
    title: "Gymnosperms (such as pines, spruces, and cedars) differ fundamentally from angiosperms because:",
    difficulty: "Medium",
    options: [
      { text: "They produce 'naked seeds' on woody cone scales rather than seeds enclosed within a protective ovary or fruit", isCorrect: true, explanation: "The Greek root 'gymnos' means naked and 'sperma' means seed; gymnosperm ovules develop exposed on megasporophyll cones rather than enclosed in carpels." },
      { text: "They lack vascular xylem and phloem tissues entirely", isCorrect: false, explanation: "Gymnosperms are vascular plants possessing tracheid-based xylem and phloem." },
      { text: "They reproduce exclusively through microscopic asexual budding", isCorrect: false, explanation: "They reproduce sexually via pollen grains and ovules in specialized cones." },
      { text: "They do not perform photosynthesis and rely on fungal parasitism", isCorrect: false, explanation: "Conifers are dominant photoautotrophic forest canopy trees." }
    ],
    explanation: "Angiosperms enclose their seeds within ovaries that ripen into fruit; gymnosperms bear exposed seeds on cones.",
    tags: ["living-world", "plants", "gymnosperms", "angiosperms", "botany", "classification"]
  },
  {
    title: "Which of the following is an anatomical characteristic typical of monocotyledonous (monocot) flowering plants?",
    difficulty: "Medium",
    options: [
      { text: "Leaves with parallel veins, fibrous root systems, and flower parts in multiples of three", isCorrect: true, explanation: "Monocots (such as grasses, lilies, corn, and orchids) possess a single embryonic cotyledon, parallel leaf venation, scattered stem vascular bundles, and trimerous flowers." },
      { text: "Leaves with net-like reticulate veins and a deep central taproot system", isCorrect: false, explanation: "Reticulate venation and taproots are hallmarks of eudicots (dicots)." },
      { text: "Two embryonic cotyledon leaves within each germinating seed", isCorrect: false, explanation: "Two cotyledons define dicots (dicotyledons)." },
      { text: "Floral organs organized exclusively in multiples of four or five", isCorrect: false, explanation: "Multiples of four or five characterize dicot flowers." }
    ],
    explanation: "Monocots have one cotyledon, parallel venation, fibrous roots, and 3-merous floral symmetry.",
    tags: ["living-world", "plants", "monocots", "dicots", "botany", "classification"]
  },
  {
    title: "Why do carnivorous plants like the Venus flytrap (Dionaea muscipula) and pitcher plants capture and digest insects?",
    difficulty: "Easy",
    options: [
      { text: "To obtain essential nitrogen and phosphorus compounds absent in their acidic, nutrient-deficient bog soils", isCorrect: true, explanation: "Carnivorous plants are photosynthetic green autotrophs; they trap insects not for energy/calories, but as mineral fertilizer supplements in waterlogged soils lacking bioavailable nitrogen." },
      { text: "Because they lack chlorophyll and cannot perform photosynthetic sugar synthesis", isCorrect: false, explanation: "They possess green leaves and carry out normal photosynthesis." },
      { text: "To extract liquid water from animal blood during desert droughts", isCorrect: false, explanation: "Carnivorous plants dwell primarily in waterlogged swamps and bogs, not arid deserts." },
      { text: "To prevent herbivorous caterpillars from eating their root structures", isCorrect: false, explanation: "They digest prey to assimilate nitrogenous amino acids and phosphate." }
    ],
    explanation: "Carnivory in plants evolved as an adaptation to nutrient-starved bogs where nitrogen is locked away by cold, acidic, anaerobic conditions.",
    tags: ["living-world", "plants", "carnivorous-plants", "adaptation", "ecology", "botany"]
  },
  {
    title: "Dandelion seeds and maple samara 'helicopters' are adapted for which mode of seed dispersal?",
    difficulty: "Easy",
    options: [
      { text: "Anemochory (wind dispersal)", isCorrect: true, explanation: "Anemochorous seeds develop lightweight feathery pappus hairs (dandelions) or aerodynamic winged samaras (maples) that catch air currents to travel far from the parent plant." },
      { text: "Zoochory (animal dispersal)", isCorrect: false, explanation: "Zoochory uses hooks, burrs, or delicious edible fruits." },
      { text: "Hydrochory (water dispersal)", isCorrect: false, explanation: "Hydrochory uses buoyant, fibrous husks (e.g., coconuts, water lilies)." },
      { text: "Autochory (ballistic explosive dispersal)", isCorrect: false, explanation: "Autochory involves explosive pod dehiscence (e.g., witch hazel, touch-me-not)." }
    ],
    explanation: "Aerodynamic adaptations enable dandelion parachutes to drift kilometers on thermal updrafts.",
    tags: ["living-world", "plants", "seed-dispersal", "adaptation", "botany", "life-sciences-health"]
  },
  {
    title: "A sunflower bending toward sunlight as the sun tracks across the sky is an example of which biological response?",
    difficulty: "Easy",
    options: [
      { text: "Heliotropism (positive phototropism governed by auxin redistribution)", isCorrect: true, explanation: "The plant hormone auxin accumulates on the shaded side of the stem, stimulating cellular elongation and bending the growing stem toward light." },
      { text: "Negative geotropism", isCorrect: false, explanation: "Negative geotropism is upward growth away from the center of Earth's gravity." },
      { text: "Thigmotropism", isCorrect: false, explanation: "Thigmotropism is directional growth in response to physical touch (e.g., vine tendrils coiling around a trellis)." },
      { text: "Hydrotropism", isCorrect: false, explanation: "Hydrotropism is directional root growth toward moisture gradients in soil." }
    ],
    explanation: "Asymmetrical auxin accumulation on the shaded flank causes differential cell elongation, steering shoots toward the sun.",
    tags: ["living-world", "plants", "phototropism", "auxin", "botany", "life-sciences-health"]
  },
  {
    title: "Bryophytes (such as liverworts, hornworts, and mosses) are restricted to damp microhabitats primarily because:",
    difficulty: "Medium",
    options: [
      { text: "They lack true vascular tissues (xylem and phloem) and require a film of external water for flagellated sperm to swim to eggs", isCorrect: true, explanation: "Non-vascular bryophytes absorb water directly via diffusion and osmosis; their motile antherozoids must swim through water droplets to reach the archegonium for fertilization." },
      { text: "They are obligate aquatic seaweeds that dissolve in dry air", isCorrect: false, explanation: "Mosses are terrestrial land plants, though dependent on moisture." },
      { text: "Their roots produce poisonous acids that catch fire in dry heat", isCorrect: false, explanation: "Bryophytes lack true roots entirely, using simple rhizoids for anchoring." },
      { text: "They cannot tolerate atmospheric oxygen", isCorrect: false, explanation: "Bryophytes are aerobic photosynthetic organisms." }
    ],
    explanation: "Lacking lignified vascular pipelines and requiring moisture for flagellated sperm, bryophytes cannot grow tall and depend on damp environments.",
    tags: ["living-world", "plants", "bryophytes", "mosses", "botany", "classification"]
  },
  {
    title: "Which organelle inside plant mesophyll cells houses the thylakoid membranes where the light reactions of photosynthesis take place?",
    difficulty: "Easy",
    options: [
      { text: "Chloroplast", isCorrect: true, explanation: "Chloroplasts contain stacked thylakoids (grana) embedded in stroma, hosting photosystems I and II and ATP synthase." },
      { text: "Mitochondrion", isCorrect: false, explanation: "Mitochondria carry out cellular respiration and Krebs cycle ATP synthesis." },
      { text: "Endoplasmic reticulum", isCorrect: false, explanation: "ER synthesizes proteins and lipids." },
      { text: "Vacuole", isCorrect: false, explanation: "The central vacuole maintains turgor pressure and stores water and waste." }
    ],
    explanation: "Chloroplasts are endosymbiotic double-membraned organelles where light energy converts water and $CO_2$ into chemical sugars.",
    tags: ["living-world", "plants", "cell-biology", "chloroplast", "photosynthesis", "life-sciences-health"]
  },
  {
    title: "What is the primary function of the root cap (calyptra) located at the very apex of a growing plant root?",
    difficulty: "Medium",
    options: [
      { text: "Protecting the delicate apical meristem as it pushes through soil and sensing gravity via statoliths", isCorrect: true, explanation: "The root cap secretes lubricating mucilage to reduce soil friction and contains starch-filled amyloplast statoliths that mediate gravitropism." },
      { text: "Absorbing over 90% of all water via root hairs", isCorrect: false, explanation: "Water absorption occurs higher up in the zone of maturation through microscopic root hairs." },
      { text: "Carrying out photosynthesis under subterranean conditions", isCorrect: false, explanation: "Roots are lightless subterranean organs that do not photosynthesize." },
      { text: "Producing floral buds for subterranean flowering", isCorrect: false, explanation: "Floral buds develop on aerial shoot axes." }
    ],
    explanation: "The root cap shields dividing meristematic cells and houses the graviperception machinery that tells roots to grow downward.",
    tags: ["living-world", "plants", "roots", "gravitropism", "botany", "life-sciences-health"]
  },
  {
    title: "Phloem translocation moves organic solutes (photosynthates) throughout a plant from 'sources' to 'sinks' via which mechanism?",
    difficulty: "Hard",
    options: [
      { text: "The Pressure-Flow Hypothesis (bulk flow driven by osmotic turgor pressure gradients between companion cells and sieve tubes)", isCorrect: true, explanation: "Active loading of sucrose at source leaves draws water in by osmosis, generating high hydrostatic pressure that drives sap toward lower-pressure sinks (roots, fruits)." },
      { text: "Negative transpirational tension identical to xylem sap pull", isCorrect: false, explanation: "Xylem operates under negative tension; phloem operates under positive hydrostatic pressure." },
      { text: "Simple passive diffusion through intercellular air spaces", isCorrect: false, explanation: "Diffusion is far too slow to move sugars meters along a tree trunk." },
      { text: "Capillary action between dead tracheid cell walls", isCorrect: false, explanation: "Phloem sieve tubes are living cells, unlike dead hollow xylem tracheids." }
    ],
    explanation: "Ernst Münch's pressure-flow model demonstrates that high osmotic pressure at sources drives bulk fluid movement to sinks.",
    tags: ["living-world", "plants", "phloem", "translocation", "botany", "life-sciences-health"]
  },
  {
    title: "Ferns (pteridophytes) reproduce and disperse using microscopic dust-like structures called:",
    difficulty: "Easy",
    options: [
      { text: "Spores (produced inside sori clusters on the underside of fronds)", isCorrect: true, explanation: "Ferns are seedless vascular plants; sporangia clustered in brown patches called sori produce haploid spores that germinate into heart-shaped prothalli." },
      { text: "Pollen grains", isCorrect: false, explanation: "Pollen is produced exclusively by seed-bearing gymnosperms and angiosperms." },
      { text: "Cotyledons", isCorrect: false, explanation: "Cotyledons are embryonic seed leaves found inside true seeds." },
      { text: "Cones", isCorrect: false, explanation: "Cones are reproductive structures of gymnosperms." }
    ],
    explanation: "Seedless vascular ferns alternate generations via haploid spores produced within specialized sporangia.",
    tags: ["living-world", "plants", "ferns", "spores", "botany", "life-cycles"]
  },
  {
    title: "In an angiosperm flower, which female reproductive structure receives pollen grains during pollination?",
    difficulty: "Easy",
    options: [
      { text: "Stigma", isCorrect: true, explanation: "The pistil (carpel) consists of the sticky stigma (which captures pollen), the style (neck tube), and the basal ovary (containing ovules)." },
      { text: "Anther", isCorrect: false, explanation: "The anther is the male organ that produces and sheds pollen." },
      { text: "Filament", isCorrect: false, explanation: "The filament is the slender stalk that supports the male anther." },
      { text: "Sepal", isCorrect: false, explanation: "Sepals are the outermost green leaf-like structures enclosing the flower bud." }
    ],
    explanation: "The sticky, receptive surface of the stigma traps pollen grains, stimulating pollen tube germination down the style.",
    tags: ["living-world", "plants", "flowers", "pollination", "botany", "life-sciences-health"]
  },
  {
    title: "Epiphytic plants, such as Spanish moss and many tropical orchids, grow upon tree branches in the canopy primarily to:",
    difficulty: "Medium",
    options: [
      { text: "Reach abundant sunlight in dense forest canopies without parasitizing the host tree's nutrients or water", isCorrect: true, explanation: "Epiphytes are harmless commensals; they use trees purely for physical mechanical support, absorbing moisture from humid air and rain through aerial roots." },
      { text: "Suck sap directly from the host tree's inner xylem conduits", isCorrect: false, explanation: "Parasitic plants like mistletoe tap host vessels using haustoria; true epiphytes are non-parasitic." },
      { text: "Smother the host tree's leaves so the tree collapses", isCorrect: false, explanation: "Strangler figs eventually encase trees, but typical epiphytic orchids do not smother hosts." },
      { text: "Burrow deep roots into the tree's heartwood to extract minerals", isCorrect: false, explanation: "Epiphytes have surface aerial roots that absorb moisture and dust from air." }
    ],
    explanation: "Epiphytism is a structural commensal adaptation that enables small herbaceous plants to access bright canopy sunlight.",
    tags: ["living-world", "plants", "epiphytes", "symbiosis", "adaptation", "ecology"]
  },

  // ==========================================
  // SECTION 2: ANIMALS (Questions 16 to 30)
  // ==========================================
  {
    title: "Approximately what percentage of all described animal species on Earth are classified as invertebrates (lacking a vertebral column)?",
    difficulty: "Easy",
    options: [
      { text: "95% to 97%", isCorrect: true, explanation: "The overwhelming majority of animal diversity consists of invertebrates, dominated by insects, crustaceans, arachnids, mollusks, and nematodes." },
      { text: "50%", isCorrect: false, explanation: "Vertebrates (mammals, birds, reptiles, amphibians, fish) account for only about 3-5% of animal species." },
      { text: "20%", isCorrect: false, explanation: "Invertebrates far outnumber vertebrates." },
      { text: "75%", isCorrect: false, explanation: "Invertebrates exceed 95% of total animal species richness." }
    ],
    explanation: "Vertebrates comprise only a tiny fraction (~65,000 species) of the roughly 1.5 million cataloged animal species.",
    tags: ["living-world", "animals", "invertebrates", "zoology", "biodiversity", "classification"]
  },
  {
    title: "Animals exhibiting bilateral symmetry (such as mammals, insects, and fish) possess which distinctive evolutionary advancement?",
    difficulty: "Medium",
    options: [
      { text: "Cephalization: the concentration of sensory organs and neural control centers at the anterior head end", isCorrect: true, explanation: "Bilateral symmetry facilitates directed forward movement, leading to cephalization where eyes, antennae, and brains cluster at the front." },
      { text: "A circular body plan that can be sliced along any infinite plane to produce identical halves", isCorrect: false, explanation: "That describes radial symmetry (e.g., jellyfish, sea anemones)." },
      { text: "An inability to move forward in a single direction", isCorrect: false, explanation: "Bilateral symmetry is the primary evolutionary driver of active forward locomotion." },
      { text: "Zero internal body cavities or organ systems", isCorrect: false, explanation: "Bilaterians are triploblastic and typically possess complex organ coeloms." }
    ],
    explanation: "Cephalization and bilateral symmetry evolved hand-in-hand to allow mobile predators and foragers to perceive environments head-first.",
    tags: ["living-world", "animals", "symmetry", "cephalization", "evolution", "zoology"]
  },
  {
    title: "How do ectothermic animals (such as reptiles and amphibians) primarily regulate their internal body temperature?",
    difficulty: "Easy",
    options: [
      { text: "Behaviorally, by basking in direct sunlight or retreating to shaded burrows and cool waters", isCorrect: true, explanation: "Ectotherms produce minimal metabolic heat and rely on environmental thermal sources to warm their muscles and speed enzymatic activity." },
      { text: "By burning specialized brown adipose fat tissue via internal non-shivering thermogenesis", isCorrect: false, explanation: "Endothermic mammals burn brown adipose tissue for metabolic heat." },
      { text: "Through continuous sweating from cutaneous dermal pores", isCorrect: false, explanation: "Reptiles lack sweat glands." },
      { text: "By accelerating their heartbeat to 500 beats per minute during freezing weather", isCorrect: false, explanation: "Cold slows reptile heart rates and metabolic rates drastically." }
    ],
    explanation: "Ectothermy uses behavioral thermoregulation, consuming 10-30 times less daily caloric energy than mammalian endothermy.",
    tags: ["living-world", "animals", "ectothermy", "thermoregulation", "adaptation", "zoology"]
  },
  {
    title: "Which animal phylum is characterized by a water vascular system, tube feet, and pentaradial symmetry in adult stages?",
    difficulty: "Medium",
    options: [
      { text: "Echinodermata (sea stars, sea urchins, sea cucumbers)", isCorrect: true, explanation: "Echinoderms possess a unique hydraulic water vascular system operating locomotive tube feet (podia) and display five-part radial symmetry as adults." },
      { text: "Cnidaria (jellyfish and corals)", isCorrect: false, explanation: "Cnidarians have stinging nematocysts and radial symmetry, but lack a water vascular system or tube feet." },
      { text: "Mollusca (snails, clams, octopuses)", isCorrect: false, explanation: "Mollusks possess a muscular foot, mantle, and radula, not a water vascular system." },
      { text: "Arthropoda (crabs, spiders, insects)", isCorrect: false, explanation: "Arthropods have chitinous jointed exoskeletons and bilateral symmetry." }
    ],
    explanation: "Echinoderm larvae are bilateral, but metamorphose into pentaradial adults with calcified endoskeletons and hydraulic tube feet.",
    tags: ["living-world", "animals", "echinodermata", "invertebrates", "zoology", "classification"]
  },
  {
    title: "Monotremes (the platypus and four species of echidna) hold what evolutionary status among mammals?",
    difficulty: "Easy",
    options: [
      { text: "They are the only surviving mammals that lay shelled eggs (oviparous) rather than giving birth to live young", isCorrect: true, explanation: "Monotremes possess fur and produce milk from mammary gland patches, but lay leathery eggs and possess a cloaca like reptiles." },
      { text: "They are the only mammals that lack fur and body hair entirely", isCorrect: false, explanation: "Echidnas have spiny hair and platypuses have dense waterproof fur." },
      { text: "They are cold-blooded invertebrates with an open hemolymph circulatory system", isCorrect: false, explanation: "They are warm-blooded vertebrate mammals with four-chambered hearts." },
      { text: "They possess avian beaks with true calcium phosphate bird teeth", isCorrect: false, explanation: "Their bill is a sensitive electroreceptive leathery structure without teeth in adults." }
    ],
    explanation: "Monotremes diverged early in mammalian evolution, retaining ancestral amniotic egg-laying while nourishing hatched young with milk.",
    tags: ["living-world", "animals", "mammals", "monotremes", "evolution", "zoology"]
  },
  {
    title: "All chordates (phylum Chordata), from lancelets to humans, share which four anatomical features at some stage in their embryological development?",
    difficulty: "Hard",
    options: [
      { text: "A notochord, a dorsal hollow nerve cord, pharyngeal gill slits/arches, and a post-anal tail", isCorrect: true, explanation: "These four synapomorphies define all chordate embryos, though some may become modified or reabsorbed in adult vertebrates." },
      { text: "An exoskeleton of chitin, compound eyes, radial symmetry, and an open heart", isCorrect: false, explanation: "These traits describe arthropods, not chordates." },
      { text: "A four-chambered heart, milk glands, feathers, and hollow pneumatic bones", isCorrect: false, explanation: "These are specialized traits of birds and mammals, not ancestral to all chordates." },
      { text: "A calcareous shell, a radula, a muscular foot, and a visceral mass", isCorrect: false, explanation: "These four characteristics define the phylum Mollusca." }
    ],
    explanation: "Every chordate develops a supportive notochord, dorsal hollow nerve cord, pharyngeal arches, and post-anal tail during embryonic life.",
    tags: ["living-world", "animals", "chordates", "embryology", "zoology", "classification"]
  },
  {
    title: "Amphibians are described as having a 'double life' primarily because:",
    difficulty: "Easy",
    options: [
      { text: "They typically begin life as aquatic gilled larvae before metamorphosing into terrestrial, lung-breathing adults", isCorrect: true, explanation: "The Greek word 'amphibios' means living a double life; frogs hatch as aquatic tadpoles with gills and transform into four-legged land animals." },
      { text: "They spend twelve hours of the day as reptiles and twelve hours as fish", isCorrect: false, explanation: "Amphibians are a distinct vertebrate class (Amphibia), not alternating taxonomic groups." },
      { text: "They reproduce asexually in summer and sexually in winter", isCorrect: false, explanation: "Almost all amphibians reproduce sexually via external or internal fertilization." },
      { text: "They can survive in outer space without oxygen", isCorrect: false, explanation: "Amphibians require oxygen and moisture." }
    ],
    explanation: "Their life cycle transitions from aquatic gill-breathing tadpoles to terrestrial lung-and-skin breathing adults.",
    tags: ["living-world", "animals", "amphibians", "life-cycles", "metamorphosis", "zoology"]
  },
  {
    title: "Sponges (phylum Porifera) represent the simplest multicellular animals because they lack:",
    difficulty: "Medium",
    options: [
      { text: "True tissues, organs, nerves, and symmetry", isCorrect: true, explanation: "Poriferans are parazoans; their bodies consist of specialized cellular aggregations (choanocytes, amoebocytes) around water canals without true germ layers or nervous systems." },
      { text: "Cell membranes and DNA molecules", isCorrect: false, explanation: "All eukaryotic animals possess cell membranes and DNA." },
      { text: "The ability to consume food particles from water", isCorrect: false, explanation: "Sponges are active filter feeders utilizing choanocyte flagella to ingest bacteria." },
      { text: "Multicellular somatic organization", isCorrect: false, explanation: "Sponges are multicellular animals (metazoans)." }
    ],
    explanation: "Poriferans operate at the cellular grade of construction without true tissues, muscle, or nerve cells.",
    tags: ["living-world", "animals", "porifera", "sponges", "invertebrates", "classification"]
  },
  {
    title: "Which phylum is the most species-rich in the animal kingdom, accounting for over 80% of all described animal life?",
    difficulty: "Easy",
    options: [
      { text: "Arthropoda (insects, arachnids, crustaceans, myriapods)", isCorrect: true, explanation: "With over 1.2 million cataloged species, arthropods dominate terrestrial and aquatic habitats due to their chitinous exoskeletons and jointed appendages." },
      { text: "Mollusca", isCorrect: false, explanation: "Mollusks are second in diversity (~85,000 species), far behind arthropods." },
      { text: "Chordata", isCorrect: false, explanation: "Chordates account for around 65,000 species." },
      { text: "Annelida", isCorrect: false, explanation: "Segmented worms comprise about 22,000 species." }
    ],
    explanation: "Insects alone represent more than half of all known living species on Earth, driving arthropod evolutionary dominance.",
    tags: ["living-world", "animals", "arthropoda", "invertebrates", "biodiversity", "classification"]
  },
  {
    title: "Marsupials (such as kangaroos, koalas, and opossums) differ from placental mammals by:",
    difficulty: "Easy",
    options: [
      { text: "Giving birth to altricial, embryonic young that crawl into an external abdominal pouch (marsupium) to nurse and develop", isCorrect: true, explanation: "Marsupial embryos have very brief intrauterine gestations, completing their development clamped onto a nipple inside the mother's pouch." },
      { text: "Laying calcified hard-shelled eggs identical to chickens", isCorrect: false, explanation: "Only monotremes lay eggs; marsupials give live birth to tiny embryonic young." },
      { text: "Having feathers instead of hair or fur", isCorrect: false, explanation: "All mammals possess hair at some stage of life." },
      { text: "Lacking vertebrate backbones", isCorrect: false, explanation: "All mammals are vertebrates within Chordata." }
    ],
    explanation: "Marsupials have short gestations followed by prolonged lactation inside a maternal pouch.",
    tags: ["living-world", "animals", "marsupials", "mammals", "reproduction", "zoology"]
  },
  {
    title: "Cnidarians (jellyfish, sea anemones, and corals) capture prey and deter predators using specialized stinging organelles called:",
    difficulty: "Medium",
    options: [
      { text: "Nematocysts (contained within cnidocyte cells)", isCorrect: true, explanation: "Nematocysts are microscopic coiled capsules that discharge a venomous barbed thread in microseconds when a hair-like trigger (cnidocil) is touched." },
      { text: "Choanocytes", isCorrect: false, explanation: "Choanocytes are collar cells found in sponges for filter feeding." },
      { text: "Radulae", isCorrect: false, explanation: "The radula is a toothed chitinous ribbon used by mollusks to scrape food." },
      { text: "Pedicellariae", isCorrect: false, explanation: "Pedicellariae are tiny defensive pincers on the surface of starfish and sea urchins." }
    ],
    explanation: "The firing of a nematocyst is one of the fastest mechanical cellular events in biology, accelerating at 40,000 g.",
    tags: ["living-world", "animals", "cnidaria", "nematocysts", "marine-life", "invertebrates"]
  },
  {
    title: "Earthworms and leeches belong to the phylum Annelida, distinguished by what morphological feature?",
    difficulty: "Medium",
    options: [
      { text: "True metameric segmentation: bodies divided into repeated identical segments internally separated by septa", isCorrect: true, explanation: "Annelids possess a coelom partitioned into segments, closed circulatory systems, and coordinating ventral nerve cords." },
      { text: "Jointed calcified walking legs and compound eyes", isCorrect: false, explanation: "Arthropods possess jointed legs and compound eyes." },
      { text: "A dorsal shell of calcium carbonate secreted by a mantle", isCorrect: false, explanation: "Shells secreted by mantles characterize mollusks." },
      { text: "Radial symmetry without left or right sides", isCorrect: false, explanation: "Annelids exhibit bilateral symmetry." }
    ],
    explanation: "Metamerism allows independent hydrostatic pressure control in each segment, enabling peristaltic burrowing through soil.",
    tags: ["living-world", "animals", "annelids", "invertebrates", "segmentation", "zoology"]
  },
  {
    title: "What is the primary evolutionary function of the amniotic egg, developed by ancestral reptiles?",
    difficulty: "Hard",
    options: [
      { text: "Freeing tetrapod reproduction from dependence on bodies of water by enclosing the embryo in its own self-contained fluid-filled sac (amnion)", isCorrect: true, explanation: "With protective membranes (amnion, chorion, allantois, yolk sac) and a porous shell, amniotes conquered dry land without needing aquatic egg-laying." },
      { text: "Allowing embryos to photosynthesize inside the shell", isCorrect: false, explanation: "Embryos respire through egg membranes using stored yolk nutrients, not photosynthesis." },
      { text: "Preventing predators from breaking the shell with teeth", isCorrect: false, explanation: "Shells resist desiccation, though many predators can still consume them." },
      { text: "Eliminating the need for male fertilization", isCorrect: false, explanation: "Amniotic eggs require internal fertilization before shell secretion." }
    ],
    explanation: "The amnion cushioned the embryo in private aquatic fluid, allowing reptiles, birds, and mammals to radiate across dry continents.",
    tags: ["living-world", "animals", "amniotes", "evolution", "reproduction", "zoology"]
  },
  {
    title: "Cartilaginous fishes (class Chondrichthyes, comprising sharks, rays, and chimaeras) differ from bony fishes (Osteichthyes) because:",
    difficulty: "Easy",
    options: [
      { text: "Their internal skeletons are made entirely of flexible cartilage rather than true mineralized bone", isCorrect: true, explanation: "Sharks and rays lack bony skeletons and swim bladders, relying on squalene-rich oily livers for buoyancy and placoid scales for hydrodynamics." },
      { text: "They lack hearts and blood vessels", isCorrect: false, explanation: "They possess two-chambered hearts and closed circulatory systems." },
      { text: "They cannot breathe underwater and must surface for air", isCorrect: false, explanation: "They breathe underwater using 5 to 7 pairs of gill slits." },
      { text: "They reproduce exclusively by parthenogenesis", isCorrect: false, explanation: "They reproduce primarily sexually through internal fertilization via male claspers." }
    ],
    explanation: "Chondrichthyes maintain cartilaginous endoskeletons, exposed gill slits (lacking an opercular cover in sharks), and denticle dermal placoid scales.",
    tags: ["living-world", "animals", "sharks", "chondrichthyes", "marine-life", "zoology"]
  },
  {
    title: "Cephalopods (octopuses, squids, and cuttlefish) display the most advanced nervous systems among invertebrates, highlighted by:",
    difficulty: "Medium",
    options: [
      { text: "Large centralized brains, high learning capability, camera-type eyes, and distributed neural processing in arms", isCorrect: true, explanation: "Two-thirds of an octopus's neurons reside in its flexible arms, allowing them to taste, explore, and manipulate objects semi-independently." },
      { text: "A hard external skeleton identical to horseshoe crabs", isCorrect: false, explanation: "Most modern cephalopods have reduced internal shells (pen or cuttlebone) or none at all." },
      { text: "Strict herbivorous filter-feeding lifestyles", isCorrect: false, explanation: "All cephalopods are active, carnivorous marine predators." },
      { text: "Zero sensory receptors on their tentacles", isCorrect: false, explanation: "Suckers are densely packed with mechanoreceptors and chemoreceptors." }
    ],
    explanation: "Cephalopods exhibit convergent evolution with vertebrates, possessing complex lenses, retinas, problem-solving memory, and communication via skin patterns.",
    tags: ["living-world", "animals", "cephalopods", "nervous-system", "invertebrates", "zoology"]
  },

  // ==========================================
  // SECTION 3: HABITATS & BIOMES (Questions 31 to 45)
  // ==========================================
  {
    title: "Tropical rainforests cover less than 7% of Earth's land surface, yet they contain what fraction of global terrestrial plant and animal species?",
    difficulty: "Easy",
    options: [
      { text: "Over 50% of all terrestrial species", isCorrect: true, explanation: "Due to warm year-round temperatures, abundant rainfall, and complex multi-layered vertical forest canopies, rainforests are biodiversity epicenters." },
      { text: "Approximately 10%", isCorrect: false, explanation: "Far higher than 10%; rainforests harbor the greatest terrestrial biodiversity on Earth." },
      { text: "95%", isCorrect: false, explanation: "While exceptionally rich, other biomes (grasslands, temperate forests, deserts) host the remaining species." },
      { text: "2%", isCorrect: false, explanation: "Rainforests represent over half of Earth's biodiversity, not 2%." }
    ],
    explanation: "High solar energy, moisture, and niche stratification across canopy layers support over half the world's plant and animal species.",
    tags: ["living-world", "habitats", "biomes", "rainforest", "biodiversity", "ecology"]
  },
  {
    title: "Why are the soils of ancient tropical rainforests paradoxically nutrient-poor despite dense, lush vegetative growth above ground?",
    difficulty: "Hard",
    options: [
      { text: "Warmth and humidity drive rapid decomposition, and intense rainfall leaches nutrients, meaning almost all nutrients are stored inside living biomass rather than soil", isCorrect: true, explanation: "Nutrient cycling is instantaneous: fallen leaves are decomposed in days by fungi, and shallow tree root networks reabsorb minerals immediately before heavy rains leach them away." },
      { text: "Subterranean termites eat all inorganic rock minerals before trees can absorb them", isCorrect: false, explanation: "Termites consume dead cellulose, not mineral bedrock." },
      { text: "Rainforest trees synthesize toxins that sterilize soil bacteria", isCorrect: false, explanation: "Soil bacteria and mycorrhizal fungi are exceptionally active." },
      { text: "Rainforests sit on massive sheets of pure volcanic glass", isCorrect: false, explanation: "Soils are heavily weathered ancient oxisols and ultisols." }
    ],
    explanation: "Nutrients in rainforests reside in living trees, epiphytes, and lianas; clearing the trees leaves barren, easily eroded red laterite soil.",
    tags: ["living-world", "habitats", "rainforest", "soils", "nutrient-cycling", "ecology"]
  },
  {
    title: "The Taiga (or Boreal Forest), which circles the northern globe through Russia, Scandinavia, and Canada, is characterized as:",
    difficulty: "Easy",
    options: [
      { text: "The largest contiguous terrestrial biome on Earth, dominated by cold-tolerant coniferous evergreens (spruce, pine, fir)", isCorrect: true, explanation: "Covering 17 million km² across high northern latitudes, the taiga endures long freezing winters and short mild summers." },
      { text: "A tropical grassland ecosystem home to vast zebra and wildebeest herds", isCorrect: false, explanation: "That describes the African savanna." },
      { text: "A treeless frozen plain underlain by permanent permafrost", isCorrect: false, explanation: "That describes the Arctic tundra north of the taiga." },
      { text: "A temperate deciduous forest that loses all leaves each autumn", isCorrect: false, explanation: "Conifers in the taiga retain needle foliage year-round to photosynthesize immediately in spring." }
    ],
    explanation: "Needleleaf conifers survive harsh winters with flexible drooping branches that shed heavy snow, and waxy needles that resist desiccation.",
    tags: ["living-world", "habitats", "biomes", "taiga", "boreal-forest", "ecology"]
  },
  {
    title: "What defining subsurface soil condition prevents large trees from establishing root systems in the Arctic Tundra biome?",
    difficulty: "Easy",
    options: [
      { text: "Permafrost: a permanently frozen subterranean layer of soil and ice", isCorrect: true, explanation: "Only a thin top layer (the active layer) thaws during the brief Arctic summer, leaving subsoil permanently frozen and impenetrable to deep tree roots." },
      { text: "Extreme volcanic geothermal heat boiling all underground moisture", isCorrect: false, explanation: "The Arctic tundra is bitterly cold, not geothermally boiling." },
      { text: "Hyper-saline sea salt crusts left by evaporating ancient oceans", isCorrect: false, explanation: "Tundra soils are low in salinity; aridity and permafrost restrict plant forms." },
      { text: "Continuous underground burrowing by giant mole rats", isCorrect: false, explanation: "Mole rats are African/Eurasian subterranean rodents." }
    ],
    explanation: "Permafrost blocks root growth and drainage, creating soggy summer bog conditions dominated by lichens, mosses, and dwarf prostrate willows.",
    tags: ["living-world", "habitats", "biomes", "tundra", "permafrost", "ecology"]
  },
  {
    title: "Temperate deciduous forests are famed for their vibrant autumn color transformation because broadleaf trees undergo:",
    difficulty: "Medium",
    options: [
      { text: "Leaf abscission: breaking down green chlorophyll to resorb nutrients, unmasking underlying yellow and orange carotenoids", isCorrect: true, explanation: "As day length shortens, a corky abscission layer forms at the petiole base; chlorophyll degrades, revealing yellow xanthophylls and red anthocyanins synthesized in autumn." },
      { text: "Spontaneous chemical combustion of sap in leaf veins", isCorrect: false, explanation: "Leaves change color biochemically, not through combustion." },
      { text: "Infection by brightly colored autumnal parasitic bacteria", isCorrect: false, explanation: "Autumn color change is a programmed genetic adaptation to winter dormancy." },
      { text: "Absorption of colored mineral dyes from autumn rainfall", isCorrect: false, explanation: "Pigments are endogenous phytochemicals unmasked by chlorophyll breakdown." }
    ],
    explanation: "Deciduous trees shed broad leaves to prevent fatal moisture loss and freezing damage during cold winters when roots cannot absorb frozen groundwater.",
    tags: ["living-world", "habitats", "biomes", "temperate-forest", "abscission", "ecology"]
  },
  {
    title: "Why are estuaries (where freshwater rivers meet and mix with tidal ocean saltwater) among the most biologically productive ecosystems on Earth?",
    difficulty: "Medium",
    options: [
      { text: "River runoff deposits abundant terrestrial nutrients, sheltered shallow waters allow sunlight penetration, and tidal flushing sustains rich nurseries for fish and shellfish", isCorrect: true, explanation: "Estuaries act as nutrient traps where salt marsh grasses and mangrove roots trap sediment, sheltering juvenile fish, crabs, and shrimp from open-ocean predators." },
      { text: "High water velocity prevents any aquatic vegetation from taking root", isCorrect: false, explanation: "Estuaries feature calm, sheltered bays packed with sea grasses and mangroves." },
      { text: "They contain zero dissolved oxygen, eliminating predatory marine life", isCorrect: false, explanation: "Tidal movement oxygenates water columns, sustaining vast biodiversity." },
      { text: "They are heated to 60°C by boiling volcanic vents", isCorrect: false, explanation: "Estuarine water temperatures track ambient coastal seasonal weather." }
    ],
    explanation: "Estuaries serve as critical marine 'nurseries' where over 75% of commercially caught marine fish and shellfish spend early life cycles.",
    tags: ["living-world", "habitats", "estuaries", "marine-life", "ecology", "conservation"]
  },
  {
    title: "Deep-sea hydrothermal vent communities, thriving at 2,500 meters depth in total pitch-black darkness, base their entire food chain on:",
    difficulty: "Medium",
    options: [
      { text: "Chemosynthetic bacteria that oxidize hydrogen sulfide emerging from geothermal volcanic vents", isCorrect: true, explanation: "Unlike surface ecosystems fueled by solar photosynthesis, hydrothermal vent ecosystems are powered by sulfur-oxidizing bacteria living inside giant tubeworms (Riftia) and clams." },
      { text: "Microscopic solar-powered phytoplankton carried down by deep whirlpools", isCorrect: false, explanation: "Sunlight penetrates only the top 200 meters of the ocean (euphotic zone)." },
      { text: "Whale carcasses that fall every 10 minutes", isCorrect: false, explanation: "Whale falls are sporadic and temporary; vent ecosystems are sustained by geothermal chemosynthesis." },
      { text: "Direct electrical currents leaking from Earth's liquid iron outer core", isCorrect: false, explanation: "Biological energy is derived from chemical bonds in geothermal hydrogen sulfide." }
    ],
    explanation: "Hydrothermal vents proved that complex biological ecosystems can thrive independently of sunlight via chemical energy (chemosynthesis).",
    tags: ["living-world", "habitats", "deep-sea", "chemosynthesis", "hydrothermal-vents", "ecology"]
  },
  {
    title: "Coral reefs, known as the 'rainforests of the sea', require clear, shallow, sunlit tropical waters primarily because:",
    difficulty: "Easy",
    options: [
      { text: "Reef-building coral polyps host mutualistic photosynthetic microalgae (zooxanthellae) within their tissues that demand sunlight", isCorrect: true, explanation: "Zooxanthellae provide up to 90% of the coral polyp's metabolic energy through photosynthesis, in exchange for shelter and inorganic nutrients (nitrogen/phosphorus)." },
      { text: "Corals are terrestrial flowering plants that fell into the ocean", isCorrect: false, explanation: "Corals are invertebrate animals belonging to the phylum Cnidaria." },
      { text: "Salt dissolves completely in water if sunlight is absent", isCorrect: false, explanation: "Ocean salinity does not depend on direct sunlight." },
      { text: "Coral limestone skeletons melt into liquid if water drops below 35°C", isCorrect: false, explanation: "Corals require warm water (23-29°C), but thermal stress causes coral bleaching." }
    ],
    explanation: "When ocean temperatures spike, corals expel their photosynthetic zooxanthellae, turning bone-white and starving in a phenomenon known as coral bleaching.",
    tags: ["living-world", "habitats", "coral-reef", "symbiosis", "zooxanthellae", "marine-life"]
  },
  {
    title: "The African savanna biome is shaped and maintained by which periodic natural disturbance that prevents forest encroachment?",
    difficulty: "Medium",
    options: [
      { text: "Seasonal wildfires during the dry season paired with browsing pressure from large herbivores like elephants", isCorrect: true, explanation: "Fires destroy saplings while grasses survive underground through fire-resistant rhizomes; elephants uproot trees, preserving open grasslands." },
      { text: "Yearly category-5 tropical typhoons blowing down all vegetation", isCorrect: false, explanation: "Savannas are continental inland tropical ecosystems, not typhoon corridors." },
      { text: "Subterranean permafrost freezing tree root tips in winter", isCorrect: false, explanation: "Savannas are tropical ecosystems without freezing temperatures or permafrost." },
      { text: "Continuous acid rain from surrounding active volcanoes", isCorrect: false, explanation: "Fires and grazing herbivores drive savanna ecology, not volcanic acid." }
    ],
    explanation: "Fire and megaherbivore grazing act in tandem to prevent dense forest canopies from shading out rich savanna grasslands.",
    tags: ["living-world", "habitats", "biomes", "savanna", "fire-ecology", "ecology"]
  },
  {
    title: "The chaparral (Mediterranean scrubland) biome, found in coastal California, South Africa, and central Chile, features plants adapted to:",
    difficulty: "Medium",
    options: [
      { text: "Mild, wet winters and hot, dry summers with frequent seasonal wildfires (pyrophytic adaptations)", isCorrect: true, explanation: "Chaparral sclerophyllous shrubs have leathery evergreen leaves rich in volatile oils, and many species require smoke or heat from fires for seed germination." },
      { text: "Continuous torrential downpours exceeding 5,000 mm every year", isCorrect: false, explanation: "That characterizes tropical rainforests; Mediterranean biomes endure dry summers." },
      { text: "Permanent sub-zero temperatures and continuous snow cover", isCorrect: false, explanation: "Mediterranean climates are temperate and frost-free for most of the year." },
      { text: "Complete water submersion for nine months every year", isCorrect: false, explanation: "Chaparral grows on arid hillsides and mountain slopes, not floodplains." }
    ],
    explanation: "Chaparral plants are fire-adapted (pyrophytes), storing carbohydrates in underground root burls (lignotubers) that sprout rapidly after fires.",
    tags: ["living-world", "habitats", "biomes", "chaparral", "mediterranean", "ecology"]
  },
  {
    title: "The intertidal zone of rocky ocean coastlines poses what severe physical challenges to resident marine organisms (barnacles, mussels, limpets)?",
    difficulty: "Easy",
    options: [
      { text: "Alternate exposure to pounding mechanical waves, air desiccation, thermal extremes, and fluctuating salinity during tidal cycles", isCorrect: true, explanation: "Organisms must cement themselves to rock faces to resist wave force and seal shells tightly at low tide to prevent drying out and bird predation." },
      { text: "Permanent lack of atmospheric oxygen and complete darkness", isCorrect: false, explanation: "Intertidal zones are shallow and periodically exposed directly to air and sunlight." },
      { text: "Extremely high hydrostatic crushing pressure matching Challenger Deep", isCorrect: false, explanation: "Hydrostatic pressure is at sea-level surface atmospheric levels." },
      { text: "Continuous sub-zero permafrost ice freezing the rocks solid", isCorrect: false, explanation: "Most temperate and tropical rocky coasts do not experience permafrost." }
    ],
    explanation: "Tidal zonation organizes intertidal life into distinct vertical bands based on their physiological tolerance to wave exposure and air desiccation.",
    tags: ["living-world", "habitats", "intertidal-zone", "adaptation", "marine-life", "ecology"]
  },
  {
    title: "Why are mangrove forest wetlands along tropical coastlines ecologically vital buffers against tsunamis and storm surges?",
    difficulty: "Easy",
    options: [
      { text: "Their dense tangles of stilt prop roots and pneumatophores dissipate wave energy, trap sediment, and prevent shoreline erosion", isCorrect: true, explanation: "Mangrove root networks absorb and frictionally dampen up to 66% of wave energy within the first 100 meters of forest, saving coastal communities from hurricane devastation." },
      { text: "They secrete chemical surfactants that calm ocean waters into glass", isCorrect: false, explanation: "They provide mechanical hydrodynamic drag, not chemical surfactants." },
      { text: "They freeze the surrounding ocean water into solid breakwaters", isCorrect: false, explanation: "Mangroves thrive in warm tropical waters and cannot tolerate freezing." },
      { text: "They grow to heights of 200 meters to physically block coastal winds", isCorrect: false, explanation: "Mangroves are modest trees (5 to 15 meters tall), relying on dense root mazes." }
    ],
    explanation: "Pneumatophores (aerial breathing roots) filter coastal runoff and absorb hurricane surges, protecting inland human settlements.",
    tags: ["living-world", "habitats", "mangroves", "wetlands", "conservation", "ecology"]
  },
  {
    title: "Which ocean zone comprises the sunlit upper 200 meters of open water where sufficient light penetrates to support primary photosynthesis?",
    difficulty: "Easy",
    options: [
      { text: "The Epipelagic (Euphotic or Sunlit) zone", isCorrect: true, explanation: "The epipelagic zone receives ample solar irradiance, sustaining over 90% of all marine life, all marine phytoplankton, and apex pelagic fish." },
      { text: "The Mesopelagic (Twilight) zone", isCorrect: false, explanation: "The mesopelagic zone (200-1,000 m) receives faint blue light insufficient for net photosynthesis." },
      { text: "The Bathypelagic (Midnight) zone", isCorrect: false, explanation: "The bathypelagic zone (1,000-4,000 m) is completely pitch black (aphotic)." },
      { text: "The Hadalpelagic (Trench) zone", isCorrect: false, explanation: "The hadal zone (6,000-11,000 m) encompasses deep submarine ocean trenches." }
    ],
    explanation: "Net primary production in the ocean is confined entirely to the euphotic epipelagic zone, anchoring marine food webs.",
    tags: ["living-world", "habitats", "ocean-zones", "epipelagic", "marine-life", "photosynthesis"]
  },
  {
    title: "What is an 'ecotone' in ecological science?",
    difficulty: "Medium",
    options: [
      { text: "A transitional transition zone of tension and blending between two distinct biological communities or biomes (e.g., marshland between land and river)", isCorrect: true, explanation: "Ecotones often exhibit the 'edge effect', supporting unique species assemblages and higher species density than either adjacent biome alone." },
      { text: "An organism that produces its own electricity for hunting", isCorrect: false, explanation: "That is an electrogenic organism." },
      { text: "A unit of measure for calculating planetary oxygen consumption", isCorrect: false, explanation: "Ecotone is a spatial ecological concept, not a unit of measurement." },
      { text: "A sterile cave habitat completely devoid of living microbes", isCorrect: false, explanation: "Ecotones are vibrant species-rich transition zones." }
    ],
    explanation: "Examples of ecotones include estuaries, marsh edges, forest-grassland boundaries, and riparian river corridors.",
    tags: ["living-world", "habitats", "ecotone", "ecology", "biodiversity", "life-sciences-health"]
  },
  {
    title: "The pelagic Sargasso Sea in the North Atlantic is considered a unique biological oasis because floating mats of Sargassum brown algae serve as:",
    difficulty: "Easy",
    options: [
      { text: "A floating pelagic nursery providing food, shelter, and camouflage for juvenile sea turtles, crabs, and endemic sargassum fish", isCorrect: true, explanation: "Without any seabed anchor, gas-filled vesicles (pneumatocysts) keep Sargassum afloat, creating a golden floating forest in the open ocean." },
      { text: "A toxic dead zone that poisons all passing migratory birds", isCorrect: false, explanation: "It is a vital marine biodiversity hotspot, not a dead zone." },
      { text: "A permanent freshwater island where humans establish farms", isCorrect: false, explanation: "It is an oceanic saltwater sea." },
      { text: "An underwater volcano that boils marine life", isCorrect: false, explanation: "It is a calm oceanic gyre." }
    ],
    explanation: "Floating Sargassum rafts shelter juvenile loggerhead turtles during their 'lost years' in the North Atlantic gyre.",
    tags: ["living-world", "habitats", "sargasso-sea", "marine-life", "symbiosis", "ecology"]
  },

  // ==========================================
  // SECTION 4: FOOD CHAINS & TROPHIC DYNAMICS (Questions 46 to 60)
  // ==========================================
  {
    title: "According to Lindeman's Ten Percent Law of trophic efficiency in ecology, approximately how much energy is transferred from one trophic level to the next?",
    difficulty: "Easy",
    options: [
      { text: "10% (the remaining 90% is dissipated as metabolic heat, respiration, and unconsumed biomass)", isCorrect: true, explanation: "Formulated by Raymond Lindeman in 1942, this second-law thermodynamic inefficiency limits terrestrial food chains to 4 or 5 trophic levels." },
      { text: "50%", isCorrect: false, explanation: "Energy transfer efficiency averages 10%, far below 50%." },
      { text: "100%", isCorrect: false, explanation: "100% transfer would violate the Second Law of Thermodynamics." },
      { text: "1%", isCorrect: false, explanation: "1% is typical of solar light capture by plants; trophic transfer between consumers averages 10%." }
    ],
    explanation: "Because only ~10% of chemical energy passes upward, apex predators require enormous territory and biomass at lower levels to survive.",
    tags: ["living-world", "food-chains", "trophic-levels", "energy-pyramid", "ecology", "life-sciences-health"]
  },
  {
    title: "In a forest ecosystem, which of the following organisms occupies the primary consumer trophic level?",
    difficulty: "Easy",
    options: [
      { text: "An herbivorous caterpillar chewing on oak leaves", isCorrect: true, explanation: "Primary consumers (herbivores) feed directly upon autotrophic primary producers (plants)." },
      { text: "An oak tree absorbing sunlight via photosynthesis", isCorrect: false, explanation: "Oak trees are primary producers (autotrophs)." },
      { text: "A songbird preying upon caterpillars", isCorrect: false, explanation: "The songbird is a secondary consumer (carnivore)." },
      { text: "A red-tailed hawk hunting songbirds", isCorrect: false, explanation: "The hawk is a tertiary or apex consumer." }
    ],
    explanation: "Trophic level progression: Primary Producer (tree) -> Primary Consumer (caterpillar) -> Secondary Consumer (bird) -> Tertiary Consumer (hawk).",
    tags: ["living-world", "food-chains", "trophic-levels", "herbivores", "ecology", "life-sciences-health"]
  },
  {
    title: "What is the defining ecological role of a 'keystone species' within a biological community?",
    difficulty: "Medium",
    options: [
      { text: "A species that exerts a disproportionately large regulatory effect on ecosystem structure and biodiversity relative to its numerical abundance", isCorrect: true, explanation: "Coined by Robert Paine, removing a keystone species (like sea otters or starfish) triggers a community collapse or drastic reduction in species diversity." },
      { text: "The most abundant species that comprises over 90% of total community biomass", isCorrect: false, explanation: "That is a dominant foundation species, not necessarily a keystone species." },
      { text: "The first plant species to colonize bare volcanic lava rock", isCorrect: false, explanation: "That is a pioneer species." },
      { text: "An invasive alien species that destroys native food webs", isCorrect: false, explanation: "Keystone species are native regulators of ecosystem balance." }
    ],
    explanation: "Removing sea otters allows sea urchins to overgraze kelp, turning vibrant kelp forests into barren 'urchin barrens'.",
    tags: ["living-world", "food-chains", "keystone-species", "ecology", "biodiversity", "conservation"]
  },
  {
    title: "Which ecological pyramid can NEVER be inverted under any circumstances in an undisturbed ecosystem?",
    difficulty: "Hard",
    options: [
      { text: "Pyramid of Energy", isCorrect: true, explanation: "Because of the Second Law of Thermodynamics, energy is irreversibly lost as heat at each step; energy content at a lower level must always exceed that of higher levels." },
      { text: "Pyramid of Numbers", isCorrect: false, explanation: "Can be inverted: one single massive oak tree can sustain 50,000 herbivorous insects." },
      { text: "Pyramid of Biomass", isCorrect: false, explanation: "Can be inverted in open oceans where a tiny standing biomass of fast-reproducing phytoplankton sustains a larger biomass of zooplankton." },
      { text: "Pyramid of Species Diversity", isCorrect: false, explanation: "Species count can vary independently across trophic tiers." }
    ],
    explanation: "Energy pyramids measure total productivity over time (Joules/$m^2$/year) and must always be wider at the base than at the top.",
    tags: ["living-world", "food-chains", "energy-pyramid", "thermodynamics", "ecology", "life-sciences-health"]
  },
  {
    title: "The reintroduction of grey wolves to Yellowstone National Park in 1995 demonstrated a classic 'trophic cascade' by:",
    difficulty: "Medium",
    options: [
      { text: "Altering elk grazing behavior, which allowed willow and aspen trees to recover along riverbanks, stabilizing soil and restoring beaver and songbird habitats", isCorrect: true, explanation: "Predator presence restored the 'ecology of fear', keeping herbivores moving away from vulnerable riverbeds and physically re-stabilizing meandering river courses." },
      { text: "Exterminating all deer and bison populations within 48 hours", isCorrect: false, explanation: "Wolves culled sick/old animals, stabilizing healthy herd populations." },
      { text: "Directly eating millions of insects off park pine needles", isCorrect: false, explanation: "Wolves are apex carnivores preying on ungulates, not insectivores." },
      { text: "Transforming the entire national park into an arid desert", isCorrect: false, explanation: "The trophic cascade revitalized forest and riparian vegetation." }
    ],
    explanation: "Top-down predatory pressure by wolves controlled overgrazing, allowing riverbanks to re-vegetate and reducing river erosion.",
    tags: ["living-world", "food-chains", "trophic-cascade", "yellowstone", "wolves", "conservation"]
  },
  {
    title: "What phenomenon occurs when persistent, fat-soluble chemical pollutants (such as DDT, mercury, or PCBs) increase in concentration at higher trophic levels?",
    difficulty: "Medium",
    options: [
      { text: "Biomagnification", isCorrect: true, explanation: "Because fat-soluble toxins cannot be metabolized or excreted easily, each predator accumulates all the toxins stored in thousands of prey items consumed over a lifetime." },
      { text: "Bioaccumulation", isCorrect: false, explanation: "Bioaccumulation is the buildup of a substance within a single individual organism over time; biomagnification is the amplification across successive trophic tiers." },
      { text: "Eutrophication", isCorrect: false, explanation: "Eutrophication is nutrient pollution causing algal blooms and oxygen depletion." },
      { text: "Bioremediation", isCorrect: false, explanation: "Bioremediation is the use of microbes or plants to clean up environmental pollutants." }
    ],
    explanation: "Biomagnification led to reproductive failure and eggshell thinning in apex raptors like bald eagles and peregrine falcons exposed to DDT.",
    tags: ["living-world", "food-chains", "biomagnification", "pollution", "environmental-ecology-conservation", "ecology"]
  },
  {
    title: "Why are decomposers (saprophytes, such as fungi and soil bacteria) essential to the sustainability of all life on Earth?",
    difficulty: "Easy",
    options: [
      { text: "They break down dead organic matter and feces, recycling locked chemical elements (carbon, nitrogen, phosphorus) back into soil for plant reuse", isCorrect: true, explanation: "Without decomposers, organic matter would accumulate indefinitely, locking away vital inorganic nutrients and starving primary producers." },
      { text: "They hunt living apex predators at night to keep their populations in check", isCorrect: false, explanation: "Decomposers feed on non-living dead biomass and organic waste." },
      { text: "They generate atmospheric oxygen via subterranean photosynthesis", isCorrect: false, explanation: "Most fungi and decomposers are heterotrophs that consume oxygen during aerobic respiration." },
      { text: "They convert granite bedrock into solid gold", isCorrect: false, explanation: "Decomposers recycle biological organic matter, not transmuting minerals." }
    ],
    explanation: "Decomposers complete biogeochemical cycles, ensuring that atoms of nitrogen, carbon, and phosphorus can cycle into future generations of life.",
    tags: ["living-world", "food-chains", "decomposers", "nutrient-cycling", "ecology", "life-sciences-health"]
  },
  {
    title: "In an ecological food web, an organism that eats both plant material and animal prey is categorized as:",
    difficulty: "Easy",
    options: [
      { text: "An omnivore (e.g., brown bears, chimpanzees, humans, crows)", isCorrect: true, explanation: "Omnivores possess versatile digestive systems and dentition capable of extracting nutrients from both vegetative matter and animal flesh." },
      { text: "A strict obligate carnivore", isCorrect: false, explanation: "Obligate carnivores (e.g., felids like lions and tigers) require animal meat exclusively." },
      { text: "A strict specialist herbivore", isCorrect: false, explanation: "Specialist herbivores (e.g., koalas, giant pandas) consume plant matter exclusively." },
      { text: "A primary autotroph", isCorrect: false, explanation: "Autotrophs produce their own food from sunlight or inorganic chemicals." }
    ],
    explanation: "Omnivores occupy multiple trophic levels simultaneously, feeding on primary producers as well as primary and secondary consumers.",
    tags: ["living-world", "food-chains", "omnivores", "ecology", "zoology", "life-sciences-health"]
  },
  {
    title: "Why is a complex, branched 'food web' a more accurate representation of natural ecosystems than a single, linear 'food chain'?",
    difficulty: "Easy",
    options: [
      { text: "Most animals consume multiple food sources and are preyed upon by several different predators, creating interconnected stability", isCorrect: true, explanation: "Linear chains are oversimplifications; real ecosystems have overlapping webs where alternative prey pathways provide resilience against species fluctuations." },
      { text: "Food chains exist only in artificial laboratory test tubes", isCorrect: false, explanation: "Food chains illustrate single isolated feeding pathways within a web." },
      { text: "Energy increases exponentially at higher levels in a food web", isCorrect: false, explanation: "Energy always decreases at higher trophic levels in accordance with thermodynamics." },
      { text: "Plants eat animals in all food webs", isCorrect: false, explanation: "Carnivorous plants are rare exceptions in specialized habitats." }
    ],
    explanation: "Network redundancy in food webs buffers ecosystems against catastrophic collapse if a single prey population fluctuates.",
    tags: ["living-world", "food-chains", "food-web", "ecology", "biodiversity", "life-sciences-health"]
  },
  {
    title: "In open ocean marine ecosystems, what microscopic autotrophic organisms form the foundational base of virtually all pelagic food webs?",
    difficulty: "Easy",
    options: [
      { text: "Phytoplankton (diatoms, dinoflagellates, and cyanobacteria)", isCorrect: true, explanation: "Phytoplankton drift in the sunlit upper ocean, performing over 50% of all global photosynthetic carbon fixation and generating roughly half of Earth's oxygen." },
      { text: "Zooplankton (copepods and krill)", isCorrect: false, explanation: "Zooplankton are heterotrophic primary consumers that feed upon phytoplankton." },
      { text: "Baleen whales", isCorrect: false, explanation: "Baleen whales are massive apex/secondary consumers feeding on krill." },
      { text: "Giant kelp", isCorrect: false, explanation: "Kelp grows in shallow coastal fringes; phytoplankton dominates the vast open ocean (70% of Earth)." }
    ],
    explanation: "Microscopic marine phytoplankton convert dissolved $CO_2$ and sunlight into biomass, feeding vast swarms of zooplankton and krill.",
    tags: ["living-world", "food-chains", "phytoplankton", "marine-life", "photosynthesis", "ecology"]
  },
  {
    title: "What is the difference between a detritivore and a saprotrophic decomposer?",
    difficulty: "Medium",
    options: [
      { text: "Detritivores physically ingest and chew dead particulate matter internally (e.g., earthworms, millipedes), while saprotrophs secrete external digestive enzymes and absorb dissolved nutrients (e.g., fungi)", isCorrect: true, explanation: "Both feed on dead organic matter, but detritivores use internal ingestion while saprotrophs utilize absorptive extracellular digestion." },
      { text: "Detritivores eat living plants, while saprotrophs eat live animals", isCorrect: false, explanation: "Both consume non-living dead organic remains (detritus)." },
      { text: "Detritivores are microscopic bacteria, while saprotrophs are birds", isCorrect: false, explanation: "Vultures are scavengers; saprotrophs are fungi/bacteria; detritivores are invertebrate shredders." },
      { text: "Detritivores perform photosynthesis when dead matter is scarce", isCorrect: false, explanation: "Neither performs photosynthesis." }
    ],
    explanation: "Detritivores mechanically fragment detritus internally, accelerating microbial breakdown by saprotrophs that absorb dissolved nutrients externally.",
    tags: ["living-world", "food-chains", "detritivores", "decomposers", "saprotrophs", "ecology"]
  },
  {
    title: "In agricultural environments, overusing synthetic chemical pesticides can paradoxically cause a secondary pest outbreak because:",
    difficulty: "Medium",
    options: [
      { text: "Broad-spectrum pesticides wipe out natural predatory insects (ladybugs, parasitic wasps), allowing surviving pesticide-resistant pests to multiply without biological control", isCorrect: true, explanation: "Predator populations have smaller numbers and reproduce slower than pest herbivores; destroying them disrupts natural top-down biological predation." },
      { text: "Pesticides act as chemical fertilizers that accelerate pest insect growth rates tenfold", isCorrect: false, explanation: "Pesticides are toxic neurotoxins, not plant fertilizers." },
      { text: "Dead pest insects transform into carnivorous weeds", isCorrect: false, explanation: "Biologically impossible." },
      { text: "Pesticides mutate herbivorous insects into warm-blooded vertebrates", isCorrect: false, explanation: "Chemicals do not trigger spontaneous phylogenetic class transitions." }
    ],
    explanation: "Decimating natural predators removes the natural ecosystem brakes, leading to secondary pest resurgence and pesticide resistance.",
    tags: ["living-world", "food-chains", "pesticides", "biological-control", "environmental-ecology-conservation", "ecology"]
  },
  {
    title: "An inverted pyramid of numbers, where a single organism supports thousands of consumers, is commonly observed in which habitat scenario?",
    difficulty: "Medium",
    options: [
      { text: "A single large oak tree supporting thousands of herbivorous caterpillars, aphids, and parasitic wasps", isCorrect: true, explanation: "Because one giant producer has immense biomass, its numerical count is 1, creating an inverted spindle-shaped pyramid of numbers." },
      { text: "An open grassland where grass blades outnumber gazelles", isCorrect: false, explanation: "Grasslands have upright pyramids of numbers (millions of grass plants -> thousands of gazelles -> few lions)." },
      { text: "A coral reef where coral polyps outnumber sharks", isCorrect: false, explanation: "Reef pyramids of numbers are typically upright." },
      { text: "A tundra where moss plants outnumber lemmings", isCorrect: false, explanation: "Upright pyramid." }
    ],
    explanation: "When primary producers are massive trees rather than tiny grass shoots, a single individual producer hosts thousands of primary consumers.",
    tags: ["living-world", "food-chains", "pyramids", "trophic-levels", "ecology", "life-sciences-health"]
  },
  {
    title: "Apex predators (such as killer whales, lions, and polar bears) sit at the top of food webs and are ecologically characterized by:",
    difficulty: "Easy",
    options: [
      { text: "Having no natural predators of their own in their adult healthy state", isCorrect: true, explanation: "Apex predators occupy the highest trophic position, exerting top-down population and behavioral control over herbivore and mesopredator guilds." },
      { text: "Feeding exclusively on photosynthetic green plants", isCorrect: false, explanation: "Apex predators are hyper-carnivores." },
      { text: "Producing hundreds of offspring every week", isCorrect: false, explanation: "They are K-selected species with low reproductive rates and prolonged parental investment." },
      { text: "Surviving without water, oxygen, or biological food", isCorrect: false, explanation: "All apex predators require caloric food and oxygen." }
    ],
    explanation: "Occupying the pinnacle of energy pyramids, apex predators have no natural enemies and are highly sensitive to habitat fragmentation and biomagnification.",
    tags: ["living-world", "food-chains", "apex-predators", "ecology", "conservation", "zoology"]
  },
  {
    title: "What role do scavengers like vultures, hyenas, and Tasmanian devils play in preventing epidemic diseases in wild ecosystems?",
    difficulty: "Medium",
    options: [
      { text: "Rapidly consuming rotting carrion, neutralizing lethal bacterial pathogens (like anthrax and botulism) in extremely acidic stomachs before vectors can spread them", isCorrect: true, explanation: "Vulture gastric acid has a pH near zero (equivalent to car battery acid), destroying dangerous pathogens like Bacillus anthracis and rabies viruses that fester in dead carcasses." },
      { text: "Administering oral antibiotics to sick animals in the herd", isCorrect: false, explanation: "Wild animals do not manufacture or administer pharmaceutical antibiotics." },
      { text: "Burying dead carcasses 50 feet underground in concrete vaults", isCorrect: false, explanation: "They consume carcasses on the surface with powerful bone-crushing dentition." },
      { text: "Vaccinating herbivores against insect bites", isCorrect: false, explanation: "Scavengers feed on carrion, removing disease reservoirs mechanically and biochemically." }
    ],
    explanation: "When vulture populations collapsed in India in the 1990s due to diclofenac poisoning, feral dog and rat populations exploded, causing spikes in human rabies cases.",
    tags: ["living-world", "food-chains", "scavengers", "vultures", "disease-ecology", "conservation"]
  },

  // ==========================================
  // SECTION 5: LIFE CYCLES & REPRODUCTION (Questions 61 to 75)
  // ==========================================
  {
    title: "Complete metamorphosis (holometabolous development), seen in butterflies, beetles, bees, and flies, consists of which four distinct life stages?",
    difficulty: "Easy",
    options: [
      { text: "Egg -> Larva (caterpillar/grub/maggot) -> Pupa (chrysalis/cocoon) -> Adult (imago)", isCorrect: true, explanation: "Holometabolous insects undergo complete tissue remodeling inside the pupal stage, where imaginal discs differentiate into adult organs, eliminating dietary competition between adults and larvae." },
      { text: "Egg -> Nymph -> Adult", isCorrect: false, explanation: "That is incomplete (hemimetabolous) metamorphosis, seen in grasshoppers and dragonflies." },
      { text: "Egg -> Tadpole -> Froglet -> Adult", isCorrect: false, explanation: "That is amphibian metamorphosis." },
      { text: "Seed -> Seedling -> Sapling -> Mature Tree", isCorrect: false, explanation: "That describes plant development." }
    ],
    explanation: "Complete metamorphosis accounts for 85% of all insect species because larvae and adults occupy completely different ecological niches and food sources.",
    tags: ["living-world", "life-cycles", "metamorphosis", "insects", "zoology", "adaptation"]
  },
  {
    title: "How does incomplete metamorphosis (hemimetabolous development) in grasshoppers and true bugs differ from complete metamorphosis?",
    difficulty: "Easy",
    options: [
      { text: "There is no pupal stage; hatched nymphs resemble miniature wingless adults that molt repeatedly until reaching maturity", isCorrect: true, explanation: "Nymphs share the adult body plan and often feed on the same plants, growing external wing pads with each progressive molt (instar)." },
      { text: "The insect skips the egg stage and gives birth to live flying adults", isCorrect: false, explanation: "All hemimetabolous insects hatch from eggs." },
      { text: "The larva liquefies completely inside a silk cocoon for six months", isCorrect: false, explanation: "Silk cocoons and pupal histolysis occur only in holometabolous insects." },
      { text: "The adult reverts back into an egg when winter arrives", isCorrect: false, explanation: "Insects do not reverse biological stages." }
    ],
    explanation: "Hemimetabolous development progresses directly through nymph instars without an intervening sedentary pupal phase.",
    tags: ["living-world", "life-cycles", "metamorphosis", "hemimetabolous", "insects", "zoology"]
  },
  {
    title: "In flowering plants (angiosperms), what extraordinary process occurs during 'double fertilization' inside the ovule?",
    difficulty: "Hard",
    options: [
      { text: "One sperm fertilizes the egg to form a diploid zygote (2n), while a second sperm fuses with two polar nuclei to form triploid endosperm (3n)", isCorrect: true, explanation: "This unique angiosperm adaptation ensures that food-storing nutritive endosperm (3n) develops only if the egg has been successfully fertilized, conserving metabolic resources." },
      { text: "Two eggs are fertilized simultaneously to produce twin identical seedlings inside every single seed", isCorrect: false, explanation: "One sperm fertilizes the single egg cell; the other fertilizes central polar nuclei." },
      { text: "Pollen grains fertilize both the flower petal and the root tip", isCorrect: false, explanation: "Fertilization occurs strictly inside the female carpel ovule." },
      { text: "The plant fertilizes its own flowers and adjacent flowers on a neighboring tree simultaneously", isCorrect: false, explanation: "Double fertilization refers to the twin fusion events inside a single embryo sac." }
    ],
    explanation: "Double fertilization produces the diploid embryo (2n) along with its triploid food supply (endosperm 3n) within the protective seed coat.",
    tags: ["living-world", "life-cycles", "plants", "double-fertilization", "angiosperms", "reproduction"]
  },
  {
    title: "During the metamorphosis of an aquatic frog tadpole into a terrestrial adult frog, which hormone produced by the thyroid gland triggers this transformation?",
    difficulty: "Medium",
    options: [
      { text: "Thyroxine (T4 / T3)", isCorrect: true, explanation: "A surge in thyroid hormones coordinates the apoptosis (programmed cell death) of tail and gills, while stimulating leg growth and pulmonary lung development." },
      { text: "Insulin", isCorrect: false, explanation: "Insulin regulates glucose homeostasis, not amphibian metamorphosis." },
      { text: "Adrenaline (Epinephrine)", isCorrect: false, explanation: "Adrenaline mediates acute fight-or-flight sympathetic responses." },
      { text: "Auxin", isCorrect: false, explanation: "Auxin is a plant growth hormone, not an animal thyroid hormone." }
    ],
    explanation: "Thyroxine acts as the master hormonal switch orchestrating skull remodeling, lung activation, intestinal shortening, and tail reabsorption.",
    tags: ["living-world", "life-cycles", "amphibians", "thyroxine", "hormones", "metamorphosis"]
  },
  {
    title: "In the plant life cycle known as 'Alternation of Generations', what is the fundamental difference between the sporophyte and gametophyte generations?",
    difficulty: "Hard",
    options: [
      { text: "The sporophyte is diploid (2n) and produces haploid spores via meiosis; the gametophyte is haploid (n) and produces gametes via mitosis", isCorrect: true, explanation: "Plants cycle between multicellular haploid gametophytes and multicellular diploid sporophytes; in higher plants (conifers, flowering plants), the sporophyte is dominant." },
      { text: "The sporophyte produces seeds without water, while the gametophyte has flowers", isCorrect: false, explanation: "Both phases occur within the life cycle of seed plants; the gametophyte is microscopic (pollen grain and embryo sac)." },
      { text: "Sporophytes are animals and gametophytes are green plants", isCorrect: false, explanation: "Both are botanical developmental stages of the same plant species." },
      { text: "Gametophytes are always diploid and sporophytes are triploid", isCorrect: false, explanation: "Gametophytes are strictly haploid (n) and sporophytes are diploid (2n)." }
    ],
    explanation: "Haploid gametophytes produce gametes that fuse into a diploid zygote, which matures into a spore-producing sporophyte.",
    tags: ["living-world", "life-cycles", "plants", "alternation-of-generations", "botany", "genetics"]
  },
  {
    title: "What is the primary ecological purpose of seed dormancy in wild plants?",
    difficulty: "Easy",
    options: [
      { text: "Preventing seeds from germinating during unfavorable seasonal conditions (such as winter freezing or summer droughts) until optimal survival conditions arrive", isCorrect: true, explanation: "Dormancy mechanisms (thick seed coats, abscisic acid inhibition) delay germination until environmental cues (vernalization chilling, scarification, fire, moisture) signal favorable spring conditions." },
      { text: "Allowing seeds to travel to other galaxies on solar wind", isCorrect: false, explanation: "Seed dispersal occurs within Earth's biosphere." },
      { text: "Preventing birds from noticing seeds in the soil", isCorrect: false, explanation: "Dormancy prevents premature metabolic growth, not bird detection." },
      { text: "Ensuring all seeds on a tree rot at the exact same moment", isCorrect: false, explanation: "Dormancy staggers germination across years to ensure lineage survival." }
    ],
    explanation: "Seed dormancy prevents seeds from sprouting prematurely during temporary autumn warm spells just before lethal winter freezes.",
    tags: ["living-world", "life-cycles", "plants", "seed-dormancy", "germination", "adaptation"]
  },
  {
    title: "What is parthenogenesis in animal reproduction?",
    difficulty: "Medium",
    options: [
      { text: "A form of asexual reproduction where an unfertilized egg develops into a complete, viable offspring without sperm fertilization", isCorrect: true, explanation: "Observed in select aphids, stick insects, whiptail lizards (Aspidoscelis), Komodo dragons, and honeybee drones (which develop from unfertilized eggs as haploid males)." },
      { text: "The fusion of two male sperm cells inside an empty shell", isCorrect: false, explanation: "Biologically impossible." },
      { text: "A mammal laying eggs and then eating the shells", isCorrect: false, explanation: "Parthenogenesis refers specifically to virgin birth from unfertilized eggs." },
      { text: "An animal changing its biological sex every day", isCorrect: false, explanation: "Sequential hermaphroditism is sex-changing; parthenogenesis is reproduction without male fertilization." }
    ],
    explanation: "Parthenogenesis allows species to reproduce rapidly when mates are absent, producing offspring that inherit exclusively maternal DNA.",
    tags: ["living-world", "life-cycles", "parthenogenesis", "reproduction", "zoology", "genetics"]
  },
  {
    title: "During the life cycle of a jellyfish (class Scyphozoa), the sessile asexual polyp stage undergoes transverse segmentation called strobilation to bud off immature free-swimming medusae known as:",
    difficulty: "Hard",
    options: [
      { text: "Ephyrae", isCorrect: true, explanation: "The polyp (scyphistoma) stacks like saucers and releases disc-like ephyra larvae that swim away, feeding on plankton and growing into adult umbrella-shaped medusae." },
      { text: "Planulae", isCorrect: false, explanation: "Planulae are the ciliated swimming larvae that develop from fertilized eggs and settle to form polyps." },
      { text: "Caterpillars", isCorrect: false, explanation: "Caterpillars are insect larvae." },
      { text: "Tadpoles", isCorrect: false, explanation: "Tadpoles are amphibian larvae." }
    ],
    explanation: "Jellyfish cycle between sexual medusae and asexual cloning polyps (scyphistomae) that release microscopic saucer-like ephyrae.",
    tags: ["living-world", "life-cycles", "jellyfish", "cnidaria", "marine-life", "zoology"]
  },
  {
    title: "What internal event marks the very first visible step in the germination of a dormant seed?",
    difficulty: "Easy",
    options: [
      { text: "Imbibition (rapid absorption of water that swells the seed, bursts the seed coat, and activates metabolic enzymes)", isCorrect: true, explanation: "Water intake hydrates dry enzymes, stimulates gibberellin release to break down starch into glucose, and pushes out the embryonic primary root (radicle)." },
      { text: "Immediate flowering within the subterranean soil", isCorrect: false, explanation: "Flowering occurs only after vegetative maturation months later." },
      { text: "Spontaneous generation of adult wooden bark", isCorrect: false, explanation: "Bark develops through secondary growth in woody plants long after germination." },
      { text: "Release of carbon monoxide into the surrounding air", isCorrect: false, explanation: "Seeds perform aerobic cellular respiration, consuming oxygen and releasing carbon dioxide." }
    ],
    explanation: "Imbibition hydrates dehydrated embryonic tissues, triggering cellular respiration and rapid cell division in the apical meristem.",
    tags: ["living-world", "life-cycles", "plants", "germination", "imbibition", "botany"]
  },
  {
    title: "Flowers pollinated primarily by nocturnal moths and bats typically exhibit which suite of co-evolved traits?",
    difficulty: "Medium",
    options: [
      { text: "Pale white or cream-colored petals, intense sweet fragrance at night, and copious nectar rewards", isCorrect: true, explanation: "Because nocturnal pollinators navigate in the dark, bright red or blue colors are useless; strong nocturnal scent plumes and reflective white petals guide moths and bats." },
      { text: "Bright scarlet red petals with zero scent", isCorrect: false, explanation: "Red, unscented flowers are pollinated by diurnal birds (hummingbirds), which have keen red color vision but poor sense of smell." },
      { text: "Completely submerged underwater petals with green camouflage", isCorrect: false, explanation: "Aquatic pollination (hydrophily) occurs in submerged plants like seagrasses." },
      { text: "Black petals that absorb all moonlight completely", isCorrect: false, explanation: "Flowers must reflect faint moonlight to be located by pollinators." }
    ],
    explanation: "Bat- and moth-pollinated flowers open exclusively at dusk, broadcasting strong fragrance to attract night foragers.",
    tags: ["living-world", "life-cycles", "pollination", "coevolution", "adaptation", "botany"]
  },
  {
    title: "The hydra, a small freshwater cnidarian, frequently reproduces asexually by growing an outgrowth from its body column that detaches as a clone, a process called:",
    difficulty: "Easy",
    options: [
      { text: "Budding", isCorrect: true, explanation: "During budding, mitosis creates an exact genetic miniature copy of the parent along the body column, developing tentacles and a mouth before pinching off." },
      { text: "Fragmentation", isCorrect: false, explanation: "Fragmentation involves breaking into multiple body pieces that regenerate (e.g., planarians)." },
      { text: "Binary fission", isCorrect: false, explanation: "Binary fission is cellular division typical of single-celled bacteria and amoebas." },
      { text: "Sporogenesis", isCorrect: false, explanation: "Sporogenesis is spore formation in fungi and seedless plants." }
    ],
    explanation: "Budding allows hydras to rapidly multiply in nutrient-rich waters without expending energy finding sexual mates.",
    tags: ["living-world", "life-cycles", "budding", "asexual-reproduction", "cnidaria", "zoology"]
  },
  {
    title: "Why do sea turtles, salmon, and monarch butterflies undertake perilous multi-thousand-kilometer migrations back to their exact natal birthplaces?",
    difficulty: "Easy",
    options: [
      { text: "To spawn and reproduce in the proven environmental conditions where their own survival succeeded", isCorrect: true, explanation: "Natal philopatry guarantees that offspring begin life in habitats with proven resources, using geomagnetic imprinting and olfactory cues to navigate." },
      { text: "Because ocean currents force them backwards against their will", isCorrect: false, explanation: "They actively swim thousands of kilometers against prevailing currents." },
      { text: "To escape the pull of lunar gravity", isCorrect: false, explanation: "Lunar cycles influence tides, but do not dictate migration destinations." },
      { text: "To undergo complete metamorphosis into terrestrial reptiles", isCorrect: false, explanation: "Salmon remain fish and sea turtles remain marine reptiles." }
    ],
    explanation: "Natal homing ensures eggs and fry hatch in the optimal geographic nursery environment proven by evolutionary generations.",
    tags: ["living-world", "life-cycles", "migration", "homing", "behavior", "zoology"]
  },
  {
    title: "In mosses and ferns, why are flagellated male sperm cells produced only in damp conditions?",
    difficulty: "Easy",
    options: [
      { text: "The sperm must physically swim through a film of liquid water to reach and fertilize the non-motile female egg cell inside the archegonium", isCorrect: true, explanation: "Unlike seed plants which use wind- or insect-borne pollen tubes that do not require water, primitive land plants rely on swimming sperm cells." },
      { text: "Water provides electricity that powers the sperm's mitochondria", isCorrect: false, explanation: "Sperm use ATP generated by cellular respiration, not water electricity." },
      { text: "Dry air instantly combusts all plant cells", isCorrect: false, explanation: "Plant cells do not combust in air." },
      { text: "Female eggs are located 10 meters underwater in the deep ocean", isCorrect: false, explanation: "Mosses and ferns are terrestrial land plants growing in damp soil and rock." }
    ],
    explanation: "Lacking pollen tubes, seedless plants are constrained to damp microhabitats where raindrops allow sperm to swim to eggs.",
    tags: ["living-world", "life-cycles", "plants", "bryophytes", "reproduction", "botany"]
  },
  {
    title: "Aphids (plant lice) demonstrate cyclical parthenogenesis, meaning that:",
    difficulty: "Medium",
    options: [
      { text: "Females reproduce asexually via all-female live birth throughout spring and summer to rapidly colonize plants, then produce males and females in autumn for sexual reproduction", isCorrect: true, explanation: "Telescoping generations allow a female aphid to carry embryos that already carry embryos inside them in summer, switching to sexual egg-laying in autumn to survive winter freezes." },
      { text: "They reproduce exclusively inside the bodies of ladybugs", isCorrect: false, explanation: "Ladybugs are predators that eat aphids." },
      { text: "They alternate between being insects in summer and worms in winter", isCorrect: false, explanation: "They remain hemipteran insects throughout their life cycle." },
      { text: "Males fertilize eggs while flying backwards at midnight", isCorrect: false, explanation: "Mating occurs normally on host plant stems in autumn." }
    ],
    explanation: "Summer parthenogenesis maximizes rapid population boom, while autumn sexual reproduction generates genetic diversity and cold-hardy overwintering eggs.",
    tags: ["living-world", "life-cycles", "aphids", "parthenogenesis", "insects", "adaptation"]
  },
  {
    title: "In mammals, the embryonic organ that connects the developing fetus to the uterine wall of the mother, facilitating nutrient uptake, waste elimination, and gas exchange, is:",
    difficulty: "Easy",
    options: [
      { text: "The placenta", isCorrect: true, explanation: "Formed from fetal chorionic villi and maternal endometrium, the placenta acts as the lungs, kidneys, and digestive tract for the developing eutherian mammal." },
      { text: "The marsupium", isCorrect: false, explanation: "The marsupium is the external abdominal pouch found on marsupials." },
      { text: "The gizzard", isCorrect: false, explanation: "The gizzard is a muscular bird stomach chamber used to grind seeds." },
      { text: "The gall bladder", isCorrect: false, explanation: "The gall bladder stores liver bile to emulsify dietary fats." }
    ],
    explanation: "The placenta allows placental mammals to carry offspring to an advanced developmental stage inside the protective maternal body.",
    tags: ["living-world", "life-cycles", "mammals", "placenta", "reproduction", "zoology"]
  },

  // ==========================================
  // SECTION 6: ADAPTATIONS & SURVIVAL (Questions 76 to 90)
  // ==========================================
  {
    title: "What is the key difference between Batesian mimicry and Müllerian mimicry?",
    difficulty: "Hard",
    options: [
      { text: "In Batesian mimicry, a harmless, edible mimic copies a dangerous, toxic model; in Müllerian mimicry, two or more genuinely toxic species share similar warning patterns", isCorrect: true, explanation: "Batesian mimicry is a parasitic bluff (e.g., hoverfly mimicking a stinging hornet); Müllerian mimicry is cooperative reinforcement of predator learning (e.g., bees and wasps sharing yellow-black stripes)." },
      { text: "Batesian mimicry occurs only in plants, while Müllerian mimicry occurs only in fish", isCorrect: false, explanation: "Both forms of mimicry occur widely across insects, amphibians, reptiles, and fish." },
      { text: "In Batesian mimicry, the mimic is more toxic than the model", isCorrect: false, explanation: "The Batesian mimic is harmless and palatable." },
      { text: "Müllerian mimicry requires animals to hide under rocks during daytime", isCorrect: false, explanation: "Mimicry involves visible coloration and warning signals, not cave hiding." }
    ],
    explanation: "Müllerian mimics mutually reinforce predator avoidance, whereas Batesian mimics depend on remaining rarer than the toxic model they copy.",
    tags: ["living-world", "adaptations", "mimicry", "batesian", "mullerian", "evolution"]
  },
  {
    title: "Animals with countershading (such as great white sharks, mackerel, and penguins) possess what distinctive color pattern for aquatic camouflage?",
    difficulty: "Medium",
    options: [
      { text: "A dark dorsal (top) surface that blends with deep ocean depths when viewed from above, and a pale ventral (belly) surface that blends with sunlit surface waters when viewed from below", isCorrect: true, explanation: "Countershading breaks the 3D optical shadow of an animal's body in downwelling light, making aquatic predators and prey virtually invisible from both directions." },
      { text: "Bright neon orange stripes along their spine that glow in the dark", isCorrect: false, explanation: "Countershading is cryptic camouflage, not glowing warning coloration." },
      { text: "A body that changes from solid green in the morning to bright purple at night", isCorrect: false, explanation: "Countershading is permanent structural pigmentation." },
      { text: "A reflective mirror shell that bounces radar pulses back to ships", isCorrect: false, explanation: "Countershading counteracts natural solar illumination in water." }
    ],
    explanation: "Looking down into dark deep water, the dark back blends into the abyss; looking up toward sunlight, the white belly merges with downwelling light.",
    tags: ["living-world", "adaptations", "camouflage", "countershading", "marine-life", "zoology"]
  },
  {
    title: "Xerophytic plants native to hyper-arid deserts (such as saguaro cacti) utilize which specialized photosynthetic adaptation to minimize daytime water transpiration?",
    difficulty: "Hard",
    options: [
      { text: "Crassulacean Acid Metabolism (CAM photosynthesis): opening stomata only at night to fix CO2 into malic acid, keeping stomata closed during blistering daytime heat", isCorrect: true, explanation: "By fixing $CO_2$ into organic acids in the cool of the night, CAM plants can run the Calvin cycle during the day with sealed stomata, reducing transpirational water loss by over 80%." },
      { text: "Producing giant leaves measuring 5 meters wide to collect rain", isCorrect: false, explanation: "Desert plants reduce leaf surface area into sharp spines to minimize evaporation." },
      { text: "Pumping boiling mineral water from deep magma plumes into stem tissues", isCorrect: false, explanation: "Cacti store cool rainwater in fleshy parenchymatous stem succulent tissues." },
      { text: "Extracting oxygen directly from quartz crystals in granite sand", isCorrect: false, explanation: "Plants absorb atmospheric gases via stomata, not crystalline rocks." }
    ],
    explanation: "CAM photosynthesis decouples gas exchange from daytime heat, enabling cacti and succulents to survive months of severe drought.",
    tags: ["living-world", "adaptations", "plants", "cam-photosynthesis", "xerophytes", "botany"]
  },
  {
    title: "What is 'aposematism' in behavioral ecology?",
    difficulty: "Medium",
    options: [
      { text: "Conspicuous, vibrant warning coloration or patterns (such as red, yellow, and black) advertising an organism's toxicity, venom, or unpalatability to predators", isCorrect: true, explanation: "Seen in poison dart frogs, skunks, monarch butterflies, and coral snakes, aposematic signals teach naive predators to associate bright colors with lethal toxins or severe pain." },
      { text: "An animal pretending to be dead to avoid predatory pursuit", isCorrect: false, explanation: "That is thanatosis (tonic immobility or playing possum)." },
      { text: "Shedding one's tail to distract a predator", isCorrect: false, explanation: "That is caudal autotomy, seen in lizards." },
      { text: "The gradual loss of eyesight in subterranean cave animals", isCorrect: false, explanation: "That is regressive troglobitic evolution." }
    ],
    explanation: "Aposematism is the opposite of camouflage; it deliberately makes the toxic animal highly visible so predators learn to avoid attacking.",
    tags: ["living-world", "adaptations", "aposematism", "warning-coloration", "predators", "zoology"]
  },
  {
    title: "How does 'estivation' differ from winter 'hibernation'?",
    difficulty: "Easy",
    options: [
      { text: "Estivation is a state of metabolic dormancy entered during hot, hyper-arid summer periods to survive drought, while hibernation occurs in response to freezing winter cold", isCorrect: true, explanation: "African lungfishes, desert tortoises, and land snails estivate by sealing themselves in mud cocoons or burrows, dropping metabolic rates until rains return." },
      { text: "Estivation occurs exclusively in birds, while hibernation occurs only in reptiles", isCorrect: false, explanation: "Many amphibians, reptiles, mollusks, and small mammals estivate or hibernate." },
      { text: "Estivation requires continuous eating of ice crystals", isCorrect: false, explanation: "Estivation is a dormant fasting state during summer heat." },
      { text: "Hibernating animals migrate to the equator, while estivating animals migrate to the North Pole", isCorrect: false, explanation: "Both involve staying in local burrows or shelters in suspended animation." }
    ],
    explanation: "Estivation avoids summer desiccation and heat death; hibernation avoids winter starvation and freezing.",
    tags: ["living-world", "adaptations", "estivation", "hibernation", "dormancy", "zoology"]
  },
  {
    title: "The kangaroo rat (Dipodomys) of North American deserts survives its entire adult life without ever drinking free liquid water by:",
    difficulty: "Hard",
    options: [
      { text: "Deriving 90% of its moisture from metabolic water generated during cellular respiration of dry seeds, aided by ultra-concentrated urine from elongated Loops of Henle", isCorrect: true, explanation: "Oxidizing 1 gram of carbohydrate or fat yields nearly 1 gram of metabolic water ($H_2O$); super-efficient kidneys and dry nasal passages recover almost all evaporated moisture." },
      { text: "Absorbing ocean water vapor through gills on its tail", isCorrect: false, explanation: "Kangaroo rats are terrestrial desert rodents with mammalian lungs." },
      { text: "Hunting poisonous scorpions and drinking only their blood", isCorrect: false, explanation: "Kangaroo rats are primarily granivores eating dry grass seeds." },
      { text: "Digging 500 feet into subterranean freshwater geysers", isCorrect: false, explanation: "They live in shallow sandy burrows and do not access deep aquifers." }
    ],
    explanation: "Hyper-efficient elongated Loops of Henle produce urine 5 times more concentrated than human urine, minimizing water excretion.",
    tags: ["living-world", "adaptations", "kangaroo-rat", "desert", "metabolism", "zoology"]
  },
  {
    title: "Why do polar cod (Boreogadus saida) and Antarctic notothenioid icefish not freeze solid when swimming in seawater chilled to -1.9°C (below the freezing point of fresh blood)?",
    difficulty: "Medium",
    options: [
      { text: "Their blood contains specialized antifreeze glycoproteins (AFGPs) that bind to microscopic ice crystals, arresting ice lattice growth", isCorrect: true, explanation: "Antifreeze proteins lower the non-equilibrium freezing point of body fluids by adsorbing onto ice crystal surfaces through non-colligative thermal hysteresis." },
      { text: "They maintain internal furnace body temperatures of 60°C", isCorrect: false, explanation: "They are ectothermic teleost fishes whose bodies match the freezing ocean water temperature." },
      { text: "Their blood is composed of 100% engine motor oil", isCorrect: false, explanation: "Their circulatory system is water-based with hemoglobin or clear hemolymph enriched with AFGPs." },
      { text: "They swim at supersonic speeds so ice cannot catch them", isCorrect: false, explanation: "They swim at leisurely speeds beneath sea ice sheets." }
    ],
    explanation: "Antifreeze glycoproteins act as biological crystal stoppers, keeping blood liquid in sub-zero polar seas.",
    tags: ["living-world", "adaptations", "antifreeze-proteins", "polar", "marine-life", "zoology"]
  },
  {
    title: "The broad, paddle-like leaves of tropical forest understory plants (such as Monsteras and Philodendrons) are an adaptation to:",
    difficulty: "Easy",
    options: [
      { text: "Capture scarce, low-intensity diffuse sunlight filtering through the dense canopy above", isCorrect: true, explanation: "With less than 2% of sunlight reaching the forest floor, understory plants maximize photosynthetic surface area with enormous broad leaves containing high concentrations of chlorophyll b." },
      { text: "Reflect excess sunlight to keep from catching fire", isCorrect: false, explanation: "The understory is dark and humid, with scarce sunlight." },
      { text: "Act as umbrellas that keep tree trunks completely dry during monsoons", isCorrect: false, explanation: "Leaves are adaptations for light harvesting, not umbrella protection." },
      { text: "Catch falling dead birds to digest as meat", isCorrect: false, explanation: "Understory plants are autotrophic photoautotrophs." }
    ],
    explanation: "Giant leaf surface area compensates for deep canopy shade, capturing faint sunflecks that breach the tree canopy.",
    tags: ["living-world", "adaptations", "plants", "rainforest", "photosynthesis", "botany"]
  },
  {
    title: "Tardigrades (water bears) survive extreme desiccation, vacuum, and radiation by synthesizing unique intrinsically disordered proteins that cause:",
    difficulty: "Hard",
    options: [
      { text: "Vitrification: transforming the intracellular fluid into a protective glass-like matrix that immobilizes enzymes and prevents membrane collapse", isCorrect: true, explanation: "Tardigrade intrinsically disordered proteins (TDPs) form non-crystalline biological glass during anhydrobiosis, protecting cellular structures without water." },
      { text: "Immediate spontaneous generation of a diamond shell", isCorrect: false, explanation: "They form a shriveled 'tun' state utilizing organic glass vitrification, not diamonds." },
      { text: "Evaporation of all DNA into hydrogen gas", isCorrect: false, explanation: "DNA is carefully preserved and shielded by unique Dsup (damage suppressor) proteins." },
      { text: "Binary fission into 10,000 bacterial spores", isCorrect: false, explanation: "The individual tardigrade survives and rehydrates back to active life." }
    ],
    explanation: "Cytoplasmic vitrification turns cells into bioglass, halting all metabolic decay until moisture returns.",
    tags: ["living-world", "adaptations", "tardigrades", "cryptobiosis", "extremophiles", "zoology"]
  },
  {
    title: "Why do zebras possess high-contrast black-and-white vertical stripes across their bodies?",
    difficulty: "Medium",
    options: [
      { text: "It deters biting tsetse flies and horseflies by confusing their polarized vision, while creating optical motion dazzle against pursuing predators", isCorrect: true, explanation: "Recent entomological experiments confirm biting tabanid flies fail to land on striped surfaces due to disrupted visual polarization, alongside thermal airflow cooling and herd motion camouflage." },
      { text: "It allows zebras to blend into dense polar snowfields", isCorrect: false, explanation: "Zebras inhabit tropical African savannas, not polar snow." },
      { text: "The black stripes absorb solar heat while white stripes glow in the dark", isCorrect: false, explanation: "Stripes do not exhibit bioluminescent glowing." },
      { text: "It signals to lions that zebra meat is toxic and inedible", isCorrect: false, explanation: "Zebras are non-toxic herbivores heavily hunted by lions." }
    ],
    explanation: "Narrow stripes disrupt the visual targeting systems of biting flies that transmit deadly trypanosome parasites.",
    tags: ["living-world", "adaptations", "zebras", "stripes", "camouflage", "zoology"]
  },
  {
    title: "Woodpeckers slam their beaks into tree trunks at 20 times per second with decelerations of 1,200 g without suffering brain damage due to:",
    difficulty: "Medium",
    options: [
      { text: "A spongy, shock-absorbing cranial bone, an elongated hyoid bone that wraps completely around the skull like a safety belt, and tightly packed cerebrospinal fluid", isCorrect: true, explanation: "The wrap-around hyoid apparatus acts as an internal shock harness, distributing kinetic energy away from the brain, which has little space inside the skull to rattle." },
      { text: "Having no brain tissue inside their skull cavity", isCorrect: false, explanation: "Woodpeckers have fully developed avian brains with keen spatial memory." },
      { text: "Soft, rubbery rubber-like beaks that bend like elastic sponges", isCorrect: false, explanation: "Their beaks are made of extremely stiff, self-sharpening keratin and bone." },
      { text: "Releasing liquid helium into their ears to freeze brain cells solid", isCorrect: false, explanation: "Biologically impossible." }
    ],
    explanation: "Biomechanical architecture—spongy skull bone, wrap-around hyoid sling, and straight-line pecking trajectory—prevents rotational brain shear.",
    tags: ["living-world", "adaptations", "woodpecker", "biomechanics", "birds", "zoology"]
  },
  {
    title: "The Arctic hare (Lepus arcticus) has evolved shorter ears, shorter legs, and a stocky body compared to desert jackrabbits, a classic demonstration of:",
    difficulty: "Medium",
    options: [
      { text: "Allen's Rule: endothermic animals in colder climates have shorter extremities and appendages to minimize surface-area heat loss", isCorrect: true, explanation: "Formulated by Joel Asaph Allen in 1877, Allen's rule notes that cold-climate animals minimize exposed appendages (ears, limbs, tails) to conserve body heat, while desert species have large ears for cooling." },
      { text: "Bergmann's Rule", isCorrect: false, explanation: "Bergmann's Rule states that overall body size increases in colder latitudes (mass-to-surface ratio)." },
      { text: "Gloger's Rule", isCorrect: false, explanation: "Gloger's Rule states that animals in warm, humid regions develop darker pigmentation." },
      { text: "Cope's Rule", isCorrect: false, explanation: "Cope's Rule posits that population lineages tend to increase in body size over evolutionary time." }
    ],
    explanation: "Allen's rule explains why Arctic hares have stubby ears, while desert jackrabbits have enormous ears that radiate excess body heat.",
    tags: ["living-world", "adaptations", "allens-rule", "thermoregulation", "arctic", "zoology"]
  },
  {
    title: "Why does the South American three-toed sloth (Bradypus) move at an agonizingly slow pace through the rainforest canopy?",
    difficulty: "Easy",
    options: [
      { text: "It possesses an exceptionally low basal metabolic rate adapted to an energy-poor leaf diet, while its slowness makes it undetectable to visual predators like harpy eagles", isCorrect: true, explanation: "Leaves contain little digestible energy; moving slowly burns minimal calories and renders sloths virtually invisible to raptors that detect motion." },
      { text: "Its limbs are paralyzed by toxic tree sap", isCorrect: false, explanation: "Sloths have powerful grasping claws and muscular coordination for hanging." },
      { text: "It is an ectotherm that cools to 0°C every afternoon", isCorrect: false, explanation: "Sloths are mammals, though with a lower and more variable body temperature than most." },
      { text: "It carries a 50 kg shell of limestone on its back", isCorrect: false, explanation: "Sloths have light mammalian skeletons without mineral shells." }
    ],
    explanation: "Slowness is a brilliant evolutionary energy conservation and anti-predator crypsis strategy.",
    tags: ["living-world", "adaptations", "sloth", "metabolism", "camouflage", "zoology"]
  },
  {
    title: "The thick, waxy cuticle covering the epidermis of desert succulent leaves serves what primary survival role?",
    difficulty: "Easy",
    options: [
      { text: "Creating an impermeable hydrophobic barrier that prevents non-stomatal water evaporation into dry desert air", isCorrect: true, explanation: "Composed of cutin and lipid waxes, the cuticle seals moisture inside plant tissues, ensuring water is lost only through tightly regulated stomatal pores." },
      { text: "Attracting nocturnal herbivorous caterpillars to pollinate flowers", isCorrect: false, explanation: "Caterpillars chew leaves and are destructive pests, not pollinators." },
      { text: "Generating electrical sparks that ward off grazing deer", isCorrect: false, explanation: "The cuticle is an inert lipid barrier, not an electric generator." },
      { text: "Reflecting all visible light so the plant cannot perform photosynthesis", isCorrect: false, explanation: "It permits light transmission to underlying photosynthetic palisade cells." }
    ],
    explanation: "A thick hydrophobic wax layer is a universal hallmark of xerophytic plants conserving precious moisture.",
    tags: ["living-world", "adaptations", "plants", "cuticle", "xerophytes", "botany"]
  },
  {
    title: "Cuttlefish and octopuses can instantly change the three-dimensional texture of their skin (from smooth to bumpy like coral) using:",
    difficulty: "Hard",
    options: [
      { text: "Dermal papillae: tiny rings of muscular hydrostats that push sections of skin upward into spiky projections", isCorrect: true, explanation: "Erector muscles in dermal papillae flex under nervous control to alter skin texture within 200 milliseconds, mimicking coarse gravel or spiky algae." },
      { text: "Subcutaneous air bladders that inflate like bubble wrap", isCorrect: false, explanation: "Texture change is muscular (papillae), not pneumatic air bladders." },
      { text: "Growing real calcium carbonate coral branches out of their pores", isCorrect: false, explanation: "They do not secrete coral; they reshape their own skin surface." },
      { text: "Shedding their outer epidermal layer in flakes", isCorrect: false, explanation: "Texture change is instantaneous and reversible without shedding." }
    ],
    explanation: "Combining pigment chromatophores, reflective iridophores, and physical muscular papillae, cephalopods achieve true 3D camouflage.",
    tags: ["living-world", "adaptations", "cephalopods", "camouflage", "papillae", "marine-life"]
  },

  // ==========================================
  // SECTION 7: CLASSIFICATION & TAXONOMY (Questions 91 to 100)
  // ==========================================
  {
    title: "In the standard Linnaean taxonomic hierarchy, which sequence correctly arranges taxonomic ranks from broadest to most specific?",
    difficulty: "Easy",
    options: [
      { text: "Domain -> Kingdom -> Phylum -> Class -> Order -> Family -> Genus -> Species", isCorrect: true, explanation: "Mnemonic: 'Dear King Philip Came Over For Good Soup' (Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species)." },
      { text: "Kingdom -> Domain -> Class -> Phylum -> Family -> Order -> Genus -> Species", isCorrect: false, explanation: "Domain is broader than Kingdom; Phylum precedes Class." },
      { text: "Species -> Genus -> Family -> Order -> Class -> Phylum -> Kingdom -> Domain", isCorrect: false, explanation: "This is inverted (most specific to broadest)." },
      { text: "Domain -> Phylum -> Kingdom -> Order -> Class -> Family -> Genus -> Species", isCorrect: false, explanation: "Kingdom precedes Phylum; Class precedes Order." }
    ],
    explanation: "Linnaean hierarchy proceeds from universal domains down to individual reproductive species units.",
    tags: ["living-world", "classification", "taxonomy", "linnaean", "life-sciences-health"]
  },
  {
    title: "According to Carl Linnaeus's system of binomial nomenclature, how must the scientific name of an organism (such as the African lion) be properly formatted in print?",
    difficulty: "Easy",
    options: [
      { text: "Panthera leo (Genus capitalized, specific epithet lowercase, both italicized)", isCorrect: true, explanation: "The genus begins with a capital letter, the species epithet is lowercase, and the two-part Latin name is italicized (or underlined if handwritten)." },
      { text: "panthera Leo", isCorrect: false, explanation: "Genus must be capitalized; species must be lowercase." },
      { text: "Panthera Leo", isCorrect: false, explanation: "Species epithet must never be capitalized." },
      { text: "PANTHERA LEO", isCorrect: false, explanation: "All-caps violates binomial nomenclature standards." }
    ],
    explanation: "Standard binomial nomenclature format: *Genus species* (e.g., *Homo sapiens*, *Canis lupus*).",
    tags: ["living-world", "classification", "binomial-nomenclature", "taxonomy", "life-sciences-health"]
  },
  {
    title: "Under Carl Woese's Three-Domain System established in 1990 based on ribosomal RNA (rRNA) sequencing, all living organisms are grouped into which three primary domains?",
    difficulty: "Medium",
    options: [
      { text: "Bacteria, Archaea, and Eukarya", isCorrect: true, explanation: "Woese demonstrated that prokaryotes consist of two fundamentally distinct domains (Bacteria and Archaea) with distinct membrane lipids and RNA polymerases, alongside nucleus-bearing Eukarya." },
      { text: "Plants, Animals, and Microbes", isCorrect: false, explanation: "Plants and animals are kingdoms within the single domain Eukarya." },
      { text: "Vertebrates, Invertebrates, and Fungi", isCorrect: false, explanation: "Vertebrates and invertebrates are sub-groups of the animal kingdom." },
      { text: "Viruses, Bacteria, and Protists", isCorrect: false, explanation: "Viruses are non-cellular entities not classified as a cellular domain." }
    ],
    explanation: "Archaea, though prokaryotic without nuclei, share closer biochemical and transcription homology with Eukarya than with true Bacteria.",
    tags: ["living-world", "classification", "three-domains", "archaea", "bacteria", "eukarya", "taxonomy"]
  },
  {
    title: "Fungi (mushrooms, molds, yeasts) were historically grouped with plants, but modern taxonomy recognizes them as a distinct kingdom more closely related to animals because:",
    difficulty: "Medium",
    options: [
      { text: "Their cell walls are made of chitin (not plant cellulose), they are heterotrophic absorptive feeders, and they store energy as glycogen", isCorrect: true, explanation: "Fungi do not photosynthesize; they secrete digestive enzymes to absorb nutrients from their environment and share chitin and glycogen biochemistry with animals (forming the supergroup Opisthokonta)." },
      { text: "Fungi possess warm blood and four-chambered hearts", isCorrect: false, explanation: "Fungi lack blood and cardiovascular organs." },
      { text: "Fungi have eyes and hunt active prey using tentacles", isCorrect: false, explanation: "Fungi are sessile organisms growing hyphal mycelium networks." },
      { text: "Fungi produce bird feathers during sexual reproduction", isCorrect: false, explanation: "Fungi produce spores, not avian feathers." }
    ],
    explanation: "Chitinous cell walls, heterotrophy, and glycogen storage unite fungi and animals within Opisthokonta, completely distinct from green plants.",
    tags: ["living-world", "classification", "fungi", "taxonomy", "evolution", "life-sciences-health"]
  },
  {
    title: "In evolutionary biology, what distinguishes 'homologous structures' from 'analogous structures'?",
    difficulty: "Medium",
    options: [
      { text: "Homologous structures share a common ancestral anatomical origin despite different modern functions (e.g., human arm and bat wing); analogous structures share a similar function but evolved independently via convergent evolution (e.g., bat wing and butterfly wing)", isCorrect: true, explanation: "Homology reflects divergence from a shared ancestral skeleton; analogy reflects convergent evolutionary adaptation to similar environmental pressures." },
      { text: "Homologous structures are artificial, while analogous structures are natural", isCorrect: false, explanation: "Both are natural morphological phenomena." },
      { text: "Homologous structures exist only in plants, while analogous structures exist only in bacteria", isCorrect: false, explanation: "Both concepts apply across all cellular life." },
      { text: "Homologous structures perform identical mechanical work, while analogous structures have no function", isCorrect: false, explanation: "Homologous structures often perform very different functions (swimming vs flying vs grasping)." }
    ],
    explanation: "The shared bone pattern (humerus, radius, ulna, carpals) of human arms, whale flippers, and bat wings demonstrates common vertebrate homology.",
    tags: ["living-world", "classification", "homology", "convergent-evolution", "analogous-structures", "evolution"]
  },
  {
    title: "According to Ernst Mayr's widely accepted Biological Species Concept, a species is defined as:",
    difficulty: "Medium",
    options: [
      { text: "A group of interbreeding natural populations that can produce fertile, viable offspring and are reproductively isolated from other such groups", isCorrect: true, explanation: "Mules are sterile hybrids of horses and donkeys, proving that horses (*Equus caballus*) and donkeys (*Equus asinus*) are distinct biological species." },
      { text: "Any group of animals that look visually identical in outward appearance", isCorrect: false, explanation: "Cryptic species can look identical while being reproductively isolated." },
      { text: "All organisms that inhabit the same continent", isCorrect: false, explanation: "Millions of distinct species share the same continent." },
      { text: "A collection of animals that share exactly 100% of their DNA sequences", isCorrect: false, explanation: "Individual members of a species exhibit natural genetic variation." }
    ],
    explanation: "Reproductive isolation and the ability to produce fertile offspring form the bedrock of the Biological Species Concept.",
    tags: ["living-world", "classification", "species-concept", "evolution", "taxonomy", "life-sciences-health"]
  },
  {
    title: "In cladistics and phylogenetic trees, a 'monophyletic group' (or clade) consists of:",
    difficulty: "Hard",
    options: [
      { text: "A common ancestral species and ALL of its evolutionary descendants", isCorrect: true, explanation: "A valid clade (monophyly) includes the common ancestor and all lineages branching from it (e.g., mammals, or birds within theropod dinosaurs)." },
      { text: "An ancestor and only some of its descendants while excluding others", isCorrect: false, explanation: "That is a paraphyletic group (e.g., traditional 'reptiles' excluding birds)." },
      { text: "Unrelated species grouped together solely by shared superficial traits", isCorrect: false, explanation: "That is a polyphyletic group (e.g., warm-blooded animals grouping mammals and birds)." },
      { text: "A group containing zero common ancestors", isCorrect: false, explanation: "All biological groups share common ancestry." }
    ],
    explanation: "Modern cladistics requires monophyletic clades to reflect true evolutionary history rather than arbitrary visual similarities.",
    tags: ["living-world", "classification", "cladistics", "phylogenetics", "monophyly", "evolution"]
  },
  {
    title: "Why are viruses excluded from the standard Five-Kingdom and Three-Domain cellular classifications of life?",
    difficulty: "Easy",
    options: [
      { text: "They lack cellular structure (acellular), carry out no independent metabolism, and cannot replicate without hijacking a host cell's machinery", isCorrect: true, explanation: "Viruses are obligate intracellular genetic packages (DNA or RNA wrapped in a protein capsid) lacking ribosomes, ATP synthesis, and cell membranes." },
      { text: "They are too large to be classified with microscopic bacteria", isCorrect: false, explanation: "Viruses are nanoscopic, 10 to 100 times smaller than bacteria." },
      { text: "They contain pure water without any nucleic acids", isCorrect: false, explanation: "All viruses possess genetic material (either DNA or RNA)." },
      { text: "They were synthesized artificially in a laboratory in 1985", isCorrect: false, explanation: "Viruses are ancient biological entities with billions of years of co-evolutionary history." }
    ],
    explanation: "Because they do not satisfy the cell theory of life and lack independent metabolic machinery, viruses are classified separately under viral taxonomy (ICTV).",
    tags: ["living-world", "classification", "viruses", "cell-theory", "taxonomy", "life-sciences-health"]
  },
  {
    title: "Which of the following organisms belongs to the Kingdom Protista in traditional five-kingdom taxonomy?",
    difficulty: "Easy",
    options: [
      { text: "Amoeba proteus", isCorrect: true, explanation: "Protists are predominantly single-celled eukaryotic microorganisms that are not plants, animals, or true fungi (e.g., Amoeba, Paramecium, Euglena)." },
      { text: "Escherichia coli", isCorrect: false, explanation: "E. coli is a prokaryotic bacterium in Kingdom Monera / Domain Bacteria." },
      { text: "Button mushroom (Agaricus bisporus)", isCorrect: false, explanation: "Mushrooms are multicellular fungi in Kingdom Fungi." },
      { text: "Oak tree (Quercus robur)", isCorrect: false, explanation: "Oak trees are vascular plants in Kingdom Plantae." }
    ],
    explanation: "Protists encompass diverse unicellular and simple colonial eukaryotes, bridging prokaryotes and complex multicellular kingdoms.",
    tags: ["living-world", "classification", "protists", "amoeba", "taxonomy", "life-sciences-health"]
  },
  {
    title: "What is an organism's 'scientific name' constructed from under the rules of the International Code of Zoological Nomenclature (ICZN)?",
    difficulty: "Easy",
    options: [
      { text: "The Genus name followed by the specific Species epithet", isCorrect: true, explanation: "The two-part Latin name specifies the genus to which the organism belongs followed by its unique species epithet (e.g., *Canis lupus* for the grey wolf)." },
      { text: "The Kingdom name followed by the Family name", isCorrect: false, explanation: "Kingdom and Family are higher, broader taxonomic ranks." },
      { text: "The country of discovery followed by the discoverer's surname", isCorrect: false, explanation: "Scientific names use binomial Latin or Greek descriptors." },
      { text: "The Phylum name followed by the Class name", isCorrect: false, explanation: "Phylum and Class designate broad anatomical plans, not species." }
    ],
    explanation: "Binomial nomenclature provides an unambiguous, universal international scientific label immune to confusing local common names.",
    tags: ["living-world", "classification", "binomial-nomenclature", "taxonomy", "zoology", "life-sciences-health"]
  }
];
