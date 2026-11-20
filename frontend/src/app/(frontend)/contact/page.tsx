import type { Metadata } from 'next'

import { ContactForm } from '@/components/forms/ContactForm'
import { PageHero } from '@/components/ui/PageHero'
import { site } from '@/data/site'

export const metadata: Metadata = { title: 'Contact us', description: 'Call, email or send Danksradar a message.' }

export default function ContactPage() {
  const details = [
    { label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
    { label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { label: 'WhatsApp', value: 'Chat with us', href: `https://wa.me/${site.whatsapp}` },
    { label: 'Office', value: site.address },
  ]

  return (
    <>
      <PageHero eyebrow="Contact us" title="Let's talk" text="Send us a message and we'll reply within one working day." />
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_2fr]">
          <ul className="space-y-4">
            {details.map((d) => (
              <li key={d.label} className="rounded-2xl bg-lav p-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-purple uppercase">{d.label}</p>
                {d.href ? (
                  <a href={d.href} className="mt-1 block font-semibold hover:text-purple">
                    {d.value}
                  </a>
                ) : (
                  <p className="mt-1 font-semibold">{d.value}</p>
                )}
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-lav p-6 md:p-8">
            <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
