'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { partners } from '@/data/partners'
import { categories } from '@/data/products'
import type { Product } from '@/types'

import { ProductCard } from './ProductCard'

/** Search bar + partner filter + category filter side by side, then the product grid */
export function ProductCatalog({ products }: { products: Product[] }) {
  const params = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const partner = params.get('partner') ?? 'all'
  const category = params.get('category') ?? 'all'

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString())
    if (value === 'all') next.delete(key)
    else next.set(key, value)
    router.replace(`/products${next.size ? `?${next}` : ''}`, { scroll: false })
  }

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter(
      (p) =>
        (partner === 'all' || p.partner === partner) &&
        (category === 'all' || p.category === category) &&
        (!q || `${p.name} ${p.summary} ${p.category}`.toLowerCase().includes(q)),
    )
  }, [products, query, partner, category])

  const control =
    'h-12 rounded-full border border-deep/15 bg-white px-5 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-electric/30'

  return (
    <>
      <div className="mb-10 grid gap-3 md:grid-cols-[2fr_1fr_1fr]">
        <input
          type="search"
          placeholder="Search products"
          aria-label="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={control}
        />
        <select aria-label="Filter by partner" value={partner} onChange={(e) => setParam('partner', e.target.value)} className={control}>
          <option value="all">All partners</option>
          {partners.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
        <select aria-label="Filter by category" value={category} onChange={(e) => setParam('category', e.target.value)} className={control}>
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-4 text-sm text-deep/70" aria-live="polite">
        {shown.length} {shown.length === 1 ? 'product' : 'products'}
      </p>

      {shown.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl bg-lav p-8 text-center">No products match. Try another search or filter.</p>
      )}
    </>
  )
}
