import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export function DynamicModel({ id }) {
 
  const { scene } = useGLTF(`/models/${id}.glb`);
  
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  return <primitive object={clonedScene} />;
}