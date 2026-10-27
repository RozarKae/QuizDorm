# QUIZDORM — TECHNICAL ARCHITECTURE & SYSTEM DESIGN

**Version:** 2.0.0 (Production Stable)  
**Date:** October 2026  
**Audience:** Principal Architects, DevOps Engineers, Full-Stack Engineers

---

## 1. Architectural Overview

QuizDorm is designed as a hybrid cloud, edge-routed, multi-tenant digital assessment and live competition platform. It combines Next.js 16 (App Router + Edge Proxy), React 19, Supabase PostgreSQL, and Google Gemini Question Intelligence.

```mermaid
graph TD
    User([Browser / Mobile Client]) -->|HTTPS / WSS| EdgeProxy[Next.js 16 Edge Proxy (proxy.ts)]
    
    subgraph Edge Security & RBAC Layer
        EdgeProxy -->|Validate Role & HMAC Session| RouteGuard{Role Check}
        RouteGuard -->|Super Admin| AdminApp["/admin (Corporate OS)"]
        RouteGuard -->|Master Admin| MasterApp["/admin/master (Curriculum OS)"]
        RouteGuard -->|Institution| SchoolApp["/school (Campus Portal)"]
        RouteGuard -->|Teacher / Handler| TeacherApp["/teacher (Classroom Hub)"]
        RouteGuard -->|Student / Candidate| StudentApp["/student (Learner Portal)"]
        RouteGuard -->|Guest PIN Join| LiveArena["/live/arena (Tournament)"]
    end

    subgraph Backend Core & API Services
        AdminApp & MasterApp & SchoolApp & TeacherApp & StudentApp --> API["/api/v1 & /api/ai"]
        API --> QIS[Question Intelligence Service]
        API --> LAS[Live Arena Orchestrator]
    end

    subgraph Data & Cloud Integrations
        QIS -->|Structured Prompts| Gemini[Google Gemini 3.5 Flash Lite]
        QIS -.->|Fallback| DFS[Document Fallback Synthesizer]
        API -->|Relational Schema| Supabase[(Supabase PostgreSQL)]
        User -.->|Offline Cache| LocalStorage[(Browser Storage & IndexedDB)]
    end
```

---

## 2. Core Architectural Subsystems

### 2.1 Edge Proxy & Role-Based Access Control (`proxy.ts`)
In Next.js 16, Middleware is unified as [`proxy.ts`](file:///f:/quizdorm/proxy.ts) at the project root.
- **Session Verification**: Inspects the `quizdorm_demo_session` cookie signed via HMAC-SHA256 ([`lib/security/cookieSigner.ts`](file:///f:/quizdorm/lib/security/cookieSigner.ts)) or the live Supabase Auth JWT.
- **Role Isolation**:
  - `superadmin`: Access to `/admin`, corporate billing, system telemetry, tenant provisioning.
  - `masteradmin`: Access to `/admin/master`, curriculum repository, quiz vaults, scholar subscriptions.
  - `institution`: Access to `/school`, student rosters, teacher assignments.
  - `handler` / `teacher`: Access to `/teacher`, classroom creation, gradebook, quiz assignments.
  - `member` / `student`: Access to `/student`, exam taking, attempt review, certificates.
- **Guest Arena Exception**: Paths starting with `/live`, `/join`, and `/api/live` are public to allow frictionless PIN/QR joining while isolating candidate credentials.

### 2.2 Question Intelligence & Phase 2.0 Engine
- **Provider Architecture**: Implements [`IQuestionIntelligenceProvider`](file:///f:/quizdorm/lib/ai/server/IQuestionIntelligenceProvider.ts). Primary provider is [`GeminiQuestionProvider`](file:///f:/quizdorm/lib/ai/server/geminiQuestionProvider.ts) using `@google/genai` (model: `gemini-3.5-flash-lite`, fallback: `gemini-flash-lite-latest`).
- **Generation Modes**:
  1. **Topic**: Generates questions across specified academic domain and subtopic.
  2. **Syllabus / Curriculum**: Takes curriculum outlines and distributes items evenly across units.
  3. **Pasted Text / Passage**: Enforces strict grounding directly in the provided excerpt.
  4. **Document (PDF/TXT/MD)**: Server-side text extraction with chunked prompting.
- **Quality Gates**: Every question passes through [`QuestionIntelligenceValidator`](file:///f:/quizdorm/lib/quality/questionIntelligenceValidator.ts) evaluating stem clarity, distractor homogeneity, educational rationales, and Bloom's complexity.
- **Human-in-the-Loop Curation**: Built into [`AIQuestionGeneratorModal.tsx`](file:///f:/quizdorm/components/ai/AIQuestionGeneratorModal.tsx), giving educators full inline preview, stem/option editing, distractor inspection, and selective saving.

### 2.3 Persistence Architecture
- **Multi-Tier Persistence**:
  1. **Primary Cloud**: Supabase PostgreSQL tables (`profiles`, `quizzes`, `questions`, `question_options`, `quiz_attempts`, `student_answers`, `classrooms`).
  2. **Local Repository**: Indexed storage in `localStorage` (`STORAGE_KEY_QUESTIONS = "quizdorm_question_bank_v16"` and `STORAGE_KEY_QUIZZES = "quizdorm_quizzes_v2"`) with 3,704 validated baseline questions.
  3. **Reactive Synchronization**: Window events (`"quizdorm:questions-updated"`) notify active tabs and components when items are authored or imported.

### 2.4 Live Competition Tournament Engine
- **Room State Manager**: In-memory session store with Server-Sent Events (SSE) and polling fallback.
- **Secret Isolation**: Room hosts receive an ephemeral `hostSecret` upon room creation. Actions like `START_QUESTION`, `NEXT_QUESTION`, or `END_SESSION` strictly require this token.
- **Answer Key Masking**: The server strips correct answers (`isCorrect: false`) from payloads sent to contender clients until question expiration.
