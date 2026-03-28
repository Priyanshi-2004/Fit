import { supabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json();

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sign up user in auth
    const { data: authData, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (signUpError || !authData.user) {
      console.error('Auth signup error:', signUpError);
      return NextResponse.json(
        { error: signUpError?.message || 'Registration failed' },
        { status: 400 }
      );
    }

    // Create profile record with RLS bypassed (using service role)
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          email,
          name: fullName,
          is_admin: false,
        },
      ])
      .select();

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Delete the auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json(
        { error: `Failed to create user profile: ${profileError.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Registration successful',
        user: authData.user,
        profile: profile,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
