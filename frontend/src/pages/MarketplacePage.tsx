import { DashboardLayout } from '@/components/home/DashboardLayout'
import { useHome } from '@/components/home/useHome'
import type { Product } from '@/data/home'
import { MarketplaceListing, type MarketplaceProduct } from '@/features/marketplace'

function toProduct(product: MarketplaceProduct): Product {
  return { id: product.id, name: product.name, maker: product.seller, price: product.price, image: product.thumbnail }
}

export default function MarketplacePage() {
  const { marketplaceSearch, setMarketplaceSearch, favorites, toggleFavorite, addToCart } = useHome()

  return (
    <DashboardLayout>
      <MarketplaceListing
        search={marketplaceSearch}
        onSearchChange={setMarketplaceSearch}
        favoriteIds={favorites.map((product) => product.id)}
        onToggleFavorite={(product) => toggleFavorite(toProduct(product))}
        onAddToCart={(product) => addToCart(toProduct(product))}
      />
    </DashboardLayout>
  )
}
