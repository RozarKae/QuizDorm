-- Migration: Stage B Quiz Workflow RLS and Idempotency Enhancements

-- 1. Add idempotency_key to quiz_attempts to prevent duplicate submissions
ALTER TABLE public.quiz_attempts 
  ADD COLUMN IF NOT EXISTS idempotency_key TEXT UNIQUE;

-- 2. Add creator_id and order_index to questions for standalone question bank persistence and ordering
ALTER TABLE public.questions 
  ADD COLUMN IF NOT EXISTS creator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;

-- 3. Enhance questions RLS policies
-- Allow authenticated creators to insert questions
CREATE POLICY "Questions insertable by authenticated creators" ON public.questions
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Allow creators to update their own questions
CREATE POLICY "Questions updateable by creator or quiz creator" ON public.questions
  FOR UPDATE USING (
    creator_id = auth.uid() OR 
    (quiz_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.quizzes WHERE id = quiz_id AND creator_id = auth.uid()
    ))
  );

-- Allow creators to delete their own questions
CREATE POLICY "Questions deleteable by creator or quiz creator" ON public.questions
  FOR DELETE USING (
    creator_id = auth.uid() OR 
    (quiz_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.quizzes WHERE id = quiz_id AND creator_id = auth.uid()
    ))
  );

-- Allow reading question bank questions or questions belonging to accessible quizzes
CREATE POLICY "Question bank questions readable by authenticated users" ON public.questions
  FOR SELECT USING (
    quiz_id IS NULL OR 
    creator_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.quizzes WHERE id = quiz_id AND (is_published = true OR creator_id = auth.uid())
    )
  );

-- 4. Enhance question_options RLS policies
CREATE POLICY "Options insertable by authenticated users" ON public.question_options
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Options updateable by question creator" ON public.question_options
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.questions q 
      WHERE q.id = question_id AND (
        q.creator_id = auth.uid() OR 
        (q.quiz_id IS NOT NULL AND EXISTS (
          SELECT 1 FROM public.quizzes qz WHERE qz.id = q.quiz_id AND qz.creator_id = auth.uid()
        ))
      )
    )
  );

CREATE POLICY "Options deleteable by question creator" ON public.question_options
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.questions q 
      WHERE q.id = question_id AND (
        q.creator_id = auth.uid() OR 
        (q.quiz_id IS NOT NULL AND EXISTS (
          SELECT 1 FROM public.quizzes qz WHERE qz.id = q.quiz_id AND qz.creator_id = auth.uid()
        ))
      )
    )
  );

-- 5. Allow quiz creators (teachers) to view student attempts and answers on their quizzes
CREATE POLICY "Quiz creators can view attempts for their quizzes" ON public.quiz_attempts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.quizzes qz 
      WHERE qz.id = quiz_id AND qz.creator_id = auth.uid()
    )
  );

CREATE POLICY "Quiz creators can view answers for their quizzes" ON public.student_answers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.quiz_attempts qa 
      JOIN public.quizzes qz ON qz.id = qa.quiz_id 
      WHERE qa.id = attempt_id AND qz.creator_id = auth.uid()
    )
  );
