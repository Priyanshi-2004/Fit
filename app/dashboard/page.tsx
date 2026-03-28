'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader as Loader2, LogOut, CirclePlay as PlayCircle, BookOpen, Award } from 'lucide-react';
import Link from 'next/link';

interface CourseWithProgress {
  id: string;
  title: string;
  description: string;
  plan_type: string;
  moduleCount: number;
  videoCount: number;
  completedVideos: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<CourseWithProgress[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push('/login');
      return;
    }

    setUser(session.user);
    await fetchUserCourses(session.user.id);
    setLoading(false);
  }

  async function fetchUserCourses(userId: string) {
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

          const moduleIds = modules?.map(m => m.id) || [];

          let videoCount = 0;
          if (moduleIds.length > 0) {
            const { count } = await supabase
              .from('videos')
              .select('*', { count: 'exact', head: true })
              .in('module_id', moduleIds);
            videoCount = count || 0;
          }

          const { count: completedCount } = await supabase
            .from('video_progress')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('completed', true);

          return {
            id: course.id,
            title: course.title,
            description: course.description,
            plan_type: course.plan_type,
            moduleCount: modules?.length || 0,
            videoCount: videoCount,
            completedVideos: completedCount || 0,
          };
        })
      );

      setCourses(coursesWithProgress);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-neutral-900">
              FitTransform
            </Link>
            <Button onClick={handleLogout} variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Welcome Back!
          </h1>
          <p className="text-neutral-600">
            Continue your fitness journey
          </p>
        </div>

        {courses.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Courses Yet</h3>
              <p className="text-neutral-600 mb-6">
                You haven't purchased any courses yet. Browse our course catalog to get started.
              </p>
              <Link href="/#pricing">
                <Button>Browse Courses</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const progress = course.videoCount > 0
                ? (course.completedVideos / course.videoCount) * 100
                : 0;

              return (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                        {course.plan_type}
                      </span>
                      {progress === 100 && (
                        <Award className="h-5 w-5 text-amber-500" />
                      )}
                    </div>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Progress</span>
                        <span className="font-semibold text-neutral-900">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-neutral-600">Modules</div>
                        <div className="font-semibold text-neutral-900">{course.moduleCount}</div>
                      </div>
                      <div>
                        <div className="text-neutral-600">Videos</div>
                        <div className="font-semibold text-neutral-900">
                          {course.completedVideos}/{course.videoCount}
                        </div>
                      </div>
                    </div>

                    <Link href={`/course/${course.id}`}>
                      <Button className="w-full">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        {progress > 0 ? 'Continue Learning' : 'Start Course'}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
