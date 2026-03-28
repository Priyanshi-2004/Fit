import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, name, password, courseId } = await request.json();

    const { data: course } = await supabaseAdmin
      .from('courses')
      .select('title')
      .eq('id', courseId)
      .single();

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #171717; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
    .credentials { background: white; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; }
    .button { display: inline-block; background: #171717; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to FitTransform!</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>

      <p>Congratulations on starting your fitness journey! Your purchase of <strong>${course?.title || 'Fitness Course'}</strong> has been confirmed.</p>

      <div class="credentials">
        <h3>Your Login Credentials:</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
      </div>

      <p><strong>Important:</strong> Please change your password after logging in for the first time.</p>

      <a href="${process.env.NEXT_PUBLIC_APP_URL}/login" class="button">Access Your Dashboard</a>

      <p>If you have any questions, feel free to reach out to our support team.</p>

      <p>Best regards,<br>The FitTransform Team</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} FitTransform. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    console.log('=== EMAIL SENT (Mock) ===');
    console.log('To:', email);
    console.log('Subject: Welcome to FitTransform - Your Login Credentials');
    console.log('Content:', emailContent);
    console.log('========================');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
