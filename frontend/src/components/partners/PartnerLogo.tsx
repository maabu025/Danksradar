import Image from 'next/image'

import type { Partner } from '@/types'

type Props = { partner: Partner; size?: 'md' | 'lg'; showName?: boolean }

/** Partner logo; white logos sit on a deep purple tile. Falls back to the name. */
export function PartnerLogo({ partner, size = 'md', showName = true }: Props) {
  const box = size === 'lg' ? 'h-24 w-56' : 'h-16 w-40'
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative grid place-items-center rounded-xl p-3 ${box} ${partner.darkLogoBg ? 'bg-deep' : 'bg-white'}`}>
        {partner.logo ? (
          <Image src={partner.logo} alt={`${partner.name} logo`} fill className="object-contain p-3" sizes="224px" />
        ) : showName ? (
          <span className="text-xl font-bold text-deep">{partner.name}</span>
        ) : (
          <span className="grid h-full w-full place-items-center rounded-lg border border-dashed border-electric bg-lav text-xs text-purple">
            Logo
          </span>
        )}
      </div>
      {showName && partner.darkLogoBg && <span className="text-sm font-semibold">{partner.name}</span>}
    </div>
  )
}
