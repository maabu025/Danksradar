import { steps } from '@/data/company'

import { SectionHeader } from '../ui/SectionHeader'

/** "How we work": the six steps from the company profile */
export function HowWeWork({ className = '' }: { className?: string }) {
  return (
    <section className={`section ${className}`}>
      <div className="container-page">
        <SectionHeader eyebrow="Our approach" title="How we work" text="Six clear steps, from understanding your fleet to ongoing support." />
        <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="card-fun flex gap-4 rounded-2xl border border-lav bg-white p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-purple text-lg font-bold text-white shadow-lg shadow-purple/30">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-deep/80">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
