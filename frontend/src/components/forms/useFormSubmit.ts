'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Posts a form as JSON to an API route and tracks errors per field. */
export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  async function submit(data: Record<string, unknown>) {
    setStatus('sending')
    setError('')
    setFieldErrors({})
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        const fe: Record<string, string> = {}
        for (const [k, v] of Object.entries(json.fieldErrors ?? {})) fe[k] = (v as string[])[0]
        setFieldErrors(fe)
        setError(json.error ?? 'Something went wrong.')
        setStatus('error')
        return false
      }
      setStatus('sent')
      return true
    } catch {
      setError('Network error. Check your connection and try again.')
      setStatus('error')
      return false
    }
  }

  return { status, error, fieldErrors, submit }
}

/** Reads a <form> into a plain object; checkboxes with the same name become arrays. */
export function formToObject(form: HTMLFormElement): Record<string, unknown> {
  const fd = new FormData(form)
  const out: Record<string, unknown> = {}
  for (const key of new Set(fd.keys())) {
    const all = fd.getAll(key).map(String)
    const el = form.elements.namedItem(key)
    const isCheckboxGroup = el instanceof RadioNodeList || (el instanceof HTMLInputElement && el.type === 'checkbox')
    out[key] = isCheckboxGroup ? all : all[0]
  }
  return out
}
