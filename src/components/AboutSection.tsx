import React, { useState } from 'react';
import { ALEX_PROFILE } from '../data/portfolioData.ts';
import { Code2, Keyboard, Glasses, ShieldCheck, Check } from 'lucide-react';

const SKILLS_DATA = {
  standards: [
    { name: 'WCAG 2.1 & 2.2 (Level AA & AAA)', detail: 'Full criterion auditing, VPAT generation, accessibility conformance reporting' },
    { name: 'WAI-ARIA 1.2 & 1.3 Draft', detail: 'Accessible names, live regions, roving tabindex, comboboxes, dialogs' },
    { name: 'Section 508 & EN 301 549', detail: 'US Federal & European Public Sector accessibility procurement compliance' },
    { name: 'Cognitive & Neurodiverse A11y', detail: 'WCAG 3 draft heuristics, plain language (Grade 6), clear focus order' },
  ],
  assistiveTech: [
    { name: 'VoiceOver (macOS & iOS)', detail: 'Rotor testing, table navigation, touch gesture accessibility' },
    { name: 'NVDA & JAWS (Windows)', detail: 'Speech feedback, virtual cursor modes, landmark hotkey validation' },
    { name: 'TalkBack (Android)', detail: 'Touch exploration, accessible action menus, linear swipe testing' },
    { name: 'Switch Controls & Eye-Gaze', detail: 'Single-switch scanning, dwell click timing, large interactive bounds' },
  ],
  tooling: [
    { name: 'axe-core & Pa11y CI', detail: 'Automated CI/CD regressions, custom accessibility test runners' },
    { name: 'Lighthouse & Accessibility Tree', detail: 'DevTools accessibility inspector, computing accessible names' },
    { name: 'Color Contrast Analyzers', detail: 'Mathematical relative luminance, dark mode testing, high-contrast modes' },
    { name: 'Screen Magnifiers', detail: 'Testing 400% zoom reflow, horizontal scroll prevention, viewport tracking' },
  ],
  frontend: [
    { name: 'Semantic HTML5', detail: 'Native <dialog>, <details>, <output>, landmark elements without div-soup' },
    { name: 'React 19 & TypeScript', detail: 'Strict typed ARIA props, keyboard focus management, custom hooks' },
    { name: 'Tailwind CSS v4', detail: 'Accessible color scales, focus-visible utilities, responsive typography' },
    { name: 'Accessible Component Primitives', detail: 'Headless accessible architectures, focus trapping, portal management' },
  ],
};

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'standards' | 'assistiveTech' | 'tooling' | 'frontend'>('standards');

  const principleIcons = [Code2, Keyboard, Glasses, ShieldCheck];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-16 lg:py-24 bg-zinc-50 dark:bg-slate-950/60 border-b border-zinc-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-400 mb-2">
            Background & Philosophy
          </div>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white"
          >
            Crafting Digital Experiences Where Nobody Is Left Behind
          </h2>
          <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            I am a passionate web developer with over 5 years of experience specializing in front-end technologies. My core philosophy is that the web should be accessible to all, regardless of hardware, software, language, location, or physical and cognitive ability.
          </p>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            When I'm not architecting production systems, I contribute to open-source accessibility tools, mentor junior engineers on WCAG standards, and publish in-depth technical guides on semantic HTML5 and assistive compatibility.
          </p>
        </div>

        {/* 4 Core Accessibility Principles (Zero-Pill discipline, clean typography) */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
            Four Core Accessibility Disciplines
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALEX_PROFILE.corePrinciples.map((principle, index) => {
              const Icon = principleIcons[index] || Code2;
              return (
                <div
                  key={index}
                  className="p-6 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-xl shadow-xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                    {principle.title}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Standards & Tooling Matrix */}
        <div className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-slate-800 pb-6 mb-6">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Standards, Assistive Hardware & Tooling
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                Verified proficiencies applied across live commercial codebases and governmental audits.
              </p>
            </div>

            {/* Accessible Tab Switcher (interactive buttons with proper aria-selected) */}
            <div
              role="tablist"
              aria-label="Skill Categories"
              className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-slate-800 rounded-lg shrink-0 overflow-x-auto"
            >
              {[
                { key: 'standards', label: 'Standards' },
                { key: 'assistiveTech', label: 'Screen Readers' },
                { key: 'tooling', label: 'Audit Tooling' },
                { key: 'frontend', label: 'Codebase Stack' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={activeTab === tab.key}
                  aria-controls={`tabpanel-${tab.key}`}
                  id={`tab-${tab.key}`}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap focus-visible:outline-blue-700 ${
                    activeTab === tab.key
                      ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tab Panel */}
          <div
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {SKILLS_DATA[activeTab].map((skill, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-zinc-50 dark:bg-slate-800/50 border border-zinc-200/80 dark:border-slate-700/60 flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                    {skill.name}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-normal">
                    {skill.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
