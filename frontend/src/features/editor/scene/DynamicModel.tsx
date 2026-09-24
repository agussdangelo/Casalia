import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

interface DynamicModelProps {
  id: string;
} 

export function DynamicModel({ id }: DynamicModelProps) {
 
  const { scene } = useGLTF(`/models/${id}.glb`);
  
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  return <primitive object={clonedScene} />;
}