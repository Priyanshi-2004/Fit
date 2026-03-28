'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader as Loader2, CirclePlay as PlayCircle, CircleCheck as CheckCircle, Lock, ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
  videos: Video[];
}

interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  duration: number;
  order_index: number;
  completed: boolean;
}

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    checkAccess();
  }, []);

  async function checkAccess() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push('/login');
      return;
    }

    setUserId(session.user.id);

    const { data: userCourse } = await supabase
      .from('user_courses')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('course_id', courseId)
      .single();

    if (!userCourse) {
      router.push('/dashboard');
      return;
    }

    await fetchCourseData(session.user.id);
    setLoading(false);
  }

  async function fetchCourseData(userId: string) {
    const { data: courseData } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();

    setCourse(courseData);

    const { data: modulesData } = await supabase
      .from('modules')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index', { ascending: true });

    if (modulesData) {
      const modulesWithVideos = await Promise.all(
        modulesData.map(async (module) => {
          const { data: videos } = await supabase
            .from('videos')
            .select('*')
            .eq('module_id', module.id)
            .order('order_index', { ascending: true });

          const { data: progress } = await supabase
            .from('video_progress')
            .select('video_id, completed')
            .eq('user_id', userId)
            .in('video_id', videos?.map(v => v.id) || []);

          const progressMap = new Map(progress?.map(p => [p.video_id, p.completed]) || []);

          const videosWithProgress = videos?.map(v => ({
            ...v,
            completed: progressMap.get(v.id) || false,
          })) || [];

          return {
            ...module,
            videos: videosWithProgress,
          };
        })
      );

      setModules(modulesWithVideos);

      if (modulesWithVideos.length > 0 && modulesWithVideos[0].videos.length > 0) {
        setSelectedVideo(modulesWithVideos[0].videos[0]);
        setExpandedModules(new Set([modulesWithVideos[0].id]));
      }
    }
  }

  async function markVideoCompleted(videoId: string) {
    const { error } = await supabase
      .from('video_progress')
      .upsert({
        user_id: userId,
        video_id: videoId,
        completed: true,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,video_id'
      });

    if (!error) {
      setModules(modules.map(module => ({
        ...module,
        videos: module.videos.map(video =>
          video.id === videoId ? { ...video, completed: true } : video
        ),
      })));
    }
  }

  function toggleModule(moduleId: string) {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  }

  const totalVideos = modules.reduce((sum, m) => sum + m.videos.length, 0);
  const completedVideos = modules.reduce(
    (sum, m) => sum + m.videos.filter(v => v.completed).length,
    0
  );
  const progress = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;

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
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="font-bold text-neutral-900">{course?.title}</h1>
                <div className="text-xs text-neutral-600">
                  {completedVideos} of {totalVideos} lessons completed
                </div>
              </div>
            </div>
            <div className="hidden sm:block w-48">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>
      </nav>

      <div className="grid lg:grid-cols-3 gap-6 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:col-span-2 space-y-6">
          {selectedVideo ? (
            <>
              <Card className="overflow-hidden">
                <div className="relative bg-black aspect-video">
                  <div
                    className="absolute inset-0"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ userSelect: 'none' }}
                  >
                    <video
                      key={selectedVideo.id}
                      className="w-full h-full"
                      controls
                      controlsList="nodownload"
                      onEnded={() => markVideoCompleted(selectedVideo.id)}
                    >
                      <source src={selectedVideo.video_url} type="video/mp4" />
                    </video>

                    <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none">
                      © FitTransform
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                        {selectedVideo.title}
                      </h2>
                      <p className="text-neutral-600">{selectedVideo.description}</p>
                    </div>
                    {selectedVideo.completed && (
                      <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                    )}
                  </div>

                  {!selectedVideo.completed && (
                    <Button onClick={() => markVideoCompleted(selectedVideo.id)} className="w-full sm:w-auto">
                      Mark as Complete
                    </Button>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <PlayCircle className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-600">Select a video to start learning</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b bg-neutral-50">
                <h3 className="font-semibold text-neutral-900">Course Content</h3>
                <p className="text-sm text-neutral-600 mt-1">
                  {modules.length} modules • {totalVideos} lessons
                </p>
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                {modules.map((module) => (
                  <div key={module.id} className="border-b last:border-b-0">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors text-left"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-neutral-900">{module.title}</div>
                        <div className="text-xs text-neutral-600 mt-1">
                          {module.videos.filter(v => v.completed).length} / {module.videos.length} completed
                        </div>
                      </div>
                      {expandedModules.has(module.id) ? (
                        <ChevronDown className="h-5 w-5 text-neutral-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-neutral-400" />
                      )}
                    </button>

                    {expandedModules.has(module.id) && (
                      <div className="bg-neutral-50">
                        {module.videos.map((video) => (
                          <button
                            key={video.id}
                            onClick={() => setSelectedVideo(video)}
                            className={`w-full flex items-center gap-3 p-4 hover:bg-white transition-colors text-left border-t ${
                              selectedVideo?.id === video.id ? 'bg-white border-l-4 border-l-emerald-500' : ''
                            }`}
                          >
                            <div className="flex-shrink-0">
                              {video.completed ? (
                                <CheckCircle className="h-5 w-5 text-emerald-500" />
                              ) : (
                                <PlayCircle className="h-5 w-5 text-neutral-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-neutral-900 truncate">
                                {video.title}
                              </div>
                              {video.duration > 0 && (
                                <div className="text-xs text-neutral-500">
                                  {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
