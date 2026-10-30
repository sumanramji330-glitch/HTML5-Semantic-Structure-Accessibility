import React, { useState } from 'react';
import { BookOpen, ArrowUpRight, X } from 'lucide-react';
import { ARTICLES } from '../data/portfolioData.ts';
import { Article } from '../types/index.ts';

export const ArticlesSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section
      id="case-studies"
      aria-labelledby="articles-heading"
      className="py-16 lg:py-24 bg-zinc-50 dark:bg-slate-950/60 border-b border-zinc-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-400 mb-2">
            Technical Publications & Articles
          </div>
          <h2
            id="articles-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white"
          >
            Insights on Semantic HTML & Assistive Traversal
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Writing deeply grounded in browser DOM specifications, WAI-ARIA authoring practices, and daily testing on real screen readers.
          </p>
        </div>

        {/* Articles List with clean unboxed metadata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:border-zinc-300 dark:hover:border-slate-700 transition-all hover:shadow-md"
              aria-labelledby={`article-${article.id}-title`}
            >
              <div className="space-y-3">
                {/* Clean unboxed metadata with typographic separators */}
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  <span>{article.topic}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.date}</span>
                </div>

                <h3
                  id={`article-${article.id}-title`}
                  className="text-lg font-bold text-zinc-950 dark:text-white leading-snug"
                >
                  {article.title}
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-100 dark:border-slate-800/80 mt-6 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">
                  {article.date}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 hover:underline underline-offset-4 focus-visible:outline-blue-700"
                  aria-label={`Read summary for ${article.title}`}
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Selected Article Modal */}
        {selectedArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            role="presentation"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedArticle(null);
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="article-detail-title"
              className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-zinc-300 dark:border-slate-700 rounded-xl shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto text-zinc-900 dark:text-zinc-100"
            >
              <div className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-slate-800 pb-4 mb-6">
                <div>
                  <div className="text-xs text-blue-700 dark:text-blue-400 font-semibold mb-1">
                    {selectedArticle.topic} · {selectedArticle.readTime}
                  </div>
                  <h3 id="article-detail-title" className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white">
                    {selectedArticle.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-slate-800 focus-visible:outline-blue-700"
                  aria-label="Close article modal"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="prose dark:prose-invert text-sm space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <p className="text-base font-medium text-zinc-900 dark:text-white">
                  {selectedArticle.summary}
                </p>
                <p>
                  In this published guide, Alex analyzes why developers frequently mistake ARIA attributes as an accessibility cure-all. In reality, the W3C states the First Rule of ARIA: "If you can use a native HTML element or attribute with the semantics and behaviour you require already built-in, then do so."
                </p>
                <div className="p-4 rounded-lg bg-zinc-100 dark:bg-slate-800 border-l-4 border-blue-600 text-xs font-mono">
                  &lt;!-- Native Button: Inherits Space, Enter, Tab, role="button", and disabled handling --&gt;<br />
                  &lt;button type="button" onClick=&#123;handleClick&#125;&gt;Execute Action&lt;/button&gt;
                </div>
                <p>
                  When you instead build a <code>&lt;div onclick="..."&gt;</code>, you must manually recreate:
                  tabindex, keydown handlers for Enter and Space, role="button", aria-disabled, and focus management across DOM re-renders. Almost every custom implementation misses at least one critical keyboard or screen-reader behavior.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors focus-visible:outline-blue-700"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
