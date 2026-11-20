import type { Metadata } from 'next'

import { PartnerCard } from '@/components/partners/PartnerCard'
import { PageHero } from '@/components/ui/PageHero'
import { partners } from '@/data/partners'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Danksradar works with Jimi IoT, Targa Telematics, Teltonika and Lytx.',
}

export default function PartnersPage() {
  return (
    <>
      <PageHero eyebrow="Partners" title="Trusted technology partners" />
      <section className="section">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((p) => (
            <PartnerCard key={p.slug} partner={p} />
          ))}
        </div>
      </section>
    </>
  )
}
