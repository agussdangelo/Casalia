export type FurnitureCategory = 'sillones' | 'mesas' | 'luz' | 'deco'

export interface Furniture {
  id: string
  name: string
  category: FurnitureCategory
  thumbnail: string
  url: string
  style?: string
  color?: string
}