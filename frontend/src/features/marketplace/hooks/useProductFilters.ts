import { useMemo, useState } from 'react'
import type { CategoryFilter, MarketplaceProduct, PriceRange, ProductFilters, SortOrder } from '../types'
import {
  dimensionLabels, EMPTY_FILTERS, filterProducts, formatDimensions, productsMatchingOtherFilters, sortProducts,
} from '../utils/filterProducts'

export const PRICE_STEP = 10000

const NO_PRODUCTS: MarketplaceProduct[] = []

const unique = (values: string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b, 'es'))

export function useProductFilters(products: MarketplaceProduct[] = NO_PRODUCTS, search: string) {
  const [filters, setFilters] = useState<ProductFilters>(EMPTY_FILTERS)
  const [sortOrder, setSortOrder] = useState<SortOrder>('relevance')

  // Las dimensiones que se ofrecen son las de los productos que cumplen el resto de los filtros.
  const dimensionProducts = useMemo(() => productsMatchingOtherFilters(products, filters), [products, filters])

  // Las opciones salen de los productos: no se ofrece un filtro que no tenga resultados.
  const options = useMemo(
    () => ({
      types: unique(products.map((p) => p.type)),
      materials: unique(products.map((p) => p.material)),
      colors: unique(products.map((p) => p.color)),
      dimensions: dimensionLabels(dimensionProducts),
    }),
    [products, dimensionProducts],
  )

  // Cuantos productos tiene cada medida
  const dimensionCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const product of dimensionProducts) {
      const label = formatDimensions(product)
      counts[label] = (counts[label] ?? 0) + 1
    }
    return counts
  }, [dimensionProducts])

  function updateFilters(change: (current: ProductFilters) => ProductFilters) {
    setFilters((current) => {
      const next = change(current)
      const available = dimensionLabels(productsMatchingOtherFilters(products, next))
      return { ...next, dimensions: next.dimensions.filter((dimension) => available.includes(dimension)) }
    })
  }

  const priceBounds = useMemo<PriceRange>(() => {
    if (!products.length) return [0, 0]
    const prices = products.map((p) => p.price)
    return [
      Math.floor(Math.min(...prices) / PRICE_STEP) * PRICE_STEP,
      Math.ceil(Math.max(...prices) / PRICE_STEP) * PRICE_STEP,
    ]
  }, [products])

  const visible = useMemo(
    () => sortProducts(filterProducts(products, search, filters), sortOrder),
    [products, search, filters, sortOrder],
  )

  function toggleCategory(filter: CategoryFilter, value: string) {
    updateFilters((current) => ({
      ...current,
      [filter]: current[filter].includes(value)
        ? current[filter].filter((item) => item !== value)
        : [...current[filter], value],
    }))
  }

  function setPriceRange([min, max]: PriceRange) {
    const isFullRange = min <= priceBounds[0] && max >= priceBounds[1]
    updateFilters((current) => ({ ...current, priceRange: isFullRange ? null : [min, max] }))
  }

  const activeFiltersCount =
    filters.types.length + filters.materials.length + filters.colors.length + filters.dimensions.length +
    (filters.priceRange ? 1 : 0)

  return {
    filters,
    options,
    dimensionCounts,
    priceBounds,
    priceRange: filters.priceRange ?? priceBounds,
    toggleCategory,
    setPriceRange,
    sortOrder,
    setSortOrder,
    activeFiltersCount,
    resetFilters: () => setFilters(EMPTY_FILTERS),
    visible,
  }
}
