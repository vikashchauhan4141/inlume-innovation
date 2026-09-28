import Link from 'next/link';
import { featuredProducts } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';

export default function FeaturedProductsSection() {
  return (
    <section className="py-20 bg-white" id="featured-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-600 text-sm font-semibold rounded-full border border-amber-200 mb-3 uppercase tracking-wider">
              Featured Products
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#06315B]">
              Our Popular <span className="text-amber-500">Products</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#06315B] text-[#06315B] font-semibold rounded-xl hover:bg-[#06315B] hover:text-white transition-all duration-300 text-sm whitespace-nowrap"
          >
            View All Products
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} showDetails />
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-[#06315B] to-[#0a4f8a] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Need a Custom Lighting Solution?
            </h3>
            <p className="text-gray-300">
              We work with architects, contractors, and businesses to deliver tailored LED solutions.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-4 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-amber-500/30 text-base"
          >
            Get a Free Quote
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
