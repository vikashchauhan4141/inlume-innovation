import Link from 'next/link';
import { featuredProducts } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import { FaWhatsapp } from 'react-icons/fa';

export default function FeaturedProductsSection() {
  return (
    <section className="py-20 bg-white" id="featured-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
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

        {/* View More Indicator */}
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-1.5 mb-4 opacity-60">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: '200ms' }}></span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: '400ms' }}></span>
          </div>
          <p className="text-gray-500 font-medium mb-5">
            A glimpse of our collection. Discover our complete range of LED lighting solutions.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Explore All Products
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
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
          <a
            href="https://wa.me/918368690828?text=Hi%20Inlume%20Innovations%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20a%20custom%20LED%20lighting%20solution."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg text-base"
          >
            <FaWhatsapp className="w-5 h-5 text-white" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
