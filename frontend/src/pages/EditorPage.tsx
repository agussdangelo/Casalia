import { EditorScene } from '@/features/editor/scene/EditorScene'
import { CatalogPanel } from '@/features/catalogo'
import { Link } from 'react-router-dom'
import { Brand, Icon } from '@/components/home/Visuals'
import { useHome } from '@/components/home/useHome'

export default function EditorPage() {
  const { editorDesign, navigate, resetNavigation } = useHome()

  return (
    <div className="editor-page">
      <header className="editor-header flex items-center justify-between gap-4">
        <Link to="/inicio" className="editor-back flex items-center gap-3" aria-label="Volver al inicio de Casalia" onClick={resetNavigation}>
          <Brand />
          <span>← Volver al inicio</span>
        </Link>
        <span className="editor-design-name">{editorDesign.name}</span>
        <button className="cart-button" aria-label="Volver al inicio" onClick={() => navigate('Inicio')}>
          <Icon name="close" />
        </button>
      </header>
      <div className="app-container">
        <CatalogPanel onAddFurniture={() => {}} />
        <EditorScene />
      </div>
    </div>
  )
}