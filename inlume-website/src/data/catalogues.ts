export interface CatalogueItem {
  slug: string;
  label: string;
  subtitle: string;
  desc: string;
  file: string;
  tag: string;
  tagline: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  tagBg: string;
  pages?: string; // approximate page count hint
}

export const CATALOGUES: CatalogueItem[] = [
  {
    slug: 'flood-lighting',
    label: 'Flood Lighting',
    subtitle: 'High-Power Flood & Area Lights',
    desc: 'Industrial-grade floodlights for stadiums, warehouses, construction sites & large outdoor areas.',
    file: '/docs/INLUME_Flood_Lighting_Catalogue.pdf',
    tag: 'FL',
    tagline: 'Powerful illumination for every corner',
    accentColor: '#f97316',
    gradientFrom: '#c2410c',
    gradientTo: '#f97316',
    tagBg: 'rgba(249,115,22,0.12)',
  },
  {
    slug: 'indoor-lighting',
    label: 'Indoor Lighting',
    subtitle: 'Panel, Downlight & Office Range',
    desc: 'Energy-efficient panels, downlights and office luminaires for commercial & corporate interiors.',
    file: '/docs/INLUME_Indoor_Lighting_Catalogue.pdf',
    tag: 'IN',
    tagline: 'Bright spaces, productive minds',
    accentColor: '#3b82f6',
    gradientFrom: '#1d4ed8',
    gradientTo: '#3b82f6',
    tagBg: 'rgba(59,130,246,0.12)',
  },
  {
    slug: 'interior-lighting',
    label: 'Interior Lighting',
    subtitle: 'Décor & Architectural Lighting',
    desc: 'Elegant architectural and decorative lighting solutions designed for premium residential & hospitality.',
    file: '/docs/INLUME_Interior_Lighting_Catalogue_.pdf',
    tag: 'IT',
    tagline: 'Where light meets art',
    accentColor: '#a855f7',
    gradientFrom: '#7e22ce',
    gradientTo: '#a855f7',
    tagBg: 'rgba(168,85,247,0.12)',
  },
  {
    slug: 'lights-catalogue',
    label: 'Lights Catalogue',
    subtitle: 'Full Product Range Overview',
    desc: 'A comprehensive overview of the complete Inlume Innovations LED lighting product portfolio.',
    file: '/docs/INLUME_Lights_Catalogue.pdf',
    tag: 'LC',
    tagline: 'Everything we make, all in one place',
    accentColor: '#14b8a6',
    gradientFrom: '#0f766e',
    gradientTo: '#14b8a6',
    tagBg: 'rgba(20,184,166,0.12)',
  },
  {
    slug: 'street-lighting',
    label: 'Street Lighting',
    subtitle: 'Road, Highway & Outdoor Lights',
    desc: 'IP66-rated street and highway luminaires engineered for long life and reliable outdoor performance.',
    file: '/docs/INLUME_Street_Lighting_Catalogue.pdf',
    tag: 'ST',
    tagline: 'Lighting the roads that connect us',
    accentColor: '#22c55e',
    gradientFrom: '#15803d',
    gradientTo: '#22c55e',
    tagBg: 'rgba(34,197,94,0.12)',
  },
  {
    slug: 'solar-street-lighting',
    label: 'Solar Street Lighting',
    subtitle: 'Solar-Powered Outdoor & Street Lights',
    desc: 'Self-sufficient solar street lights with integrated batteries — zero electricity cost, zero wiring.',
    file: '/docs/INLUME_Solar_Street_Lighting_Catalogue.pdf',
    tag: 'SS',
    tagline: 'Harnessing sunlight for smarter streets',
    accentColor: '#0ea5e9',
    gradientFrom: '#0369a1',
    gradientTo: '#0ea5e9',
    tagBg: 'rgba(14,165,233,0.12)',
  },
  {
    slug: 'super-model',
    label: 'Super Model',
    subtitle: 'Premium & Signature Collection',
    desc: 'Our flagship signature range — high-performance, aesthetically refined luminaires for elite projects.',
    file: '/docs/INLUME_Super_Model_Catalogue .pdf',
    tag: 'SM',
    tagline: 'The pinnacle of illumination engineering',
    accentColor: '#eab308',
    gradientFrom: '#a16207',
    gradientTo: '#eab308',
    tagBg: 'rgba(234,179,8,0.12)',
  },
];

export function getCatalogueBySlug(slug: string): CatalogueItem | undefined {
  return CATALOGUES.find((c) => c.slug === slug);
}
