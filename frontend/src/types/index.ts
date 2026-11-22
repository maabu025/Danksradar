export type NavLink = { label: string; href: string; description?: string }

export type NavItem = {
  label: string
  href: string
  /** Drop-down shown under the nav item. Columns are shown side by side. */
  menu?: { title: string; links: NavLink[] }[]
}

export type Solution = {
  slug: string
  title: string
  summary: string
  icon: string
  image?: string
  /** Full list of features, shown on the Solutions page */
  points: string[]
  /** "Ideal for" tags */
  idealFor?: string[]
  /** Small print under the list */
  note?: string
}

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
  /** Picture for the Partners page (a product or platform) */
  image?: string
  /** Two headline numbers shown on the Partners page */
  stats?: { value: string; label: string }[]
  /** Short selling points shown on the Partners page */
  highlights?: string[]
}

export type ProductCategory = 'GPS trackers' | 'AI dashcams' | 'Asset trackers' | 'Fleet software'

export type Product = {
  slug: string
  name: string
  partner: string // partner slug
  partnerName?: string
  category: ProductCategory
  summary: string
  features: string[]
  image?: string
  /** Real cut-out photo of the device (transparent PNG), shown instead of the illustration. */
  photo?: string
}

export type Platform = {
  slug: string
  name: string
  partner: string
  partnerName?: string
  summary: string
  features: string[]
  image?: string
}

export type Faq = { question: string; answer: string }
