export interface CitationItem {
  id: string;
  citationKey: string; // e.g. "Vance2025Quantum"
  title: string;
  authors: string[];
  journalOrConference: string;
  year: number;
  doi?: string;
  bibtexSnippet: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  discipline: string;
  leadResearcher: string;
  collaboratorsCount: number;
  status: "In Progress" | "Under Peer Review" | "Published";
  milestones: { title: string; isCompleted: boolean }[];
  citationsCount: number;
  createdAt: string;
}

export interface CurriculumDesign {
  id: string;
  title: string;
  subjectArea: string;
  academicLevel: string;
  targetDurationWeeks: number;
  outcomes: { id: string; bloomsLevel: string; outcomeStatement: string }[];
  modulesCount: number;
  accreditationMapped: boolean;
}

export interface AuthoringDocument {
  id: string;
  title: string;
  category: "Lesson" | "Textbook Chapter" | "Question Bank" | "Paper";
  wordCount: number;
  authorName: string;
  hasLaTeXFormulas: boolean;
  hasDiagrams: boolean;
  contentMarkdown: string;
  lastEdited: string;
}

export interface PublishedPublication {
  id: string;
  publicationTitle: string;
  format: "Digital Book" | "Courseware" | "Question Bank" | "Research Paper";
  isbn: string;
  publisher: string;
  releaseDate: string;
  downloadCount: number;
  publicPortalUrl: string;
  status: "Draft" | "Scheduled" | "Published";
}

export interface ContentVersion {
  versionHash: string; // e.g. "v2.4.1-a8f"
  branchName: string; // e.g. "main", "feature/ch5-edits"
  commitMessage: string;
  author: string;
  timestamp: string;
  linesAdded: number;
  linesDeleted: number;
}

export interface ResourceLibraryAsset {
  id: string;
  assetName: string;
  assetType: "PDF Document" | "SVG Diagram" | "High-Res Image" | "Audio Lecture" | "Video";
  fileSizeBytes: number;
  tags: string[];
  uploadedBy: string;
  uploadDate: string;
  vectorVectorized: boolean;
}

export interface ResearchAnalyticsData {
  totalPublications: number;
  totalCitations: number;
  hIndexImpact: number;
  monthlyReadership: number;
  topPerformingPaper: string;
}
