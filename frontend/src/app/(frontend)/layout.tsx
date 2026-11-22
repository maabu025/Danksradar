import type { Metadata } from 'next'
import localFont from 'next/font/local'
import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScrollProgress } from '@/components/fx/ScrollProgress'
import { ScrollReveal } from '@/components/fx/ScrollReveal'
import { HoverSpotlight } from '@/components/layout/HoverSpotlight'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { site } from '@/data/site'

import '../globals.css'

// Poppins is stored in src/fonts, so the site doesn't depend on Google Fonts
const poppins = localFont({
  src: [
    { path: '../../fonts/Poppins-400.woff2', weight: '400', style: 'normal' },
    { path: '../../fonts/Poppins-500.woff2', weight: '500', style: 'normal' },
    { path: '../../fonts/Poppins-600.woff2', weight: '600', style: 'normal' },
    { path: '../../fonts/Poppins-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: `${site.name} | Fleet tracking & telematics in Ghana`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: 'website', locale: 'en_GH' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <HoverSpotlight />
        <ScrollReveal />
        <ScrollProgress />
      </body>
    </html>
  )
}
