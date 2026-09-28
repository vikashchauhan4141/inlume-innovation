import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/products';

const categoryDataMap: Record<string, { appBg: string; fixture: string; altApp: string }> = {
  'street-light': {
    fixture: '/images/products/sl-100w.png',
    appBg: '/images/categories/street-light-app.png',
    altApp: 'Street Light Pole Illuminating Asphalt Road',
  },
  'dob-flood-light': {
    fixture: '/images/products/dob-200w.png',
    appBg: '/images/categories/flood-light-app.png',
    altApp: 'Building Wall Flood Light Illuminating Ground',
  },
  'high-way-light': {
    fixture: '/images/products/high-way-light.jpeg',
    appBg: '/images/categories/highway-app.jpg',
    altApp: 'Illuminated Expressway Highway Road at Night',
  },
};

export default function CategorySection() {
  return (
    <section className="py-14 sm:py-20 bg-slate-50/50" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#06315B] mb-3">
            Lighting Solutions for <span className="text-amber-500">Every Space</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-xs sm:text-sm">
            Explore our range of reliable, energy-efficient LED lighting solutions designed for residential, commercial and industrial applications.
          </p>
        </div>

        {/* Category Composite Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => {
            const extra = categoryDataMap[cat.id] || {
              fixture: cat.image,
              appBg: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80',
              altApp: cat.name,
            };

            return (
              <div
                key={cat.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/90"
              >
                {/* Composite Image Header */}
                <div className="relative w-full h-52 sm:h-56 bg-white overflow-hidden border-b border-gray-100">
                  
                  {/* Right Background: Application Location Photo */}
                  <div className="absolute right-0 top-0 bottom-0 w-[65%] z-0 overflow-hidden">
                    <Image
                      src={extra.appBg}
                      alt={extra.altApp}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Soft gradient blend from white left to photo right */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                  </div>

                  {/* Left Foreground: Product Fixture */}
                  <div className="absolute left-2 sm:left-4 top-2 bottom-2 z-10 w-[48%] flex items-center justify-center p-2">
                    <Image
                      src={extra.fixture}
                      alt={cat.name}
                      fill
                      className="object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  </div>

                  {/* Product Count Badge */}
                  {cat.productCount && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md border border-white/20 text-white rounded-full text-[10px] font-bold z-20">
                      {cat.productCount} Range
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col text-center items-center">
                  <h3 className="text-xl sm:text-2xl font-black text-[#06315B] mb-2 tracking-tight">
                    {cat.name}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                    {cat.description}
                  </p>
                  
                  <Link
                    href={`/products?category=${cat.id}`}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-6 bg-slate-100 group-hover:bg-[#06315B] text-[#06315B] group-hover:text-white font-bold text-xs rounded-xl transition-all duration-300 w-full max-w-xs shadow-xs"
                  >
                    View Products
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

