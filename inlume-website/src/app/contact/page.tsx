import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Inlume Innovations for product enquiries, bulk orders, or custom LED lighting solutions. Email, phone, and contact form available.',
};

export default function ContactPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-24 pb-14 bg-gradient-to-br from-[#06315B] via-[#0a4f8a] to-[#041f3a] relative overflow-hidden">
        <div className="absolute inset-0 section-dots opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-white/60 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">Contact</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Get In <span className="text-amber-400">Touch</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Have questions about our products? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left: Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#06315B] mb-8">Contact Information</h2>
              <div className="space-y-6 mb-10">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    label: 'Email',
                    value: 'inlumeinnovations@gmail.com',
                    href: 'mailto:inlumeinnovations@gmail.com',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                    label: 'Phone',
                    value: '+91 8368690828',
                    href: 'tel:+918368690828',
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#06315B] text-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                      <p className="font-semibold text-[#06315B] group-hover:text-amber-600 transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Additional Info */}
              <div className="bg-[#06315B]/5 rounded-2xl p-6 border border-[#06315B]/10">
                <h3 className="font-bold text-[#06315B] mb-3">Business Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium text-[#06315B]">GST No:</span> 09CXKPD4992D1Z8</p>
                  <p><span className="font-medium text-[#06315B]">Warranty:</span> 2 Years on all products</p>
                  <p><span className="font-medium text-[#06315B]">Note:</span> GST 18% extra on all orders</p>
                  <p><span className="font-medium text-[#06315B]">Shipping:</span> Transportation charges extra</p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-3">Quick Links</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/products" className="px-3 py-1.5 bg-white border border-gray-200 text-[#06315B] text-xs font-medium rounded-lg hover:bg-[#06315B] hover:text-white hover:border-[#06315B] transition-colors">
                    Browse Products
                  </Link>
                  <Link href="/about" className="px-3 py-1.5 bg-white border border-gray-200 text-[#06315B] text-xs font-medium rounded-lg hover:bg-[#06315B] hover:text-white hover:border-[#06315B] transition-colors">
                    About Us
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="bg-[#f8fafc] rounded-3xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#06315B] mb-2">Send Us a Message</h2>
                <p className="text-gray-500 text-sm mb-8">
                  Fill in the form below and our team will get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
