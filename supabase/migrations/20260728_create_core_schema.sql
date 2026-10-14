-- Core QuizDorm Relational Schema Migration

-- 1. Create Classrooms & Enrollments
CREATE TABLE IF NOT EXISTS public.classrooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade_level TEXT,
  access_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Classrooms readable by members and creators" ON public.classrooms
  FOR SELECT USING (true);

CREATE POLICY "Classrooms manageable by teachers and schools" ON public.classrooms
  FOR ALL USING (auth.uid() = teacher_id OR auth.uid() = school_id);

CREATE TABLE IF NOT EXISTS public.classroom_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id UUID REFERENCES public.classrooms(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(classroom_id, student_id)
);

ALTER TABLE public.classroom_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enrollments viewable by enrolled user and teacher" ON public.classroom_enrollments
  FOR SELECT USING (auth.uid() = student_id OR EXISTS (
    SELECT 1 FROM public.classrooms WHERE id = classroom_id AND (teacher_id = auth.uid() OR school_id = auth.uid())
  ));

-- 2. Create Quizzes & Questions
CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  classroom_id UUID REFERENCES public.classrooms(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  category TEXT,
  difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  duration_minutes INT NOT NULL DEFAULT 30,
  total_marks INT NOT NULL DEFAULT 100,
  pass_marks INT NOT NULL DEFAULT 50,
  is_published BOOLEAN DEFAULT false,
  randomize_questions BOOLEAN DEFAULT false,
  shuffle_options BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published quizzes readable by authenticated users" ON public.quizzes
  FOR SELECT USING (is_published = true OR creator_id = auth.uid());

CREATE POLICY "Quizzes manageable by creator" ON public.quizzes
  FOR ALL USING (creator_id = auth.uid());

CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type VARCHAR(30) NOT NULL CHECK (type IN ('mcq_single', 'mcq_multiple', 'true_false', 'fill_in_the_blank', 'match_following', 'image_based', 'descriptive')),
  subject TEXT,
  category TEXT,
  topic TEXT,
  difficulty VARCHAR(20) DEFAULT 'medium',
  marks INT NOT NULL DEFAULT 1,
  negative_marks NUMERIC(4,2) DEFAULT 0.0,
  explanation TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Questions readable with quiz access" ON public.questions
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.quizzes WHERE id = quiz_id AND (is_published = true OR creator_id = auth.uid())
  ));

CREATE TABLE IF NOT EXISTS public.question_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false,
  option_order INT DEFAULT 0
);

ALTER TABLE public.question_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Options readable with question access" ON public.question_options
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.questions WHERE id = question_id
  ));

-- 3. Create Quiz Attempts & Answers
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'submitted', 'timed_out', 'abandoned')),
  score INT DEFAULT 0,
  total_marks INT NOT NULL,
  percentage NUMERIC(5,2) DEFAULT 0.0,
  is_passed BOOLEAN DEFAULT false,
  correct_count INT DEFAULT 0,
  incorrect_count INT DEFAULT 0,
  unanswered_count INT DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own attempts" ON public.quiz_attempts
  FOR ALL USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.student_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID REFERENCES public.quiz_attempts(id) ON DELETE CASCADE,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  user_answer JSONB NOT NULL,
  is_correct BOOLEAN DEFAULT false,
  score_awarded NUMERIC(5,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.student_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Answers managed by attempt owner" ON public.student_answers
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.quiz_attempts WHERE id = attempt_id AND user_id = auth.uid()
  ));

-- 4. Create Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
  attempt_id UUID REFERENCES public.quiz_attempts(id) ON DELETE CASCADE,
  certificate_number TEXT UNIQUE NOT NULL,
  issue_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  verification_url TEXT
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public certificate verification read" ON public.certificates
  FOR SELECT USING (true);
