import Link from 'next/link'

import type { Product } from '@/types'

import { ProductImage } from '@/components/products/ProductImage'

/** 2×2 grid of a partner's devices */
export function DeviceGrid({ products }: { products: Product[] }) {
  if (products.length === 0) return <p className="text-sm text-deep/70">Products coming soon.</p>
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {products.slice(0, 4).map((p) => (
        <Link key={p.slug} href={`/products/${p.slug}`} className="group card-fun rounded-2xl border border-lav bg-white p-4">
          <ProductImage product={p} className="h-48" />
          <h3 className="mt-4 font-bold group-hover:text-purple">{p.name}</h3>
          <p className="text-sm text-deep/80">{p.summary}</p>
        </Link>
      ))}
    </div>
  )
}
