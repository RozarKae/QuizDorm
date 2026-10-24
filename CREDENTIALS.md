# QuizDorm — User Accounts & Credentials Directory

This file documents all seeded development, demonstration, and system test accounts configured in [`app/auth/constants.ts`](file:///f:/quizdorm/app/auth/constants.ts) and [`lib/admin/userManager.ts`](file:///f:/quizdorm/lib/admin/userManager.ts).

> [!NOTE]
> **Production Password Security**: In production environments, user passwords are encrypted and hashed with one-way salted hashing algorithms (bcrypt/Argon2) via Supabase Auth (`auth.users`). Plaintext passwords for real end-users are never stored in the database. The credentials below represent the pre-configured system test accounts used for role testing, automated QA, and administrative access.

---

## 1. Credentials Summary Table

| User ID | Full Name | Email Address | Password | Role | Target Workspace |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `usr-superadmin-01` | Corporate Super Admin | `superadmin@quizdorm.com` | `SuperAdmin#2026!` | Super Admin (`superadmin`) | [`/admin`](file:///f:/quizdorm/app/admin) |
| `usr-masteradmin-01` | Academic Master Admin | `masteradmin@quizdorm.com` | `MasterAdmin#2026!` | Master Admin (`masteradmin`) | [`/admin/master`](file:///f:/quizdorm/app/admin/master) |
| `usr-admin-01` | Corporate Super Admin (Legacy) | `admin@quizdorm.com` | `Admin#QuizDorm2026!` | Super Admin (`superadmin`) | [`/admin`](file:///f:/quizdorm/app/admin) |
| `usr-institution-01` | Govt Model & Matriculation Admin | `institution@quizdorm.com` | `School#Campus2026!` | Institution (`institution`) | [`/school`](file:///f:/quizdorm/app/school) |
| `usr-school-01` | Campus Administrator | `school@quizdorm.com` | `School#Campus2026!` | Institution (`institution`) | [`/school`](file:///f:/quizdorm/app/school) |
| `usr-handler-01` | Prof. Sarah Jenkins | `handler@quizdorm.com` | `Teacher#Educator2026!` | Handler / Teacher (`handler`) | [`/teacher`](file:///f:/quizdorm/app/teacher) |
| `usr-teacher-01` | Prof. Sarah Jenkins (Alias) | `teacher@quizdorm.com` | `Teacher#Educator2026!` | Handler / Teacher (`handler`) | [`/teacher`](file:///f:/quizdorm/app/teacher) |
| `usr-member-01` | Karthik Rajendran | `member@quizdorm.com` | `Student#Learner2026!` | Member / Student (`member`) | [`/student`](file:///f:/quizdorm/app/student) |
| `usr-student-01` | Karthik Rajendran (Alias) | `student@quizdorm.com` | `Student#Learner2026!` | Member / Student (`member`) | [`/student`](file:///f:/quizdorm/app/student) |
| `usr-subscriber-01` | Devon Reed (Subscriber) | `subscriber@quizdorm.com` | `Subscriber#QuizDorm2026!` | Subscriber (`subscriber`) | [`/student`](file:///f:/quizdorm/app/student) |

---

## 2. Role Permissions & Workspace Breakdown

### 👑 Super Admin (`superadmin`)
- **Login Email:** `superadmin@quizdorm.com`
- **Password:** `SuperAdmin#2026!`
- **User ID:** `usr-superadmin-01`
- **Dashboard:** `/admin`
- **Governance:** Employee management, corporate billing, server configurations, institutional tenant provisioning, and global telemetry.

### 🎓 Academic Master Admin (`masteradmin`)
- **Login Email:** `masteradmin@quizdorm.com`
- **Password:** `MasterAdmin#2026!`
- **User ID:** `usr-masteradmin-01`
- **Dashboard:** `/admin/master`
- **Governance:** Curriculum oversight, quiz vaults, public catalog approvals, scholar subscribers, and content monetization.

### 🏛️ Institution / Campus Admin (`institution`)
- **Login Email:** `institution@quizdorm.com` (or `school@quizdorm.com`)
- **Password:** `School#Campus2026!`
- **User ID:** `usr-institution-01`
- **Dashboard:** `/school`
- **Governance:** School-wide student cohorts, teacher roster assignments, department analytics, and campus subscription license seats.

### 👩‍🏫 Handler / Teacher (`handler`)
- **Login Email:** `handler@quizdorm.com` (or `teacher@quizdorm.com`)
- **Password:** `Teacher#Educator2026!`
- **User ID:** `usr-handler-01`
- **Dashboard:** `/teacher`
- **Governance:** Classroom management, AI quiz generation from PDFs, real-time live competition hosting, and student grading.

### 🎒 Member / Student (`member`)
- **Login Email:** `member@quizdorm.com` (or `student@quizdorm.com`)
- **Password:** `Student#Learner2026!`
- **User ID:** `usr-member-01`
- **Dashboard:** `/student`
- **Governance:** Homework assignments, classroom quizzes, live PIN arena participation, and personal IQ performance tracking.

### 💎 Subscriber (`subscriber`)
- **Login Email:** `subscriber@quizdorm.com`
- **Password:** `Subscriber#QuizDorm2026!`
- **User ID:** `usr-subscriber-01`
- **Dashboard:** `/student`
- **Governance:** Premium self-paced learning, unlimited AI quiz generation, global competition participation, and full question bank access.

---

## 3. Machine-Readable JSON Export

```json
[
  {
    "id": "usr-superadmin-01",
    "name": "Corporate Super Admin",
    "email": "superadmin@quizdorm.com",
    "password": "SuperAdmin#2026!",
    "role": "superadmin",
    "roleLabel": "Super Admin",
    "redirectUrl": "/admin"
  },
  {
    "id": "usr-masteradmin-01",
    "name": "Academic Master Admin",
    "email": "masteradmin@quizdorm.com",
    "password": "MasterAdmin#2026!",
    "role": "masteradmin",
    "roleLabel": "Master Admin",
    "redirectUrl": "/admin/master"
  },
  {
    "id": "usr-admin-01",
    "name": "Corporate Super Admin (Legacy)",
    "email": "admin@quizdorm.com",
    "password": "Admin#QuizDorm2026!",
    "role": "superadmin",
    "roleLabel": "Super Admin",
    "redirectUrl": "/admin"
  },
  {
    "id": "usr-institution-01",
    "name": "Govt Model & Matriculation Admin",
    "email": "institution@quizdorm.com",
    "password": "School#Campus2026!",
    "role": "institution",
    "roleLabel": "Institution",
    "redirectUrl": "/school"
  },
  {
    "id": "usr-school-01",
    "name": "Campus Administrator",
    "email": "school@quizdorm.com",
    "password": "School#Campus2026!",
    "role": "institution",
    "roleLabel": "Institution",
    "redirectUrl": "/school"
  },
  {
    "id": "usr-handler-01",
    "name": "Prof. Sarah Jenkins",
    "email": "handler@quizdorm.com",
    "password": "Teacher#Educator2026!",
    "role": "handler",
    "roleLabel": "Handler",
    "redirectUrl": "/teacher"
  },
  {
    "id": "usr-teacher-01",
    "name": "Prof. Sarah Jenkins (Alias)",
    "email": "teacher@quizdorm.com",
    "password": "Teacher#Educator2026!",
    "role": "handler",
    "roleLabel": "Handler",
    "redirectUrl": "/teacher"
  },
  {
    "id": "usr-member-01",
    "name": "Karthik Rajendran",
    "email": "member@quizdorm.com",
    "password": "Student#Learner2026!",
    "role": "member",
    "roleLabel": "Member",
    "redirectUrl": "/student"
  },
  {
    "id": "usr-student-01",
    "name": "Karthik Rajendran (Alias)",
    "email": "student@quizdorm.com",
    "password": "Student#Learner2026!",
    "role": "member",
    "roleLabel": "Member",
    "redirectUrl": "/student"
  },
  {
    "id": "usr-subscriber-01",
    "name": "Devon Reed (Subscriber)",
    "email": "subscriber@quizdorm.com",
    "password": "Subscriber#QuizDorm2026!",
    "role": "subscriber",
    "roleLabel": "Subscriber",
    "redirectUrl": "/student"
  }
]
```

---

## 4. CSV Export Format

```csv
User ID,Full Name,Email,Password,Role,Target Workspace
usr-superadmin-01,Corporate Super Admin,superadmin@quizdorm.com,SuperAdmin#2026!,superadmin,/admin
usr-masteradmin-01,Academic Master Admin,masteradmin@quizdorm.com,MasterAdmin#2026!,masteradmin,/admin/master
usr-admin-01,Corporate Super Admin (Legacy),admin@quizdorm.com,Admin#QuizDorm2026!,superadmin,/admin
usr-institution-01,Govt Model & Matriculation Admin,institution@quizdorm.com,School#Campus2026!,institution,/school
usr-school-01,Campus Administrator,school@quizdorm.com,School#Campus2026!,institution,/school
usr-handler-01,Prof. Sarah Jenkins,handler@quizdorm.com,Teacher#Educator2026!,handler,/teacher
usr-teacher-01,Prof. Sarah Jenkins (Alias),teacher@quizdorm.com,Teacher#Educator2026!,handler,/teacher
usr-member-01,Karthik Rajendran,member@quizdorm.com,Student#Learner2026!,member,/student
usr-student-01,Karthik Rajendran (Alias),student@quizdorm.com,Student#Learner2026!,member,/student
usr-subscriber-01,Devon Reed (Subscriber),subscriber@quizdorm.com,Subscriber#QuizDorm2026!,subscriber,/student
```
