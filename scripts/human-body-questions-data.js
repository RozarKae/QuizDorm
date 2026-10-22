// 100 Comprehensive Questions for "Human Body Heroes"
// Subject: Life Sciences & Health
// Subtopics: Body Systems (20), Sense Organs (15), Nutrition (15), Healthy Habits (15), Diseases (20), First Aid (15)

module.exports = [
  // ==========================================
  // SECTION 1: BODY SYSTEMS (Questions 1 to 20)
  // ==========================================
  {
    title: "Which chamber of the human heart has the thickest muscular myocardium wall to pump oxygenated blood throughout the entire systemic circulation?",
    difficulty: "Easy",
    options: [
      { text: "Left ventricle", isCorrect: true, explanation: "The left ventricle pumps oxygen-rich blood into the aorta against high systemic vascular resistance, requiring a muscular wall three times thicker than the right ventricle." },
      { text: "Right ventricle", isCorrect: false, explanation: "The right ventricle pumps blood into the low-pressure pulmonary circulation to the lungs." },
      { text: "Left atrium", isCorrect: false, explanation: "The left atrium receives oxygenated blood from pulmonary veins and pumps it into the adjacent ventricle under low pressure." },
      { text: "Right atrium", isCorrect: false, explanation: "The right atrium receives deoxygenated blood from the vena cavae." }
    ],
    explanation: "High pressure required to drive blood through head-to-toe systemic circulation demands the powerful muscular contraction of the left ventricle.",
    tags: ["human-body", "body-systems", "circulatory", "heart", "human-physiology", "life-sciences-health"]
  },
  {
    title: "In the human respiratory system, gas exchange (oxygen uptake and carbon dioxide release) occurs across the microscopic membranes of which structures?",
    difficulty: "Easy",
    options: [
      { text: "Alveoli", isCorrect: true, explanation: "Over 300 million microscopic alveoli create an enormous surface area (approx 70-100 m²) wrapped in capillaries for rapid diffusion of O2 and CO2." },
      { text: "Bronchioles", isCorrect: false, explanation: "Bronchioles are muscular conducting air passages, not the primary sites of gas diffusion." },
      { text: "Trachea", isCorrect: false, explanation: "The trachea is the cartilaginous windpipe leading down from the larynx." },
      { text: "Larynx", isCorrect: false, explanation: "The larynx houses the vocal cords (voice box)." }
    ],
    explanation: "The extremely thin respiratory membrane of alveoli and pulmonary capillaries enables rapid passive gas diffusion.",
    tags: ["human-body", "body-systems", "respiratory", "alveoli", "human-physiology", "life-sciences-health"]
  },
  {
    title: "What mechanical action drives inhalation (breathing in) during normal quiet respiration?",
    difficulty: "Medium",
    options: [
      { text: "The diaphragm contracts and flattens downward while external intercostals lift the ribs, expanding thoracic volume and creating negative pressure", isCorrect: true, explanation: "According to Boyle's law, increasing thoracic volume decreases internal pulmonary pressure below atmospheric pressure, drawing outside air into the lungs." },
      { text: "The lungs actively pump like mechanical vacuum pistons", isCorrect: false, explanation: "Lungs contain no muscle tissue and expand passively in response to thoracic pressure changes." },
      { text: "The diaphragm relaxes and arches upward into the chest cavity", isCorrect: false, explanation: "Relaxation and elevation of the diaphragm causes exhalation (breathing out)." },
      { text: "Internal intercostal muscles crush the ribcage downward", isCorrect: false, explanation: "Internal intercostals are active during forced exhalation." }
    ],
    explanation: "Inhalation is an active muscular process driven by diaphragmatic contraction that creates negative intrathoracic suction.",
    tags: ["human-body", "body-systems", "respiratory", "diaphragm", "human-physiology", "life-sciences-health"]
  },
  {
    title: "In a neuron, which anatomical extension is responsible for transmitting electrical action potentials AWAY from the cell body toward other cells?",
    difficulty: "Easy",
    options: [
      { text: "Axon", isCorrect: true, explanation: "The axon conducts action potentials away from the soma toward terminal synaptic boutons to release neurotransmitters." },
      { text: "Dendrite", isCorrect: false, explanation: "Dendrites receive incoming signals from other neurons and convey them toward the cell body." },
      { text: "Nucleus", isCorrect: false, explanation: "The nucleus houses genomic DNA in the cell body (soma)." },
      { text: "Myelin", isCorrect: false, explanation: "Myelin is the insulating lipid sheath wrapping the axon, not the conductive fiber itself." }
    ],
    explanation: "Signals travel directionally: received by dendrites, integrated in the soma, and transmitted away along the axon.",
    tags: ["human-body", "body-systems", "nervous-system", "neuron", "human-physiology", "life-sciences-health"]
  },
  {
    title: "The myelin sheath that insulates peripheral nerve axons, speeding up electrical impulse transmission via saltatory conduction, is produced by:",
    difficulty: "Hard",
    options: [
      { text: "Schwann cells", isCorrect: true, explanation: "In the Peripheral Nervous System (PNS), Schwann cells wrap around axons to form myelin; in the Central Nervous System (CNS), oligodendrocytes produce myelin." },
      { text: "Astrocytes", isCorrect: false, explanation: "Astrocytes form the blood-brain barrier and support synaptic nutrition." },
      { text: "Microglia", isCorrect: false, explanation: "Microglia act as the resident immune macrophages of the central nervous system." },
      { text: "Ependymal cells", isCorrect: false, explanation: "Ependymal cells line ventricles and secrete cerebrospinal fluid (CSF)." }
    ],
    explanation: "Gaps in the myelin sheath called Nodes of Ranvier allow action potentials to jump rapidly at speeds up to 120 m/s (saltatory conduction).",
    tags: ["human-body", "body-systems", "nervous-system", "myelin", "schwann-cells", "human-physiology"]
  },
  {
    title: "Which division of the autonomic nervous system is responsible for the 'fight-or-flight' stress response (dilating pupils, accelerating heartbeat, inhibiting digestion)?",
    difficulty: "Easy",
    options: [
      { text: "Sympathetic nervous system", isCorrect: true, explanation: "The sympathetic system releases norepinephrine and epinephrine, preparing the body for intense physical exertion in the face of danger." },
      { text: "Parasympathetic nervous system", isCorrect: false, explanation: "The parasympathetic division governs 'rest and digest' activities (slowing heart rate, stimulating digestion)." },
      { text: "Somatic nervous system", isCorrect: false, explanation: "The somatic system controls voluntary skeletal muscle movements." },
      { text: "Enteric nervous system", isCorrect: false, explanation: "The enteric system specifically regulates gastrointestinal motility." }
    ],
    explanation: "Sympathetic activation mobilizes glucose, diverts blood to skeletal muscles, and raises blood pressure during emergencies.",
    tags: ["human-body", "body-systems", "nervous-system", "sympathetic", "human-physiology", "life-sciences-health"]
  },
  {
    title: "Where does the chemical digestion of carbohydrates begin in the human digestive tract?",
    difficulty: "Easy",
    options: [
      { text: "The mouth (via salivary amylase / ptyalin)", isCorrect: true, explanation: "Salivary glands secrete amylase, which begins hydrolyzing complex dietary starches into maltose and dextrins during mastication." },
      { text: "The stomach", isCorrect: false, explanation: "The stomach primarily digests proteins using pepsin and hydrochloric acid; salivary amylase is inactivated by stomach acid." },
      { text: "The duodenum", isCorrect: false, explanation: "Pancreatic amylase continues carbohydrate digestion in the duodenum, but it begins in the mouth." },
      { text: "The esophagus", isCorrect: false, explanation: "The esophagus is a muscular transit tube with zero digestive enzyme secretion." }
    ],
    explanation: "Chemical carbohydrate digestion initiates immediately in the oral cavity via salivary amylase.",
    tags: ["human-body", "body-systems", "digestive", "enzymes", "human-physiology", "life-sciences-health"]
  },
  {
    title: "What is the primary physiological function of bile produced by the liver and stored in the gallbladder?",
    difficulty: "Medium",
    options: [
      { text: "Emulsifying large dietary fat globules into microscopic droplets to increase surface area for pancreatic lipase enzymes", isCorrect: true, explanation: "Bile salts act like biological detergents; they contain hydrophobic and hydrophilic ends that break down fat clumps into emulsions for enzymatic breakdown." },
      { text: "Chemically digesting proteins into free amino acids", isCorrect: false, explanation: "Proteins are digested by proteases (pepsin, trypsin, chymotrypsin)." },
      { text: "Absorbing glucose into liver glycogen stores", isCorrect: false, explanation: "Glucose absorption is mediated by insulin-activated transporters." },
      { text: "Secreting hydrochloric acid to kill ingested bacteria", isCorrect: false, explanation: "Hydrochloric acid is secreted by parietal cells in the stomach." }
    ],
    explanation: "Bile contains no enzymes; its bile salts physically emulsify fats so water-soluble lipases can digest triglycerides.",
    tags: ["human-body", "body-systems", "digestive", "liver", "bile", "human-physiology"]
  },
  {
    title: "Over 90% of all nutrient absorption into the bloodstream occurs in which organ of the human digestive tract?",
    difficulty: "Easy",
    options: [
      { text: "Small intestine (specifically the jejunum and ileum)", isCorrect: true, explanation: "Circular folds, villi, and billions of microvilli expand internal surface area to roughly 250 m² for nutrient absorption." },
      { text: "Stomach", isCorrect: false, explanation: "The stomach digests food mechanically and enzymatically, absorbing only water, alcohol, and select medications." },
      { text: "Large intestine (colon)", isCorrect: false, explanation: "The colon primarily absorbs water and electrolytes, forming feces." },
      { text: "Esophagus", isCorrect: false, explanation: "The esophagus is purely a conduit." }
    ],
    explanation: "Microvilli lining the enterocytes of the small intestine absorb monosaccharides, amino acids, fatty acids, and vitamins.",
    tags: ["human-body", "body-systems", "digestive", "small-intestine", "human-physiology", "life-sciences-health"]
  },
  {
    title: "How many bones are present in an adult human skeleton after infantile bones fuse during growth?",
    difficulty: "Easy",
    options: [
      { text: "206 bones", isCorrect: true, explanation: "Infants are born with approximately 270 to 300 bones, which fuse during development into the 206 bones of the adult skeleton." },
      { text: "300 bones", isCorrect: false, explanation: "300 is the approximate count at birth before cranial and sacral fusions occur." },
      { text: "150 bones", isCorrect: false, explanation: "Far too few bones." },
      { text: "500 bones", isCorrect: false, explanation: "Human skeletons have 206 bones." }
    ],
    explanation: "The adult human skeleton comprises 80 axial bones (skull, vertebral column, ribcage) and 126 appendicular bones (limbs and girdles).",
    tags: ["human-body", "body-systems", "skeletal", "bones", "human-physiology", "life-sciences-health"]
  },
  {
    title: "What is the anatomical difference between a tendon and a ligament in the human musculoskeletal system?",
    difficulty: "Easy",
    options: [
      { text: "Tendons attach skeletal muscle to bone; ligaments connect bone to bone at joints", isCorrect: true, explanation: "Tendons (composed of dense regular collagen) transmit muscle pull to move bones; ligaments stabilize articulating bones at joints." },
      { text: "Tendons connect bone to bone; ligaments attach muscle to bone", isCorrect: false, explanation: "This is inverted; tendons connect muscle to bone." },
      { text: "Tendons are made of bone; ligaments are made of cartilage", isCorrect: false, explanation: "Both are dense fibrous connective tissues." },
      { text: "Tendons are found only in the skull; ligaments are found only in knees", isCorrect: false, explanation: "Both exist throughout the entire appendicular and axial skeleton." }
    ],
    explanation: "Tendons pull bones when muscles contract; ligaments restrict abnormal joint movement and prevent dislocations.",
    tags: ["human-body", "body-systems", "skeletal", "muscular", "tendons", "ligaments", "human-physiology"]
  },
  {
    title: "Which type of muscle tissue is involuntary, non-striated, and found in the walls of hollow internal organs (stomach, intestines, blood vessels)?",
    difficulty: "Medium",
    options: [
      { text: "Smooth muscle", isCorrect: true, explanation: "Smooth muscle cells are spindle-shaped with single central nuclei and lack sarcomere striations, contracting involuntarily under autonomic control." },
      { text: "Skeletal muscle", isCorrect: false, explanation: "Skeletal muscle is striated, multinucleated, and voluntary." },
      { text: "Cardiac muscle", isCorrect: false, explanation: "Cardiac muscle is striated, branched with intercalated discs, and found exclusively in the heart." },
      { text: "Rough muscle", isCorrect: false, explanation: "There is no biological muscle type called 'rough muscle'." }
    ],
    explanation: "Smooth muscle mediates peristalsis in the gut and vasodilation/vasoconstriction in arterial blood vessels.",
    tags: ["human-body", "body-systems", "muscular", "smooth-muscle", "human-physiology", "life-sciences-health"]
  },
  {
    title: "What microscopic structural and functional unit of the human kidney filters blood to produce urine?",
    difficulty: "Easy",
    options: [
      { text: "Nephron", isCorrect: true, explanation: "Each kidney contains roughly 1 million nephrons composed of a renal corpuscle (glomerulus) and renal tubule system (Loop of Henle, collecting duct)." },
      { text: "Neuron", isCorrect: false, explanation: "Neurons are nerve cells in the nervous system." },
      { text: "Alveolus", isCorrect: false, explanation: "Alveoli are air sacs in the respiratory system." },
      { text: "Osteon", isCorrect: false, explanation: "Osteons are cylindrical structural units of compact bone." }
    ],
    explanation: "Nephrons filter blood plasma at the glomerulus, reabsorbing water and essential solutes while excreting urea and metabolic wastes.",
    tags: ["human-body", "body-systems", "excretory", "kidney", "nephron", "human-physiology"]
  },
  {
    title: "Red blood cells (erythrocytes) and white blood cells (leukocytes) are produced through hematopoiesis primarily in which tissue?",
    difficulty: "Easy",
    options: [
      { text: "Red bone marrow", isCorrect: true, explanation: "Hematopoietic stem cells in red marrow inside the pelvis, sternum, ribs, and ends of long bones continuously generate all blood cell lineages." },
      { text: "Yellow bone marrow", isCorrect: false, explanation: "Yellow bone marrow consists primarily of adipose fat cells." },
      { text: "The spleen", isCorrect: false, explanation: "The spleen destroys old erythrocytes and filters blood, but adult hematopoiesis occurs in red marrow." },
      { text: "The pancreas", isCorrect: false, explanation: "The pancreas produces digestive enzymes and hormones (insulin/glucagon)." }
    ],
    explanation: "Red bone marrow generates over 2 million new red blood cells every second to replace aging erythrocytes.",
    tags: ["human-body", "body-systems", "skeletal", "circulatory", "bone-marrow", "human-physiology"]
  },
  {
    title: "Which endocrine gland, situated at the base of the brain, is known as the 'master gland' because its hormones regulate other endocrine glands?",
    difficulty: "Easy",
    options: [
      { text: "Pituitary gland (hypophysis)", isCorrect: true, explanation: "Under hypothalamic control, the pituitary secretes trophic hormones (TSH, ACTH, FSH, LH, GH) that direct the thyroid, adrenals, and gonads." },
      { text: "Thyroid gland", isCorrect: false, explanation: "The thyroid regulates metabolic rate, directed by pituitary TSH." },
      { text: "Adrenal gland", isCorrect: false, explanation: "Adrenal glands secrete cortisol and adrenaline in response to pituitary ACTH and sympathetic nerves." },
      { text: "Pineal gland", isCorrect: false, explanation: "The pineal gland secretes melatonin to govern circadian sleep cycles." }
    ],
    explanation: "The anterior and posterior lobes of the pituitary gland control growth, blood pressure, reproduction, and thyroid function.",
    tags: ["human-body", "body-systems", "endocrine", "pituitary", "human-physiology", "life-sciences-health"]
  },
  {
    title: "Why do veins possess one-way internal valves, whereas arteries do not?",
    difficulty: "Medium",
    options: [
      { text: "To prevent backward pooling of blood in low-pressure vessels as it travels against gravity back to the heart", isCorrect: true, explanation: "Arteries carry blood under high pressure generated by the ventricles; veins operate under low pressure, relying on skeletal muscle pumps and valves to prevent backflow." },
      { text: "To oxygenate blood as it flows through the extremities", isCorrect: false, explanation: "Oxygenation occurs exclusively in pulmonary capillary beds in the lungs." },
      { text: "To pump blood by contracting like miniature independent hearts", isCorrect: false, explanation: "Venous valves are passive flap-like folds of endothelium, not muscular hearts." },
      { text: "To filter out viral and bacterial infections", isCorrect: false, explanation: "Lymph nodes filter pathogens, not venous valves." }
    ],
    explanation: "Valves ensure unidirectional blood return toward the heart; when valves fail, blood pools and causes varicose veins.",
    tags: ["human-body", "body-systems", "circulatory", "veins", "valves", "human-physiology"]
  },
  {
    title: "The sliding filament theory of muscle contraction states that skeletal muscle fibers contract when which two protein filaments slide past one another?",
    difficulty: "Hard",
    options: [
      { text: "Actin (thin filaments) and Myosin (thick filaments)", isCorrect: true, explanation: "Myosin heads bind to actin binding sites via ATP hydrolysis, pulling thin filaments inward toward the M-line of the sarcomere." },
      { text: "Keratin and Collagen", isCorrect: false, explanation: "Keratin forms hair/nails; collagen provides tensile extracellular support." },
      { text: "Hemoglobin and Myoglobin", isCorrect: false, explanation: "These are oxygen-binding proteins, not contracting filaments." },
      { text: "Tubulin and Dynein", isCorrect: false, explanation: "Tubulin and dynein power cilia and flagellar motion, not sarcomere muscle contraction." }
    ],
    explanation: "Calcium release from the sarcoplasmic reticulum exposes actin binding sites, allowing myosin cross-bridges to generate power strokes.",
    tags: ["human-body", "body-systems", "muscular", "actin-myosin", "human-physiology", "life-sciences-health"]
  },
  {
    title: "The human lymphatic system plays which two crucial roles in the body?",
    difficulty: "Medium",
    options: [
      { text: "Returning excess interstitial fluid from tissues back into the venous bloodstream and housing immune lymphocytes to fight infections", isCorrect: true, explanation: "Lymph vessels recover 2-3 liters of extravasated fluid daily, routing it through pathogen-filtering lymph nodes before emptying into the subclavian veins." },
      { text: "Pumping oxygen directly into the cerebral cortex", isCorrect: false, explanation: "Oxygen transport is carried out by erythrocytes in the cardiovascular system." },
      { text: "Secreting hydrochloric acid into the urinary bladder", isCorrect: false, explanation: "The bladder stores urine; gastric parietal cells secrete HCl." },
      { text: "Manufacturing bone marrow minerals", isCorrect: false, explanation: "The skeletal system mineralizes bone." }
    ],
    explanation: "Without lymphatic drainage, fluid accumulation leads to severe lymphedema, while lymph nodes mount adaptive immune defenses.",
    tags: ["human-body", "body-systems", "lymphatic", "immune-system", "human-physiology", "life-sciences-health"]
  },
  {
    title: "Which large, C-shaped cartilage rings keep the human trachea (windpipe) permanently patent (open) during breathing?",
    difficulty: "Easy",
    options: [
      { text: "Hyaline cartilage rings", isCorrect: true, explanation: "16 to 20 incomplete C-shaped hyaline rings prevent the trachea from collapsing under negative pressure during inhalation while allowing the adjacent esophagus to expand during swallowing." },
      { text: "Elastic cartilage plates", isCorrect: false, explanation: "Elastic cartilage forms the flexible epiglottis and external ear pinna." },
      { text: "Fibrocartilage discs", isCorrect: false, explanation: "Fibrocartilage forms shock-absorbing intervertebral discs and the pubic symphysis." },
      { text: "Dense bone trabeculae", isCorrect: false, explanation: "The trachea is cartilaginous, not made of mineralized bone." }
    ],
    explanation: "Incomplete rings allow the trachea to remain open without rigid obstruction against the esophagus directly behind it.",
    tags: ["human-body", "body-systems", "respiratory", "trachea", "cartilage", "human-physiology"]
  },
  {
    title: "What is the primary role of the hormone insulin, synthesized and secreted by beta cells in the pancreatic islets of Langerhans?",
    difficulty: "Easy",
    options: [
      { text: "Promoting cellular uptake of glucose from blood into liver, muscle, and adipose cells, thereby lowering blood sugar levels", isCorrect: true, explanation: "Insulin stimulates GLUT4 transporter translocation, storing glucose as glycogen in liver/muscle and triglycerides in fat." },
      { text: "Raising blood sugar levels by breaking down liver glycogen", isCorrect: false, explanation: "Glucagon (from alpha cells) raises blood glucose levels." },
      { text: "Triggering the fight-or-flight stress response", isCorrect: false, explanation: "Adrenaline and noradrenaline trigger fight-or-flight responses." },
      { text: "Stimulating the kidneys to excrete excess calcium", isCorrect: false, explanation: "Calcitonin and parathyroid hormone (PTH) regulate calcium homeostasis." }
    ],
    explanation: "Insulin acts as the primary anabolic storage hormone, reducing hyperglycemia following carbohydrate meals.",
    tags: ["human-body", "body-systems", "endocrine", "insulin", "pancreas", "human-physiology"]
  },

  // ==========================================
  // SECTION 2: SENSE ORGANS (Questions 21 to 35)
  // ==========================================
  {
    title: "In the human eye, what is the functional difference between rod photoreceptors and cone photoreceptors on the retina?",
    difficulty: "Medium",
    options: [
      { text: "Rods operate in low-light (scotopic) vision and detect monochrome contrast; cones operate in bright light (photopic) and mediate high-acuity color vision", isCorrect: true, explanation: "The retina contains roughly 120 million rods (containing rhodopsin) for night vision and 6 million cones (S, M, and L photopsins) clustered at the fovea for color vision." },
      { text: "Rods detect color; cones detect black and white", isCorrect: false, explanation: "Inverted: Cones detect Color; Rods detect low-light contrast." },
      { text: "Rods focus incoming light; cones lubricate the cornea", isCorrect: false, explanation: "The cornea and crystalline lens focus light; lacrimal glands lubricate." },
      { text: "Rods are found in the ear; cones are in the eye", isCorrect: false, explanation: "Both are retinal photoreceptors in the eye." }
    ],
    explanation: "Remember 'C for Cones, C for Color'; cones are concentrated in the central fovea for sharp chromatic resolution.",
    tags: ["human-body", "sense-organs", "vision", "eye", "retina", "human-physiology"]
  },
  {
    title: "What is the smallest bone in the human body, located within the middle ear cavity?",
    difficulty: "Easy",
    options: [
      { text: "Stapes (stirrup)", isCorrect: true, explanation: "Measuring just 3 mm by 2.5 mm, the stapes transmits acoustic vibrations from the incus to the oval window of the fluid-filled cochlea." },
      { text: "Malleus (hammer)", isCorrect: false, explanation: "The malleus is the outermost auditory ossicle attached to the eardrum." },
      { text: "Incus (anvil)", isCorrect: false, explanation: "The incus is the intermediate middle ear ossicle." },
      { text: "Hyoid", isCorrect: false, explanation: "The hyoid is a horseshoe-shaped bone in the anterior neck." }
    ],
    explanation: "The three auditory ossicles (malleus, incus, and stapes) amplify sound waves from the eardrum to the inner ear.",
    tags: ["human-body", "sense-organs", "hearing", "ear", "stapes", "skeletal"]
  },
  {
    title: "Which inner ear structure contains the sensory hair cells of the Organ of Corti that transduce mechanical sound fluid waves into electrical auditory impulses?",
    difficulty: "Medium",
    options: [
      { text: "Cochlea", isCorrect: true, explanation: "The spiral snail-shaped cochlea converts mechanical perilymph/endolymph fluid waves into electrical nerve impulses along the cochlear nerve." },
      { text: "Semicircular canals", isCorrect: false, explanation: "Semicircular canals sense rotational kinetic equilibrium, not hearing." },
      { text: "Tympanic membrane", isCorrect: false, explanation: "The eardrum vibrates to sound waves in air, transferring motion to the middle ear ossicles." },
      { text: "Eustachian tube", isCorrect: false, explanation: "The Eustachian tube equalizes air pressure between the middle ear and the nasopharynx." }
    ],
    explanation: "Sound wave frequencies deflect specific basilar membrane regions in the cochlea, bending stereocilia to depolarize auditory neurons.",
    tags: ["human-body", "sense-organs", "hearing", "ear", "cochlea", "human-physiology"]
  },
  {
    title: "Dynamic balance and rotational head acceleration (equilibrium) are detected by sensory ampullae inside which inner ear organs?",
    difficulty: "Medium",
    options: [
      { text: "Semicircular canals (anterior, posterior, and lateral)", isCorrect: true, explanation: "Three fluid-filled canals oriented in orthogonal spatial planes detect head rotation as fluid flow deflects hair cells embedded in a gelatinous cupula." },
      { text: "Tympanic membrane", isCorrect: false, explanation: "The tympanic membrane senses sound pressure waves." },
      { text: "Auditory canal", isCorrect: false, explanation: "The external acoustic meatus funnels sound waves from the pinna." },
      { text: "Stapes footplate", isCorrect: false, explanation: "The stapes drives acoustic pressure into the oval window." }
    ],
    explanation: "Vestibular information from the semicircular canals coordinates the vestibulo-ocular reflex to stabilize vision during head movement.",
    tags: ["human-body", "sense-organs", "ear", "balance", "vestibular", "human-physiology"]
  },
  {
    title: "Olfactory sensory neurons are unique among human sensory systems because their neural pathways project directly to the cerebral cortex and limbic system without first passing through:",
    difficulty: "Hard",
    options: [
      { text: "The thalamus", isCorrect: true, explanation: "All other sensory modalities (vision, audition, taste, somatosensation) relay through the thalamus before reaching the cortex; olfaction bypasses the thalamus directly to the limbic system, explaining its powerful emotional memory link." },
      { text: "The brainstem", isCorrect: false, explanation: "Cranial nerve I projects to the olfactory bulb and cortex directly." },
      { text: "The optic chiasm", isCorrect: false, explanation: "The optic chiasm decussates visual pathways, not olfactory nerves." },
      { text: "The cerebellum", isCorrect: false, explanation: "The cerebellum coordinates motor balance and fine movement." }
    ],
    explanation: "Direct anatomical connection to the amygdala and hippocampus allows smells to trigger instantaneous emotional and autobiographical memories.",
    tags: ["human-body", "sense-organs", "olfaction", "nose", "brain", "human-physiology"]
  },
  {
    title: "The five scientifically recognized primary taste modalities detected by taste buds across the human tongue are:",
    difficulty: "Easy",
    options: [
      { text: "Sweet, Salty, Sour, Bitter, and Umami (savory)", isCorrect: true, explanation: "Umami (discovered in 1908 by Kikunae Ikeda) responds to monosodium glutamate and aspartate; all five tastes are detected across all papillae, debunking the historical 'tongue map' myth." },
      { text: "Sweet, Sour, Salty, Spicy, and Bitter", isCorrect: false, explanation: "'Spicy' (piquancy) is not a taste; it is a pain/thermal signal mediated by TRPV1 nociceptors sensing capsaicin via the trigeminal nerve." },
      { text: "Crunchy, Smooth, Salty, Acidic, and Sweet", isCorrect: false, explanation: "Crunchy and smooth describe tactile mouthfeel/texture, not gustatory receptor modalities." },
      { text: "Hot, Cold, Pepper, Sweet, and Metallic", isCorrect: false, explanation: "Temperature is detected by somatosensory thermoreceptors, not taste receptors." }
    ],
    explanation: "Taste buds contain receptor cells tuned to sugars (sweet), sodium ions (salty), hydrogen ions (sour), alkaloids (bitter), and glutamate (umami).",
    tags: ["human-body", "sense-organs", "taste", "tongue", "umami", "human-physiology"]
  },
  {
    title: "In the skin's dermis, which encapsulated mechanoreceptor is specialized to detect deep pressure, rapid vibrations, and mechanical rumble?",
    difficulty: "Hard",
    options: [
      { text: "Pacinian corpuscles (lamellar corpuscles)", isCorrect: true, explanation: "Concentric onion-like layers of collagen surrounding an unmyelinated nerve ending deform rapidly under vibration (200-300 Hz) and transient deep pressure." },
      { text: "Meissner's corpuscles", isCorrect: false, explanation: "Meissner's corpuscles detect light touch, flutter, and low-frequency vibrations in hairless skin (fingertips, lips)." },
      { text: "Merkel discs", isCorrect: false, explanation: "Merkel discs detect sustained light touch and texture/shapes." },
      { text: "Free nerve endings", isCorrect: false, explanation: "Free nerve endings detect nociception (pain) and temperature." }
    ],
    explanation: "Pacinian corpuscles adapt rapidly, responding to high-frequency dynamic vibrations rather than static surface pressure.",
    tags: ["human-body", "sense-organs", "skin", "mechanoreceptors", "somatosensory", "human-physiology"]
  },
  {
    title: "Myopia (nearsightedness) occurs when light rays focus in front of the retina rather than directly on it, which is optically corrected using:",
    difficulty: "Easy",
    options: [
      { text: "Concave (diverging) lenses", isCorrect: true, explanation: "Because the eyeball is too long or the cornea is too curved, a concave lens diverges incoming light rays slightly before they enter the eye, pushing the focal point back onto the retina." },
      { text: "Convex (converging) lenses", isCorrect: false, explanation: "Convex lenses correct hyperopia (farsightedness) by converging rays sooner." },
      { text: "Cylindrical lenses", isCorrect: false, explanation: "Cylindrical lenses correct astigmatism (asymmetrical corneal curvature)." },
      { text: "Polarizing filters", isCorrect: false, explanation: "Polarizing filters block glare, but do not correct refractive focal error." }
    ],
    explanation: "Concave lenses diverge light rays to compensate for an elongated myopic eyeball.",
    tags: ["human-body", "sense-organs", "vision", "myopia", "optics", "human-physiology"]
  },
  {
    title: "The colored, circular muscular diaphragm of the eye that expands and contracts to regulate the amount of light entering the pupil is:",
    difficulty: "Easy",
    options: [
      { text: "The iris", isCorrect: true, explanation: "The iris contains sphincter and dilator pupillae muscles that constrict or dilate the pupil in response to ambient light and autonomic signals." },
      { text: "The cornea", isCorrect: false, explanation: "The cornea is the transparent, anterior curved protective window of the eye." },
      { text: "The sclera", isCorrect: false, explanation: "The sclera is the tough, opaque white outer fibrous coat of the eyeball." },
      { text: "The choroid", isCorrect: false, explanation: "The choroid is the vascular, pigmented intermediate layer between the retina and sclera." }
    ],
    explanation: "Melanin pigmentation in the stroma of the iris determines whether eyes appear brown, hazel, green, or blue.",
    tags: ["human-body", "sense-organs", "vision", "iris", "eye", "human-physiology"]
  },
  {
    title: "The transparent crystalline lens of the human eye alters its curvature to focus on near versus distant objects through a process known as:",
    difficulty: "Medium",
    options: [
      { text: "Accommodation (mediated by ciliary muscles and suspensory zonule fibers)", isCorrect: true, explanation: "For near vision, ciliary muscles contract, releasing tension on zonular fibers, allowing the elastic lens to round up and increase optical power." },
      { text: "Phototransduction", isCorrect: false, explanation: "Phototransduction is the biochemical conversion of light photons into electrical retinal signals." },
      { text: "Nystagmus", isCorrect: false, explanation: "Nystagmus is involuntary rhythmic rapid eye movement." },
      { text: "Strabismus", isCorrect: false, explanation: "Strabismus is misaligned eye direction (cross-eyed)." }
    ],
    explanation: "With age, the lens loses elasticity, impairing near focusing in a universal condition called presbyopia.",
    tags: ["human-body", "sense-organs", "vision", "accommodation", "eye", "human-physiology"]
  },
  {
    title: "What is the primary function of cerumen (earwax) secreted by ceruminous glands in the external ear canal?",
    difficulty: "Easy",
    options: [
      { text: "Trapping airborne dust, insects, and microorganisms, while water-repelling and lubricating the ear canal with antimicrobial peptides", isCorrect: true, explanation: "Cerumen is slightly acidic and rich in antibacterial fatty acids and lysozymes that protect the tympanic membrane from infections and desiccation." },
      { text: "Amplifying acoustic sound waves by 50 decibels", isCorrect: false, explanation: "Excess cerumen blocks sound waves, causing conductive hearing loss." },
      { text: "Cooling the brain through evaporation", isCorrect: false, explanation: "Cerumen does not cool the brain." },
      { text: "Producing red blood cells during middle ear infections", isCorrect: false, explanation: "Blood cells are synthesized in bone marrow." }
    ],
    explanation: "Earwax cleans, lubricates, and protects the ear canal from foreign debris and bacterial pathogens.",
    tags: ["human-body", "sense-organs", "hearing", "ear", "hygiene", "human-physiology"]
  },
  {
    title: "Pain perception (nociception) is mediated by which specialized sensory receptors distributed throughout skin and visceral organs?",
    difficulty: "Medium",
    options: [
      { text: "Free nerve endings (nociceptors)", isCorrect: true, explanation: "Unspecialized bare dendritic terminals of A-delta and C fibers detect damaging thermal, mechanical, and chemical stimuli, signaling pain to the spinal cord." },
      { text: "Ruffini endings", isCorrect: false, explanation: "Ruffini endings detect skin stretch and joint position." },
      { text: "Golgi tendon organs", isCorrect: false, explanation: "Golgi tendon organs sense muscle tension to prevent tendon tearing." },
      { text: "Muscle spindles", isCorrect: false, explanation: "Muscle spindles detect changes in muscle length (stretch reflex)." }
    ],
    explanation: "Nociceptors alert the nervous system to tissue damage, triggering protective withdrawal reflexes.",
    tags: ["human-body", "sense-organs", "skin", "pain", "nociceptors", "human-physiology"]
  },
  {
    title: "Why does having two ears positioned on opposite sides of the head (binaural hearing) provide spatial sound localization?",
    difficulty: "Medium",
    options: [
      { text: "The brain calculates interaural time differences (ITD) and interaural level differences (ILD) between when a sound reaches each ear", isCorrect: true, explanation: "A sound arriving fractions of a millisecond earlier or slightly louder at one ear enables the superior olivary complex to compute horizontal sound azimuth." },
      { text: "One ear hears only high pitches while the other hears only low pitches", isCorrect: false, explanation: "Both ears possess identical full frequency ranges (20 Hz to 20,000 Hz)." },
      { text: "Sound waves bounce between the two ears across the top of the skull", isCorrect: false, explanation: "Sound localization is calculated by arrival time and intensity differences at each eardrum." },
      { text: "It allows a person to hear two unrelated conversations simultaneously without confusion", isCorrect: false, explanation: "Attention is cognitive; binaural anatomy primarily provides 3D spatial orientation." }
    ],
    explanation: "Microsecond arrival time differences between the left and right ears allow precise directional sound pinpointing.",
    tags: ["human-body", "sense-organs", "hearing", "binaural", "ear", "human-physiology"]
  },
  {
    title: "Astigmatism is a common optical vision defect caused by:",
    difficulty: "Easy",
    options: [
      { text: "An irregular, football-like curvature of the cornea or crystalline lens, causing light rays to focus at multiple blurred points", isCorrect: true, explanation: "Instead of being spherically round like a basketball, the astigmatic cornea has uneven curvature, distorting vision at all distances." },
      { text: "Complete blindness in the right hemisphere of both eyes", isCorrect: false, explanation: "Hemianopia is a neurological stroke or visual pathway defect." },
      { text: "A clouding of the lens with aging protein deposits", isCorrect: false, explanation: "That describes cataracts." },
      { text: "Elevated intraocular fluid pressure damaging the optic nerve", isCorrect: false, explanation: "That describes glaucoma." }
    ],
    explanation: "Cylindrical lenses or refractive laser surgery reshape the asymmetrical corneal focal plane.",
    tags: ["human-body", "sense-organs", "vision", "astigmatism", "eye", "human-physiology"]
  },
  {
    title: "Why do spicy foods containing capsaicin (chili peppers) create a burning sensation on the tongue even when served cold?",
    difficulty: "Medium",
    options: [
      { text: "Capsaicin binds directly to TRPV1 thermal receptors on pain fibers that normally detect scalding temperatures above 43°C", isCorrect: true, explanation: "Capsaicin tricks sensory neurons into firing action potentials that the brain interprets as actual physical heat and tissue burn." },
      { text: "Capsaicin contains live microscopic flames", isCorrect: false, explanation: "Biologically impossible." },
      { text: "Capsaicin converts water into boiling hydrochloric acid", isCorrect: false, explanation: "It is an alkaloid chemical binding to thermal/pain ion channels." },
      { text: "Capsaicin freezes the tongue into dry ice", isCorrect: false, explanation: "Menthol activates cold TRPM8 receptors; capsaicin activates hot TRPV1 receptors." }
    ],
    explanation: "Capsaicin is a chemical agonist of heat-activated ion channels, tricking the brain into perceiving physical burning.",
    tags: ["human-body", "sense-organs", "taste", "capsaicin", "tongue", "human-physiology"]
  },

  // ==========================================
  // SECTION 3: NUTRITION & MICRONUTRIENTS (Questions 36 to 50)
  // ==========================================
  {
    title: "Which class of macronutrients provides the highest energy density per gram consumed by the human body?",
    difficulty: "Easy",
    options: [
      { text: "Fats / Lipids (providing approximately 9 kcal per gram)", isCorrect: true, explanation: "Lipids yield 9 kcal/g, more than double the energy density of carbohydrates (4 kcal/g) and proteins (4 kcal/g)." },
      { text: "Carbohydrates (providing 4 kcal per gram)", isCorrect: false, explanation: "Carbohydrates yield 4 kcal/g." },
      { text: "Proteins (providing 4 kcal per gram)", isCorrect: false, explanation: "Proteins yield 4 kcal/g." },
      { text: "Dietary minerals (providing 7 kcal per gram)", isCorrect: false, explanation: "Minerals provide zero caloric energy." }
    ],
    explanation: "Hydrocarbon bonds in triglycerides store more caloric potential than hydrated carbohydrate sugars.",
    tags: ["human-body", "nutrition", "macronutrients", "lipids", "metabolism", "life-sciences-health"]
  },
  {
    title: "Why is Vitamin D unique among all vitamins required by the human body?",
    difficulty: "Easy",
    options: [
      { text: "It functions as a steroid pre-hormone synthesized in the skin when exposed to ultraviolet B (UVB) sunlight", isCorrect: true, explanation: "7-dehydrocholesterol in dermal cells is photolyzed by UVB into cholecalciferol (D3), converted by the liver and kidneys into active calcitriol." },
      { text: "It is the only vitamin that contains zero carbon atoms", isCorrect: false, explanation: "All vitamins are organic carbon-based molecules." },
      { text: "It can be destroyed only by freezing temperatures", isCorrect: false, explanation: "Vitamin D is fat-soluble and heat-stable." },
      { text: "It is manufactured exclusively by intestinal tapeworms", isCorrect: false, explanation: "Synthesized endogenously in human skin or absorbed from dietary sources." }
    ],
    explanation: "Sunlight-driven skin synthesis makes Vitamin D a true secosteroid hormone that regulates intestinal calcium absorption and bone density.",
    tags: ["human-body", "nutrition", "vitamins", "vitamin-d", "sunlight", "human-physiology"]
  },
  {
    title: "Vitamin C (ascorbic acid) is an essential water-soluble cofactor required in the human body for the enzymatic synthesis of:",
    difficulty: "Medium",
    options: [
      { text: "Collagen (the structural fibrous protein of connective tissues, skin, bones, and blood vessels)", isCorrect: true, explanation: "Ascorbic acid acts as an electron donor for prolyl and lysyl hydroxylase enzymes; deficiency impairs collagen triple-helix stabilization, causing scurvy." },
      { text: "Hemoglobin", isCorrect: false, explanation: "Iron and protoporphyrin synthesize heme in hemoglobin." },
      { text: "Myelin sheaths", isCorrect: false, explanation: "Myelin requires sphingolipids and B12." },
      { text: "Keratin", isCorrect: false, explanation: "Keratin is synthesized by epidermal keratinocytes independently of ascorbic acid." }
    ],
    explanation: "Without vitamin C, defective collagen causes capillary fragility, bleeding gums, loosened teeth, and delayed wound healing.",
    tags: ["human-body", "nutrition", "vitamins", "vitamin-c", "collagen", "human-physiology"]
  },
  {
    title: "Which of the following is a fat-soluble vitamin stored in the liver and adipose tissue rather than excreted daily in urine?",
    difficulty: "Easy",
    options: [
      { text: "Vitamin A (Retinol)", isCorrect: true, explanation: "The four fat-soluble vitamins are A, D, E, and K (mnemonic: KEDA); water-soluble vitamins are B-complex and C." },
      { text: "Vitamin B1 (Thiamine)", isCorrect: false, explanation: "B vitamins are water-soluble." },
      { text: "Vitamin C (Ascorbic acid)", isCorrect: false, explanation: "Vitamin C is water-soluble." },
      { text: "Vitamin B12 (Cobalamin)", isCorrect: false, explanation: "Vitamin B12 is water-soluble." }
    ],
    explanation: "Fat-soluble vitamins (A, D, E, K) require dietary dietary fats for absorption and can accumulate in hepatic stores, posing risk of toxicity if consumed in extreme excess.",
    tags: ["human-body", "nutrition", "vitamins", "fat-soluble", "life-sciences-health"]
  },
  {
    title: "What is the primary physiological consequence of severe dietary iodine deficiency in humans?",
    difficulty: "Medium",
    options: [
      { text: "Goiter (abnormal enlargement of the thyroid gland) and developmental cretinism in infants", isCorrect: true, explanation: "Iodine is a structural component of thyroid hormones T3 and T4; lacking iodine, the thyroid cannot synthesize hormones, triggering elevated TSH and gland hypertrophy (goiter)." },
      { text: "Loss of night vision (nyctalopia)", isCorrect: false, explanation: "Night blindness is caused by Vitamin A deficiency." },
      { text: "Brittle bones and rickets", isCorrect: false, explanation: "Rickets is caused by Vitamin D / Calcium deficiency." },
      { text: "Inability of blood to clot after a minor cut", isCorrect: false, explanation: "Clotting deficiency is linked to Vitamin K or hemophilia." }
    ],
    explanation: "Universal iodization of commercial table salt was implemented globally to prevent goiter and intellectual disability.",
    tags: ["human-body", "nutrition", "minerals", "iodine", "thyroid", "goiter", "diseases"]
  },
  {
    title: "Iron is a critical mineral micronutrient in human nutrition primarily because it serves as the central coordinating ion in:",
    difficulty: "Easy",
    options: [
      { text: "Heme groups of hemoglobin and myoglobin, binding and transporting oxygen to cells", isCorrect: true, explanation: "Each hemoglobin molecule contains four iron-bearing heme groups that bind reversibly to oxygen molecules for transport from lungs to body tissues." },
      { text: "Insulin molecules regulating blood glucose", isCorrect: false, explanation: "Insulin requires zinc for hexameric storage crystals, not iron." },
      { text: "Bone hydroxyapatite crystals", isCorrect: false, explanation: "Bones are mineralized with calcium and phosphorus." },
      { text: "Rhodopsin photopigments in the retina", isCorrect: false, explanation: "Rhodopsin incorporates retinal (Vitamin A derivative)." }
    ],
    explanation: "Iron deficiency leads to hypochromic microcytic anemia, characterized by fatigue, pallor, and reduced aerobic capacity.",
    tags: ["human-body", "nutrition", "minerals", "iron", "hemoglobin", "anemia"]
  },
  {
    title: "Why is non-digestible dietary fiber (roughage) an essential component of a healthy human diet even though humans lack enzymes to absorb its calories?",
    difficulty: "Medium",
    options: [
      { text: "It adds bulk to stool to promote healthy bowel peristalsis, while soluble fiber feeds beneficial gut microbiota and lowers LDL cholesterol", isCorrect: true, explanation: "Fermentation of soluble fiber by gut microbes yields short-chain fatty acids (butyrate) that nourish colonocytes and regulate systemic metabolism." },
      { text: "It dissolves stomach acid into pure distilled water", isCorrect: false, explanation: "Fiber does not neutralize stomach acid completely." },
      { text: "It converts directly into red blood cells in the small intestine", isCorrect: false, explanation: "Erythropoiesis occurs in bone marrow." },
      { text: "It prevents all bacteria from inhabiting the digestive tract", isCorrect: false, explanation: "Fiber actually nourishes beneficial probiotic bacterial flora (prebiotic)." }
    ],
    explanation: "High dietary fiber intake prevents constipation, diverticular disease, colorectal cancer, and glycemic spikes.",
    tags: ["human-body", "nutrition", "fiber", "microbiome", "digestive", "healthy-habits"]
  },
  {
    title: "A deficiency in which B-complex vitamin is recognized as a major cause of neural tube birth defects (such as spina bifida and anencephaly)?",
    difficulty: "Medium",
    options: [
      { text: "Vitamin B9 (Folate / Folic Acid)", isCorrect: true, explanation: "Folic acid is essential for DNA synthesis and rapid embryonic cell division during closure of the embryonic neural tube in the first 28 days of pregnancy." },
      { text: "Vitamin B1 (Thiamine)", isCorrect: false, explanation: "Thiamine deficiency causes beriberi." },
      { text: "Vitamin B3 (Niacin)", isCorrect: false, explanation: "Niacin deficiency causes pellagra." },
      { text: "Vitamin B7 (Biotin)", isCorrect: false, explanation: "Biotin participates in carboxylase metabolic pathways." }
    ],
    explanation: "Mandatory folic acid fortification of flour and cereal products significantly reduced the incidence of spina bifida worldwide.",
    tags: ["human-body", "nutrition", "vitamins", "folic-acid", "embryology", "human-physiology"]
  },
  {
    title: "Which mineral ion acts as the universal trigger for human skeletal muscle contraction and is stored in vast quantities inside the sarcoplasmic reticulum?",
    difficulty: "Medium",
    options: [
      { text: "Calcium (Ca2+)", isCorrect: true, explanation: "Release of Ca2+ binds to troponin, causing tropomyosin to shift and expose myosin binding sites on actin filaments, initiating muscle contraction." },
      { text: "Iron (Fe2+)", isCorrect: false, explanation: "Iron functions in oxygen transport." },
      { text: "Zinc (Zn2+)", isCorrect: false, explanation: "Zinc is an enzyme cofactor." },
      { text: "Iodine (I-)", isCorrect: false, explanation: "Iodine is utilized in thyroid hormone synthesis." }
    ],
    explanation: "In addition to building bone matrix, calcium ions mediate nerve synaptic release, muscle contraction, and blood clotting cascades.",
    tags: ["human-body", "nutrition", "minerals", "calcium", "muscular", "human-physiology"]
  },
  {
    title: "Complete proteins—those containing all nine essential amino acids that the human body cannot synthesize on its own—are typically found in:",
    difficulty: "Easy",
    options: [
      { text: "Eggs, dairy products, poultry, fish, and soy (tofu/edamame)", isCorrect: true, explanation: "Animal proteins and select plant proteins like soy and quinoa provide all nine essential amino acids in adequate biological proportions." },
      { text: "Pure white sugar and high-fructose corn syrup", isCorrect: false, explanation: "Sugar contains simple carbohydrates and zero protein." },
      { text: "Olive oil and butter", isCorrect: false, explanation: "Oils and butter are lipids." },
      { text: "White table salt", isCorrect: false, explanation: "Salt is pure sodium chloride." }
    ],
    explanation: "The nine essential amino acids must be obtained through balanced dietary intake because human cells cannot synthesize their carbon skeletons.",
    tags: ["human-body", "nutrition", "macronutrients", "protein", "amino-acids", "life-sciences-health"]
  },
  {
    title: "Vitamin K is biologically essential in human nutrition because the liver requires it for the post-translational synthesis of:",
    difficulty: "Medium",
    options: [
      { text: "Blood clotting factors (including prothrombin, Factor VII, IX, and X)", isCorrect: true, explanation: "Vitamin K is a cofactor for gamma-glutamyl carboxylase, enabling clotting proteins to bind calcium and form stable fibrin clots to halt bleeding." },
      { text: "Enzymes that break down dietary lactose", isCorrect: false, explanation: "Lactase is encoded genetically by the LCT gene." },
      { text: "Hydrochloric acid in the stomach", isCorrect: false, explanation: "HCl is generated by gastric proton pumps." },
      { text: "Melanin skin pigment", isCorrect: false, explanation: "Melanin is synthesized from tyrosine via tyrosinase." }
    ],
    explanation: "Newborns routinely receive a Vitamin K injection at birth to prevent hemorrhagic disease of the newborn.",
    tags: ["human-body", "nutrition", "vitamins", "vitamin-k", "blood-clotting", "circulatory"]
  },
  {
    title: "What is the primary dietary danger of consuming excessive quantities of trans-fatty acids (industrial trans fats found in partially hydrogenated vegetable oils)?",
    difficulty: "Medium",
    options: [
      { text: "They significantly elevate harmful LDL ('bad') cholesterol while simultaneously lowering protective HDL ('good') cholesterol, multiplying the risk of coronary heart disease", isCorrect: true, explanation: "Trans fats promote vascular inflammation, endothelial dysfunction, and coronary atheroma formation, leading to global bans in food manufacturing." },
      { text: "They cause immediate blindness within 10 minutes", isCorrect: false, explanation: "Trans fats contribute to chronic vascular disease over decades, not acute blindness." },
      { text: "They destroy all digestive enzymes in saliva", isCorrect: false, explanation: "They are absorbed like other fatty acids, but harm blood lipid profiles." },
      { text: "They turn human skin bright blue", isCorrect: false, explanation: "Argyria (colloidal silver ingestion) turns skin blue, not trans fats." }
    ],
    explanation: "Unlike unsaturated cis fats, trans fats possess rigid molecular geometry that promotes arterial plaque accumulation.",
    tags: ["human-body", "nutrition", "trans-fats", "cardiovascular", "cholesterol", "healthy-habits"]
  },
  {
    title: "Strict vegans who consume zero animal products must take supplemental dietary sources of which vitamin synthesized exclusively by bacteria?",
    difficulty: "Medium",
    options: [
      { text: "Vitamin B12 (Cobalamin)", isCorrect: true, explanation: "Vitamin B12 is produced by bacteria and archaea and bioaccumulates in animal tissues; unfortified plant foods contain virtually zero active B12." },
      { text: "Vitamin C", isCorrect: false, explanation: "Plant fruits and vegetables are abundant in Vitamin C." },
      { text: "Vitamin E", isCorrect: false, explanation: "Plant seed oils, nuts, and leafy greens are rich in Vitamin E." },
      { text: "Vitamin B1", isCorrect: false, explanation: "Whole grains and legumes provide ample thiamine (B1)." }
    ],
    explanation: "B12 deficiency causes megaloblastic anemia and irreversible neurological demyelination; vegans require fortified foods or supplements.",
    tags: ["human-body", "nutrition", "vitamins", "vitamin-b12", "vegan", "human-physiology"]
  },
  {
    title: "Electrolytes (such as sodium, potassium, chloride, and magnesium) in human nutrition are essential because they:",
    difficulty: "Easy",
    options: [
      { text: "Maintain cellular osmotic fluid balance and carry electrical currents for nerve action potentials and muscle contractions", isCorrect: true, explanation: "Electrolytes establish electrochemical gradients across cell membranes, enabling neuromuscular signaling and regulating extracellular water volume." },
      { text: "Synthesize keratin for hair growth", isCorrect: false, explanation: "Keratin is an amino acid protein." },
      { text: "Kill all intestinal bacteria indiscriminately", isCorrect: false, explanation: "Electrolytes support normal cellular homeostasis." },
      { text: "Act as solid building blocks of teeth enamel", isCorrect: false, explanation: "Calcium hydroxyapatite forms enamel." }
    ],
    explanation: "Severe electrolyte imbalances (hyponatremia or hyperkalemia) can induce fatal cardiac arrhythmias and seizures.",
    tags: ["human-body", "nutrition", "electrolytes", "sodium", "potassium", "human-physiology"]
  },
  {
    title: "Why does the human body require adequate dietary hydration (drinking water daily)?",
    difficulty: "Easy",
    options: [
      { text: "Water constitutes roughly 60% of adult body weight, serving as the solvent for biochemical reactions, maintaining blood volume, and regulating temperature through sweat", isCorrect: true, explanation: "Water lubricates articulating joints, removes cellular nitrogenous wastes via renal filtration, and transports nutrients in blood plasma." },
      { text: "Water generates atomic energy through nuclear fusion in the spleen", isCorrect: false, explanation: "Biological cells use ATP from chemical oxidation, not nuclear fusion." },
      { text: "Drinking water is the only way humans can obtain vitamin D", isCorrect: false, explanation: "Pure water contains zero vitamins." },
      { text: "Water replaces the need for breathing oxygen", isCorrect: false, explanation: "Humans are obligate aerobic organisms requiring atmospheric oxygen." }
    ],
    explanation: "Dehydration as small as 2% of body mass impairs cognitive function, physical endurance, and thermoregulation.",
    tags: ["human-body", "nutrition", "hydration", "water", "healthy-habits", "human-physiology"]
  },

  // ==========================================
  // SECTION 4: HEALTHY HABITS & WELLNESS (Questions 51 to 65)
  // ==========================================
  {
    title: "According to the World Health Organization (WHO), how many minutes of moderate-intensity aerobic physical activity per week are recommended for adults to maintain cardiovascular health?",
    difficulty: "Easy",
    options: [
      { text: "At least 150 to 300 minutes per week (or 75 to 150 minutes of vigorous activity)", isCorrect: true, explanation: "This equates to roughly 30 minutes of brisk walking 5 days a week, significantly reducing all-cause mortality, stroke, and type 2 diabetes." },
      { text: "5 minutes per week", isCorrect: false, explanation: "Far below the threshold needed to stimulate cardiovascular adaptation." },
      { text: "50 hours per week", isCorrect: false, explanation: "Overtraining at 50 hours per week causes physical exhaustion and injury." },
      { text: "Zero minutes (exercise provides no measurable benefits)", isCorrect: false, explanation: "Exercise is one of the most clinically validated interventions for health and longevity." }
    ],
    explanation: "Regular aerobic exercise increases heart stroke volume, lowers resting blood pressure, and boosts insulin sensitivity.",
    tags: ["human-body", "healthy-habits", "exercise", "cardiovascular", "who", "wellness"]
  },
  {
    title: "Why is practicing consistent sleep hygiene (sleeping 7-9 hours nightly in a cool, dark room) essential for cognitive brain health?",
    difficulty: "Medium",
    options: [
      { text: "During deep sleep, the glymphatic system clears toxic metabolic waste products (including beta-amyloid plaques) from interstitial spaces in the brain", isCorrect: true, explanation: "Discovered by Maiken Nedergaard, cerebrospinal fluid flushes through brain tissue during slow-wave sleep, washing away neurotoxic waste accumulated during waking hours." },
      { text: "Sleeping burns more calories than running a marathon", isCorrect: false, explanation: "Metabolic rate decreases during sleep." },
      { text: "The brain turns completely off with zero electrical activity", isCorrect: false, explanation: "The sleeping brain is metabolically active, consolidating memories and reorganizing synaptic networks." },
      { text: "Sleep replaces the need for drinking water", isCorrect: false, explanation: "Hydration must be maintained through fluid intake." }
    ],
    explanation: "Glymphatic clearance during deep sleep removes metabolic debris, while REM sleep consolidates declarative and procedural memories.",
    tags: ["human-body", "healthy-habits", "sleep", "glymphatic-system", "brain", "wellness"]
  },
  {
    title: "Why does washing hands thoroughly with plain soap and running water for at least 20 seconds effectively destroy enveloped viruses (like influenza and coronaviruses)?",
    difficulty: "Easy",
    options: [
      { text: "Soap molecules are amphiphilic (having hydrophobic tails) that insert into and dissolve the protective viral lipid bilayer membrane, causing the virus to rupture and disintegrate", isCorrect: true, explanation: "Soap physically dismantles the viral lipid coat, and mechanical friction under running water washes away the disrupted fragments." },
      { text: "Soap is a radioactive isotope that mutates viruses", isCorrect: false, explanation: "Soap is a simple surfactant, not radioactive." },
      { text: "Soap freezes the water into microscopic ice shards", isCorrect: false, explanation: "Soap works via chemical lipid dissolution, not freezing." },
      { text: "Soap acts as a high-voltage electrical conductor", isCorrect: false, explanation: "Surfactant disruption of lipid membranes is purely chemical." }
    ],
    explanation: "Soap's hydrophobic tails wedge into the viral fatty membrane, prying it apart and rendering the pathogen harmless.",
    tags: ["human-body", "healthy-habits", "hygiene", "handwashing", "viruses", "preventive-medicine"]
  },
  {
    title: "What is the primary mechanism by which fluoride toothpaste prevents dental caries (tooth cavities)?",
    difficulty: "Medium",
    options: [
      { text: "Fluoride ions incorporate into enamel hydroxyapatite crystals, forming fluorapatite, which is significantly more resistant to bacterial acid dissolution", isCorrect: true, explanation: "Fluorapatite resists demineralization down to pH 4.5 (compared to hydroxyapatite at pH 5.5), protecting teeth from lactic acid produced by Streptococcus mutans." },
      { text: "Fluoride stains teeth black to absorb solar heat", isCorrect: false, explanation: "Fluoride strengthens translucent mineral enamel." },
      { text: "Fluoride dissolves living gum tissue to make room for teeth", isCorrect: false, explanation: "Fluoride acts on hard enamel minerals, preserving healthy gums." },
      { text: "Fluoride replaces the need for brushing teeth with a brush", isCorrect: false, explanation: "Mechanical brushing is required to disrupt plaque biofilms." }
    ],
    explanation: "Fluorapatite remineralizes microscopic enamel lesions, rendering teeth impervious to dietary acids.",
    tags: ["human-body", "healthy-habits", "dental", "fluoride", "hygiene", "teeth"]
  },
  {
    title: "Exposure to blue light from smartphones, tablets, and computer screens close to bedtime disrupts sleep primarily because it:",
    difficulty: "Easy",
    options: [
      { text: "Stimulates intrinsically photosensitive retinal ganglion cells (ipRGCs), suppressing melatonin secretion by the pineal gland", isCorrect: true, explanation: "Blue wavelengths (460-480 nm) signal daylight to the suprachiasmatic nucleus (SCN), delaying the natural evening surge of the sleep hormone melatonin." },
      { text: "Burns microscopic holes through the optic nerve", isCorrect: false, explanation: "Screen light does not burn holes through neural tissue." },
      { text: "Causes teeth to dissolve during the night", isCorrect: false, explanation: "Blue light affects circadian rhythms, not dentition." },
      { text: "Increases stomach acid production tenfold", isCorrect: false, explanation: "Primary effect is on circadian neurobiology." }
    ],
    explanation: "Minimizing blue light 1-2 hours before bed allows natural melatonin secretion, facilitating rapid sleep onset and deep sleep cycles.",
    tags: ["human-body", "healthy-habits", "circadian-rhythm", "sleep", "melatonin", "blue-light"]
  },
  {
    title: "What is the cardiovascular benefit of regular aerobic exercise on the human heart's resting performance?",
    difficulty: "Easy",
    options: [
      { text: "It strengthens the left ventricle myocardium, increasing stroke volume and resulting in a lower, more efficient resting heart rate (bradycardia)", isCorrect: true, explanation: "An athlete's heart pumps more blood per beat (stroke volume), allowing the heart to maintain cardiac output at rest with fewer beats per minute (e.g., 45-55 bpm)." },
      { text: "It causes the heart to stop beating completely during sleep", isCorrect: false, explanation: "The heart must beat continuously throughout life." },
      { text: "It replaces heart muscle with titanium plates", isCorrect: false, explanation: "Physiological adaptation involves hypertrophy of cardiac myocytes." },
      { text: "It raises resting blood pressure to dangerously high levels", isCorrect: false, explanation: "Exercise training significantly lowers baseline resting blood pressure." }
    ],
    explanation: "Cardiovascular conditioning increases stroke volume and decreases myocardial workload during resting conditions.",
    tags: ["human-body", "healthy-habits", "exercise", "heart", "circulatory", "wellness"]
  },
  {
    title: "Chronic ergonomic slouching while sitting at desks ('tech neck' or forward head posture) causes musculoskeletal pain primarily because:",
    difficulty: "Easy",
    options: [
      { text: "Every inch the head tilts forward dramatically increases the gravitational leverage and shear strain on the cervical spine and trapezius muscles", isCorrect: true, explanation: "While a neutral head weighs about 5 kg (10-12 lbs), tilting forward at a 45-degree angle exerts over 22 kg (49 lbs) of gravitational torque on cervical vertebrae." },
      { text: "It causes the ribcage to fuse directly to the collarbone", isCorrect: false, explanation: "Bones do not spontaneously fuse from slouching." },
      { text: "It drains all cerebrospinal fluid into the stomach", isCorrect: false, explanation: "CSF circulation is contained within the meninges." },
      { text: "It turns neck muscles into cartilage", isCorrect: false, explanation: "Muscles remain muscular, but suffer chronic strain and tension." }
    ],
    explanation: "Maintaining neutral ergonomic spine alignment minimizes torque and prevents chronic neck spasms and disc herniation.",
    tags: ["human-body", "healthy-habits", "ergonomics", "posture", "skeletal", "wellness"]
  },
  {
    title: "Why does chronic mental stress weaken the human immune system over time?",
    difficulty: "Medium",
    options: [
      { text: "Prolonged elevation of the adrenal hormone cortisol suppresses lymphocyte production, reduces antibody secretion, and promotes systemic inflammation", isCorrect: true, explanation: "While acute stress mobilizes energy, chronic hypercortisolemia dampens T-cell activity and impairs the body's ability to fight viral and bacterial infections." },
      { text: "Stress dissolves bone marrow within 48 hours", isCorrect: false, explanation: "Bone marrow is not dissolved by psychological stress." },
      { text: "Stress turns blood into pure stomach acid", isCorrect: false, explanation: "Blood pH is tightly buffered between 7.35 and 7.45." },
      { text: "Stress causes red blood cells to stop carrying oxygen entirely", isCorrect: false, explanation: "Hemoglobin continues to bind oxygen." }
    ],
    explanation: "Chronic stress keeps the hypothalamic-pituitary-adrenal (HPA) axis hyperactive, exhausting immune reserves.",
    tags: ["human-body", "healthy-habits", "stress", "cortisol", "immune-system", "wellness"]
  },
  {
    title: "Regular dental flossing is recommended alongside toothbrushing primarily because:",
    difficulty: "Easy",
    options: [
      { text: "It removes plaque biofilm and food debris from tight interdental spaces that toothbrush bristles cannot reach, preventing gum disease (gingivitis)", isCorrect: true, explanation: "Toothbrushing cleans the facial, lingual, and occlusal surfaces, but only flossing cleans the 40% of tooth surface area located between teeth." },
      { text: "It whitens the jawbone underneath the chin", isCorrect: false, explanation: "Floss cleans interdental enamel and sulcus margins." },
      { text: "It sharpens teeth into cutting edges like shark denticles", isCorrect: false, explanation: "Flossing does not sharpen teeth." },
      { text: "It replaces the need for drinking water", isCorrect: false, explanation: "Flossing is oral hygiene, not hydration." }
    ],
    explanation: "Interdental flossing prevents subgingival bacterial colonization that leads to periodontal bone loss.",
    tags: ["human-body", "healthy-habits", "dental", "hygiene", "flossing", "wellness"]
  },
  {
    title: "Consuming a diet rich in colorful plant vegetables (berries, spinach, carrots, tomatoes) promotes cellular health primarily by providing:",
    difficulty: "Easy",
    options: [
      { text: "Dietary antioxidants (phytochemicals, polyphenols, vitamin C/E) that neutralize damaging reactive oxygen free radicals", isCorrect: true, explanation: "Free radicals cause cellular oxidative stress and DNA damage; antioxidants donate electrons to stabilize free radicals without becoming reactive themselves." },
      { text: "Pure synthetic antibiotics that kill all bacteria", isCorrect: false, explanation: "Vegetables contain phytochemicals and fiber, not pharmaceutical antibiotics." },
      { text: "Direct replacements for human brain neurons", isCorrect: false, explanation: "Plant cells do not replace human neurons." },
      { text: "Heavy metals that line the stomach with lead", isCorrect: false, explanation: "Heavy metals are toxic poisons, not healthy nutrients." }
    ],
    explanation: "Antioxidants scavenge reactive oxygen species (ROS), mitigating cellular aging and chronic inflammatory damage.",
    tags: ["human-body", "healthy-habits", "nutrition", "antioxidants", "diet", "wellness"]
  },
  {
    title: "Why is skipping meals, especially breakfast, followed by evening binging, linked to metabolic dysregulation?",
    difficulty: "Medium",
    options: [
      { text: "It triggers dramatic insulin spikes, promotes insulin resistance, and disrupts peripheral circadian clocks governing metabolic rate", isCorrect: true, explanation: "Irregular meal timing causes prolonged hypoglycemia followed by reactive hyperinsulinemia, signaling the body to store excess calories as visceral fat." },
      { text: "It causes the stomach to digest its own muscular walls in 30 minutes", isCorrect: false, explanation: "Mucus protects the gastric lining against self-digestion." },
      { text: "It converts human blood into pure motor oil", isCorrect: false, explanation: "Biologically impossible." },
      { text: "It permanently halts the heartbeat", isCorrect: false, explanation: "The autonomic cardiac pacemaker operates independently of meal timing." }
    ],
    explanation: "Regular meal timing aligned with circadian rhythms stabilizes blood glucose and maintains metabolic insulin sensitivity.",
    tags: ["human-body", "healthy-habits", "nutrition", "metabolism", "circadian-rhythm", "wellness"]
  },
  {
    title: "What is the primary danger of a sedentary lifestyle (sitting for more than 8 hours daily without physical movement)?",
    difficulty: "Easy",
    options: [
      { text: "It significantly increases the risk of deep vein thrombosis (DVT), cardiovascular disease, type 2 diabetes, and premature mortality", isCorrect: true, explanation: "Lack of muscular contraction halts the skeletal muscle venous pump in the legs, slowing blood circulation, reducing lipoprotein lipase activity, and raising insulin resistance." },
      { text: "It causes the skull bones to dissolve", isCorrect: false, explanation: "Sedentary behavior affects metabolic and cardiovascular systems." },
      { text: "It causes the body to grow feathers", isCorrect: false, explanation: "Biologically impossible." },
      { text: "It turns the kidneys into lungs", isCorrect: false, explanation: "Organs do not change developmental identity." }
    ],
    explanation: "Even in individuals who exercise, prolonged uninterrupted sitting independently elevates cardiometabolic disease risks.",
    tags: ["human-body", "healthy-habits", "sedentary", "cardiovascular", "dvt", "wellness"]
  },
  {
    title: "Why does chronic tobacco smoking cause progressive destruction of lung architecture (emphysema and chronic bronchitis)?",
    difficulty: "Easy",
    options: [
      { text: "Cigarette smoke paralyzes protective airway cilia, triggers chronic inflammation, and releases elastase enzymes that permanently destroy alveolar walls", isCorrect: true, explanation: "Loss of alveolar septa reduces surface area for gas diffusion, trapping stale air in inelastic lungs and causing chronic obstructive pulmonary disease (COPD)." },
      { text: "Smoke coats the lungs in sugar crystals that attract ants", isCorrect: false, explanation: "Tar and chemicals cause toxic necrosis, not sugar." },
      { text: "It turns red blood cells into white blood cells", isCorrect: false, explanation: "Tobacco toxins do not convert erythrocyte lineages." },
      { text: "It increases lung oxygen capacity by 500%", isCorrect: false, explanation: "Smoking dramatically destroys pulmonary capacity." }
    ],
    explanation: "Tobacco smoke paralyses the mucociliary escalator and degrades elastin, crippling respiratory gas exchange.",
    tags: ["human-body", "healthy-habits", "smoking", "lungs", "copd", "respiratory"]
  },
  {
    title: "Practicing regular mindfulness meditation or slow, deep diaphragmatic breathing activates which autonomic pathway to reduce heart rate and blood pressure?",
    difficulty: "Medium",
    options: [
      { text: "The vagus nerve (parasympathetic nervous system)", isCorrect: true, explanation: "Slow exhalations stimulate the vagus nerve (cranial nerve X) to release acetylcholine at the sinoatrial node, slowing heart rate and inducing physiological relaxation." },
      { text: "The sympathetic adrenergic chain", isCorrect: false, explanation: "Sympathetic pathways increase heart rate and stress." },
      { text: "The sciatic nerve", isCorrect: false, explanation: "The sciatic nerve innervates lower limbs, not cardiac pacing." },
      { text: "The optic nerve", isCorrect: false, explanation: "The optic nerve conveys visual signals from the retina." }
    ],
    explanation: "Vagal nerve stimulation acts as the body's natural brake pedal, reversing sympathetic adrenaline surges.",
    tags: ["human-body", "healthy-habits", "mindfulness", "vagus-nerve", "parasympathetic", "wellness"]
  },
  {
    title: "Why is daily sunscreen application (SPF 30 or higher) on exposed skin recommended by dermatologists year-round?",
    difficulty: "Easy",
    options: [
      { text: "It blocks damaging UVA rays (which cause premature photoaging and collagen breakdown) and UVB rays (which cause DNA mutations leading to skin cancer)", isCorrect: true, explanation: "UV radiation creates thymine dimers in epidermal DNA, increasing the risk of basal cell carcinoma, squamous cell carcinoma, and malignant melanoma." },
      { text: "It permanently seals sweat pores so humans never sweat again", isCorrect: false, explanation: "Sunscreen does not block normal perspiration." },
      { text: "It absorbs cosmic radiation from distant supernovas", isCorrect: false, explanation: "Sunscreen protects against terrestrial solar ultraviolet radiation." },
      { text: "It converts human skin into stone armor", isCorrect: false, explanation: "Sunscreen is a topical chemical/mineral UV filter." }
    ],
    explanation: "Broad-spectrum sunscreen shields against both photoaging UVA and mutagenic UVB rays.",
    tags: ["human-body", "healthy-habits", "skin", "sunscreen", "uv-protection", "cancer-prevention"]
  },

  // ==========================================
  // SECTION 5: DISEASES & PATHOLOGY (Questions 66 to 80)
  // ==========================================
  {
    title: "Why are antibiotic medications (such as penicillin or amoxicillin) completely ineffective against viral infections like influenza, the common cold, or COVID-19?",
    difficulty: "Easy",
    options: [
      { text: "Antibiotics specifically target bacterial structures (cell walls of peptidoglycan, bacterial ribosomes), whereas viruses lack these structures and reproduce inside human host cells", isCorrect: true, explanation: "Viruses are acellular packages of genetic material using human cellular machinery; antibiotics cannot harm viral particles and their misuse drives dangerous antibiotic resistance." },
      { text: "Viruses are too large for antibiotic molecules to penetrate", isCorrect: false, explanation: "Viruses are tiny compared to bacteria." },
      { text: "Antibiotics are instantly eaten and digested by viruses", isCorrect: false, explanation: "Viruses have no digestive enzymes or metabolic feeding." },
      { text: "Antibiotics can only be administered to plants", isCorrect: false, explanation: "Antibiotics are human and veterinary medicines for bacterial infections." }
    ],
    explanation: "Because viruses lack peptidoglycan cell walls, 70S ribosomes, and independent metabolic pathways, antibiotics have zero effect on them.",
    tags: ["human-body", "diseases", "antibiotics", "viruses", "bacteria", "pharmacology"]
  },
  {
    title: "Tuberculosis (TB), one of the world's leading infectious killers, is caused by which pathogen and primarily targets which organ?",
    difficulty: "Easy",
    options: [
      { text: "Mycobacterium tuberculosis (a bacterium primarily attacking the lungs)", isCorrect: true, explanation: "The acid-fast bacterium forms chronic granulomas (tubercles) in alveolar tissues, causing persistent coughing, hemoptysis (coughing blood), fever, and wasting." },
      { text: "Influenza A virus attacking the stomach", isCorrect: false, explanation: "Influenza is a virus; TB is caused by a mycobacterium." },
      { text: "Plasmodium falciparum attacking the liver", isCorrect: false, explanation: "Plasmodium causes malaria." },
      { text: "Candida albicans attacking the bones", isCorrect: false, explanation: "Candida is a fungal yeast causing thrush." }
    ],
    explanation: "Mycobacterium tuberculosis is an airborne pathogen requiring multi-month combination antibiotic regimens (DOTS).",
    tags: ["human-body", "diseases", "tuberculosis", "bacteria", "lungs", "infectious-diseases"]
  },
  {
    title: "What is the fundamental pathophysiological difference between Type 1 Diabetes and Type 2 Diabetes?",
    difficulty: "Medium",
    options: [
      { text: "Type 1 is an autoimmune disease where the immune system destroys insulin-producing beta cells; Type 2 is characterized by peripheral insulin resistance and progressive metabolic dysfunction", isCorrect: true, explanation: "Type 1 patients require daily life-saving insulin replacement; Type 2 is strongly associated with obesity, genetics, and sedentary lifestyles, managed initially via diet, exercise, and oral metformin." },
      { text: "Type 1 is caused by eating too much candy; Type 2 is a viral infection", isCorrect: false, explanation: "Neither is caused simply by eating candy, and Type 2 is not a viral infection." },
      { text: "Type 1 affects only the liver; Type 2 affects only the lungs", isCorrect: false, explanation: "Both impact systemic blood glucose regulation via the pancreas and peripheral tissues." },
      { text: "Type 1 is curable with a single pill; Type 2 requires bone marrow transplants", isCorrect: false, explanation: "Type 1 is a chronic lifelong autoimmune condition managed with insulin." }
    ],
    explanation: "Type 1 is an absolute insulin deficiency due to autoimmune beta-cell destruction; Type 2 is a relative insulin deficiency driven by receptor resistance.",
    tags: ["human-body", "diseases", "diabetes", "insulin", "endocrine", "pathology"]
  },
  {
    title: "Malaria, a devastating global tropical disease causing recurring fevers and chills, is caused by which microscopic organism transmitted by mosquito bites?",
    difficulty: "Easy",
    options: [
      { text: "Plasmodium (a single-celled protozoan parasite transmitted by female Anopheles mosquitoes)", isCorrect: true, explanation: "The sporozoites infect liver cells before bursting into erythrocytes, synchronously lysing red blood cells and inducing cyclic paroxysmal fevers." },
      { text: "A strain of marine jellyfish larvae", isCorrect: false, explanation: "Malaria is a protozoan infection." },
      { text: "A venomous snake bite", isCorrect: false, explanation: "Malaria is transmitted by mosquito vectors." },
      { text: "An airborne fungal mold spore", isCorrect: false, explanation: "Malaria is vector-borne via Anopheles mosquitoes." }
    ],
    explanation: "Plasmodium falciparum is the deadliest malaria species, invading and destroying red blood cells.",
    tags: ["human-body", "diseases", "malaria", "protozoa", "parasites", "infectious-diseases"]
  },
  {
    title: "Scurvy, the historic scourge of long-voyage sailors, is caused by a nutritional deficiency of which vitamin?",
    difficulty: "Easy",
    options: [
      { text: "Vitamin C (Ascorbic acid)", isCorrect: true, explanation: "Lacking fresh citrus fruits, sailors developed defective collagen, leading to bleeding gums, re-opening of healed scars, anemia, and fatal hemorrhages." },
      { text: "Vitamin D", isCorrect: false, explanation: "Vitamin D deficiency causes rickets." },
      { text: "Vitamin A", isCorrect: false, explanation: "Vitamin A deficiency causes xerophthalmia and night blindness." },
      { text: "Vitamin B12", isCorrect: false, explanation: "B12 deficiency causes pernicious anemia." }
    ],
    explanation: "In 1747, Scottish physician James Lind conducted the first controlled clinical trial, proving citrus fruits cure and prevent scurvy.",
    tags: ["human-body", "diseases", "scurvy", "vitamins", "vitamin-c", "deficiency-diseases"]
  },
  {
    title: "What is atherosclerosis, the underlying pathological process responsible for most heart attacks and strokes?",
    difficulty: "Medium",
    options: [
      { text: "The progressive accumulation of lipid plaques, cholesterol, and inflammatory cells within the inner arterial wall, narrowing the vessel lumen", isCorrect: true, explanation: "Rupture of an unstable atheromatous plaque triggers instantaneous thrombus (blood clot) formation, blocking coronary or cerebral blood flow." },
      { text: "The sudden enlargement of veins into elastic swimming fins", isCorrect: false, explanation: "Biologically impossible." },
      { text: "A bacterial infection that dissolves skeletal bones", isCorrect: false, explanation: "That would be osteomyelitis." },
      { text: "The loss of all brain synapses during sleep", isCorrect: false, explanation: "Atherosclerosis is an arterial vascular disease." }
    ],
    explanation: "Atherosclerosis narrows arterial channels, and sudden plaque rupture causes acute myocardial infarction (heart attack).",
    tags: ["human-body", "diseases", "atherosclerosis", "cardiovascular", "heart-attack", "pathology"]
  },
  {
    title: "Rickets in children and osteomalacia in adults are bone-softening diseases caused by a deficiency of:",
    difficulty: "Easy",
    options: [
      { text: "Vitamin D and Calcium", isCorrect: true, explanation: "Without vitamin D, the intestines cannot absorb dietary calcium, resulting in unmineralized, soft osteoid bone matrix that bows under the child's body weight." },
      { text: "Vitamin C and Iron", isCorrect: false, explanation: "Causes scurvy and anemia." },
      { text: "Vitamin A and Potassium", isCorrect: false, explanation: "Affects vision and cardiac rhythm." },
      { text: "Sodium chloride and Iodine", isCorrect: false, explanation: "Causes electrolyte imbalance and goiter." }
    ],
    explanation: "Vitamin D deficiency prevents bone mineralization, leading to characteristic bowed legs and swollen wrists in growing children.",
    tags: ["human-body", "diseases", "rickets", "vitamins", "vitamin-d", "calcium", "skeletal"]
  },
  {
    title: "Cholera, which causes rapid life-threatening dehydration from severe watery diarrhea, is caused by Vibrio cholerae and spread primarily through:",
    difficulty: "Easy",
    options: [
      { text: "Ingestion of water or food contaminated with human fecal sewage", isCorrect: true, explanation: "The cholera toxin binds to intestinal epithelial receptors, causing massive efflux of chloride ions and water (up to 20 liters of 'rice-water stool' daily)." },
      { text: "Inhalation of dust during desert windstorms", isCorrect: false, explanation: "Cholera is a water-borne fecal-oral enteric infection." },
      { text: "Direct sunlight exposure at noon", isCorrect: false, explanation: "Sunlight is not a pathogen vector." },
      { text: "Bites from venomous sea urchins", isCorrect: false, explanation: "Cholera is caused by contaminated drinking water." }
    ],
    explanation: "John Snow famously traced the 1854 London cholera epidemic to a contaminated water pump on Broad Street, establishing modern epidemiology.",
    tags: ["human-body", "diseases", "cholera", "bacteria", "water-borne", "infectious-diseases"]
  },
  {
    title: "What is cancer at the basic cellular level?",
    difficulty: "Medium",
    options: [
      { text: "Uncontrolled mitotic cell division and proliferation driven by genetic mutations, evading apoptosis and invading adjacent tissues (metastasis)", isCorrect: true, explanation: "Mutations in oncogenes (e.g., RAS) and tumor suppressor genes (e.g., p53) dismantle normal cell cycle checkpoints, leading to malignant neoplasms." },
      { text: "A bacterial colony that replaces all human muscle cells with plant leaves", isCorrect: false, explanation: "Cancer arises from human cells that undergo malignant transformation." },
      { text: "An autoimmune allergic reaction to drinking cold water", isCorrect: false, explanation: "Cancer is a genetic/epigenetic disease of uncontrolled proliferation." },
      { text: "The temporary accumulation of excess vitamin C in the liver", isCorrect: false, explanation: "Vitamin C is water-soluble and does not cause cancer." }
    ],
    explanation: "Hallmarks of cancer include self-sufficiency in growth signals, insensitivity to anti-growth signals, evading apoptosis, limitless replicative potential, and metastasis.",
    tags: ["human-body", "diseases", "cancer", "cell-biology", "oncology", "pathology"]
  },
  {
    title: "Tetanus ('lockjaw') is caused by the neurotoxin tetanospasmin produced by Clostridium tetani, which enters the body primarily through:",
    difficulty: "Medium",
    options: [
      { text: "Deep puncture wounds contaminated with soil, feces, or rusty metallic objects", isCorrect: true, explanation: "C. tetani is an obligate anaerobic spore-forming bacterium; deep puncture wounds provide the oxygen-poor environment required for spores to germinate and release toxin." },
      { text: "Drinking pasteurized cow milk", isCorrect: false, explanation: "Pasteurization destroys bacteria." },
      { text: "Breathing mountain air at high altitudes", isCorrect: false, explanation: "Tetanus is not an airborne respiratory disease." },
      { text: "Eating unwashed fresh strawberries", isCorrect: false, explanation: "Tetanus requires anaerobic deep wound conditions, prevented via vaccination." }
    ],
    explanation: "The tetanus toxin blocks inhibitory neurotransmitter release (GABA and glycine) in the spinal cord, causing agonizing spastic muscle contractions.",
    tags: ["human-body", "diseases", "tetanus", "bacteria", "neurotoxin", "vaccines"]
  },
  {
    title: "Pellagra is a severe deficiency disease historically characterized by the 'Four Ds' (Diarrhea, Dermatitis, Dementia, and Death), caused by a lack of:",
    difficulty: "Hard",
    options: [
      { text: "Vitamin B3 (Niacin) or its amino acid precursor tryptophan", isCorrect: true, explanation: "Niacin is the essential precursor for NAD/NADP coenzymes in cellular respiration; deficiency severely damages high-turnover tissues (skin, gut) and brain." },
      { text: "Vitamin B1 (Thiamine)", isCorrect: false, explanation: "Thiamine deficiency causes beriberi." },
      { text: "Vitamin C (Ascorbic acid)", isCorrect: false, explanation: "Vitamin C deficiency causes scurvy." },
      { text: "Vitamin K", isCorrect: false, explanation: "Vitamin K deficiency causes bleeding diathesis." }
    ],
    explanation: "Pellagra was common in populations subsisting almost entirely on untreated corn/maize without traditional alkali nixtamalization.",
    tags: ["human-body", "diseases", "pellagra", "vitamins", "niacin", "deficiency-diseases"]
  },
  {
    title: "What causes sickle cell disease (sickle cell anemia) at the molecular genetic level?",
    difficulty: "Hard",
    options: [
      { text: "A single point mutation in the beta-globin gene substituting valine for glutamic acid, causing hemoglobin to polymerize into rigid sickle-shaped rods under low oxygen", isCorrect: true, explanation: "The crescent-shaped erythrocytes clog microcapillaries (vaso-occlusive crisis) and hemolyze prematurely, causing severe pain, organ damage, and chronic anemia." },
      { text: "A bacterial infection acquired by swimming in stagnant ponds", isCorrect: false, explanation: "Sickle cell is an inherited genetic autosomal recessive disorder." },
      { text: "Eating food deficient in sodium chloride", isCorrect: false, explanation: "It is a genetic genetic mutation, not dietary." },
      { text: "An excess of dietary iron in drinking water", isCorrect: false, explanation: "It is caused by the mutant HbS hemoglobin allele." }
    ],
    explanation: "Heterozygous carriers (sickle cell trait) possess natural evolutionary resistance against severe falciparum malaria.",
    tags: ["human-body", "diseases", "genetics", "sickle-cell", "hemoglobin", "mutation"]
  },
  {
    title: "Rabies is a fatal viral encephalitis transmitted through the saliva of infected mammals (such as dogs and bats) that attacks which system?",
    difficulty: "Easy",
    options: [
      { text: "Central Nervous System (brain and spinal cord)", isCorrect: true, explanation: "The rabies lyssavirus travels retrograde along peripheral nerves at roughly 10-100 mm per day to the brain, causing hydrophobia, delirium, and 99.9% fatality once symptoms appear." },
      { text: "Skeletal system bone marrow", isCorrect: false, explanation: "Rabies is a neurotropic virus attacking neurons." },
      { text: "Digestive stomach lining", isCorrect: false, explanation: "It replicates in salivary glands and brain tissue, not stomach mucosa." },
      { text: "Outer fingernail keratin", isCorrect: false, explanation: "It targets neural synaptic pathways." }
    ],
    explanation: "Post-exposure prophylaxis (rabies vaccine and immunoglobulin) administered promptly after an animal bite is 100% effective in preventing fatal rabies.",
    tags: ["human-body", "diseases", "rabies", "viruses", "nervous-system", "infectious-diseases"]
  },
  {
    title: "Kwashiorkor, a form of severe childhood malnutrition, is distinguished clinically by edema (fluid swelling) and a distended belly caused by:",
    difficulty: "Medium",
    options: [
      { text: "Severe dietary protein deficiency despite adequate carbohydrate calories, causing low plasma albumin and fluid leakage into tissues", isCorrect: true, explanation: "Hypoalbuminemia drops capillary oncotic pressure, causing intravascular fluid to leak into the peritoneal cavity (ascites) and subcutaneous tissues." },
      { text: "Overeating raw animal fat", isCorrect: false, explanation: "It is a devastating protein deficiency state in impoverished children." },
      { text: "Infection by giant desert tapeworms", isCorrect: false, explanation: "The distended belly is caused by fluid ascites and hepatomegaly, not tapeworms." },
      { text: "Excessive vitamin C intake", isCorrect: false, explanation: "It is driven by protein starvation." }
    ],
    explanation: "In contrast to marasmus (overall starvation in calories and protein), kwashiorkor is specific protein malnutrition.",
    tags: ["human-body", "diseases", "nutrition", "kwashiorkor", "protein", "deficiency-diseases"]
  },
  {
    title: "An autoimmune disease occurs when the human immune system:",
    difficulty: "Easy",
    options: [
      { text: "Loses self-tolerance and mistakenly attacks the body's own healthy tissues and organs (e.g., Type 1 diabetes, rheumatoid arthritis, lupus)", isCorrect: true, explanation: "Autoreactive T cells and autoantibodies target self-antigens, causing chronic tissue destruction and systemic inflammation." },
      { text: "Becomes infected by alien parasites from outer space", isCorrect: false, explanation: "Biologically impossible." },
      { text: "Produces excess stomach acid during marathon running", isCorrect: false, explanation: "Autoimmunity is an immune breakdown of self-tolerance." },
      { text: "Stops producing red blood cells due to deep sleep", isCorrect: false, explanation: "Hematopoiesis is unrelated to self-tolerance failure." }
    ],
    explanation: "In autoimmune disorders, the immune system fails to recognize self-MHC complexes and destroys native cells.",
    tags: ["human-body", "diseases", "autoimmune", "immune-system", "pathology", "life-sciences-health"]
  },

  // ==========================================
  // SECTION 6: FIRST AID & EMERGENCY RESPONSE (Questions 81 to 95)
  // ==========================================
  {
    title: "In adult Cardiopulmonary Resuscitation (CPR), what is the correct recommended chest compression depth and rate for an unresponsive, non-breathing victim?",
    difficulty: "Easy",
    options: [
      { text: "Compress at a rate of 100 to 120 beats per minute to a depth of at least 5 to 6 cm (2 to 2.4 inches)", isCorrect: true, explanation: "Compressing hard and fast in the center of the chest to the beat of the song 'Stayin' Alive' (100-120 bpm) maintains vital cerebral and coronary perfusion." },
      { text: "Compress 20 times per minute to a depth of 1 cm", isCorrect: false, explanation: "Far too slow and shallow to generate blood circulation." },
      { text: "Compress 300 times per minute to a depth of 15 cm", isCorrect: false, explanation: "Dangerous and impossible; would crush the heart and spine." },
      { text: "Only administer rescue breaths without any chest compressions", isCorrect: false, explanation: "High-quality chest compressions are the single most critical element of modern adult CPR." }
    ],
    explanation: "High-quality CPR demands full chest recoil between compressions and minimizing interruptions to maintain perfusion pressure.",
    tags: ["human-body", "first-aid", "cpr", "emergency", "cardiovascular", "life-sciences-health"]
  },
  {
    title: "What is the standard ratio of chest compressions to rescue breaths during conventional adult CPR performed by a trained rescuer?",
    difficulty: "Easy",
    options: [
      { text: "30 compressions followed by 2 rescue breaths", isCorrect: true, explanation: "The 30:2 ratio applies to single-rescuer adult CPR; untrained bystanders should perform hands-only CPR (continuous uninterrupted chest compressions)." },
      { text: "5 compressions followed by 5 rescue breaths", isCorrect: false, explanation: "30:2 is the international AHA and ERC standard." },
      { text: "100 compressions followed by 20 rescue breaths", isCorrect: false, explanation: "Ratio is 30 compressions to 2 breaths." },
      { text: "1 compression followed by 1 rescue breath", isCorrect: false, explanation: "Would disrupt myocardial perfusion pressure." }
    ],
    explanation: "Cycles of 30 chest compressions followed by 2 breaths deliver balanced oxygenation and blood circulation.",
    tags: ["human-body", "first-aid", "cpr", "emergency", "life-sciences-health"]
  },
  {
    title: "When an adult is choking on a foreign object and cannot speak, cough, or breathe (complete airway obstruction), what first aid procedure should be performed immediately?",
    difficulty: "Easy",
    options: [
      { text: "The Heimlich maneuver (abdominal thrusts delivered upward and inward just above the navel)", isCorrect: true, explanation: "Quick inward and upward thrusts against the diaphragm force residual air from the lungs like a pneumatic corkscrew, popping the foreign object out of the trachea." },
      { text: "Giving the person a large glass of water to wash down the object", isCorrect: false, explanation: "Offering liquids to a choking victim can cause aspiration into the lungs." },
      { text: "Slapping the person's cheeks until they sneeze", isCorrect: false, explanation: "Cheek slapping does not clear tracheal blockages." },
      { text: "Having the victim lie flat on their back and holding their breath", isCorrect: false, explanation: "Will hasten suffocation and loss of consciousness." }
    ],
    explanation: "Abdominal thrusts elevate the diaphragm, creating high subglottic air pressure to expel the obstruction.",
    tags: ["human-body", "first-aid", "choking", "heimlich-maneuver", "emergency", "life-sciences-health"]
  },
  {
    title: "What is the immediate, essential first aid treatment for a minor thermal burn (first-degree or small second-degree burn)?",
    difficulty: "Easy",
    options: [
      { text: "Cool the burn immediately with clean, cool running tap water for at least 10 to 20 minutes", isCorrect: true, explanation: "Cool running water stops the burning process in skin layers, relieves pain, and reduces edema; never apply ice, butter, grease, or toothpaste." },
      { text: "Apply direct ice cubes onto the burn wound", isCorrect: false, explanation: "Direct ice causes frostbite tissue necrosis on compromised burned skin." },
      { text: "Coat the burn in butter or cooking oil", isCorrect: false, explanation: "Fats and oils trap heat inside the burn and promote bacterial infection." },
      { text: "Pop all fluid-filled blisters with a sewing needle", isCorrect: false, explanation: "Blisters are sterile natural bandages; popping them invites severe infection." }
    ],
    explanation: "Cool running water (not freezing ice) dissipates thermal energy from deep dermal tissue layers without causing vasoconstrictive necrosis.",
    tags: ["human-body", "first-aid", "burns", "emergency", "life-sciences-health"]
  },
  {
    title: "To control severe, life-threatening external bleeding from an open wound on an arm or leg, the first and most effective immediate action is:",
    difficulty: "Easy",
    options: [
      { text: "Apply firm, continuous direct pressure over the wound using a clean dressing or cloth", isCorrect: true, explanation: "Direct manual pressure compresses leaking blood vessels against underlying bone and tissue, allowing platelets and fibrin to form a primary hemostatic plug." },
      { text: "Pour rubbing alcohol into the wound and leave it uncovered", isCorrect: false, explanation: "Alcohol damages open tissue cells and will not halt blood hemorrhage." },
      { text: "Wash the wound continuously with hot boiling water", isCorrect: false, explanation: "Hot water dilates blood vessels, accelerating blood loss." },
      { text: "Have the patient run five laps around the building", isCorrect: false, explanation: "Exercise raises heart rate and blood loss." }
    ],
    explanation: "Firm direct manual pressure over the bleeding site stops over 90% of external hemorrhages; a windlass tourniquet is used for uncontrolled arterial limb bleeding.",
    tags: ["human-body", "first-aid", "bleeding", "hemorrhage", "emergency", "life-sciences-health"]
  },
  {
    title: "In the FAST acronym used globally by emergency medical services to identify the signs of an acute stroke, what does each letter stand for?",
    difficulty: "Easy",
    options: [
      { text: "Face drooping, Arm weakness, Speech difficulty, Time to call emergency services", isCorrect: true, explanation: "Recognizing facial asymmetry, unilateral arm drift, or slurred speech mandates immediate emergency transport because thrombolytic stroke drugs must be given within 3 to 4.5 hours." },
      { text: "Fever, Allergy, Sweating, Tremor", isCorrect: false, explanation: "These do not represent the validated acute stroke recognition protocol." },
      { text: "Fracture, Ankle, Splint, Tourniquet", isCorrect: false, explanation: "These are orthopedic terms." },
      { text: "Food, Air, Sleep, Water", isCorrect: false, explanation: "These are general survival needs." }
    ],
    explanation: "'Time is brain'; every minute an ischemic stroke remains untreated, approximately 1.9 million cerebral neurons die.",
    tags: ["human-body", "first-aid", "stroke", "fast-protocol", "emergency", "neurology"]
  },
  {
    title: "How does heat stroke differ clinically from heat exhaustion, making heat stroke a life-threatening medical emergency?",
    difficulty: "Hard",
    options: [
      { text: "In heat stroke, the body's thermoregulatory center fails: core temperature exceeds 40°C (104°F) accompanied by altered mental state, confusion, seizures, or coma", isCorrect: true, explanation: "Heat exhaustion features heavy sweating and normal mental status; heat stroke represents multi-organ cellular thermal denaturation requiring aggressive, immediate cold-water immersion." },
      { text: "Heat stroke causes a sub-zero body temperature below 30°C", isCorrect: false, explanation: "Hypothermia is cold; heat stroke is severe hyperthermia." },
      { text: "Heat stroke occurs only in polar environments in winter", isCorrect: false, explanation: "Heat stroke is triggered by environmental heat and exertion." },
      { text: "Heat exhaustion is fatal within seconds while heat stroke requires no treatment", isCorrect: false, explanation: "Inverted: heat stroke is the critical emergency carrying high mortality." }
    ],
    explanation: "Heat stroke causes central nervous system dysfunction (delirium, coma) and demands immediate rapid cooling to save life.",
    tags: ["human-body", "first-aid", "heat-stroke", "heat-exhaustion", "emergency", "thermoregulation"]
  },
  {
    title: "Why should an unconscious, breathing person with no suspected spinal injury be placed into the 'recovery position' (lateral recumbent position)?",
    difficulty: "Easy",
    options: [
      { text: "It prevents the tongue from obstructing the airway and allows saliva or vomitus to drain freely out of the mouth, preventing fatal aspiration", isCorrect: true, explanation: "Placing the victim on their side with the head tilted back maintains an open airway and keeps fluids from entering the trachea and lungs." },
      { text: "It immediately cures all internal diseases", isCorrect: false, explanation: "It is a protective airway positioning technique, not a cure." },
      { text: "It restarts the heart without needing chest compressions", isCorrect: false, explanation: "The recovery position is only for patients who are already breathing normally." },
      { text: "It stretches the spinal cord to increase height", isCorrect: false, explanation: "Positioning is designed strictly for airway preservation." }
    ],
    explanation: "The recovery position uses gravity to keep the tongue forward and drain vomit, preventing airway suffocation in unconscious patients.",
    tags: ["human-body", "first-aid", "recovery-position", "airway", "emergency", "life-sciences-health"]
  },
  {
    title: "What is an Automated External Defibrillator (AED) designed to do when applied to a cardiac arrest victim?",
    difficulty: "Medium",
    options: [
      { text: "Analyze the heart's electrical rhythm and deliver a shock to terminate lethal arrhythmias (ventricular fibrillation or pulseless ventricular tachycardia), restoring coordinated sinus rhythm", isCorrect: true, explanation: "An AED will not shock a completely flatline heart (asystole); it depolarizes chaotic fibrillation, allowing the heart's natural sinoatrial pacemaker to resume normal rhythm." },
      { text: "Inject artificial blood directly through the skin", isCorrect: false, explanation: "AEDs deliver electrical shocks, not fluid injections." },
      { text: "Pump oxygen mechanically into the lungs through the nose", isCorrect: false, explanation: "That would be a mechanical ventilator." },
      { text: "Take an X-ray picture of the patient's ribcage", isCorrect: false, explanation: "AEDs analyze ECG rhythms, not radiologic X-rays." }
    ],
    explanation: "Prompt defibrillation with an AED within the first 3-5 minutes of collapse can produce survival rates as high as 50-70%.",
    tags: ["human-body", "first-aid", "aed", "defibrillator", "cardiac-arrest", "cpr", "emergency"]
  },
  {
    title: "When managing a suspected bone fracture in an arm or leg, what is the golden rule of first aid before medical transport arrives?",
    difficulty: "Medium",
    options: [
      { text: "Immobilize the injured limb with a splint in the position found, stabilizing the joint above and the joint below the fracture site", isCorrect: true, explanation: "Never attempt to push protruding bones back in or forcibly straighten an angulated fracture; immobilizing adjacent joints prevents sharp bone ends from lacerating nerves and arteries." },
      { text: "Violently pull and twist the limb to snap the bone back into place", isCorrect: false, explanation: "Forcible manipulation causes severe nerve laceration, vascular tearing, and shock." },
      { text: "Have the patient run or jump on the broken limb to test if it hurts", isCorrect: false, explanation: "Weight-bearing on a fracture causes severe displacement and soft tissue damage." },
      { text: "Submerge the broken bone in boiling mineral water", isCorrect: false, explanation: "Causes severe thermal burns and tissue destruction." }
    ],
    explanation: "Splinting immobilizes the joint above and below the fracture, mitigating pain and preventing secondary neurovascular trauma.",
    tags: ["human-body", "first-aid", "fractures", "splinting", "skeletal", "emergency"]
  },
  {
    title: "What is the primary first aid step when assisting someone experiencing a generalized tonic-clonic epileptic seizure?",
    difficulty: "Medium",
    options: [
      { text: "Clear nearby sharp or hard objects to protect their head, time the seizure, and gently roll them into the recovery position once convulsing stops", isCorrect: true, explanation: "Never place objects inside the person's mouth, and never physically restrain their convulsions; protect them from impact and monitor breathing." },
      { text: "Force a wooden spoon or wallet into their mouth between their teeth", isCorrect: false, explanation: "Dangerous myth: placing objects in the mouth causes broken teeth, jaw dislocation, and choked airway obstruction; humans cannot swallow their own tongue." },
      { text: "Restrain their arms and legs with heavy weights to stop the shaking", isCorrect: false, explanation: "Restraining convulsing limbs causes severe muscle tears and bone fractures." },
      { text: "Splash cold ice water onto their face", isCorrect: false, explanation: "Does not stop seizure activity and can induce aspiration." }
    ],
    explanation: "Protect the head, do NOT put anything in the mouth, and roll them onto their side once convulsions subside.",
    tags: ["human-body", "first-aid", "seizure", "epilepsy", "neurology", "emergency"]
  },
  {
    title: "An individual suffering from severe anaphylaxis (a life-threatening systemic allergic reaction with throat swelling and shock) requires immediate injection of:",
    difficulty: "Easy",
    options: [
      { text: "Epinephrine (Adrenaline) via an autoinjector into the outer mid-thigh", isCorrect: true, explanation: "Epinephrine stimulates alpha-1 receptors (constricting blood vessels to raise blood pressure) and beta-2 receptors (dilating bronchial airways and halting histamine release)." },
      { text: "Plain insulin", isCorrect: false, explanation: "Insulin lowers blood glucose and would cause lethal hypoglycemia." },
      { text: "Pure aspirin tablets", isCorrect: false, explanation: "Aspirin is an antiplatelet NSAID that does not treat anaphylactic shock." },
      { text: "Liquid glucose syrup", isCorrect: false, explanation: "Glucose treats hypoglycemia, not anaphylaxis." }
    ],
    explanation: "Epinephrine is the sole first-line medication capable of reversing acute airway constriction and cardiovascular collapse in anaphylaxis.",
    tags: ["human-body", "first-aid", "anaphylaxis", "epinephrine", "allergy", "emergency"]
  },
  {
    title: "Why should a commercial tourniquet be applied high and tight on an extremity for severe life-threatening arterial bleeding when direct pressure fails?",
    difficulty: "Medium",
    options: [
      { text: "It completely occludes arterial blood flow into the limb, preventing exsanguination (bleeding to death) within minutes", isCorrect: true, explanation: "Evidence from modern combat medicine confirms tourniquets placed 2-3 inches above the wound (or high on the limb) save lives from catastrophic arterial hemorrhage with minimal risk to the limb if removed within 2 hours." },
      { text: "It pumps clean oxygen into the wound", isCorrect: false, explanation: "A tourniquet is a mechanical compression strap." },
      { text: "It dissolves blood clots so bleeding continues freely", isCorrect: false, explanation: "It stops bleeding entirely." },
      { text: "It cools the limb to sub-zero temperatures", isCorrect: false, explanation: "Mechanical arterial occlusion is its mechanism of action." }
    ],
    explanation: "For arterial spurting limb hemorrhage, a windlass tourniquet tightened until the pulse ceases stops fatal exsanguination.",
    tags: ["human-body", "first-aid", "tourniquet", "hemorrhage", "bleeding", "emergency"]
  },
  {
    title: "What is the proper first aid protocol for treating an acute sprained ankle using the classic 'R.I.C.E.' acronym?",
    difficulty: "Easy",
    options: [
      { text: "Rest, Ice, Compression, Elevation", isCorrect: true, explanation: "Resting the ligament, applying ice packs (wrapped in cloth for 15-20 min), wrapping with an elastic bandage for compression, and elevating the ankle above heart level reduces swelling and inflammation." },
      { text: "Run, Ignite, Compress, Exercise", isCorrect: false, explanation: "Running and heat worsen acute ligament tears." },
      { text: "Rotate, Immobilize, Cast, Extend", isCorrect: false, explanation: "RICE stands for Rest, Ice, Compression, Elevation." },
      { text: "Reheat, Ingest, Clean, Evacuate", isCorrect: false, explanation: "Heat accelerates acute swelling." }
    ],
    explanation: "The R.I.C.E. protocol minimizes internal microvascular bleeding, limits edema, and protects torn joint ligaments.",
    tags: ["human-body", "first-aid", "rice-protocol", "sprains", "sports-medicine", "skeletal"]
  },
  {
    title: "When treating an individual who is conscious, sweating profusely, trembling, and exhibiting acute hypoglycemia (dangerously low blood sugar), what should be administered immediately?",
    difficulty: "Easy",
    options: [
      { text: "Fast-acting simple sugars (e.g., fruit juice, glucose tablets, non-diet soda, or candy)", isCorrect: true, explanation: "Rule of 15: Give 15 grams of fast-acting simple carbohydrates, wait 15 minutes, and re-test blood glucose; simple sugars absorb rapidly across the buccal and gastric mucosa." },
      { text: "A massive injection of insulin", isCorrect: false, explanation: "Giving insulin to a hypoglycemic patient will drive blood sugar to zero, causing seizures or death." },
      { text: "A large glass of pure salt water", isCorrect: false, explanation: "Hypoglycemia requires glucose, not salt water." },
      { text: "A high-fat bowl of melted butter", isCorrect: false, explanation: "Fats slow gastric emptying, delaying glucose absorption." }
    ],
    explanation: "Simple carbohydrates rapidly elevate blood glucose, preventing hypoglycemic coma.",
    tags: ["human-body", "first-aid", "hypoglycemia", "diabetes", "emergency", "nutrition"]
  },
  {
    title: "Tiny raised projections on the human tongue surface that contain clusters of gustatory taste buds are known as:",
    difficulty: "Medium",
    options: [
      { text: "Papillae (such as fungiform, foliate, and circumvallate papillae)", isCorrect: true, explanation: "Papillae provide friction and house microscopic taste buds that transmit chemosensory information to cranial nerves VII and IX." },
      { text: "Alveoli", isCorrect: false, explanation: "Alveoli are microscopic gas-exchange air sacs in the lungs." },
      { text: "Villi", isCorrect: false, explanation: "Villi are nutrient-absorbing projections in the mucosal lining of the small intestine." },
      { text: "Nephrons", isCorrect: false, explanation: "Nephrons are microscopic functional filtering units within the kidneys." }
    ],
    explanation: "Lingual papillae house gustatory cells that detect sweet, salty, sour, bitter, and umami tastes.",
    tags: ["human-body", "sense-organs", "taste", "papillae", "tongue", "anatomy"]
  },
  {
    title: "How does excessive exposure to blue light from smartphones and computer screens late in the evening disrupt healthy sleep cycles?",
    difficulty: "Medium",
    options: [
      { text: "It suppresses the pineal gland's secretion of melatonin, a hormone critical for signalling nighttime sleepiness", isCorrect: true, explanation: "Short-wavelength blue light stimulates intrinsically photosensitive retinal ganglion cells (ipRGCs), signaling the suprachiasmatic nucleus to inhibit nocturnal melatonin synthesis." },
      { text: "It rapidly degrades digestive enzymes inside the stomach lining", isCorrect: false, explanation: "Blue light does not degrade gastric proteases." },
      { text: "It directly strips red blood cells of circulating hemoglobin", isCorrect: false, explanation: "Light exposure has no direct destructive effect on erythrocytes." },
      { text: "It paralyzes the vocal cords, preventing nocturnal respiration", isCorrect: false, explanation: "Screen light does not paralyze laryngeal musculature." }
    ],
    explanation: "Suppression of melatonin by blue light delays the onset of REM and deep slow-wave sleep phases.",
    tags: ["human-body", "healthy-habits", "sleep", "melatonin", "circadian-rhythm"]
  },
  {
    title: "In autoimmune Type 1 Diabetes Mellitus, the body's immune system erroneously attacks and destroys which specialized cells in the pancreas?",
    difficulty: "Hard",
    options: [
      { text: "Beta cells located within the Islets of Langerhans, halting endogenous insulin synthesis", isCorrect: true, explanation: "T-cell-mediated autoimmune destruction of pancreatic beta cells results in an absolute deficiency of insulin, requiring lifelong exogenous insulin administration." },
      { text: "Alpha cells that synthesize and release glucagon", isCorrect: false, explanation: "Alpha cells produce glucagon and are largely preserved in early type 1 diabetes." },
      { text: "Acinar cells that produce pancreatic digestive amylase and lipase", isCorrect: false, explanation: "Acinar cells form the exocrine pancreas responsible for digestive juices." },
      { text: "Hepatocytes located in adjacent hepatic lobules", isCorrect: false, explanation: "Hepatocytes are functional liver cells, not pancreatic cells." }
    ],
    explanation: "Destruction of insulin-producing pancreatic beta cells leads to hyperglycemia and ketoacidosis if untreated.",
    tags: ["human-body", "diseases", "diabetes", "pancreas", "endocrine-system", "pathology"]
  },
  {
    title: "Atherosclerosis, the primary pathological driver of coronary artery disease and myocardial infarction, is characterized by:",
    difficulty: "Hard",
    options: [
      { text: "The progressive accumulation of lipid-rich fibrofatty plaques and calcium within the arterial tunica intima, restricting lumen blood flow", isCorrect: true, explanation: "Endothelial dysfunction allows LDL cholesterol oxidation, foam cell recruitment, fibrous cap formation, and lumen stenosis." },
      { text: "Complete cessation of electrical conduction down the dorsal spinal column", isCorrect: false, explanation: "Spinal cord injury causes neurological deficits, not vascular plaque buildup." },
      { text: "Excessive secretion of lubricating synovial fluid inside large synovial joints", isCorrect: false, explanation: "Joint effusion or synovitis affects joint cavities, not arterial walls." },
      { text: "Demyelination of peripheral motor axons in the extremities", isCorrect: false, explanation: "Axonal demyelination is characteristic of Guillain-Barré or peripheral neuropathy." }
    ],
    explanation: "Atherosclerotic plaque accumulation narrows arterial diameter and risks acute thrombosis upon plaque rupture.",
    tags: ["human-body", "diseases", "circulatory", "atherosclerosis", "cardiovascular", "pathology"]
  },
  {
    title: "What is the universally recommended immediate first aid treatment for a minor superficial thermal burn?",
    difficulty: "Easy",
    options: [
      { text: "Cool the burned area under cool running tap water for at least 10 to 20 minutes (never applying ice or butter)", isCorrect: true, explanation: "Cool running water dissipates residual heat from epidermal layers, curtails tissue depth injury, relieves pain, and avoids freezing frostbite caused by ice." },
      { text: "Apply freezing ice cubes directly on the burn to freeze and numb the blistered tissue", isCorrect: false, explanation: "Ice induces severe vasoconstriction and secondary frostbite tissue ischemia." },
      { text: "Cover the burn with kitchen butter, cooking oil, or grease to trap warmth", isCorrect: false, explanation: "Grease and butter trap heat, exacerbate tissue destruction, and foster bacterial contamination." },
      { text: "Immediately pop all fluid-filled blisters using an unsterilized household pin", isCorrect: false, explanation: "Intact blisters serve as sterile biological dressings; bursting them introduces pathogenic infection." }
    ],
    explanation: "Cool running water safely halts thermal penetration and reduces acute pain without causing tissue ischemia.",
    tags: ["human-body", "first-aid", "burns", "thermal-injury", "emergency", "healthy-habits"]
  }
];
