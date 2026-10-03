import type { MarketplaceProduct, ProductFilters, SortOrder } from '../types'

export const EMPTY_FILTERS: ProductFilters = { types: [], materials: [], colors: [], dimensions: [], priceRange: null }

export const formatDimensions = ({ width, height, depth }: MarketplaceProduct) =>
  `${[width, height, depth].map((meters) => Math.round(meters * 100)).join(' × ')} cm`

const normalize = (text: string) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const matches = (selected: string[], value: string) =>
  !selected.length || selected.includes(value)

export function filterProducts(
  products: MarketplaceProduct[],
  search: string,
  filters: ProductFilters = EMPTY_FILTERS,
): MarketplaceProduct[] {
  const text = normalize(search.trim())
  return products.filter(
    (p) =>
      normalize(`${p.name} ${p.seller}`).includes(text) &&
      matches(filters.types, p.type) &&
      matches(filters.materials, p.material) &&
      matches(filters.colors, p.color) &&
      matches(filters.dimensions, formatDimensions(p)) &&
      (!filters.priceRange || (p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])),
  )
}

export const productsMatchingOtherFilters = (products: MarketplaceProduct[], filters: ProductFilters) =>
  filterProducts(products, '', { ...filters, dimensions: [] })

export const dimensionLabels = (products: MarketplaceProduct[]) =>
  [...new Set([...products].sort((a, b) => b.width - a.width).map(formatDimensions))]

export function sortProducts(products: MarketplaceProduct[], order: SortOrder): MarketplaceProduct[] {
  const sorted = [...products]
  if (order === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  if (order === 'price-desc') sorted.sort((a, b) => b.price - a.price)
  if (order === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name, 'es'))
  return sorted
}
