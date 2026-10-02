import { useEffect, useRef, useState } from 'react'
import type { FurnitureFilters } from '../hooks/useFurnitureFilter'
import { COLOR_HEX, DEFAULT_COLOR_HEX } from '../colorsFilter';

interface FilterButtonProps {
    filters: FurnitureFilters
    options: { styles: string[]; colors: string[] }
    activeCount: number
    onChange: (filters: FurnitureFilters) => void
    onReset: () => void
}

const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

function FilterButton({ filters, options, activeCount, onChange, onReset }: FilterButtonProps) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        const handler = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [open])

    const chip = (active: boolean) =>
        `rounded-full px-3 py-1 text-xs transition ${active ? 'bg-brand text-white' : 'bg-black/5 text-ink hover:bg-black/10'
        }`

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label="Filtros"
                aria-expanded={open}
                className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-white text-ink hover:bg-black/5"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="7" y1="12" x2="17" y2="12" />
                    <line x1="10" y1="18" x2="14" y2="18" />
                </svg>
                {activeCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] text-white">
                        {activeCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 top-11 z-20 w-64 rounded-xl border border-black/10 bg-white p-4 shadow-lg">
                    <p className="mb-2 text-xs font-medium uppercase text-muted">Estilo</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                        {options.styles.map((s) => (
                            <button
                                key={s}
                                type="button"
                                className={chip(filters.styles.includes(s))}
                                onClick={() => onChange({ ...filters, styles: toggle(filters.styles, s) })}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    <p className="mb-2 text-xs font-medium uppercase text-muted">Color</p>
                    <div className="mb-4 flex flex-wrap gap-3">
                        {options.colors.map((c) => {
                            const selected = filters.colors.includes(c)
                            return (
                                <button
                                    key={c}
                                    type="button"
                                    title={c}
                                    aria-label={c}
                                    aria-pressed={selected}
                                    onClick={() => onChange({ ...filters, colors: toggle(filters.colors, c) })}
                                    className={`h-7 w-7 rounded-full border border-black/10 transition ${selected ? 'ring-2 ring-brand ring-offset-2' : 'hover:scale-110'
                                        }`}
                                    style={{ backgroundColor: COLOR_HEX[c] ?? DEFAULT_COLOR_HEX }}
                                />
                            )
                        })}
                    </div>

                    <div className="flex items-center justify-between">
                        <button type="button" onClick={onReset} className="text-xs text-muted hover:text-ink">
                            Limpiar
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="rounded-lg bg-ink px-3 py-1 text-xs text-white"
                        >
                            Listo
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilterButton