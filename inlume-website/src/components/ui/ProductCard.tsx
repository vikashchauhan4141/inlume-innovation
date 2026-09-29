import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { siteConfig } from '@/config/site';
import { FaCheck, FaShieldAlt, FaWhatsapp } from 'react-icons/fa';

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
  'high-way-light': 'High Way Light',
};

export default function ProductCard({ product, showDetails = false }: ProductCardProps) {
  return (
    <div className="product-card group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/30 transition-all duration-300 flex flex-col">

      {/* ── Image Area ── */}
      <div className="relative h-60 bg-slate-50/70 flex flex-col justify-end p-4 pt-12 border-b border-gray-100/80 overflow-hidden">
        
        {/* Badges */}
        <div className="absolute top-3.5 inset-x-3.5 z-10 flex items-center justify-between gap-2 pointer-events-none">
          {product.badge ? (
            <span className="px-2.5 py-1 bg-amber-500 text-white text-[10px] sm:text-[11px] uppercase tracking-wider font-bold rounded-md shadow-xs flex-shrink-0">
              {product.badge}
            </span>
          ) : <div />}
          
          <span className="px-2 py-1 bg-[#06315B]/10 text-[#06315B] text-[11px] font-bold rounded-md backdrop-blur-xs flex-shrink-0">
            {categoryLabels[product.category]}
          </span>
        </div>

        {/* Product Image */}
        <div className="relative w-full h-44 mt-auto">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
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
                <FaCheck className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <FaShieldAlt className="w-3.5 h-3.5 text-green-500" />
            {product.warranty ?? '2 Years'} Warranty
          </span>
          <a
            href={`https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name}. Please share more details and pricing.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <FaWhatsapp className="w-4 h-4" />
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
}
