import type { Metadata } from 'next'
import Link from 'next/link'

import { HowWeWork } from '@/components/company/HowWeWork'
import { IndustriesGrid } from '@/components/company/IndustriesGrid'
import { CtaBand } from '@/components/home/CtaBand'
import { HeroSlideshow } from '@/components/home/HeroSlideshow'
import { SolutionRow } from '@/components/solutions/SolutionRow'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { solutions } from '@/data/solutions'

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Ten solutions, from basic GPS tracking to AI video safety, fuel monitoring, asset and cargo tracking, warehouse safety and industrial telematics, across West Africa.',
}

const slides = [
  { tagline: 'Everything that moves, on your radar.', alt: 'Vehicles from many industries tracked on one map', image: '/images/hero/sol1.jpg' },
  { tagline: 'Safer drivers. Lower costs.', alt: 'Driver score and monthly safety results', image: '/images/hero/sol2.jpg' },
]

export default function SolutionsPage() {
  return (
    <>
      <HeroSlideshow slides={slides} />

      <section className="section">
        <div className="container-page">
          <SectionHeader
            eyebrow="Our solutions"
            title="From basic tracking to industrial telematics"
            text="From basic tracking to advanced AI video and industrial telematics, our solutions cover vehicles, drivers, equipment, cargo and people."
          />
          {/* quick links to each solution */}
          <nav aria-label="Jump to a solution" className="flex flex-wrap gap-2">
            {solutions.map((s, i) => (
              <Link
                key={s.slug}
                href={`#${s.slug}`}
                className="btn-fun rounded-full border border-lav bg-white px-4 py-2 text-sm font-medium hover:border-electric hover:text-purple"
              >
                <span className="mr-1.5 text-purple">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-page space-y-20 md:space-y-28">
          {solutions.map((s, i) => (
            <SolutionRow key={s.slug} solution={s} index={i} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      <IndustriesGrid />
      <HowWeWork />
      <CtaBand />
    </>
  )
}
