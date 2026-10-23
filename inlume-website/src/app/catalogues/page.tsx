import type { Metadata } from 'next';
import CataloguesPageClient from '@/components/sections/CatalogueGrid';

export const metadata: Metadata = {
  title: 'Catalogues | Browse All Lighting Collections',
  description:
    'Browse all Inlume Innovations product catalogues — Flood Lighting, Street Lighting, Solar Street Lights, Indoor, Interior and more. View online or download PDF.',
};

export default function CataloguesPage() {
  return <CataloguesPageClient />;
}
