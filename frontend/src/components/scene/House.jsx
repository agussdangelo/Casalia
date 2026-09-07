import { Room } from "./Room";
import { WallWithDoor } from "./WallWithDoor";

export function House({
  wallColor,
  commentsByObject,
  onSelectObject,
  selectedObject,
  objectTransforms,
  onTransformChange,
  orbitControlsRef,
  transformMode,
}) {
  const room1Size = [6, 3, 6];
  const room2Size = [9, 3, 9];

 
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
      />
    </group>
  );
}