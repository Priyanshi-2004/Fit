'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Testimonial } from '@/lib/types';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .limit(3);

      if (data) setTestimonials(data);
    }
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-neutral-100 text-neutral-900 text-sm font-medium mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our community has to say
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-neutral-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <Quote className="h-10 w-10 text-neutral-300 mb-4" />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-neutral-700 mb-6 leading-relaxed">
                "{testimonial.review}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-neutral-200">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-neutral-300">
                  {testimonial.client_image && (
                    <img
                      src={testimonial.client_image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-600">Verified Client</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
