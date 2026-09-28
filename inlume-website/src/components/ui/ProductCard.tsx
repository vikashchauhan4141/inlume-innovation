import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  showDetails?: boolean;
}

const categoryLabels: Record<string, string> = {
  'street-light': 'Street Light',
  'rgb-flood-light': 'RGB Flood Light',
  'dob-flood-light': 'DOB Flood Light',
  'well-glass-light': 'Well Glass Light',
  'high-bay-light': 'High Bay Light',
};

// Per-category gradient backgrounds for the image area
const categoryGradients: Record<string, string> = {
  'street-light':     'from-[#0a2a4a] via-[#06315B] to-[#0d4a7a]',
  'rgb-flood-light':  'from-[#1a0a2e] via-[#2d1057] to-[#1a0a2e]',
  'dob-flood-light':  'from-[#0d2b1a] via-[#0f3d26] to-[#0d2b1a]',
  'well-glass-light': 'from-[#1a1a0a] via-[#2d2a00] to-[#1a1a0a]',
  'high-bay-light':   'from-[#1a0d00] via-[#3d1f00] to-[#1a0d00]',
};

const categoryGlowColors: Record<string, string> = {
  'street-light':     'rgba(59,130,246,0.25)',
  'rgb-flood-light':  'rgba(168,85,247,0.25)',
  'dob-flood-light':  'rgba(34,197,94,0.20)',
  'well-glass-light': 'rgba(245,158,11,0.25)',
  'high-bay-light':   'rgba(249,115,22,0.25)',
};

export default function ProductCard({ product, showDetails = false }: ProductCardProps) {
  const gradient = categoryGradients[product.category] ?? 'from-[#06315B] via-[#0a4f8a] to-[#06315B]';
  const glow = categoryGlowColors[product.category] ?? 'rgba(59,130,246,0.2)';

  return (
    <div className="product-card group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl flex flex-col">

      {/* ── Image Area ── */}
      <div
        className={`relative h-52 bg-gradient-to-br ${gradient} overflow-hidden flex items-center justify-center`}
      >
        {/* Radial glow behind product */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${glow} 0%, transparent 70%)`,
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Badges */}
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg shadow-lg">
            {product.badge}
          </span>
        )}
        <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-black/30 backdrop-blur-sm text-white text-xs font-medium rounded-lg border border-white/20">
          {categoryLabels[product.category]}
        </div>

        {/* Product Image */}
        <div className="relative w-full h-full p-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        {/* Bottom shimmer line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-[#06315B] text-base leading-snug mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Key Specs */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.wattage > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#06315B]/8 text-[#06315B] text-xs font-semibold rounded-md border border-[#06315B]/10">
              ⚡ {product.wattage}W
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#06315B]/8 text-[#06315B] text-xs font-semibold rounded-md border border-[#06315B]/10">
            🔌 {product.voltage}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-semibold rounded-md border border-green-200">
            🛡️ {product.ipRating}
          </span>
        </div>

        {showDetails && (
          <ul className="mb-4 space-y-1.5 flex-1">
            {product.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                <svg className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {product.warranty ?? '2 Years'} Warranty
          </span>
          <Link
            href={`/products?id=${product.id}`}
            className="text-xs font-bold text-[#06315B] hover:text-amber-600 flex items-center gap-1 transition-colors group/link"
          >
            View Details
            <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
