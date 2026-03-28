import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, amount, customerName, customerEmail, customerPhone } = body;

    if (!courseId || !amount || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let userId = null;
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      userId = session.user.id;

      const { data: existingPurchase } = await supabaseAdmin
        .from('user_courses')
        .select('id')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .single();

      if (existingPurchase) {
        return NextResponse.json(
          { error: 'You have already purchased this course' },
          { status: 400 }
        );
      }
    } else {
      const { data: { user }, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
        email: customerEmail,
        password: crypto.randomBytes(16).toString('hex'),
        email_confirm: true,
        user_metadata: {
          full_name: customerName,
        },
      });

      if (signUpError) {
        const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
        const found = existingUser.users.find(u => u.email === customerEmail);
        if (found) {
          userId = found.id;
        } else {
          throw signUpError;
        }
      } else if (user) {
        userId = user.id;
      }
    }

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeyId || !razorpayKeySecret) {
      return NextResponse.json(
        { error: 'Razorpay configuration missing' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString('base64')}`,
      },
      body: JSON.stringify(options),
    });

    const order = await response.json();

    if (!response.ok) {
      throw new Error(order.error?.description || 'Failed to create Razorpay order');
    }

    const { error: paymentError } = await supabaseAdmin
      .from('payments')
      .insert({
        user_id: userId,
        course_id: courseId,
        razorpay_order_id: order.id,
        amount: amount,
        currency: 'INR',
        status: 'pending',
      });

    if (paymentError) {
      console.error('Payment record error:', paymentError);
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      userId: userId,
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
