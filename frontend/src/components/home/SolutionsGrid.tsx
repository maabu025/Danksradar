import Link from 'next/link'

import { solutions } from '@/data/solutions'

import { Card } from '../ui/Card'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'

/** Six solution cards with image placeholders and one short line each */
export function SolutionsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {solutions.map((s) => (
        <Link key={s.slug} href={`/solutions#${s.slug}`} id={s.slug} className="block">
          <Card className="h-full">
            <ImagePlaceholder src={s.image} alt={s.title} />
            <div className="mt-4 grid h-9 w-9 place-items-center rounded-lg bg-lav text-lg" aria-hidden>
              {s.icon}
            </div>
            <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
            <p className="mt-1 text-sm text-deep/80">{s.summary}</p>
          </Card>
        </Link>
      ))}
    </div>
  )
}
