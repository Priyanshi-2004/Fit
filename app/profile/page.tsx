'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Loader as Loader2, LogOut, ArrowLeft, Mail, User, BookOpen, CheckCircle, Edit2, Check, X } from 'lucide-react';
import Link from 'next/link';

interface UserProfile {
    id: string;
    email: string;
    name: string;
    created_at: string;
}

interface CourseRecord {
    id: string;
    title: string;
    description: string;
    plan_type: string;
    moduleCount: number;
    completedVideos: number;
    totalVideos: number;
}

export default function ProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [courses, setCourses] = useState<CourseRecord[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form state
    const [name, setName] = useState('');

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            router.push('/login');
            return;
        }

        await fetchUserProfile(session.user.id);
        await fetchUserCourses(session.user.id);
        setLoading(false);
    }

    async function fetchUserProfile(userId: string) {
        try {
            const { data: { user: authUser } } = await supabase.auth.getUser();

            // Explicitly select only the columns we need
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('id, email, name, created_at')
                .eq('id', userId)
                .single();

            console.log('Profile fetch result:', { profile, error });

            // If profile doesn't exist, create one
            if (error && error.code === 'PGRST116') {
                console.log('Profile does not exist, creating new one');
                const { error: insertError } = await supabase
                    .from('profiles')
                    .insert([{
                        id: userId,
                        email: authUser?.email || '',
                        name: '',
                        created_at: new Date().toISOString(),
                    }]);

                if (insertError) {
                    console.error('Insert error:', insertError);
                }

                const userData: UserProfile = {
                    id: userId,
                    email: authUser?.email || '',
                    name: '',
                    created_at: new Date().toISOString(),
                };

                setUser(userData);
                setName('');
            } else if (error) {
                console.error('Fetch error:', error);
                // Profile table might not exist, still allow user to proceed
                const userData: UserProfile = {
                    id: userId,
                    email: authUser?.email || '',
                    name: '',
                    created_at: new Date().toISOString(),
                };
                setUser(userData);
                setName('');
            } else if (profile) {
                console.log('Profile found:', profile);
                const userData: UserProfile = {
                    id: profile.id,
                    email: profile.email || authUser?.email || '',
                    name: profile.name || '',
                    created_at: profile.created_at || new Date().toISOString(),
                };

                setUser(userData);
                setName(userData.name);
            }
        } catch (err: any) {
            console.error('Error fetching profile:', err);
            // Don't show error, just load with empty data
            const { data: { user: authUser } } = await supabase.auth.getUser();
            const userData: UserProfile = {
                id: userId,
                email: authUser?.email || '',
                name: '',
                created_at: new Date().toISOString(),
            };
            setUser(userData);
            setName('');
        }
    }

    async function fetchUserCourses(userId: string) {
        try {
            const { data: userCourses } = await supabase
                .from('user_courses')
                .select(`
          course_id,
          courses (
            id,
            title,
            description,
            plan_type
          )
        `)
                .eq('user_id', userId);

            if (userCourses) {
                const coursesWithProgress = await Promise.all(
                    userCourses.map(async (uc: any) => {
                        const course = uc.courses;

                        const { data: modules } = await supabase
                            .from('modules')
                            .select('id')
                            .eq('course_id', course.id);

                        const moduleIds = modules?.map((m: any) => m.id) || [];

                        let totalVideos = 0;
                        if (moduleIds.length > 0) {
                            const { count } = await supabase
                                .from('videos')
                                .select('*', { count: 'exact', head: true })
                                .in('module_id', moduleIds);
                            totalVideos = count || 0;
                        }

                        const { data: progress } = await supabase
                            .from('video_progress')
                            .select('*')
                            .eq('user_id', userId)
                            .eq('completed', true)
                            .in('video_id', (await (async () => {
                                if (moduleIds.length === 0) return [];
                                const { data: allVideos } = await supabase
                                    .from('videos')
                                    .select('id')
                                    .in('module_id', moduleIds);
                                return allVideos?.map((v: any) => v.id) || [];
                            })()));

                        return {
                            id: course.id,
                            title: course.title,
                            description: course.description,
                            plan_type: course.plan_type,
                            moduleCount: modules?.length || 0,
                            completedVideos: progress?.length || 0,
                            totalVideos: totalVideos,
                        };
                    })
                );

                setCourses(coursesWithProgress);
            }
        } catch (err) {
            console.error('Error fetching courses:', err);
        }
    }

    async function handleSaveProfile() {
        if (!user) return;

        setSaving(true);
        setError('');
        setSuccess('');

        try {
            // Verify session is still active
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                throw new Error('Session expired. Please login again.');
            }

            console.log('Calling API to save profile with:', { userId: user.id, name });

            // Call our API route instead of direct Supabase (avoids RLS)
            const response = await fetch('/api/profile/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({ name }),
            });

            const result = await response.json();
            console.log('API Response:', result);

            if (!response.ok) {
                throw new Error(result.error || 'Failed to update profile');
            }

            setUser({ ...user, name });
            setSuccess('Profile updated successfully!');
            setIsEditMode(false);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            console.error('Error saving profile:', err);
            const errorMsg = err.message || 'Failed to save profile.';
            setError(`Error: ${errorMsg}`);
        } finally {
            setSaving(false);
        }
    }

    function handleCancel() {
        setName(user?.name || '');
        setIsEditMode(false);
        setError('');
    }

    async function handleLogout() {
        await supabase.auth.signOut();
        router.push('/');
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <Loader2 className="h-8 w-8 animate-spin text-neutral-900" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <div className="bg-white border-b border-neutral-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Home
                            </Button>
                        </Link>
                        <Button variant="destructive" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Profile</h1>
                        <p className="text-neutral-600">Manage your account information and view your courses</p>
                    </div>

                    {error && (
                        <Alert className="mb-6 border-red-200 bg-red-50">
                            <AlertDescription className="text-red-800">{error}</AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert className="mb-6 border-green-200 bg-green-50">
                            <AlertDescription className="text-green-800">{success}</AlertDescription>
                        </Alert>
                    )}

                    <Tabs defaultValue="account" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="account">Account Information</TabsTrigger>
                            <TabsTrigger value="courses">My Courses</TabsTrigger>
                        </TabsList>

                        {/* Account Information Tab */}
                        <TabsContent value="account" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Personal Information</CardTitle>
                                            <CardDescription>
                                                {isEditMode ? 'Edit your profile details' : 'Your profile details'}
                                            </CardDescription>
                                        </div>
                                        {!isEditMode && (
                                            <Button
                                                onClick={() => setIsEditMode(true)}
                                                variant="outline"
                                            >
                                                <Edit2 className="h-4 w-4 mr-2" />
                                                Edit
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Email Field - Read Only */}
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            Email Address
                                        </Label>
                                        <Input
                                            type="email"
                                            value={user?.email || ''}
                                            disabled
                                            className="bg-neutral-100 cursor-not-allowed"
                                        />
                                        <p className="text-xs text-neutral-500">
                                            Email cannot be changed. Contact support if you need to update it.
                                        </p>
                                    </div>

                                    {/* Full Name Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            Full Name
                                        </Label>
                                        <Input
                                            id="name"
                                            placeholder="Enter your full name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            disabled={!isEditMode}
                                            className={isEditMode ? '' : 'bg-neutral-100 cursor-not-allowed'}
                                        />
                                    </div>

                                    {/* Account Creation Date */}
                                    <div className="space-y-2">
                                        <Label className="text-neutral-600">Account Created</Label>
                                        <p className="text-neutral-900 font-medium">
                                            {user?.created_at
                                                ? new Date(user.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })
                                                : 'N/A'}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    {isEditMode && (
                                        <div className="pt-4 border-t border-neutral-200 flex gap-3">
                                            <Button
                                                onClick={handleSaveProfile}
                                                disabled={saving}
                                                className="flex-1"
                                            >
                                                {saving ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Check className="h-4 w-4 mr-2" />
                                                        Save Changes
                                                    </>
                                                )}
                                            </Button>
                                            <Button
                                                onClick={handleCancel}
                                                variant="outline"
                                                disabled={saving}
                                                className="flex-1"
                                            >
                                                <X className="h-4 w-4 mr-2" />
                                                Cancel
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* My Courses Tab */}
                        <TabsContent value="courses" className="space-y-6">
                            {courses.length === 0 ? (
                                <Card>
                                    <CardContent className="text-center py-12">
                                        <BookOpen className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                            No Courses Yet
                                        </h3>
                                        <p className="text-neutral-600 mb-6">
                                            You haven't enrolled in any courses yet.
                                        </p>
                                        <Link href="/#pricing">
                                            <Button>Browse Courses</Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2">
                                    {courses.map((course) => (
                                        <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                                                        <span className="inline-block mt-2 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded">
                                                            {course.plan_type}
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <p className="text-sm text-neutral-600 line-clamp-2">
                                                    {course.description}
                                                </p>

                                                {/* Progress Bar */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-neutral-600">Progress</span>
                                                        <span className="font-semibold text-neutral-900">
                                                            {course.completedVideos} / {course.totalVideos}
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-neutral-200 rounded-full h-2">
                                                        <div
                                                            className="bg-emerald-500 h-2 rounded-full transition-all"
                                                            style={{
                                                                width: `${course.totalVideos > 0
                                                                    ? (course.completedVideos / course.totalVideos) * 100
                                                                    : 0
                                                                    }%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Course Info */}
                                                <div className="text-sm text-neutral-600">
                                                    <p>{course.moduleCount} modules</p>
                                                </div>

                                                {/* Action Button */}
                                                <Link href={`/course/${course.id}`}>
                                                    <Button variant="outline" className="w-full">
                                                        Continue Learning
                                                    </Button>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
