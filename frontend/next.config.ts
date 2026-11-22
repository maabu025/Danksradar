import type { NextConfig } from 'next'

// Images uploaded in the admin panel are served by the backend (Strapi) from /uploads
const api = new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337')

const nextConfig: NextConfig = {
  // hide the Next.js "N" badge that shows while running npm run dev
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: api.protocol.replace(':', '') as 'http' | 'https',
        hostname: api.hostname,
        port: api.port,
        pathname: '/uploads/**',
      },
    ],
  },
}

export default nextConfig
