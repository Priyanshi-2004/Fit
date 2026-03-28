'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-neutral-900 to-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful clients who have achieved their fitness goals.
            Your journey to a healthier, stronger you starts now.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#pricing">
              <Button size="lg" className="w-full sm:w-auto bg-white text-neutral-900 hover:bg-neutral-100 h-14 px-8 text-lg">
                Choose Your Plan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-black hover:bg-white h-14 px-8 text-lg">
                Access Dashboard
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-neutral-400">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-neutral-400">Secure Payment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">30-Day</div>
              <div className="text-sm text-neutral-400">Money Back</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
