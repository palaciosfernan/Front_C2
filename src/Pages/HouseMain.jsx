    import * as THREE from 'three'
    import { useRef } from 'react'
    import { Canvas } from '@react-three/fiber'
    import { OrbitControls } from '@react-three/drei'
    import { Geometry, Base, Subtraction, Addition } from '@react-three/csg'
    import { Env } from '../components/Env'
    import { Light } from '../components/Ligth'
    import DoorRef from '../components/Door'
  import DoorGareje from '../components/DooGaraje'
  import '../App.css'
    


  const box = new THREE.BoxGeometry();
  const tri = new THREE.CylinderGeometry(1, 1, 2, 3);
  
  export default function MainHouse({
    isLightOn,
    doorOpen,
    garageOpen,
    acOn,
  }) {
    return (
      <>
        <Canvas shadows camera={{ position: [50, 0, 40], fov: 12 }}>
          <color attach="background" args={['skyblue']} />
          <House
            isLightOn={isLightOn}
            doorOpen={doorOpen}
            garageOpen={garageOpen}
            acOn={acOn}
          />
          <Env />
          <OrbitControls makeDefault />
        </Canvas>
      </>
    );
  }
  
  export function House({
    isLightOn,
    doorOpen,
    garageOpen,
    acOn,
    ...props
  }) {
    const csg = useRef();
  
    return (
      <mesh receiveShadow castShadow {...props}>
        <Geometry ref={csg} computeVertexNormals>
          <Base name="base" geometry={box} scale={[3, 3, 3]} />
          <Subtraction name="cavity" geometry={box} scale={[2.7, 2.7, 2.7]} />
          <Addition name="roof" geometry={tri} scale={[2.5, 1.5, 1.425]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 2.2, 0]} />
          <Chimenea scale={0.5} position={[-0.75, 3, 0.8]} />
          <mesh position={[-1.2, 1, 0]}>
            <meshStandardMaterial color={acOn ? "green" : "white"} name="air-conditioning" />
            <boxGeometry args={[0.4, 0.6, 2]} />
          </mesh>
            {/* este es la funcion del foco */}
          <Light position={[0, 1.3, 0]} color={isLightOn ? "white" : "black"} />
          
          <Ventana position={[1.1, 2.5, 0]} scale={0.6} rotation={[0, Math.PI / 2, 0]} />
          <Ventana position={[0, 2.5, 1.5]} scale={0.6} rotation={[0, 0, 0]} />
          <Ventana position={[0, 0.25, 1.5]} scale={1.25} />
          <Ventana rotation={[0, Math.PI / 2, 0]} position={[1.425, 0.25, -0.7]} scale={1.25} />
          <DoorRef position={[1, 0, 0.8]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1.2, 5.5]} open={doorOpen} />
          <Addition name="garage" geometry={box} scale={[4, 4, 3.04]} rotation={[-Math.PI / 2, 0, 0]} position={[-0.5, 0, -3.5]} />
          <Addition name="roof" geometry={box} scale={[5, 0, 5]} rotation={[-Math.PI / 360, 0, 0]} position={[-.5, 1.6, -4]} />
          <Subtraction name="garage-cavity" geometry={box} scale={[4, 3, 2]} position={[1, 0,-4.2]} />
          <DoorGareje position={[1.3, 0, -4.2]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1]} open={garageOpen} />
        </Geometry>
        <meshStandardMaterial envMapIntensity={0.25} />
      </mesh>  
    );
  }
  
  const Ventana = (props) => (
    <Subtraction {...props}>
      <Geometry>
        <Base geometry={box} />
        <Subtraction geometry={box} scale={[0.05, 1, 1]} />
        <Subtraction geometry={box} scale={[1, 0.05, 1]} />
      </Geometry>
    </Subtraction>
  );
  
  const Chimenea = (props) => (
    <Addition name="chimney" {...props}>
      <Geometry>
        <Base name="base" geometry={box} scale={[1, 2, 1]} />
        <Subtraction name="hole" geometry={box} scale={[0.6, 0.6, 0.6]} />
      </Geometry>
    </Addition>
  );