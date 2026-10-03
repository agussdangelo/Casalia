// Vista de listado de una publicación: datos del producto más el vendedor.
// type, material y color son las categorías del producto, una por aspecto.
// width, height y depth son las medidas reales de su modelo 3D, en metros.
export interface MarketplaceProduct {
  id: string
  name: string
  seller: string
  price: number
  originalPrice?: number
  thumbnail: string
  stock: number
  type: string
  material: string
  color: string
  width: number
  height: number
  depth: number
}

export type SortOrder = 'relevance' | 'price-asc' | 'price-desc' | 'name'

export type PriceRange = [min: number, max: number]

export interface ProductFilters {
  types: string[]
  materials: string[]
  colors: string[]
  dimensions: string[]
  priceRange: PriceRange | null
}

export type CategoryFilter = 'types' | 'materials' | 'colors' | 'dimensions'
