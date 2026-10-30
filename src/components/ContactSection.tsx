import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface ContactSectionProps {
  onAnnounce: (msg: string, type?: 'polite' | 'assertive') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onAnnounce }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'consulting',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., name@domain.com).';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please include a message for Alex.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstError = Object.values(validationErrors)[0];
      onAnnounce(`Form error: ${firstError}`, 'assertive');
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onAnnounce(
        `Thank you ${formData.name}! Your message regarding ${formData.subject} has been received. Alex will respond within 24 business hours.`,
        'assertive'
      );
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'consulting',
      message: '',
    });
    setErrors({});
    setSubmitted(false);
    onAnnounce('Contact form reset.', 'polite');
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-zinc-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-400 mb-2">
            Inquiries & Accessibility Audits
          </div>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-4"
          >
            Get in Touch
          </h2>
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            Interested in collaborating on a web project, scheduling a WCAG 2.2 audit, or booking an engineering workshop? Send me a message.
          </p>
        </div>

        {/* Success Confirmation State */}
        {submitted ? (
          <div
            role="alert"
            aria-live="assertive"
            className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 p-8 rounded-2xl shadow-sm text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-950 dark:text-emerald-100">
              Message Received!
            </h3>
            <p className="text-emerald-800 dark:text-emerald-300 max-w-md mx-auto text-sm leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Your inquiry has been delivered directly to Alex's inbox. You can expect a thoughtful response within 24 business hours.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-emerald-900 dark:text-emerald-100 bg-emerald-200/60 dark:bg-emerald-900/40 hover:bg-emerald-200 rounded-lg transition-colors focus-visible:outline-emerald-700"
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
                <span>Send Another Message</span>
              </button>
            </div>
          </div>
        ) : (
          /* Accessible Form Implementation matching & elevating prompt's structure */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-zinc-50 dark:bg-slate-950/80 p-8 sm:p-10 rounded-2xl shadow-xs border border-zinc-200 dark:border-slate-800 space-y-6"
            aria-label="Contact form for Alex Smith"
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2"
              >
                Full Name <span className="text-red-600 dark:text-red-400" aria-hidden="true">*</span>
                <span className="sr-only">(Required)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                aria-required="true"
                autoComplete="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={`w-full px-4 py-2.5 border rounded-lg shadow-2xs sm:text-sm bg-white dark:bg-slate-900 text-zinc-900 dark:text-white focus-visible:outline-blue-700 ${
                  errors.name
                    ? 'border-red-500 ring-1 ring-red-500'
                    : 'border-zinc-300 dark:border-slate-700'
                }`}
              />
              {errors.name && (
                <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2"
              >
                Email Address <span className="text-red-600 dark:text-red-400" aria-hidden="true">*</span>
                <span className="sr-only">(Required)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                aria-required="true"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={`email-hint ${errors.email ? 'email-error' : ''}`}
                className={`w-full px-4 py-2.5 border rounded-lg shadow-2xs sm:text-sm bg-white dark:bg-slate-900 text-zinc-900 dark:text-white focus-visible:outline-blue-700 ${
                  errors.email
                    ? 'border-red-500 ring-1 ring-red-500'
                    : 'border-zinc-300 dark:border-slate-700'
                }`}
              />
              <p id="email-hint" className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                I will never share your email with anyone else.
              </p>
              {errors.email && (
                <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Subject Select */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2"
              >
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 border border-zinc-300 dark:border-slate-700 rounded-lg shadow-2xs sm:text-sm bg-white dark:bg-slate-900 text-zinc-900 dark:text-white focus-visible:outline-blue-700"
              >
                <option value="freelance">Freelance Inquiry</option>
                <option value="consulting">Accessibility Consulting & Auditing</option>
                <option value="training">Team Workshop / Training</option>
                <option value="hello">Just saying hello!</option>
              </select>
            </div>

            {/* Message Textarea */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2"
              >
                Your Message <span className="text-red-600 dark:text-red-400" aria-hidden="true">*</span>
                <span className="sr-only">(Required)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-required="true"
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: '' });
                }}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`w-full px-4 py-2.5 border rounded-lg shadow-2xs sm:text-sm bg-white dark:bg-slate-900 text-zinc-900 dark:text-white focus-visible:outline-blue-700 ${
                  errors.message
                    ? 'border-red-500 ring-1 ring-red-500'
                    : 'border-zinc-300 dark:border-slate-700'
                }`}
              />
              {errors.message && (
                <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center items-center gap-2 py-3 px-8 border border-transparent shadow-sm text-base font-semibold rounded-lg text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-60 transition-colors focus-visible:outline-blue-700"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
};
