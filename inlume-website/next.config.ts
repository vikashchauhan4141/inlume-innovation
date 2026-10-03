import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Fix: redirect non-www to www (fixes "Page with redirect" GSC issue)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'inlumeinnovations.com' }],
        destination: 'https://www.inlumeinnovations.com/:path*',
        permanent: true, // 301 redirect
      },
      // Fix: old /our-products URL → new /products (Google had old URL indexed)
      {
        source: '/our-products',
        destination: '/products',
        permanent: true, // 301 - tells Google to update its index
      },
      // Fix: remove trailing slashes to avoid duplicate content
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ];
  },

  // Fix: Security + SEO headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
