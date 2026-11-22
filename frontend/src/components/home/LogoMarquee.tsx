import type { Partner } from '@/types'

import { PartnerLogo } from '../partners/PartnerLogo'

/** Endless strip of partner logos; pauses when you hover over it */
export function LogoMarquee({ partners }: { partners: Partner[] }) {
  // repeat the logos so the strip is always full, then once more so it loops without a gap
  const row = Array.from({ length: 3 }, () => partners).flat()
  return (
    <section aria-label="Our technology partners" className="border-y border-lav bg-white py-8">
      <p className="mb-6 text-center text-xs font-semibold tracking-[0.2em] text-purple uppercase">
        Powered by world-class technology
      </p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-10 group-hover:[animation-play-state:paused]">
          {[...row, ...row].map((p, i) => (
            <div
              key={`${p.slug}-${i}`}
              aria-hidden={i >= row.length}
              className="shrink-0 grayscale transition duration-300 hover:scale-110 hover:grayscale-0"
            >
              <PartnerLogo partner={p} showName={!p.logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
