// Loads the website's content from the backend (Strapi).
// If the backend is off or still empty, the built-in starter content in src/data is used,
// so the website always works.
import { partners as starterPartners } from '@/data/partners'
import { platforms as starterPlatforms } from '@/data/platforms'
import { products as starterProducts } from '@/data/products'
import { devicePhotos } from '@/data/devicePhotos'
import { site as starterSite } from '@/data/site'
import type { Partner, PartnerLevel, Platform, Product, ProductCategory } from '@/types'

import { API_URL, mediaUrl } from './api'

const REFRESH_SECONDS = 60 // changes in the admin panel appear on the site within a minute

type Media = { url?: string | null } | null | undefined

async function fromStrapi<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}/api/${path}`, {
      next: { revalidate: REFRESH_SECONDS },
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) return null
    const json = (await res.json()) as { data?: T }
    return json.data ?? null
  } catch {
    return null // backend not running: fall back to starter content
  }
}

// ---------- partners ----------
const levels: Record<string, PartnerLevel> = {
  strategic_partner: 'Strategic partner',
  authorised_distributor: 'Authorised distributor',
  technology_partner: 'Technology partner',
}

type StrapiPartner = {
  name: string
  slug: string
  level: string
  summary: string
  website?: string | null
  darkLogoBg?: boolean | null
  logo?: Media
}

export async function getPartners(): Promise<Partner[]> {
  const data = await fromStrapi<StrapiPartner[]>('partners?populate[0]=logo&sort=sortOrder:asc&pagination[pageSize]=100')
  if (!data || data.length === 0) return starterPartners
  return data.map((p) => {
    const starter = starterPartners.find((s) => s.slug === p.slug)
    return {
      slug: p.slug,
      name: p.name,
      level: levels[p.level] ?? 'Technology partner',
      summary: p.summary,
      website: p.website ?? '',
      darkLogoBg: p.darkLogoBg ?? starter?.darkLogoBg,
      logo: mediaUrl(p.logo?.url) ?? starter?.logo,
      image: starter?.image,
      stats: starter?.stats,
      highlights: starter?.highlights,
    }
  })
}

export async function getPartner(slug: string): Promise<Partner | undefined> {
  return (await getPartners()).find((p) => p.slug === slug)
}

// ---------- products ----------
type StrapiProduct = {
  name: string
  slug: string
  summary: string
  features?: string[] | null
  images?: { url: string }[] | null
  partner?: { slug: string; name: string } | null
  category?: { name: string } | null
}

export async function getProducts(): Promise<Product[]> {
  const data = await fromStrapi<StrapiProduct[]>(
    'products?populate[0]=partner&populate[1]=category&populate[2]=images&sort=sortOrder:asc&pagination[pageSize]=200',
  )
  if (!data || data.length === 0) return starterProducts
  return data.map((p) => {
    const starter = starterProducts.find((s) => s.slug === p.slug)
    return {
      slug: p.slug,
      name: p.name,
      partner: p.partner?.slug ?? '',
      partnerName: p.partner?.name,
      category: (p.category?.name ?? 'GPS trackers') as ProductCategory,
      summary: p.summary,
      features: Array.isArray(p.features) ? p.features : [],
      // uploaded photo first, otherwise the illustration with the same slug
      image: mediaUrl(p.images?.[0]?.url) ?? starter?.image,
      // real device photo from public/images/products/devices (see src/data/devicePhotos.ts)
      photo: devicePhotos[p.slug],
    }
  })
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug)
}

// ---------- platforms ----------
type StrapiPlatform = {
  name: string
  slug: string
  summary: string
  features?: string[] | null
  screenshot?: Media
  partner?: { slug: string; name: string } | null
}

export async function getPlatforms(): Promise<Platform[]> {
  const data = await fromStrapi<StrapiPlatform[]>('platforms?populate[0]=partner&populate[1]=screenshot&pagination[pageSize]=50')
  if (!data || data.length === 0) return starterPlatforms
  return data.map((p) => {
    const starter = starterPlatforms.find((s) => s.slug === p.slug)
    return {
      slug: p.slug,
      name: p.name,
      partner: p.partner?.slug ?? '',
      partnerName: p.partner?.name,
      summary: p.summary,
      features: Array.isArray(p.features) ? p.features : [],
      image: mediaUrl(p.screenshot?.url) ?? starter?.image,
    }
  })
}

// ---------- contact details ----------
type StrapiSettings = { phone?: string | null; email?: string | null; address?: string | null; whatsapp?: string | null }

export async function getSiteSettings() {
  const s = await fromStrapi<StrapiSettings>('site-setting')
  // values still holding the old starter placeholders are ignored
  const real = (v?: string | null) => (v && !/000 0000|^0+$|233000000000|info@danksradar\.com|^Obuasi, Ghana$/.test(v) ? v : undefined)
  return {
    ...starterSite,
    phone: real(s?.phone) || starterSite.phone,
    email: real(s?.email) || starterSite.email,
    address: real(s?.address) || starterSite.address,
    whatsapp: real(s?.whatsapp) || starterSite.whatsapp,
  }
}
