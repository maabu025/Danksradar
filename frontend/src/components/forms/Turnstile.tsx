'use client'

import Script from 'next/script'

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

/** Cloudflare Turnstile spam check. Adds a hidden "cf-turnstile-response" field to the form. Hidden if no key is set. */
export function Turnstile() {
  if (!siteKey) return null
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" />
    </>
  )
}

export const captchaFrom = (data: Record<string, unknown>) => {
  const token = data['cf-turnstile-response'] as string | undefined
  delete data['cf-turnstile-response']
  return { ...data, captchaToken: token }
}
