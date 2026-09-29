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
  title: {
    default: 'Inlume Innovations | Premium LED Lighting Solutions',
    template: '%s | Inlume Innovations',
  },
  description:
    'Inlume Innovations delivers high-quality, energy-efficient LED lighting solutions for residential, commercial and industrial spaces. Street lights, flood lights, high bay lights and more.',
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
    "@type": "Organization",
    "name": siteConfig.name,
    "url": "https://www.inlumeinnovations.com",
    "logo": "https://www.inlumeinnovations.com/logo-transparent.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.phone,
      "contactType": "customer service"
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
