
import * as THREE from 'three';

export type ShapeType = 'sphere' | 'mobius' | 'heart' | 'ribbon' | 'capsule' | 'pyramid' | 'icosahedron' | 'tetrahedron' | 'xshape';

export interface AppConfig {
  particleCount: number;
  shape: ShapeType;
  characters: string;
  bgColor: string;
  colorPalette: string[];
  fontSize: number;
}

export interface ParticleData {
  id: number;
  char: string;
  color: string;
  targetPosition: THREE.Vector3;
  currentPosition: THREE.Vector3;
  rotation: THREE.Euler;
  rotationSpeed: THREE.Vector3;
}
