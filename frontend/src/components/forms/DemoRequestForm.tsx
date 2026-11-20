'use client'

import type { FormEvent } from 'react'

import { formEndpoints } from '@/lib/api'

import { Button } from '../ui/Button'
import { Input, Select, Textarea } from '../ui/Field'
import { FormError, FormSuccess } from './FormStatus'
import { captchaFrom, Turnstile } from './Turnstile'
import { formToObject, useFormSubmit } from './useFormSubmit'

const services = [
  'GPS tracking',
  'AI video telematics',
  'Fuel monitoring',
  'Driver behaviour',
  'Asset tracking',
  'Theft recovery',
  'Insurance telematics',
]
const industries = ['Logistics', 'Car rental & leasing', 'Insurance', 'Public transport', 'Construction', 'Taxi & ride-hailing', 'Mining', 'Other']

/** Request a demo: short questionnaire + fleet services */
export function DemoRequestForm() {
  const { status, error, fieldErrors: fe, submit } = useFormSubmit(formEndpoints.demoRequest)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const ok = await submit(captchaFrom(formToObject(form)))
    if (ok) form.reset()
  }

  if (status === 'sent') {
    return <FormSuccess title="Demo request sent" text="We'll call you within one working day to book your demo." />
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <fieldset className="grid gap-4 md:grid-cols-2">
        <legend className="mb-2 text-lg font-bold">1. About you</legend>
        <Input label="Full name" name="fullName" required autoComplete="name" error={fe.fullName} />
        <Input label="Company" name="company" autoComplete="organization" error={fe.company} />
        <Input label="Phone" name="phone" type="tel" required autoComplete="tel" error={fe.phone} />
        <Input label="Email" name="email" type="email" required autoComplete="email" error={fe.email} />
      </fieldset>

      <fieldset className="grid gap-4 md:grid-cols-2">
        <legend className="mb-2 text-lg font-bold">2. Your fleet</legend>
        <Select label="How many vehicles?" name="fleetSize" required options={['1-10', '11-50', '51-200', '200+']} error={fe.fleetSize} />
        <Select label="Industry" name="industry" options={industries} error={fe.industry} />
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-lg font-bold">3. What do you need?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((s) => (
            <label key={s} className="flex cursor-pointer items-center gap-3 rounded-xl border border-deep/15 px-4 py-3 text-sm has-checked:border-purple has-checked:bg-lav">
              <input type="checkbox" name="services" value={s} className="accent-purple" /> {s}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="grid gap-4">
        <legend className="mb-2 text-lg font-bold">4. Anything else?</legend>
        <Input label="Preferred demo date" name="preferredDate" type="date" error={fe.preferredDate} />
        <Textarea label="Message" name="message" placeholder="Tell us about your fleet" error={fe.message} />
      </fieldset>

      <Turnstile />
      <FormError message={error} />
      <Button type="submit" disabled={status === 'sending'} className="w-full md:w-auto">
        {status === 'sending' ? 'Sending…' : 'Request my demo'}
      </Button>
    </form>
  )
}
