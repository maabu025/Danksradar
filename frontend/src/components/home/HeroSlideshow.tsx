'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export type Slide = {
  tagline: string
  alt: string
  /** Photo or GIF, e.g. '/images/hero/fleet.jpg' */
  image?: string
  /** MP4 video, e.g. '/videos/hero/home-tracking.mp4' (plays muted and loops) */
  video?: string
  /** Still image shown while the video loads */
  poster?: string
  /** How long this slide stays, in seconds (e.g. the video's length). Defaults to the slideshow interval. */
  duration?: number
}

type Props = {
  slides: Slide[]
  interval?: number
  /** Fill the whole screen height, with room for the see-through nav on top (Home page) */
  fullScreen?: boolean
}

/** Full-width slideshow with one tagline per slide, as in the prototype. */
export function HeroSlideshow({ slides, interval = 8000, fullScreen = false }: Props) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const videos = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    if (paused || slides.length < 2) return
    const ms = slides[index]?.duration ? slides[index].duration! * 1000 : interval
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), ms)
    return () => clearTimeout(t)
  }, [paused, slides, index, interval])

  // play only the visible slide's video, from the start
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return
      if (i === index) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [index])

  return (
    <section
      className={`relative overflow-hidden bg-deep ${fullScreen ? 'h-svh min-h-[560px]' : 'h-[420px] md:h-[560px]'}`}
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div
          key={i}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        >
          {s.video ? (
            <video
              ref={(el) => {
                videos.current[i] = el
              }}
              src={s.video}
              poster={s.poster}
              muted
              loop
              playsInline
              autoPlay={i === 0}
              preload={i === 0 ? 'auto' : 'metadata'}
              aria-label={s.alt}
              className="absolute inset-0 h-full w-full object-cover object-right"
            />
          ) : s.image ? (
            <Image
              src={s.image}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${i === index ? 'animate-[kenburns_9s_ease-out_both]' : ''}`}
            />
          ) : (
            <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-electric via-purple to-deep">
              <div className="absolute top-1/4 right-[15%] h-80 w-80 animate-[float-glow_9s_ease-in-out_infinite] rounded-full bg-white/20 blur-3xl" />
              <div className="absolute right-[35%] bottom-10 h-64 w-64 animate-[float-glow_12s_ease-in-out_infinite_reverse] rounded-full bg-electric/40 blur-3xl" />
            </div>
          )}
          {/* phones: darken the whole slide so the tagline stays readable; larger screens: fade from the left */}
          <div className="absolute inset-0 bg-deep/70 md:hidden" />
          <div className={`absolute inset-0 hidden bg-gradient-to-r to-transparent md:block ${fullScreen ? 'from-deep/95 via-deep/70' : 'from-deep/85 via-deep/40'}`} />
          {/* darkens the top so the see-through nav stays readable */}
          {fullScreen && <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-deep/70 to-transparent" />}
          <div className="container-page relative flex h-full items-end pb-16 md:items-center md:pb-0">
            <h1
              className={`font-bold leading-[1.05] text-white ${
                fullScreen ? 'max-w-3xl text-5xl md:text-7xl' : 'max-w-3xl text-4xl md:text-6xl'
              }`}
            >
              {/* each word rises in when its slide appears */}
              {s.tagline.split(' ').map((word, w) => (
                <span
                  key={`${index}-${w}`}
                  className={`inline-block ${i === index ? 'animate-[hero-word_.9s_cubic-bezier(.22,1,.36,1)_both]' : 'opacity-0'}`}
                  style={{ animationDelay: `${200 + w * 90}ms` }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </h1>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-white' : 'w-2.5 bg-white/50'}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
