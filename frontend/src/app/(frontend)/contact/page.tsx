import type { Metadata } from 'next'

import { ContactForm } from '@/components/forms/ContactForm'
import { PageHero } from '@/components/ui/PageHero'
import { getSiteSettings } from '@/lib/content'

export const metadata: Metadata = { title: 'Contact us', description: 'Call, email or message Danksradar. Our team in Obuasi, Ghana is ready to attend to you any day.' }

export const revalidate = 60

export default async function ContactPage() {
  const site = await getSiteSettings()
  const details = [
    { label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
    { label: 'Phone (alternative)', value: site.phone2, href: `tel:${site.phone2.replace(/\s/g, '')}` },
    { label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { label: 'WhatsApp', value: 'Chat with us', href: `https://wa.me/${site.whatsapp}` },
    { label: 'Head office', value: site.address },
    { label: 'LinkedIn', value: 'Danksradar on LinkedIn', href: site.linkedin },
  ]

  return (
    <>
      <PageHero eyebrow="Contact us" title="Get in touch" text="Talk to our team in Ghana, ready to attend to you any day." />
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_2fr]">
          <ul className="space-y-4">
            {details.map((d) => (
              <li key={d.label} className="tile-fun rounded-2xl bg-lav p-6">
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
