import { site } from '@/data/site'

import { ButtonLink } from '../ui/Button'

/** "Ready to put your fleet on the radar?" with phone, email and demo button */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-deep">
      <div aria-hidden className="absolute -top-20 right-1/4 h-64 w-64 rounded-full bg-purple/40 blur-3xl" />
      <div className="container-page relative flex flex-col items-start justify-between gap-8 py-14 lg:flex-row lg:items-center">
        <div className="text-white">
          <h2 className="text-2xl font-bold md:text-4xl">Ready to put your fleet on the radar?</h2>
          <p className="mt-2 text-lav">Talk to our team in Ghana, ready to attend to you any day.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`tel:${site.phone.replace(/\s/g, '')}`} variant="light">
            📞 {site.phone}
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} variant="light">
            ✉️ {site.email}
          </ButtonLink>
          <ButtonLink href="/request-a-demo">Request a demo</ButtonLink>
        </div>
      </div>
    </section>
  )
}
