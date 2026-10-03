interface MarketplaceSearchProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

function MarketplaceSearch({ value, onChange, className = '' }: MarketplaceSearchProps) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Buscar productos"
      placeholder="Buscar muebles, iluminación y aberturas…"
      className={`min-h-11 w-full min-w-0 rounded-lg bg-sand px-4 text-sm text-ink placeholder:text-muted ${className}`}
    />
  )
}

export default MarketplaceSearch
