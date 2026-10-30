import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, FileCode, Sparkles } from 'lucide-react';
import { ALEX_PROFILE } from '../data/portfolioData.ts';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-zinc-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split-Screen Hero: Typographic Hierarchy on Left, Visual on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typographic Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Kicker: Clean unboxed metadata with typographic separators */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-blue-700 dark:text-blue-400">
              <span>Web Accessibility Specialist</span>
              <span aria-hidden="true">·</span>
              <span>CPACC & WAS Certified</span>
              <span aria-hidden="true">·</span>
              <span>5+ Years Experience</span>
            </div>

            {/* Primary Headline with text-wrap: balance */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Building an Inclusive Web for Every User
            </h1>

            {/* Lead Prose */}
            <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-2xl">
              Hi, I'm Alex. I engineer semantic, highly accessible, and visually striking web applications that everyone can use—regardless of ability, neurodiversity, assistive hardware, or connection speed.
            </p>

            {/* Standards & Adherence Note */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-zinc-600 dark:text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>WCAG 2.2 AAA Target</span>
              </span>
              <span className="text-zinc-400" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>Semantic HTML5 Native First</span>
              </span>
              <span className="text-zinc-400" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>Zero Automated axe Violations</span>
              </span>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors focus-visible:outline-blue-700"
                aria-label="View my featured accessibility projects"
              >
                <span>View My Work</span>
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#sandbox"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-slate-800 hover:bg-zinc-200 dark:hover:bg-slate-700 border border-zinc-200 dark:border-slate-700 rounded-lg transition-colors focus-visible:outline-blue-700"
                aria-label="Try the interactive A11y sandbox and contrast checker"
              >
                <span>Try A11y Sandbox</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-slate-800 shadow-xl bg-zinc-100 dark:bg-slate-800">
              <img
                src="/src/assets/images/alex_smith_portrait_1793381331485.jpg"
                alt="Alex Smith working at an accessible desk with dual monitors displaying semantic code and accessibility audit reports."
                width="600"
                height="450"
                className="w-full h-auto object-cover aspect-4/3"
                referrerPolicy="no-referrer"
              />
              {/* Minimalist image caption banner adhering to WCAG AAA contrast */}
              <div className="p-4 bg-zinc-900 text-white flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold">Alex Smith</span>
                  <span className="text-zinc-400 mx-2">·</span>
                  <span className="text-zinc-300">Accessibility Lab & Studio</span>
                </div>
                <span className="text-zinc-400 font-mono">WCAG 2.2</span>
              </div>
            </div>
          </div>

        </div>

        {/* Adjacency Proof Metrics: Full-width row directly below the hero split */}
        <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-slate-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {ALEX_PROFILE.stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-mono tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {stat.label}
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
