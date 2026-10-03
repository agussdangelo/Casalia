import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api/marketplaceApi'

export function useMarketplaceProducts() {
  return useQuery({
    queryKey: ['marketplace', 'products'],
    queryFn: fetchProducts,
  })
}
