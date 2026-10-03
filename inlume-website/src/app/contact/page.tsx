import type { Metadata } from 'next';
import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Inlume Innovations for product enquiries, bulk orders, or custom LED lighting solutions. Email, phone, and contact form available.',
  alternates: {
    canonical: 'https://www.inlumeinnovations.com/contact',
  },
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
                    icon: <FaMapMarkerAlt className="w-5 h-5" />,
                    label: 'Address',
                    value: siteConfig.address,
                    href: siteConfig.mapUrl,
                    isExternal: true,
                  },
                  {
                    icon: <FaEnvelope className="w-5 h-5" />,
                    label: 'Email',
                    value: siteConfig.email,
                    href: `mailto:${siteConfig.email}`,
                    isExternal: false,
                  },
                  {
                    icon: <FaPhoneAlt className="w-5 h-5" />,
                    label: 'Phone',
                    value: siteConfig.phone,
                    href: `tel:${siteConfig.phone}`,
                    isExternal: false,
                  },
                  {
                    icon: <FaLinkedin className="w-5 h-5 text-[#0A66C2]" />,
                    label: 'LinkedIn',
                    value: siteConfig.name,
                    href: siteConfig.links.linkedin,
                    isExternal: true,
                  },
                  {
                    icon: <FaInstagram className="w-5 h-5 text-[#E4405F]" />,
                    label: 'Instagram',
                    value: '@inlumeinnovations',
                    href: siteConfig.links.instagram,
                    isExternal: true,
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#06315B] text-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                      <p className="font-semibold text-[#06315B] group-hover:text-amber-600 transition-colors text-sm sm:text-base leading-snug">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Additional Info */}
              <div className="bg-[#06315B]/5 rounded-2xl p-6 border border-[#06315B]/10">
                <h3 className="font-bold text-[#06315B] mb-3">Business Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium text-[#06315B]">GST No:</span> {siteConfig.businessDetails.gstNo}</p>
                  <p><span className="font-medium text-[#06315B]">Warranty:</span> {siteConfig.businessDetails.warranty} on all products</p>
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
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0A66C2]/10 border border-[#0A66C2]/30 text-[#0A66C2] text-xs font-semibold rounded-lg hover:bg-[#0A66C2] hover:text-white transition-colors">
                    <FaLinkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                  <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E4405F]/10 border border-[#E4405F]/30 text-[#E4405F] text-xs font-semibold rounded-lg hover:bg-[#E4405F] hover:text-white transition-colors">
                    <FaInstagram className="w-3.5 h-3.5" />
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Interactive Google Map Location */}
            <div className="lg:col-span-3">
              <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                  <div>
                    <h2 className="text-2xl font-bold text-[#06315B]">Our Office Location</h2>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {siteConfig.address}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={siteConfig.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-colors whitespace-nowrap shadow-xs"
                    >
                      Open in Maps
                    </a>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#06315B] text-white text-xs font-bold rounded-xl hover:bg-[#0a4f8a] transition-colors whitespace-nowrap shadow-xs"
                    >
                      Call {siteConfig.phone}
                    </a>
                  </div>
                </div>

                {/* Responsive Google Maps Embed pinned at 28.4909008, 77.5096278 */}
                <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-md">
                  <iframe
                    title="Inlume Innovations Office Location Map - Gamma II, Greater Noida"
                    src="https://maps.google.com/maps?q=28.4909008,77.5096278&hl=en&z=16&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale-[0.1] hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
