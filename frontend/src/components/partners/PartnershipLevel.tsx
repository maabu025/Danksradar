import type { PartnerLevel } from '@/types'

export function PartnershipLevel({ level }: { level: PartnerLevel }) {
  return <span className="rounded-full bg-lav px-3 py-1 text-xs font-semibold text-purple">{level}</span>
}
