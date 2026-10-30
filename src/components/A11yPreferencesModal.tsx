import React, { useEffect, useRef } from 'react';
import { X, Check, Volume2, VolumeX, Sparkles, ZoomIn, Eye, Move } from 'lucide-react';
import { A11yPreferences } from '../types/index.ts';

interface A11yPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: A11yPreferences;
  onUpdatePreferences: (updates: Partial<A11yPreferences>) => void;
  onResetPreferences: () => void;
}

export const A11yPreferencesModal: React.FC<A11yPreferencesModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences,
  onResetPreferences,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management and keyboard trap
  useEffect(() => {
    if (isOpen) {
      const previouslyFocusedElement = document.activeElement as HTMLElement | null;
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }

        // Trap focus inside modal
        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        previouslyFocusedElement?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-dialog-title"
        aria-describedby="a11y-dialog-desc"
        className="w-full max-w-xl bg-white dark:bg-slate-900 border border-zinc-300 dark:border-slate-700 rounded-xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-zinc-900 dark:text-zinc-100"
      >
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-slate-800 pb-4 mb-6">
          <div>
            <h2 id="a11y-dialog-title" className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Accessibility & Display Controls
            </h2>
            <p id="a11y-dialog-desc" className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Customize visual contrast, typography, focus indicators, and screen reader announcements.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-slate-800 focus-visible:outline-blue-700"
            aria-label="Close accessibility controls modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Contrast & Color Scheme */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Color Contrast & Palette
            </label>
            <div className="grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Contrast Modes">
              <button
                type="button"
                role="radio"
                aria-checked={preferences.theme === 'light'}
                onClick={() => onUpdatePreferences({ theme: 'light' })}
                className={`p-3 rounded-lg border text-left flex items-start justify-between transition-colors ${
                  preferences.theme === 'light'
                    ? 'border-blue-700 bg-blue-50/70 text-blue-900 ring-2 ring-blue-700 font-semibold'
                    : 'border-zinc-300 dark:border-slate-700 hover:bg-zinc-50 dark:hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="text-sm font-medium">Standard Light</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">WCAG AAA (7.4:1)</div>
                </div>
                {preferences.theme === 'light' && <Check className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />}
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={preferences.theme === 'dark'}
                onClick={() => onUpdatePreferences({ theme: 'dark' })}
                className={`p-3 rounded-lg border text-left flex items-start justify-between transition-colors ${
                  preferences.theme === 'dark'
                    ? 'border-blue-500 bg-blue-950/60 text-white ring-2 ring-blue-500 font-semibold'
                    : 'border-zinc-300 dark:border-slate-700 hover:bg-zinc-50 dark:hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="text-sm font-medium">Dark Slate</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">High contrast dark</div>
                </div>
                {preferences.theme === 'dark' && <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={preferences.theme === 'super-contrast'}
                onClick={() => onUpdatePreferences({ theme: 'super-contrast' })}
                className={`p-3 rounded-lg border text-left flex items-start justify-between transition-colors ${
                  preferences.theme === 'super-contrast'
                    ? 'border-yellow-400 bg-black text-yellow-300 ring-2 ring-yellow-400 font-semibold'
                    : 'border-zinc-300 dark:border-slate-700 hover:bg-zinc-50 dark:hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="text-sm font-medium">Super Contrast</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Yellow on Black (19:1)</div>
                </div>
                {preferences.theme === 'super-contrast' && <Check className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />}
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={preferences.theme === 'soft'}
                onClick={() => onUpdatePreferences({ theme: 'soft' })}
                className={`p-3 rounded-lg border text-left flex items-start justify-between transition-colors ${
                  preferences.theme === 'soft'
                    ? 'border-amber-700 bg-amber-50 text-amber-950 ring-2 ring-amber-700 font-semibold'
                    : 'border-zinc-300 dark:border-slate-700 hover:bg-zinc-50 dark:hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="text-sm font-medium">Soft Paper</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Low eyestrain warm</div>
                </div>
                {preferences.theme === 'soft' && <Check className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />}
              </button>
            </div>
          </div>

          {/* Text Size Scaling */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Text Scaling
            </label>
            <div className="flex items-center gap-2" role="radiogroup" aria-label="Text Scaling Sizes">
              {[
                { size: '100', label: '100% Default' },
                { size: '115', label: '115% Large' },
                { size: '130', label: '130% Extra Large' },
              ].map((item) => (
                <button
                  key={item.size}
                  type="button"
                  role="radio"
                  aria-checked={preferences.textSize === item.size}
                  onClick={() => onUpdatePreferences({ textSize: item.size as '100' | '115' | '130' })}
                  className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium rounded-lg border text-center transition-colors ${
                    preferences.textSize === item.size
                      ? 'border-blue-700 dark:border-blue-400 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100 ring-2 ring-blue-700'
                      : 'border-zinc-300 dark:border-slate-700 hover:bg-zinc-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility Toggles */}
          <div className="space-y-3.5 pt-2 border-t border-zinc-200 dark:border-slate-800">
            {/* Dyslexia Readability */}
            <div className="flex items-center justify-between">
              <div>
                <span id="label-dyslexia" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Dyslexia Readability Mode
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Switches to Lexend font with enhanced character distinctions and letter spacing.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={preferences.dyslexiaFont}
                aria-labelledby="label-dyslexia"
                onClick={() => onUpdatePreferences({ dyslexiaFont: !preferences.dyslexiaFont })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-blue-700 ${
                  preferences.dyslexiaFont ? 'bg-blue-700' : 'bg-zinc-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    preferences.dyslexiaFont ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Enhanced Focus Ring */}
            <div className="flex items-center justify-between">
              <div>
                <span id="label-focus" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  High-Visibility Focus Indicators
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  4px high-contrast amber indicator with outer glow for keyboard navigation.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={preferences.enhancedFocus}
                aria-labelledby="label-focus"
                onClick={() => onUpdatePreferences({ enhancedFocus: !preferences.enhancedFocus })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-blue-700 ${
                  preferences.enhancedFocus ? 'bg-blue-700' : 'bg-zinc-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    preferences.enhancedFocus ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between">
              <div>
                <span id="label-motion" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Force Reduced Motion
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Suppresses CSS animations and transitions for users with vestibular sensitivities.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={preferences.reducedMotion}
                aria-labelledby="label-motion"
                onClick={() => onUpdatePreferences({ reducedMotion: !preferences.reducedMotion })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-blue-700 ${
                  preferences.reducedMotion ? 'bg-blue-700' : 'bg-zinc-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    preferences.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Virtual Screen Reader Inspector */}
            <div className="flex items-center justify-between">
              <div>
                <span id="label-screenreader" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Screen Reader Announcement Dock
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Shows live visual transcription of ARIA roles, states, and aria-live announcements.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={preferences.screenReaderLogs}
                aria-labelledby="label-screenreader"
                onClick={() => onUpdatePreferences({ screenReaderLogs: !preferences.screenReaderLogs })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-blue-700 ${
                  preferences.screenReaderLogs ? 'bg-blue-700' : 'bg-zinc-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    preferences.screenReaderLogs ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Audio Speech Output */}
            {preferences.screenReaderLogs && (
              <div className="flex items-center justify-between pl-4 border-l-2 border-blue-600">
                <div>
                  <span id="label-speech" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Audible Speech Synthesizer
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Reads focused elements and aria-live alerts aloud via Web Speech API.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={preferences.soundAnnounce}
                  aria-labelledby="label-speech"
                  onClick={() => onUpdatePreferences({ soundAnnounce: !preferences.soundAnnounce })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-blue-700 ${
                    preferences.soundAnnounce ? 'bg-blue-700' : 'bg-zinc-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      preferences.soundAnnounce ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onResetPreferences}
            className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline underline-offset-4 focus-visible:outline-blue-700"
          >
            Reset to Standard Defaults
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors focus-visible:outline-blue-700"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
