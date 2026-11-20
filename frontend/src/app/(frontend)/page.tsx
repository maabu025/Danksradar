import { CtaBand } from '@/components/home/CtaBand'
import { FaqAccordion } from '@/components/home/FaqAccordion'
import { HeroSlideshow } from '@/components/home/HeroSlideshow'
import { PartnersSlideshow } from '@/components/home/PartnersSlideshow'
import { SolutionsGrid } from '@/components/home/SolutionsGrid'
import { WhyUsStrip } from '@/components/home/WhyUsStrip'
import { SectionHeader } from '@/components/ui/SectionHeader'

// Each slide can have a `video` (MP4 in /public/videos/hero) or an `image` (photo/GIF in /public/images/hero)
const slides = [
  {
    tagline: 'See every vehicle. Protect every trip.',
    alt: 'A vehicle tracked live on a map until it reaches the depot',
    video: '/videos/hero/home-tracking.mp4',
    poster: '/videos/hero/home-tracking-poster.jpg',
  },
  { tagline: 'AI dashcams that spot risk before it happens.', alt: 'AI dashcam in a truck cab' },
  { tagline: 'One platform for your whole fleet.', alt: 'Fleet dashboard on a laptop' },
]

export default function HomePage() {
  return (
    <>
      <HeroSlideshow slides={slides} fullScreen />
      <WhyUsStrip />
      <section className="section">
        <div className="container-page">
          <SectionHeader title="Solutions" />
          <SolutionsGrid />
        </div>
      </section>
      <PartnersSlideshow />
      <FaqAccordion />
      <CtaBand />
    </>
  )
}
