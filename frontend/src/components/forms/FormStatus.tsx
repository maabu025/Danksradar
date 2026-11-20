export function FormError({ message }: { message: string }) {
  if (!message) return null
  return (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </p>
  )
}

export function FormSuccess({ title, text }: { title: string; text: string }) {
  return (
    <div role="status" className="rounded-2xl bg-lav p-8 text-center">
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-purple text-white" aria-hidden>
        ✓
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-1 text-sm text-deep/80">{text}</p>
    </div>
  )
}
