import type { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-lav bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${className}`}>
      {children}
    </div>
  )
}
