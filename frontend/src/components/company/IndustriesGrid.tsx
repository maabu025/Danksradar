import Image from 'next/image'

import { industries } from '@/data/company'

import { SectionHeader } from '../ui/SectionHeader'

/** All 14 industries from the company profile */
export function IndustriesGrid() {
  return (
    <section id="industries" className="section scroll-mt-24 bg-lav">
      <div className="container-page">
        <SectionHeader
          eyebrow="Who we serve"
          title="Industries we serve"
          text="We serve everyone from private car owners to large commercial and industrial fleets."
        />
        <div className="mb-8 grid gap-5 sm:grid-cols-2">
          {[
            { src: '/images/profile/industries-trucks.jpg', alt: 'Trucks and trailers in a logistics yard, seen from above' },
            { src: '/images/profile/industries-bikes.jpg', alt: 'A row of shared bicycles' },
          ].map((p) => (
            <div key={p.src} className="img-zoom relative aspect-[2/1] overflow-hidden rounded-3xl shadow-lg">
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((i) => (
            <li key={i.name} className="tile-fun flex items-center gap-4 rounded-2xl bg-white p-5 font-semibold">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lav text-lg" aria-hidden>
                {i.icon}
              </span>
              {i.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
