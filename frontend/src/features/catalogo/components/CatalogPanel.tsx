import { useFurnitureCatalog } from '../hooks/useFurnitureCatalog'
import { useFurnitureFilter } from '../hooks/useFurnitureFilter'
import FilterButton from './FilterButton'
import CategoryChips from './CategoryChips'
import FurnitureList from './FurnitureList'
import type { Furniture } from '../types'
import CatalogTabs from './CatalogTabs'
import { useState } from 'react'

interface CatalogPanelProps {
    onAddFurniture: (furniture: Furniture) => void
}

function CatalogPanel({ onAddFurniture }: CatalogPanelProps) {
    const [open, setOpen] = useState(true)
    const { data, isLoading, isError } = useFurnitureCatalog()
    const { search, setSearch, category, setCategory,
        filters, setFilters, options, activeFiltersCount, resetFilters, filtered } = useFurnitureFilter(data)

    if (!open) {
        return (
            <aside className="flex h-full w-12 shrink-0 flex-col items-center border-r border-black/10 bg-surface pt-3">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label="Abrir catálogo"
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-black/10 bg-white text-ink hover:bg-black/5"
                >
                    ›
                </button>
            </aside>
        )
    }

    return (

        <aside className="flex h-full w-80 shrink-0 flex-col border-r border-black/10 bg-surface">
            <div className="flex items-center justify-between px-4 pt-4 pb-3">
                <h2 className="text-xs font-medium uppercase tracking-wide text-muted">
                    Agregar elementos
                </h2>
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar catálogo"
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-black/10 bg-white text-ink hover:bg-black/5"
                >
                    ‹
                </button>
            </div>

            <CatalogTabs />

            <div className="flex items-center gap-2 p-4">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar objeto"
                    className="min-w-0 flex-1 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-brand"
                />
                <FilterButton
                    filters={filters}
                    options={options}
                    activeCount={activeFiltersCount}
                    onChange={setFilters}
                    onReset={resetFilters}
                />
            </div>
            <CategoryChips active={category} onChange={setCategory} />

            {isLoading && <p className="p-4 text-sm text-muted">Cargando catálogo...</p>}
            {isError && <p className="p-4 text-sm text-red-600">No se pudo cargar el catálogo.</p>}
            {data && <FurnitureList items={filtered} onAddFurniture={onAddFurniture} />}
        </aside>
    )
}

export default CatalogPanel