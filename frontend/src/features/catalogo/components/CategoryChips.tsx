import { CATEGORIES } from '../categories'
import type { FurnitureCategory } from '../types'

interface CategoryChipsProps {
  active: FurnitureCategory | null
  onChange: (category: FurnitureCategory | null) => void
}

function CategoryChips({ active, onChange }: CategoryChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-3">
      {CATEGORIES.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(active === value ? null : value)}
          className={`rounded-full px-3 py-1 text-xs transition ${
            active === value
              ? 'bg-brand text-white'
              : 'bg-black/5 text-ink hover:bg-black/10'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default CategoryChips