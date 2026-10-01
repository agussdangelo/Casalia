import { useQuery } from '@tanstack/react-query'
import { fetchFurniture } from '../api/catalogApi'

export function useFurnitureCatalog() {
  return useQuery({
    queryKey: ['catalog', 'furniture'],
    queryFn: fetchFurniture,
  })
}