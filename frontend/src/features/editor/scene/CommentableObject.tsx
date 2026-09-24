import { forwardRef } from "react";
import type { ReactNode } from "react";
import { Html } from "@react-three/drei";
import type { Group } from "three";

type Vec3 = [number, number, number];

interface CommentableObjectProps {
  name: string;
  position: Vec3;
  rotation?: Vec3;
  onClick?: (name: string) => void;
  commentsByObject?: Record<string, { user: string; comment: string }[]>;
  pinPosition?: Vec3;
  children: ReactNode;
}

export const CommentableObject = forwardRef<Group, CommentableObjectProps>(
  function CommentableObject(
    {
      name,
      position,
      rotation = [0, 0, 0],
      onClick,
      commentsByObject = {},
      pinPosition = [0, 1, 0],
      children,
    },
    ref
  ) {
    const hasComments = (commentsByObject[name] || []).length > 0;

    return (
      <group
        ref={ref}
        position={position}
        rotation={rotation}
        name={name}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(name);
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
  }
);