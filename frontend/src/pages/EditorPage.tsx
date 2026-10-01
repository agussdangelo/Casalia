import { EditorScene } from '@/features/editor/scene/EditorScene'
import { CatalogPanel } from '@/features/catalogo'

export default function EditorPage() {
  return (
    <div className="app-container">
      <CatalogPanel onAddFurniture={() => {}} />
      <EditorScene />
    </div>
  )
}