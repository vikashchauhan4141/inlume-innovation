'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate sending (replace with real API call)
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('sent');
  };

  if (status === 'sent') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#06315B] mb-2">Message Sent!</h3>
        <p className="text-gray-500 mb-6">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
        <button
          onClick={() => { setForm({ name: '', email: '', phone: '', subject: '', message: '' }); setStatus('idle'); }}
          className="px-6 py-3 bg-[#06315B] text-white rounded-xl font-semibold hover:bg-[#0a4f8a] transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  const inputClass = 'w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#06315B] focus:ring-2 focus:ring-[#06315B]/10 transition-all duration-200 text-sm';

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold text-[#06315B] mb-1.5 uppercase tracking-wide">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#06315B] mb-1.5 uppercase tracking-wide">
            Phone Number
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-xs font-semibold text-[#06315B] mb-1.5 uppercase tracking-wide">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#06315B] mb-1.5 uppercase tracking-wide">
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select a subject</option>
          <option value="product-enquiry">Product Enquiry</option>
          <option value="bulk-order">Bulk Order</option>
          <option value="custom-solution">Custom Solution</option>
          <option value="quote">Request a Quote</option>
          <option value="support">After-Sales Support</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-[#06315B] mb-1.5 uppercase tracking-wide">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell us about your project or requirements..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        id="contact-submit"
        disabled={status === 'sending'}
        className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 text-base"
      >
        {status === 'sending' ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
