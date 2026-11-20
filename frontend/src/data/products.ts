import type { Product, ProductCategory } from '@/types'

export const categories: ProductCategory[] = ['GPS trackers', 'AI dashcams', 'Asset trackers', 'Fleet software']

// Starter list. TODO: replace with the final product list and real photos from each partner.
// The images in /public/images/products are illustrations: keep the same file names when you swap in real photos.
// Once the admin panel is in use, products come from the database instead (see src/lib/content.ts).
export const products: Product[] = [
  {
    slug: 'jimi-vl802',
    image: '/images/products/vl802.jpg',
    name: 'Jimi IoT VL802',
    partner: 'jimi-iot',
    category: 'GPS trackers',
    summary: '4G vehicle tracker for live tracking and fleet control.',
    features: ['4G connectivity', 'Live tracking', 'Remote engine cut-off', 'Works with Tracksolid'],
  },
  {
    slug: 'jimi-jc400',
    image: '/images/products/jc400.jpg',
    name: 'Jimi IoT JC400',
    partner: 'jimi-iot',
    category: 'AI dashcams',
    summary: 'Connected dashcam with live video and event recording.',
    features: ['Live video', 'Event recording', 'GPS location', 'Works with Tracksolid'],
  },
  {
    slug: 'teltonika-fmc130',
    image: '/images/products/fmc130.jpg',
    name: 'Teltonika FMC130',
    partner: 'teltonika',
    category: 'GPS trackers',
    summary: '4G tracker with inputs for sensors and accessories.',
    features: ['4G connectivity', 'Digital and analogue inputs', 'Backup battery'],
  },
  {
    slug: 'lytx-drivecam',
    image: '/images/products/drivecam.jpg',
    name: 'Lytx DriveCam',
    partner: 'lytx',
    category: 'AI dashcams',
    summary: 'AI video safety camera for driver coaching.',
    features: ['Risk detection', 'Driver coaching', 'In-cab alerts'],
  },
  {
    slug: 'targa-fleet-platform',
    image: '/images/products/targa.jpg',
    name: 'Targa fleet platform',
    partner: 'targa-telematics',
    category: 'Fleet software',
    summary: 'Cloud software to run your whole fleet in one place.',
    features: ['Live map', 'Trip reports', 'Maintenance reminders'],
  },
  {
    slug: 'jimi-asset-tracker',
    image: '/images/products/asset.jpg',
    name: 'Jimi IoT asset tracker',
    partner: 'jimi-iot',
    category: 'Asset trackers',
    summary: 'Long-battery tracker for trailers, containers and goods.',
    features: ['Long battery life', 'Magnetic mount', 'Movement alerts'],
  },
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)
