import Image from 'next/image'

import type { Product } from '@/types'

import { ImagePlaceholder } from '../ui/ImagePlaceholder'

type Props = {
  product: Pick<Product, 'name' | 'image' | 'photo'>
  className?: string
  sizes?: string
}

/**
 * Shows the real device photo when there is one (centred on a soft lavender backdrop, never cropped),
 * otherwise the category illustration.
 */
export function ProductImage({ product, className = 'h-44', sizes = '(max-width: 768px) 100vw, 400px' }: Props) {
  if (!product.photo) return <ImagePlaceholder src={product.image} alt={product.name} className={className} />

  return (
    <div
      className={`group/photo relative overflow-hidden rounded-xl bg-[radial-gradient(circle_at_50%_40%,#ffffff_0%,#F3EEFF_70%)] ${className}`}
    >
      <Image
        src={product.photo}
        alt={product.name}
        fill
        sizes={sizes}
        className="object-contain p-6 drop-shadow-[0_14px_18px_rgba(36,20,70,0.18)] transition-transform duration-500 group-hover/photo:scale-105"
      />
    </div>
  )
}
