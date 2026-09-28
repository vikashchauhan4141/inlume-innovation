import Link from 'next/link';
import Image from 'next/image';

const stats = [
  { value: '500+', label: 'Projects Completed', icon: '🏗️' },
  { value: '10K+', label: 'LED Units Installed', icon: '💡' },
  { value: '80%', label: 'Energy Savings', icon: '⚡' },
  { value: '2 Yrs', label: 'Product Warranty', icon: '🛡️' },
];

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Energy Efficient',
    description: 'Save up to 80% on electricity bills with our cutting-edge LED technology.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Long Lasting',
    description: 'Built with high-grade aluminium and IP66 protection for years of reliable performance.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: 'Wide Applications',
    description: 'From streets and highways to warehouses, factories, and outdoor spaces.',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Premium Quality',
    description: 'Every product meets stringent quality standards with inbuilt surge protection.',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
];

export default function HeroSection() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#06315B]" id="hero">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-banner.jpg"
            alt="Inlume Innovations LED Lighting Solutions"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06315B] via-[#06315B]/90 to-[#06315B]/50" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/15 border border-amber-400/30 rounded-full text-amber-300 text-sm font-medium mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                Bright Ideas. Better Spaces.
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                High-Quality{' '}
                <span className="relative">
                  <span className="text-amber-400">LED Lighting</span>
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-amber-400/40 rounded-full" />
                </span>{' '}
                Solutions
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
                Energy-efficient, durable and innovative lighting for residential, commercial and industrial spaces.
                Built to last, designed to impress.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  { icon: '⚡', text: 'Save up to 80% energy' },
                  { icon: '🛡️', text: 'IP66 Weather Resistant' },
                  { icon: '🏗️', text: 'Indoor & Outdoor' },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm"
                  >
                    <span>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 text-base"
                >
                  Explore Products
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300 text-base"
                >
                  Get a Quote
                </Link>
              </div>
            </div>

            {/* Right: Hero visual */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-md">
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="/images/hero-banner.jpg"
                    alt="LED Products"
                    fill
                    className="object-cover"
                    priority
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06315B]/60 to-transparent" />
                </div>
                {/* Floating info card */}
                <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4 shadow-xl border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white text-xl">💡</div>
                    <div>
                      <p className="text-white font-bold text-sm">Energy Efficient</p>
                      <p className="text-gray-300 text-xs">140-170 lm/W Output</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 glass-card rounded-2xl p-4 shadow-xl border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl">🛡️</div>
                    <div>
                      <p className="text-white font-bold text-sm">IP66 Rated</p>
                      <p className="text-gray-300 text-xs">2 Year Warranty</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="py-20 bg-[#f8fafc] section-dots" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-[#06315B]/5 text-[#06315B] text-sm font-semibold rounded-full border border-[#06315B]/10 mb-4 uppercase tracking-wider">
              Why Choose Inlume
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#06315B] mb-4">
              Built for Performance, <span className="text-amber-500">Made to Last</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every Inlume product is engineered with precision and tested for reliability in real-world conditions.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${f.bg} ${f.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-[#06315B] text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
