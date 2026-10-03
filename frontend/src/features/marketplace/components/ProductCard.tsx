import { Icon } from '@/shared/ui/Icon'
import { formatPrice } from '@/shared/utils/formatPrice'
import type { MarketplaceProduct } from '../types'

interface ProductCardProps {
  product: MarketplaceProduct
  isFavorite: boolean
  onToggleFavorite: (product: MarketplaceProduct) => void
  onAddToCart: (product: MarketplaceProduct) => void
}

function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart }: ProductCardProps) {
  const { name, seller, price, originalPrice, thumbnail, stock } = product
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0
  const outOfStock = stock === 0

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative">
        <img
          src={thumbnail}
          alt={name}
          loading="lazy"
          className={`aspect-[4/3] w-full bg-surface object-cover ${outOfStock ? 'opacity-60' : ''}`}
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-sage px-2 py-0.5 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
        <button
          type="button"
          onClick={() => onToggleFavorite(product)}
          aria-label={isFavorite ? `Quitar ${name} de favoritos` : `Guardar ${name} en favoritos`}
          aria-pressed={isFavorite}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-clay shadow-sm hover:scale-110"
        >
          <Icon name="heart" filled={isFavorite} className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-3.5 pt-3 pb-3.5">
        <h3 className="truncate text-sm font-bold text-ink" title={name}>{name}</h3>
        <p className="mt-0.5 truncate text-xs text-muted">{seller}</p>
        <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
          <span className={`text-lg font-extrabold ${discount > 0 ? 'text-sage' : 'text-ink'}`}>
            {formatPrice(price)}
          </span>
          {originalPrice && <s className="text-xs text-muted">{formatPrice(originalPrice)}</s>}
        </p>
        <p className="mb-2.5 text-xs text-muted">
          {outOfStock ? 'Sin stock' : `${stock} ${stock === 1 ? 'disponible' : 'disponibles'}`}
        </p>
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          disabled={outOfStock}
          className="mt-auto flex min-h-[38px] w-full items-center justify-center gap-1.5 rounded-lg bg-sand px-2 text-xs font-bold text-[#883c1c] enabled:hover:bg-[#e9d6c7]"
        >
          <Icon name="cart" className="h-[15px] w-[15px]" />
          {outOfStock ? 'Sin stock' : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard
