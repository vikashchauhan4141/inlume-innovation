import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATALOGUES, getCatalogueBySlug } from '@/data/catalogues';
import CatalogueViewer from '@/components/sections/CatalogueViewer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATALOGUES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCatalogueBySlug(slug);
  if (!cat) return { title: 'Catalogue Not Found' };
  return {
    title: `${cat.label} Catalogue | Browse Online`,
    description: `View the Inlume Innovations ${cat.label} catalogue online — ${cat.desc}`,
  };
}

export default async function CatalogueViewerPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCatalogueBySlug(slug);
  if (!cat) notFound();
  return <CatalogueViewer catalogue={cat} />;
}
