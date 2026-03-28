# Quick Start Guide

Get your fitness platform running in 5 minutes!

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Supabase account created
- [ ] Razorpay account created

## 5-Minute Setup

### Step 1: Install Dependencies (1 min)

```bash
npm install
```

### Step 2: Configure Supabase (2 min)

1. Go to https://supabase.com/dashboard
2. Create new project
3. Copy these values to `.env.local`:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Configure Razorpay (1 min)

1. Go to https://dashboard.razorpay.com
2. Settings > API Keys > Generate Test Key
3. Copy to `.env.local`:
   - Key ID → `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - Key Secret → `RAZORPAY_KEY_SECRET`

### Step 4: Create .env.local (1 min)

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 5: Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Create Admin User

### Via Supabase Dashboard:

1. Go to Authentication > Users > Add User
2. Enter email and password
3. Go to Table Editor > profiles
4. Find your user
5. Set `is_admin = true`
6. Save

### Login as Admin:

- Visit: http://localhost:3000/login
- Enter your credentials
- You'll be redirected to `/admin`

## Test Payment Flow

### Use Test Cards:

**Razorpay Test Card:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date
- OTP: `1234`

### Steps:

1. Go to homepage
2. Click "Buy Now" on any course
3. Fill form with any details
4. Click "Pay ₹XXXX"
5. Razorpay modal opens
6. Enter test card details
7. Complete payment
8. Check browser console for login credentials
9. Login with those credentials
10. Access your course!

## What's Pre-Loaded

Your database already has:

- ✅ 3 sample courses (Basic, Standard, Premium)
- ✅ 5 client testimonials
- ✅ 3 transformation stories

You can add more via the admin panel!

## Next Steps

1. **Add Modules**: Go to Admin > Modules
2. **Add Videos**: Go to Admin > Videos
3. **Customize Content**: Edit courses, prices, features
4. **Upload Real Videos**: Replace sample URLs
5. **Configure Email**: For production credentials

## Common Tasks

### Add a New Course

1. Login as admin
2. Go to `/admin`
3. Click "Courses" tab
4. Fill in course details
5. Add features (one per line)
6. Click "Create Course"

### Add Video Lessons

1. Select a course
2. Go to "Modules" tab
3. Create a module
4. Go to "Videos" tab
5. Select the module
6. Enter video URL and details
7. Click "Add Video"

### View Payments

1. Go to Supabase Dashboard
2. Table Editor > payments
3. See all transactions

## Troubleshooting

### "Course Not Found"
- Make sure courses exist in database
- Check Supabase connection

### "Payment Failed"
- Verify Razorpay credentials
- Use test mode credentials
- Check browser console

### "Access Denied"
- Ensure user is logged in
- Verify course purchase
- Check RLS policies

## Documentation

- Full Setup: See `SETUP.md`
- Features: See `FEATURES.md`
- General Info: See `README.md`

## Production Checklist

Before going live:

- [ ] Switch Razorpay to live keys
- [ ] Configure real email service
- [ ] Upload videos to CDN
- [ ] Set production URL in `.env`
- [ ] Enable HTTPS
- [ ] Test all payment flows
- [ ] Create admin user in production
- [ ] Add privacy policy & terms

## Support

Need help?
- Check documentation
- Review error messages
- Check browser console
- Verify environment variables

---

**You're ready to go!** Start by visiting http://localhost:3000 and exploring your new fitness platform.
