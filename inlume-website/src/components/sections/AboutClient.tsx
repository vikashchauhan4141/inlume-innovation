'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaLinkedin, FaInstagram } from 'react-icons/fa';

const LINKEDIN_URL = "https://www.linkedin.com/posts/inlume-innovations_inlumeinnovations-lightingsolutions-ledlighting-activity-7510363099531624448-hkMP?utm_source=share&utm_medium=member_android&rcm=ACoAAEDhAb8BILPx0z-nKES7eMAIV9Uvg_qVfks";
const INSTAGRAM_URL = "https://www.instagram.com/inlumeinnovations?stkn=azkyMmJhcTB5YzZj";
import {
  ShieldCheck,
  Zap,
  Award,
  CheckCircle2,
  Building2,
  Sparkles,
  Factory,
  ChevronRight,
  TrendingUp,
  Leaf,
  Users,
  Lightbulb,
} from 'lucide-react';

const coreHighlights = [
  'Up to 80% Electricity Savings with High Lumen Density',
  'IP66 Weatherproof & Dust-Proof Die-Cast Aluminum Body',
  'Inbuilt 6KV Heavy Voltage Surge Protection',
  '2-Year Direct Factory Replacement Warranty',
];

const values = [
  {
    icon: Lightbulb,
    title: 'Precision Optics',
    description: 'Advanced lens designs for maximum light spread, zero dark spots, and anti-glare visual comfort.',
    gradient: 'from-amber-500/20 to-amber-500/5',
    iconColor: 'text-amber-500',
  },
  {
    icon: ShieldCheck,
    title: 'Rugged Durability',
    description: 'Heavy-duty aluminum heat sinks and IP66 seals withstand monsoon rains and dust storms.',
    gradient: 'from-blue-500/20 to-blue-500/5',
    iconColor: 'text-blue-600',
  },
  {
    icon: Leaf,
    title: 'Energy Conservation',
    description: 'High efficiency drivers cut power bills by up to 80% while delivering ultra-bright illumination.',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-600',
  },
  {
    icon: Users,
    title: 'Customer Guarantee',
    description: 'Dedicated technical support and quick direct replacement warranty for all commercial buyers.',
    gradient: 'from-violet-500/20 to-violet-500/5',
    iconColor: 'text-violet-600',
  },
];

const milestones = [
  { year: '2025', title: 'Company Established', desc: 'Founded Inlume Innovations with a vision to deliver robust, high-performance commercial and industrial LED lighting solutions.' },
  { year: '2025', title: 'Core Product Line Launch', desc: 'Rolled out heavy-duty IP66 flood lights, UFO high bays, street lights, and smart RGB architectural fixtures.' },
  { year: '2026', title: 'Pan-India Distribution Expansion', desc: 'Expanded direct-factory distribution network to serve commercial enterprises, municipal projects, and industrial plants nationwide.' },
  { year: '2026+', title: 'Smart & Sustainable Lighting', desc: 'Pioneering smart IoT lighting controls and energy-conserving solar LED solutions for modern infrastructure.' },
];

export default function AboutClient() {
  return (
    <>
      {/* Page Hero - Architectural Banner with Glass Overlay */}
      <section className="relative min-h-[240px] sm:min-h-[280px] flex items-center overflow-hidden bg-slate-950 border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banner.jpg"
            alt="Inlume Architectural LED Lighting Installation"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb Pill */}
            <nav className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs text-gray-300 mb-3 border border-white/15" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-blue-400 font-semibold">About Us</span>
            </nav>

            <h1 className="text-3xl sm:text-5xl font-black text-white mb-2 tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-amber-300 to-amber-500">Inlume Innovations</span>
            </h1>

            <p className="text-gray-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Empowering commercial, industrial & municipal projects across India with heavy-duty, high-lumen LED lighting.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section - Animated Showcase Layout */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden relative">
        {/* Soft Ambient Light Glows */}
        <div className="absolute top-10 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Story & Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6"
            >
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#06315B] leading-[1.15] tracking-tight mb-4">
                  Illuminating Spaces with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Precision & Power</span>
                </h2>
              </div>

              <p className="text-slate-600 text-base leading-relaxed">
                At <strong className="text-[#06315B] font-semibold">Inlume Innovations</strong>, we design and manufacture high-performance LED solutions engineered for real-world reliability. From busy expressways and urban thoroughfares to heavy industrial plants, our IP66-rated fixtures ensure bright, consistent illumination.
              </p>

              {/* Core Feature Bullet Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {coreHighlights.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-xs sm:text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Verified Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 text-xs">
                <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 rounded-xl border border-slate-200">
                  <Building2 className="w-4 h-4 text-[#06315B]" />
                  <span><strong className="text-[#06315B]">GST Registered:</strong> 09CXKPD4992D1Z8</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold">IP66 Weatherproof Certified</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Clean Pure Showcase Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-6 relative"
            >
              {/* Pure High-Res Image Showcase Frame - Completely Unblocked */}
              <div className="relative h-[380px] sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 group">
                <Image
                  src="/images/street-light-bg.jpg"
                  alt="Inlume Commercial Architectural LED Lighting Project"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Minimal Clean Stat Strip Below Image */}
              <div className="grid grid-cols-3 gap-3 mt-4 bg-slate-50/80 border border-slate-200/80 p-4 rounded-2xl text-center shadow-xs">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#06315B]">500+</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Projects Done</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-amber-500">10K+</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Units Sold</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600">80%</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Energy Saved</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Engineering Values Section */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#06315B]">
              Built for Performance, <span className="text-amber-500">Made to Last</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className={`absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br ${v.gradient} rounded-full blur-xl group-hover:scale-150 transition-transform duration-500`} />
                  
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center text-xl mb-4 group-hover:bg-[#06315B] group-hover:text-white transition-colors duration-300">
                    <Icon className={`w-6 h-6 ${v.iconColor} group-hover:text-white transition-colors`} />
                  </div>

                  <h3 className="font-bold text-[#06315B] text-lg mb-2">{v.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#06315B]">
              The Inlume <span className="text-amber-500">Journey</span>
            </h2>
          </div>

          <div className="space-y-6">
            {milestones.map((m, idx) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:border-amber-400/50 hover:bg-white transition-all duration-300 shadow-xs"
              >
                <div className="w-16 h-10 rounded-xl bg-[#06315B] text-amber-400 font-extrabold flex items-center justify-center text-sm flex-shrink-0 shadow-md">
                  {m.year}
                </div>
                <div>
                  <h3 className="font-bold text-[#06315B] text-base mb-0.5">{m.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Call to Action Banner */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#06315B] via-[#083e73] to-[#06315B] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-black mb-4 tracking-tight">
            Ready to Upgrade Your Commercial Lighting?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Get in touch with our lighting specialists for bulk project pricing, customized wattage requirements, and technical datasheets.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all duration-300 shadow-xl hover:scale-105"
            >
              Explore Products
            </Link>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0A66C2] hover:bg-[#084e96] text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-xl hover:scale-105"
            >
              <FaLinkedin className="w-4 h-4 text-white" />
              Follow on LinkedIn
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-xl hover:scale-105"
            >
              <FaInstagram className="w-4 h-4 text-white" />
              Follow on Instagram
            </a>
            <a
              href="https://wa.me/918368690828?text=Hi%20Inlume%20Innovations%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20a%20custom%20LED%20lighting%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-xl hover:scale-105"
            >
              <FaWhatsapp className="w-4 h-4 text-white" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
