import type { Platform } from '@/types'

// Teltonika supplies hardware only, so it has no platform here.
export const platforms: Platform[] = [
  {
    slug: 'tracksolid',
    image: '/images/platforms/tracksolid.jpg',
    name: 'Tracksolid',
    partner: 'jimi-iot',
    summary: 'Track vehicles, watch live video and get alerts from one dashboard.',
    features: ['Live map', 'Video playback', 'Geofence alerts', 'Mobile app'],
  },
  {
    slug: 'targa',
    image: '/images/platforms/targa.jpg',
    name: 'Targa Telematics platform',
    partner: 'targa-telematics',
    summary: 'Fleet and insurance telematics with clear reports.',
    features: ['Fleet reports', 'Driver scoring', 'Insurance data'],
  },
  {
    slug: 'lytx',
    image: '/images/platforms/lytx.jpg',
    name: 'Lytx DriveCam',
    partner: 'lytx',
    summary: 'Video safety that turns risky moments into coaching.',
    features: ['Risk detection', 'Coaching workflow', 'Safety scores'],
  },
]
