import type { Metadata } from 'next'

import { CtaBand } from '@/components/home/CtaBand'
import { PlatformCard } from '@/components/platforms/PlatformCard'
import { ProductsOverview } from '@/components/products/ProductsOverview'
import { PageHero } from '@/components/ui/PageHero'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { platforms } from '@/data/platforms'

export const metadata: Metadata = {
  title: 'Management Platforms',
  description: 'Tracksolid, Targa Telematics and Lytx DriveCam: manage your fleet, video and drivers from one screen.',
}

export default function ManagementPlatformsPage() {
  return (
    <>
      <PageHero eyebrow="Management Platforms" title="Run your fleet from one screen" text="Choose the platform that fits your fleet. We set it up and train your team." />

      <section className="section">
        <div className="container-page">
          <SectionHeader eyebrow="Platforms" title="Our management platforms" />
          <div className="space-y-16">
            {platforms.map((p, i) => (
              <PlatformCard key={p.slug} platform={p} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <div className="bg-lav">
        <ProductsOverview />
      </div>

      <CtaBand />
    </>
  )
}
