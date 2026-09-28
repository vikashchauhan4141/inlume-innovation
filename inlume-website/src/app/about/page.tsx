import type { Metadata } from 'next';
import Link from 'next/link';

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
      {/* Page Hero */}
      <section className="pt-24 pb-14 bg-gradient-to-br from-[#06315B] via-[#0a4f8a] to-[#041f3a] relative overflow-hidden">
        <div className="absolute inset-0 section-dots opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-white/60 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">About Us</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About <span className="text-amber-400">Inlume Innovations</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We are a passionate team of lighting engineers and innovators committed to making spaces brighter, safer, and more energy-efficient.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-600 text-sm font-semibold rounded-full border border-amber-200 mb-4 uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#06315B] mb-6 leading-tight">
                Illuminating the World with <span className="text-amber-500">Smarter LED Technology</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                At Inlume Innovations, we believe that great lighting transforms spaces. From the busiest highways to the deepest warehouses, our LED solutions deliver consistent, reliable illumination that drives efficiency and safety.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Founded with a commitment to quality and sustainability, we source only premium-grade components and subject every product to rigorous quality checks. Our IP66-rated fixtures, backed by a 2-year warranty, are trusted by businesses, municipalities, and contractors across India.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-[#06315B]/5 px-4 py-3 rounded-xl">
                  <span className="text-2xl">📋</span>
                  <div>
                    <p className="font-bold text-[#06315B] text-sm">GST Registered</p>
                    <p className="text-gray-500 text-xs">09CXKPD4992D1Z8</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-amber-50 px-4 py-3 rounded-xl">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="font-bold text-[#06315B] text-sm">Quality Certified</p>
                    <p className="text-gray-500 text-xs">IP66 Rated Products</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '500+', label: 'Projects Completed', icon: '🏗️' },
                { num: '10K+', label: 'LED Units Installed', icon: '💡' },
                { num: '80%', label: 'Energy Savings', icon: '⚡' },
                { num: '100%', label: 'Satisfaction Rate', icon: '⭐' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-[#06315B] rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="text-4xl mb-2">{s.icon}</div>
                  <div className="text-3xl font-bold text-amber-400 mb-1">{s.num}</div>
                  <div className="text-white/70 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
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
