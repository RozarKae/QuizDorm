# QuizDorm — Next-Generation Quiz & Assessment Platform

[![Version](https://img.shields.io/badge/version-1.0.0--stable-indigo)](https://github.com/RozarKae/QuizDorm)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

QuizDorm is a premium, multi-tenant assessment and live competition platform built for schools, colleges, quiz institutes, academies, and enterprise organizations.

---

## 🚀 Key Modules & Architecture

### 1. Multi-Tenant Organization Management
- **Workspaces**: Independent branding, logo upload, custom color palettes, and tenant isolation.
- **Department Hierarchy**: Science, Mathematics, Humanities, and custom academic wings.
- **Member Roster**: Role-based access control (Super Admin, School Admin, Teacher, Student).

### 2. Question Bank & Quiz Builder
- **7 Question Formats**: Single-choice MCQ, Multiple-choice MCQ, True/False, Fill-in-the-blank, Matching Pairs, Sequence Ordering, and Image-based questions.
- **Question Picker Modal**: Pick questions directly from the central repository with format filtering.

### 3. Quiz Delivery Engine
- **Distraction-Free Interface**: Full-screen mode, question palette, live countdown timer, and local-storage state auto-recovery.
- **Instant Results & Review**: Detailed question-by-question answer review with explanations and score breakdown.

### 4. Live Competition Engine
- **Game Pin Joining**: Real-time join lobby with host control panels.
- **Live Leaderboards**: Animated rankings, streak bonuses, and interactive winner podies.

### 5. Teacher & Student Ecosystem
- **Classroom Hub**: Create classes (e.g., Grade 12-A), generate PIN codes, and assign co-teachers.
- **Quiz & Homework Assignments**: Set due dates, attempt limits, and timer toggles.
- **Academic Calendar**: Monthly agenda for test schedules, deadlines, and tournaments.
- **Announcements**: Targeted notice publisher for classroom groups.

### 6. Analytics, Reports & Insights
- **Interactive SVG Charts**: Line graphs, bar charts, donut grade ratio charts, and weak topic heatmaps.
- **Report Generator**: Export Student Progress, Class Performance, and Quiz Item Analysis as **PDF**, **Excel**, or **CSV** files.

---

## 💻 Tech Stack

- **Framework**: Next.js 16.2 (Turbopack) & React 19
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS & Glassmorphism UI tokens
- **Icons**: Lucide React
- **Notifications**: Sonner

---

## 🛠️ Local Installation & Development

```bash
# Clone repository
git clone https://github.com/RozarKae/QuizDorm.git
cd quizdorm

# Install dependencies
npm install

# Run development server on port 3001
npm run dev -p 3001
```

---

## 📦 Production Build & Deployment

```bash
# Verify TypeScript types
npx tsc --noEmit

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
