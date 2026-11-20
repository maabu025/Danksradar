export type NavLink = { label: string; href: string; description?: string }

export type NavItem = {
  label: string
  href: string
  /** Drop-down shown under the nav item. Columns are shown side by side. */
  menu?: { title: string; links: NavLink[] }[]
}

export type Solution = { slug: string; title: string; summary: string; icon: string; image?: string }

export type PartnerLevel = 'Strategic partner' | 'Authorised distributor' | 'Technology partner'

export type Partner = {
  slug: string
  name: string
  logo?: string
  /** Logo is white, so show it on a dark tile */
  darkLogoBg?: boolean
  level: PartnerLevel
  summary: string
  website: string
}

export type ProductCategory = 'GPS trackers' | 'AI dashcams' | 'Asset trackers' | 'Fleet software'

export type Product = {
  slug: string
  name: string
  partner: string // partner slug
  category: ProductCategory
  summary: string
  features: string[]
  image?: string
}

export type Platform = {
  slug: string
  name: string
  partner: string
  summary: string
  features: string[]
  image?: string
}

export type Faq = { question: string; answer: string }
