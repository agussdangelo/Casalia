import { describe, expect, it } from 'vitest'
import { marketplaceProducts } from '../mocks/MockProducts'
import {
  dimensionLabels, EMPTY_FILTERS, filterProducts, formatDimensions, productsMatchingOtherFilters, sortProducts,
} from '../utils/filterProducts'

describe('filterProducts', () => {
  it('sin búsqueda ni filtros devuelve todos los productos', () => {
    expect(filterProducts(marketplaceProducts, '')).toHaveLength(marketplaceProducts.length)
  })

  it('busca por nombre o vendedor sin distinguir mayúsculas ni tildes', () => {
    expect(filterProducts(marketplaceProducts, 'SILLON').map((p) => p.id)).toEqual(['mp-sillon-lomas'])
    expect(filterProducts(marketplaceProducts, 'benitez').map((p) => p.id)).toEqual(['mp-lampara-arco'])
  })

  it('combina filtros de distintos aspectos', () => {
    const result = filterProducts(marketplaceProducts, '', {
      ...EMPTY_FILTERS,
      materials: ['Madera maciza'],
      colors: ['Beige'],
    })
    expect(result.map((p) => p.id)).toEqual(['mp-biblioteca-modular', 'mp-modulo-recta'])
  })

  it('muestra las dimensiones en centímetros', () => {
    expect(formatDimensions(marketplaceProducts[0])).toBe('210 × 85 × 90 cm')
  })

  it('filtra por las dimensiones elegidas', () => {
    const result = filterProducts(marketplaceProducts, '', {
      ...EMPTY_FILTERS,
      dimensions: ['210 × 85 × 90 cm', '45 × 42 × 45 cm'],
    })
    expect(result.map((p) => p.id)).toEqual(['mp-sillon-lomas', 'mp-puff-arena'])
  })

  it('ofrece solo las dimensiones de los productos que cumplen el resto de los filtros', () => {
    const filters = { ...EMPTY_FILTERS, types: ['Alfombras'], dimensions: ['210 × 85 × 90 cm'] }
    expect(dimensionLabels(productsMatchingOtherFilters(marketplaceProducts, filters))).toEqual(['300 × 2 × 200 cm'])
  })

  it('filtra por rango de precio, con los extremos incluidos', () => {
    const result = filterProducts(marketplaceProducts, '', { ...EMPTY_FILTERS, priceRange: [68900, 142000] })
    expect(result.map((p) => p.id)).toEqual(['mp-lampara-arco', 'mp-alfombra-trama', 'mp-puff-arena'])
  })
})

describe('sortProducts', () => {
  it('ordena por precio sin modificar la lista original', () => {
    const original = marketplaceProducts.map((p) => p.id)
    const prices = sortProducts(marketplaceProducts, 'price-asc').map((p) => p.price)
    expect(prices).toEqual([...prices].sort((a, b) => a - b))
    expect(marketplaceProducts.map((p) => p.id)).toEqual(original)
  })

  it('por relevancia conserva el orden recibido', () => {
    expect(sortProducts(marketplaceProducts, 'relevance')).toEqual(marketplaceProducts)
  })
})
