import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import { QuestionItem, QuestionOption, QuestionType, DifficultyLevel } from "../../lib/types/question";
import { QuestionIntelligenceValidator, QuestionValidationResult } from "../../lib/quality/questionIntelligenceValidator";
import { DuplicateDetectionEngine } from "../../lib/quality/duplicateEngine";

interface RawPage {
  pageNumber: number;
  text: string;
  lines: string[];
  charCount: number;
  lineCount: number;
}

interface PageExtractionData {
  sourcePdf: string;
  sourcePdfPath: string;
  totalPages: number;
  pages: RawPage[];
}

export interface PageManifestEntry {
  sourceFilename: string;
  pageNumber: number;
  processingStatus: "PROCESSED_WITH_CONTENT" | "PROCESSED_NO_QUIZ_CONTENT" | "NEEDS_OCR" | "NEEDS_MANUAL_REVIEW" | "FAILED";
  extractionMethod: "DIRECT_TEXT_AND_OCR";
  usefulContentFound: boolean;
  area: string;
  part: string;
  gradeLevel: string;
  existingQuestionsExtracted: number;
  newQuestionsGenerated: number;
  questionsApproved: number;
  questionsRejected: number;
  extractionErrors: string | null;
  retryStatus: "SUCCESS" | "FAILED";
}

// Semantic distractor pools for perfect category homogeneity
const POOLS = {
  YEARS: ["1926", "1919", "1935", "1947", "1950", "1954", "1969", "1971", "1973", "1984", "1987", "1992", "2013", "2014", "2015", "2018", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2036", "2070"],
  INDIAN_STATES: [
    "Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana", "Maharashtra", "Gujarat", 
    "Rajasthan", "Madhya Pradesh", "Uttar Pradesh", "Odisha", "West Bengal", "Bihar", "Assam", 
    "Punjab", "Haryana", "Himachal Pradesh", "Uttarakhand", "Jharkhand", "Chhattisgarh", "Goa", 
    "Sikkim", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Tripura", "Arunachal Pradesh"
  ],
  INDIAN_CITIES: [
    "Chennai", "Madurai", "Coimbatore", "Tiruchirappalli", "Salem", "Tiruppur", "Erode", "Thanjavur", 
    "Kanyakumari", "Rameswaram", "Bengaluru", "Hyderabad", "Amaravati", "Thiruvananthapuram", "Kochi", 
    "Visakhapatnam", "Mumbai", "New Delhi", "Kolkata", "Jaipur", "Lucknow", "Patna", "Bhopal", 
    "Gandhinagar", "Chandigarh", "Shimla", "Dehradun", "Vellore", "Kumbakonam"
  ],
  WORLD_COUNTRIES: [
    "India", "United States", "China", "Japan", "France", "Germany", "United Kingdom", "Russia", 
    "Brazil", "Canada", "Australia", "South Africa", "Egypt", "Indonesia", "Malaysia", "Philippines", 
    "South Korea", "Italy", "Spain", "Norway", "Sweden", "Switzerland", "Tanzania", "Türkiye", 
    "Timor-Leste", "Sri Lanka", "Bhutan", "Nepal", "Bangladesh", "Pakistan"
  ],
  WORLD_CAPITALS: [
    "Canberra", "Brasília", "Ottawa", "Beijing", "Cairo", "Paris", "Berlin", "Jakarta", "Rome", 
    "Tokyo", "Nairobi", "Kuala Lumpur", "Kathmandu", "Wellington", "Abuja", "Manila", "Moscow", 
    "Riyadh", "Singapore", "Pretoria", "Seoul", "Bangkok", "Abu Dhabi", "London", "Washington, D.C.", 
    "Hanoi", "Oslo", "Stockholm", "Geneva", "Vienna", "Brussels", "Thimphu", "Dhaka", "Islamabad"
  ],
  ORGANISATIONS: [
    "ISRO", "DRDO", "CSIR", "DST", "DBT", "DAE", "BARC", "ICMR", "MeitY", "RBI", "SEBI", "NABARD", 
    "UIDAI", "NHAI", "ECI", "UPSC", "NITI Aayog", "WHO", "WTO", "IMF", "World Bank", "UNESCO", 
    "UNICEF", "UNEP", "CITES", "IUCN", "WMO", "FAO", "IPU", "ACM"
  ],
  AUTHORS: [
    "Rabindranath Tagore", "R. K. Narayan", "Ruskin Bond", "Dr. A. P. J. Abdul Kalam", "Munshi Premchand", 
    "Mulk Raj Anand", "Arundhati Roy", "Vikram Seth", "Salman Rushdie", "Amitav Ghosh", "Shashi Tharoor", 
    "Sudha Murty", "Amish Tripathi", "William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen", 
    "J. K. Rowling", "J. R. R. Tolkien", "C. S. Lewis", "Lewis Carroll", "Agatha Christie", "Jules Verne", 
    "George Orwell", "Antoine de Saint-Exupéry", "Arthur Conan Doyle", "Roald Dahl", "Rudyard Kipling"
  ],
  SPORTS_PERSONS: [
    "D. Gukesh", "Neeraj Chopra", "P. V. Sindhu", "Saina Nehwal", "Lakshya Sen", "Satwik Rankireddy", 
    "Chirag Shetty", "Harmanpreet Kaur", "Lionel Messi", "Mirabai Chanu", "Lovlina Borgohain", 
    "Parveen Hooda", "Ankush Panghal", "Sujeet Kalkal", "Aman Sehrawat", "Pranavi Urs", "Ravichandran Ashwin", 
    "Abhishek Sharma", "Tilak Varma", "Shreyas Iyer", "Major Dhyan Chand", "Viswanathan Anand", "Avinash Sable"
  ],
  DANCES: [
    "Bharatanatyam", "Kathak", "Kathakali", "Kuchipudi", "Odissi", "Manipuri", "Mohiniyattam", 
    "Sattriya", "Garba", "Bhangra", "Ghoomar", "Lavani", "Bihu", "Karagattam", "Kavadi Attam", "Yakshagana"
  ],
  VITAMINS: ["Vitamin A", "Vitamin B1", "Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin E", "Vitamin K"],
  DEFICIENCIES: ["Night blindness", "Beriberi", "Anaemia", "Scurvy", "Rickets", "Goitre", "Bleeding disorders"],
  TECH_TERMS: ["CPU", "GPU", "RAM", "ROM", "SSD", "HTTP", "HTTPS", "URL", "HTML", "AI", "ML", "NLP", "LLM", "IoT", "5G", "QR", "UPI", "LiDAR", "2FA", "QKD"],
  DATES: [
    "26 January", "28 February", "8 March", "22 March", "7 April", "22 April", "3 May", "5 June", 
    "8 June", "21 June", "1 July", "26 July", "7 August", "12 August", "15 August", "29 August", 
    "5 September", "8 September", "14 September", "15 September", "16 September", "21 September", 
    "27 September", "2 October", "5 October", "8 October", "16 October", "24 October", "31 October", 
    "14 November", "20 November", "26 November", "10 December", "11 December", "22 December"
  ],
  RIVERS: ["Ganga", "Yamuna", "Brahmaputra", "Indus", "Godavari", "Krishna", "Cauvery", "Narmada", "Tapi", "Mahanadi", "Vaigai", "Thamirabarani", "Palar", "Pennaiyar"],
  LAKES: ["Wular Lake", "Dal Lake", "Chilika Lake", "Sambhar Lake", "Loktak Lake", "Vembanad Lake", "Pulicat Lake", "Kolleru Lake"],
  NATIONAL_PARKS: ["Jim Corbett National Park", "Kaziranga National Park", "Gir National Park", "Ranthambore National Park", "Kanha National Park", "Bandhavgarh National Park", "Bandipur National Park", "Mudumalai Tiger Reserve", "Periyar National Park", "Sundarbans National Park", "Kuno National Park", "Desert National Park"],
  DESERTS: ["Sahara Desert", "Gobi Desert", "Arabian Desert", "Kalahari Desert", "Atacama Desert", "Thar Desert", "Antarctic Desert"]
};

// Seeded pseudorandom generator for deterministic reproducibility
function createSeededRandom(seed: number) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// Select 3 distractors from the matching semantic pool
export function generateSemanticDistractors(
  correctAnswer: string,
  pool: string[],
  seedStr: string
): string[] {
  const normCorrect = correctAnswer.trim().toLowerCase();
  const available = pool.filter((item) => item.trim().toLowerCase() !== normCorrect);
  
  // Hash seed
  let hashVal = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hashVal = (hashVal << 5) - hashVal + seedStr.charCodeAt(i);
    hashVal |= 0;
  }
  const rng = createSeededRandom(Math.abs(hashVal) + 42);

  // Shuffle available
  const shuffled = [...available];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const chosen = shuffled.slice(0, 3);
  return chosen;
}

// Detect the semantic category of an answer string
export function detectSemanticPool(answer: string, questionStem: string): { pool: string[]; categoryName: string } {
  const ans = answer.trim();
  const q = questionStem.toLowerCase();

  // Year check: e.g. "1926", "2026", "1950"
  if (/^(?:18\d\d|19\d\d|20\d\d)$/.test(ans) || q.includes("in which year") || q.includes("what year") || q.includes("which year")) {
    return { pool: POOLS.YEARS, categoryName: "years" };
  }

  // Date check: e.g. "26 January", "5 September", "28 February"
  if (/^\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)$/i.test(ans) || q.includes("which date") || q.includes("when is") || q.includes("celebrated on")) {
    return { pool: POOLS.DATES, categoryName: "dates" };
  }

  // State check:
  if (POOLS.INDIAN_STATES.some((s) => s.toLowerCase() === ans.toLowerCase()) || q.includes("which state") || q.includes("in which state")) {
    return { pool: POOLS.INDIAN_STATES, categoryName: "indian_states" };
  }

  // City check:
  if (POOLS.INDIAN_CITIES.some((c) => c.toLowerCase() === ans.toLowerCase()) || q.includes("which city") || q.includes("where was") || q.includes("headquartered") || q.includes("capital")) {
    if (POOLS.WORLD_CAPITALS.some((wc) => wc.toLowerCase() === ans.toLowerCase()) && (q.includes("country") || q.includes("world") || q.includes("capital of australia") || q.includes("capital of brazil") || q.includes("capital of canada"))) {
      return { pool: POOLS.WORLD_CAPITALS, categoryName: "world_capitals" };
    }
    return { pool: POOLS.INDIAN_CITIES, categoryName: "indian_cities" };
  }

  // World Countries:
  if (POOLS.WORLD_COUNTRIES.some((c) => c.toLowerCase() === ans.toLowerCase()) || q.includes("which country") || q.includes("host country")) {
    return { pool: POOLS.WORLD_COUNTRIES, categoryName: "world_countries" };
  }

  // World Capitals:
  if (POOLS.WORLD_CAPITALS.some((wc) => wc.toLowerCase() === ans.toLowerCase())) {
    return { pool: POOLS.WORLD_CAPITALS, categoryName: "world_capitals" };
  }

  // Organizations:
  if (POOLS.ORGANISATIONS.some((o) => o.toLowerCase() === ans.toLowerCase()) || q.includes("which organization") || q.includes("which institution") || q.includes("which agency") || q.includes("stand for")) {
    return { pool: POOLS.ORGANISATIONS, categoryName: "organisations" };
  }

  // Authors:
  if (POOLS.AUTHORS.some((a) => a.toLowerCase().includes(ans.toLowerCase()) || ans.toLowerCase().includes(a.toLowerCase())) || q.includes("author") || q.includes("who wrote") || q.includes("written by")) {
    return { pool: POOLS.AUTHORS, categoryName: "authors" };
  }

  // Sports persons:
  if (POOLS.SPORTS_PERSONS.some((sp) => sp.toLowerCase().includes(ans.toLowerCase()) || ans.toLowerCase().includes(sp.toLowerCase())) || q.includes("who won") || q.includes("which player") || q.includes("which athlete")) {
    return { pool: POOLS.SPORTS_PERSONS, categoryName: "sports_persons" };
  }

  // Dances:
  if (POOLS.DANCES.some((d) => d.toLowerCase() === ans.toLowerCase()) || q.includes("dance")) {
    return { pool: POOLS.DANCES, categoryName: "dances" };
  }

  // Vitamins:
  if (POOLS.VITAMINS.some((v) => v.toLowerCase() === ans.toLowerCase()) || q.includes("vitamin")) {
    return { pool: POOLS.VITAMINS, categoryName: "vitamins" };
  }

  // Deficiencies:
  if (POOLS.DEFICIENCIES.some((df) => df.toLowerCase() === ans.toLowerCase()) || q.includes("deficiency") || q.includes("causes")) {
    return { pool: POOLS.DEFICIENCIES, categoryName: "deficiencies" };
  }

  // Tech terms:
  if (POOLS.TECH_TERMS.some((tt) => tt.toLowerCase() === ans.toLowerCase()) || q.includes("abbreviation") || q.includes("stands for")) {
    return { pool: POOLS.TECH_TERMS, categoryName: "tech_terms" };
  }

  // Rivers:
  if (POOLS.RIVERS.some((r) => r.toLowerCase() === ans.toLowerCase()) || q.includes("river")) {
    return { pool: POOLS.RIVERS, categoryName: "rivers" };
  }

  // Lakes:
  if (POOLS.LAKES.some((l) => l.toLowerCase() === ans.toLowerCase()) || q.includes("lake")) {
    return { pool: POOLS.LAKES, categoryName: "lakes" };
  }

  // National Parks:
  if (POOLS.NATIONAL_PARKS.some((np) => np.toLowerCase() === ans.toLowerCase()) || q.includes("national park") || q.includes("tiger reserve")) {
    return { pool: POOLS.NATIONAL_PARKS, categoryName: "national_parks" };
  }

  // Fallback for number/quantity:
  const numMatch = ans.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z%]*)$/);
  if (numMatch) {
    const val = parseFloat(numMatch[1]);
    const unit = numMatch[2] ? ` ${numMatch[2]}` : "";
    const p1 = `${Math.round(val * 0.75 * 10) / 10}${unit}`;
    const p2 = `${Math.round(val * 1.25 * 10) / 10}${unit}`;
    const p3 = `${Math.round(val * 1.5 * 10) / 10}${unit}`;
    return { pool: [p1, p2, p3], categoryName: "quantities" };
  }

  // Default fallback pool: Indian cities/states
  return { pool: POOLS.INDIAN_CITIES, categoryName: "general" };
}

console.log("Pipeline components ready.");
