import type { Metadata } from 'next'

import { PageHero } from '@/components/ui/PageHero'
import { site } from '@/data/site'

export const metadata: Metadata = { title: 'Privacy policy' }

// TODO: have the final policy reviewed against Ghana's Data Protection Act, 2012 (Act 843)
export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy policy" />
      <section className="section">
        <div className="container-page max-w-3xl space-y-4 text-deep/80">
          <p>This page explains what personal data Danksradar collects through this website and how we use it.</p>
          <h2 className="pt-4 text-xl font-bold text-deep">What we collect</h2>
          <p>When you fill in a form we collect your name, company, phone number, email address and your message.</p>
          <h2 className="pt-4 text-xl font-bold text-deep">How we use it</h2>
          <p>We use it only to reply to you and to arrange demos or quotes. We do not sell your data.</p>
          <h2 className="pt-4 text-xl font-bold text-deep">Your rights</h2>
          <p>
            You can ask to see, correct or delete your data at any time by emailing{' '}
            <a href={`mailto:${site.email}`} className="text-purple underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
