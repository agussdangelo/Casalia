import { forwardRef } from "react";
import { Html } from "@react-three/drei";

export const CommentableObject = forwardRef(function CommentableObject({
  name,
  position,
  rotation = [0, 0, 0],
  onClick,
  commentsByObject = {},
  pinPosition = [0, 1, 0],
  children
}, ref) {

  const hasComments = (commentsByObject[name] || []).length > 0;

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}
      name={name}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(name);
      }}
    >
      {children}
      {hasComments && (
        <Html position={pinPosition} center distanceFactor={8}>
          <div style={{ fontSize: 20, cursor: "pointer" }}>📌</div>
        </Html>
      )}
    </group>
  );
});