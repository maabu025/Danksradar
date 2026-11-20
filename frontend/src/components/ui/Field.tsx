import type { ComponentProps } from 'react'

const inputClass =
  'w-full rounded-xl border border-deep/15 bg-white px-4 py-3 text-sm text-deep outline-none transition focus:border-purple focus:ring-2 focus:ring-electric/30'

type Common = { label: string; name: string; error?: string; required?: boolean }

export function Input({ label, name, error, required, ...rest }: Common & ComponentProps<'input'>) {
  return (
    <label className="block text-sm font-medium">
      {label} {required && <span className="text-purple">*</span>}
      <input name={name} required={required} aria-invalid={!!error} className={`${inputClass} mt-1`} {...rest} />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}

export function Textarea({ label, name, error, required, ...rest }: Common & ComponentProps<'textarea'>) {
  return (
    <label className="block text-sm font-medium">
      {label} {required && <span className="text-purple">*</span>}
      <textarea name={name} required={required} rows={5} aria-invalid={!!error} className={`${inputClass} mt-1`} {...rest} />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}

export function Select({
  label,
  name,
  error,
  required,
  options,
  ...rest
}: Common & ComponentProps<'select'> & { options: string[] }) {
  return (
    <label className="block text-sm font-medium">
      {label} {required && <span className="text-purple">*</span>}
      <select name={name} required={required} aria-invalid={!!error} className={`${inputClass} mt-1`} defaultValue="" {...rest}>
        <option value="" disabled>
          Choose one
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}
