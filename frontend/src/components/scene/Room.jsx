import { useRef } from "react";
import { TransformControls } from "@react-three/drei";
import { CommentableObject } from "./CommentableObject";
import { Wall } from "./Wall";
import { FloorGrid } from "./FloorGrid";
import { DynamicModel } from "./DynamicModel";

export function Room({
  roomId = "room1",
  offset = [0, 0, 0],
  size = [6, 3, 6], // [ancho, alto, profundidad]
  wallColor,
  commentsByObject = {},
  onSelectObject,
  selectedObject,
  objectTransforms,
  onTransformChange,
  orbitControlsRef,
  transformMode,
  showFurniture = true,
  skipWallAt = null, // puede ser "left", "right", o null
}) {
  const [width, height, depth] = size;
  const halfW = width / 2;
  const halfD = depth / 2;

  const furnitureRefs = useRef({});

  const handleTransformEnd = (instanceId) => {
    const obj = furnitureRefs.current[instanceId];
    if (!obj) return;
    onTransformChange(instanceId, {
      position: obj.position.toArray(),
      rotation: [obj.rotation.x, obj.rotation.y, obj.rotation.z],
    });
  };

  return (
    <group position={offset}>
      <FloorGrid />

      <CommentableObject
        name={`${roomId}-customWall`}
        position={[0, height / 2, -halfD]}
        commentsByObject={commentsByObject}
        onClick={onSelectObject}
      >
        <Wall color={wallColor} size={[width, height, 0.1]} />
      </CommentableObject>

      {skipWallAt !== "left" && (
        <Wall
          position={[-halfW, height / 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
          size={[depth, height, 0.1]}
        />
      )}

      {skipWallAt !== "right" && (
        <Wall
          position={[halfW, height / 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
          size={[depth, height, 0.1]}
        />
      )}

      <Wall position={[0, height / 2, halfD]} size={[width, height, 0.1]} />

      {showFurniture && (
        <>
          {/* Recorremos el arreglo de muebles dinámicamente */}
          {objectTransforms.map((item) => (
            <CommentableObject
              ref={(el) => (furnitureRefs.current[item.instanceId] = el)}
              key={item.instanceId}
              name={item.instanceId}
              position={item.position}
              rotation={item.rotation}
              pinPosition={[0, 0.5, 0]}
              commentsByObject={commentsByObject}
              onClick={onSelectObject}
            >
              
              <DynamicModel id={item.id} />
            </CommentableObject>
          ))}

          {/* Y aquí pasamos la referencia exacta al TransformControls */}
          {selectedObject && furnitureRefs.current[selectedObject] && (
            <TransformControls
              object={furnitureRefs.current[selectedObject]}
              mode={transformMode}
              onMouseDown={() => { if (orbitControlsRef.current) orbitControlsRef.current.enabled = false; }}
              onMouseUp={() => {
                if (orbitControlsRef.current) orbitControlsRef.current.enabled = true;
                handleTransformEnd(selectedObject);
              }}
            />
          )}
        </>
      )}
    </group>
  );
}