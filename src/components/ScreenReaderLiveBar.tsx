import React from 'react';
import { Terminal, Volume2, VolumeX, Trash2, X } from 'lucide-react';
import { ScreenReaderLogEntry } from '../types/index.ts';

interface ScreenReaderLiveBarProps {
  logs: ScreenReaderLogEntry[];
  currentFocusText: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onClearLogs: () => void;
  onClose: () => void;
}

export const ScreenReaderLiveBar: React.FC<ScreenReaderLiveBarProps> = ({
  logs,
  currentFocusText,
  soundEnabled,
  onToggleSound,
  onClearLogs,
  onClose,
}) => {
  return (
    <aside
      role="region"
      aria-label="Screen Reader Live Announcement Inspector"
      className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 text-zinc-100 border-t-2 border-blue-600 shadow-2xl backdrop-blur-md px-4 py-3 sm:px-6 transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Active Focus / Announcement Status */}
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="p-2 bg-blue-900/60 rounded-md text-blue-300 shrink-0">
            <Terminal className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-400">
                A11y Tree Inspector
              </span>
              <span className="text-zinc-500" aria-hidden="true">·</span>
              <span className="text-xs text-zinc-400">
                {soundEnabled ? 'Speech Synth Active' : 'Muted'}
              </span>
            </div>
            <p className="text-sm font-mono text-emerald-400 truncate mt-0.5" title={currentFocusText}>
              {currentFocusText || 'Navigate using Tab or click interactive items to inspect'}
            </p>
          </div>
        </div>

        {/* Center: Latest aria-live notification if any */}
        {logs.length > 0 && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs font-mono max-w-md truncate">
            <span className="text-amber-400 font-semibold shrink-0">
              [aria-live]
            </span>
            <span className="text-zinc-300 truncate">
              {logs[logs.length - 1].message}
            </span>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <button
            type="button"
            onClick={onToggleSound}
            className={`p-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors focus-visible:outline-blue-500 ${
              soundEnabled
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
            aria-label={soundEnabled ? 'Mute speech synthesizer' : 'Enable speech synthesizer'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundEnabled ? 'Audio On' : 'Audio Off'}</span>
          </button>

          <button
            type="button"
            onClick={onClearLogs}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors focus-visible:outline-blue-500"
            aria-label="Clear inspection logs"
            title="Clear logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors focus-visible:outline-blue-500"
            aria-label="Close Screen Reader Live Announcement Inspector"
            title="Close dock"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
