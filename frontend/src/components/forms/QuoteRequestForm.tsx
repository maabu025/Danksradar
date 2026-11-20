'use client'

import type { FormEvent } from 'react'

import { formEndpoints } from '@/lib/api'

import { Button } from '../ui/Button'
import { Input, Textarea } from '../ui/Field'
import { FormError, FormSuccess } from './FormStatus'
import { captchaFrom, Turnstile } from './Turnstile'
import { formToObject, useFormSubmit } from './useFormSubmit'

/** "Request a quote" form, pre-filled with the product */
export function QuoteRequestForm({ product }: { product: string }) {
  const { status, error, fieldErrors: fe, submit } = useFormSubmit(formEndpoints.quoteRequest)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (await submit(captchaFrom(formToObject(form)))) form.reset()
  }

  if (status === 'sent') return <FormSuccess title="Quote request sent" text="Our sales team will send your quote shortly." />

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <input type="hidden" name="product" value={product} />
      <Input label="Full name" name="fullName" required autoComplete="name" error={fe.fullName} />
      <Input label="Company" name="company" autoComplete="organization" error={fe.company} />
      <Input label="Phone" name="phone" type="tel" required autoComplete="tel" error={fe.phone} />
      <Input label="Email" name="email" type="email" required autoComplete="email" error={fe.email} />
      <Input label="Quantity" name="quantity" type="number" min={1} defaultValue={1} required error={fe.quantity} />
      <Textarea label="Message" name="message" rows={3} error={fe.message} />
      <Turnstile />
      <FormError message={error} />
      <Button type="submit" disabled={status === 'sending'} className="w-full">
        {status === 'sending' ? 'Sending…' : 'Request a quote'}
      </Button>
    </form>
  )
}
