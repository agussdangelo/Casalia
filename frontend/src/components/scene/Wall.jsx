// components/scene/Wall.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function Wall({
  position,
  rotation = [0, 0, 0],
  color = "#e8e2d5",
  size = [6, 3, 0.1],
  fadeDistance = 9.5,
  minOpacity = 0.1,
}) {
  const meshRef = useRef();

  useFrame(({ camera }) => {
    if (!meshRef.current) return;
    const worldPos = meshRef.current.getWorldPosition(meshRef.current.position.clone());
    const dist = camera.position.distanceTo(worldPos);
    const targetOpacity = dist < fadeDistance ? minOpacity : 1;
    const mat = meshRef.current.material;
    mat.opacity += (targetOpacity - mat.opacity) * 0.1; // suavizado
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent />
    </mesh>
  );
}