import { useState } from 'react'
import { useMarketplaceProducts } from '../hooks/useMarketplaceProducts'
import { PRICE_STEP, useProductFilters } from '../hooks/useProductFilters'
import MarketplaceSearch from './MarketplaceSearch'
import ProductFiltersPanel from './ProductFiltersPanel'
import ProductGrid from './ProductGrid'
import type { MarketplaceProduct, SortOrder } from '../types'

export interface MarketplaceListingProps {
  search: string
  onSearchChange: (search: string) => void
  favoriteIds: string[]
  onToggleFavorite: (product: MarketplaceProduct) => void
  onAddToCart: (product: MarketplaceProduct) => void
}

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'relevance', label: 'Ordenar: relevancia' },
  { value: 'price-asc', label: 'Menor precio' },
  { value: 'price-desc', label: 'Mayor precio' },
  { value: 'name', label: 'Nombre: A–Z' },
]

const TOOLBAR_CONTROL = 'min-h-10 rounded-lg border border-line bg-white px-3 text-sm text-ink'

function MarketplaceListing({ search, onSearchChange, favoriteIds, onToggleFavorite, onAddToCart }: MarketplaceListingProps) {
  const [filtersOpen, setFiltersOpen] = useState(() => window.matchMedia('(min-width: 1280px)').matches)
  const { data, isLoading, isError } = useMarketplaceProducts()
  const {
    filters, options, dimensionCounts, priceBounds, priceRange, toggleCategory, setPriceRange,
    sortOrder, setSortOrder, activeFiltersCount, resetFilters, visible,
  } = useProductFilters(data, search)

  function clearAll() {
    resetFilters()
    onSearchChange('')
  }

  return (
    <section aria-labelledby="marketplace-heading" className="flex flex-col xl:flex-row">
      <div className="min-w-0 flex-1 px-5 py-6 min-[781px]:px-8 min-[781px]:py-7">
        <h1 id="marketplace-heading" className="sr-only">Marketplace</h1>
        <MarketplaceSearch value={search} onChange={onSearchChange} className="mb-4 min-[781px]:hidden" />

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted" role="status">
            <strong className="font-bold text-ink">{visible.length}</strong>{' '}
            {visible.length === 1 ? 'producto' : 'productos'} en el marketplace
          </p>
          <div className="flex items-center gap-2">
            {!filtersOpen && (
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className={`${TOOLBAR_CONTROL} font-medium hover:bg-sand`}
              >
                Filtros{activeFiltersCount > 0 && ` (${activeFiltersCount})`}
              </button>
            )}
            <select
              aria-label="Ordenar productos"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className={`${TOOLBAR_CONTROL} cursor-pointer`}
            >
              {SORT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoading && <p className="text-sm text-muted">Cargando productos...</p>}
        {isError && <p className="text-sm text-red-600">No se pudieron cargar los productos.</p>}
        {data && (
          <ProductGrid
            products={visible}
            favoriteIds={favoriteIds}
            onToggleFavorite={onToggleFavorite}
            onAddToCart={onAddToCart}
          />
        )}
        {data && visible.length === 0 && (
          <div role="status">
            <h2 className="text-lg font-bold text-ink">No encontramos productos</h2>
            <p className="mt-2 mb-4 text-sm text-muted">Probá con otra búsqueda o quitá algún filtro.</p>
            <button type="button" onClick={clearAll} className={`${TOOLBAR_CONTROL} font-bold hover:bg-sand`}>
              Limpiar búsqueda y filtros
            </button>
          </div>
        )}
      </div>

      {data && filtersOpen && (
        <ProductFiltersPanel
          filters={filters}
          options={options}
          dimensionCounts={dimensionCounts}
          priceBounds={priceBounds}
          priceRange={priceRange}
          priceStep={PRICE_STEP}
          activeCount={activeFiltersCount}
          onToggleCategory={toggleCategory}
          onPriceChange={setPriceRange}
          onReset={resetFilters}
          onCollapse={() => setFiltersOpen(false)}
          className="order-first xl:order-last"
        />
      )}
    </section>
  )
}

export default MarketplaceListing
