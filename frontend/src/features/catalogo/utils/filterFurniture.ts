import type { Furniture, FurnitureCategory } from '../types'

export interface FurnitureFilters {
  styles: string[]
  colors: string[]
}

export function filterFurniture(
  items: Furniture[],
  search: string,
  category: FurnitureCategory | null,
  filters: FurnitureFilters = { styles: [], colors: [] },
): Furniture[] {
  const text = search.trim().toLowerCase()
  return items.filter(
    (f) =>
      (!category || f.category === category) &&
      f.name.toLowerCase().includes(text) &&
      (!filters.styles.length || (!!f.style && filters.styles.includes(f.style))) &&
      (!filters.colors.length || (!!f.color && filters.colors.includes(f.color))),
  )
}