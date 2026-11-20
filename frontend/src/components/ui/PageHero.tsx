type Props = { eyebrow?: string; title: string; text?: string }

/** Simple purple banner for inner pages without a slideshow */
export function PageHero({ eyebrow, title, text }: Props) {
  return (
    <section className="bg-electric text-white">
      <div className="container-page py-16 md:py-24">
        {eyebrow && <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-lav">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
        {text && <p className="mt-4 max-w-2xl text-lg text-lav">{text}</p>}
      </div>
    </section>
  )
}
