import type { Partner } from '@/types'

// TODO: confirm each partnership level with management
export const partners: Partner[] = [
  {
    slug: 'jimi-iot',
    name: 'Jimi IoT',
    logo: '/logos/partners/jimi-iot-logo.png',
    darkLogoBg: true,
    level: 'Strategic partner',
    summary: 'GPS trackers, AI dashcams and the Tracksolid platform.',
    website: 'https://www.jimiiot.com',
  },
  {
    slug: 'targa-telematics',
    name: 'Targa Telematics',
    logo: '/logos/partners/targa-telematics-logo.png',
    level: 'Technology partner',
    summary: 'Fleet management software and insurance telematics.',
    website: 'https://www.targatelematics.com',
  },
  {
    slug: 'teltonika',
    name: 'Teltonika',
    // TODO: add /logos/partners/teltonika-logo.png when supplied
    level: 'Authorised distributor',
    summary: 'Reliable GPS tracking hardware for every vehicle.',
    website: 'https://teltonika-gps.com',
  },
  {
    slug: 'lytx',
    name: 'Lytx',
    logo: '/logos/partners/lytx-logo.png',
    level: 'Technology partner',
    summary: 'Video safety and the DriveCam platform.',
    website: 'https://www.lytx.com',
  },
]

export const getPartner = (slug: string) => partners.find((p) => p.slug === slug)
