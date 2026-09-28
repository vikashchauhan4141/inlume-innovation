'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/data/products';
import { ProductCategory } from '@/types';

const categoryFilters: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'street-light', label: 'Street Lights' },
  { id: 'rgb-flood-light', label: 'RGB Flood Lights' },
  { id: 'dob-flood-light', label: 'DOB Flood Lights' },
  { id: 'well-glass-light', label: 'Well Glass Lights' },
  { id: 'high-way-light', label: 'High Way Lights' },
];

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as ProductCategory) || 'all';
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(initialCategory);

  const filtered = useMemo(
    () =>
      activeCategory === 'all'
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categoryFilters.map((f) => (
          <button
            key={f.id}
            id={`filter-${f.id}`}
            onClick={() => setActiveCategory(f.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeCategory === f.id
                ? 'bg-[#06315B] text-white shadow-lg'
                : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-[#06315B] hover:text-[#06315B]'
            }`}
          >
            {f.label}
            <span
              className={`ml-2 text-xs ${
                activeCategory === f.id ? 'text-amber-300' : 'text-gray-400'
              }`}
            >
              {f.id === 'all' ? products.length : products.filter((p) => p.category === f.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-gray-500 text-sm mb-6">
        Showing <span className="font-semibold text-[#06315B]">{filtered.length}</span>{' '}
        {filtered.length === 1 ? 'product' : 'products'}
      </p>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} showDetails />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">💡</div>
          <p className="text-gray-500">No products in this category yet.</p>
        </div>
      )}
    </div>
  );
}
