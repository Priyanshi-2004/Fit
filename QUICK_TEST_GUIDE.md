# Quick Start - Test the App NOW

## Server is Running ✅

Dev server is live on **http://localhost:3001**

## What to Test First

### Test 1: Profile Name Display & Save (2 min)
```
1. Open http://localhost:3001/register
2. Enter:
   - Email: demo@test.com
   - Password: Demo@1234
   - Full Name: John Doe
3. Click Register
4. Click avatar → View Profile
5. Verify name shows "John Doe"
6. Click Edit
7. Change name to "Jane Smith"
8. Click Save Changes
9. ✅ Should show green success message
10. Refresh page - name should still be "Jane Smith"
```

### Test 2: Checkout Redirect (2 min)
```
1. Logout (click avatar → Logout)
2. Scroll down to pricing
3. Click "Get Started" on any plan
4. ✅ Should redirect to /login (not checkout)
5. Login with same credentials
6. ✅ Should auto-redirect to /checkout page
7. Verify course details show
```

### Test 3: Check Browser Console (1 min)
```
1. Press F12 or Ctrl+Shift+J
2. Go to Console tab
3. Look for:
   - "Profile fetch result:" - shows loaded data
   - "Calling API to save profile" - shows save attempt
   - "API Response:" - shows result
4. No error messages = ✅ Working!
```

## If Something Fails

1. **Profile name shows wrong data?**
   - Check console (F12) for "Profile fetch result" 
   - Look at the profile data returned
   - Report the exact data shown

2. **Save button doesn't work?**
   - Check console for "Error saving profile:"
   - Copy the exact error message
   - Report it

3. **Checkout redirect not working?**
   - Check if you're logged out before clicking Get Started
   - Check console for any errors
   - Report what happens instead

## Quick Debugging

### Check Profile Data
```javascript
// Paste in browser console (F12)
localStorage.getItem('pendingCheckoutCourseId')
// Should be null when logged in, or a course ID when not logged in
```

### Check Auth Status
```javascript
// Paste in browser console
const session = await fetch('http://localhost:3001').then(r => r.headers.get('supabase-auth'));
console.log(session);
```

---

## Commands (if you need to restart)

**Stop server:** `Ctrl+C` in terminal

**Start dev server:**
```bash
cd d:\Downloads\Fitness-main\Fitness-main
npm run dev
```

**Server will run on:** `http://localhost:3001`

---

**Ready to test? Go to http://localhost:3001 now!** 🚀
