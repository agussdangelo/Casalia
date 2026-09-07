import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { House } from "./components/scene/House";
import { Controls } from "./components/ui/Controls/Controls";

import { PinnedCommentPanel } from "./components/ui/PinnedCommentPanel";
import { useSignalR } from "./hooks/useSignalR";
import { usePinnedComments } from "./hooks/usePinnedComments";

import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import FurnitureList  from "./components/ui/FurnitureList/FurnitureList";
import "./App.css";

export default function App() {
  const [wallColor, setWallColor] = useState("#d8c9a3");
  const [transformMode, setTransformMode] = useState("translate");
  const [userName] = useState("Usuario-" + Math.floor(Math.random() * 1000));
  const [selectedObject, setSelectedObject] = useState(null);


const [objectTransforms, setObjectTransforms] = useState([
    { instanceId: "sofa-1", id: "sofa", position: [-2, 0, -0.8], rotation: [0, Math.PI / 2, 0] },
    { instanceId: "lamp-1", id: "floorLamp", position: [-2, 0, 2], rotation: [0, Math.PI / 2, 0] },
    { instanceId: "table-1", id: "coffeeTable", position: [0, 0, 0], rotation: [0, Math.PI / 2, 0] },
  ]);

  
  const addFurnitureToScene = (mueble) => {
    const uniqueInstanceId = `${mueble.id}-${Date.now()}`; // Crea un ID único basado en el tiempo

    setObjectTransforms(prev => [
      ...prev,
      {
        instanceId: uniqueInstanceId,
        id: mueble.id, 
        position: [1, 0, 0], 
        rotation: [0, 0, 0]
      }
    ]);
  };

  const updateTransform = (instanceId, transform) => {
    console.log("Actualizando", instanceId, transform);
    setObjectTransforms(prev =>
      prev.map(item => 
        item.instanceId === instanceId 
          ? { ...item, ...transform } 
          : item
      )
    );
  };
  const orbitControlsRef = useRef();

  const connection = useSignalR();
  const { commentsByObject, sendPinnedComment } = usePinnedComments(connection);



  return (
    <div className="app-container">
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
              onSelectObject={setSelectedObject}
              selectedObject={selectedObject}
              objectTransforms={objectTransforms}
              onTransformChange={updateTransform}
              orbitControlsRef={orbitControlsRef}
              transformMode={transformMode}
            />
          </Suspense>
          <OrbitControls ref={orbitControlsRef} />
        </Canvas>


        <PinnedCommentPanel
          objectId={selectedObject}
          comments={commentsByObject[selectedObject] || []}
          userName={userName}
          onSend={sendPinnedComment}
          onClose={() => setSelectedObject(null)}
        />
      </div>

      <FurnitureList onAddFurniture={addFurnitureToScene} /> 
  
    </div>
  );
}