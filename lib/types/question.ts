export type QuestionType =
  | "mcq_single"
  | "mcq_multiple"
  | "true_false"
  | "fill_in_the_blank"
  | "match_following"
  | "sequence_ordering"
  | "image_based";

export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
  image?: string;
  explanation?: string;
}

export interface MatchPair {
  id: string;
  leftItem: string;
  rightItem: string;
}

export interface SequenceItem {
  id: string;
  text: string;
  order: number;
}

export interface QuestionItem {
  id: string;
  title: string;
  description?: string;
  type: QuestionType;
  subject: string;
  category: string;
  topic: string;
  subtopic?: string;
  difficulty: DifficultyLevel;
  marks: number;
  timeLimitSeconds: number;
  explanation?: string;
  hints?: string[];
  tags: string[];
  image?: string;
  options: QuestionOption[];
  matchingPairs?: MatchPair[];
  sequenceItems?: SequenceItem[];
  fillBlanks?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CategoryTaxonomy {
  id: string;
  subject: string;
  category: string;
  topics: string[];
}
