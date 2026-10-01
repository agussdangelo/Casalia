import { useMemo, useState } from 'react'
import type { Furniture, FurnitureCategory } from '../types'

export function useFurnitureFilter(furniture: Furniture[] = []) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<FurnitureCategory | null>(null)

  const filtered = useMemo(() => {
    const text = search.trim().toLowerCase()
    return furniture.filter(
      (f) =>
        (!category || f.category === category) &&
        f.name.toLowerCase().includes(text),
    )
  }, [furniture, search, category])

  return { search, setSearch, category, setCategory, filtered }
}