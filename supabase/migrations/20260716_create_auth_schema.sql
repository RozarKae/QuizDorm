-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role VARCHAR(50) NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'school', 'admin')),
  display_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Allow users to update their own profiles" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 2. Create preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  theme VARCHAR(20) DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on preferences
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read their own preferences" ON public.user_preferences
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow users to update their own preferences" ON public.user_preferences
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow system to insert preferences" ON public.user_preferences
  FOR INSERT WITH CHECK (true);

-- 3. Create notification_settings table
CREATE TABLE IF NOT EXISTS public.notification_settings (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on notification_settings
ALTER TABLE public.notification_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read their own notification settings" ON public.notification_settings
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow users to update their own notification settings" ON public.notification_settings
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow system to insert notification settings" ON public.notification_settings
  FOR INSERT WITH CHECK (true);

-- 4. Create trigger to automatically provision user profiles, preferences, and notifications on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  default_role TEXT;
  full_name TEXT;
  user_name TEXT;
BEGIN
  -- Extract metadata
  default_role := COALESCE(new.raw_user_meta_data->>'role', 'student');
  full_name := new.raw_user_meta_data->>'name';
  user_name := COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1));

  -- Insert profile
  INSERT INTO public.profiles (id, role, display_name, username, avatar_url)
  VALUES (
    new.id,
    default_role,
    full_name,
    user_name,
    'https://api.dicebear.com/7.x/adventurer/svg?seed=' || user_name
  );

  -- Insert preferences
  INSERT INTO public.user_preferences (id, theme, language)
  VALUES (new.id, 'light', 'en');

  -- Insert notification settings
  INSERT INTO public.notification_settings (id, email_notifications, push_notifications)
  VALUES (new.id, true, true);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger definition
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
