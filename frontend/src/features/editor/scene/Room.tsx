import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type { Group, Object3D } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { TransformControls } from "@react-three/drei";
import { CommentableObject } from "./CommentableObject";
import { Wall } from "./Surface/Wall";
import { FloorGrid } from "./Surface/FloorGrid";
import { DynamicModel } from "./DynamicModel";
import type { SceneObject } from "../store/editorStore";

type Vec3 = [number, number, number];

interface RoomProps {
  roomId?: string;
  offset?: Vec3;
  size?: Vec3;
  wallColor: string;
  commentsByObject?: Record<string, { user: string; comment: string }[]>;
  onSelectObject: (objectId: string | null) => void;
  selectedObject: string | null;
  objectTransforms: SceneObject[];
  onTransformChange: (
    objectId: string,
    transform: { position: Vec3; rotation: Vec3 }
  ) => void;
  orbitControlsRef: RefObject<OrbitControlsImpl | null>;
  transformMode: "translate" | "rotate";
  showFurniture?: boolean;
  skipWallAt?: "left" | "right" | null;
}

export function Room({
  roomId = "room1",
  offset = [0, 0, 0],
  size = [6, 3, 6],
  wallColor,
  commentsByObject = {},
  onSelectObject,
  selectedObject,
  objectTransforms,
  onTransformChange,
  orbitControlsRef,
  transformMode,
  showFurniture = true,
  skipWallAt = null,
}: RoomProps) {
  const [width, height, depth] = size;
  const halfW = width / 2;
  const halfD = depth / 2;

  const furnitureRefs = useRef<Record<string, Object3D | null>>({});
  const [selectedRefObject, setSelectedRefObject] = useState<Object3D | null>(null);

  useEffect(() => {
    setSelectedRefObject(
      selectedObject ? furnitureRefs.current[selectedObject] ?? null : null
    );
  }, [selectedObject, objectTransforms]);

  const handleTransformEnd = (instanceId: string) => {
    const obj = furnitureRefs.current[instanceId];
    if (!obj) return;
    onTransformChange(instanceId, {
      position: obj.position.toArray() as Vec3,
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
        <Wall color={wallColor} size={[width, height, 0.1]} position={[0, 0, 0]} />
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
          {objectTransforms.map((item) => (
            <CommentableObject
              ref={(el: Group | null) => {
                furnitureRefs.current[item.instanceId] = el;
              }}
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

          {selectedRefObject && selectedObject && (
            <TransformControls
              object={selectedRefObject}
              mode={transformMode}
              onMouseDown={() => {
                if (orbitControlsRef.current) orbitControlsRef.current.enabled = false;
              }}
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