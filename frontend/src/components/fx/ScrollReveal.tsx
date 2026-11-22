'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// What fades and slides in as you scroll: section headings, cards, tiles, pictures,
// and anything marked with data-reveal. The Home hero is left alone.
const TARGETS = [
  'main section h2',
  'main section h2 + p',
  '.card-fun',
  '.tile-fun',
  '.img-zoom',
  '[data-reveal]',
].join(',')

/** Fades content up into view as the visitor scrolls, with a small stagger between neighbours. */
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter(
      (el) => !el.closest('[aria-roledescription="carousel"]') && !el.classList.contains('reveal'),
    )

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('reveal-in')
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    els.forEach((el) => {
      // stagger cards that sit side by side
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : []
      const i = Math.max(0, siblings.indexOf(el)) % 6
      el.style.setProperty('--reveal-delay', `${i * 90}ms`)
      el.classList.add('reveal')
      io.observe(el)
    })
    return () => io.disconnect()
  }, [pathname])

  return null
}
