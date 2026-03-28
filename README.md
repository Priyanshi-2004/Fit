# FitTransform - Fitness Course Selling Platform

A modern, full-stack fitness course selling platform built with Next.js 14, Supabase, and Razorpay.

## Features

### For Users
- Browse fitness courses with beautiful landing page
- Secure payment processing via Razorpay
- Auto-account creation after payment
- Protected course dashboard
- Video streaming with protection (no download, watermarked)
- Progress tracking
- Responsive design

### For Coaches/Admins
- Admin dashboard for course management
- Add/edit courses, modules, and videos
- View user statistics
- Manage testimonials and transformations
- Payment tracking

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, ShadCN UI
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Razorpay
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

1. Node.js 18+ installed
2. A Supabase account
3. A Razorpay account

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd fitness-platform
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Razorpay Configuration (MANDATORY)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Supabase Setup

1. Create a new Supabase project at https://supabase.com

2. The database schema has already been created via migrations. Your database should have these tables:
   - profiles
   - courses
   - modules
   - videos
   - user_courses
   - payments
   - testimonials
   - transformations
   - video_progress

3. Create an admin user:
   - Go to Supabase Dashboard > Authentication > Users
   - Create a new user
   - Go to Table Editor > profiles
   - Find the user and set `is_admin = true`

### Razorpay Setup

1. Sign up at https://razorpay.com
2. Go to Settings > API Keys
3. Generate Test/Live API keys
4. Copy the Key ID and Key Secret to your `.env.local` file

### Running the Application

```bash
npm run dev
```

Visit http://localhost:3000

## Usage Guide

### For Users

1. **Browse Courses**: Visit the homepage to see available courses
2. **Purchase**: Click "Buy Now" on any course
3. **Checkout**: Fill in your details and complete payment via Razorpay
4. **Access**: After successful payment, you'll receive login credentials via email (check console logs in development)
5. **Login**: Use the credentials to access your dashboard
6. **Learn**: Access your purchased courses and track your progress

### For Admins

1. **Login**: Use admin credentials at `/login`
2. **Access Admin Panel**: Navigate to `/admin`
3. **Create Courses**: Add new course packages
4. **Add Modules**: Organize content into modules
5. **Upload Videos**: Add video lessons with URLs
6. **Monitor**: View user statistics and payment data

## Project Structure

```
fitness-platform/
├── app/
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   │   ├── payment/        # Payment endpoints
│   │   └── email/          # Email notifications
│   ├── checkout/           # Checkout page
│   ├── course/             # Course viewing page
│   ├── dashboard/          # User dashboard
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   └── payment-success/    # Success page
├── components/
│   ├── landing/            # Landing page components
│   └── ui/                 # ShadCN UI components
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Key Features Explained

### Payment Flow

1. User selects a course and clicks "Buy Now"
2. System creates a Razorpay order
3. Razorpay payment modal opens
4. After successful payment, signature is verified
5. User account is created (if new)
6. Course access is granted
7. Credentials are sent via email
8. User is redirected to success page

### Video Protection

- Right-click disabled on video player
- Download option hidden (`controlsList="nodownload"`)
- Watermark overlay on video
- Videos served via authenticated routes
- Only purchased course videos are accessible

### Automation Features

After successful payment:
- Auto user account creation
- Password generation
- Email notification with credentials
- WhatsApp mock notification (console log)
- Course access granted
- Payment record saved

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| NEXT_PUBLIC_SUPABASE_URL | Supabase project URL | Yes |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anonymous key | Yes |
| SUPABASE_SERVICE_ROLE_KEY | Supabase service role key | Yes |
| NEXT_PUBLIC_RAZORPAY_KEY_ID | Razorpay key ID | Yes |
| RAZORPAY_KEY_SECRET | Razorpay key secret | Yes |
| NEXT_PUBLIC_APP_URL | Application URL | Yes |

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Setup

Make sure to add all environment variables in Vercel's project settings.

## Security Features

- Row Level Security (RLS) on all database tables
- JWT-based authentication
- Payment signature verification
- Protected API routes
- Secure password hashing
- HTTPS enforcement in production

## Support

For issues or questions:
- Email: support@fittransform.com
- Create an issue in the repository

## License

MIT License - feel free to use this project for your own fitness coaching business!

## Acknowledgments

- Built with Next.js 14
- UI components from ShadCN UI
- Database and Auth by Supabase
- Payment processing by Razorpay
- Images from Pexels

---

Built with ❤️ for fitness coaches who want to share their knowledge and transform lives.
