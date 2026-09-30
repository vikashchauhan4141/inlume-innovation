import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';

const footerLinks = {
  company: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Products', href: '/products' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Download Brochure (PDF)', href: '/docs/Inlume-Innovations-Brochure.pdf', isDownload: true },
  ],
  products: [
    { label: 'LED Street Lights', href: '/products?category=street-light' },
    { label: 'RGB Flood Lights', href: '/products?category=rgb-flood-light' },
    { label: 'DOB Flood Lights', href: '/products?category=dob-flood-light' },
    { label: 'Well Glass Lights', href: '/products?category=well-glass-light' },
    { label: 'LED High Way Lights', href: '/products?category=high-way-light' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#041f3a] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <div className="relative h-12 w-48 bg-white px-3.5 py-2 rounded-xl shadow-md border border-white/20 flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo-transparent.png"
                  alt="Inlume Innovations Logo"
                  width={160}
                  height={42}
                  className="object-contain max-h-full w-auto h-auto"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Delivering premium LED lighting solutions that illuminate every space with efficiency, durability, and innovation.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mb-6">
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Inlume Innovations LinkedIn Page"
                className="w-10 h-10 rounded-xl bg-[#0A66C2]/15 border border-[#0A66C2]/30 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-300 shadow-xs group"
                title="Connect on LinkedIn"
              >
                <FaLinkedin className="w-5 h-5 transition-transform group-hover:scale-110" />
              </a>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Inlume Innovations Instagram Page"
                className="w-10 h-10 rounded-xl bg-[#E4405F]/15 border border-[#E4405F]/30 flex items-center justify-center text-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-all duration-300 shadow-xs group"
                title="Follow on Instagram"
              >
                <FaInstagram className="w-5 h-5 transition-transform group-hover:scale-110" />
              </a>
              <a
                href={`${siteConfig.links.whatsappBase}?text=Hi%20Inlume%20Innovations%2C%20I%20would%20like%20to%20get%20more%20information.`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Inlume Innovations WhatsApp"
                className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-xs group"
                title="Chat on WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5 transition-transform group-hover:scale-110" />
              </a>
            </div>


            <div className="flex items-center gap-2 mt-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-semibold text-white">
                2 Year Warranty <span className="text-gray-400 font-normal">on all products</span>
              </span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  {link.isDownload ? (
                    <a
                      href={link.href}
                      download="Inlume-Innovations-Brochure.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Address</p>
                  <a
                    href={siteConfig.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-amber-400 text-sm transition-colors block leading-snug"
                  >
                    {siteConfig.addressShort}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-gray-300 hover:text-amber-400 text-sm transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                  <a href={`tel:${siteConfig.phone}`} className="text-gray-300 hover:text-amber-400 text-sm transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              </li>


              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">GST No.</p>
                  <span className="text-gray-300 text-sm">{siteConfig.businessDetails.gstNo}</span>
                </div>
              </li>
            </ul>

            {/* IndiaMart Trust Badge - Authentic */}
            <div className="mt-8">
              <a
                href={siteConfig.links.indiamart}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-50 border border-white/20 rounded-xl transition-all duration-300 group shadow-md"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-bold text-gray-500 leading-none uppercase tracking-wider mb-1">Verified Supplier On</span>
                  <div className="flex items-center font-black text-xl leading-none">
                    <span className="text-[#E31E24] italic">india</span>
                    <span className="text-[#012F6C] italic">mart</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Inlume Innovations. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Powered by</span>
            <span className="text-amber-400 text-sm font-semibold">LED Innovation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
