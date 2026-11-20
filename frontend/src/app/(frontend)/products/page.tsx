import type { Metadata } from 'next'
import { Suspense } from 'react'

import { HeroSlideshow } from '@/components/home/HeroSlideshow'
import { ProductCatalog } from '@/components/products/ProductCatalog'
import { products } from '@/data/products'

export const metadata: Metadata = {
  title: 'Products & Services',
  description: 'GPS trackers, AI dashcams, asset trackers and fleet software from Jimi IoT, Targa Telematics, Teltonika and Lytx.',
}

const slides = [
  { tagline: 'Devices built for African roads.', alt: 'GPS tracker, AI dashcam and asset tracker', image: '/images/hero/prod1.jpg' },
  { tagline: 'Hardware and software that work together.', alt: 'Tracker connected to the fleet platform and phone app', image: '/images/hero/prod2.jpg' },
]

export default function ProductsPage() {
  return (
    <>
      <HeroSlideshow slides={slides} />
      <section className="section">
        <div className="container-page">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">Products &amp; Services</h2>
          {/* Suspense is needed because the filters read the address bar */}
          <Suspense>
            <ProductCatalog products={products} />
          </Suspense>
        </div>
      </section>
    </>
  )
}
