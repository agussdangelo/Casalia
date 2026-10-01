const TABS = [
  { id: 'marketplace', label: 'Marketplace', enabled: false },
  { id: 'catalog', label: 'Catálogo', enabled: true },
  { id: 'myModels', label: 'Mis modelos', enabled: false },
  { id: 'favorites', label: 'Favoritos', enabled: false },
]

function CatalogTabs() {
  return (
    <div className="flex pt-3 gap-3 border-b border-black/10 px-4">
      {TABS.map(({ id, label, enabled }) => (
        <button
          key={id}
          type="button"
          disabled={!enabled}
          className={`-mb-px border-b-2 pb-2 text-xs transition ${
            enabled
              ? 'border-brand font-medium text-ink'
              : 'cursor-not-allowed border-transparent text-muted/60'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default CatalogTabs