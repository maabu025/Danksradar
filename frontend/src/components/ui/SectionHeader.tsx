type Props = { eyebrow?: string; title: string; text?: string; center?: boolean; light?: boolean }

export function SectionHeader({ eyebrow, title, text, center, light }: Props) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`mb-2 text-xs font-semibold tracking-[0.2em] uppercase ${light ? 'text-lav' : 'text-purple'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl font-bold leading-tight md:text-4xl ${light ? 'text-white' : 'text-deep'}`}>{title}</h2>
      {text && <p className={`mt-3 text-base ${light ? 'text-lav' : 'text-deep/80'}`}>{text}</p>}
    </div>
  )
}
