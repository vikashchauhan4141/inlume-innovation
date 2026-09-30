import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import { siteConfig } from '@/config/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.inlumeinnovations.com'),
  alternates: {
    canonical: 'https://www.inlumeinnovations.com',
  },
  title: {
    default: 'Inlume Innovations | Industrial & Commercial LED Lighting Manufacturer',
    template: '%s | Inlume Innovations',
  },
  description:
    'Inlume Innovations manufactures premium, energy-efficient industrial & commercial LED lighting. Explore our IP66 street, flood, and high-bay lights today.',
  keywords: [
    'LED lighting',
    'street light',
    'flood light',
    'high bay light',
    'industrial lighting',
    'Inlume Innovations',
    'energy efficient LED',
    'commercial lighting',
  ],
  authors: [{ name: 'Inlume Innovations' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.inlumeinnovations.com',
    siteName: 'Inlume Innovations',
    title: 'Inlume Innovations | Premium LED Lighting Solutions',
    description:
      'High-quality, energy-efficient LED lighting solutions for residential, commercial and industrial spaces.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.name,
    "url": "https://www.inlumeinnovations.com",
    "logo": "https://www.inlumeinnovations.com/logo-transparent.png",
    "telephone": "+91-8368690828",
    "email": "info@inlumeinnovations.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gamma II",
      "addressLocality": "Greater Noida",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201310",
      "addressCountry": "IN"
    },
    "sameAs": [
      siteConfig.links.linkedin,
      siteConfig.links.instagram
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-inter antialiased bg-white text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
