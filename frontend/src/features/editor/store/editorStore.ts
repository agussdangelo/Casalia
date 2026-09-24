import { create } from 'zustand'

export interface SceneObject {
  instanceId: string
  id: string
  position: [number, number, number]
  rotation: [number, number, number]
}

interface EditorState {
  objects: SceneObject[]
  selectedId: string | null
  loadDesign: (objects: SceneObject[]) => void
  updateObject: (instanceId: string, changes: Partial<SceneObject>) => void
  addObject: (object: SceneObject) => void
  select: (instanceId: string | null) => void
}



export const useEditorStore = create<EditorState>()((set) => ({
  objects: [
  { instanceId: 'sofa-1', id: 'sofa', position: [-2, 0, -0.8], rotation: [0, Math.PI / 2, 0] },
  { instanceId: 'lamp-1', id: 'floorLamp', position: [-2, 0, 2], rotation: [0, Math.PI / 2, 0] },
  { instanceId: 'table-1', id: 'coffeeTable', position: [0, 0, 0], rotation: [0, Math.PI / 2, 0] },
],
  selectedId: null,
  loadDesign: (objects) => set({ objects }),
  updateObject: (instanceId, changes) =>
    set((state) => ({
      objects: state.objects.map((o) =>
        o.instanceId === instanceId ? { ...o, ...changes } : o
      ),
    })),
  addObject: (object) =>
    set((state) => ({ objects: [...state.objects, object] })),
  select: (instanceId) => set({ selectedId: instanceId }),
}))