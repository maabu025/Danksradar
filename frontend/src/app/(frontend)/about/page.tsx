import type { Metadata } from 'next'
import Image from 'next/image'

import { HowWeWork } from '@/components/company/HowWeWork'
import { CtaBand } from '@/components/home/CtaBand'
import { about, getStarted, mission, values, vision, whyUs } from '@/data/company'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'About us',
  description:
    'Danksradar Limited, a subsidiary of Dankslite Limited, provides vehicle tracking and fleet intelligence from Obuasi, Ghana, for clients across West Africa.',
}

const Eyebrow = ({ children, light }: { children: string; light?: boolean }) => (
  <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${light ? 'text-lav' : 'text-purple'}`}>{children}</p>
)

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-deep text-white">
        <Image src="/images/about/hero.jpg" alt="" fill priority className="object-cover object-right" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/80 to-deep/20" />
        <div className="container-page relative py-16 md:py-24">
          <Eyebrow light>About us</Eyebrow>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Everything that moves, on your radar.
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-lav">
            Vehicle tracking and fleet intelligence, helping businesses and vehicle owners across West Africa track,
            protect and get more value from their fleets and assets.
          </p>
        </div>
      </section>

      {/* 2. Our company */}
      <section id="who-we-are" className="section scroll-mt-24">
        <div className="container-page grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">About Danksradar</h2>
            <p className="mt-5 text-lg font-semibold">{about.intro}</p>
            {about.body.map((t) => (
              <p key={t} className="mt-4 text-deep/80">
                {t}
              </p>
            ))}
            <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-purple uppercase">What we combine</p>
            <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {about.combine.map((c) => (
                <li key={c.label} className="tile-fun rounded-2xl bg-lav p-4 text-sm font-semibold">
                  <span className="mb-2 block text-2xl" aria-hidden>
                    {c.icon}
                  </span>
                  {c.label}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="h-80 overflow-hidden rounded-xl border border-lav">
              <iframe
                title={`Map showing ${site.address}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=14&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-deep px-4 py-2 text-sm font-semibold text-white">A subsidiary of Dankslite Limited</span>
              <span className="rounded-full bg-lav px-4 py-2 text-sm font-semibold text-purple">Based in Obuasi, Ghana</span>
              <span className="rounded-full bg-lav px-4 py-2 text-sm font-semibold text-purple">Serving West Africa</span>
            </div>
            <p className="mt-3 text-sm text-deep/70">Head office: {site.address}</p>
          </div>
        </div>
      </section>

      {/* 3. Vision and mission */}
      <section className="section bg-lav">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-14">
          <div id="vision" className="max-w-4xl scroll-mt-24">
            <Eyebrow>Our vision</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{vision}</h2>
          </div>
          <div className="h-px bg-purple/20" />
          <div id="mission" className="max-w-4xl scroll-mt-24">
            <Eyebrow>Our mission</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{mission}</h2>
          </div>
        </div>
          <div className="img-zoom relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-xl">
            <Image src="/images/profile/about-portrait.jpg" alt="Business leader looking ahead" fill sizes="(max-width: 1024px) 100vw, 35vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 4. Values */}
      <section className="section">
        <div className="container-page">
          <Eyebrow>What guides us</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Our values</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v) => (
              <article key={v.title} className="card-fun rounded-2xl border border-lav bg-white p-6 shadow-sm">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-lav text-2xl" aria-hidden>
                  {v.icon}
                </span>
                <h3 className="mt-5 text-xl font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-deep/80">{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Image band */}
      <section className="relative h-64 md:h-[420px]">
        <Image src="/images/profile/truck-sunset.jpg" alt="Truck on the road at sunset" fill className="object-cover" sizes="100vw" />
      </section>

      {/* 6. Why choose Danksradar */}
      <section className="section bg-deep text-white">
        <div className="container-page">
          <Eyebrow light>Why Danksradar</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Why businesses choose us</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {whyUs.map((r, i) => (
              <li key={r.title} className="tile-fun rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 hover:bg-white/10">
                <span className="text-4xl font-bold text-electric">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-lg font-bold">{r.title}</h3>
                <p className="mt-2 text-sm text-lav">{r.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-bold">Flexible ways to get started</p>
              <p className="text-sm text-lav">Options depend on the solution.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {getStarted.map((g) => (
                <span key={g} className="tile-fun rounded-full bg-white px-5 py-2 font-semibold text-purple">
                  ✓ {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. How we work */}
      <HowWeWork />

      {/* 8. Call to action */}
      <CtaBand />

    </>
  )
}
