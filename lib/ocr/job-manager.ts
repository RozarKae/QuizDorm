import { ExtractedQuestion,OCRJob,OCRJobSettings } from "@/lib/types/ocr";
import { DuplicateDetectorService } from "./duplicate-detector";
import { OCREngineService } from "./engine";

const STORAGE_KEY = "quizdorm_ocr_jobs";

export const INITIAL_MOCK_JOBS: OCRJob[] = [
  {
    id: "job-101",
    fileName: "Physics_Question_Paper_2025.pdf",
    fileSize: 4194304, // 4MB
    fileType: "pdf",
    status: "review_ready",
    progress: 100,
    currentStep: "Educator Review",
    uploadedAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    pageCount: 4,
    subject: "Physics",
    settings: {
      language: "en",
      mode: "printed",
      provider: "mock",
      autoNumbering: true,
      autoTopicDetection: true,
      autoDifficultyDetection: true,
      virusScanPassed: true,
    },
    extractedQuestions: [
      {
        id: "q-std-1",
        questionNumber: "Question 1",
        title: "Which Newton's Law of Motion states that for every action force, there is an equal and opposite reaction force?",
        type: "mcq_single",
        subject: "Physics",
        topic: "Mechanics",
        difficulty: "Easy",
        marks: 1,
        options: [
          { id: "o1", text: "Newton's First Law", isCorrect: false },
          { id: "o2", text: "Newton's Second Law", isCorrect: false },
          { id: "o3", text: "Newton's Third Law", isCorrect: true },
          { id: "o4", text: "Law of Gravitation", isCorrect: false },
        ],
        explanation: "Newton's Third Law states that forces always occur in equal and opposite pairs.",
        confidence: { overall: 98, ocrAccuracy: 99, questionDetection: 98, answerDetection: 97, tableRecognition: 95, handwritingRecognition: 99 },
        status: "detected",
      },
      {
        id: "q-std-2",
        questionNumber: "Question 2",
        title: "Select ALL vector quantities from the list below:",
        type: "mcq_multiple",
        subject: "Physics",
        topic: "Kinematics",
        difficulty: "Medium",
        marks: 3,
        options: [
          { id: "o1", text: "Velocity", isCorrect: true },
          { id: "o2", text: "Speed", isCorrect: false },
          { id: "o3", text: "Acceleration", isCorrect: true },
          { id: "o4", text: "Displacement", isCorrect: true },
          { id: "o5", text: "Temperature", isCorrect: false },
        ],
        explanation: "Velocity, acceleration, and displacement have both magnitude and spatial direction.",
        confidence: { overall: 95, ocrAccuracy: 97, questionDetection: 96, answerDetection: 94, tableRecognition: 92, handwritingRecognition: 95 },
        status: "detected",
      },
    ],
  },
  {
    id: "job-102",
    fileName: "Handwritten_Biology_Notes.png",
    fileSize: 1887436,
    fileType: "png",
    status: "review_ready",
    progress: 100,
    currentStep: "Educator Review",
    uploadedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4.8).toISOString(),
    pageCount: 1,
    subject: "Biology",
    settings: {
      language: "en",
      mode: "handwritten",
      provider: "mock",
      autoNumbering: true,
      autoTopicDetection: true,
      autoDifficultyDetection: true,
      virusScanPassed: true,
    },
    extractedQuestions: [
      {
        id: "q-hw-1",
        questionNumber: "1.",
        title: "What is the primary site of photosynthesis in eukaryotic plant cells?",
        type: "mcq_single",
        subject: "Biology",
        topic: "Cell Biology",
        difficulty: "Easy",
        marks: 2,
        isHandwritten: true,
        options: [
          { id: "opt-a", text: "Chloroplast", isCorrect: true },
          { id: "opt-b", text: "Mitochondria (ocr uncertain)", isCorrect: false },
          { id: "opt-c", text: "Endoplasmic Reticulum", isCorrect: false },
          { id: "opt-d", text: "Golgi Complex", isCorrect: false },
        ],
        explanation: "Photosynthesis takes place within chloroplasts.",
        confidence: { overall: 74, ocrAccuracy: 72, questionDetection: 85, answerDetection: 70, tableRecognition: 80, handwritingRecognition: 73 },
        lowConfidenceFields: ["options", "handwriting"],
        status: "flagged",
      },
    ],
  },
  {
    id: "job-103",
    fileName: "Advanced_Calculus_Exam.docx",
    fileSize: 2621440,
    fileType: "docx",
    status: "completed",
    progress: 100,
    currentStep: "Completed",
    uploadedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 83000000).toISOString(),
    pageCount: 2,
    subject: "Mathematics",
    settings: {
      language: "en",
      mode: "math_dense",
      provider: "mock",
      autoNumbering: true,
      autoTopicDetection: true,
      autoDifficultyDetection: true,
      virusScanPassed: true,
    },
    extractedQuestions: [],
  },
];

export class OCRJobManager {
  /**
   * Get all OCR jobs from persistent storage
   */
  public static getJobs(): OCRJob[] {
    if (typeof window === "undefined") return INITIAL_MOCK_JOBS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_JOBS));
        return INITIAL_MOCK_JOBS;
      }
      return JSON.parse(saved);
    } catch {
      return INITIAL_MOCK_JOBS;
    }
  }

  /**
   * Save jobs array to storage
   */
  public static saveJobs(jobs: OCRJob[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    } catch (e) {
      console.error("Failed to save OCR jobs to localStorage", e);
    }
  }

  /**
   * Get a single job by ID
   */
  public static getJobById(id: string): OCRJob | undefined {
    const jobs = this.getJobs();
    return jobs.find((j) => j.id === id);
  }

  /**
   * Create a new OCR Job and start execution
   */
  public static async createJob(
    file: File | { name: string; size?: number; type?: string; content?: string },
    settings: OCRJobSettings,
    subject: string = "General"
  ): Promise<OCRJob> {
    const validation = OCREngineService.validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error || "Invalid file");
    }

    const newJob: OCRJob = {
      id: `job-${Date.now()}`,
      fileName: file.name,
      fileSize: file.size || 1024 * 100,
      fileType: validation.fileType,
      status: "queued",
      progress: 0,
      currentStep: "Upload",
      uploadedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      extractedQuestions: [],
      subject,
      settings,
    };

    const jobs = [newJob, ...this.getJobs()];
    this.saveJobs(jobs);

    return newJob;
  }

  /**
   * Run OCR pipeline for a specific job
   */
  public static async runJobPipeline(
    jobId: string,
    file?: File | { name: string; type: string; content?: string },
    onProgressUpdate?: (updatedJob: OCRJob) => void
  ): Promise<OCRJob> {
    const jobs = this.getJobs();
    const jobIndex = jobs.findIndex((j) => j.id === jobId);

    if (jobIndex === -1) throw new Error("Job not found");

    const currentJob = jobs[jobIndex];
    currentJob.status = "processing";
    currentJob.updatedAt = new Date().toISOString();
    this.saveJobs(jobs);
    if (onProgressUpdate) onProgressUpdate(currentJob);

    try {
      const filePayload = file || { name: currentJob.fileName, type: currentJob.fileType };

      const result = await OCREngineService.processDocument(
        filePayload,
        {
          ...currentJob.settings,
          targetSubject: currentJob.subject || currentJob.settings.targetSubject,
        },
        (progress, step) => {
          currentJob.progress = progress;
          currentJob.currentStep = step as OCRJob["currentStep"];
          currentJob.updatedAt = new Date().toISOString();
          this.saveJobs(jobs);
          if (onProgressUpdate) onProgressUpdate({ ...currentJob });
        }
      );

      // Perform duplicate check
      const checkedQuestions = DuplicateDetectorService.checkDuplicates(result.detectedQuestions, []);

      currentJob.status = "review_ready";
      currentJob.progress = 100;
      currentJob.currentStep = "Educator Review";
      currentJob.extractedQuestions = checkedQuestions;
      currentJob.rawText = result.rawText;
      currentJob.pageCount = result.pageCount;
      currentJob.updatedAt = new Date().toISOString();
      currentJob.lowConfidenceCount = checkedQuestions.filter((q) => (q.lowConfidenceFields?.length || 0) > 0 || q.status === "flagged").length;

      jobs[jobIndex] = currentJob;
      this.saveJobs(jobs);
      if (onProgressUpdate) onProgressUpdate(currentJob);

      return currentJob;
    } catch (err: unknown) {
      currentJob.status = "failed";
      currentJob.currentStep = "Failed";
      currentJob.error = err instanceof Error ? err.message : "OCR processing failed";
      currentJob.updatedAt = new Date().toISOString();
      jobs[jobIndex] = currentJob;
      this.saveJobs(jobs);
      if (onProgressUpdate) onProgressUpdate(currentJob);

      throw err;
    }
  }

  /**
   * Save updated questions for a job (Draft auto-save)
   */
  public static updateJobQuestions(jobId: string, questions: ExtractedQuestion[]): void {
    const jobs = this.getJobs();
    const idx = jobs.findIndex((j) => j.id === jobId);
    if (idx !== -1) {
      jobs[idx].extractedQuestions = questions;
      jobs[idx].updatedAt = new Date().toISOString();
      this.saveJobs(jobs);
    }
  }

  /**
   * Update job status (e.g., set to completed or archived)
   */
  public static updateJobStatus(jobId: string, status: OCRJob["status"]): void {
    const jobs = this.getJobs();
    const idx = jobs.findIndex((j) => j.id === jobId);
    if (idx !== -1) {
      jobs[idx].status = status;
      if (status === "completed") {
        jobs[idx].currentStep = "Completed";
      }
      jobs[idx].updatedAt = new Date().toISOString();
      this.saveJobs(jobs);
    }
  }

  /**
   * Delete a job
   */
  public static deleteJob(jobId: string): void {
    const jobs = this.getJobs().filter((j) => j.id !== jobId);
    this.saveJobs(jobs);
  }
}
