import type { Metadata } from 'next'
import Image from 'next/image'

import { ButtonLink } from '@/components/ui/Button'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'About us',
  description: 'Danksradar is a subsidiary of Dankslite, bringing world-class fleet technology to Ghana, installed and supported locally.',
}

// TODO: confirm the About wording with management
const values = [
  {
    title: 'Absolute integrity',
    text: 'We tell clients the truth about what our systems can do, protect their data, and keep our word.',
    icon: (
      <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3zm-3 9l2 2 4-4" />
    ),
  },
  {
    title: 'Complete reliability',
    text: 'Devices that keep reporting, support that answers, and installations done right the first time.',
    icon: <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5l-2 2m-7 7l-2 2m11 0l-2-2m-7-7l-2-2M12 9a3 3 0 100 6 3 3 0 000-6z" />,
  },
  {
    title: 'Radical innovation',
    text: 'We bring the newest tracking, AI video and fleet tools to Ghana, and keep finding better ways to use them.',
    icon: <path d="M9 18h6m-5 3h4M12 3a6 6 0 00-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0012 3z" />,
  },
]

const reasons = [
  { title: 'Local team, global technology', text: 'Partners like Jimi IoT, Targa, Teltonika and Lytx, supported from Ghana.' },
  { title: 'We install and support', text: 'Our technicians fit, test and look after every device.' },
  { title: 'One platform for everything', text: 'Tracking, video, fuel and drivers in one place, on web and phone.' },
  { title: 'Backed by Dankslite', text: 'The experience and stability of an established IT company.' },
]

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
        <div className="container-page relative py-24 md:py-36">
          <Eyebrow light>About us</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Technology that keeps Ghana&apos;s fleets moving.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-lav">
            Danksradar is a subsidiary of Dankslite, providing GPS tracking, AI video telematics and fleet management
            platforms, installed and supported by our own team.
          </p>
        </div>
      </section>

      {/* 2. Our company */}
      <section id="who-we-are" className="section scroll-mt-24">
        <div className="container-page grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Our company</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">Fleet technology with local support</h2>
            <p className="mt-5 text-deep/80">
              We bring together world-class devices, smart software and hands-on local service. Businesses, transport
              operators and insurers use Danksradar to see every vehicle, protect drivers and cut running costs,
              with a team in Ghana that installs, trains and supports them.
            </p>
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
              <span className="rounded-full bg-deep px-4 py-2 text-sm font-semibold text-white">A subsidiary of Dankslite</span>
              <span className="rounded-full bg-lav px-4 py-2 text-sm font-semibold text-purple">Based in Obuasi, Ghana</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision and mission */}
      <section className="section bg-lav">
        <div className="container-page space-y-14">
          <div id="vision" className="max-w-4xl scroll-mt-24">
            <Eyebrow>Our vision</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              To be the most trusted fleet technology partner in West Africa.
            </h2>
          </div>
          <div className="h-px bg-purple/20" />
          <div id="mission" className="max-w-4xl scroll-mt-24">
            <Eyebrow>Our mission</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              To help businesses protect their vehicles, people and goods with simple, reliable tracking technology.
            </h2>
          </div>
        </div>
      </section>

      {/* 4. Values */}
      <section className="section">
        <div className="container-page">
          <Eyebrow>What guides us</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Our values</h2>
          <p className="mt-3 max-w-2xl text-deep/80">Three promises behind every device we install and every call we answer.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <article key={v.title} className="rounded-2xl border border-lav bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-lav text-purple">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {v.icon}
                  </svg>
                </span>
                <h3 className="mt-6 text-xl font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-deep/80">{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Image band */}
      <section className="relative h-64 md:h-[420px]">
        <Image src="/images/about/band.jpg" alt="Vehicles tracked along a route across the city" fill className="object-cover" sizes="100vw" />
      </section>

      {/* 6. Why choose Danksradar */}
      <section className="section bg-deep text-white">
        <div className="container-page">
          <Eyebrow light>Why Danksradar</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Why businesses choose us</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <li key={r.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <span className="text-4xl font-bold text-electric">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-lg font-bold">{r.title}</h3>
                <p className="mt-2 text-sm text-lav">{r.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Call to action */}
      <section className="bg-purple">
        <div className="container-page flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <div className="text-white">
            <Eyebrow light>Get in touch</Eyebrow>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Ready to see your fleet clearly?</h2>
          </div>
          <ButtonLink href="/contact" variant="light">
            Start a conversation
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
