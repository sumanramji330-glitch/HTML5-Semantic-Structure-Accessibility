import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData.ts';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-zinc-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-400 mb-2">
            Client & Engineering Testimonials
          </div>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white"
          >
            Endorsed by Engineering Leads & Product Architects
          </h2>
        </div>

        {/* Testimonials 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <figure
              key={idx}
              className="bg-zinc-50 dark:bg-slate-950/80 border border-zinc-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col justify-between shadow-xs space-y-6"
            >
              <blockquote className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                "{t.quote}"
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-4 border-t border-zinc-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-sm">
                  {t.author[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-950 dark:text-white">
                    {t.author}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    {t.role} · {t.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  );
};
