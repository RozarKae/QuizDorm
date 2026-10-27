# QUIZDORM — PRODUCTION DEPLOYMENT & OPERATIONS GUIDE

**Application:** QuizDorm Assessment & Live Tournament Platform  
**Target Environments:** Vercel (Edge & Serverless), Node.js / Docker, Self-Hosted Linux  
**Runtime:** Node.js 20+ (LTS)  
**Framework:** Next.js 16.2.10 (Turbopack)

---

## 1. Environment Variable Configuration

Create a `.env.production` (or configure your hosting provider's dashboard) with the following variables. **Never commit actual secrets to version control.**

```bash
# ==============================================================================
# Supabase Relational Database & Authentication
# ==============================================================================
NEXT_PUBLIC_SUPABASE_URL="https://<your-project-ref>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<your-supabase-public-anon-key>"

# Optional: Supabase Service Role Key for server-side admin provisioning
SUPABASE_SERVICE_ROLE_KEY="<your-service-role-secret>"

# ==============================================================================
# Google Gemini Question Intelligence Engine
# ==============================================================================
GEMINI_API_KEY="<your-gemini-api-key-from-google-ai-studio>"

# ==============================================================================
# Site & Security Configuration
# ==============================================================================
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
SESSION_SECRET="<random-32-character-hex-string-for-hmac-cookie-signing>"
```

---

## 2. Database Migrations (Supabase PostgreSQL)

If deploying to a fresh Supabase project, execute the migration scripts located in [`supabase/migrations/`](file:///f:/quizdorm/supabase/migrations):

1. **Auth & Profiles**: Run [`supabase/migrations/20260716_create_auth_schema.sql`](file:///f:/quizdorm/supabase/migrations/20260716_create_auth_schema.sql)
   - Creates `profiles`, `user_preferences`, `notification_settings`, and the `handle_new_user()` auto-provisioning trigger.
2. **Core Relational Schema**: Run [`supabase/migrations/20260728_create_core_schema.sql`](file:///f:/quizdorm/supabase/migrations/20260728_create_core_schema.sql)
   - Creates `classrooms`, `classroom_enrollments`, `quizzes`, `questions`, `question_options`, `quiz_attempts`, `student_answers`, and `certificates` with Row Level Security (RLS) policies.

---

## 3. Production Build & Deployment Commands

### Standard Deployment (Vercel / Cloudflare Pages / AWS Amplify)
```bash
# 1. Install dependencies using lockfile
npm ci

# 2. Verify TypeScript strict types
npx tsc --noEmit

# 3. Verify automated regression tests
npm test

# 4. Build optimized production bundle
npm run build

# 5. Start production server
npm run start
```

### Self-Hosted Docker Deployment
A standard multi-stage Next.js Dockerfile can be built using:
```bash
docker build -t quizdorm:2.0.0 .
docker run -p 3000:3000 --env-file .env.production quizdorm:2.0.0
```

---

## 4. Production Health Checks & Monitoring

The application provides dedicated health check and diagnostics endpoints:

| Endpoint | Method | Expected Output | Purpose |
| :--- | :---: | :--- | :--- |
| `/api/ai/questions/generate` | `GET` | `{"service": "...", "status": "ready", "activeModel": "gemini-3.5-flash-lite"}` | Verifies Gemini AI reachability |
| `/api/live/session/create` | `POST` | HTTP 400 (Bad payload) or HTTP 200 | Verifies Live Arena state manager |
| `/robots.txt` | `GET` | Standard SEO crawling rules | Verifies Edge Proxy routing |

---

## 5. Rollback Procedures

If an issue occurs post-deployment:
1. **Instant Vercel Rollback**: Navigate to **Deployments** > click previous stable deployment > **Promote to Production**.
2. **Git Rollback**:
   ```bash
   git revert <failing-commit-hash>
   git push origin main
   ```
3. **Database Safeguard**: Migrations use `IF NOT EXISTS` and non-destructive column additions; rolling back the application code does not require rolling back the relational schema.
