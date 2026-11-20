'use client'

import type { FormEvent } from 'react'

import { formEndpoints } from '@/lib/api'

import { Button } from '../ui/Button'
import { Input, Textarea } from '../ui/Field'
import { FormError, FormSuccess } from './FormStatus'
import { captchaFrom, Turnstile } from './Turnstile'
import { formToObject, useFormSubmit } from './useFormSubmit'

export function ContactForm() {
  const { status, error, fieldErrors: fe, submit } = useFormSubmit(formEndpoints.contact)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (await submit(captchaFrom(formToObject(form)))) form.reset()
  }

  if (status === 'sent') return <FormSuccess title="Message sent" text="Thanks! We'll reply within one working day." />

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 md:grid-cols-2">
      <Input label="Full name" name="fullName" required autoComplete="name" error={fe.fullName} />
      <Input label="Company" name="company" autoComplete="organization" error={fe.company} />
      <Input label="Phone" name="phone" type="tel" required autoComplete="tel" error={fe.phone} />
      <Input label="Email" name="email" type="email" required autoComplete="email" error={fe.email} />
      <div className="md:col-span-2">
        <Input label="Subject" name="subject" required error={fe.subject} />
      </div>
      <div className="md:col-span-2">
        <Textarea label="Message" name="message" required error={fe.message} />
      </div>
      <div className="space-y-4 md:col-span-2">
        <Turnstile />
        <FormError message={error} />
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </Button>
      </div>
    </form>
  )
}
