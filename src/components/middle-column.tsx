import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    controls.minDistance = 2;
    controls.maxDistance = 30;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

function Fin() {
  const ref = useRef();
  // useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  // useFrame((state, delta) => (ref.current.rotation.y += 0.01));

  const ct = 0.8;
  const cr = 2;
  const S = 1;

  const t = 0.05;

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, ct);
  shape.lineTo(S, cr);
  shape.lineTo(S, 0);
  shape.lineTo(0, 0);
  const extrudeSettings = {
    steps: 20,
    depth: t,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelOffset: 0,
    bevelSegments: 1,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  return (
    <group position={[-S / 2, -cr / 2, 0]}>
      <mesh ref={ref} geometry={geometry}>
        <meshStandardMaterial color={'#90322a'} />
      </mesh>
    </group>
  );
}

export default function App() {
  return (
    <Canvas>
      <CameraController />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Fin />
    </Canvas>
  );
}
