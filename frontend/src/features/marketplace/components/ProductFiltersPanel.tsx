import { useState, type ReactNode } from 'react'
import { Icon } from '@/shared/ui/Icon'
import PriceRangeSlider from './PriceRangeSlider'
import { COLOR_HEX, DEFAULT_COLOR_HEX } from '../colors'
import type { CategoryFilter, PriceRange, ProductFilters } from '../types'

interface ProductFiltersPanelProps {
  filters: ProductFilters
  options: Record<CategoryFilter, string[]>
  dimensionCounts: Record<string, number>
  priceBounds: PriceRange
  priceRange: PriceRange
  priceStep: number
  activeCount: number
  onToggleCategory: (filter: CategoryFilter, value: string) => void
  onPriceChange: (range: PriceRange) => void
  onReset: () => void
  onCollapse: () => void
  className?: string
}

const VISIBLE_DIMENSIONS = 5

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="mt-5">
      <legend className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted">{title}</legend>
      {children}
    </fieldset>
  )
}

function ProductFiltersPanel({
  filters, options, dimensionCounts, priceBounds, priceRange, priceStep, activeCount,
  onToggleCategory, onPriceChange, onReset, onCollapse, className = '',
}: ProductFiltersPanelProps) {
  const [showAllDimensions, setShowAllDimensions] = useState(false)
  const hiddenDimensions = options.dimensions.length - VISIBLE_DIMENSIONS

  const checkboxes = (filter: CategoryFilter, values = options[filter], counts?: Record<string, number>) => (
    <div className="flex flex-col gap-2">
      {values.map((option) => (
        <label key={option} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
          <input
            type="checkbox"
            checked={filters[filter].includes(option)}
            onChange={() => onToggleCategory(filter, option)}
            className="h-4 w-4 shrink-0 accent-clay"
          />
          <span>
            {option}
            {counts && <span className="text-muted"> ({counts[option]})</span>}
          </span>
        </label>
      ))}
    </div>
  )

  return (
    <aside
      aria-label="Filtros"
      className={`shrink-0 border-line px-5 py-6 max-xl:border-b xl:w-60 xl:border-l ${className}`}
    >
      <button
        type="button"
        onClick={onCollapse}
        aria-label="Contraer filtros"
        title="Contraer filtros"
        className="mb-3 flex h-7 w-7 items-center justify-center rounded-md border border-line bg-white text-ink hover:bg-sand"
      >
        <Icon name="chevron" className="h-3 w-3" />
      </button>
      <div className="flex items-center gap-2">
        <h2 className="mr-auto text-sm font-bold text-ink">Filtros</h2>
        {activeCount > 0 && (
          <button type="button" onClick={onReset} className="text-xs font-bold text-clay hover:underline">
            Limpiar ({activeCount})
          </button>
        )}
      </div>

      <FilterGroup title="Tipo de mueble">{checkboxes('types')}</FilterGroup>

      <FilterGroup title="Precio">
        <PriceRangeSlider bounds={priceBounds} value={priceRange} step={priceStep} onChange={onPriceChange} />
      </FilterGroup>

      <FilterGroup title="Dimensiones">
        {checkboxes(
          'dimensions',
          showAllDimensions ? options.dimensions : options.dimensions.slice(0, VISIBLE_DIMENSIONS),
          dimensionCounts,
        )}
        {hiddenDimensions > 0 && (
          <button
            type="button"
            onClick={() => setShowAllDimensions((showAll) => !showAll)}
            aria-expanded={showAllDimensions}
            className="mt-2.5 text-sm text-ink underline underline-offset-2 hover:text-clay"
          >
            {showAllDimensions ? 'Mostrar menos' : `Mostrar ${hiddenDimensions} más`}
          </button>
        )}
      </FilterGroup>

      <FilterGroup title="Material">{checkboxes('materials')}</FilterGroup>

      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2">
          {options.colors.map((color) => {
            const selected = filters.colors.includes(color)
            return (
              <button
                key={color}
                type="button"
                title={color}
                aria-label={color}
                aria-pressed={selected}
                onClick={() => onToggleCategory('colors', color)}
                className={`h-7 w-7 rounded-lg border border-black/10 ${selected ? 'ring-2 ring-sage ring-offset-2 ring-offset-cream' : ''}`}
                style={{ backgroundColor: COLOR_HEX[color] ?? DEFAULT_COLOR_HEX }}
              />
            )
          })}
        </div>
      </FilterGroup>
    </aside>
  )
}

export default ProductFiltersPanel
