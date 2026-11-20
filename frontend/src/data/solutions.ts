import type { Solution } from '@/types'

export const solutions: Solution[] = [
  { slug: 'fleet-management', image: '/images/solutions/fleet.jpg', title: 'Fleet management', summary: 'Live location of every vehicle.', icon: '🚚' },
  { slug: 'ai-video-telematics', image: '/images/solutions/video.jpg', title: 'AI video telematics', summary: 'AI dashcams that see risk first.', icon: '🎥' },
  { slug: 'asset-tracking', image: '/images/solutions/asset.jpg', title: 'Asset tracking', summary: 'Know where every asset is.', icon: '📦' },
  { slug: 'driver-safety', image: '/images/solutions/driver.jpg', title: 'Driver safety & behaviour', summary: 'Coach safer, smarter driving.', icon: '🛡️' },
  { slug: 'theft-protection', image: '/images/solutions/theft.jpg', title: 'Theft protection & recovery', summary: 'Stop theft, recover vehicles fast.', icon: '🔒' },
  { slug: 'insurance-telematics', image: '/images/solutions/insurance.jpg', title: 'Insurance telematics', summary: 'Fair premiums from real driving data.', icon: '📄' },
]

// Pain points for the "Why Danksradar" strip on the home page.
// Each clip lives in /public/videos/why-us (swap in real footage with the same file names).
export const painPoints = [
  { problem: 'Where is my truck?', fix: 'Live map, every 10 seconds.', video: '/videos/why-us/truck.mp4', poster: '/videos/why-us/truck-poster.jpg' },
  { problem: 'Fuel keeps vanishing', fix: 'Fuel alerts the moment it drops.', video: '/videos/why-us/fuel.mp4', poster: '/videos/why-us/fuel-poster.jpg' },
  { problem: 'Risky driving', fix: 'AI dashcams flag it in real time.', video: '/videos/why-us/risky.mp4', poster: '/videos/why-us/risky-poster.jpg' },
  { problem: 'Stolen vehicle', fix: 'Remote cut-off and fast recovery.', video: '/videos/why-us/stolen.mp4', poster: '/videos/why-us/stolen-poster.jpg' },
]
