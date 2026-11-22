import Image from 'next/image'

import type { Solution } from '@/types'

/** One solution on the Solutions page: picture on one side, the full feature list on the other. */
export function SolutionRow({ solution: s, index, flip }: { solution: Solution; index: number; flip?: boolean }) {
  return (
    <article id={s.slug} className="grid scroll-mt-28 items-center gap-8 md:grid-cols-2 lg:gap-14">
      <div className={`img-zoom relative aspect-[4/3] overflow-hidden rounded-3xl bg-lav shadow-lg ${flip ? 'md:order-2' : ''}`}>
        {s.image && <Image src={s.image} alt={s.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />}
        <span className="absolute top-4 left-4 rounded-full bg-white/95 px-4 py-1.5 text-sm font-semibold text-purple shadow">
          {s.icon} Solution {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div data-reveal>
        <h2 className="text-2xl font-bold md:text-3xl">{s.title}</h2>
        <p className="mt-2 text-deep/70">{s.summary}</p>
        <ul className="mt-5 space-y-2.5">
          {s.points.map((p) => (
            <li key={p} className="flex gap-3">
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-purple text-[11px] text-white">✓</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        {s.idealFor && (
          <div className="mt-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-purple uppercase">Ideal for</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {s.idealFor.map((t) => (
                <span key={t} className="rounded-full bg-lav px-3 py-1 text-sm font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
        {s.note && <p className="mt-4 text-sm text-deep/60">{s.note}</p>}
      </div>
    </article>
  )
}
