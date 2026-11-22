import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductImage } from '@/components/products/ProductImage'
import { getPartner, getProduct, getProducts } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 60

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).slug)
  return product ? { title: product.name, description: product.summary } : {}
}

export default async function ProductDetailsPage({ params }: Props) {
  const product = await getProduct((await params).slug)
  if (!product) notFound()
  const [partner, products] = await Promise.all([getPartner(product.partner), getProducts()])
  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3)

  return (
    <>
      <section className="section">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-deep/70">
            <Link href="/products" className="hover:text-purple">
              Products &amp; Services
            </Link>{' '}
            / <span className="text-deep">{product.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <ProductImage product={product} className="h-80 md:h-[420px]" sizes="(max-width: 768px) 100vw, 800px" />
              <div className="mt-8">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-lav px-3 py-1 font-semibold text-purple">{product.category}</span>
                  {partner && (
                    <Link href={`/partners/${partner.slug}`} className="rounded-full border border-lav px-3 py-1 hover:border-purple">
                      {partner.name}
                    </Link>
                  )}
                </div>
                <h1 className="mt-4 text-3xl font-bold md:text-4xl">{product.name}</h1>
                <p className="mt-3 text-lg text-deep/80">{product.summary}</p>
                <h2 className="mt-8 mb-3 font-bold">Key features</h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="h-2 w-2 rounded-full bg-electric" aria-hidden /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-lav p-6 lg:sticky lg:top-28">
              <h2 className="mb-4 text-xl font-bold">Request a quote</h2>
              <QuoteRequestForm product={product.name} />
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-lav">
          <div className="container-page">
            <h2 className="mb-8 text-2xl font-bold">Similar products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
