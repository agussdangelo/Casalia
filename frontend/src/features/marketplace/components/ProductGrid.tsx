import ProductCard from './ProductCard'
import type { MarketplaceProduct } from '../types'

interface ProductGridProps {
  products: MarketplaceProduct[]
  favoriteIds: string[]
  onToggleFavorite: (product: MarketplaceProduct) => void
  onAddToCart: (product: MarketplaceProduct) => void
}

function ProductGrid({ products, favoriteIds, onToggleFavorite, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favoriteIds.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

export default ProductGrid
