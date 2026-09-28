'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

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
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="relative h-10 w-36 md:h-12 md:w-44">
              <Image
                src="/LOGO.jpeg"
                alt="Inlume Innovations Logo"
                fill
                className="object-contain mix-blend-multiply"
                priority
                sizes="176px"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-[#06315B]'
                    : 'text-gray-600 hover:text-[#06315B]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/918368690828?text=Hi%20Inlume%20Innovations%2C%20I%20would%20like%20to%20inquire%20about%20your%20LED%20lighting%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm rounded-lg transition-all duration-300 shadow-xs hover:shadow-emerald-500/20"
            >
              <FaWhatsapp className="w-4 h-4 text-white" />
              WhatsApp
            </a>
            <a
              href="tel:+918368690828"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#06315B] hover:bg-[#0a4f8a] text-white font-semibold text-sm rounded-lg transition-all duration-300 shadow-xs"
            >
              <FaPhoneAlt className="w-3.5 h-3.5 text-amber-400" />
              Call Us
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === link.href
                    ? 'text-[#06315B] bg-blue-50'
                    : 'text-gray-700 hover:text-[#06315B] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              <a
                href="https://wa.me/918368690828?text=Hi%20Inlume%20Innovations%2C%20I%20would%20like%20to%20inquire%20about%20your%20LED%20lighting%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl transition-colors"
              >
                <FaWhatsapp className="w-5 h-5 text-white" />
                Chat on WhatsApp
              </a>
              <a
                href="tel:+918368690828"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#06315B] hover:bg-[#0a4f8a] text-white font-semibold rounded-xl transition-colors"
              >
                <FaPhoneAlt className="w-4 h-4 text-amber-400" />
                Call +91 8368690828
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
