import Link from 'next/link'

import { categories } from '@/data/products'

import { ButtonLink } from '../ui/Button'
import { Card } from '../ui/Card'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { SectionHeader } from '../ui/SectionHeader'

const images: Record<string, string> = {
  'GPS trackers': '/images/products/vl802.jpg',
  'AI dashcams': '/images/products/jc400.jpg',
  'Asset trackers': '/images/products/asset.jpg',
  'Fleet software': '/images/products/targa.jpg',
}

const lines: Record<string, string> = {
  'GPS trackers': 'Live location for cars, trucks and bikes.',
  'AI dashcams': 'Video that spots risk on the road.',
  'Asset trackers': 'Long-battery tracking for trailers and goods.',
  'Fleet software': 'Run your whole fleet from one screen.',
}

/** Products overview section used on the Management Platforms page */
export function ProductsOverview() {
  return (
    <section className="section">
      <div className="container-page">
        <SectionHeader eyebrow="Products overview" title="Hardware for every vehicle" text="Devices from our partners that connect to your platform." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c} href={`/products?category=${encodeURIComponent(c)}`} className="block">
              <Card className="h-full">
                <ImagePlaceholder src={images[c]} alt={c} />
                <h3 className="mt-4 text-lg font-bold">{c}</h3>
                <p className="mt-1 text-sm text-deep/80">{lines[c]}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-purple">View products →</span>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/products">View all products &amp; services</ButtonLink>
        </div>
      </div>
    </section>
  )
}
