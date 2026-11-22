import Link from 'next/link'

import { navigation } from '@/data/navigation'
import { getPartners, getSiteSettings } from '@/lib/content'

import { Logo } from './Logo'

export async function Footer() {
  const [partners, site] = await Promise.all([getPartners(), getSiteSettings()])
  return (
    <footer className="bg-deep text-lav">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <Logo onDark />
          <p className="text-sm">{site.tagline}</p>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="link-slide text-sm hover:text-white">
            LinkedIn
          </a>
          <p className="text-xs">
            A subsidiary of{' '}
            <a href={site.parentCompany.url} className="underline hover:text-white" target="_blank" rel="noreferrer">
              {site.parentCompany.name}
            </a>
          </p>
        </div>

        <div>
          <p className="mb-3 font-semibold text-white">Pages</p>
          <ul className="space-y-2 text-sm">
            {navigation.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-slide hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="link-slide hover:text-white">
                Products &amp; Services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-semibold text-white">Partners</p>
          <ul className="space-y-2 text-sm">
            {partners.map((p) => (
              <li key={p.slug}>
                <Link href={`/partners/${p.slug}`} className="link-slide hover:text-white">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 font-semibold text-white">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="link-slide hover:text-white">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone2.replace(/\s/g, '')}`} className="link-slide hover:text-white">
                {site.phone2}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-slide hover:text-white">
                {site.email}
              </a>
            </li>
            <li>{site.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col justify-between gap-2 py-5 text-xs md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName} · Reg. No. {site.regNo} · All rights reserved.
          </p>
          <Link href="/privacy-policy" className="link-slide hover:text-white">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
