import React from 'react';
import { SlidersHorizontal, Eye } from 'lucide-react';

interface HeaderProps {
  onOpenPreferences: () => void;
  activeTheme: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPreferences }) => {
  return (
    <>
      {/* WCAG Essential: Skip to main content link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Top Bar Contract: Brand zone - 4-5 single line nav links - 1 primary action */}
      <header
        role="banner"
        className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-slate-800 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#home"
              className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors whitespace-nowrap focus-visible:outline-blue-700"
              aria-label="Alex Smith - Accessible Web Developer Home"
            >
              Alex Smith
            </a>
          </div>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav
            aria-label="Main Navigation"
            role="navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            <a
              href="#about"
              className="hover:text-blue-700 dark:hover:text-blue-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#projects"
              className="hover:text-blue-700 dark:hover:text-blue-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#case-studies"
              className="hover:text-blue-700 dark:hover:text-blue-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Case Studies
            </a>
            <a
              href="#sandbox"
              className="hover:text-blue-700 dark:hover:text-blue-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              A11y Sandbox
            </a>
            <a
              href="#contact"
              className="hover:text-blue-700 dark:hover:text-blue-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action button: Accessibility Preferences */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenPreferences}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors whitespace-nowrap focus-visible:outline-blue-700"
              aria-haspopup="dialog"
              aria-label="Open accessibility and display preferences"
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              <span>A11y Controls</span>
              <span className="sr-only">, Customize contrast, font size, and motion</span>
            </button>
          </div>

        </div>
      </header>
    </>
  );
};
