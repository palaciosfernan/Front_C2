  import React, { useRef, useEffect } from 'react'
  import * as THREE from 'three'

  export function Light({ position, intensity, color }) {
    const lightRef = useRef()
    const bulbRef = useRef()

    useEffect(() => {
      if (lightRef.current) {
        lightRef.current.intensity = intensity || 30
        lightRef.current.color = new THREE.Color(color || 0xffffff)
      }
    }, [intensity, color])

    return (
      <>
        <pointLight ref={lightRef} position={position} intensity={intensity} castShadow />
        <mesh ref={bulbRef} position={position}>
          <sphereGeometry args={[.1, 16, 16]} />
          <meshStandardMaterial emissive={new THREE.Color(color)} />
        </mesh>
      </>
    )
  }
