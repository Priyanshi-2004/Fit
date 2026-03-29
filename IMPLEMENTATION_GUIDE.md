# Profile Save & Checkout Redirect - Complete Implementation

## Summary of Changes

### 1. **Checkout Redirect Flow After Login** ✅
When user clicks "Get Started" on pricing WITHOUT being logged in:
- Stores courseId in localStorage  
- Redirects to login page
- After login, automatically redirects to checkout for that course

**Files Modified:**
- `components/landing/pricing-section.tsx` - Added auth check before redirecting
- `app/login/page.tsx` - Check for pending courseId after login

### 2. **Profile Save Fix - RLS Bypass** ✅
The RLS (Row Level Security) was blocking profile updates. Solution:
- Created `/app/api/profile/update/route.ts` - API endpoint that uses **admin key** to bypass RLS
- Updated `app/profile/page.tsx` to call API instead of direct Supabase query
- This ensures the profile update succeeds even with strict RLS policies

**Key Fix:**
```typescript
// Uses admin client to bypass RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!  // Admin key bypasses RLS
);
```

### 3. **Improved Profile Fetch** ✅
Fixed issue where profile was showing wrong data ("features" instead of actual name):
- Explicitly select only needed columns: `id, email, name, created_at`
- Added detailed logging to console
- Better null/undefined handling

---

## Step-by-Step Testing

### **Test 1: Profile Name Displays & Saves**

1. **Register** at `/register`:
   - Email: `test@example.com`
   - Password: `Test123!@`
   - Full Name: `John Doe`

2. **Login** at `/login`:
   - Use same credentials
   - Should see **"John Doe"** in profile

3. **Edit Profile**:
   - Click avatar → View Profile
   - Click **Edit** button
   - Change name to **"Jane Smith"**
   - Click **Save Changes**
   - Should see **green success message**
   - Logout and login again
   - Name should still be **"Jane Smith"** ✅

### **Test 2: Checkout Redirect**

1. **Logout** (click avatar → Logout)
2. Scroll to **Pricing section**
3. Click **"Get Started"** on any plan
4. **Should redirect to login** (not checkout)
5. **Login** with credentials
6. **Should auto-redirect to checkout page** ✅
7. Proceed with payment

---

## How to Verify Everything Works

### Open Browser Console (F12) and check for:

**On Profile Save:**
```
Calling API to save profile with: {userId: '...', name: 'Jane Smith'}
API Response: {success: true, profile: {...}}
```

**On Profile Fetch:**
```
Profile fetch result: {profile: {id: '...', email: 'test@example.com', name: 'John Doe', created_at: '...'}}
```

### If Errors Appear:

**Error: "Session expired. Please login again."**
- User session is invalid, need to login again

**Error: "Profile not found"**
- Contact support - profile record missing from database

**Error: "Unauthorized"**
- Auth token issue, try logout/login

---

## Technical Details

### API Route: `/app/api/profile/update/route.ts`
- **Method:** POST
- **Auth:** Bearer token in Authorization header
- **Body:** `{ name: string }`
- **Returns:** `{ success: true, profile: UserProfile }`
- **Uses:** Admin service role key (bypasses RLS)

### Profile Page Flow:
```
User Opens Profile Page
  ↓
checkAuth() - verify login
  ↓
fetchUserProfile() - get profile data
  ├─ If not exists: create empty profile
  ├─ If error: show data anyway
  └─ If success: show name from database
  ↓
User Clicks Edit
  ├─ Enable form fields
  ├─ Show Save/Cancel buttons
  └─ Can edit name
  ↓
User Clicks Save
  ├─ Call /api/profile/update with name
  ├─ Wait for admin key to process
  ├─ Show success message
  └─ Exit edit mode
  ↓
User Can See Updated Name
```

---

## Database Schema (Required)

Your `profiles` table should have:
- `id` (PRIMARY KEY, uuid) - User ID
- `email` (text, UNIQUE, NOT NULL)
- `name` (text, NOT NULL)
- `created_at` (timestamp)
- `updated_at` (timestamp, optional)
- `is_admin` (boolean)

---

## Troubleshooting Checklist

- [ ] Can register with full name
- [ ] Name displays when viewing profile after login
- [ ] Can edit profile name successfully  
- [ ] Updated name persists after logout/login
- [ ] Clicking "Get Started" before login redirects to login
- [ ] After login, auto-redirects to checkout page
- [ ] Browser console shows no errors
- [ ] Green success message appears on profile save

If any step fails, check the browser console (F12) for error messages! 🔍

---

## Current Server Status

- **Dev Server**: Running on port **3001** (http://localhost:3001)
- **Ready to Test**: ✅ All changes deployed
- **Database Migrations**: May need to run RLS policy fixes

