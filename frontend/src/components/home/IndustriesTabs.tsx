'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { ButtonLink } from '../ui/Button'

// Change the wording or pictures here. Pictures live in /public/images.
const industries = [
  {
    name: 'Logistics & haulage',
    image: '/images/solutions/fleet.jpg',
    title: 'Keep every load moving',
    text: 'Live location, routes and stops for every truck, so you can plan better and answer customers in seconds.',
    points: ['Live tracking and trip history', 'Fuel and idling reports', 'Alerts for speeding and route changes'],
  },
  {
    name: 'Mining & construction',
    image: '/images/solutions/asset.jpg',
    title: 'Protect heavy machines and sites',
    text: 'Track equipment, generators and vehicles on and off site, and know the moment something moves when it shouldn’t.',
    points: ['Geofences around sites and pits', 'Engine hours for maintenance', 'Battery-powered asset trackers'],
  },
  {
    name: 'Public transport & schools',
    image: '/images/solutions/driver.jpg',
    title: 'Every passenger home safely',
    text: 'AI cameras watch for fatigue, phone use and distraction, and warn the driver before it becomes an accident.',
    points: ['Driver fatigue and distraction alerts', 'Video of every incident', 'Arrival times parents and riders can trust'],
  },
  {
    name: 'Taxis & ride-hailing',
    image: '/images/solutions/theft.jpg',
    title: 'Know where every car is, all the time',
    text: 'Stop unauthorised trips, recover stolen vehicles fast and settle disputes with video evidence.',
    points: ['Remote engine cut-off', 'Theft and tamper alerts', 'Dashcam footage on demand'],
  },
  {
    name: 'Insurance',
    image: '/images/solutions/insurance.jpg',
    title: 'Price risk on real driving',
    text: 'Driving-behaviour data and crash detection help insurers reward safe drivers and handle claims faster.',
    points: ['Crash detection and reconstruction', 'Driver scoring', 'Faster, fairer claims'],
  },
]

/** "Built for every road": tabs for each industry, the picture and text change with the tab */
export function IndustriesTabs() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // moves on by itself every 7 seconds until the visitor hovers
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive((i) => (i + 1) % industries.length), 7000)
    return () => clearInterval(t)
  }, [paused])

  const item = industries[active]

  return (
    <section className="section bg-lav" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container-page">
        <div className="mb-8 max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-purple uppercase">Industries</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Built for every road</h2>
        </div>

        <div role="tablist" aria-label="Industries" className="mb-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {industries.map((ind, i) => (
            <button
              key={ind.name}
              role="tab"
              type="button"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`relative shrink-0 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                i === active ? 'bg-purple text-white shadow-lg shadow-purple/30' : 'bg-white text-deep hover:-translate-y-0.5 hover:text-purple'
              }`}
            >
              {ind.name}
              {i === active && !paused && (
                <span
                  key={active}
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left animate-[whyus-progress_7s_linear_forwards] bg-white/70"
                />
              )}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="grid items-center gap-8 md:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[30/19] overflow-hidden rounded-3xl shadow-xl">
            {industries.map((ind, i) => (
              <Image
                key={ind.name}
                src={ind.image}
                alt={ind.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover transition-all duration-[900ms] ease-out ${
                  i === active ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-deep/50 to-transparent" />
            <span className="absolute bottom-5 left-5 rounded-full bg-white/95 px-4 py-1.5 text-sm font-semibold text-purple">
              {item.name}
            </span>
          </div>

          <div key={active} className="animate-[slide-in_.6s_cubic-bezier(.22,1,.36,1)_both]">
            <h3 className="text-3xl font-bold md:text-4xl">{item.title}</h3>
            <p className="mt-3 text-lg text-deep/80">{item.text}</p>
            <ul className="mt-6 space-y-3">
              {item.points.map((p, i) => (
                <li
                  key={p}
                  style={{ animationDelay: `${150 + i * 100}ms` }}
                  className="flex animate-[slide-in_.6s_cubic-bezier(.22,1,.36,1)_both] items-center gap-3 font-medium"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-purple text-sm text-white">✓</span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/request-a-demo">Request a demo</ButtonLink>
              <ButtonLink href="/solutions#industries" variant="outline">
                All industries we serve
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
