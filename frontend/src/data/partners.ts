import type { Partner } from '@/types'

// TODO: confirm each partnership level with management.
// Stats and highlights come from each partner's public figures (2022–2025); re-check them before launch.
export const partners: Partner[] = [
  {
    slug: 'jimi-iot',
    name: 'Jimi IoT',
    logo: '/logos/partners/jimi-iot-logo.png',
    darkLogoBg: true,
    level: 'Strategic partner',
    summary: 'GPS trackers, AI dashcams and the Tracksolid platform.',
    website: 'https://www.jimiiot.com',
    image: '/images/products/jc400.jpg',
    stats: [
      { value: '150+', label: 'countries and regions supplied' },
      { value: '14%', label: 'global market share (Berg Insight, 2021)' },
    ],
    highlights: [
      'Named an IoT industry leader by Berg Insight',
      'Vehicle trackers, AI dashcams and asset trackers in one range',
      'Certified for markets worldwide, including CE and FCC',
    ],
  },
  {
    slug: 'targa-telematics',
    name: 'Targa Telematics',
    logo: '/logos/partners/targa-telematics-logo.png',
    level: 'Technology partner',
    summary: 'Fleet management software and insurance telematics.',
    website: 'https://www.targatelematics.com',
    image: '/images/platforms/targa.jpg',
    stats: [
      { value: '3.5M+', label: 'connected assets' },
      { value: '50', label: 'countries' },
    ],
    highlights: [
      '20+ years of experience in connected vehicles',
      'Vehicle data partnerships with Renault, Toyota, Volvo and Hyundai',
      'Recognised by Frost & Sullivan for insurance telematics',
    ],
  },
  {
    slug: 'teltonika',
    name: 'Teltonika',
    // TODO: add /logos/partners/teltonika-logo.png when supplied
    level: 'Authorised distributor',
    summary: 'Reliable GPS tracking hardware for every vehicle.',
    website: 'https://teltonika-gps.com',
    image: '/images/products/fmc130.jpg',
    stats: [
      { value: '35M+', label: 'IoT devices deployed' },
      { value: '#1', label: 'GPS maker on Wialon, 4 years running' },
    ],
    highlights: [
      'Designed and manufactured in-house in Lithuania',
      'Trackers for cars, trucks, assets and e-mobility',
      'Devices known to keep working for 10+ years',
    ],
  },
  {
    slug: 'lytx',
    name: 'Lytx',
    logo: '/logos/partners/lytx-logo.png',
    level: 'Technology partner',
    summary: 'Video safety and the DriveCam platform.',
    website: 'https://www.lytx.com',
    image: '/images/platforms/lytx.jpg',
    stats: [
      { value: '~1M', label: 'vehicles under subscription' },
      { value: '5,000+', label: 'fleets' },
    ],
    highlights: [
      'Ranked #1 in video telematics by ABI Research',
      'Frost & Sullivan 2025 Global Company of the Year',
      'AI risk detection that turns risky moments into coaching',
    ],
  },
]

export const getPartner = (slug: string) => partners.find((p) => p.slug === slug)
