import type { Furniture } from '../types'

const ASSETS = `${import.meta.env.VITE_ASSETS_BASE_URL}/generic`

export const furnitureCatalog: Furniture[] = [
  {
    id: 'sillaNordica',
    name: 'Silla nórdica',
    category: 'sillones',
    thumbnail: `${ASSETS}/miniaturas/silla-nordica.png`,
    url: `${ASSETS}/modelos3d/silla-nordica.glb`,
    style: 'Nórdico',
    color: 'Verde',
  },
  {
    id: 'coffeeTable',
    name: 'Mesa ratona',
    category: 'mesas',
    thumbnail: `${ASSETS}/miniaturas/mesa-ratona.png`,
    url: `${ASSETS}/modelos3d/coffee-table.glb`,
    style: 'Clásico',
    color: 'Marrón',
  },
  {
    id: 'sofa',
    name: 'Sofá 3 cuerpos',
    category: 'sillones',
    thumbnail: `${ASSETS}/miniaturas/sofa-3c.png`,
    url: `${ASSETS}/modelos3d/sofa.glb`,
    style: 'Moderno',
    color: 'Negro',
  },
  {
    id: 'floorLamp',
    name: 'Lámpara de suelo',
    category: 'luz',
    thumbnail: `${ASSETS}/miniaturas/lampara-suelo.png`,
    url: `${ASSETS}/modelos3d/floorLamp.glb`,
    style: 'Moderno',
    color: 'Gris',
  },
  {
    id: 'CouchSmall',
    name: 'Sillon chico',
    category: 'sillones',
    thumbnail: `${ASSETS}/miniaturas/sillon-chico.png`,
    url: `${ASSETS}/modelos3d/CouchSmall.glb`,
    style: 'Moderno',
    color: 'Azul',
  },
  {
    id: 'DeskLight',
    name: 'Escritorio',
    category: 'mesas',
    thumbnail: `${ASSETS}/miniaturas/escritorio.png`,
    url: `${ASSETS}/modelos3d/Desk.glb`,
    style: 'Clásico',
    color: 'Marrón',
  },
  {
    id: 'Houseplant',
    name: 'Planta de interior',
    category: 'deco',
    thumbnail: `${ASSETS}/miniaturas/planta-interior.png`,
    url: `${ASSETS}/modelos3d/Houseplant.glb`,
    style: 'Natural',
    color: 'Verde',
  },
]