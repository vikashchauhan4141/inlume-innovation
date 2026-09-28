import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import CategorySection from '@/components/sections/CategorySection';
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Inlume Innovations – Premium LED lighting solutions for streets, industrial spaces, commercial buildings and more. Energy-efficient, IP66-rated, 2-year warranty.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProductsSection />
    </>
  );
}
