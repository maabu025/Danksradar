import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'dark' | 'light'

const styles: Record<Variant, string> = {
  primary: 'bg-purple text-white hover:bg-electric',
  outline: 'border-2 border-purple text-purple hover:bg-lav',
  dark: 'bg-deep text-white hover:bg-purple',
  light: 'bg-white text-deep hover:bg-lav',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric disabled:opacity-60'

type LinkProps = { href: string; variant?: Variant; className?: string; children: ReactNode }

export function ButtonLink({ href, variant = 'primary', className = '', children }: LinkProps) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  )
}

type BtnProps = ComponentProps<'button'> & { variant?: Variant }

export function Button({ variant = 'primary', className = '', ...props }: BtnProps) {
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />
}
