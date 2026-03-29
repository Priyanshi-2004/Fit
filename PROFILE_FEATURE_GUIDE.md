# User Profile Feature - Setup & Usage Guide

## 🎯 Overview

A complete user profile system has been added to your FitTransform app with:
- ✅ User profile dropdown in header (GitHub-style)
- ✅ Full profile management page
- ✅ Course tracking and progress
- ✅ Edit user details (name, phone, email)
- ✅ Protected pages with authentication

---

## 📁 New Files Created

### 1. **Profile Page** 
- **Location**: `app/profile/page.tsx`
- **Route**: `/profile`
- **Features**:
  - View and edit user information
  - See all enrolled courses with progress
  - Protected route (requires login)

### 2. **Profile Dropdown Component**
- **Location**: `components/user-profile-dropdown.tsx`
- **Features**:
  - Shows in top-right corner after login
  - Avatar with user initials
  - Quick links: Profile, Dashboard, Logout
  - Responsive dropdown menu

### 3. **Updated Navbar**
- **Location**: `components/landing/navbar.tsx`
- **Changes**:
  - Integrated profile dropdown when logged in
  - Fixed Supabase client to use singleton instance
  - Added dashboard link
  - Mobile-friendly profile menu

### 4. **Database Migration**
- **Location**: `supabase/migrations/20260329_create_profiles_table.sql`
- **Creates**: `profiles` table with RLS policies

---

## 🔧 Setup Instructions

### Step 1: Run Database Migration

After login to Supabase:
1. Go to SQL Editor
2. Create new query
3. Copy & paste the entire migration file content
4. Execute

**Or use Supabase CLI:**
```bash
supabase migration up
```

### Step 2: Verify Profiles Table

Check that `profiles` table exists with columns:
- `id` (uuid, primary key)
- `full_name` (text)
- `phone` (text)
- `avatar_url` (text, optional)
- `bio` (text, optional)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Step 3: Test the Feature

1. **On Landing Page**: After you login, you'll see:
   - Dashboard button
   - Avatar icon in top-right corner

2. **Click Avatar** to see dropdown menu:
   - View Profile
   - Dashboard
   - Logout

3. **Go to Profile Page** (`/profile`):
   - Edit your name and phone
   - Click "Save Changes"
   - Switch to "My Courses" tab to see enrolled courses

---

## 🎨 UI Components Used

- `Avatar` - User profile picture placeholder
- `Button` - Actions
- `Card` - Content containers
- `Input` - Form fields
- `Label` - Form labels
- `Alert` - Success/error messages
- `Tabs` - Profile sections
- `DropdownMenu` - Profile menu
- `Progress` - Course progress bars

---

## 🔐 Security Features

### Row Level Security (RLS)
- Users can only view their own profile
- Users can only edit their own profile
- Policies are enforced at database level

### Authentication
- Protected route - redirects to login if not authenticated
- Checks auth state on component mount
- Monitors auth changes in real-time

---

## 📋 Profile Form Fields

### Account Information Tab
| Field | Type | Editable | Required |
|-------|------|----------|----------|
| Email | Text | No | Yes |
| Full Name | Text | Yes | No |
| Phone | Tel | Yes | No |
| Created Date | Date | No | N/A |

### My Courses Tab
Displays:
- Course title & description
- Plan type (Basic/Standard/Premium)
- Progress bar with completion %
- Module count
- Video count (completed/total)
- "Continue Learning" button

---

## 🚀 Usage Flow

### For New Users
1. User signs up on register page
2. Redirected to login
3. After login, navbar shows dashboard + profile avatar

### For Existing Users
1. Click avatar in top-right corner
2. Select "View Profile" from dropdown
3. Edit information as needed
4. Click "Save Changes"
5. Switch to "My Courses" to view progress

### For Logged Out Users
- Profile dropdown is hidden
- Login/Get Started buttons shown instead

---

## 🐛 Troubleshooting

### Profile Page Shows Error
**Issue**: "Failed to load profile"
**Solution**: 
- Run the migration file in Supabase SQL Editor
- Check that profiles table exists
- Verify RLS policies are created

### Dropdown Not Showing
**Issue**: Profile avatar doesn't appear after login
**Solution**:
- Clear browser cache
- Check that Supabase client is initialized
- Verify auth session is active

### Changes Not Saving
**Issue**: "Save Changes" doesn't persist data
**Solution**:
- Check Supabase RLS policies
- Verify user has INSERT/UPDATE permissions
- Check browser console for API errors

---

## 💾 Data Structure

### Profiles Table
```sql
{
  "id": "uuid",                          -- User ID from auth
  "full_name": "string",                 -- User's full name
  "phone": "string",                     -- Contact number
  "avatar_url": "string",                -- Cloud storage URL
  "bio": "string",                       -- User bio/description
  "created_at": "timestamp",             -- Account creation date
  "updated_at": "timestamp"              -- Last updated date
}
```

---

## 🔄 Related Features

This profile system integrates with:
- **Authentication**: Supabase Auth
- **Dashboard**: Shows enrolled courses
- **Course Page**: Users can continue learning
- **Navbar**: Shows user menu

---

## 📝 Next Steps (Optional Enhancements)

1. Add profile picture upload
2. Add bio/description field
3. Add preferences (notifications, theme)
4. Add password change option
5. Add two-factor authentication
6. Add activity history

---

## ✅ Testing Checklist

- [ ] Navigate to `/profile` after login
- [ ] Click profile avatar in navbar
- [ ] Edit full name and save
- [ ] Edit phone number and save
- [ ] View courses tab
- [ ] Click "Continue Learning" for a course
- [ ] Test on mobile (navbar dropdown)
- [ ] Test logout from profile dropdown
- [ ] Test redirect to login when not authenticated
