import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Inlume Innovations – our mission to deliver premium, energy-efficient LED lighting solutions for residential, commercial and industrial spaces.',
};

const values = [
  {
    icon: '💡',
    title: 'Innovation First',
    description: 'We constantly explore new technologies to offer the most advanced LED solutions in the market.',
  },
  {
    icon: '🔬',
    title: 'Quality Assured',
    description: 'Every product is rigorously tested and certified to meet the highest standards of performance and safety.',
  },
  {
    icon: '🌿',
    title: 'Sustainability',
    description: 'Our LED solutions help businesses and communities reduce their carbon footprint by up to 80%.',
  },
  {
    icon: '🤝',
    title: 'Customer First',
    description: 'We build lasting relationships with our clients through reliable products and dedicated support.',
  },
];

const milestones = [
  { year: '2018', title: 'Founded', desc: 'Inlume Innovations was established with a vision to revolutionise LED lighting in India.' },
  { year: '2020', title: 'Industrial Range', desc: 'Launched our first industrial-grade LED high bay and DOB flood light range.' },
  { year: '2022', title: 'IP66 Certified', desc: 'All outdoor products received full IP66 certification for extreme weather resistance.' },
  { year: '2024', title: 'RGB Innovation', desc: 'Introduced multi-color RGB flood lights with smart remote control capability.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero - Minimal & Sleek Banner */}
      <section className="relative min-h-[220px] sm:min-h-[260px] flex items-center overflow-hidden bg-slate-950 border-b border-gray-800">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banner.jpg"
            alt="Inlume Architectural LED Lighting Installation"
            fill
            className="object-cover object-center opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 w-full text-left">
          
          {/* Breadcrumb Pill */}
          <nav className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs text-gray-300 mb-3 border border-white/15" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-blue-400 font-semibold">About Us</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-300">Inlume Innovations</span>
          </h1>

          <p className="text-gray-300 text-xs sm:text-sm max-w-xl">
            Empowering commercial & industrial spaces across India with sustainable, heavy-duty LED lighting.
          </p>

        </div>
      </section>

      {/* Mission Section - Ultra Minimal & Classy */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Mission Statement */}
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-block px-3.5 py-1 bg-amber-500/10 text-amber-600 text-xs font-bold rounded-full uppercase tracking-wider">
                Our Mission
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#06315B] leading-tight tracking-tight">
                Illuminating Spaces with <span className="text-amber-500">Precision & Power</span>
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                At Inlume Innovations, we design and supply commercial-grade LED lighting built for long-term performance. From expressways to industrial warehouses, our fixtures deliver high brightness, lower energy costs, and IP66 all-weather durability.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-500 font-medium">
                <div className="px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
                  <strong className="text-[#06315B]">GST:</strong> 09CXKPD4992D1Z8
                </div>
                <div className="px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
                  <strong className="text-[#06315B]">Rating:</strong> IP66 Weatherproof
                </div>
                <div className="px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
                  <strong className="text-[#06315B]">Warranty:</strong> 2 Years Direct
                </div>
              </div>
            </div>

            {/* Right Side: Clean Minimal Stats Grid */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-px bg-slate-200 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
                {[
                  { num: '500+', label: 'Projects Completed' },
                  { num: '10K+', label: 'LED Units Installed' },
                  { num: '80%', label: 'Energy Savings' },
                  { num: '100%', label: 'Quality Tested' },
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-50/80 p-6 sm:p-8 text-center hover:bg-white transition-colors duration-200">
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#06315B] tracking-tight mb-1">
                      {s.num}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-500">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Why Choose Us / Built for Performance */}
      <section className="py-16 bg-slate-50 border-y border-gray-200/80" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3.5 py-1 bg-[#06315B]/5 text-[#06315B] text-xs font-bold rounded-full border border-[#06315B]/10 mb-2 uppercase tracking-wider">
              Why Choose Inlume
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#06315B] mb-2">
              Built for Performance, <span className="text-amber-500">Made to Last</span>
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm max-w-xl mx-auto">
              Every Inlume product is engineered with precision and tested for high reliability in real-world conditions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                icon: '⚡',
                title: 'Energy Efficient',
                desc: 'Save up to 80% on electricity bills with high-lumen LED chips.',
              },
              {
                icon: '🛡️',
                title: 'Long Lasting',
                desc: 'Heavy-duty aluminum housing & IP66 protection against dust & water.',
              },
              {
                icon: '⚙️',
                title: 'Inbuilt Surge Protection',
                desc: 'Safeguarded against high voltage fluctuations up to 6KV.',
              },
              {
                icon: '🏭',
                title: 'Wide Applications',
                desc: 'Ideal for streets, factories, warehouses, sports grounds & parks.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-100/80 text-blue-700 flex items-center justify-center text-base mb-2.5">
                  {f.icon}
                </div>
                <h3 className="font-bold text-[#06315B] text-sm mb-1">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#f8fafc] section-dots">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-[#06315B]/5 text-[#06315B] text-sm font-semibold rounded-full border border-[#06315B]/10 mb-4 uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#06315B]">
              What Drives <span className="text-amber-500">Inlume</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="text-5xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-[#06315B] text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#06315B]">
              Our <span className="text-amber-500">Journey</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#06315B] to-amber-500 -translate-x-px hidden md:block" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-2xl p-6 transition-shadow">
                      <h3 className="font-bold text-[#06315B] text-lg mb-1">{m.title}</h3>
                      <p className="text-gray-500 text-sm">{m.desc}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-16 h-16 bg-[#06315B] text-amber-400 font-bold rounded-full flex items-center justify-center text-sm shadow-lg relative z-10">
                    {m.year}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#06315B] to-[#0a4f8a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Light Up Your Space?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Let our experts help you choose the perfect LED solution for your project.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-4 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
