import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { name } = await request.json();

        // Create a Supabase client with the anon key (will use Auth header)
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json(
                { error: 'Missing authorization header' },
                { status: 401 }
            );
        }

        // Create admin client to bypass RLS
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // Get user from auth header
        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);

        if (userError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Update profile using admin client (bypasses RLS)
        const { data, error } = await supabaseAdmin
            .from('profiles')
            .update({
                name: name,
            })
            .eq('id', user.id)
            .select();

        if (error) {
            console.error('Profile update error:', error);
            return NextResponse.json(
                { error: error.message || 'Failed to update profile' },
                { status: 400 }
            );
        }

        if (!data || data.length === 0) {
            console.error('No rows updated');
            return NextResponse.json(
                { error: 'Profile not found. Please contact support.' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            profile: data[0],
        });
    } catch (error: any) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
