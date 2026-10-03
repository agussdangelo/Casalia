import { marketplaceProducts } from '../mocks/MockProducts'
import type { MarketplaceProduct } from '../types'

export async function fetchProducts(): Promise<MarketplaceProduct[]> {
  // Hoy devuelve el mock pero mas adelante: return http('/publications')
  return marketplaceProducts
}
