import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex items-center justify-center overflow-hidden bg-slate-950 border-b border-gray-800" id="hero">
        
        {/* Full-bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-composite.jpg"
            alt="Inlume Industrial & Commercial LED Lighting Solutions"
            fill
            className="object-cover object-center"
            priority
          />
          
          {/* Gradient Overlay for Text Legibility & Mood */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 opacity-90" />
        </div>

        {/* Banner Content Container with ample top padding to position text lower down */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
          <div className="max-w-2xl text-left">
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-5 drop-shadow-md">
              High-Quality LED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
                Lighting Solutions
              </span>
            </h1>

            {/* Concise Subtitle */}
            <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 font-normal max-w-xl drop-shadow-sm">
              Energy-efficient, durable and innovative LED luminaires engineered for residential, commercial and heavy industrial applications.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-300 text-sm sm:text-base transform hover:-translate-y-0.5"
              >
                Explore Products
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/25 backdrop-blur-md shadow-md transition-all duration-300 text-sm sm:text-base transform hover:-translate-y-0.5"
              >
                Contact Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Quick Spec Highlights */}
            <div className="flex flex-wrap gap-3.5 pt-4 border-t border-white/15">
              {[
                { icon: '⚡', label: 'Up to 80% Energy Savings' },
                { icon: '🛡️', label: 'IP66 Waterproof & Heavy Duty' },
                { icon: '⚙️', label: 'Inbuilt 6KV Surge Protection' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-xs font-semibold text-gray-200 bg-slate-900/60 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}




