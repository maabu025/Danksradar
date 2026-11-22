import { faqs } from '@/data/faq'
import { site } from '@/data/site'

import { ButtonLink } from '../ui/Button'

/** FAQ with click-to-open answers and a contact-support box */
export function FaqAccordion() {
  return (
    <section className="section">
      <div className="container-page grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-purple uppercase">FAQ</p>
          <h2 className="mt-2 mb-8 text-3xl font-bold md:text-4xl">Questions, answered.</h2>
          <div className="divide-y divide-lav rounded-2xl border border-lav">
            {faqs.map((f) => (
              <details key={f.question} className="group px-6 py-5 transition-colors hover:bg-lav/50">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {f.question}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lav text-purple transition group-hover:scale-110 group-hover:bg-purple group-hover:text-white group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-deep/80">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-2xl bg-lav p-8">
          <h3 className="text-xl font-bold">Still have a question?</h3>
          <p className="mt-2 text-sm text-deep/80">Our support team is happy to help.</p>
          <div className="mt-6 flex flex-col gap-3">
            <ButtonLink href="/contact">Contact support</ButtonLink>
            <ButtonLink href={`tel:${site.phone.replace(/\s/g, '')}`} variant="outline">
              Call {site.phone}
            </ButtonLink>
          </div>
        </aside>
      </div>
    </section>
  )
}
