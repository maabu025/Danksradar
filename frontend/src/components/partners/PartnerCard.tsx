import Link from 'next/link'

import type { Partner } from '@/types'

import { Card } from '../ui/Card'
import { PartnerLogo } from './PartnerLogo'
import { PartnershipLevel } from './PartnershipLevel'

export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <Link href={`/partners/${partner.slug}`} className="block">
      <Card className="flex h-full flex-col items-center gap-4 p-8 text-center">
        <PartnerLogo partner={partner} showName={false} />
        <h3 className="text-lg font-bold">{partner.name}</h3>
        <PartnershipLevel level={partner.level} />
      </Card>
    </Link>
  )
}
