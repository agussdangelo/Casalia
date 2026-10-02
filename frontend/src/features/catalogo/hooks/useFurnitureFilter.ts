import { useMemo, useState } from 'react'
import type { Furniture, FurnitureCategory } from '../types'

export interface FurnitureFilters {
  styles: string[]
  colors: string[]
}

const EMPTY_FILTERS: FurnitureFilters = { styles: [], colors: [] }

const unique = (values: (string | undefined)[]) =>
  [...new Set(values.filter((v): v is string => !!v))].sort()

export function useFurnitureFilter(furniture: Furniture[] = []) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<FurnitureCategory | null>(null)
  const [filters, setFilters] = useState<FurnitureFilters>(EMPTY_FILTERS)

  const options = useMemo(
    () => ({
      styles: unique(furniture.map((f) => f.style)),
      colors: unique(furniture.map((f) => f.color)),
    }),
    [furniture],
  )

  const filtered = useMemo(() => {
    const text = search.trim().toLowerCase()
    return furniture.filter(
      (f) =>
        (!category || f.category === category) &&
        f.name.toLowerCase().includes(text) &&
        (!filters.styles.length || (!!f.style && filters.styles.includes(f.style))) &&
        (!filters.colors.length || (!!f.color && filters.colors.includes(f.color))),
    )
  }, [furniture, search, category, filters])

  const activeFiltersCount = filters.styles.length + filters.colors.length

  return {
    search,
    setSearch,
    category,
    setCategory,
    filters,
    setFilters,
    options,
    activeFiltersCount,
    resetFilters: () => setFilters(EMPTY_FILTERS),
    filtered,
  }
}