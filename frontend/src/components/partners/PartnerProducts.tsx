'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import type { Product } from '@/types'

import { ProductImage } from '@/components/products/ProductImage'

/** A partner's products with a search bar and category filter, shown two per row */
export function PartnerProducts({ products, partnerName }: { products: Product[]; partnerName: string }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  // only offer the categories this partner actually has
  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products])

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (!q || `${p.name} ${p.summary} ${p.category} ${p.features.join(' ')}`.toLowerCase().includes(q)),
    )
  }, [products, query, category])

  if (products.length === 0) return <p className="text-sm text-deep/70">Products coming soon.</p>

  const control =
    'h-12 rounded-full border border-deep/15 bg-white px-5 text-sm outline-none transition hover:border-electric focus:border-purple focus:ring-2 focus:ring-electric/30'

  return (
    <>
      <div className="mb-6 grid gap-3 md:grid-cols-[2fr_1fr]">
        <input
          type="search"
          placeholder={`Search ${partnerName} products`}
          aria-label={`Search ${partnerName} products`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={control}
        />
        <select aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)} className={control}>
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* quick category chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {['all', ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={`rounded-full px-4 py-2 text-sm font-semibold btn-fun ${
              category === c ? 'bg-purple text-white' : 'bg-lav text-purple hover:bg-purple/15'
            }`}
          >
            {c === 'all' ? `All (${products.length})` : `${c} (${products.filter((p) => p.category === c).length})`}
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm text-deep/70" aria-live="polite">
        {shown.length} {shown.length === 1 ? 'product' : 'products'}
      </p>

      {shown.length ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="group card-fun rounded-2xl border border-lav bg-white p-4">
              <ProductImage product={p} className="h-48" />
              <span className="mt-4 inline-block rounded-full bg-lav px-2.5 py-1 text-xs font-semibold text-purple">{p.category}</span>
              <h3 className="mt-2 font-bold group-hover:text-purple">{p.name}</h3>
              <p className="text-sm text-deep/80">{p.summary}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl bg-lav p-8 text-center">No products match. Try another search or category.</p>
      )}
    </>
  )
}
