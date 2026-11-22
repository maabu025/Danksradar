import type { MetadataRoute } from 'next'

import { getPartners, getProducts } from '@/lib/content'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [partners, products] = await Promise.all([getPartners(), getProducts()])
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const pages = ['', '/solutions', '/management-platforms', '/products', '/partners', '/about', '/contact', '/request-a-demo', '/privacy-policy']
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.8 })),
    ...partners.map((p) => ({ url: `${base}/partners/${p.slug}`, priority: 0.6 })),
    ...products.map((p) => ({ url: `${base}/products/${p.slug}`, priority: 0.6 })),
  ]
}
