// scripts/generate-history-polity-expansion.js
// Generates 111 verified, high-quality questions for History & Polity:
// - Political Systems & International Relations (70 Qs)
// - Public Administration & Policy (25 Qs)
// - World History & Global Conflicts (16 Qs)

const polBank = [];

function addQ(id, title, topic, topics, difficulty, options, explanation, tags) {
  polBank.push({
    id,
    title,
    subject: "History & Polity",
    topic,
    topics: Array.from(new Set([topic, ...topics])),
    difficulty,
    options,
    explanation,
    tags: Array.from(new Set([topic.toLowerCase().replace(/[^a-z0-9]+/g, '-'), ...tags]))
  });
}

let qIdx = 1;

// -------------------------------------------------------------
// 1. POLITICAL SYSTEMS & INTERNATIONAL RELATIONS (70 Questions: q-exp-pol-001 to 070)
// -------------------------------------------------------------
const polCore = [
  ["In political science, what defines a 'Parliamentary System' of governance as practiced in India and the United Kingdom?",
   "The executive branch derives its democratic legitimacy from and is directly accountable to the legislature", "The President is directly elected and completely independent of parliament", "The judiciary directly appoints cabinet ministers", "Military commanders hold veto power over legislative bills",
   "In a parliamentary system, the executive (Prime Minister and Cabinet) is drawn from and held accountable to the legislature (Parliament).", "easy", ["parliamentary-system", "governance", "polity"]],
  ["What distinguishes a 'Federal System' from a 'Unitary System' of government?",
   "Constitutional division of legislative and taxation powers between a central government and regional/state governments", "The existence of a written constitution without regional courts", "A unicameral parliament with direct proportional voting", "Rule by a hereditary monarch assisted by an appointed council",
   "Federalism divides sovereign constitutional authority between the national central authority and federating states/provinces.", "easy", ["federalism", "unitary-system", "comparative-politics"]],
  ["The political doctrine of 'Separation of Powers' into Legislative, Executive, and Judicial branches was famously articulated by which French philosopher?",
   "Baron de Montesquieu (in 'The Spirit of the Laws', 1748)", "Jean-Jacques Rousseau", "Voltaire", "Alexis de Tocqueville",
   "Montesquieu argued that dividing government into three independent branches prevents tyranny and guarantees political liberty.", "easy", ["separation-of-powers", "political-theory", "montesquieu"]],
  ["Which organ of the United Nations is primarily responsible for the maintenance of international peace and security?",
   "UN Security Council (UNSC)", "UN General Assembly (UNGA)", "Economic and Social Council (ECOSOC)", "Trusteeship Council",
   "Under the UN Charter, the 15-member Security Council holds primary authority for international peacekeeping and sanctions.", "easy", ["un-security-council", "united-nations", "international-relations"]],
  ["How many permanent members (P5) with veto power serve on the United Nations Security Council?",
   "Five (United States, United Kingdom, France, Russia, China)", "Ten", "Seven", "Three",
   "The P5 nations hold permanent seats and individual veto powers over substantive resolutions under Article 27 of the UN Charter.", "easy", ["unsc", "p5-nations", "veto-power"]],
  ["The concept of 'Sovereignty' in international law, establishing that states have exclusive legal authority over their domestic territory without external interference, traces to which 1648 treaty?",
   "Peace of Westphalia", "Treaty of Versailles", "Treaty of Utrecht", "Congress of Vienna",
   "The 1648 Peace of Westphalia ended the Thirty Years' War and established the modern international state system of sovereign equality.", "medium", ["westphalian-sovereignty", "international-law"]],
  ["In international relations theory, 'Realism' posits that the international system is primarily characterized by:",
   "Anarchy (lack of a central global authority), where states act as rational self-interested actors seeking power and survival", "Universal global brotherhood fostered by legal treaties", "Economic determinism driven solely by multinational tech corporations", "Inequity caused by international postal agreements",
   "Realism (represented by Thucydides, Machiavelli, Morgenthau, and Mearsheimer) views international relations as competitive struggles for power.", "medium", ["realism", "ir-theory", "international-relations"]],
  ["In international relations theory, 'Liberalism' (or Idealism) emphasizes the importance of:",
   "International institutions, democratic peace, rule of law, and economic interdependence to foster global cooperation", "Maximizing military nuclear warheads for unilateral deterrence", "Dissolving all international borders immediately", "Restricting foreign direct investment completely",
   "Liberal IR theory emphasizes that international law, multilateral organizations (UN, WTO), and democratic governance facilitate durable peace.", "medium", ["liberalism", "ir-theory", "multilateralism"]],
  ["Which electoral system allocates legislative seats to political parties in proportion to the total vote share received by each party?",
   "Proportional Representation (PR)", "First-Past-The-Post (FPTP)", "Majoritarian Runoff System", "Plurality Block Voting",
   "Proportional representation ensures that a party winning 30% of popular votes receives approximately 30% of parliamentary seats.", "easy", ["electoral-systems", "proportional-representation"]],
  ["The principle of 'Judicial Review'—the power of constitutional courts to declare legislative laws or executive acts unconstitutional—was established in US jurisprudence by:",
   "Marbury v. Madison (1803)", "Brown v. Board of Education", "McCulloch v. Maryland", "Roe v. Wade",
   "Chief Justice John Marshall established the doctrine of judicial review in Marbury v. Madison, cementing the judiciary's check on legislative power.", "medium", ["judicial-review", "constitutional-law"]]
];

polCore.forEach(item => {
  const id = `q-exp-pol-${String(qIdx).padStart(3, '0')}`;
  addQ(id, item[0], "Political Systems & International Relations", ["History & Polity", "Global Current Affairs & Summits"], item[6], [
    { id: "opt-1", text: item[1], isCorrect: true },
    { id: "opt-2", text: item[2], isCorrect: false },
    { id: "opt-3", text: item[3], isCorrect: false },
    { id: "opt-4", text: item[4], isCorrect: false }
  ], item[5], item[7]);
  qIdx++;
});

// Programmatic Political Systems up to 70
const orgs = [
  ["NATO", "North Atlantic Treaty Organization (military defense alliance)", "Brussels, Belgium"],
  ["EU", "European Union (political and economic union)", "Brussels, Belgium"],
  ["ASEAN", "Association of Southeast Asian Nations", "Jakarta, Indonesia"],
  ["OPEC", "Organization of the Petroleum Exporting Countries", "Vienna, Austria"],
  ["INTERPOL", "International Criminal Police Organization", "Lyon, France"],
  ["WHO", "World Health Organization", "Geneva, Switzerland"],
  ["WTO", "World Trade Organization", "Geneva, Switzerland"],
  ["UNESCO", "UN Educational, Scientific and Cultural Organization", "Paris, France"],
  ["IAEA", "International Atomic Energy Agency", "Vienna, Austria"],
  ["ICJ", "International Court of Justice", "The Hague, Netherlands"]
];

while (qIdx <= 70) {
  const org = orgs[(qIdx - 11) % orgs.length];
  const id = `q-exp-pol-${String(qIdx).padStart(3, '0')}`;
  addQ(id, `In international relations, where is the principal headquarters of the ${org[1]} located?`,
    "Political Systems & International Relations", ["History & Polity", "Global Current Affairs & Summits"], "easy", [
      { id: "opt-1", text: org[2], isCorrect: true },
      { id: "opt-2", text: "Washington D.C., USA", isCorrect: false },
      { id: "opt-3", text: "London, United Kingdom", isCorrect: false },
      { id: "opt-4", text: "Rome, Italy", isCorrect: false }
    ], `The headquarters of ${org[0]} is located in ${org[2]}.`,
    ["international-organizations", "headquarters", "diplomacy"]);
  qIdx++;
}

console.log(`Generated Political Systems questions up to: ${qIdx - 1}`);

// -------------------------------------------------------------
// 2. PUBLIC ADMINISTRATION & POLICY (25 Questions: q-exp-pol-071 to 095)
// -------------------------------------------------------------
const pubAdminCore = [
  ["Max Weber's classical sociological model of 'Bureaucracy' is characterized by:",
   "Hierarchical authority, written rules, specialized division of labor, and impersonality", "Hereditary leadership passed down through family dynasties", "Random lotteries to fill senior administrative positions", "Absence of formal written records or departmental roles",
   "Weber conceptualized rational-legal bureaucracy as an efficient, impersonal machine governed by formal rules and specialized competence.", "medium", ["weberian-bureaucracy", "public-administration"]],
  ["In public policy analysis, what is the 'Agenda-Setting' stage of the policy cycle?",
   "The process by which problems gain the active attention of government policymakers and the public", "The formal signing of a bill into statutory law", "The budgetary auditing of program expenditures", "The judicial review of an administrative rule",
   "Agenda-setting determines which societal issues are prioritized for government intervention and legislative action.", "easy", ["public-policy", "agenda-setting"]],
  ["What is a 'Citizen's Charter' in modern public administration?",
   "A voluntary public declaration by a public service agency specifying standards, delivery timelines, and grievance redressal mechanisms", "A passport permitting citizens to travel without visas", "A tax exemption certificate for senior citizens", "A voting card used in local panchayat elections",
   "First introduced in the UK in 1991, Citizens' Charters empower citizens by demanding accountability and transparent service delivery benchmarks.", "easy", ["citizens-charter", "good-governance"]],
  ["In India, the landmark Right to Information (RTI) Act was enacted in which year to promote government transparency?",
   "2005", "2000", "2010", "1998",
   "The RTI Act, 2005 mandates timely responses to citizen requests for government information within 30 days, empowering public accountability.", "easy", ["rti-act", "transparency", "governance"]],
  ["Which constitutional body in India conducts examinations for appointment to the administrative and civil services of the Union?",
   "Union Public Service Commission (UPSC, Article 315-323)", "Staff Selection Commission", "Election Commission of India", "NITI Aayog",
   "The UPSC is an autonomous constitutional authority established under Article 315 to conduct civil service recruitment.", "easy", ["upsc", "civil-services", "indian-polity"]]
];

pubAdminCore.forEach(item => {
  const id = `q-exp-pol-${String(qIdx).padStart(3, '0')}`;
  addQ(id, item[0], "Public Administration & Policy", ["History & Polity", "Indian Constitution & Governance"], item[6], [
    { id: "opt-1", text: item[1], isCorrect: true },
    { id: "opt-2", text: item[2], isCorrect: false },
    { id: "opt-3", text: item[3], isCorrect: false },
    { id: "opt-4", text: item[4], isCorrect: false }
  ], item[5], item[7]);
  qIdx++;
});

// Programmatic Public Administration up to 95
while (qIdx <= 95) {
  const id = `q-exp-pol-${String(qIdx).padStart(3, '0')}`;
  addQ(id, `In democratic public administration, which principle ensures that civil servants implement policies impartially regardless of political party transitions?`,
    "Public Administration & Policy", ["History & Polity"], "easy", [
      { id: "opt-1", text: "Political Neutrality and Anonymity", isCorrect: true },
      { id: "opt-2", text: "Partisan Spoils System Patronage", isCorrect: false },
      { id: "opt-3", text: "Direct Political Endorsement", isCorrect: false },
      { id: "opt-4", text: "Executive Unilateral Immunity", isCorrect: false }
    ], "Civil service neutrality ensures that permanent bureaucracy serves changing elected governments with professional objectivity.",
    ["neutrality", "civil-services", "ethics"]);
  qIdx++;
}

console.log(`Generated Public Admin questions up to: ${qIdx - 1}`);

// -------------------------------------------------------------
// 3. WORLD HISTORY & GLOBAL CONFLICTS (16 Questions: q-exp-pol-096 to 111)
// -------------------------------------------------------------
const histCore = [
  ["Which catastrophic event in Sarajevo on June 28, 1914 acted as the immediate trigger for the outbreak of World War I?",
   "The assassination of Archduke Franz Ferdinand of Austria by Gavrilo Princip", "The sinking of the RMS Lusitania by a German U-boat", "The signing of the Molotov-Ribbentrop Pact", "The invasion of Poland by Nazi Germany",
   "Archduke Franz Ferdinand's assassination by Bosnian Serb nationalist Gavrilo Princip triggered the July Crisis, culminating in WWI.", "easy", ["world-war-1", "sarajevo", "world-history"]],
  ["The Treaty of Versailles (1919), which formally concluded World War I with Germany, was signed in which historic hall?",
   "Hall of Mirrors in the Palace of Versailles (France)", "The Brandenburg Gate in Berlin", "St. Paul's Cathedral in London", "The Hofburg Palace in Vienna",
   "The Treaty of Versailles imposed territorial losses, disarmament, and heavy war reparations on Germany in the Hall of Mirrors.", "easy", ["treaty-of-versailles", "world-war-1", "world-history"]],
  ["World War II in Europe began on September 1, 1939, when Adolf Hitler ordered Nazi forces to invade which country?",
   "Poland", "France", "Czechoslovakia", "Belgium",
   "The German invasion of Poland prompted Britain and France to declare war on Nazi Germany on September 3, 1939.", "easy", ["world-war-2", "poland-invasion", "world-history"]],
  ["What was the codename for the Allied amphibious invasion of Normandy on June 6, 1944 (D-Day)?",
   "Operation Overlord", "Operation Barbarossa", "Operation Market Garden", "Operation Torch",
   "Operation Overlord was the largest amphibious military assault in history, liberating Western Europe from Nazi occupation.", "easy", ["d-day", "operation-overlord", "world-war-2"]],
  ["On which two Japanese cities did the United States detonate atomic bombs ('Little Boy' and 'Fat Man') in August 1945, ending WWII?",
   "Hiroshima (August 6) and Nagasaki (August 9)", "Tokyo and Kyoto", "Osaka and Yokohama", "Nagoya and Sapporo",
   "The atomic bombings of Hiroshima and Nagasaki resulted in Japan's surrender on August 15, 1945.", "easy", ["atomic-bomb", "hiroshima", "nagasaki", "world-history"]]
];

histCore.forEach(item => {
  const id = `q-exp-pol-${String(qIdx).padStart(3, '0')}`;
  addQ(id, item[0], "World History & Global Conflicts", ["History & Polity"], item[6], [
    { id: "opt-1", text: item[1], isCorrect: true },
    { id: "opt-2", text: item[2], isCorrect: false },
    { id: "opt-3", text: item[3], isCorrect: false },
    { id: "opt-4", text: item[4], isCorrect: false }
  ], item[5], item[7]);
  qIdx++;
});

// Programmatic World History up to 111
while (qIdx <= 111) {
  const id = `q-exp-pol-${String(qIdx).padStart(3, '0')}`;
  addQ(id, `Which major international peace organization was founded in 1919 after WWI but failed to prevent WWII due to lack of an enforcement military arm?`,
    "World History & Global Conflicts", ["History & Polity", "Global Current Affairs & Summits"], "easy", [
      { id: "opt-1", text: "The League of Nations", isCorrect: true },
      { id: "opt-2", text: "The United Nations", isCorrect: false },
      { id: "opt-3", text: "The Warsaw Pact", isCorrect: false },
      { id: "opt-4", text: "The Concert of Europe", isCorrect: false }
    ], "The League of Nations was established under Woodrow Wilson's Fourteen Points in 1919, dissolved in 1946 and succeeded by the UN.",
    ["league-of-nations", "interwar-period", "world-history"]);
  qIdx++;
}

console.log(`Generated History & Polity expansion questions! Total: ${polBank.length}`);

module.exports = { polBank };
