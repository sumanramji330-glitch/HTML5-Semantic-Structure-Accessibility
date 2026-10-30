import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, AlertTriangle, ArrowRight, Layers, Sliders, ShieldCheck } from 'lucide-react';
import { Project } from '../types/index.ts';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onAnnounce?: (msg: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onAnnounce }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Interactive Mini Demo States
  const [transferAmount, setTransferAmount] = useState(250);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [selectedColor, setSelectedColor] = useState('Navy');
  const [cartCount, setCartCount] = useState(2);
  const [civicHouseholdIncome, setCivicHouseholdIncome] = useState('58500');
  const [civicHouseholdSize, setCivicHouseholdSize] = useState('4');
  const [civicIncomeError, setCivicIncomeError] = useState('');

  useEffect(() => {
    if (project) {
      const previouslyFocused = document.activeElement as HTMLElement | null;
      setTimeout(() => closeBtnRef.current?.focus(), 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
        if (e.key === 'Tab' && modalRef.current) {
          const focusables = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        previouslyFocused?.focus();
      };
    }
  }, [project, onClose]);

  if (!project) return null;

  const handleAdjustAmount = (delta: number) => {
    const next = Math.max(10, Math.min(2000, transferAmount + delta));
    setTransferAmount(next);
    if (onAnnounce) {
      onAnnounce(`Transfer amount adjusted to $${next}.00`);
    }
  };

  const handleBankingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTransferSuccess(true);
    if (onAnnounce) {
      onAnnounce(`Success: $${transferAmount}.00 transferred to Checking Account.`);
    }
    setTimeout(() => setTransferSuccess(false), 4000);
  };

  const handleAddToCart = () => {
    const nextCount = cartCount + 1;
    setCartCount(nextCount);
    if (onAnnounce) {
      onAnnounce(`Cart updated: ${selectedColor} shirt added. Total items: ${nextCount}`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-zinc-300 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col text-zinc-900 dark:text-zinc-100"
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-zinc-200 dark:border-slate-800 bg-zinc-50 dark:bg-slate-950 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">
              <span>Case Study</span>
              <span aria-hidden="true">·</span>
              <span>WCAG {project.wcagTarget} Conformance</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{project.category}</span>
            </div>
            <h2 id="case-study-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              {project.title}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              {project.subtitle}
            </p>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-slate-800 transition-colors focus-visible:outline-blue-700 shrink-0"
            aria-label="Close case study details"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-10 overflow-y-auto flex-grow">
          
          {/* Key Impact Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60">
            {project.impactMetrics.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-2xl font-extrabold text-blue-800 dark:text-blue-300 font-mono tabular-nums">
                  {item.metric}
                </div>
                <div className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Challenge and Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" aria-hidden="true" />
                <span>The Accessibility Challenge</span>
              </h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {project.keyChallenge}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
                <span>The Accessible Solution</span>
              </h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Interactive Live Mini-Component Demo */}
          <div className="border border-blue-200 dark:border-blue-900/80 rounded-xl p-6 bg-white dark:bg-slate-900 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                  Live Accessible Component Sandbox
                </h4>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Interactive verification
              </span>
            </div>

            {/* Banking Portal Mini Demo */}
            {project.liveDemoType === 'banking-stepper' && (
              <form onSubmit={handleBankingSubmit} className="space-y-4 max-w-lg mx-auto py-2">
                <div>
                  <label htmlFor="stepper-amount" className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                    Transfer Amount <span className="text-zinc-500 font-normal">(USD)</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleAdjustAmount(-25)}
                      className="px-3 py-2 border border-zinc-300 dark:border-slate-700 rounded-md font-bold text-lg hover:bg-zinc-100 dark:hover:bg-slate-800 focus-visible:outline-blue-700"
                      aria-label="Decrease transfer amount by 25 dollars"
                    >
                      −
                    </button>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-2.5 text-zinc-500 font-mono" aria-hidden="true">$</span>
                      <input
                        id="stepper-amount"
                        type="number"
                        min="10"
                        max="2000"
                        step="5"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-2 text-xl font-bold font-mono tabular-nums border border-zinc-300 dark:border-slate-700 rounded-md bg-zinc-50 dark:bg-slate-800 text-zinc-950 dark:text-white focus-visible:outline-blue-700"
                        aria-describedby="transfer-hint"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAdjustAmount(25)}
                      className="px-3 py-2 border border-zinc-300 dark:border-slate-700 rounded-md font-bold text-lg hover:bg-zinc-100 dark:hover:bg-slate-800 focus-visible:outline-blue-700"
                      aria-label="Increase transfer amount by 25 dollars"
                    >
                      +
                    </button>
                  </div>
                  <p id="transfer-hint" className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                    Use + and - buttons or enter digits. Limits: $10.00 to $2,000.00.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                    Remaining Daily Limit: <span className="font-semibold text-zinc-900 dark:text-white">$4,750.00</span>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md shadow-sm transition-colors focus-visible:outline-blue-700"
                  >
                    Execute Accessible Transfer
                  </button>
                </div>

                {transferSuccess && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-md text-emerald-800 dark:text-emerald-200 text-sm flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>Transaction confirmed: ${transferAmount}.00 transferred successfully.</span>
                  </div>
                )}
              </form>
            )}

            {/* E-Commerce Variant Mini Demo */}
            {project.liveDemoType === 'cart-drawer' && (
              <div className="space-y-4 max-w-lg mx-auto py-2">
                <fieldset className="border-0 p-0 m-0">
                  <legend className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                    Select Color Variant
                  </legend>
                  <div role="radiogroup" aria-label="Product color choices" className="flex gap-3">
                    {['Navy', 'Forest Green', 'Slate Black'].map((color) => (
                      <button
                        key={color}
                        type="button"
                        role="radio"
                        aria-checked={selectedColor === color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-md border text-xs font-semibold flex items-center gap-2 transition-colors focus-visible:outline-blue-700 ${
                          selectedColor === color
                            ? 'border-blue-700 bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-100 ring-2 ring-blue-700'
                            : 'border-zinc-300 dark:border-slate-700 hover:bg-zinc-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full ${
                            color === 'Navy' ? 'bg-blue-700' : color === 'Forest Green' ? 'bg-emerald-700' : 'bg-zinc-900'
                          }`}
                          aria-hidden="true"
                        />
                        <span>{color}</span>
                        {selectedColor === color && <span className="sr-only">(Selected)</span>}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-slate-800">
                  <div className="text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">Cart status: </span>
                    <span className="font-bold font-mono text-zinc-900 dark:text-white" aria-live="polite">
                      {cartCount} items ($185.00)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors focus-visible:outline-blue-700"
                  >
                    Add {selectedColor} to Cart
                  </button>
                </div>
              </div>
            )}

            {/* Civic Connect Mini Demo */}
            {project.liveDemoType === 'form-feedback' && (
              <div className="space-y-4 max-w-lg mx-auto py-2">
                <div>
                  <label htmlFor="civic-income-demo" className="block text-sm font-semibold text-zinc-900 dark:text-white mb-1">
                    Annual Household Gross Income <span className="text-red-600" aria-hidden="true">*</span>
                    <span className="sr-only">(Required)</span>
                  </label>
                  <p id="income-descriptor" className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">
                    Enter your total pre-tax earnings for the previous fiscal year.
                  </p>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-zinc-500 font-mono" aria-hidden="true">$</span>
                    <input
                      id="civic-income-demo"
                      type="number"
                      value={civicHouseholdIncome}
                      aria-required="true"
                      aria-describedby={`income-descriptor ${civicIncomeError ? 'income-error-msg' : ''}`}
                      aria-invalid={civicIncomeError ? 'true' : 'false'}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCivicHouseholdIncome(val);
                        if (Number(val) < 0) {
                          setCivicIncomeError('Income cannot be negative.');
                        } else {
                          setCivicIncomeError('');
                        }
                      }}
                      className="w-full pl-8 pr-4 py-2 text-sm font-mono border border-zinc-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 focus-visible:outline-blue-700"
                    />
                  </div>
                  {civicIncomeError && (
                    <p id="income-error-msg" role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{civicIncomeError}</span>
                    </p>
                  )}
                </div>

                <div className="p-3 rounded-md bg-zinc-100 dark:bg-slate-800 text-xs text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                  <span>Eligible Assistance Tier:</span>
                  <span className="font-bold text-blue-700 dark:text-blue-400 font-mono">
                    Tier 2 (Full Grant Status)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* WCAG Criteria Conformance Table */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-zinc-950 dark:text-white">
              Targeted WCAG 2.2 Success Criteria
            </h3>
            <div className="overflow-x-auto border border-zinc-200 dark:border-slate-800 rounded-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-100 dark:bg-slate-800 text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-slate-800 text-xs font-semibold uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3">Criterion</th>
                    <th scope="col" className="px-4 py-3">Name</th>
                    <th scope="col" className="px-4 py-3">Level</th>
                    <th scope="col" className="px-4 py-3">Audit Remediation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-slate-800">
                  {project.wcagCriteria.map((c, i) => (
                    <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-slate-800/40">
                      <td className="px-4 py-3 font-mono font-bold text-blue-700 dark:text-blue-400 text-xs">
                        {c.code}
                      </td>
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">
                        {c.name}
                      </td>
                      <td className="px-4 py-3 text-xs font-mono font-bold">
                        <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-slate-700 text-zinc-800 dark:text-zinc-200">
                          {c.level}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400">
                        {c.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Code Comparison: Inaccessible Div-Soup vs Semantic Implementation */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-zinc-950 dark:text-white">
              Code Architecture: Anti-Pattern vs Semantic Standard
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inaccessible */}
              <div className="border border-red-200 dark:border-red-900/60 rounded-xl overflow-hidden bg-red-50/20 dark:bg-red-950/20">
                <div className="px-4 py-2.5 bg-red-100/70 dark:bg-red-950/70 border-b border-red-200 dark:border-red-900 text-xs font-semibold text-red-900 dark:text-red-300 flex items-center justify-between">
                  <span>{project.codeComparison.inaccessibleTitle}</span>
                  <span className="font-mono text-red-700 dark:text-red-400">FAILS WCAG</span>
                </div>
                <pre className="p-4 text-xs font-mono text-zinc-800 dark:text-zinc-200 overflow-x-auto whitespace-pre">
                  <code>{project.codeComparison.inaccessibleCode}</code>
                </pre>
                <div className="p-3 bg-white dark:bg-slate-900 text-xs text-zinc-600 dark:text-zinc-400 border-t border-red-100 dark:border-red-900/40">
                  {project.codeComparison.inaccessibleExplanation}
                </div>
              </div>

              {/* Accessible */}
              <div className="border border-emerald-200 dark:border-emerald-900/60 rounded-xl overflow-hidden bg-emerald-50/20 dark:bg-emerald-950/20">
                <div className="px-4 py-2.5 bg-emerald-100/70 dark:bg-emerald-950/70 border-b border-emerald-200 dark:border-emerald-900 text-xs font-semibold text-emerald-900 dark:text-emerald-300 flex items-center justify-between">
                  <span>{project.codeComparison.accessibleTitle}</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400">PASSES AAA</span>
                </div>
                <pre className="p-4 text-xs font-mono text-zinc-800 dark:text-zinc-200 overflow-x-auto whitespace-pre">
                  <code>{project.codeComparison.accessibleCode}</code>
                </pre>
                <div className="p-3 bg-white dark:bg-slate-900 text-xs text-zinc-600 dark:text-zinc-400 border-t border-emerald-100 dark:border-emerald-900/40">
                  {project.codeComparison.accessibleExplanation}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-zinc-200 dark:border-slate-800 bg-zinc-50 dark:bg-slate-950 flex items-center justify-between shrink-0">
          <div className="text-xs text-zinc-600 dark:text-zinc-400">
            Press <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-slate-800 rounded font-mono">ESC</kbd> to return to projects
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-slate-800 rounded-lg transition-colors focus-visible:outline-blue-700"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
