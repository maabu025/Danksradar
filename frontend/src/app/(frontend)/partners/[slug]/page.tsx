import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CtaBand } from '@/components/home/CtaBand'
import { PartnerCard } from '@/components/partners/PartnerCard'
import { PartnerLogo } from '@/components/partners/PartnerLogo'
import { PartnerProducts } from '@/components/partners/PartnerProducts'
import { PartnershipLevel } from '@/components/partners/PartnershipLevel'
import { getPartner, getPartners, getProducts } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 60

export async function generateStaticParams() {
  return (await getPartners()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const partner = await getPartner((await params).slug)
  return partner ? { title: partner.name, description: partner.summary } : {}
}

export default async function PartnerPage({ params }: Props) {
  const partner = await getPartner((await params).slug)
  if (!partner) notFound()
  const [products, partners] = await Promise.all([getProducts(), getPartners()])
  const devices = products.filter((p) => p.partner === partner.slug)
  const others = partners.filter((p) => p.slug !== partner.slug)

  return (
    <>
      <section className="bg-deep text-white">
        <div className="container-page flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <PartnershipLevel level={partner.level} />
            <h1 className="mt-4 text-4xl font-bold md:text-5xl">{partner.name}</h1>
            <p className="mt-3 max-w-xl text-lg text-lav">{partner.summary}</p>
          </div>
          <PartnerLogo partner={partner} size="lg" />
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">Products</h2>
          <PartnerProducts products={devices} partnerName={partner.name} />
        </div>
      </section>

      <section className="section bg-lav">
        <div className="container-page">
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">Our other partners</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {others.map((p) => (
              <PartnerCard key={p.slug} partner={p} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
