# Profile Save Issue - Complete Fix Guide

## Problem Summary
When editing the profile name (e.g., changing "John" to "PG"), the change is **not** saving to the Supabase database.

## Root Cause
The RLS (Row Level Security) policies are either:
1. Conflicting due to duplicate policy names
2. Not allowing authenticated users to update
3. Silently failing without error messages

## Solution Steps

### Step 1: Fix RLS Policies in Supabase

**Go to Supabase:**
1. Visit: https://app.supabase.com/
2. Select your project
3. Go to **SQL Editor** → Click **New Query**
4. Copy and paste **ALL** this code:

```sql
-- Drop ALL conflicting policies
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

-- Create clean policies
CREATE POLICY "select_own_profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "update_own_profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "insert_own_profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "admin_all"
  ON public.profiles FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');
```

5. Click **Run** (or Ctrl+Enter)
6. You should see: ✅ **Success** (with No. of rows = 0)

### Step 2: Test the Profile Edit

```bash
npm run dev
```

1. Go to http://localhost:3000/login
2. Login with your credentials (demo@gmail.com / password)
3. Click the **avatar** in top right → Click **View Profile**
4. Click the **Edit** button
5. Change name from "John" to "TEST" (or any other name)
6. Click **Save Changes** button

### Step 3: Debug - Check Browser Console

**Open Browser Developer Tools:**
- Press **F12** or **Ctrl+Shift+J** (or **Cmd+Option+J** on Mac)
- Go to **Console** tab
- Look for messages like:
  - `"Attempting to save profile with: {userId: '...', name: 'TEST'}"`
  - `"Update response: {data: [...], updateError: null}"`
  - `"Profile updated successfully!"`

### Step 4: If Still Failing

If you see an error like:
```
"Error: new row violates row-level security policy"
```

Then run this diagnostic query in the SQL Editor:

```sql
-- Check current policies
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Check if RLS is enabled
SELECT * FROM pg_tables WHERE tablename = 'profiles';
```

## Expected Result After Fix

✅ After saving "PG", you should see:
- Green success message: "Profile updated successfully!"
- The page exits edit mode
- Database shows the new name immediately

## If Still Not Working

Please share:
1. Screenshot of browser console showing the error message
2. Your Supabase project URL
3. The exact error message you see in the alert

This will help identify the root cause!
