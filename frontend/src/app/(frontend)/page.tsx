import { ClientResults } from '@/components/company/ClientResults'
import { CtaBand } from '@/components/home/CtaBand'
import { FaqAccordion } from '@/components/home/FaqAccordion'
import { HeroSlideshow } from '@/components/home/HeroSlideshow'
import { IndustriesTabs } from '@/components/home/IndustriesTabs'
import { LogoMarquee } from '@/components/home/LogoMarquee'
import { PartnersSlideshow } from '@/components/home/PartnersSlideshow'
import { SolutionsGrid } from '@/components/home/SolutionsGrid'
import { StatsBand } from '@/components/home/StatsBand'
import { WhyUsStrip } from '@/components/home/WhyUsStrip'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { solutions } from '@/data/solutions'
import { getPartners } from '@/lib/content'

// Each slide can have a `video` (MP4 in /public/videos/hero) or an `image` (photo/GIF in /public/images/hero)
const slides = [
  {
    tagline: 'Everything that moves, on your radar.',
    alt: 'A Danksradar-tracked car on a highway at dusk, an AI dashcam warning of a car too close, and tracked haul trucks at a mine',
    video: '/videos/hero/home-drive.mp4',
    poster: '/videos/hero/home-drive-poster.jpg',
    duration: 15.5,
  },
  { tagline: 'AI dashcams that spot risk before it happens.', alt: 'AI dashcam in a truck cab' },
  {
    tagline: 'One platform for your whole fleet.',
    alt: 'A vehicle tracked live on a map until it reaches the depot',
    video: '/videos/hero/home-tracking.mp4',
    poster: '/videos/hero/home-tracking-poster.jpg',
  },
]

export const revalidate = 60

export default async function HomePage() {
  const partners = await getPartners()
  return (
    <>
      <HeroSlideshow slides={slides} fullScreen />
      <StatsBand partnerCount={partners.length} />
      <LogoMarquee partners={partners} />
      <WhyUsStrip />
      <section className="section">
        <div className="container-page">
          <SectionHeader
            eyebrow="Our solutions"
            title="Solutions"
            text="From basic tracking to advanced AI video and industrial telematics, covering vehicles, drivers, equipment, cargo and people."
          />
          <SolutionsGrid limit={6} />
          <div className="mt-8 text-center">
            <ButtonLink href="/solutions" variant="outline">
              See all {solutions.length} solutions →
            </ButtonLink>
          </div>
        </div>
      </section>
      <IndustriesTabs />
      <ClientResults />
      <PartnersSlideshow partners={partners} />
      <FaqAccordion />
      <CtaBand />
    </>
  )
}
