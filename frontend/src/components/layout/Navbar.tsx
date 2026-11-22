'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { navigation } from '@/data/navigation'

import { ButtonLink } from '../ui/Button'
import { Logo } from './Logo'

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState<string | null>(null) // open drop-down
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // close menus when the page changes
  useEffect(() => {
    setOpen(null)
    setMobile(false)
  }, [pathname])

  // close drop-down on outside click or Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  // the nav is see-through only on the Home page, over the slideshow, until you scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const overHero = pathname === '/' && !scrolled && !mobile && !open

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        overHero ? 'border-b border-transparent bg-transparent' : 'border-b border-lav bg-white/95 backdrop-blur'
      }`}
    >
      <nav className="container-page flex h-20 items-center justify-between gap-6" aria-label="Main">
        <Logo onDark={overHero} />

        {/* desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.menu && setOpen(item.label)}
              onMouseLeave={() => item.menu && setOpen(null)}
            >
              <div className="flex items-center">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`link-fun rounded-full px-3 py-2 text-sm font-medium transition ${
                    overHero
                      ? isActive(item.href)
                        ? 'text-white'
                        : 'text-white/85 hover:text-white'
                      : isActive(item.href)
                        ? 'text-purple'
                        : 'text-deep hover:text-purple'
                  }`}
                >
                  {item.label}
                </Link>
                {item.menu && (
                  <button
                    type="button"
                    aria-label={`Open ${item.label} menu`}
                    aria-expanded={open === item.label}
                    onClick={() => setOpen(open === item.label ? null : item.label)}
                    className={`-ml-2 rounded-full p-1 ${overHero ? 'text-white/85 hover:text-white' : 'text-deep hover:text-purple'}`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      aria-hidden
                      className={`transition ${open === item.label ? 'rotate-180' : ''}`}
                    >
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" />
                    </svg>
                  </button>
                )}
              </div>

              {/* drop-down: sits right under its own tab (pt-3 bridges the gap so it doesn't close) */}
              {item.menu && open === item.label && (
                <div className="absolute top-full left-0 z-50 pt-3">
                  <div className="flex gap-10 rounded-2xl border border-lav bg-white p-6 shadow-xl shadow-deep/10">
                    {item.menu.map((col) => (
                      <div key={col.title} className="min-w-48">
                        <p className="mb-3 text-xs font-semibold tracking-[0.2em] whitespace-nowrap text-purple uppercase">
                          {col.title}
                        </p>
                        <ul className="space-y-2">
                          {col.links.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} className="link-slide text-sm whitespace-nowrap text-deep hover:text-purple">
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <ButtonLink href="/request-a-demo">Request a demo</ButtonLink>
        </div>

        {/* mobile menu button */}
        <button
          type="button"
          className={`rounded-lg p-2 lg:hidden ${overHero ? 'text-white' : 'text-deep'}`}
          aria-label={mobile ? 'Close menu' : 'Open menu'}
          aria-expanded={mobile}
          onClick={() => setMobile(!mobile)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
            {mobile ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
            )}
          </svg>
        </button>
      </nav>

      {/* mobile menu */}
      {mobile && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-lav bg-white lg:hidden">
          <ul className="container-page space-y-1 py-4">
            {navigation.map((item) => (
              <li key={item.label}>
                {item.menu ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-medium">
                      {item.label}
                      <span className="transition group-open:rotate-180" aria-hidden>
                        ▾
                      </span>
                    </summary>
                    <div className="space-y-4 pb-3 pl-3">
                      <Link href={item.href} className="block text-sm font-semibold text-purple">
                        Go to {item.label}
                      </Link>
                      {item.menu.map((col) => (
                        <div key={col.title}>
                          <p className="mb-1 text-xs font-semibold tracking-widest text-purple uppercase">{col.title}</p>
                          {col.links.map((l) => (
                            <Link key={l.href} href={l.href} className="block py-1.5 text-sm">
                              {l.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link href={item.href} className="block py-3 font-medium">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="pt-3">
              <ButtonLink href="/request-a-demo" className="w-full">
                Request a demo
              </ButtonLink>
            </li>
          </ul>
        </div>
      )}
    </header>
    {/* other pages start below the fixed nav */}
    {pathname !== '/' && <div className="h-20" aria-hidden />}
    </>
  )
}
