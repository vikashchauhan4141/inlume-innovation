import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsClient from '@/components/ui/ProductsClient';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse our complete range of premium LED lighting products: street lights, flood lights, high bay lights, RGB lights and well glass lights.',
};

export default function ProductsPage() {
  return (
    <>
      {/* Page Hero - Minimal & Sleek Banner */}
      <section className="relative min-h-[220px] sm:min-h-[260px] flex items-center overflow-hidden bg-slate-950 border-b border-gray-800">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-composite.jpg"
            alt="Inlume LED Products Collection"
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
            <span className="text-blue-400 font-semibold">Products</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-300">Product Range</span>
          </h1>

          <p className="text-gray-300 text-xs sm:text-sm max-w-xl">
            High-efficiency LED luminaires engineered for reliability, durability, and maximum illumination.
          </p>

        </div>
      </section>

      {/* Products Listing */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading products...</div>}>
            <ProductsClient />
          </Suspense>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#06315B] mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            We also manufacture custom LED solutions. Contact us with your requirements and our team will get back to you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 text-base"
          >
            Contact Us
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
