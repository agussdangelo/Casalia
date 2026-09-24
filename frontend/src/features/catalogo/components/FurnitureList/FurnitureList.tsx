import { furnitureCatalog } from "../../MockFurniture"
import FurnitureCard from "../FurnitureCard/FurnitureCard"
import type { Furniture } from "../../types"
import "./furnitureList.css"

interface FurnitureListProps {
  onAddFurniture: (furniture: Furniture) => void
}

function FurnitureList({ onAddFurniture }: FurnitureListProps) {
  return (
    <div className="furniture-list-container">
      <h2 className="furniture-list-title">Catálogo de Muebles</h2>

      <div className="furniture-list">
        {furnitureCatalog.map((mueble) => (
          <FurnitureCard
            key={mueble.id}
            name={mueble.name}
            category={mueble.category}
            thumbnail={mueble.thumbnail}
            onClick={() => onAddFurniture(mueble)}
          />
        ))}
      </div>
    </div>
  )
}

export default FurnitureList