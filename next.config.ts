import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        // Strapi Cloud — replace with your actual subdomain
        // e.g. if your Strapi Cloud URL is https://abc123.strapiapp.com
        protocol: 'https',
        hostname: '*.strapiapp.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.media.strapiapp.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
