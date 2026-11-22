'use client'

import { useEffect, useRef, useState } from 'react'

import { painPoints } from '@/data/solutions'

const SLIDE_MS = 6000 // each clip is 6 seconds

/**
 * "Why Danksradar": one container that slides through each pain point,
 * with its video on the right. Clips and text are set in src/data/solutions.ts.
 */
export function WhyUsStrip() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const videos = useRef<(HTMLVideoElement | null)[]>([])
  const count = painPoints.length

  const go = (i: number) => setIndex((i + count) % count)

  // move to the next slide every 6 seconds
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), SLIDE_MS)
    return () => clearTimeout(t)
  }, [index, paused, count])

  // play the visible clip from the start, pause the others
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
    <section className="section bg-lav">
      <div className="container-page">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-purple uppercase">Why Danksradar</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Fleet headaches? Sorted.</h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border-2 border-purple text-purple btn-fun hover:bg-purple hover:text-white"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full bg-purple text-white btn-fun hover:bg-electric"
            >
              →
            </button>
          </div>
        </div>

        {/* the single container; slides move inside it */}
        <div
          className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-deep/10"
          aria-roledescription="carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {painPoints.map((p, i) => (
              <article
                key={p.problem}
                aria-hidden={i !== index}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                className="grid w-full shrink-0 items-center gap-8 p-6 md:grid-cols-[1fr_1.35fr] md:gap-12 md:p-10"
              >
                <div className="order-2 md:order-1">
                  <p className="text-sm font-semibold text-purple">
                    {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">“{p.problem}”</h3>
                  <p className="mt-4 text-lg text-deep/80 md:text-xl">{p.fix}</p>
                </div>
                <div className="order-1 overflow-hidden rounded-2xl bg-deep md:order-2">
                  <video
                    ref={(el) => {
                      videos.current[i] = el
                    }}
                    src={p.video}
                    poster={p.poster}
                    muted
                    loop
                    playsInline
                    autoPlay={i === 0}
                    preload={i === 0 ? 'auto' : 'metadata'}
                    aria-label={p.problem}
                    className="aspect-[18/11] w-full object-cover"
                  />
                </div>
              </article>
            ))}
          </div>

          {/* one tab per pain point, with a progress bar on the current one */}
          <div className="grid grid-cols-2 border-t border-lav md:grid-cols-4">
            {painPoints.map((p, i) => (
              <button
                key={p.problem}
                type="button"
                onClick={() => go(i)}
                aria-current={i === index}
                className={`relative px-5 py-4 text-left text-sm font-semibold transition ${
                  i === index ? 'text-purple' : 'text-deep/60 hover:text-deep'
                }`}
              >
                {p.problem}
                <span className="absolute inset-x-0 top-0 h-1 bg-lav">
                  {i === index && (
                    <span
                      key={`${index}-${paused}`}
                      className="block h-full bg-gradient-to-r from-purple to-electric"
                      style={{
                        animation: `whyus-progress ${SLIDE_MS}ms linear forwards`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
