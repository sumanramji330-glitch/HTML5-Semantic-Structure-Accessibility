/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { CaseStudyModal } from './components/CaseStudyModal.tsx';
import { A11ySandbox } from './components/A11ySandbox.tsx';
import { ArticlesSection } from './components/ArticlesSection.tsx';
import { TestimonialsSection } from './components/TestimonialsSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { A11yPreferencesModal } from './components/A11yPreferencesModal.tsx';
import { ScreenReaderLiveBar } from './components/ScreenReaderLiveBar.tsx';
import { A11yPreferences, Project, ScreenReaderLogEntry } from './types/index.ts';
import { announceSpeech } from './utils/a11yUtils.ts';

const DEFAULT_PREFERENCES: A11yPreferences = {
  theme: 'light',
  textSize: '100',
  dyslexiaFont: false,
  reducedMotion: false,
  enhancedFocus: false,
  screenReaderLogs: false,
  soundAnnounce: false,
};

export default function App() {
  const [preferences, setPreferences] = useState<A11yPreferences>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('alex_smith_a11y_prefs');
      if (saved) {
        try {
          return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
        } catch (e) {
          // ignore corrupted data
        }
      }
    }
    return DEFAULT_PREFERENCES;
  });

  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [screenReaderLogs, setScreenReaderLogs] = useState<ScreenReaderLogEntry[]>([]);
  const [currentFocusText, setCurrentFocusText] = useState<string>('Main page ready. Tab or click to inspect accessibility tree.');

  // Apply visual accessibility settings directly to document root and body
  useEffect(() => {
    localStorage.setItem('alex_smith_a11y_prefs', JSON.stringify(preferences));

    // Dark mode class toggle
    document.documentElement.classList.toggle('dark', preferences.theme === 'dark');

    // Super Contrast and Soft Contrast body classes
    document.body.classList.toggle('theme-super-contrast', preferences.theme === 'super-contrast');
    document.body.classList.toggle('theme-soft-contrast', preferences.theme === 'soft');

    // Text scaling
    document.documentElement.setAttribute('data-text-size', preferences.textSize);

    // Dyslexia-friendly font toggle
    document.body.classList.toggle('font-dyslexia', preferences.dyslexiaFont);

    // Reduced motion toggle
    document.body.classList.toggle('force-reduced-motion', preferences.reducedMotion);

    // High visibility focus indicators toggle
    document.body.classList.toggle('enhanced-focus', preferences.enhancedFocus);
  }, [preferences]);

  // Screen reader announcer handler
  const handleAnnounce = useCallback(
    (message: string, type: 'polite' | 'assertive' = 'polite') => {
      const newEntry: ScreenReaderLogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        type: 'announcement',
        message: `[${type.toUpperCase()}] ${message}`,
      };

      setScreenReaderLogs((prev) => [...prev.slice(-15), newEntry]);

      if (preferences.soundAnnounce) {
        announceSpeech(message);
      }
    },
    [preferences.soundAnnounce]
  );

  // Global focus listener for assistive tree simulation
  useEffect(() => {
    if (!preferences.screenReaderLogs) return;

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const tag = target.tagName.toLowerCase();
      const role = target.getAttribute('role') || target.getAttribute('aria-label') ? target.getAttribute('role') || tag : tag;
      const accessibleName =
        target.getAttribute('aria-label') ||
        target.innerText?.slice(0, 35) ||
        target.getAttribute('title') ||
        target.getAttribute('placeholder') ||
        (target as HTMLInputElement).value ||
        '';

      const logText = `<${tag}> role="${role}" ${accessibleName ? `"${accessibleName.trim()}"` : ''}`;
      setCurrentFocusText(logText);

      if (preferences.soundAnnounce && accessibleName) {
        announceSpeech(`${role}: ${accessibleName}`);
      }
    };

    window.addEventListener('focusin', handleFocusIn);
    return () => window.removeEventListener('focusin', handleFocusIn);
  }, [preferences.screenReaderLogs, preferences.soundAnnounce]);

  const updatePreferences = (updates: Partial<A11yPreferences>) => {
    setPreferences((prev) => {
      const next = { ...prev, ...updates };
      return next;
    });
  };

  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
    handleAnnounce('Accessibility settings reset to default', 'polite');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 text-zinc-900 dark:text-zinc-100 transition-colors">
      
      {/* Semantic Header with banner role & skip link */}
      <Header
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        activeTheme={preferences.theme}
      />

      {/* Semantic Main landmark */}
      <main id="main-content" role="main" className="flex-grow">
        <HeroSection />
        <AboutSection />
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
        <A11ySandbox
          onAnnounce={handleAnnounce}
          soundEnabled={preferences.soundAnnounce}
        />
        <ArticlesSection />
        <TestimonialsSection />
        <ContactSection onAnnounce={handleAnnounce} />
      </main>

      {/* Semantic Footer with contentinfo role */}
      <Footer onOpenPreferences={() => setIsPreferencesOpen(true)} />

      {/* Modals & Live Docks */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onAnnounce={handleAnnounce}
      />

      <A11yPreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        preferences={preferences}
        onUpdatePreferences={updatePreferences}
        onResetPreferences={resetPreferences}
      />

      {preferences.screenReaderLogs && (
        <ScreenReaderLiveBar
          logs={screenReaderLogs}
          currentFocusText={currentFocusText}
          soundEnabled={preferences.soundAnnounce}
          onToggleSound={() => updatePreferences({ soundAnnounce: !preferences.soundAnnounce })}
          onClearLogs={() => setScreenReaderLogs([])}
          onClose={() => updatePreferences({ screenReaderLogs: false })}
        />
      )}
    </div>
  );
}
