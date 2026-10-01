import FurnitureCard from './FurnitureCard'
import type { Furniture } from '../types'

interface FurnitureListProps {
  items: Furniture[]
  onAddFurniture: (furniture: Furniture) => void
}

function FurnitureList({ items, onAddFurniture }: FurnitureListProps) {
  if (items.length === 0) {
    return <p className="p-4 text-sm text-muted">No se encontraron muebles.</p>
  }

  return (
    <div className="grid grid-cols-2 content-start gap-3 overflow-y-auto p-4">
      {items.map((furniture) => (
        <FurnitureCard key={furniture.id} furniture={furniture} onClick={onAddFurniture} />
      ))}
    </div>
  )
}

export default FurnitureList