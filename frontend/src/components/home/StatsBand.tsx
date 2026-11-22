import { CountUp } from '@/components/fx/CountUp'
import { products } from '@/data/products'
import { solutions } from '@/data/solutions'

/** Big counting numbers under the hero */
export function StatsBand({ partnerCount }: { partnerCount: number }) {
  const stats = [
    { value: String(partnerCount), label: 'Global technology partners' },
    { value: `${products.length}+`, label: 'Devices and services' },
    { value: String(solutions.length), label: 'Solutions, from cars to industrial fleets' },
    { value: '150+', label: 'Countries using our partners’ technology' },
  ]
  return (
    <section className="relative overflow-hidden bg-deep text-white">
      <div aria-hidden className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-electric/30 blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-purple/40 blur-3xl" />
      <div className="container-page relative grid grid-cols-2 gap-y-10 py-12 md:grid-cols-4 md:py-14">
        {stats.map((s) => (
          <div key={s.label} data-reveal className="border-l border-white/15 pl-5">
            <p className="text-4xl font-bold md:text-6xl">
              <CountUp value={s.value} />
            </p>
            <p className="mt-2 text-sm text-lav/80 md:text-base">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
