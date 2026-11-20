import { ButtonLink } from '../ui/Button'

export function CtaBand() {
  return (
    <section className="bg-purple">
      <div className="container-page flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
        <div className="text-white">
          <h2 className="text-2xl font-bold md:text-3xl">Ready to see your fleet clearly?</h2>
          <p className="mt-1 text-lav">Book a free demo. It takes 2 minutes.</p>
        </div>
        <ButtonLink href="/request-a-demo" variant="light">
          Request a demo
        </ButtonLink>
      </div>
    </section>
  )
}
