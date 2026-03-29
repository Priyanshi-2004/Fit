-- Fix RLS policies for profiles table
-- Drop existing policies to recreate them cleanly
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Service role can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow service role to insert during signup" ON public.profiles;
DROP POLICY IF EXISTS "enable_select_for_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "enable_update_for_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "enable_insert_for_own_profile" ON public.profiles;

-- Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- SELECT policy - users can view their own profile
CREATE POLICY "select_own_profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- UPDATE policy - users can update their own profile
CREATE POLICY "update_own_profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- INSERT policy - users can insert their own profile
CREATE POLICY "insert_own_profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Admin bypass - allow all operations by service role
CREATE POLICY "admin_all"
  ON public.profiles FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

