import type { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-lav bg-white p-4 shadow-sm card-fun ${className}`}>
      {children}
    </div>
  )
}
