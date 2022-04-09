import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { Provider } from 'react-redux';
import { store } from '../store';
import Box, { BoxProps } from '@mui/material/Box';

import { useGetFinishedResultQuery } from '../api-client';

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

function reviver(key: any, value: any) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}

type Props = {
  finished: any;
};

const Fin: React.FC<Props> = ({ finished }) => {
  const ref = useRef();
  const [results, setResultsMap] = useState<Map<string, any>>(new Map());
  const { data: rawResults, refetch } = useGetFinishedResultQuery(null);
  useEffect(() => {
    if (finished) {
      refetch();
    }
  }, [finished]);
  useEffect(() => {
    if (rawResults) {
      const mappedResults = JSON.parse(rawResults.data, reviver);
      setResultsMap(mappedResults);
    }
  }, [rawResults]);

  if (results.has('cr') && finished) {
    let cr = results.get('cr').value.max;
    let S = results.get('S').value.max;
    const TEsw = results.get('TEsw').value.max;
    const LEsw = results.get('LEsw').value.max;
    let t = results.get('t').value.max;

    const scale = 1 / cr;
    cr = cr * scale;
    S = S * scale;
    t = t * scale;

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, cr);
    shape.lineTo(S, cr - S * Math.tan(LEsw));
    shape.lineTo(S, S * Math.tan(TEsw));
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
          <meshStandardMaterial color={'#90322a'} metalness={2} roughness={2} />
        </mesh>
      </group>
    );
  } else {
    return null;
  }
};

const middleColumn: React.FC<Props> = ({ finished }) => {
  return (
    <Canvas>
      <CameraController />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Provider store={store}>
        <Fin finished={finished} />
      </Provider>
    </Canvas>
  );
};

export default middleColumn;
// return <Box>No Design to View</Box>;
