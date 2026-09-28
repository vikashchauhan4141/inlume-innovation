import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/products';

export default function CategorySection() {
  return (
    <section className="py-20 bg-white" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-600 text-sm font-semibold rounded-full border border-amber-200 mb-4 uppercase tracking-wider">
            Our Product Categories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#06315B] mb-4">
            Lighting Solutions for <span className="text-amber-500">Every Space</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our range of reliable, energy-efficient LED lighting solutions designed for residential, commercial and industrial applications.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#041f3a]/90 via-[#041f3a]/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
                  <h3 className="text-xl font-bold">{cat.name}</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{cat.description}</p>
                <Link
                  href={`/products?category=${cat.id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 group-hover:gap-3 transition-all duration-300"
                >
                  View Products
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Product Count Badge */}
              {cat.productCount && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-xs font-semibold">
                  {cat.productCount} Products
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
