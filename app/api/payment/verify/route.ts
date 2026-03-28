import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, paymentId, signature, courseId, userId, customerEmail, customerName } = body;

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: 'Missing payment details' },
        { status: 400 }
      );
    }

    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!razorpayKeySecret) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const generatedSignature = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (generatedSignature !== signature) {
      await supabaseAdmin
        .from('payments')
        .update({ status: 'failed' })
        .eq('razorpay_order_id', orderId);

      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    const { error: paymentUpdateError } = await supabaseAdmin
      .from('payments')
      .update({
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
        status: 'completed',
      })
      .eq('razorpay_order_id', orderId);

    if (paymentUpdateError) {
      console.error('Payment update error:', paymentUpdateError);
    }

    const { data: existingCourse } = await supabaseAdmin
      .from('user_courses')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (!existingCourse) {
      const { error: courseError } = await supabaseAdmin
        .from('user_courses')
        .insert({
          user_id: userId,
          course_id: courseId,
          payment_id: paymentId,
        });

      if (courseError) {
        console.error('Course assignment error:', courseError);
      }
    }

    const tempPassword = crypto.randomBytes(8).toString('hex');

    await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: tempPassword,
    });

    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/send-credentials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: customerEmail,
          name: customerName,
          password: tempPassword,
          courseId: courseId,
        }),
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    console.log(`[WhatsApp Mock] Sending credentials to ${customerEmail}`);
    console.log(`[WhatsApp Mock] Login: ${customerEmail} | Password: ${tempPassword}`);

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
    });
  } catch (error: any) {
    console.error('Verify payment error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
