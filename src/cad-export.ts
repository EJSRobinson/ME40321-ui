import * as THREE from 'three';
import * as exportSTL from 'ThreeJS-export-STL';
import * as fs from 'fs';
import { saveAs } from 'file-saver';

export function cadExporter(
  raw_cr: string,
  raw_S: string,
  raw_t: string,
  raw_TEsw: string,
  raw_LEsw: string
) {
  const cr = parseFloat(raw_cr) / 1000;
  const S = parseFloat(raw_S) / 1000;
  const t = parseFloat(raw_t) / 1000;
  const TEsw = (parseFloat(raw_TEsw) * Math.PI) / 180;
  const LEsw = (parseFloat(raw_LEsw) * Math.PI) / 180;

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
