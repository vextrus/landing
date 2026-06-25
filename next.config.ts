import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Server runtime (Vercel) — enables the /api/contact route handler.
  // (Previously `output: 'export'`; dropped so the contact form can run server-side.)
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
}

export default nextConfig
