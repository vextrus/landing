import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Server runtime (Vercel) — enables the /api/contact route handler.
  // (Previously `output: 'export'`; dropped so the contact form can run server-side.)
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
  // v2 → v3 IA: the engine + workforce surfaces merged into The System / VextrusAI;
  // /why and /estimator fold into /proof.
  async redirects() {
    return [
      { source: '/workforce', destination: '/ai', permanent: true },
      { source: '/engine', destination: '/system', permanent: true },
      { source: '/why', destination: '/proof', permanent: true },
      { source: '/estimator', destination: '/proof', permanent: true },
    ]
  },
}

export default nextConfig
