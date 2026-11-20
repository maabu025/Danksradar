'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { partners } from '@/data/partners'

import { PartnerLogo } from '../partners/PartnerLogo'

/** "Our partners" section: one partner per slide, moves every 4 seconds */
export function PartnersSlideshow() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % partners.length), 4000)
    return () => clearInterval(t)
  }, [])
  const p = partners[index]

  return (
    <section className="section bg-deep text-white">
      <div className="container-page grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-lav uppercase">Our partners</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">World-class technology, local support.</h2>
          <div className="mt-6 flex gap-2">
            {partners.map((x, i) => (
              <button
                key={x.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${x.name}`}
                className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-electric' : 'w-2.5 bg-white/40'}`}
              />
            ))}
          </div>
        </div>

        <Link
          key={p.slug}
          href={`/partners/${p.slug}`}
          className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-2xl bg-white/5 p-8 text-center ring-1 ring-white/10 transition hover:bg-white/10"
        >
          <PartnerLogo partner={p} size="lg" />
          <p className="text-sm text-lav">{p.summary}</p>
        </Link>
      </div>
    </section>
  )
}
