// scripts/current-affairs-questions-data.js
// 100 Verified Questions for:
// "Junior Current Affairs – National news, international news, science updates, sports updates, awards, important events"

const currentAffairsQuestions = [
  // ==========================================
  // GROUP 1: National News & Governance (001 - 018)
  // ==========================================
  {
    id: "q-current-001",
    title: "During the historic 18th G20 Heads of State and Government Summit held in New Delhi in September 2023, which permanent regional bloc was officially admitted as a new member of the G20 under India's Presidency?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Global Current Affairs & Summits", "Political Systems & International Relations"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The African Union (AU)", isCorrect: true },
      { id: "opt-2", text: "The Association of Southeast Asian Nations (ASEAN)", isCorrect: false },
      { id: "opt-3", text: "The Organization of American States (OAS)", isCorrect: false },
      { id: "opt-4", text: "The Gulf Cooperation Council (GCC)", isCorrect: false }
    ],
    explanation: "At the 18th G20 Leaders' Summit in Bharat Mandapam, New Delhi, India championed the historic admission of the 55-nation African Union as a permanent member of the G20, giving a powerful voice to the Global South.",
    tags: ["junior-current-affairs", "national-news", "international-news", "current-affairs", "summits"]
  },
  {
    id: "q-current-002",
    title: "Following the historic soft landing of Chandrayaan-3 near the lunar south pole on August 23, 2023, what official name was designated for the touchdown site of the Vikram lander?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Space Explorers", "Science & Technology Milestones"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Shiv Shakti Point", isCorrect: true },
      { id: "opt-2", text: "Tiranga Point", isCorrect: false },
      { id: "opt-3", text: "Jawahar Point", isCorrect: false },
      { id: "opt-4", text: "Atal Point", isCorrect: false }
    ],
    explanation: "Prime Minister Narendra Modi announced that the Chandrayaan-3 landing site would be named 'Shiv Shakti Point', while the Chandrayaan-2 crash site was named 'Tiranga Point', and August 23 was designated as 'National Space Day'.",
    tags: ["junior-current-affairs", "national-news", "science-updates", "space-mission", "isro"]
  },
  {
    id: "q-current-003",
    title: "India's first dedicated solar space observatory, Aditya-L1, was successfully inserted in January 2024 into a halo orbit around which point in space?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Space Explorers", "Science & Technology Milestones"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Sun-Earth Lagrange Point 1 (L1)", isCorrect: true },
      { id: "opt-2", text: "Sun-Earth Lagrange Point 2 (L2)", isCorrect: false },
      { id: "opt-3", text: "Earth-Moon Lagrange Point 4 (L4)", isCorrect: false },
      { id: "opt-4", text: "Geostationary Transfer Orbit (GTO)", isCorrect: false }
    ],
    explanation: "Aditya-L1 was placed in a halo orbit around the Sun-Earth L1 point, approximately 1.5 million kilometers from Earth, enabling continuous observation of the Sun without any occultation or eclipses.",
    tags: ["junior-current-affairs", "science-updates", "space-mission", "isro", "astronomy"]
  },
  {
    id: "q-current-004",
    title: "In the newly inaugurated Parliament House of India, which historical sacred golden sceptre from the Chola tradition was installed near the Speaker's chair in the Lok Sabha?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Indian Constitution & Governance", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Sengol", isCorrect: true },
      { id: "opt-2", text: "Chhatra", isCorrect: false },
      { id: "opt-3", text: "Dharma Chakra", isCorrect: false },
      { id: "opt-4", text: "Trishula", isCorrect: false }
    ],
    explanation: "The historic Sengol, crafted in Tamil Nadu and presented to Prime Minister Jawaharlal Nehru on the eve of Independence in 1947 to symbolize the transfer of power, was installed in the new Lok Sabha chamber by PM Narendra Modi.",
    tags: ["junior-current-affairs", "national-news", "history", "governance"]
  },
  {
    id: "q-current-005",
    title: "The Constitution (106th Amendment) Act, 2023, also celebrated as the 'Nari Shakti Vandan Adhiniyam', provides for what percentage of reservation for women in the Lok Sabha and State Legislative Assemblies?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Indian Constitution & Governance", "Public Administration & Policy"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "33% (one-third of total seats)", isCorrect: true },
      { id: "opt-2", text: "25% (one-fourth of total seats)", isCorrect: false },
      { id: "opt-3", text: "50% (half of total seats)", isCorrect: false },
      { id: "opt-4", text: "20% (one-fifth of total seats)", isCorrect: false }
    ],
    explanation: "The Nari Shakti Vandan Adhiniyam mandates a 33% reservation for women in the Lok Sabha, the Delhi Legislative Assembly, and all State Legislative Assemblies for a 15-year period post-delimitation.",
    tags: ["junior-current-affairs", "national-news", "governance", "constitution"]
  },
  {
    id: "q-current-006",
    title: "Inaugurated in January 2024, the 'Atal Bihari Vajpayee Sewri-Nhava Sheva Atal Setu' holds which national infrastructure distinction?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Science & Technology Milestones", "Physical Geography & Earth Systems"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Longest sea bridge in India (21.8 km)", isCorrect: true },
      { id: "opt-2", text: "Longest underwater railway tunnel in India", isCorrect: false },
      { id: "opt-3", text: "Highest cable-stayed bridge in the world", isCorrect: false },
      { id: "opt-4", text: "Longest double-decker cantilever bridge", isCorrect: false }
    ],
    explanation: "The Mumbai Trans Harbour Link (MTHL), officially named Atal Setu, spans 21.8 km (16.5 km over sea), connecting Sewri in South Mumbai to Chirle near Nhava Sheva in Navi Mumbai.",
    tags: ["junior-current-affairs", "national-news", "infrastructure", "engineering"]
  },
  {
    id: "q-current-007",
    title: "The world's highest railway arch bridge, towering 359 meters above the river bed, was constructed as part of the USBRL rail project in Jammu & Kashmir over which river?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Physical Geography & Earth Systems", "Science & Technology Milestones"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Chenab River", isCorrect: true },
      { id: "opt-2", text: "Jhelum River", isCorrect: false },
      { id: "opt-3", text: "Ravi River", isCorrect: false },
      { id: "opt-4", text: "Beas River", isCorrect: false }
    ],
    explanation: "The Chenab Rail Bridge stands 359 meters (1,178 ft) above the Chenab riverbed—35 meters taller than the Eiffel Tower—connecting Bakkal and Kauri in Reasi district of Jammu and Kashmir.",
    tags: ["junior-current-affairs", "national-news", "infrastructure", "geography"]
  },
  {
    id: "q-current-008",
    title: "Which national initiative launched by the Government of India in 2024 aims to provide free electricity up to 300 units per month to 1 crore households through rooftop solar installations?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Public Administration & Policy", "Environmental Ecology & Conservation"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "PM-Surya Ghar: Muft Bijli Yojana", isCorrect: true },
      { id: "opt-2", text: "PM-KUSUM Solar Scheme", isCorrect: false },
      { id: "opt-3", text: "UJALA Solar Rooftop Mission", isCorrect: false },
      { id: "opt-4", text: "Saubhagya Solar Suraksha", isCorrect: false }
    ],
    explanation: "With a total investment of over ₹75,000 crore, PM-Surya Ghar: Muft Bijli Yojana provides substantial central subsidies to install rooftop solar panels in 10 million households across India.",
    tags: ["junior-current-affairs", "national-news", "solar-energy", "governance"]
  },
  {
    id: "q-current-009",
    title: "Project Cheetah, the world's first intercontinental translocation of large wild carnivores, reintroduced wild cheetahs from Namibia and South Africa to which National Park in Madhya Pradesh?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Animal Encyclopedia", "Environmental Ecology & Conservation"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Kuno National Park", isCorrect: true },
      { id: "opt-2", text: "Kanha National Park", isCorrect: false },
      { id: "opt-3", text: "Bandhavgarh National Park", isCorrect: false },
      { id: "opt-4", text: "Jim Corbett National Park", isCorrect: false }
    ],
    explanation: "Cheetahs, which had been declared extinct in India in 1952, were reintroduced in September 2022 and February 2023 at Kuno National Park in Madhya Pradesh to restore grassland and savanna biomes.",
    tags: ["junior-current-affairs", "national-news", "wildlife", "conservation", "animals"]
  },
  {
    id: "q-current-010",
    title: "Under India's Deep Ocean Mission, what is the name of the indigenous manned submersible designed to carry three scientists to an ocean depth of 6,000 meters?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Oceanography & Water Systems", "Science & Technology Milestones"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Matsya 6000", isCorrect: true },
      { id: "opt-2", text: "Varuna 6000", isCorrect: false },
      { id: "opt-3", text: "Samudra 6000", isCorrect: false },
      { id: "opt-4", text: "Sagarika 6000", isCorrect: false }
    ],
    explanation: "Developed by the National Institute of Ocean Technology (NIOT), Chennai, 'Matsya 6000' is a titanium-alloy sphere submersible designed for deep-sea exploration of polymetallic nodules and marine biodiversity at 6 km depth.",
    tags: ["junior-current-affairs", "science-updates", "oceanography", "technology"]
  },
  {
    id: "q-current-011",
    title: "India's real-time payment system UPI (Unified Payments Interface) has expanded globally, enabling cross-border peer-to-peer linkages with which first foreign national payment system in 2023?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Macroeconomics, Banking & Trade", "Global Current Affairs & Summits"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "PayNow (Singapore)", isCorrect: true },
      { id: "opt-2", text: "PromptPay (Thailand)", isCorrect: false },
      { id: "opt-3", text: "Alipay (China)", isCorrect: false },
      { id: "opt-4", text: "Swish (Sweden)", isCorrect: false }
    ],
    explanation: "In February 2023, India's UPI and Singapore's PayNow launched a historic cross-border linkage allowing instant, low-cost bilateral fund transfers. UPI has since expanded acceptance to France, UAE, Sri Lanka, Mauritius, and Nepal.",
    tags: ["junior-current-affairs", "national-news", "banking", "finance", "technology"]
  },
  {
    id: "q-current-012",
    title: "In alignment with the National Education Policy (NEP) 2020, what is the name of the permanent 12-digit digital education identity card launched for all students in India?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Public Administration & Policy", "Computer Science & AI"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "APAAR ID ('One Nation, One Student ID')", isCorrect: true },
      { id: "opt-2", text: "VIDYA ID", isCorrect: false },
      { id: "opt-3", text: "SHIKSHA Card", isCorrect: false },
      { id: "opt-4", text: "DIKSHA Pass", isCorrect: false }
    ],
    explanation: "APAAR (Automated Permanent Academic Account Registry) is a unique 12-digit student ID linked to DigiLocker and the Academic Bank of Credits (ABC) to track academic credentials and accomplishments seamlessly.",
    tags: ["junior-current-affairs", "national-news", "education", "governance"]
  },
  {
    id: "q-current-013",
    title: "The grand ceremonial avenue stretching from Rashtrapati Bhavan to India Gate in New Delhi was revamped under the Central Vista project and renamed as:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "History Time Machine", "Indian Constitution & Governance"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Kartavya Path", isCorrect: true },
      { id: "opt-2", text: "Swaraj Path", isCorrect: false },
      { id: "opt-3", text: "Nyaya Path", isCorrect: false },
      { id: "opt-4", text: "Amrit Path", isCorrect: false }
    ],
    explanation: "Formerly known as Rajpath (and Kingsway during British colonial rule), the 3-km ceremonial boulevard was rechristened 'Kartavya Path' (Path of Duty) by PM Modi in September 2022 to shed colonial-era mindsets.",
    tags: ["junior-current-affairs", "national-news", "delhi", "governance"]
  },
  {
    id: "q-current-014",
    title: "The 108-foot-tall bronze 'Statue of Oneness' depicting the 8th-century philosopher Adi Shankaracharya as a young boy was unveiled in 2023 at which holy town?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Art, Music & Culture", "History Time Machine"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Omkareshwar (Madhya Pradesh)", isCorrect: true },
      { id: "opt-2", text: "Ujjain (Madhya Pradesh)", isCorrect: false },
      { id: "opt-3", text: "Varanasi (Uttar Pradesh)", isCorrect: false },
      { id: "opt-4", text: "Puri (Odisha)", isCorrect: false }
    ],
    explanation: "Erected atop the Mandhata mountain in Omkareshwar along the Narmada River, the 108-ft 'Statue of Oneness' (Ekatmata Ki Pratima) commemorates Adi Shankaracharya where he met his guru Govinda Bhagavatpada.",
    tags: ["junior-current-affairs", "national-news", "culture", "art-music-culture"]
  },
  {
    id: "q-current-015",
    title: "Who served as the Chairman of the High-Level Committee (HLC) on 'One Nation, One Election' which submitted its comprehensive report in March 2024?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Indian Constitution & Governance", "Public Administration & Policy"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Ram Nath Kovind (Former President of India)", isCorrect: true },
      { id: "opt-2", text: "Justice N. V. Ramana", isCorrect: false },
      { id: "opt-3", text: "Shri Rajiv Kumar", isCorrect: false },
      { id: "opt-4", text: "Pranab Mukherjee", isCorrect: false }
    ],
    explanation: "Former President of India Ram Nath Kovind chaired the 8-member High-Level Committee on Simultaneous Elections, recommending synchronized elections for Lok Sabha and State Legislative Assemblies followed by local body elections.",
    tags: ["junior-current-affairs", "national-news", "governance", "constitution"]
  },
  {
    id: "q-current-016",
    title: "The 206-foot-tall 'Statue of Social Justice', the world's tallest statue of Dr. B. R. Ambedkar outside of his memorials in Maharashtra, was unveiled in January 2024 in which Indian city?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "History Time Machine", "Indian Constitution & Governance"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Vijayawada (Andhra Pradesh)", isCorrect: true },
      { id: "opt-2", text: "Hyderabad (Telangana)", isCorrect: false },
      { id: "opt-3", text: "Nagpur (Maharashtra)", isCorrect: false },
      { id: "opt-4", text: "Bengaluru (Karnataka)", isCorrect: false }
    ],
    explanation: "The 'Statue of Social Justice', standing 206 feet tall (including an 81-foot pedestal), was inaugurated at Swaraj Maidan in Vijayawada, Andhra Pradesh, as a tribute to Babasaheb Ambedkar's constitutional legacy.",
    tags: ["junior-current-affairs", "national-news", "governance", "history"]
  },
  {
    id: "q-current-017",
    title: "India's premier semi-high-speed indigenous passenger train, manufactured by the Integral Coach Factory (ICF) in Chennai, is known as:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Science & Technology Milestones", "Physical Geography & Earth Systems"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Vande Bharat Express (Train 18)", isCorrect: true },
      { id: "opt-2", text: "Tejas Express", isCorrect: false },
      { id: "opt-3", text: "Gatimaan Express", isCorrect: false },
      { id: "opt-4", text: "Amrit Bharat Express", isCorrect: false }
    ],
    explanation: "Vande Bharat Express (originally Train 18) is an indigenous electric multiple unit (EMU) train manufactured by ICF Chennai featuring aerodynamic nose cones, regenerative braking, and operational speeds up to 160 km/h.",
    tags: ["junior-current-affairs", "national-news", "railways", "infrastructure"]
  },
  {
    id: "q-current-018",
    title: "At the 2023 UN Climate Change Conference (COP28), Prime Minister Narendra Modi proposed which major global environmental campaign focused on creating a localized 'Green Credit' marketplace?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Environmental Ecology & Conservation", "Global Current Affairs & Summits"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Green Credits Programme (GCP)", isCorrect: true },
      { id: "opt-2", text: "Blue Carbon Initiative", isCorrect: false },
      { id: "opt-3", text: "Clean Terra Compact", isCorrect: false },
      { id: "opt-4", text: "Zero Emission Bharat Pact", isCorrect: false }
    ],
    explanation: "Co-hosted by India and UAE at COP28 Dubai, the Green Credit Initiative aims to incentivize voluntary pro-planet environmental actions like afforestation and water conservation beyond conventional carbon offset markets.",
    tags: ["junior-current-affairs", "national-news", "environment", "summits"]
  },

  // ==========================================
  // GROUP 2: International News & Global Summits (019 - 034)
  // ==========================================
  {
    id: "q-current-019",
    title: "In January 2024, the BRICS alliance formally admitted several new full member states. Which of the following nations was among the newly inducted members?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Global Current Affairs & Summits", "Political Systems & International Relations"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "United Arab Emirates (UAE)", isCorrect: true },
      { id: "opt-2", text: "Australia", isCorrect: false },
      { id: "opt-3", text: "Japan", isCorrect: false },
      { id: "opt-4", text: "Canada", isCorrect: false }
    ],
    explanation: "At the 15th BRICS summit in Johannesburg, invitations were issued leading to the accession of UAE, Iran, Egypt, and Ethiopia into BRICS on January 1, 2024.",
    tags: ["junior-current-affairs", "international-news", "current-affairs", "summits"]
  },
  {
    id: "q-current-020",
    title: "Which Nordic nation became the 31st member of the North Atlantic Treaty Organization (NATO) in April 2023, followed by Sweden as the 32nd member in March 2024?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Global Current Affairs & Summits", "World Continents and oceans"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Finland", isCorrect: true },
      { id: "opt-2", text: "Norway", isCorrect: false },
      { id: "opt-3", text: "Denmark", isCorrect: false },
      { id: "opt-4", text: "Iceland", isCorrect: false }
    ],
    explanation: "Following decades of military non-alignment, Finland officially joined NATO on April 4, 2023, doubling the military alliance's direct border with Russia, with Sweden joining as the 32nd ally in March 2024.",
    tags: ["junior-current-affairs", "international-news", "geopolitics", "europe"]
  },
  {
    id: "q-current-021",
    title: "The historic UN Climate Change Conference COP28 held in Dubai, UAE in December 2023 produced the 'UAE Consensus', which for the first time explicitly called on nations to:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Environmental Ecology & Conservation", "Global Current Affairs & Summits"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Transition away from fossil fuels in energy systems", isCorrect: true },
      { id: "opt-2", text: "Immediately ban all commercial international air travel", isCorrect: false },
      { id: "opt-3", text: "Cease all domestic agricultural livestock farming by 2030", isCorrect: false },
      { id: "opt-4", text: "Decommission all nuclear fission power plants globally", isCorrect: false }
    ],
    explanation: "COP28 approved the landmark UAE Consensus calling for 'transitioning away from fossil fuels in energy systems, in a just, orderly and equitable manner... so as to achieve net zero by 2050', alongside establishing the Loss and Damage fund.",
    tags: ["junior-current-affairs", "international-news", "climate-change", "summits"]
  },
  {
    id: "q-current-022",
    title: "Which historic transnational transport and infrastructure corridor was unveiled on the sidelines of the G20 New Delhi Summit to link India, the Arabian Gulf, and Europe?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Global Current Affairs & Summits", "Macroeconomics, Banking & Trade"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "India-Middle East-Europe Economic Corridor (IMEC)", isCorrect: true },
      { id: "opt-2", text: "International North-South Transport Corridor (INSTC)", isCorrect: false },
      { id: "opt-3", text: "Belt and Road Maritime Link", isCorrect: false },
      { id: "opt-4", text: "Trans-Eurasian Fiber Highway", isCorrect: false }
    ],
    explanation: "The IMEC MOU was signed by India, the US, Saudi Arabia, UAE, France, Germany, Italy, and the EU to connect rail networks and ship-to-rail transit, electricity cables, and clean hydrogen pipelines from India to Europe.",
    tags: ["junior-current-affairs", "international-news", "trade", "infrastructure"]
  },
  {
    id: "q-current-023",
    title: "The United Nations General Assembly officially declared the year 2023 as the International Year of what, following an initiative sponsored by India?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Living World Explorers", "Global Current Affairs & Summits"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "International Year of Millets (Shree Anna)", isCorrect: true },
      { id: "opt-2", text: "International Year of Pulses", isCorrect: false },
      { id: "opt-3", text: "International Year of Indigenous Forests", isCorrect: false },
      { id: "opt-4", text: "International Year of Sustainable Aquaculture", isCorrect: false }
    ],
    explanation: "Championed by India and supported by 72 nations, the UN declared 2023 as the International Year of Millets (IYM 2023) to highlight the nutritional, climate-resilient, and food-security benefits of sorghum, pearl millet, ragi, and other 'Shree Anna'.",
    tags: ["junior-current-affairs", "international-news", "agriculture", "un"]
  },
  {
    id: "q-current-024",
    title: "Which country has continuously retained the #1 rank as the world's happiest country in the UN World Happiness Report for seven consecutive years through 2024?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Global Current Affairs & Summits", "World Continents and oceans"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Finland", isCorrect: true },
      { id: "opt-2", text: "Switzerland", isCorrect: false },
      { id: "opt-3", text: "New Zealand", isCorrect: false },
      { id: "opt-4", text: "Denmark", isCorrect: false }
    ],
    explanation: "Finland has ranked as the happiest country on Earth for seven straight years according to the World Happiness Report, credited to high social trust, universal healthcare, strong education, and proximity to nature.",
    tags: ["junior-current-affairs", "international-news", "happiness-index", "un"]
  },
  {
    id: "q-current-025",
    title: "The Global Biofuels Alliance (GBA) was launched at the 2023 G20 Summit by India alongside which two leading biofuel-producing nations?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Global Current Affairs & Summits", "Environmental Ecology & Conservation"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "United States and Brazil", isCorrect: true },
      { id: "opt-2", text: "Russia and China", isCorrect: false },
      { id: "opt-3", text: "Germany and France", isCorrect: false },
      { id: "opt-4", text: "Saudi Arabia and Canada", isCorrect: false }
    ],
    explanation: "India, the United States, and Brazil (who together produce 85% of global ethanol) co-founded the Global Biofuels Alliance (GBA) to accelerate the global uptake of sustainable biofuels like ethanol and sustainable aviation fuel (SAF).",
    tags: ["junior-current-affairs", "international-news", "energy", "summits"]
  },
  {
    id: "q-current-026",
    title: "Where is the global headquarters of the International Solar Alliance (ISA), an international treaty-based intergovernmental organization initiated jointly by India and France?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Global Current Affairs & Summits", "Environmental Ecology & Conservation"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Gurugram, Haryana (India)", isCorrect: true },
      { id: "opt-2", text: "Paris (France)", isCorrect: false },
      { id: "opt-3", text: "Geneva (Switzerland)", isCorrect: false },
      { id: "opt-4", text: "Nairobi (Kenya)", isCorrect: false }
    ],
    explanation: "The International Solar Alliance (ISA) is headquartered at the National Institute of Solar Energy (NISE) campus in Gurugram, India, making it the first treaty-based intergovernmental organization to be headquartered in India.",
    tags: ["junior-current-affairs", "international-news", "solar-energy", "governance"]
  },
  {
    id: "q-current-027",
    title: "In March 2024, the European Parliament enacted the world's first comprehensive legal framework regulating Artificial Intelligence, known as:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Artificial Intelligence & Machine Learning", "Computer Science & AI"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The European Union Artificial Intelligence Act (EU AI Act)", isCorrect: true },
      { id: "opt-2", text: "The Global Algorithmic Fairness Treaty", isCorrect: false },
      { id: "opt-3", text: "The Digital Millennium Neural Charter", isCorrect: false },
      { id: "opt-4", text: "The Bletchley Cyber Protocol", isCorrect: false }
    ],
    explanation: "The EU AI Act classifies artificial intelligence applications into risk-based tiers (unacceptable risk, high risk, specific transparency risk, minimal risk) and bans harmful practices like cognitive behavioral manipulation and untargeted facial recognition scraping.",
    tags: ["junior-current-affairs", "international-news", "ai", "technology", "law"]
  },
  {
    id: "q-current-028",
    title: "Which South American nation formally inaugurated Javier Milei as its President in December 2023, introducing sweeping radical economic deregulation policies?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "World Continents and oceans", "Macroeconomics, Banking & Trade"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Argentina", isCorrect: true },
      { id: "opt-2", text: "Chile", isCorrect: false },
      { id: "opt-3", text: "Colombia", isCorrect: false },
      { id: "opt-4", text: "Uruguay", isCorrect: false }
    ],
    explanation: "Libertarian economist Javier Milei took office as President of Argentina in December 2023, initiating sweeping deregulation, closing government ministries, and devaluing the Argentine peso to tackle hyperinflation.",
    tags: ["junior-current-affairs", "international-news", "geopolitics", "south-america"]
  },
  {
    id: "q-current-029",
    title: "In 2023 and 2024, maritime traffic through the vital Bab-el-Mandeb strait and the Red Sea was disrupted due to attacks on international merchant vessels by which group based in Yemen?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Global Current Affairs & Summits", "Physical Geography & Earth Systems"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Houthi movement (Ansar Allah)", isCorrect: true },
      { id: "opt-2", text: "Al-Shabaab", isCorrect: false },
      { id: "opt-3", text: "Hezbollah", isCorrect: false },
      { id: "opt-4", text: "Boko Haram", isCorrect: false }
    ],
    explanation: "Houthi missile and drone strikes forced major global shipping lines to divert cargo ships away from the Suez Canal around the Cape of Good Hope at the southern tip of Africa, increasing global transit times and costs.",
    tags: ["junior-current-affairs", "international-news", "trade", "geopolitics"]
  },
  {
    id: "q-current-030",
    title: "The principal judicial organ of the United Nations, the International Court of Justice (ICJ), is located in which European city?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Global Current Affairs & Summits", "World History & Global Conflicts"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The Hague (Netherlands)", isCorrect: true },
      { id: "opt-2", text: "Geneva (Switzerland)", isCorrect: false },
      { id: "opt-3", text: "Brussels (Belgium)", isCorrect: false },
      { id: "opt-4", text: "Vienna (Austria)", isCorrect: false }
    ],
    explanation: "The ICJ, seated at the Peace Palace in The Hague, Netherlands, settles legal disputes between member states and provides advisory opinions on international legal questions.",
    tags: ["junior-current-affairs", "international-news", "un", "law"]
  },
  {
    id: "q-current-031",
    title: "Which nation hosted the 29th UN Climate Change Conference (COP29) in November 2024 in its capital city of Baku?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Global Current Affairs & Summits", "Physical Geography & Earth Systems"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Azerbaijan", isCorrect: true },
      { id: "opt-2", text: "Kazakhstan", isCorrect: false },
      { id: "opt-3", text: "Uzbekistan", isCorrect: false },
      { id: "opt-4", text: "Armenia", isCorrect: false }
    ],
    explanation: "Azerbaijan hosted COP29 in Baku along the Caspian Sea, focusing heavily on agreeing on the New Collective Quantified Goal (NCQG) for international climate finance for developing nations.",
    tags: ["junior-current-affairs", "international-news", "climate-change", "summits"]
  },
  {
    id: "q-current-032",
    title: "The regional grouping BIMSTEC (Bay of Bengal Initiative for Multi-Sectoral Technical and Economic Cooperation) has its permanent Secretariat located in:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Global Current Affairs & Summits", "Oceanography & Water Systems"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Dhaka (Bangladesh)", isCorrect: true },
      { id: "opt-2", text: "New Delhi (India)", isCorrect: false },
      { id: "opt-3", text: "Colombo (Sri Lanka)", isCorrect: false },
      { id: "opt-4", text: "Bangkok (Thailand)", isCorrect: false }
    ],
    explanation: "BIMSTEC includes 7 member nations (Bangladesh, Bhutan, India, Myanmar, Nepal, Sri Lanka, and Thailand). Its permanent secretariat was established in Dhaka, Bangladesh in 2014.",
    tags: ["junior-current-affairs", "international-news", "asia", "geopolitics"]
  },
  {
    id: "q-current-033",
    title: "Which prominent East Asian nation celebrated the crowning of its 102nd Prime Minister, Shigeru Ishiba, in October 2024?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Global Current Affairs & Summits", "World Continents and oceans"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Japan", isCorrect: true },
      { id: "opt-2", text: "South Korea", isCorrect: false },
      { id: "opt-3", text: "Taiwan", isCorrect: false },
      { id: "opt-4", text: "Singapore", isCorrect: false }
    ],
    explanation: "Shigeru Ishiba, former Defense Minister, was elected leader of the ruling Liberal Democratic Party (LDP) and took office as Japan's Prime Minister, succeeding Fumio Kishida.",
    tags: ["junior-current-affairs", "international-news", "japan", "geopolitics"]
  },
  {
    id: "q-current-034",
    title: "A severe drought exacerbated by the 2023-2024 El Niño phenomenon caused unprecedented transit restrictions and freshwater supply shortages in which vital maritime canal?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Oceanography & Water Systems", "Physical Geography & Earth Systems"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "The Panama Canal", isCorrect: true },
      { id: "opt-2", text: "The Suez Canal", isCorrect: false },
      { id: "opt-3", text: "The Kiel Canal", isCorrect: false },
      { id: "opt-4", text: "The Corinth Canal", isCorrect: false }
    ],
    explanation: "Unlike the sea-level Suez Canal, the Panama Canal relies on freshwater from Gatun Lake to operate its lock chambers. Severe drought compelled the Panama Canal Authority to slash daily vessel transits by over 30%.",
    tags: ["junior-current-affairs", "international-news", "geography", "oceans"]
  },

  // ==========================================
  // GROUP 3: Science, Technology & Space Updates (035 - 051)
  // ==========================================
  {
    id: "q-current-035",
    title: "On January 1, 2024, ISRO successfully launched XPoSat (X-ray Polarimeter Satellite), making India only the second nation after the USA to deploy a dedicated satellite for studying:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Space Explorers", "Modern Physics & Quantum Theory"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Cosmic X-ray polarization from black holes and neutron stars", isCorrect: true },
      { id: "opt-2", text: "Gravitational wave vibrations in deep space", isCorrect: false },
      { id: "opt-3", text: "High-energy solar neutrino oscillations", isCorrect: false },
      { id: "opt-4", text: "Low-frequency radio emissions from the lunar far side", isCorrect: false }
    ],
    explanation: "XPoSat carries two scientific payloads—POLIX and XSPECT—to study the polarization of intense X-rays from astronomical sources like pulsar wind nebulae, black hole binaries, and active galactic nuclei.",
    tags: ["junior-current-affairs", "science-updates", "isro", "astronomy", "space"]
  },
  {
    id: "q-current-036",
    title: "What is the name of the female humanoid robot astronaut developed by ISRO to fly aboard the uncrewed test missions of India's human spaceflight project, Gaganyaan?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Space Explorers", "Artificial Intelligence & Machine Learning"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Vyommitra", isCorrect: true },
      { id: "opt-2", text: "Gaganmitra", isCorrect: false },
      { id: "opt-3", text: "Shaktimitra", isCorrect: false },
      { id: "opt-4", text: "Astronautica", isCorrect: false }
    ],
    explanation: "Vyommitra ('friend in the sky') is an AI-powered half-humanoid robot designed to monitor environmental parameters in the crew module, operate control panels, and simulate human physiological functions.",
    tags: ["junior-current-affairs", "science-updates", "isro", "space-mission", "robotics"]
  },
  {
    id: "q-current-037",
    title: "In February 2024, the robotic lander 'Odysseus' (Nova-C), developed by Intuitive Machines, achieved which landmark achievement in space exploration?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Space Explorers", "Science & Technology Milestones"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "First commercial, privately built spacecraft to soft-land on the Moon", isCorrect: true },
      { id: "opt-2", text: "First robotic probe to return samples from the core of an asteroid", isCorrect: false },
      { id: "opt-3", text: "First nuclear-powered rover to drill on Mars", isCorrect: false },
      { id: "opt-4", text: "First spacecraft to complete a close flyby of Neptune's moon Triton", isCorrect: false }
    ],
    explanation: "Houston-based Intuitive Machines landed Odysseus near the lunar south pole under NASA's CLPS program, marking the first commercial lunar soft landing and the first American lunar landing since Apollo 17 in 1972.",
    tags: ["junior-current-affairs", "science-updates", "space", "technology"]
  },
  {
    id: "q-current-038",
    title: "In January 2024, Elon Musk's neurotechnology startup Neuralink achieved which medical-technological milestone?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Computer Science & AI", "Human Body Heroes"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Successfully implanted a wireless brain-computer interface (BCI) chip in a human patient", isCorrect: true },
      { id: "opt-2", text: "Synthesized the first artificial human heart ventricle from titanium", isCorrect: false },
      { id: "opt-3", text: "Reversed neurological damage using stem-cell nanobots in primates", isCorrect: false },
      { id: "opt-4", text: "Created an optical cortical bionic eye restoring complete color vision", isCorrect: false }
    ],
    explanation: "Neuralink implanted its 'Telepathy' wireless brain chip (64 threads with 1,024 electrodes) in paralyzed patient Noland Arbaugh, allowing him to control a computer mouse cursor and play chess solely using his thoughts.",
    tags: ["junior-current-affairs", "science-updates", "neuroscience", "ai"]
  },
  {
    id: "q-current-039",
    title: "In May 2024, severe geomagnetic solar storms triggered by massive coronal mass ejections from giant sunspot cluster AR3664 produced which rare global atmospheric spectacle?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Space Explorers", "Physical Geography & Earth Systems"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Vibrant auroras visible at unusually low latitudes, including Ladakh in India", isCorrect: true },
      { id: "opt-2", text: "Complete global blackout of deep oceanic hydrothermal vents", isCorrect: false },
      { id: "opt-3", text: "A sudden 5-minute reversal of Earth's rotational axis", isCorrect: false },
      { id: "opt-4", text: "Persistent green noctilucent clouds over the equatorial belt", isCorrect: false }
    ],
    explanation: "The G5-class geomagnetic solar storm—the strongest since Halloween 2003—lit up night skies with pink and green auroras as far south as Mexico, the Mediterranean, and Hanle in Ladakh, India.",
    tags: ["junior-current-affairs", "science-updates", "astronomy", "physics"]
  },
  {
    id: "q-current-040",
    title: "In May 2024, Indian aerospace startup Agnikul Cosmos achieved a historic milestone by launching the world's first rocket powered by a single-piece 3D-printed engine, named:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Space Explorers", "Science & Technology Milestones"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Agnibaan SOrTeD (with Agnilet engine)", isCorrect: true },
      { id: "opt-2", text: "Vikram-S (with Kalam engine)", isCorrect: false },
      { id: "opt-3", text: "Skyroot Prithvi (with Dhawan engine)", isCorrect: false },
      { id: "opt-4", text: "Garuda-1 (with Agni engine)", isCorrect: false }
    ],
    explanation: "Chennai-based Agnikul Cosmos launched Agnibaan SOrTeD from India's first private launchpad at Sriharikota, powered by 'Agnilet'—the world's first single-piece 3D-printed semi-cryogenic rocket engine.",
    tags: ["junior-current-affairs", "science-updates", "space", "engineering", "startup"]
  },
  {
    id: "q-current-041",
    title: "Which breakthrough gene-editing therapy, known commercially as Casgevy, made medical history in late 2023 by becoming the world's first approved CRISPR-based medicine for:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Genetics & Molecular Biology", "Human Body Heroes"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Sickle cell disease and transfusion-dependent beta thalassemia", isCorrect: true },
      { id: "opt-2", text: "Type 1 diabetes and autoimmune thyroiditis", isCorrect: false },
      { id: "opt-3", text: "Huntington's chorea and Parkinson's disease", isCorrect: false },
      { id: "opt-4", text: "Cystic fibrosis and pulmonary arterial hypertension", isCorrect: false }
    ],
    explanation: "Developed by Vertex Pharmaceuticals and CRISPR Therapeutics, Casgevy uses CRISPR-Cas9 to edit patients' hematopoietic stem cells to reactivate fetal hemoglobin production, effectively curing sickle cell and beta-thalassemia.",
    tags: ["junior-current-affairs", "science-updates", "genetics", "medicine"]
  },
  {
    id: "q-current-042",
    title: "In 2023-2024, the World Health Organization (WHO) recommended which second cost-effective, high-efficacy malaria vaccine, developed by the University of Oxford and Serum Institute of India?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Human Body Heroes", "Cell Biology & Microbiology"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "R21/Matrix-M", isCorrect: true },
      { id: "opt-2", text: "Mosquirix (RTS,S)", isCorrect: false },
      { id: "opt-3", text: "Covaxin-M", isCorrect: false },
      { id: "opt-4", text: "ZyCoV-Plasmodium", isCorrect: false }
    ],
    explanation: "The R21/Matrix-M vaccine, developed by the Jenner Institute at Oxford and manufactured at scale by Serum Institute of India (SII) in Pune, demonstrated over 75% efficacy and is being rolled out across Africa.",
    tags: ["junior-current-affairs", "science-updates", "health", "medicine", "vaccines"]
  },
  {
    id: "q-current-043",
    title: "India's fastest AI supercomputing system, ranked prominently on the global TOP500 list and installed at C-DAC in Pune, is called:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Computer Science & AI", "Artificial Intelligence & Machine Learning"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "AIRAWAT (AI Research Analytics and Knowledge Dissemination Platform)", isCorrect: true },
      { id: "opt-2", text: "PARAM Siddhi-AI", isCorrect: false },
      { id: "opt-3", text: "Pratyush", isCorrect: false },
      { id: "opt-4", text: "Mihir", isCorrect: false }
    ],
    explanation: "AIRAWAT, installed under the National Program on AI at C-DAC Pune, delivers 13,170 teraflops of compute capacity and was ranked among the top 100 supercomputers in the world.",
    tags: ["junior-current-affairs", "science-updates", "supercomputers", "ai"]
  },
  {
    id: "q-current-044",
    title: "The joint Earth-observing satellite mission NISAR, featuring advanced dual-frequency synthetic aperture radar to map global environmental changes every 12 days, is a partnership between ISRO and:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Space Explorers", "Physical Geography & Earth Systems"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "NASA (United States)", isCorrect: true },
      { id: "opt-2", text: "ESA (European Space Agency)", isCorrect: false },
      { id: "opt-3", text: "JAXA (Japan)", isCorrect: false },
      { id: "opt-4", text: "Roscosmos (Russia)", isCorrect: false }
    ],
    explanation: "NISAR (NASA-ISRO Synthetic Aperture Radar) is a landmark joint radar observatory equipped with L-band radar (NASA) and S-band radar (ISRO) to measure changes in ice sheets, ecosystems, and tectonic faults.",
    tags: ["junior-current-affairs", "science-updates", "isro", "nasa", "space"]
  },
  {
    id: "q-current-045",
    title: "To commemorate 50 years of Project Tiger in 2023, Prime Minister Narendra Modi launched which global coalition in Mysuru to protect the world's seven major big cat species?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Animal Encyclopedia", "Environmental Ecology & Conservation"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "International Big Cat Alliance (IBCA)", isCorrect: true },
      { id: "opt-2", text: "Global Feline Sanctuary Pact", isCorrect: false },
      { id: "opt-3", text: "Pan-Asian Tiger Protection Network", isCorrect: false },
      { id: "opt-4", text: "Wild Cat Global Consortium", isCorrect: false }
    ],
    explanation: "Headquartered in India, the International Big Cat Alliance (IBCA) unites 97 range nations to conserve the Tiger, Lion, Leopard, Snow Leopard, Cheetah, Jaguar, and Puma.",
    tags: ["junior-current-affairs", "national-news", "wildlife", "conservation", "animals"]
  },
  {
    id: "q-current-046",
    title: "What vital chemical element was unambiguously confirmed on the lunar south pole surface in August 2023 by the LIBS instrument aboard the Chandrayaan-3 Pragyan rover?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Space Explorers", "Periodic Table & Chemical Bonding"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Sulfur (S)", isCorrect: true },
      { id: "opt-2", text: "Gold (Au)", isCorrect: false },
      { id: "opt-3", text: "Mercury (Hg)", isCorrect: false },
      { id: "opt-4", text: "Platinum (Pt)", isCorrect: false }
    ],
    explanation: "The Laser-Induced Breakdown Spectroscopy (LIBS) instrument aboard the Pragyan rover unambiguously confirmed the presence of Sulfur (S) on the lunar surface, along with Aluminum, Calcium, Iron, and Titanium.",
    tags: ["junior-current-affairs", "science-updates", "isro", "chemistry", "space"]
  },
  {
    id: "q-current-047",
    title: "In February 2024, ISRO successfully launched its advanced meteorological satellite INSAT-3DS aboard GSLV-F14 to enhance:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Space Explorers", "Climate Science & Meteorology"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Weather forecasting, disaster warning, and oceanic monitoring", isCorrect: true },
      { id: "opt-2", text: "Deep-space exoplanet spectrum detection", isCorrect: false },
      { id: "opt-3", text: "Interplanetary asteroid orbital deflection tracking", isCorrect: false },
      { id: "opt-4", text: "Underwater submarine acoustic triangulation", isCorrect: false }
    ],
    explanation: "INSAT-3DS is a dedicated third-generation meteorological satellite designed to monitor Earth's surface, generate accurate weather forecasts, and track cyclones and ocean temperatures.",
    tags: ["junior-current-affairs", "science-updates", "meteorology", "isro", "space"]
  },
  {
    id: "q-current-048",
    title: "Which revolutionary space telescope discovered evidence of carbon-bearing molecules like methane and carbon dioxide in the atmosphere of habitable-zone exoplanet K2-18b in 2023?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Space Explorers", "Modern Physics & Quantum Theory"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "James Webb Space Telescope (JWST)", isCorrect: true },
      { id: "opt-2", text: "Hubble Space Telescope", isCorrect: false },
      { id: "opt-3", text: "Spitzer Space Telescope", isCorrect: false },
      { id: "opt-4", text: "Kepler Space Observatory", isCorrect: false }
    ],
    explanation: "NASA/ESA/CSA's James Webb Space Telescope used transmission spectroscopy to detect carbon-bearing molecules in the atmosphere of K2-18b, a Hycean exoplanet 120 light-years away in the constellation Leo.",
    tags: ["junior-current-affairs", "science-updates", "astronomy", "space"]
  },
  {
    id: "q-current-049",
    title: "India approved the landmark National Quantum Mission (NQM) in 2023 with a budget exceeding ₹6,000 crore to develop quantum computers with a target capacity of:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Modern Physics & Quantum Theory", "Computer Science & AI"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "50 to 1,000 physical qubits within 8 years", isCorrect: true },
      { id: "opt-2", text: "100,000 optical qubits within 3 years", isCorrect: false },
      { id: "opt-3", text: "1 million topological qubits by 2025", isCorrect: false },
      { id: "opt-4", text: "10 superconducting qubits by 2035", isCorrect: false }
    ],
    explanation: "The National Quantum Mission positions India alongside the US, China, and Austria in developing quantum hardware (50-1000 qubits), quantum key distribution (QKD) satellite links, and quantum magnetometers.",
    tags: ["junior-current-affairs", "science-updates", "quantum-computing", "physics"]
  },
  {
    id: "q-current-050",
    title: "Scientists at the Lawrence Livermore National Laboratory's National Ignition Facility (NIF) in California achieved scientific 'fusion ignition' multiple times, producing:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Modern Physics & Quantum Theory", "Physical Sciences"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "More net energy from nuclear fusion than the laser energy directed at the fuel target", isCorrect: true },
      { id: "opt-2", text: "A stable room-temperature magnetic levitation field lasting 48 hours", isCorrect: false },
      { id: "opt-3", text: "The cold annihilation of positrons in atmospheric nitrogen gas", isCorrect: false },
      { id: "opt-4", text: "An artificial micro-black hole sustained in vacuum suspension", isCorrect: false }
    ],
    explanation: "Using 192 ultra-powerful ultraviolet lasers focused on a deuterium-tritium fuel pellet, NIF achieved controlled thermonuclear fusion net energy gain (ignition), proving the physical feasibility of clean fusion power.",
    tags: ["junior-current-affairs", "science-updates", "fusion", "physics", "energy"]
  },
  {
    id: "q-current-051",
    title: "In 2023, Google DeepMind unveiled AlphaMissense, an artificial intelligence model that made a monumental breakthrough by predicting:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Genetics & Molecular Biology", "Artificial Intelligence & Machine Learning"],
    difficulty: "hard",
    options: [
      { id: "opt-1", text: "Whether single-letter genetic mutations (missense variants) are disease-causing or benign", isCorrect: true },
      { id: "opt-2", text: "The precise timing of earthquakes from plate boundary acoustic waves", isCorrect: false },
      { id: "opt-3", text: "Optimal trajectories for orbital interplanetary gravitational slingshots", isCorrect: false },
      { id: "opt-4", text: "The melting point of all synthetic inorganic polymer resins", isCorrect: false }
    ],
    explanation: "AlphaMissense classified 71 million possible human missense mutations (single-letter DNA changes altering an amino acid), predicting that 32% are likely pathogenic and 57% benign, drastically accelerating genetic disease diagnosis.",
    tags: ["junior-current-affairs", "science-updates", "ai", "genetics", "biotechnology"]
  },

  // ==========================================
  // GROUP 4: Sports Updates & Global Tournaments (052 - 068)
  // ==========================================
  {
    id: "q-current-052",
    title: "The Indian Men's Cricket Team won the ICC Men's T20 World Cup in June 2024 at Bridgetown, Barbados, by defeating which country in a thrilling final?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "Global Current Affairs & Summits"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "South Africa", isCorrect: true },
      { id: "opt-2", text: "Australia", isCorrect: false },
      { id: "opt-3", text: "England", isCorrect: false },
      { id: "opt-4", text: "Pakistan", isCorrect: false }
    ],
    explanation: "Led by Rohit Sharma, India defeated South Africa by 7 runs at Kensington Oval to lift their second ICC Men's T20 World Cup title (after 2007), following which both Rohit Sharma and Virat Kohli announced their retirement from T20 internationals.",
    tags: ["junior-current-affairs", "sports-updates", "cricket", "world-cup"]
  },
  {
    id: "q-current-053",
    title: "At the 19th Asian Games held in Hangzhou, China in 2023, India achieved a historic milestone by crossing the 100-medal mark for the first time with a total tally of:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "Global Current Affairs & Summits"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "107 medals (28 Gold, 38 Silver, 41 Bronze)", isCorrect: true },
      { id: "opt-2", text: "101 medals (25 Gold, 35 Silver, 41 Bronze)", isCorrect: false },
      { id: "opt-3", text: "115 medals (32 Gold, 40 Silver, 43 Bronze)", isCorrect: false },
      { id: "opt-4", text: "95 medals (22 Gold, 33 Silver, 40 Bronze)", isCorrect: false }
    ],
    explanation: "India achieved its best-ever Asian Games performance under the campaign 'Iss Baar 100 Paar', winning 107 medals and finishing 4th on the overall medal leaderboard.",
    tags: ["junior-current-affairs", "sports-updates", "asian-games", "sports"]
  },
  {
    id: "q-current-054",
    title: "Who became the youngest player in chess history at age 17 to win the FIDE Candidates Tournament in Toronto in April 2024, earning the right to challenge for the World Chess Championship?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "Logical Reasoning & Problem Solving"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "D. Gukesh (Dommaraju Gukesh)", isCorrect: true },
      { id: "opt-2", text: "R. Praggnanandhaa", isCorrect: false },
      { id: "opt-3", text: "Vidit Gujrathi", isCorrect: false },
      { id: "opt-4", text: "Nodirbek Abdusattorov", isCorrect: false }
    ],
    explanation: "Grandmaster D. Gukesh from Chennai scored 9/14 in Toronto to win the FIDE Candidates at age 17, breaking Garry Kasparov's 40-year-old record to become the youngest challenger in World Chess Championship history.",
    tags: ["junior-current-affairs", "sports-updates", "chess", "sports"]
  },
  {
    id: "q-current-055",
    title: "At the 45th FIDE Chess Olympiad held in Budapest, Hungary in September 2024, India created sporting history by:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "Logical Reasoning & Problem Solving"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Winning historic Gold medals in both the Open and Women's team sections", isCorrect: true },
      { id: "opt-2", text: "Winning Silver in the Open section and Bronze in the Blitz section", isCorrect: false },
      { id: "opt-3", text: "Sweeping all four individual board prizes while finishing 3rd overall", isCorrect: false },
      { id: "opt-4", text: "Qualifying for the final without playing a single tiebreak game", isCorrect: false }
    ],
    explanation: "India accomplished a historic double Olympiad triumph, winning team Gold in the Open section (Gukesh, Praggnanandhaa, Erigaisi, Vidit, Harikrishna) and Women's section (Harika, Vaishali, Divya, Vantika, Tania).",
    tags: ["junior-current-affairs", "sports-updates", "chess", "sports"]
  },
  {
    id: "q-current-056",
    title: "At the Paris 2024 Olympic Games, who became the first athlete from independent India to win two Olympic medals at a single edition of the Games?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "General Awareness & Logic"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Manu Bhaker (Shooting)", isCorrect: true },
      { id: "opt-2", text: "Neeraj Chopra (Athletics)", isCorrect: false },
      { id: "opt-3", text: "PV Sindhu (Badminton)", isCorrect: false },
      { id: "opt-4", text: "Lovlina Borgohain (Boxing)", isCorrect: false }
    ],
    explanation: "Manu Bhaker won bronze in the Women's 10m Air Pistol and another bronze in the Mixed Team 10m Air Pistol alongside Sarabjot Singh at the Paris 2024 Olympics.",
    tags: ["junior-current-affairs", "sports-updates", "olympics", "shooting"]
  },
  {
    id: "q-current-057",
    title: "At the Paris 2024 Olympic Games, reigning champion Neeraj Chopra claimed which medal in the Men's Javelin Throw with an 89.45-meter throw?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "General Awareness & Logic"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Silver Medal", isCorrect: true },
      { id: "opt-2", text: "Gold Medal", isCorrect: false },
      { id: "opt-3", text: "Bronze Medal", isCorrect: false },
      { id: "opt-4", text: "Fourth place diploma", isCorrect: false }
    ],
    explanation: "Neeraj Chopra secured the Silver medal with an 89.45m throw, becoming the first track-and-field athlete from independent India to win consecutive individual Olympic medals (Gold in Tokyo 2020, Silver in Paris 2024).",
    tags: ["junior-current-affairs", "sports-updates", "olympics", "athletics"]
  },
  {
    id: "q-current-058",
    title: "At the Paris 2024 Paralympic Games, India delivered its finest performance in history by winning how many total medals?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "General Awareness & Logic"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "29 medals (7 Gold, 9 Silver, 13 Bronze)", isCorrect: true },
      { id: "opt-2", text: "19 medals (5 Gold, 8 Silver, 6 Bronze)", isCorrect: false },
      { id: "opt-3", text: "25 medals (6 Gold, 8 Silver, 11 Bronze)", isCorrect: false },
      { id: "opt-4", text: "35 medals (10 Gold, 12 Silver, 13 Bronze)", isCorrect: false }
    ],
    explanation: "India achieved a record 29 medals (finishing 18th in the world) at Paris 2024, with stars like Avani Lekhara (Gold in shooting), Sumit Antil (Gold in javelin), and Sheetal Devi (Bronze in armless archery).",
    tags: ["junior-current-affairs", "sports-updates", "paralympics", "sports"]
  },
  {
    id: "q-current-059",
    title: "At age 43, Indian tennis legend Rohan Bopanna made history in January 2024 by winning the Australian Open Men's Doubles title (with Matthew Ebden) and becoming:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "General Awareness & Logic"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The oldest World No. 1 and oldest Grand Slam champion in the Open Era", isCorrect: true },
      { id: "opt-2", text: "The first player to win Grand Slams across four different decades", isCorrect: false },
      { id: "opt-3", text: "The player with the most consecutive service aces in a Grand Slam final", isCorrect: false },
      { id: "opt-4", text: "The fastest server in Australian Open tournament history", isCorrect: false }
    ],
    explanation: "Rohan Bopanna became the oldest first-time World No. 1 in men's doubles at 43 years and 330 days, as well as the oldest Grand Slam men's doubles champion in the Open Era.",
    tags: ["junior-current-affairs", "sports-updates", "tennis", "sports"]
  },
  {
    id: "q-current-060",
    title: "Which Spanish tennis sensation defeated Novak Djokovic in back-to-back Wimbledon Men's Singles finals in 2023 and 2024?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "General Awareness & Logic"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Carlos Alcaraz", isCorrect: true },
      { id: "opt-2", text: "Jannik Sinner", isCorrect: false },
      { id: "opt-3", text: "Daniil Medvedev", isCorrect: false },
      { id: "opt-4", text: "Alexander Zverev", isCorrect: false }
    ],
    explanation: "Carlos Alcaraz captured consecutive Wimbledon Gentlemen's Singles crowns in 2023 (in an epic 5-set final) and 2024 (in straight sets), adding to his US Open 2022 and French Open 2024 titles.",
    tags: ["junior-current-affairs", "sports-updates", "tennis", "wimbledon"]
  },
  {
    id: "q-current-061",
    title: "Which national team won the UEFA Euro 2024 championship in Berlin, Germany, by defeating England 2-1 in the final?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "Global Current Affairs & Summits"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Spain", isCorrect: true },
      { id: "opt-2", text: "France", isCorrect: false },
      { id: "opt-3", text: "Germany", isCorrect: false },
      { id: "opt-4", text: "Netherlands", isCorrect: false }
    ],
    explanation: "Spain won all seven matches at Euro 2024 to lift their record fourth European Championship, with 17-year-old winger Lamine Yamal named Young Player of the Tournament.",
    tags: ["junior-current-affairs", "sports-updates", "football", "euro-2024"]
  },
  {
    id: "q-current-062",
    title: "Which South American nation clinched the Copa América 2024 championship in Miami, USA, defeating Colombia 1-0 in extra time to win their record 16th title?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "World Continents and oceans"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Argentina", isCorrect: true },
      { id: "opt-2", text: "Brazil", isCorrect: false },
      { id: "opt-3", text: "Uruguay", isCorrect: false },
      { id: "opt-4", text: "Chile", isCorrect: false }
    ],
    explanation: "Led by Lionel Messi and coached by Lionel Scaloni, Argentina defended their Copa América title with a 112th-minute goal from Lautaro Martínez, completing a triple major trophy sweep (Copa 2021, World Cup 2022, Copa 2024).",
    tags: ["junior-current-affairs", "sports-updates", "football", "copa-america"]
  },
  {
    id: "q-current-063",
    title: "Who won the Women's Premier League (WPL) 2024 cricket title, defeating Delhi Capitals in the final in New Delhi under the captaincy of Smriti Mandhana?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "General Awareness & Logic"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Royal Challengers Bangalore (RCB)", isCorrect: true },
      { id: "opt-2", text: "Mumbai Indians (MI)", isCorrect: false },
      { id: "opt-3", text: "UP Warriorz", isCorrect: false },
      { id: "opt-4", text: "Gujarat Giants", isCorrect: false }
    ],
    explanation: "Royal Challengers Bangalore defeated Delhi Capitals by 8 wickets at the Arun Jaitley Stadium to win the second edition of the WPL, led by captain Smriti Mandhana with star performances by Ellyse Perry and Shreyanka Patil.",
    tags: ["junior-current-affairs", "sports-updates", "cricket", "wpl"]
  },
  {
    id: "q-current-064",
    title: "Indian dynamic badminton duo Satwiksairaj Rankireddy and Chirag Shetty achieved which historic milestone in 2023-2024?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "General Awareness & Logic"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Became World No. 1 and won India's first-ever Asian Games badminton Gold", isCorrect: true },
      { id: "opt-2", text: "Won four consecutive Olympic Gold medals in men's doubles", isCorrect: false },
      { id: "opt-3", text: "Completed a calendar year undefeated across 50 international matches", isCorrect: false },
      { id: "opt-4", text: "Won the singles, doubles, and mixed titles at the World Championships", isCorrect: false }
    ],
    explanation: "'Sat-Chi' won India's first-ever Asian Games badminton gold medal at Hangzhou 2023, won the Asian Championships, and became the first Indian doubles pair to attain the BWF World No. 1 ranking.",
    tags: ["junior-current-affairs", "sports-updates", "badminton", "sports"]
  },
  {
    id: "q-current-065",
    title: "Spain won the FIFA Women's World Cup 2023 held in Australia and New Zealand by defeating which nation 1-0 in the final in Sydney?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "Global Current Affairs & Summits"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "England", isCorrect: true },
      { id: "opt-2", text: "Sweden", isCorrect: false },
      { id: "opt-3", text: "United States", isCorrect: false },
      { id: "opt-4", text: "Australia", isCorrect: false }
    ],
    explanation: "Spain captain Olga Carmona scored the decisive goal against England's Lionesses at Stadium Australia, making Spain only the second country (after Germany) to win both men's and women's FIFA World Cups.",
    tags: ["junior-current-affairs", "sports-updates", "football", "fifa"]
  },
  {
    id: "q-current-066",
    title: "Who was awarded the 'Player of the Tournament' at the ICC Men's Cricket World Cup 2023 in India after scoring an unprecedented 765 runs?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "General Awareness & Logic"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Virat Kohli", isCorrect: true },
      { id: "opt-2", text: "Rohit Sharma", isCorrect: false },
      { id: "opt-3", text: "Mohammed Shami", isCorrect: false },
      { id: "opt-4", text: "Travis Head", isCorrect: false }
    ],
    explanation: "Virat Kohli scored 765 runs in 11 matches (averaging 95.62 with three centuries), breaking Sachin Tendulkar's 2003 record for the most runs in a single World Cup and registering his 50th ODI century.",
    tags: ["junior-current-affairs", "sports-updates", "cricket", "world-cup"]
  },
  {
    id: "q-current-067",
    title: "The Indian Men's Hockey Team secured consecutive Olympic medals by winning which medal at the Paris 2024 Olympic Games under captain Harmanpreet Singh?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "General Awareness & Logic"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Bronze Medal", isCorrect: true },
      { id: "opt-2", text: "Gold Medal", isCorrect: false },
      { id: "opt-3", text: "Silver Medal", isCorrect: false },
      { id: "opt-4", text: "Fourth place", isCorrect: false }
    ],
    explanation: "India defeated Spain 2-1 in the bronze medal playoff at Paris 2024, winning back-to-back Olympic hockey medals (Tokyo 2020 bronze, Paris 2024 bronze) in legendary goalkeeper PR Sreejesh's farewell match.",
    tags: ["junior-current-affairs", "sports-updates", "hockey", "olympics"]
  },
  {
    id: "q-current-068",
    title: "Which sport made its official Olympic debut as a medal event at the Paris 2024 Olympic Games at the Place de la Concorde?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "Global Current Affairs & Summits"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Breaking (Breakdancing)", isCorrect: true },
      { id: "opt-2", text: "Cricket", isCorrect: false },
      { id: "opt-3", text: "Squash", isCorrect: false },
      { id: "opt-4", text: "Padel", isCorrect: false }
    ],
    explanation: "Breaking made its Olympic debut at Paris 2024, with B-Boy Phil Wizard (Canada) and B-Girl Ami (Japan) winning the inaugural gold medals in battle format. Cricket and Squash will return at Los Angeles 2028.",
    tags: ["junior-current-affairs", "sports-updates", "olympics", "sports"]
  },

  // ==========================================
  // GROUP 5: Awards, Honors & Recognitions (069 - 084)
  // ==========================================
  {
    id: "q-current-069",
    title: "In 2024, the Government of India conferred the Bharat Ratna—India's highest civilian honor—on five distinguished personalities. Which pioneer of the Green Revolution in India was among them?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Literature, Awards & Culture", "Living World Explorers"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Dr. M. S. Swaminathan", isCorrect: true },
      { id: "opt-2", text: "Dr. Verghese Kurien", isCorrect: false },
      { id: "opt-3", text: "Dr. Norman Borlaug", isCorrect: false },
      { id: "opt-4", text: "Dr. Homi Bhabha", isCorrect: false }
    ],
    explanation: "The 2024 Bharat Ratna was awarded to Karpoori Thakur, L. K. Advani, P. V. Narasimha Rao, Chaudhary Charan Singh, and agricultural scientist Dr. M. S. Swaminathan for transforming India's food security.",
    tags: ["junior-current-affairs", "awards-honors", "bharat-ratna", "agriculture"]
  },
  {
    id: "q-current-070",
    title: "Iranian human rights activist Narges Mohammadi was awarded the 2023 Nobel Peace Prize for her brave struggle against the oppression of women in Iran under the motto:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Global Current Affairs & Summits", "Literature, Awards & Culture"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "'Woman, Life, Freedom' (Zan, Zendegi, Azadi)", isCorrect: true },
      { id: "opt-2", text: "'Peace, Truth, Justice'", isCorrect: false },
      { id: "opt-3", text: "'Bread, Dignity, Equality'", isCorrect: false },
      { id: "opt-4", text: "'Silence Is Complicity'", isCorrect: false }
    ],
    explanation: "The Norwegian Nobel Committee awarded the 2023 Peace Prize to imprisoned activist Narges Mohammadi for championing women's rights and human rights, highlighted by the 'Woman, Life, Freedom' movement.",
    tags: ["junior-current-affairs", "awards-honors", "nobel-prize", "human-rights"]
  },
  {
    id: "q-current-071",
    title: "South Korean novelist Han Kang was awarded the 2024 Nobel Prize in Literature 'for her intense poetic prose that confronts historical traumas and exposes the fragility of human life', famous for writing:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Literature, Awards & Culture", "Art, Music & Culture"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "The Vegetarian (Chaesikjuuija)", isCorrect: true },
      { id: "opt-2", text: "Pachinko", isCorrect: false },
      { id: "opt-3", text: "Kim Jiyoung, Born 1982", isCorrect: false },
      { id: "opt-4", text: "Please Look After Mom", isCorrect: false }
    ],
    explanation: "Han Kang became the first South Korean writer and the first Asian woman to win the Nobel Prize in Literature. Her landmark novel 'The Vegetarian' won the International Booker Prize in 2016.",
    tags: ["junior-current-affairs", "awards-honors", "nobel-prize", "literature"]
  },
  {
    id: "q-current-072",
    title: "The 2024 Nobel Prize in Physics was awarded to John Hopfield and Geoffrey Hinton for foundational discoveries and inventions that enable machine learning with:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Artificial Intelligence & Machine Learning", "Modern Physics & Quantum Theory"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Artificial neural networks using statistical physics", isCorrect: true },
      { id: "opt-2", text: "Superconducting topological qubits in dilution fridges", isCorrect: false },
      { id: "opt-3", text: "Silicon photonics laser waveguides", isCorrect: false },
      { id: "opt-4", text: "Graphene-based quantum ballistic transistors", isCorrect: false }
    ],
    explanation: "John Hopfield created an associative neural network that can store and reconstruct patterns using physics principles, while Geoffrey Hinton invented the Boltzmann machine, laying the groundwork for modern Deep Learning.",
    tags: ["junior-current-affairs", "science-updates", "awards-honors", "nobel-prize", "ai"]
  },
  {
    id: "q-current-073",
    title: "Demis Hassabis, John Jumper, and David Baker were awarded the 2024 Nobel Prize in Chemistry for computational protein design and revolutionary AI protein structure prediction through:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Artificial Intelligence & Machine Learning", "Biochemistry & Polymers"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "AlphaFold (predicting 3D structures of virtually all known proteins)", isCorrect: true },
      { id: "opt-2", text: "DeepVariant genetic mapping", isCorrect: false },
      { id: "opt-3", text: "BioGPT pharmaceutical clinical predictor", isCorrect: false },
      { id: "opt-4", text: "CRISPR-AI molecular endonuclease designer", isCorrect: false }
    ],
    explanation: "DeepMind's Demis Hassabis and John Jumper developed AlphaFold2 to solve the 50-year-old protein folding grand challenge, predicting the 3D structures of 200 million proteins, while David Baker pioneered de novo protein design.",
    tags: ["junior-current-affairs", "science-updates", "awards-honors", "nobel-prize", "biochemistry", "ai"]
  },
  {
    id: "q-current-074",
    title: "At the 95th Academy Awards (Oscars) in 2023, India celebrated a double triumph with 'Naatu Naatu' winning Best Original Song and which film winning Best Documentary Short Subject?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Art, Music & Culture", "Literature, Awards & Culture"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The Elephant Whisperers", isCorrect: true },
      { id: "opt-2", text: "All That Breathes", isCorrect: false },
      { id: "opt-3", text: "Writing with Fire", isCorrect: false },
      { id: "opt-4", text: "Period. End of Sentence.", isCorrect: false }
    ],
    explanation: "Directed by Kartiki Gonsalves and produced by Guneet Monga, 'The Elephant Whisperers' won the Oscar for Best Documentary Short, depicting indigenous couple Bomman and Bellie caring for orphaned elephant Raghu.",
    tags: ["junior-current-affairs", "awards-honors", "cinema", "oscars", "art-music-culture"]
  },
  {
    id: "q-current-075",
    title: "The prestigious 58th Jnanpith Award, India's highest literary honour, was conferred jointly in 2024 on renowned Urdu poet/lyricist Gulzar and which distinguished Sanskrit scholar?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Literature, Awards & Culture", "Art, Music & Culture"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Jagadguru Rambhadracharya", isCorrect: true },
      { id: "opt-2", text: "Prof. Ram Karan Sharma", isCorrect: false },
      { id: "opt-3", text: "Acharya Satyavrat Shastri", isCorrect: false },
      { id: "opt-4", text: "Pandit Vidyanivas Mishra", isCorrect: false }
    ],
    explanation: "The 58th Jnanpith Award recognized celebrated polymath, poet, and lyricist Sampooran Singh Kalra (Gulzar) for Urdu literature and spiritual leader and polyglot author Jagadguru Rambhadracharya for Sanskrit literature.",
    tags: ["junior-current-affairs", "awards-honors", "literature", "jnanpith"]
  },
  {
    id: "q-current-076",
    title: "Which veteran actor and producer was conferred the Dadasaheb Phalke Lifetime Achievement Award for 2022 at the 70th National Film Awards in 2024?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Art, Music & Culture", "Literature, Awards & Culture"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Mithun Chakraborty", isCorrect: true },
      { id: "opt-2", text: "Waheeda Rehman", isCorrect: false },
      { id: "opt-3", text: "Asha Parekh", isCorrect: false },
      { id: "opt-4", text: "Rajinikanth", isCorrect: false }
    ],
    explanation: "Mithun Chakraborty, who debuted with Mrigayaa (1976) winning a National Film Award, was honored with the Dadasaheb Phalke Award—Indian cinema's highest honor—for his monumental five-decade career.",
    tags: ["junior-current-affairs", "awards-honors", "cinema", "phalke-award"]
  },
  {
    id: "q-current-077",
    title: "Irish author Paul Lynch won the prestigious 2023 Booker Prize for Fiction for which dystopian novel set in a totalitarian Dublin?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Literature, Awards & Culture", "Art, Music & Culture"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Prophet Song", isCorrect: true },
      { id: "opt-2", text: "The Bee Sting", isCorrect: false },
      { id: "opt-3", text: "Time Shelter", isCorrect: false },
      { id: "opt-4", text: "Western Lane", isCorrect: false }
    ],
    explanation: "Paul Lynch's 'Prophet Song' depicts a mother of four, Eilish Stack, fighting to keep her family together as Ireland descends into tyranny, praised for its suffocating urgency and literary power.",
    tags: ["junior-current-affairs", "awards-honors", "books", "literature"]
  },
  {
    id: "q-current-078",
    title: "Indian surgical oncologist Dr. Ravi Kannan R. was awarded the 2023 Ramon Magsaysay Award ('Asia's Nobel Prize') for his selfless service in providing pro-poor cancer treatment in which region?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Human Body Heroes", "Literature, Awards & Culture"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Cachar Cancer Hospital and Research Centre in Assam", isCorrect: true },
      { id: "opt-2", text: "Tata Memorial Hospital in Mumbai", isCorrect: false },
      { id: "opt-3", text: "Kidwai Memorial Institute in Bengaluru", isCorrect: false },
      { id: "opt-4", text: "Regional Cancer Centre in Thiruvananthapuram", isCorrect: false }
    ],
    explanation: "Dr. Ravi Kannan left a prominent practice in Chennai to transform the rural Cachar Cancer Hospital and Research Centre in Silchar, Assam, offering free or low-cost compassionate cancer care to underprivileged tea-garden workers.",
    tags: ["junior-current-affairs", "awards-honors", "magsaysay-award", "medicine"]
  },
  {
    id: "q-current-079",
    title: "India's highest sporting honor, the Major Dhyan Chand Khel Ratna Award for 2023, was jointly awarded to which world-champion athletic pair?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "General Awareness & Logic"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Chirag Shetty and Satwiksairaj Rankireddy (Badminton)", isCorrect: true },
      { id: "opt-2", text: "Neeraj Chopra and Kishore Jena (Javelin Throw)", isCorrect: false },
      { id: "opt-3", text: "Rohan Bopanna and Matthew Ebden (Tennis)", isCorrect: false },
      { id: "opt-4", text: "Harmanpreet Singh and PR Sreejesh (Hockey)", isCorrect: false }
    ],
    explanation: "The Khel Ratna was conferred on badminton champions Satwiksairaj Rankireddy and Chirag Shetty for their Asian Games Gold, Asian Championship title, and achieving the World No. 1 ranking.",
    tags: ["junior-current-affairs", "awards-honors", "sports", "badminton"]
  },
  {
    id: "q-current-080",
    title: "Which century-old publishing institution in Uttar Pradesh was awarded the prestigious Gandhi Peace Prize for 2021 in recognition of its outstanding contribution to social and cultural transformation?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Literature, Awards & Culture", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Gita Press, Gorakhpur", isCorrect: true },
      { id: "opt-2", text: "Navajivan Trust, Ahmedabad", isCorrect: false },
      { id: "opt-3", text: "Ramakrishna Mission Institute, Kolkata", isCorrect: false },
      { id: "opt-4", text: "Arya Samaj Publishing House, Delhi", isCorrect: false }
    ],
    explanation: "Established in 1923 by Jaya Dayal Goyandka and Ghanshyam Das Jalan, Gita Press Gorakhpur has published over 41 crore books (including 16 crore copies of the Shrimad Bhagavad Gita) without commercial advertising.",
    tags: ["junior-current-affairs", "awards-honors", "gandhi-peace-prize", "history"]
  },
  {
    id: "q-current-081",
    title: "At the 66th Annual Grammy Awards in February 2024, Indian fusion supergroup 'Shakti' won the Grammy for Best Global Music Album for:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Art, Music & Culture", "Literature, Awards & Culture"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "This Moment", isCorrect: true },
      { id: "opt-2", text: "Remember Shakti", isCorrect: false },
      { id: "opt-3", text: "A Handful of Beauty", isCorrect: false },
      { id: "opt-4", text: "Natural Elements", isCorrect: false }
    ],
    explanation: "Shakti—comprising tabla maestro Ustad Zakir Hussain, singer Shankar Mahadevan, guitarist John McLaughlin, percussionist V. Selvaganesh, and violinist Ganesh Rajagopalan—won the Grammy for their studio album 'This Moment'.",
    tags: ["junior-current-affairs", "awards-honors", "music", "grammy", "art-music-culture"]
  },
  {
    id: "q-current-082",
    title: "French-American mathematician Michel Talagrand was awarded the prestigious 2024 Abel Prize (often dubbed the 'Nobel of Mathematics') for groundbreaking work in:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Probability & Statistics", "Mathematics & Quantitative"],
    difficulty: "hard",
    options: [
      { id: "opt-1", text: "Probability theory, stochastic processes, and spin glasses", isCorrect: true },
      { id: "opt-2", text: "The Langlands Program and automorphic forms", isCorrect: false },
      { id: "opt-3", text: "Algebraic topology and topological quantum field theory", isCorrect: false },
      { id: "opt-4", text: "Optimal transport theory and Ricci curvature bounds", isCorrect: false }
    ],
    explanation: "The Norwegian Academy of Science and Letters awarded the Abel Prize to Michel Talagrand for his groundbreaking contributions to probability theory, concentration of measure phenomena, and mathematical understanding of spin glasses.",
    tags: ["junior-current-affairs", "awards-honors", "mathematics", "probability"]
  },
  {
    id: "q-current-083",
    title: "Japanese architect Riken Yamamoto was awarded the 2024 Pritzker Architecture Prize (the highest global architecture honor) for designs emphasizing:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Art, Music & Culture", "Literature, Awards & Culture"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Community, interconnected public spaces, and social transparency", isCorrect: true },
      { id: "opt-2", text: "Ultra-tall parametric commercial skyscraper engineering", isCorrect: false },
      { id: "opt-3", text: "Brutalist reinforced concrete government citadels", isCorrect: false },
      { id: "opt-4", text: "Subterranean geothermal climate shelters", isCorrect: false }
    ],
    explanation: "Riken Yamamoto was recognized for blurring the boundary between public and private domains, creating buildings that foster communal connection and mutual aid across housing projects, schools, and civic institutions.",
    tags: ["junior-current-affairs", "awards-honors", "architecture", "art-music-culture"]
  },
  {
    id: "q-current-084",
    title: "Indian environmental activist Alok Shukla was awarded the prestigious 2024 Goldman Environmental Prize ('Green Nobel') for leading a successful grassroots campaign to protect:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Environmental Ecology & Conservation", "Physical Geography & Earth Systems"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Hasdeo Aranya forests in Chhattisgarh from coal mining expansion", isCorrect: true },
      { id: "opt-2", text: "Aravalli biodiversity ridge in Haryana from illegal quarrying", isCorrect: false },
      { id: "opt-3", text: "Silent Valley rainforest in Kerala from hydroelectric dams", isCorrect: false },
      { id: "opt-4", text: "Sundarbans mangrove delta from industrial shrimp farms", isCorrect: false }
    ],
    explanation: "Alok Shukla mobilized the Hasdeo Aranya Bachao Sangharsh Samiti, leading indigenous Adivasi communities to safeguard 445,000 acres of biodiverse pristine forests (the 'Lungs of Chhattisgarh') from 21 proposed coal mines.",
    tags: ["junior-current-affairs", "awards-honors", "environment", "conservation"]
  },

  // ==========================================
  // GROUP 6: Important Days, Summits & Themes (085 - 100)
  // ==========================================
  {
    id: "q-current-085",
    title: "India observes August 23 every year as 'National Space Day' to commemorate which historic milestone in space exploration?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Space Explorers", "Science & Technology Milestones"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The successful soft landing of Chandrayaan-3 on the Moon (2023)", isCorrect: true },
      { id: "opt-2", text: "The orbital insertion of Mangalyaan into Martian orbit (2014)", isCorrect: false },
      { id: "opt-3", text: "The launch of India's first satellite Aryabhata (1975)", isCorrect: false },
      { id: "opt-4", text: "Rakesh Sharma's historic spaceflight aboard Soyuz T-11 (1984)", isCorrect: false }
    ],
    explanation: "August 23 was officially designated as National Space Day by Prime Minister Narendra Modi to celebrate India becoming the first nation to soft-land near the Moon's south pole and the fourth nation to land on the Moon.",
    tags: ["junior-current-affairs", "important-events", "space-mission", "isro"]
  },
  {
    id: "q-current-086",
    title: "Celebrated annually on June 21, the International Day of Yoga was established by the UN General Assembly in 2014 following a proposal championed by which country?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Human Body Heroes", "Art, Music & Culture"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "India", isCorrect: true },
      { id: "opt-2", text: "Nepal", isCorrect: false },
      { id: "opt-3", text: "Thailand", isCorrect: false },
      { id: "opt-4", text: "Bhutan", isCorrect: false }
    ],
    explanation: "UNGA adopted Resolution 69/131 in December 2014 with a record 175 co-sponsoring nations. June 21 was selected as it is the summer solstice, the longest day of the year in the Northern Hemisphere.",
    tags: ["junior-current-affairs", "important-events", "yoga", "culture"]
  },
  {
    id: "q-current-087",
    title: "World Environment Day is celebrated globally every year on June 5. What was the central global theme for World Environment Day 2024 hosted by Saudi Arabia?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Environmental Ecology & Conservation", "Climate Science & Meteorology"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "'Land restoration, desertification and drought resilience'", isCorrect: true },
      { id: "opt-2", text: "'Beat Plastic Pollution'", isCorrect: false },
      { id: "opt-3", text: "'Only One Earth'", isCorrect: false },
      { id: "opt-4", text: "'Ecosystem Restoration'", isCorrect: false }
    ],
    explanation: "Under the slogan 'Our land. Our future. We are #GenerationRestoration', World Environment Day 2024 focused on combating desertification, restoring degraded lands, and building drought resilience.",
    tags: ["junior-current-affairs", "important-events", "environment", "ecology"]
  },
  {
    id: "q-current-088",
    title: "National Youth Day is observed in India on January 12 every year to mark the birth anniversary of which great spiritual leader and philosopher?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "History Time Machine", "Literature, Awards & Culture"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Swami Vivekananda", isCorrect: true },
      { id: "opt-2", text: "Sri Aurobindo", isCorrect: false },
      { id: "opt-3", text: "Rabindranath Tagore", isCorrect: false },
      { id: "opt-4", text: "Dayananda Saraswati", isCorrect: false }
    ],
    explanation: "January 12 was proclaimed National Youth Day (Rashtriya Yuva Diwas) in 1984 by the Government of India to inspire youth with the philosophies, ideals, and teachings of Swami Vivekananda.",
    tags: ["junior-current-affairs", "important-events", "history", "youth"]
  },
  {
    id: "q-current-089",
    title: "National Science Day is celebrated across India on February 28 every year to honor the discovery of which landmark scientific breakthrough?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Super Scientists & Inventors", "Modern Physics & Quantum Theory"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The Raman Effect by Sir C. V. Raman in 1928", isCorrect: true },
      { id: "opt-2", text: "The formulation of Saha Ionization Equation", isCorrect: false },
      { id: "opt-3", text: "The discovery of Bose-Einstein Condensate", isCorrect: false },
      { id: "opt-4", text: "The first successful atomic test at Pokhran", isCorrect: false }
    ],
    explanation: "On February 28, 1928, Sir Chandrasekhara Venkata Raman announced the discovery of the Raman Effect (inelastic light scattering), for which he received the 1930 Nobel Prize in Physics.",
    tags: ["junior-current-affairs", "important-events", "science", "physics"]
  },
  {
    id: "q-current-090",
    title: "Good Governance Day is observed in India on December 25 every year to mark the birth anniversary of which former Prime Minister of India?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Indian Constitution & Governance", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Atal Bihari Vajpayee", isCorrect: true },
      { id: "opt-2", text: "Lal Bahadur Shastri", isCorrect: false },
      { id: "opt-3", text: "Morarji Desai", isCorrect: false },
      { id: "opt-4", text: "Chaudhary Charan Singh", isCorrect: false }
    ],
    explanation: "Established in 2014, Good Governance Day (Sushasan Divas) honors Bharat Ratna Atal Bihari Vajpayee, fostering awareness of accountable, transparent, and responsive public administration.",
    tags: ["junior-current-affairs", "important-events", "governance", "history"]
  },
  {
    id: "q-current-091",
    title: "Pravasi Bharatiya Divas (Non-Resident Indian Day) is celebrated on January 9 every two years to commemorate which historic return to India?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "History Time Machine", "Modern Indian History & Movements"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Mahatma Gandhi's return from South Africa in 1915", isCorrect: true },
      { id: "opt-2", text: "Subhas Chandra Bose's arrival in Singapore in 1943", isCorrect: false },
      { id: "opt-3", text: "Rabindranath Tagore's Nobel tour return in 1913", isCorrect: false },
      { id: "opt-4", text: "Swami Vivekananda's return from Chicago Parliament in 1897", isCorrect: false }
    ],
    explanation: "On January 9, 1915, Mahatma Gandhi returned to India from South Africa, leading the struggle for freedom. Pravasi Bharatiya Divas honors the vital contributions of the overseas Indian diaspora.",
    tags: ["junior-current-affairs", "important-events", "history", "diaspora"]
  },
  {
    id: "q-current-092",
    title: "Earth Day is celebrated internationally on April 22 every year. What was the global campaign theme for Earth Day 2024?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Environmental Ecology & Conservation", "Physical Geography & Earth Systems"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "'Planet vs. Plastics' (advocating a 60% reduction in plastics by 2040)", isCorrect: true },
      { id: "opt-2", text: "'Invest in Our Planet'", isCorrect: false },
      { id: "opt-3", text: "'Restore Our Earth'", isCorrect: false },
      { id: "opt-4", text: "'Climate Action Now'", isCorrect: false }
    ],
    explanation: "Earth Day 2024 rallied under the theme 'Planet vs. Plastics', demanding a 60% reduction in the production of all plastics by 2040 and an end to single-use plastics to protect human and planetary health.",
    tags: ["junior-current-affairs", "important-events", "environment", "earth-day"]
  },
  {
    id: "q-current-093",
    title: "National Sports Day (Rashtriya Khel Divas) is observed across India on August 29 every year to mark the birth anniversary of which sports icon?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Sports Legends", "General Awareness & Logic"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Major Dhyan Chand ('The Wizard of Hockey')", isCorrect: true },
      { id: "opt-2", text: "Milkha Singh ('The Flying Sikh')", isCorrect: false },
      { id: "opt-3", text: "K. D. Jadhav", isCorrect: false },
      { id: "opt-4", text: "Syed Abdul Rahim", isCorrect: false }
    ],
    explanation: "Major Dhyan Chand led India to three Olympic Gold medals in field hockey (1928 Amsterdam, 1932 Los Angeles, 1936 Berlin). His birth anniversary is marked by the presentation of national sports awards by the President of India.",
    tags: ["junior-current-affairs", "important-events", "sports", "hockey"]
  },
  {
    id: "q-current-094",
    title: "Constitution Day (Samvidhan Divas) is celebrated in India on November 26 every year to commemorate:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Indian Constitution & Governance", "History Time Machine"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "The formal adoption of the Constitution by the Constituent Assembly in 1949", isCorrect: true },
      { id: "opt-2", text: "The commencement of the Constitution as a Republic in 1950", isCorrect: false },
      { id: "opt-3", text: "The first meeting of the Drafting Committee under Dr. Ambedkar", isCorrect: false },
      { id: "opt-4", text: "The signing of the Objectives Resolution by Jawaharlal Nehru", isCorrect: false }
    ],
    explanation: "On November 26, 1949, the Constituent Assembly of India formally adopted the Constitution of India, which subsequently came into full effect on January 26, 1950 (Republic Day).",
    tags: ["junior-current-affairs", "important-events", "constitution", "governance"]
  },
  {
    id: "q-current-095",
    title: "World Health Day is observed globally on April 7 each year to mark the founding anniversary of which United Nations agency in 1948?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Human Body Heroes", "Global Current Affairs & Summits"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "World Health Organization (WHO)", isCorrect: true },
      { id: "opt-2", text: "United Nations Children's Fund (UNICEF)", isCorrect: false },
      { id: "opt-3", text: "UNAIDS", isCorrect: false },
      { id: "opt-4", text: "Food and Agriculture Organization (FAO)", isCorrect: false }
    ],
    explanation: "World Health Day marks the founding of the WHO in 1948. The theme for World Health Day 2024 was 'My Health, My Right', championing universal access to quality healthcare, education, clean water, and nutrition.",
    tags: ["junior-current-affairs", "important-events", "health", "who"]
  },
  {
    id: "q-current-096",
    title: "National Unity Day (Rashtriya Ekta Diwas) is celebrated in India on October 31 every year to commemorate the birth anniversary of:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "History Time Machine", "Indian Constitution & Governance"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Sardar Vallabhbhai Patel ('The Iron Man of India')", isCorrect: true },
      { id: "opt-2", text: "Subhas Chandra Bose", isCorrect: false },
      { id: "opt-3", text: "Lal Bahadur Shastri", isCorrect: false },
      { id: "opt-4", text: "Bhagat Singh", isCorrect: false }
    ],
    explanation: "Introduced in 2014, National Unity Day pays tribute to Sardar Patel's monumental leadership in integrating 565 princely states into the Indian Union, celebrated with the nationwide 'Run for Unity'.",
    tags: ["junior-current-affairs", "important-events", "history", "unity"]
  },
  {
    id: "q-current-097",
    title: "World Wildlife Day is celebrated on March 3 each year to celebrate and raise awareness of the world's wild animals and plants, marking the signature of which 1973 international convention?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Animal Encyclopedia", "Environmental Ecology & Conservation"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "CITES (Convention on International Trade in Endangered Species)", isCorrect: true },
      { id: "opt-2", text: "Ramsar Convention on Wetlands", isCorrect: false },
      { id: "opt-3", text: "Bonn Convention on Migratory Species (CMS)", isCorrect: false },
      { id: "opt-4", text: "Convention on Biological Diversity (CBD)", isCorrect: false }
    ],
    explanation: "March 3 commemorates the adoption of CITES in Washington D.C. in 1973. The 2024 World Wildlife Day theme was 'Connecting People and Planet: Exploring Digital Innovation in Wildlife Conservation'.",
    tags: ["junior-current-affairs", "important-events", "wildlife", "conservation"]
  },
  {
    id: "q-current-098",
    title: "Proclaimed by UNESCO in 1999, International Mother Language Day is observed worldwide on February 21 each year, tracing its origins to the 1952 Language Movement in:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Literature, Awards & Culture", "Art, Music & Culture"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "Bangladesh (former East Pakistan, defending Bengali)", isCorrect: true },
      { id: "opt-2", text: "South Africa (defending indigenous Bantu dialects)", isCorrect: false },
      { id: "opt-3", text: "Canada (defending French language rights in Quebec)", isCorrect: false },
      { id: "opt-4", text: "Belgium (defending Flemish linguistic equality)", isCorrect: false }
    ],
    explanation: "On February 21, 1952, students in Dhaka were killed while protesting for the official recognition of their mother language, Bengali. UNESCO established the day to promote linguistic diversity and multilingual education.",
    tags: ["junior-current-affairs", "important-events", "unesco", "language", "culture"]
  },
  {
    id: "q-current-099",
    title: "World Water Day is celebrated globally on March 22 each year under the auspices of UN-Water. What was the official theme for World Water Day 2024?",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Oceanography & Water Systems", "Environmental Ecology & Conservation"],
    difficulty: "medium",
    options: [
      { id: "opt-1", text: "'Water for Peace'", isCorrect: true },
      { id: "opt-2", text: "'Accelerating Change'", isCorrect: false },
      { id: "opt-3", text: "'Groundwater: Making the Invisible Visible'", isCorrect: false },
      { id: "opt-4", text: "'Valuing Water'", isCorrect: false }
    ],
    explanation: "World Water Day 2024 highlighted 'Water for Peace', underscoring that water can create peace or spark conflict when scarce or contaminated, urging cross-border cooperation on shared transboundary river basins.",
    tags: ["junior-current-affairs", "important-events", "water", "environment"]
  },
  {
    id: "q-current-100",
    title: "The United Nations General Assembly declared the period 2021 to 2030 as the UN Decade on:",
    subject: "General Awareness & Logic",
    topic: "Junior Current Affairs",
    topics: ["Junior Current Affairs", "Environmental Ecology & Conservation", "Global Current Affairs & Summits"],
    difficulty: "easy",
    options: [
      { id: "opt-1", text: "Ecosystem Restoration", isCorrect: true },
      { id: "opt-2", text: "Sustainable Urbanization", isCorrect: false },
      { id: "opt-3", text: "Artificial Intelligence Literacy", isCorrect: false },
      { id: "opt-4", text: "Renewable Energy Transition", isCorrect: false }
    ],
    explanation: "Led by UNEP and FAO, the UN Decade on Ecosystem Restoration (2021-2030) is a rallying call for the protection and revival of ecosystems across continents and oceans to counter climate change and halt biodiversity loss.",
    tags: ["junior-current-affairs", "important-events", "environment", "un"]
  }
];

module.exports = { currentAffairsQuestions };
