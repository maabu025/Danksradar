import Link from 'next/link'

import { solutions } from '@/data/solutions'

import { Card } from '../ui/Card'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'

/** Solution cards: picture, icon and one short line each. Each card opens its section on the Solutions page. */
export function SolutionsGrid({ limit }: { limit?: number }) {
  const list = limit ? solutions.slice(0, limit) : solutions
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s, i) => (
        <Link key={s.slug} href={`/solutions#${s.slug}`} className="block">
          <Card className="h-full">
            <ImagePlaceholder src={s.image} alt={s.title} />
            <div className="mt-4 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-lav text-lg" aria-hidden>
                {s.icon}
              </span>
              <span className="text-xs font-semibold tracking-[0.2em] text-purple uppercase">
                Solution {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
            <p className="mt-1 text-sm text-deep/80">{s.summary}</p>
          </Card>
        </Link>
      ))}
    </div>
  )
}
