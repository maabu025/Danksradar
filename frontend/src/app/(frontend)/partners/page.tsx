import type { Metadata } from 'next'

import { CtaBand } from '@/components/home/CtaBand'
import { PartnerRow } from '@/components/partners/PartnerRow'
import { PageHero } from '@/components/ui/PageHero'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getPartners } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Danksradar works with Jimi IoT, Targa Telematics, Teltonika and Lytx, global leaders in telematics and video safety.',
}

export const revalidate = 60

export default async function PartnersPage() {
  const partners = await getPartners()
  return (
    <>
      <PageHero eyebrow="Partners" title="Trusted technology partners" text="We bring the world's leading telematics and video safety brands to Ghana, with local installation and support." />

      <section className="section">
        <div className="container-page">
          <SectionHeader eyebrow="Our partners" title="World-class technology, local support" />
          <div className="space-y-16">
            {partners.map((p, i) => (
              <PartnerRow key={p.slug} partner={p} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
