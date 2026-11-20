import Link from 'next/link'

import { getPartner } from '@/data/partners'
import type { Product } from '@/types'

import { Card } from '../ui/Card'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="block">
      <Card className="flex h-full flex-col">
        <ImagePlaceholder src={product.image} alt={product.name} className="h-44" />
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-lav px-2.5 py-1 font-semibold text-purple">{product.category}</span>
          <span className="rounded-full border border-lav px-2.5 py-1">{getPartner(product.partner)?.name}</span>
        </div>
        <h3 className="mt-3 text-lg font-bold">{product.name}</h3>
        <p className="mt-1 flex-1 text-sm text-deep/80">{product.summary}</p>
        <span className="mt-4 text-sm font-semibold text-purple">View details →</span>
      </Card>
    </Link>
  )
}
