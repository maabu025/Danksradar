import Image from 'next/image'
import Link from 'next/link'

type Props = { onDark?: boolean; className?: string }

export function Logo({ onDark = false, className = '' }: Props) {
  return (
    <Link href="/" aria-label="Danksradar home" className={`inline-flex shrink-0 ${className}`}>
      <Image
        src={onDark ? '/logos/danksradar-logo-on-dark.png' : '/logos/danksradar-logo-on-white.png'}
        alt="Danksradar"
        width={180}
        height={34}
        priority
        className="h-auto w-[150px] md:w-[180px]"
      />
    </Link>
  )
}
