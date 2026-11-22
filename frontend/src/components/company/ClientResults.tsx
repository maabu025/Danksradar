import Image from 'next/image'

import { results } from '@/data/company'
import { site } from '@/data/site'

/** "What our clients gain": photo with the mission line, then the eight results */
export function ClientResults() {
  return (
    <section className="section">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[5fr_7fr]">
        <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
          <Image src="/images/profile/results-mining.jpg" alt="Mining haul truck at work" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-deep/85 p-5 text-white backdrop-blur">
            <p className="text-xs font-semibold tracking-[0.2em] text-electric uppercase">Our mission in practice</p>
            <p className="mt-1 text-xl font-bold md:text-2xl">Cut costs, prevent losses and protect lives.</p>
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-purple uppercase">The results</p>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">What our clients gain</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {results.map((r) => (
              <li key={r.text} className="tile-fun flex items-center gap-4 rounded-2xl bg-lav p-4 font-medium">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-lg" aria-hidden>
                  {r.icon}
                </span>
                {r.text}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-semibold text-purple">{site.tagline}</p>
        </div>
      </div>
    </section>
  )
}
