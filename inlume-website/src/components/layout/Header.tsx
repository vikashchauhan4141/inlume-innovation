'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaCheckCircle,
  FaChevronDown,
  FaDownload,
  FaBook,
} from 'react-icons/fa';
import { siteConfig } from '@/config/site';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/catalogues', label: 'Catalogues' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];


const catalogues = [
  {
    id: 'flood',
    label: 'Flood Lighting',
    desc: 'High-power flood & area lights',
    file: '/docs/INLUME_Flood_Lighting_Catalogue.pdf',
    tag: 'FL',
    accentColor: '#f97316',
    hoverBg: '#fff7ed',
    hoverBorder: '#fed7aa',
    hoverText: '#c2410c',
    tagBg: 'rgba(249,115,22,0.12)',
  },
  {
    id: 'indoor',
    label: 'Indoor Lighting',
    desc: 'Panel, downlight & office range',
    file: '/docs/INLUME_Indoor_Lighting_Catalogue.pdf',
    tag: 'IN',
    accentColor: '#3b82f6',
    hoverBg: '#eff6ff',
    hoverBorder: '#bfdbfe',
    hoverText: '#1d4ed8',
    tagBg: 'rgba(59,130,246,0.12)',
  },
  {
    id: 'interior',
    label: 'Interior Lighting',
    desc: 'Decor & architectural lighting',
    file: '/docs/INLUME_Interior_Lighting_Catalogue_.pdf',
    tag: 'IT',
    accentColor: '#a855f7',
    hoverBg: '#fdf4ff',
    hoverBorder: '#e9d5ff',
    hoverText: '#7e22ce',
    tagBg: 'rgba(168,85,247,0.12)',
  },
  {
    id: 'general',
    label: 'Lights Catalogue',
    desc: 'Full product range overview',
    file: '/docs/INLUME_Lights_Catalogue.pdf',
    tag: 'LC',
    accentColor: '#14b8a6',
    hoverBg: '#f0fdfa',
    hoverBorder: '#99f6e4',
    hoverText: '#0f766e',
    tagBg: 'rgba(20,184,166,0.12)',
  },
  {
    id: 'street',
    label: 'Street Lighting',
    desc: 'Road, highway & outdoor lights',
    file: '/docs/INLUME_Street_Lighting_Catalogue.pdf',
    tag: 'ST',
    accentColor: '#22c55e',
    hoverBg: '#f0fdf4',
    hoverBorder: '#bbf7d0',
    hoverText: '#15803d',
    tagBg: 'rgba(34,197,94,0.12)',
  },
  {
    id: 'solar-street',
    label: 'Solar Street Lighting',
    desc: 'Solar-powered street & outdoor lights',
    file: '/docs/INLUME_Solar_Street_Lighting_Catalogue.pdf',
    tag: 'SS',
    accentColor: '#0ea5e9',
    hoverBg: '#f0f9ff',
    hoverBorder: '#bae6fd',
    hoverText: '#0369a1',
    tagBg: 'rgba(14,165,233,0.12)',
  },
  {
    id: 'supermodel',
    label: 'Super Model',
    desc: 'Premium & signature collection',
    file: '/docs/INLUME_Super_Model_Catalogue .pdf',
    tag: 'SM',
    accentColor: '#eab308',
    hoverBg: '#fefce8',
    hoverBorder: '#fde68a',
    hoverText: '#a16207',
    tagBg: 'rgba(234,179,8,0.12)',
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);
  const [isMobileCatalogueOpen, setIsMobileCatalogueOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCatalogueOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCatalogueOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => setDownloadingId(null), 2200);
  };

  return (
    <>
      {isCatalogueOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: 'rgba(0,0,0,0.08)', backdropFilter: 'blur(1px)' }}
          onClick={() => setIsCatalogueOpen(false)}
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 transition-all duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
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
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    pathname === link.href ? 'text-[#06315B]' : 'text-gray-600 hover:text-[#06315B]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              {/* IndiaMart Badge */}
              <a
                href={siteConfig.links.indiamart}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-all shadow-sm group"
                title="View our verified IndiaMart catalog"
              >
                <FaCheckCircle className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-gray-500 leading-none uppercase tracking-wider mb-0.5">
                    Verified Supplier
                  </span>
                  <div className="flex items-center font-black text-[13px] leading-none">
                    <span className="text-[#E31E24] italic">india</span>
                    <span className="text-[#012F6C] italic">mart</span>
                  </div>
                </div>
              </a>

              {/* Catalogue Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  id="catalogue-dropdown-btn"
                  onClick={() => setIsCatalogueOpen(!isCatalogueOpen)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 font-bold text-xs sm:text-sm rounded-lg transition-all duration-300 select-none border ${
                    isCatalogueOpen
                      ? 'bg-amber-400 text-slate-900 shadow-lg border-amber-400'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm hover:shadow-amber-400/40 hover:shadow-md border-amber-500'
                  }`}
                  aria-expanded={isCatalogueOpen}
                >
                  <FaBook className="w-3.5 h-3.5 flex-shrink-0" />
                  Catalogue
                  <FaChevronDown
                    className={`w-3 h-3 flex-shrink-0 transition-transform duration-300 ${isCatalogueOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Panel */}
                {isCatalogueOpen && (
                  <div
                    className="absolute top-full right-0 mt-3 z-50"
                    style={{ animation: 'catalogueDropIn 0.25s cubic-bezier(0.16,1,0.3,1) both' }}
                  >
                    {/* Caret */}
                    <div
                      className="absolute -top-[7px] right-[22px] w-3.5 h-3.5 rotate-45 bg-[#06315B]"
                      style={{ borderRadius: '2px 0 0 0' }}
                    />

                    <div
                      className="w-[340px] rounded-2xl overflow-hidden"
                      style={{
                        boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(0,0,0,0.08)',
                      }}
                    >
                      {/* Header bar */}
                      <div
                        className="px-4 py-3 flex items-center gap-3"
                        style={{ background: 'linear-gradient(135deg, #06315B 0%, #0a4f8a 100%)' }}
                      >
                        <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                          <FaDownload className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm leading-tight">Download Catalogue</p>
                          <p className="text-blue-200 text-xs mt-0.5">Select your lighting category</p>
                        </div>
                        <div className="ml-auto">
                          <span className="text-[10px] font-semibold text-blue-200 bg-white/10 px-2 py-0.5 rounded-full">
                            {catalogues.length} PDFs
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="bg-white p-2">
                        {catalogues.map((cat) => {
                          const isHovered = hoveredId === cat.id;
                          const isDownloading = downloadingId === cat.id;
                          return (
                            <a
                              key={cat.id}
                              href={cat.file}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => handleDownload(cat.id)}
                              onMouseEnter={() => setHoveredId(cat.id)}
                              onMouseLeave={() => setHoveredId(null)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 last:mb-0 cursor-pointer transition-all duration-200"
                              style={{
                                background: isHovered ? cat.hoverBg : 'transparent',
                                border: `1px solid ${isHovered ? cat.hoverBorder : 'transparent'}`,
                              }}
                            >
                              {/* Color accent tag */}
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 font-black text-xs tracking-wider"
                                style={{
                                  background: isHovered ? cat.accentColor : cat.tagBg,
                                  color: isHovered ? '#fff' : cat.accentColor,
                                  letterSpacing: '0.05em',
                                  boxShadow: isHovered ? `0 4px 14px ${cat.accentColor}55` : 'none',
                                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                }}
                              >
                                {cat.tag}
                              </div>

                              {/* Text */}
                              <div className="flex-1 min-w-0">
                                <p
                                  className="font-semibold text-sm leading-tight truncate transition-colors duration-150"
                                  style={{ color: isHovered ? cat.hoverText : '#1e293b' }}
                                >
                                  {cat.label}
                                </p>
                                <p className="text-gray-500 text-xs mt-0.5 truncate">{cat.desc}</p>
                              </div>

                              {/* Download pill */}
                              <div
                                className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 text-[10px] font-semibold"
                                style={{
                                  background: isHovered ? cat.accentColor : '#f1f5f9',
                                  color: isHovered ? '#fff' : '#94a3b8',
                                  boxShadow: isHovered ? `0 2px 8px ${cat.accentColor}44` : 'none',
                                }}
                              >
                                {isDownloading ? (
                                  <svg className="w-3 h-3 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15 3.293 9.879a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                ) : (
                                  <FaDownload className="w-2.5 h-2.5" />
                                )}
                                <span>{isDownloading ? 'Saved!' : 'PDF'}</span>
                              </div>
                            </a>
                          );
                        })}
                      </div>

                      {/* Footer */}
                      <div className="bg-slate-50 border-t border-slate-100 px-4 py-2 flex items-center gap-2">
                        <span className="text-[10px] text-slate-400">📄</span>
                        <p className="text-[11px] text-slate-400">All catalogues are in PDF format · Click to download</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Call Button */}
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#06315B] hover:bg-[#0a4f8a] text-white font-semibold text-sm rounded-lg transition-all duration-300 shadow-xs hover:shadow-blue-900/20"
              >
                <FaPhoneAlt className="w-3.5 h-3.5 text-amber-400" />
                Call {siteConfig.phone}
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href={siteConfig.links.indiamart}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg shadow-xs active:bg-slate-100 transition-colors"
                title="Verified on IndiaMart"
              >
                <FaCheckCircle className="w-3 h-3 text-green-500" />
                <div className="flex items-center font-black text-[11px] leading-none">
                  <span className="text-[#E31E24] italic">india</span>
                  <span className="text-[#012F6C] italic">mart</span>
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
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    pathname === link.href ? 'text-[#06315B] bg-blue-50' : 'text-gray-700 hover:text-[#06315B] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-2 space-y-2">
                {/* Mobile Catalogue Accordion */}
                <div className="rounded-xl overflow-hidden border border-amber-200">
                  <button
                    id="mobile-catalogue-btn"
                    onClick={() => setIsMobileCatalogueOpen(!isMobileCatalogueOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 bg-amber-500 text-slate-950 font-bold text-sm active:bg-amber-600 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FaBook className="w-4 h-4" />
                      Download Catalogue
                    </div>
                    <FaChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${isMobileCatalogueOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isMobileCatalogueOpen && (
                    <div className="bg-white divide-y divide-gray-100">
                      {catalogues.map((cat) => (
                        <a
                          key={cat.id}
                          href={cat.file}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                        >
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-xs"
                            style={{
                              background: cat.tagBg,
                              color: cat.accentColor,
                            }}
                          >
                            {cat.tag}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-800 font-semibold text-sm truncate">{cat.label}</p>
                            <p className="text-gray-500 text-xs truncate">{cat.desc}</p>
                          </div>
                          <FaDownload className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

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

        <style jsx global>{`
          @keyframes catalogueDropIn {
            from {
              opacity: 0;
              transform: translateY(-10px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </header>
    </>
  );
}
