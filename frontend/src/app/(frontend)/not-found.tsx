import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page text-center">
        <p className="text-6xl font-bold text-electric">404</p>
        <h1 className="mt-4 text-3xl font-bold">This page went off the radar</h1>
        <p className="mt-2 text-deep/70">The page you're looking for doesn't exist.</p>
        <ButtonLink href="/" className="mt-8">
          Back to home
        </ButtonLink>
      </div>
    </section>
  )
}
