'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200">
      <div className="absolute inset-0 bg-grid-neutral-900/[0.04] bg-[size:20px_20px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-neutral-50 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                1000+ Success Stories
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
              Transform Your Body,
              <span className="block text-neutral-600 mt-2">Transform Your Life</span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl">
              Get personalized fitness coaching, expert nutrition guidance, and join a community
              of achievers. Start your transformation journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="#pricing">
                <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                  Start Your Transformation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base h-12 px-8"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Success Stories
              </Button>
            </div>

            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900">1000+</div>
                <div className="text-sm text-neutral-600">Happy Clients</div>
              </div>
              <div className="h-12 w-px bg-neutral-300" />
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900">15+</div>
                <div className="text-sm text-neutral-600">Avg. kg Lost</div>
              </div>
              <div className="h-12 w-px bg-neutral-300" />
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900">98%</div>
                <div className="text-sm text-neutral-600">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative h-[600px] w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-700 rounded-3xl transform rotate-3"></div>
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <img
                  src="https://media.istockphoto.com/id/1207041834/photo/group-of-young-happy-fit-people-doing-exercises-in-gym.jpg?s=612x612&w=0&k=20&c=3LkL97NzJct4YwSNc_X70FEX9uH-BkKBMY9Vgy1O5sg="
                  alt="Fitness Coach"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent"></div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Certified Expert Coach</div>
                    <div className="text-sm text-neutral-600">10+ Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
