import type { Metadata } from 'next'

import { CtaBand } from '@/components/home/CtaBand'
import { HeroSlideshow } from '@/components/home/HeroSlideshow'
import { SolutionsGrid } from '@/components/home/SolutionsGrid'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Solutions',
  description: 'Fleet management, AI video telematics, asset tracking, driver safety, theft recovery and insurance telematics.',
}

const slides = [
  { tagline: 'Fleet solutions for every business that moves.', alt: 'Vehicles from many industries tracked on one map', image: '/images/hero/sol1.jpg' },
  { tagline: 'Safer drivers. Lower costs.', alt: 'Driver score and monthly safety results', image: '/images/hero/sol2.jpg' },
]

const industries = ['Logistics', 'Car rental & leasing', 'Insurance', 'Public transport', 'Construction', 'Taxi & ride-hailing']
const steps = ['Tell us about your fleet', 'We install the devices', 'Track from web and phone', 'We support you every day']

export default function SolutionsPage() {
  return (
    <>
      <HeroSlideshow slides={slides} />

      <section className="section">
        <div className="container-page">
          <SectionHeader eyebrow="Solutions" title="One radar for your entire operation" text="Smart tools to track, protect and run your fleet." />
          <SolutionsGrid />
        </div>
      </section>

      <section className="section bg-lav">
        <div className="container-page">
          <SectionHeader eyebrow="Industries" title="Built for businesses that move" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => (
              <li key={i} className="rounded-2xl bg-white p-6 font-semibold">
                {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeader eyebrow="How it works" title="Live in four simple steps" />
          <ol className="grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s} className="rounded-2xl border border-lav p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-purple font-bold text-white">{i + 1}</span>
                <p className="mt-4 font-semibold">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
