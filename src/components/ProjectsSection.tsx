import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Layers } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData.ts';
import { Project } from '../types/index.ts';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<'all' | 'fintech' | 'ecommerce' | 'civic'>('all');

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-16 lg:py-24 bg-zinc-50 dark:bg-slate-950/60 border-b border-zinc-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Interactive Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-400 mb-2">
              Audited Case Studies & Implementations
            </div>
            <h2
              id="projects-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white"
            >
              Featured Accessible Works
            </h2>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
              Real enterprise architectures re-engineered for 100% keyboard operability, screen-reader parity, and WCAG AAA compliance.
            </p>
          </div>

          {/* Interactive Filter Control (Segmented buttons - allowed per frontend-design guidelines) */}
          <div
            role="toolbar"
            aria-label="Filter projects by sector"
            className="flex items-center gap-1 p-1 bg-zinc-200/80 dark:bg-slate-800 rounded-lg shrink-0 overflow-x-auto"
          >
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'fintech', label: 'FinTech' },
              { id: 'ecommerce', label: 'E-Commerce' },
              { id: 'civic', label: 'Civic & Gov' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as any)}
                aria-pressed={filter === tab.id}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap focus-visible:outline-blue-700 ${
                  filter === tab.id
                    ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid using Semantic Article Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-zinc-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-slate-700"
              aria-labelledby={`project-${project.id}-title`}
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-16/10 bg-zinc-100 dark:bg-slate-800 overflow-hidden border-b border-zinc-200 dark:border-slate-800">
                <img
                  src={project.image}
                  alt={`Screenshot and architecture showcase of ${project.title}`}
                  width="400"
                  height="250"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded font-mono font-medium">
                  WCAG {project.wcagTarget}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  {/* Clean unboxed metadata with typographic separators (anti-pill discipline) */}
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    <span className="capitalize">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.primaryTech.slice(0, 2).join(' / ')}</span>
                  </div>

                  <h3
                    id={`project-${project.id}-title`}
                    className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white"
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Primary Metric & Case Study Button */}
                <div className="pt-4 border-t border-zinc-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                    <span className="font-bold text-blue-700 dark:text-blue-400 text-sm">
                      {project.impactMetrics[0].metric}
                    </span>{' '}
                    <span>{project.impactMetrics[0].label}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 hover:underline underline-offset-4 focus-visible:outline-blue-700"
                    aria-label={`Read in-depth case study for ${project.title}`}
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
