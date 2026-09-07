export function FloorGrid() {
  return (
    <group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#c9b79c" />
      </mesh>
   
      <gridHelper args={[6, 6, '#4c4030a0', '#d0c4b2']} position={[0, 0.01, 0]} />
    </group>
  );
}