import type { Partner } from '@/types'

import { CountUp } from '../fx/CountUp'
import { ButtonLink } from '../ui/Button'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { PartnerLogo } from './PartnerLogo'
import { PartnershipLevel } from './PartnershipLevel'

/** One partner on the Partners page, laid out like the management platforms (picture one side, text the other) */
export function PartnerRow({ partner, flip }: { partner: Partner; flip?: boolean }) {
  return (
    <article id={partner.slug} className="grid scroll-mt-28 items-center gap-8 md:grid-cols-2 lg:gap-14">
      <div className={`relative ${flip ? 'md:order-2' : ''}`}>
        <ImagePlaceholder src={partner.image} alt={`${partner.name} products`} className="img-zoom aspect-[30/19] w-full" />
        <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 p-1 shadow-lg">
          <PartnerLogo partner={partner} showName={!partner.logo} />
        </div>
      </div>

      <div>
        <PartnershipLevel level={partner.level} />
        <h3 className="mt-3 text-3xl font-bold">{partner.name}</h3>
        <p className="mt-2 text-deep/80">{partner.summary}</p>

        {partner.stats && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {partner.stats.map((s) => (
              <div key={s.label} className="tile-fun rounded-2xl bg-lav p-4">
                <p className="text-3xl font-bold text-purple">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-1 text-sm text-deep/70">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {partner.highlights && (
          <ul className="mt-6 space-y-2 text-sm">
            {partner.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-electric" aria-hidden /> {h}
              </li>
            ))}
          </ul>
        )}

        <ButtonLink href={`/partners/${partner.slug}`} className="mt-7">
          View {partner.name} products →
        </ButtonLink>
      </div>
    </article>
  )
}
