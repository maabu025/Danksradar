import type { Metadata } from 'next'

import { DemoRequestForm } from '@/components/forms/DemoRequestForm'
import { PageHero } from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Request a demo',
  description: 'Book a free demo of Danksradar fleet tracking and telematics.',
}

const services = ['Live GPS tracking', 'AI video telematics', 'Fuel monitoring', 'Driver behaviour reports', 'Asset tracking', 'Theft recovery']

export default function RequestDemoPage() {
  return (
    <>
      <PageHero eyebrow="Request a demo" title="See Danksradar in action" text="Answer a few quick questions and we'll set up a demo for your fleet." />
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-lav p-6 md:p-8">
            <DemoRequestForm />
          </div>
          <aside className="h-fit rounded-2xl bg-deep p-8 text-white">
            <h2 className="text-xl font-bold">Fleet services in your demo</h2>
            <ul className="mt-4 space-y-3 text-sm text-lav">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-electric" aria-hidden /> {s}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  )
}
