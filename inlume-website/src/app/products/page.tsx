import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsClient from '@/components/ui/ProductsClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse our complete range of premium LED lighting products: street lights, flood lights, high bay lights, RGB lights and well glass lights.',
};

export default function ProductsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-24 pb-14 bg-gradient-to-br from-[#06315B] via-[#0a4f8a] to-[#041f3a] relative overflow-hidden">
        <div className="absolute inset-0 section-dots opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-white/60 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">Products</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our <span className="text-amber-400">Product Range</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover our comprehensive range of energy-efficient LED lighting solutions — engineered for reliability, built to last.
          </p>
        </div>
      </section>

      {/* Products Listing */}
      <section className="py-16 bg-[#f8fafc]">
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
