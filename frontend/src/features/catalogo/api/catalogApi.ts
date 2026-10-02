import { furnitureCatalog } from '../mocks/MockFurniture'
import type { Furniture } from '../types'

export async function fetchFurniture(): Promise<Furniture[]> {
  // Hoy devuelve el mock. Mas adelnate: return http.get('/models3d?origin=GENERIC')
  return furnitureCatalog
}