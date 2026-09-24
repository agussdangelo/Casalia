import { EditorScene } from '@/features/editor/scene/EditorScene'
import { FurnitureList } from '@/features/catalogo'


export default function EditorPage() {
  return (
     <div className="app-container">
      <EditorScene />
      <FurnitureList onAddFurniture={() => {}} />
    </div>
  )
}