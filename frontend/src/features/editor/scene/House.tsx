import type { RefObject } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Room } from "./Room";
import { WallWithDoor } from "./Opening";
import type { SceneObject } from "../store/editorStore";

type Vec3 = [number, number, number];

interface HouseProps {
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
}

export function House({
  wallColor,
  commentsByObject,
  onSelectObject,
  selectedObject,
  objectTransforms,
  onTransformChange,
  orbitControlsRef,
  transformMode,
}: HouseProps) {
  const room1Size: Vec3 = [6, 3, 6];
  const room2Size: Vec3 = [6, 3, 6];

  const sharedWallLength = Math.max(room1Size[2], room2Size[2]);

  return (
    <group>
      <Room
        roomId="room1"
        offset={[0, 0, 0]}
        size={room1Size}
        wallColor={wallColor}
        commentsByObject={commentsByObject}
        onSelectObject={onSelectObject}
        selectedObject={selectedObject}
        objectTransforms={objectTransforms}
        onTransformChange={onTransformChange}
        orbitControlsRef={orbitControlsRef}
        transformMode={transformMode}
        skipWallAt="right"
      />

      <Room
        roomId="room2"
        offset={[7.5, 0, 0]}
        size={room2Size}
        wallColor={wallColor}
        commentsByObject={commentsByObject}
        onSelectObject={onSelectObject}
        selectedObject={selectedObject}
        objectTransforms={objectTransforms}
        onTransformChange={onTransformChange}
        orbitControlsRef={orbitControlsRef}
        transformMode={transformMode}
        showFurniture={false}
        skipWallAt="left"
      />

      <WallWithDoor
        position={[3, 1.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        length={sharedWallLength}
        height={0}
        thickness={0}
        doorWidth={0}
      />
    </group>
  );
}