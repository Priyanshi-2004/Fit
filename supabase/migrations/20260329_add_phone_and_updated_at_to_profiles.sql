-- Add missing columns to profiles table if they don't exist
-- This migration adds phone and updated_at columns to support profile editing

ALTER TABLE IF EXISTS public.profiles
ADD COLUMN IF NOT EXISTS phone text;

ALTER TABLE IF EXISTS public.profiles
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT current_timestamp;

-- Create trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = current_timestamp;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists to recreate it
DROP TRIGGER IF EXISTS update_profiles_updated_at_trigger ON public.profiles;

-- Create the trigger
CREATE TRIGGER update_profiles_updated_at_trigger
AFTER UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_profiles_updated_at();
