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

export default function ProductCard({ product, showDetails = false }: ProductCardProps) {
  return (
    <div className="product-card group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/30 transition-all duration-300 flex flex-col">

      {/* ── Image Area ── */}
      <div className="relative h-56 bg-gray-50 flex items-center justify-center p-6 border-b border-gray-100">
        
        {/* Badges */}
        {product.badge && (
          <span className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-amber-500 text-white text-[11px] uppercase tracking-wider font-bold rounded shadow-sm">
            {product.badge}
          </span>
        )}
        <div className="absolute top-4 right-4 z-10 px-2 py-1 bg-[#06315B]/10 text-[#06315B] text-xs font-semibold rounded">
          {categoryLabels[product.category]}
        </div>

        {/* Product Image */}
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
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
          <a
            href={`https://wa.me/918368690828?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name}. Please share more details and pricing.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
}
