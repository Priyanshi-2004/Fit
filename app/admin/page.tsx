'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader as Loader2, LogOut, Plus, Trash2, Users, BookOpen, CreditCard, Video } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ users: 0, courses: 0, payments: 0 });

  const [courseTitle, setCourseTitle] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [coursePlan, setCoursePlan] = useState('Basic');
  const [coursePrice, setCoursePrice] = useState('');
  const [courseFeatures, setCourseFeatures] = useState('');

  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDesc, setModuleDesc] = useState('');

  const [modules, setModules] = useState<any[]>([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  async function checkAdminAccess() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push('/login');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();

    if (!profile?.is_admin) {
      router.push('/dashboard');
      return;
    }

    await fetchStats();
    await fetchCourses();
    setLoading(false);
  }

  async function fetchStats() {
    const [
      { count: usersCount },
      { count: coursesCount },
      { count: paymentsCount }
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('courses').select('*', { count: 'exact', head: true }),
      supabase.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
    ]);

    setStats({
      users: usersCount || 0,
      courses: coursesCount || 0,
      payments: paymentsCount || 0,
    });
  }

  async function fetchCourses() {
    const { data } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setCourses(data);
  }

  async function fetchModules(courseId: string) {
    const { data } = await supabase
      .from('modules')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index', { ascending: true });

    if (data) setModules(data);
  }

  async function createCourse() {
    if (!courseTitle || !coursePrice) {
      setMessage({ type: 'error', text: 'Please fill all required fields' });
      return;
    }

    const features = courseFeatures.split('\n').filter(f => f.trim());

    const { error } = await supabase.from('courses').insert({
      title: courseTitle,
      description: courseDesc,
      plan_type: coursePlan,
      price: parseInt(coursePrice),
      features: features,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Course created successfully!' });
      setCourseTitle('');
      setCourseDesc('');
      setCoursePrice('');
      setCourseFeatures('');
      await fetchCourses();
      await fetchStats();
    }
  }

  async function createModule() {
    if (!selectedCourse || !moduleTitle) {
      setMessage({ type: 'error', text: 'Please select a course and enter module title' });
      return;
    }

    const { error } = await supabase.from('modules').insert({
      course_id: selectedCourse,
      title: moduleTitle,
      description: moduleDesc,
      order_index: modules.length,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Module created successfully!' });
      setModuleTitle('');
      setModuleDesc('');
      await fetchModules(selectedCourse);
    }
  }

  async function createVideo() {
    if (!selectedModule || !videoTitle || !videoUrl) {
      setMessage({ type: 'error', text: 'Please fill all required fields' });
      return;
    }

    const { error } = await supabase.from('videos').insert({
      module_id: selectedModule,
      title: videoTitle,
      description: videoDesc,
      video_url: videoUrl,
      order_index: 0,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Video added successfully!' });
      setVideoTitle('');
      setVideoDesc('');
      setVideoUrl('');
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
            <div className="flex items-center gap-2">
              <Link href="/" className="text-2xl font-bold text-neutral-900">
                FitTransform
              </Link>
              <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded font-semibold">
                ADMIN
              </span>
            </div>
            <Button onClick={handleLogout} variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">Admin Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-neutral-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-neutral-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.courses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-neutral-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.payments}</div>
            </CardContent>
          </Card>
        </div>

        {message.text && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className="mb-6">
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Create New Course</CardTitle>
                <CardDescription>Add a new course package to your platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="courseTitle">Course Title *</Label>
                  <Input
                    id="courseTitle"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="Premium Fitness Plan"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseDesc">Description *</Label>
                  <Textarea
                    id="courseDesc"
                    value={courseDesc}
                    onChange={(e) => setCourseDesc(e.target.value)}
                    placeholder="Comprehensive fitness program..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="coursePlan">Plan Type *</Label>
                    <Select value={coursePlan} onValueChange={setCoursePlan}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coursePrice">Price (₹) *</Label>
                    <Input
                      id="coursePrice"
                      type="number"
                      value={coursePrice}
                      onChange={(e) => setCoursePrice(e.target.value)}
                      placeholder="9999"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseFeatures">Features (one per line) *</Label>
                  <Textarea
                    id="courseFeatures"
                    value={courseFeatures}
                    onChange={(e) => setCourseFeatures(e.target.value)}
                    placeholder="Full course access&#10;Diet plan included&#10;1-on-1 consultation"
                    rows={5}
                  />
                </div>

                <Button onClick={createCourse}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Course
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Existing Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <div className="font-semibold">{course.title}</div>
                        <div className="text-sm text-neutral-600">
                          {course.plan_type} - ₹{course.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modules">
            <Card>
              <CardHeader>
                <CardTitle>Create New Module</CardTitle>
                <CardDescription>Add a module to an existing course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="selectCourse">Select Course *</Label>
                  <Select value={selectedCourse} onValueChange={(value) => {
                    setSelectedCourse(value);
                    fetchModules(value);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="moduleTitle">Module Title *</Label>
                  <Input
                    id="moduleTitle"
                    value={moduleTitle}
                    onChange={(e) => setModuleTitle(e.target.value)}
                    placeholder="Week 1: Introduction"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="moduleDesc">Description</Label>
                  <Textarea
                    id="moduleDesc"
                    value={moduleDesc}
                    onChange={(e) => setModuleDesc(e.target.value)}
                    placeholder="Module description..."
                  />
                </div>

                <Button onClick={createModule}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Module
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <Card>
              <CardHeader>
                <CardTitle>Add Video Lesson</CardTitle>
                <CardDescription>Add a video to a module</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="selectCourseForVideo">Select Course *</Label>
                  <Select value={selectedCourse} onValueChange={(value) => {
                    setSelectedCourse(value);
                    fetchModules(value);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="selectModule">Select Module *</Label>
                  <Select value={selectedModule} onValueChange={setSelectedModule}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a module" />
                    </SelectTrigger>
                    <SelectContent>
                      {modules.map((module) => (
                        <SelectItem key={module.id} value={module.id}>
                          {module.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videoTitle">Video Title *</Label>
                  <Input
                    id="videoTitle"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Lesson 1: Warm-up Exercises"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videoDesc">Description</Label>
                  <Textarea
                    id="videoDesc"
                    value={videoDesc}
                    onChange={(e) => setVideoDesc(e.target.value)}
                    placeholder="Video description..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videoUrl">Video URL *</Label>
                  <Input
                    id="videoUrl"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://example.com/video.mp4"
                  />
                </div>

                <Button onClick={createVideo}>
                  <Video className="mr-2 h-4 w-4" />
                  Add Video
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
