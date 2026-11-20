import type { MetadataRoute } from 'next'

import { partners } from '@/data/partners'
import { products } from '@/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const pages = ['', '/solutions', '/management-platforms', '/products', '/partners', '/about', '/contact', '/request-a-demo', '/privacy-policy']
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.8 })),
    ...partners.map((p) => ({ url: `${base}/partners/${p.slug}`, priority: 0.6 })),
    ...products.map((p) => ({ url: `${base}/products/${p.slug}`, priority: 0.6 })),
  ]
}
