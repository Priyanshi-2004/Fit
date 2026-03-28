'use client';

import { Award, Target, Users, Zap } from 'lucide-react';

export function AboutSection() {
  const achievements = [
    {
      icon: Users,
      number: '1000+',
      label: 'Clients Transformed',
    },
    {
      icon: Award,
      number: '10+',
      label: 'Years Experience',
    },
    {
      icon: Target,
      number: '98%',
      label: 'Success Rate',
    },
    {
      icon: Zap,
      number: '50+',
      label: 'Training Programs',
    },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg"
                alt="About Coach"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-8 -right-8 bg-neutral-900 text-white p-8 rounded-2xl shadow-2xl max-w-xs">
              <div className="text-4xl font-bold mb-2">15kg</div>
              <div className="text-neutral-300">Average Weight Loss</div>
              <div className="text-sm text-neutral-400 mt-2">Achieved by our clients in 12 weeks</div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-neutral-100 text-neutral-900 text-sm font-medium mb-4">
                About Your Coach
              </div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                Transforming Lives Through Fitness Excellence
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  With over 10 years of experience in the fitness industry, I've helped thousands of
                  individuals achieve their dream physique and build lasting healthy habits.
                </p>
                <p>
                  My approach combines evidence-based training methodologies with personalized nutrition
                  strategies to deliver real, sustainable results. Whether you're looking to lose weight,
                  build muscle, or completely transform your lifestyle, I'm here to guide you every step
                  of the way.
                </p>
                <p>
                  I believe that fitness is not just about physical transformation—it's about building
                  confidence, discipline, and a mindset that empowers you to achieve anything you set
                  your mind to.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="space-y-2">
                  <achievement.icon className="h-8 w-8 text-neutral-900" />
                  <div className="text-3xl font-bold text-neutral-900">{achievement.number}</div>
                  <div className="text-sm text-neutral-600">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
