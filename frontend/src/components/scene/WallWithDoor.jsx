import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function WallWithDoor({
  position,
  rotation = [0, 0, 0],
  color = "#e8e2d5",
  length = 6,
  height = 3,
  thickness = 0.1,
  doorWidth = 1.2,
  fadeDistance = 1.2,
  minOpacity = 0.15,
}) {
  const leftRef = useRef();
  const rightRef = useRef();

  
  const segmentLength = (length - doorWidth) / 2;
  const leftOffset = -(doorWidth / 2 + segmentLength / 2);
  const rightOffset = doorWidth / 2 + segmentLength / 2;

  useFrame(({ camera }) => {
    [leftRef, rightRef].forEach((ref) => {
      if (!ref.current) return;
      const worldPos = ref.current.getWorldPosition(ref.current.position.clone());
      const dist = camera.position.distanceTo(worldPos);
      const targetOpacity = dist < fadeDistance ? minOpacity : 1;
      const mat = ref.current.material;
      mat.opacity += (targetOpacity - mat.opacity) * 0.1;
    });
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={leftRef} position={[leftOffset, 0, 0]}>
        <boxGeometry args={[segmentLength, height, thickness]} />
        <meshStandardMaterial color={color} transparent />
      </mesh>
      <mesh ref={rightRef} position={[rightOffset, 0, 0]}>
        <boxGeometry args={[segmentLength, height, thickness]} />
        <meshStandardMaterial color={color} transparent />
      </mesh>
    </group>
  );
}