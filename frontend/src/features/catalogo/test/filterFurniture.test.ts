// @ts-expect-error Vitest's runtime is provided by the test runner; its types are unavailable here.
import { describe, expect, it } from 'vitest'
import { furnitureCatalog } from '../mocks/MockFurniture'
import { filterFurniture } from '../utils/filterFurniture'

describe('filterFurniture', () => {
  it('filtra por categoría', () => {
    const result = filterFurniture(furnitureCatalog, '', 'mesas')
    expect(result.every((f) => f.category === 'mesas')).toBe(true)
  })

  it('busca por nombre sin distinguir mayúsculas', () => {
    const result = filterFurniture(furnitureCatalog, 'SOFÁ', null)
    expect(result.length).toBeGreaterThan(0)
  })
})


