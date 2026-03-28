# Complete Setup Guide

## Step-by-Step Setup Instructions

### 1. Supabase Database Setup

#### Create Supabase Project
1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Enter project details:
   - Name: fitness-platform
   - Database Password: (generate strong password)
   - Region: (choose closest to your users)
4. Wait for project to be created

#### Get Supabase Credentials
1. Go to Project Settings > API
2. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`

#### Create Admin User
1. Go to Authentication > Users
2. Click "Add User"
3. Enter email and password
4. Click "Create User"
5. Go to Table Editor > profiles
6. Find your user row
7. Edit and set `is_admin = true`
8. Save

### 2. Razorpay Setup

#### Create Razorpay Account
1. Go to https://razorpay.com
2. Sign up for account
3. Complete KYC (for live keys)

#### Get API Keys
1. Go to Settings > API Keys
2. For Testing:
   - Click "Generate Test Key"
   - Copy Key ID → `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - Copy Key Secret → `RAZORPAY_KEY_SECRET`

3. For Production:
   - Complete KYC verification
   - Click "Generate Live Key"
   - Copy credentials

#### Test Cards (for development)
- Card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date
- OTP: 1234

### 3. Environment Variables Setup

Create `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Install and Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit http://localhost:3000

### 5. Add Sample Data

The database already has sample courses and testimonials. To add more:

#### Add More Courses
1. Login with admin credentials
2. Go to http://localhost:3000/admin
3. Navigate to "Courses" tab
4. Fill in course details
5. Click "Create Course"

#### Add Modules
1. Select a course from dropdown
2. Navigate to "Modules" tab
3. Enter module details
4. Click "Create Module"

#### Add Videos
1. Select course and module
2. Navigate to "Videos" tab
3. Enter video details and URL
4. Click "Add Video"

Note: Use publicly accessible video URLs (e.g., from your own CDN, Vimeo, YouTube embed URLs)

### 6. Test Payment Flow

1. Go to homepage
2. Click "Buy Now" on any course
3. Fill in checkout form
4. Click "Pay" button
5. Razorpay modal will open
6. Use test card details (see above)
7. Complete payment
8. Check console for login credentials
9. Login with received credentials
10. Access dashboard and courses

### 7. Production Deployment (Vercel)

#### Prepare for Deployment
1. Push code to GitHub
2. Ensure `.env.local` is in `.gitignore`
3. Switch Razorpay to live keys (after KYC)

#### Deploy to Vercel
1. Go to https://vercel.com
2. Import your GitHub repository
3. Add environment variables:
   - All variables from `.env.local`
   - Update `NEXT_PUBLIC_APP_URL` to your domain
4. Click "Deploy"

#### Post-Deployment
1. Update Razorpay webhook URLs (if using)
2. Test payment flow with live keys
3. Create admin user in production database

### 8. Email Setup (Optional - for production)

The platform currently logs credentials to console. For production email:

1. Choose email service (Resend, SendGrid, etc.)
2. Get API credentials
3. Update `/app/api/email/send-credentials/route.ts`
4. Implement actual email sending

### 9. Video Hosting

For production, upload videos to:
- Vimeo (recommended for private videos)
- AWS S3 + CloudFront
- Bunny.net CDN
- Your own CDN

Then use those URLs when adding videos in admin panel.

### 10. Security Checklist

- [ ] Enable RLS on all Supabase tables (already done)
- [ ] Use environment variables (never commit secrets)
- [ ] Enable HTTPS in production
- [ ] Implement rate limiting for API routes
- [ ] Set up Supabase backup policies
- [ ] Configure CORS properly
- [ ] Add CSP headers
- [ ] Enable Razorpay webhook signature verification

## Troubleshooting

### Payment not working
- Check Razorpay credentials
- Ensure you're using test mode credentials for testing
- Check browser console for errors
- Verify API routes are accessible

### Database connection failed
- Verify Supabase credentials
- Check if project is paused (free tier)
- Ensure RLS policies are correct
- Check network connectivity

### Videos not loading
- Verify video URLs are publicly accessible
- Check CORS settings on video host
- Ensure URLs are HTTPS in production

### Admin access denied
- Verify `is_admin = true` in profiles table
- Check authentication state
- Clear browser cache and cookies

## Support

Need help? Check:
1. README.md for general info
2. Supabase documentation: https://supabase.com/docs
3. Razorpay documentation: https://razorpay.com/docs
4. Next.js documentation: https://nextjs.org/docs

---

Good luck with your fitness coaching platform!
