import * as THREE from 'three';
import * as exportSTL from 'ThreeJS-export-STL';
import * as fs from 'fs';
import { saveAs } from 'file-saver';

export function cadExporter(cr: number, S: number, t: number, TEsw: number, LEsw: number) {
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
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const mesh = new THREE.Mesh(geometry, material);

  const stlString = exportSTL.fromMesh(mesh);
  const blob = new Blob([stlString], { type: exportSTL.mimeType });
  saveAs(blob, 'fin.stl');
}
