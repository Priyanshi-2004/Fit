'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Transformation } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

export function TransformationsSection() {
  const [transformations, setTransformations] = useState<Transformation[]>([]);

  useEffect(() => {
    async function fetchTransformations() {
      const { data } = await supabase
        .from('transformations')
        .select('*')
        .select('*')
        .limit(3)
        .limit(3);

      if (data) setTransformations(data);
    }
    fetchTransformations();
  }, []);

  return (
    <section id="transformations" className="py-24 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-neutral-900 text-neutral-50 text-sm font-medium mb-4">
            Success Stories
          </div>
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Real People, Real Results
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            See the incredible transformations achieved by our community members
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {transformations.map((transformation) => (
            <div key={transformation.id} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="grid grid-cols-2 gap-2 p-2">
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <img
                      src={transformation.before_image}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Before
                    </div>
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <img
                      src={transformation.after_image}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      After
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {transformation.client_name}
                  </h3>
                  <p className="text-neutral-600 mb-4 line-clamp-2">
                    {transformation.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-neutral-500">
                      <span className="font-semibold text-neutral-900">
                        {transformation.duration_weeks} weeks
                      </span>
                      {' '}transformation
                    </div>
                    <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
