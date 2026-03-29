'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Course } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function PricingSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchCourses() {
      const { data } = await supabase
        .from('courses')
        .select('*')
        .select('*')
        .order('price', { ascending: true })
        .order('price', { ascending: true });

      if (data) setCourses(data);
    }
    fetchCourses();
  }, []);

  const handleBuyNow = async (courseId: string) => {
    // Check if user is logged in
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      // Not logged in - store courseId and redirect to login
      localStorage.setItem('pendingCheckoutCourseId', courseId);
      router.push('/login');
    } else {
      // Already logged in - go directly to checkout
      router.push(`/checkout/${courseId}`);
    }
  };

  const getPlanIcon = (planType: string) => {
    if (planType === 'Premium') return '👑';
    if (planType === 'Standard') return '⭐';
    return '🎯';
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
            Choose Your Plan
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Start Your Transformation Today
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Select the perfect plan for your fitness journey. All plans include our proven methodology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courses.map((course, index) => {
            const isPopular = course.plan_type === 'Standard';
            const isPremium = course.plan_type === 'Premium';

            return (
              <div
                key={course.id}
                className={`relative rounded-3xl p-8 transition-all duration-300 hover:scale-105 ${isPremium
                  ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-2xl'
                  : isPopular
                    ? 'bg-white text-neutral-900 shadow-xl ring-2 ring-white'
                    : 'bg-white/5 text-white backdrop-blur-sm'
                  }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Sparkles className="h-4 w-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="text-5xl mb-4">{getPlanIcon(course.plan_type)}</div>
                  <h3 className={`text-2xl font-bold mb-2 ${!isPremium && !isPopular ? 'text-white' : ''
                    }`}>
                    {course.plan_type} Plan
                  </h3>
                  <p className={`text-sm ${isPremium ? 'text-white/90' : isPopular ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                    {course.description.substring(0, 50)}...
                  </p>
                </div>

                <div className="text-center mb-8">
                  <div className={`text-5xl font-bold mb-2 ${!isPremium && !isPopular ? 'text-white' : ''
                    }`}>
                    ₹{course.price.toLocaleString()}
                  </div>
                  <div className={`text-sm ${isPremium ? 'text-white/80' : isPopular ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                    One-time payment
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${isPremium ? 'text-white' : isPopular ? 'text-emerald-500' : 'text-emerald-400'
                        }`} />
                      <span className={`text-sm leading-relaxed ${isPremium ? 'text-white/90' : isPopular ? 'text-neutral-700' : 'text-neutral-300'
                        }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleBuyNow(course.id)}
                  className={`w-full h-12 text-base font-semibold ${isPremium
                    ? 'bg-white text-amber-600 hover:bg-neutral-100'
                    : isPopular
                      ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                      : 'bg-white text-neutral-900 hover:bg-neutral-100'
                    }`}
                >
                  Get Started Now
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-neutral-400 text-sm">
            All plans include a 30-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
