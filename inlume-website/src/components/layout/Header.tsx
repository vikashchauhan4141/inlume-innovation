'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaWhatsapp, FaPhoneAlt, FaFileDownload, FaCheckCircle } from 'react-icons/fa';
import { siteConfig } from '@/config/site';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="relative h-12 w-44 sm:h-14 sm:w-52 md:h-16 md:w-60">
              <Image
                src="/logo-transparent.png"
                alt="Inlume Innovations Logo"
                fill
                className="object-contain object-left"
                priority
                sizes="240px"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${pathname === link.href
                    ? 'text-[#06315B]'
                    : 'text-gray-600 hover:text-[#06315B]'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {/* IndiaMart Badge (Desktop) - Authentic Design */}
            <a
              href={siteConfig.links.indiamart}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-all shadow-sm group"
              title="View our verified IndiaMart catalog"
            >
              <FaCheckCircle className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-gray-500 leading-none uppercase tracking-wider mb-0.5">Verified Supplier</span>
                <div className="flex items-center font-black text-[13px] leading-none">
                  <span className="text-[#E31E24] italic">india</span>
                  <span className="text-[#012F6C] italic">mart</span>
                </div>
              </div>
            </a>

            <a
              href="/docs/Inlume-Innovations-Brochure.pdf"
              download="Inlume-Innovations-Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-all duration-300 shadow-xs hover:shadow-amber-500/20"
              title="Download Inlume Innovations Product Brochure PDF"
            >
              <FaFileDownload className="w-3.5 h-3.5 text-slate-950" />
              Brochure
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#06315B] hover:bg-[#0a4f8a] text-white font-semibold text-sm rounded-lg transition-all duration-300 shadow-xs hover:shadow-blue-900/20"
            >
              <FaPhoneAlt className="w-3.5 h-3.5 text-amber-400" />
              Call {siteConfig.phone}
            </a>
          </div>

          {/* Mobile Actions (IndiaMart + Hamburger) */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={siteConfig.links.indiamart}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg shadow-xs active:bg-slate-100 transition-colors"
              title="Verified on IndiaMart"
            >
              <FaCheckCircle className="w-3 h-3 text-green-500" />
              <div className="flex flex-col">
                <div className="flex items-center font-black text-[11px] leading-none">
                  <span className="text-[#E31E24] italic">india</span>
                  <span className="text-[#012F6C] italic">mart</span>
                </div>
              </div>
            </a>

            <button
              id="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${pathname === link.href
                    ? 'text-[#06315B] bg-blue-50'
                    : 'text-gray-700 hover:text-[#06315B] hover:bg-gray-50'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              <a
                href="/docs/Inlume-Innovations-Brochure.pdf"
                download="Inlume-Innovations-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors shadow-xs"
              >
                <FaFileDownload className="w-4 h-4 text-slate-950" />
                Download Brochure (PDF)
              </a>
              <a
                href={`${siteConfig.links.whatsappBase}?text=Hi%20Inlume%20Innovations%2C%20I%20would%20like%20to%20inquire%20about%20your%20LED%20lighting%20products.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl transition-colors"
              >
                <FaWhatsapp className="w-5 h-5 text-white" />
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#06315B] hover:bg-[#0a4f8a] text-white font-semibold rounded-xl transition-colors"
              >
                <FaPhoneAlt className="w-4 h-4 text-amber-400" />
                Call {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
