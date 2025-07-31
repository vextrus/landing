/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable Turbopack for development
  experimental: {
    // turbo: true,
  },
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Webpack cache configuration to prevent corruption
  webpack: (config, { isServer }) => {
    const path = require('path')
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: path.resolve(__dirname, '.next/cache/webpack'),
      // Recovery mechanism for corrupted cache
      store: 'pack',
      version: `${process.env.NODE_ENV}`,
    }
    return config
  },
}

module.exports = nextConfig