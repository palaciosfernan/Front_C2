import React, { useRef, useEffect } from "react";
import { Base, Geometry, Subtraction } from "@react-three/csg";
import { BoxGeometry } from "three";

function DoorRef({ open, ...props }) {
  const doorRef = useRef();

  useEffect(() => {
    if (doorRef.current) {
      // La rotación debe ser de 90 grados en radianes (PI/2)
      doorRef.current.rotation.y = open ? Math.PI / 2 : 0;
    }
  }, [open]);

  const frameWidth = 0.1;
  const frameDepth = 0.2;
  const frameHeight = 2;

  const doorDepth = 0.1;
  const doorWidth = 0.4 - 2 * frameWidth;
  const doorHeight = frameHeight - frameWidth;

  const frameBox = new BoxGeometry(1, frameHeight, frameDepth);
  const doorBox = new BoxGeometry(doorWidth, doorHeight, doorDepth);

  const warmColor = "#ffcc88";

  return (
    <mesh ref={doorRef} {...props}>
      <Subtraction>
        <Geometry>
          <Base geometry={frameBox} scale={[1, 1, 1]} />
        </Geometry>
        <meshStandardMaterial attach="material" color={warmColor} />
      </Subtraction>
      <mesh position={[0.5 - frameWidth / 2, 0, 0]} rotation={[0, Math.PI / -2, 0]}>
        <Geometry>
          <Base geometry={doorBox} scale={[1, 1, 1]} />
        </Geometry>
        <meshStandardMaterial attach="material" color={warmColor} />
      </mesh>
    </mesh>
  );
}

export default DoorRef;
