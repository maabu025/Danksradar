import Image from 'next/image'

type Props = { src?: string; alt: string; className?: string; label?: string }

/** Shows the image if there is one, otherwise the lavender dashed placeholder from the prototype. */
export function ImagePlaceholder({ src, alt, className = 'h-40', label = 'Image' }: Props) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
      </div>
    )
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex flex-col items-center justify-center gap-1 rounded-xl border-[1.5px] border-dashed border-electric bg-lav text-purple ${className}`}
    >
      <span aria-hidden className="text-2xl">▣</span>
      <span className="text-xs font-medium">{label}</span>
    </div>
  )
}
