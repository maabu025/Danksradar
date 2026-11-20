import type { NavItem } from '@/types'

// Main menu. "Management Platforms" is the main item;
// "Products & Services" sits in its pop-up menu.
export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  {
    label: 'Management Platforms',
    href: '/management-platforms',
    menu: [
      {
        title: 'Platforms',
        links: [
          { label: 'Tracksolid (Jimi IoT)', href: '/management-platforms#tracksolid' },
          { label: 'Targa Telematics platform', href: '/management-platforms#targa' },
          { label: 'Lytx DriveCam', href: '/management-platforms#lytx' },
        ],
      },
      {
        title: 'Products & Services',
        links: [
          { label: 'GPS trackers', href: '/products?category=GPS%20trackers' },
          { label: 'AI dashcams', href: '/products?category=AI%20dashcams' },
          { label: 'Asset trackers', href: '/products?category=Asset%20trackers' },
          { label: 'Fleet software', href: '/products?category=Fleet%20software' },
          { label: 'View all products & services →', href: '/products' },
        ],
      },
    ],
  },
  {
    label: 'Partners',
    href: '/partners',
    menu: [
      {
        title: 'Our partners',
        links: [
          { label: 'Jimi IoT', href: '/partners/jimi-iot' },
          { label: 'Targa Telematics', href: '/partners/targa-telematics' },
          { label: 'Teltonika', href: '/partners/teltonika' },
          { label: 'Lytx', href: '/partners/lytx' },
        ],
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
    menu: [
      {
        title: 'About',
        links: [
          { label: 'Who we are', href: '/about#who-we-are' },
          { label: 'Mission', href: '/about#mission' },
          { label: 'Vision', href: '/about#vision' },
        ],
      },
    ],
  },
  { label: 'Contact', href: '/contact' },
]
