/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['data:'],
    formats: ['image/webp', 'image/avif']
  }
};

module.exports = nextConfig;
