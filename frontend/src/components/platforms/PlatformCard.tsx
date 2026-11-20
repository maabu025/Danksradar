import { getPartner } from '@/data/partners'
import type { Platform } from '@/types'

import { ImagePlaceholder } from '../ui/ImagePlaceholder'

export function PlatformCard({ platform, flip }: { platform: Platform; flip?: boolean }) {
  return (
    <article id={platform.slug} className="grid scroll-mt-28 items-center gap-8 md:grid-cols-2">
      <ImagePlaceholder src={platform.image} alt={`${platform.name} dashboard`} label="Platform screenshot" className={`aspect-[30/19] w-full ${flip ? 'md:order-2' : ''}`} />
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-purple uppercase">By {getPartner(platform.partner)?.name}</p>
        <h3 className="mt-2 text-2xl font-bold">{platform.name}</h3>
        <p className="mt-2 text-deep/80">{platform.summary}</p>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {platform.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-electric" aria-hidden /> {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
