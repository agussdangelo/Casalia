// features/editor/scene/EditorScene.tsx
import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

import { useSignalR } from '@/shared/hooks/useSignalR'
import { PinnedCommentPanel, usePinnedComments } from '@/features/diseno'
import { useEditorStore } from '../store/editorStore'
import { House } from './House'
import { Controls } from '../tools/Controls'


export function EditorScene() {
  const [wallColor, setWallColor] = useState('#d8c9a3')
  const [transformMode, setTransformMode] = useState<'translate' | 'rotate'>('translate')
 const [userName] = useState(() => 'Usuario-' + Math.floor(Math.random() * 1000))
  const orbitControlsRef = useRef(null)

  // Editor state (Zustand)
  const objects = useEditorStore((s) => s.objects)
  const updateObject = useEditorStore((s) => s.updateObject)
  const selectedId = useEditorStore((s) => s.selectedId)
  const select = useEditorStore((s) => s.select)

  // Comments (SignalR): the hook is called ONCE, here
  const connection = useSignalR()
  const { commentsByObject, sendPinnedComment } = usePinnedComments(connection)

  return (
    <div className="scene-area">
      <Controls
        wallColor={wallColor}
        onWallColorChange={setWallColor}
        transformMode={transformMode}
        onTransformModeChange={setTransformMode}
      />

      <Canvas camera={{ position: [4, 3, 5], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Environment preset="apartment" />
        <gridHelper args={[50, 10, '#666666', '#666666']} position={[0, -0.02, 0]} />
        <gridHelper args={[50, 50, '#d0d0d0', '#e5e5e5']} position={[0, -0.01, 0]} />
        <Suspense fallback={null}>
          <House
            wallColor={wallColor}
            commentsByObject={commentsByObject}
            onSelectObject={select}
            selectedObject={selectedId}
            objectTransforms={objects}
            onTransformChange={updateObject}
            orbitControlsRef={orbitControlsRef}
            transformMode={transformMode}
          />
        </Suspense>
        <OrbitControls ref={orbitControlsRef} />
      </Canvas>

      <PinnedCommentPanel
        objectId={selectedId}
        comments={commentsByObject[selectedId ?? ''] || []}
        userName={userName}
        onSend={sendPinnedComment}
        onClose={() => select(null)}
      />
    </div>
  )
}