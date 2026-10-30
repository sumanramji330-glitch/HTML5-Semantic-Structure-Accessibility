import React, { useState } from 'react';
import { calculateContrastRatio, evaluateWcagCompliance } from '../utils/a11yUtils.ts';
import { Check, X, Sparkles, Sliders, Bell, AlertCircle, Volume2 } from 'lucide-react';

interface A11ySandboxProps {
  onAnnounce: (msg: string, type?: 'polite' | 'assertive') => void;
  soundEnabled: boolean;
}

export const A11ySandbox: React.FC<A11ySandboxProps> = ({ onAnnounce, soundEnabled }) => {
  // Contrast Checker States
  const [fgColor, setFgColor] = useState('#1d4ed8');
  const [bgColor, setBgColor] = useState('#ffffff');

  // Live Announcer States
  const [lastAnnouncement, setLastAnnouncement] = useState<string>('No notifications yet. Click a trigger below to test aria-live behavior.');
  const [announcementType, setAnnouncementType] = useState<'polite' | 'assertive'>('polite');

  const ratio = calculateContrastRatio(fgColor, bgColor);
  const compliance = evaluateWcagCompliance(ratio);

  const presets = [
    { name: 'Alex Blue on White', fg: '#1d4ed8', bg: '#ffffff' },
    { name: 'Dark Slate on White', fg: '#0f172a', bg: '#ffffff' },
    { name: 'Yellow on Black (Super A11y)', fg: '#ffff00', bg: '#000000' },
    { name: 'Inaccessible Light Gray (Fail)', fg: '#9ca3af', bg: '#ffffff' },
  ];

  const handleTriggerLiveRegion = (message: string, type: 'polite' | 'assertive') => {
    setLastAnnouncement(message);
    setAnnouncementType(type);
    onAnnounce(message, type);
  };

  return (
    <section
      id="sandbox"
      aria-labelledby="sandbox-heading"
      className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-zinc-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-400 mb-2">
            Interactive Accessibility Lab
          </div>
          <h2
            id="sandbox-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white"
          >
            A11y Sandbox & Testing Workbench
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Test mathematical color contrast compliance in real time and discover how assistive technology experiences live ARIA regions and keyboard focus flows.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tool 1: WCAG 2.1 Color Contrast Checker (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-50 dark:bg-slate-950/80 border border-zinc-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                  Mathematical Color Contrast Calculator
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                  Evaluated using W3C relative luminance formulas against WCAG 2.1 / 2.2 specs.
                </p>
              </div>
              <span className="text-xs font-mono text-blue-700 dark:text-blue-400 font-bold">
                WCAG 1.4.3 / 1.4.6
              </span>
            </div>

            {/* Quick Presets */}
            <div>
              <span className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
                Quick Contrast Presets:
              </span>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setFgColor(preset.fg);
                      setBgColor(preset.bg);
                    }}
                    className="px-3 py-1 text-xs font-medium rounded-md bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-700 text-zinc-800 dark:text-zinc-200 hover:border-blue-500 transition-colors focus-visible:outline-blue-700"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Pickers & Hex Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Foreground */}
              <div className="space-y-2">
                <label htmlFor="fg-color" className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  Text / Foreground Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="fg-color-picker"
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 p-1 rounded-md border border-zinc-300 dark:border-slate-700 cursor-pointer bg-white"
                    aria-label="Pick foreground color"
                  />
                  <input
                    id="fg-color"
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono uppercase border border-zinc-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-zinc-900 dark:text-zinc-100 focus-visible:outline-blue-700"
                  />
                </div>
              </div>

              {/* Background */}
              <div className="space-y-2">
                <label htmlFor="bg-color" className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  Surface / Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="bg-color-picker"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 p-1 rounded-md border border-zinc-300 dark:border-slate-700 cursor-pointer bg-white"
                    aria-label="Pick background color"
                  />
                  <input
                    id="bg-color"
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono uppercase border border-zinc-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-zinc-900 dark:text-zinc-100 focus-visible:outline-blue-700"
                  />
                </div>
              </div>
            </div>

            {/* Calculated Contrast Ratio Display */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                  Contrast Ratio
                </span>
                <div className="text-3xl font-extrabold font-mono text-zinc-950 dark:text-white tabular-nums">
                  {ratio} : 1
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-500 block mb-1">Standard Status</span>
                {ratio >= 7.0 ? (
                  <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold">
                    Passes WCAG AAA (Enhanced)
                  </span>
                ) : ratio >= 4.5 ? (
                  <span className="px-3 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-xs font-bold">
                    Passes WCAG AA (Minimum)
                  </span>
                ) : ratio >= 3.0 ? (
                  <span className="px-3 py-1 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-xs font-bold">
                    Passes Large Text Only
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 text-xs font-bold">
                    Fails WCAG 2.1
                  </span>
                )}
              </div>
            </div>

            {/* Live Typography Preview Box */}
            <div
              className="p-6 rounded-xl border border-zinc-300 dark:border-slate-700 transition-colors"
              style={{ backgroundColor: bgColor, color: fgColor }}
            >
              <div className="text-xs uppercase font-mono font-semibold tracking-wider opacity-80 mb-1">
                Live Sample Output
              </div>
              <div className="text-xl font-bold mb-2">
                Accessible Design Is Good Design
              </div>
              <p className="text-sm leading-relaxed">
                When content maintains sufficient contrast, users in bright sunlight, individuals with low vision, and people experiencing eye fatigue can effortlessly digest information.
              </p>
            </div>

            {/* Compliance Matrix Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className={`p-2.5 rounded-lg border ${compliance.normalAa ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' : 'bg-red-50/70 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200'}`}>
                <div className="font-bold">Normal Text AA</div>
                <div className="text-xs mt-0.5">{compliance.normalAa ? 'PASS (≥4.5:1)' : 'FAIL'}</div>
              </div>
              <div className={`p-2.5 rounded-lg border ${compliance.normalAaa ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' : 'bg-red-50/70 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200'}`}>
                <div className="font-bold">Normal Text AAA</div>
                <div className="text-xs mt-0.5">{compliance.normalAaa ? 'PASS (≥7.0:1)' : 'FAIL'}</div>
              </div>
              <div className={`p-2.5 rounded-lg border ${compliance.largeAa ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' : 'bg-red-50/70 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200'}`}>
                <div className="font-bold">Large Text AA</div>
                <div className="text-xs mt-0.5">{compliance.largeAa ? 'PASS (≥3.0:1)' : 'FAIL'}</div>
              </div>
              <div className={`p-2.5 rounded-lg border ${compliance.largeAaa ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' : 'bg-red-50/70 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200'}`}>
                <div className="font-bold">Large Text AAA</div>
                <div className="text-xs mt-0.5">{compliance.largeAaa ? 'PASS (≥4.5:1)' : 'FAIL'}</div>
              </div>
            </div>
          </div>

          {/* Tool 2: ARIA Live Region & Screen Reader Simulator (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-50 dark:bg-slate-950/80 border border-zinc-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-zinc-200 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                <span>ARIA Live Region Simulator</span>
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                Experience the critical distinction between polite and assertive announcements.
              </p>
            </div>

            {/* Live Container simulating screen reader auditory queue */}
            <div className="space-y-3">
              <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">
                Live Region Output Box:
              </span>
              <div
                aria-live={announcementType}
                aria-atomic="true"
                className="p-4 rounded-xl border border-blue-300 dark:border-blue-900 bg-white dark:bg-slate-900 text-xs font-mono min-h-24 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-zinc-500 mb-1">
                    <span>aria-live="{announcementType}"</span>
                    <span className="text-emerald-600 dark:text-emerald-400">● LIVE</span>
                  </div>
                  <p className="text-zinc-900 dark:text-zinc-100 font-semibold">
                    {lastAnnouncement}
                  </p>
                </div>
                <div className="text-right text-[10px] text-zinc-400">
                  {soundEnabled ? 'Speech synthesizer enabled' : 'Turn on audio in A11y Controls to hear aloud'}
                </div>
              </div>
            </div>

            {/* Trigger actions */}
            <div className="space-y-3">
              <span className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Trigger Asynchronous Events:
              </span>
              
              <button
                type="button"
                onClick={() => handleTriggerLiveRegion('Shopping Cart: 1 item added. Total is now $45.00.', 'polite')}
                className="w-full text-left p-3 rounded-lg border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-blue-700"
              >
                <div className="text-xs font-bold text-blue-700 dark:text-blue-400">
                  Simulate Polite Announcement
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                  aria-live="polite" (Waits until the user pauses navigation)
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleTriggerLiveRegion('Urgent: Your session will expire in 2 minutes. Press Space to extend.', 'assertive')}
                className="w-full text-left p-3 rounded-lg border border-red-200 dark:border-red-900/60 bg-white dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors focus-visible:outline-blue-700"
              >
                <div className="text-xs font-bold text-red-700 dark:text-red-400">
                  Simulate Assertive Announcement
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                  aria-live="assertive" (Interrupts current speech immediately)
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleTriggerLiveRegion('Validation Error: Credit card security code must contain 3 or 4 digits.', 'assertive')}
                className="w-full text-left p-3 rounded-lg border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-blue-700"
              >
                <div className="text-xs font-bold text-zinc-900 dark:text-white">
                  Simulate Inline Form Error
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                  aria-invalid="true" paired with role="alert"
                </div>
              </button>
            </div>

            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-xs text-blue-900 dark:text-blue-200 leading-normal">
              <strong>Alex's A11y Tip:</strong> Never overuse <code>aria-live="assertive"</code>. Interrupting a user mid-sentence causes disorientation. Reserve it solely for critical timeouts, security alerts, or destructive errors.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
