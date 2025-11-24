
import * as THREE from 'three';
import { ShapeType } from '../types';

const PHI = (1 + Math.sqrt(5)) / 2;

export const getRandomPositionInShape = (shape: ShapeType, index: number, total: number): THREE.Vector3 => {
  const vec = new THREE.Vector3();
  const t = index / total; // 0 to 1
  const rand = Math.random();

  switch (shape) {
    case 'sphere': {
      // Dense hollow sphere
      const r = 4.5;
      const phi = Math.acos(-1 + (2 * index) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      vec.setFromSphericalCoords(r, phi, theta);
      // Add slight noise for thickness
      vec.addScaledVector(new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5), 0.2);
      break;
    }
    
    case 'mobius': {
      // Mobius Strip
      // u in [0, 2pi], v in [-1, 1]
      const u = t * Math.PI * 2;
      const v = (Math.random() - 0.5) * 2.5; // Width
      const r = 3.5 + v/2 * Math.cos(u/2);
      
      const x = r * Math.cos(u);
      const y = r * Math.sin(u);
      const z = v/2 * Math.sin(u/2);
      
      vec.set(x, y, z);
      break;
    }

    case 'heart': {
      const phi = Math.random() * Math.PI * 2;
      const rScale = Math.sqrt(Math.random()); // Density adjustment
      
      // 3D Heart surface
      const x = 16 * Math.pow(Math.sin(phi), 3);
      const y = 13 * Math.cos(phi) - 5 * Math.cos(2*phi) - 2 * Math.cos(3*phi) - Math.cos(4*phi);
      
      // Z thickness
      const z = (Math.random() - 0.5) * 4; 
      
      vec.set(x, y, z).multiplyScalar(0.25);
      vec.y += 1;
      break;
    }

    case 'ribbon': {
      const len = 14;
      const width = 4;
      
      const u = (t - 0.5) * len;
      const v = (Math.random() - 0.5) * width;
      
      const x = u;
      const y = Math.sin(u * 0.8) * 2.5;
      const z = v + Math.cos(u * 1.2) * 2; 
      
      vec.set(x, y, z);
      break;
    }

    case 'capsule': {
      // Capsule: Cylinder + 2 Hemispheres
      const radius = 2.0;
      const height = 5.0; // Height of cylinder part
      const section = Math.random();
      
      if (section < 0.2) {
        // Top cap
        const v = new THREE.Vector3().randomDirection();
        if (v.y < 0) v.y *= -1;
        vec.copy(v).multiplyScalar(radius).add(new THREE.Vector3(0, height/2, 0));
      } else if (section > 0.8) {
        // Bottom cap
        const v = new THREE.Vector3().randomDirection();
        if (v.y > 0) v.y *= -1;
        vec.copy(v).multiplyScalar(radius).add(new THREE.Vector3(0, -height/2, 0));
      } else {
        // Cylinder body
        const angle = Math.random() * Math.PI * 2;
        const h = (Math.random() - 0.5) * height;
        vec.set(Math.cos(angle)*radius, h, Math.sin(angle)*radius);
      }
      break;
    }

    case 'pyramid': {
      // Square Pyramid
      const baseSize = 5;
      const height = 6;
      
      const face = Math.floor(Math.random() * 5); // 0=base, 1-4=sides
      
      if (face === 0) {
        // Base
        vec.set(
          (Math.random() - 0.5) * baseSize * 2,
          -height / 2,
          (Math.random() - 0.5) * baseSize * 2
        );
      } else {
        // Sides
        const t = Math.sqrt(Math.random());
        const angle = (face - 1) * (Math.PI / 2);
        const baseX = Math.cos(angle + Math.PI/4) * baseSize * 1.414;
        const baseZ = Math.sin(angle + Math.PI/4) * baseSize * 1.414;
        
        vec.x = baseX * (1 - t);
        vec.z = baseZ * (1 - t);
        vec.y = -height/2 + height * t;
      }
      break;
    }

    case 'icosahedron': {
      // Geometric Crystal / Icosahedron approx
      const r = 4;
      const phi = Math.acos(-1 + (2 * index) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      
      // Snap to discrete angles to simulate facets
      const snap = (val: number, step: number) => Math.round(val / step) * step;
      const phiS = snap(phi, 0.5);
      const thetaS = snap(theta, 0.5);
      
      vec.setFromSphericalCoords(r, phiS, thetaS);
      break;
    }

    case 'tetrahedron': {
      // Regular Tetrahedron
      // Vertices of a tetrahedron centered at origin
      const s = 4.5;
      const v0 = new THREE.Vector3(1, 1, 1).multiplyScalar(s);
      const v1 = new THREE.Vector3(1, -1, -1).multiplyScalar(s);
      const v2 = new THREE.Vector3(-1, 1, -1).multiplyScalar(s);
      const v3 = new THREE.Vector3(-1, -1, 1).multiplyScalar(s);

      // 4 Faces
      const face = Math.floor(Math.random() * 4);
      let A, B, C;
      
      if (face === 0) { A = v0; B = v1; C = v2; }
      else if (face === 1) { A = v0; B = v1; C = v3; }
      else if (face === 2) { A = v0; B = v2; C = v3; }
      else { A = v1; B = v2; C = v3; }

      // Random point on triangle
      let r1 = Math.random();
      let r2 = Math.random();
      if (r1 + r2 > 1) {
        r1 = 1 - r1;
        r2 = 1 - r2;
      }
      
      vec.copy(A).addScaledVector(new THREE.Vector3().subVectors(B, A), r1).addScaledVector(new THREE.Vector3().subVectors(C, A), r2);
      break;
    }

    case 'xshape': {
      // Large X shape
      const length = 12; // Total length
      const thickness = 1.5;
      
      // Determine which bar of the X
      const bar = Math.random() > 0.5 ? 1 : -1;
      
      // t goes from -0.5 to 0.5 along the length
      const t = (Math.random() - 0.5);
      
      // Main axis
      const x = t * length;
      const y = t * length * bar; // y follows x or -x
      
      // Randomness in thickness
      // Perpendicular vector in XY plane to (1, bar) is (-bar, 1)
      const perpX = -bar;
      const perpY = 1;
      
      // Z randomness
      const offsetT = (Math.random() - 0.5) * thickness;
      const offsetZ = (Math.random() - 0.5) * thickness;
      
      vec.set(
        x + offsetT * perpX,
        y + offsetT * perpY,
        offsetZ
      );
      break;
    }

    default: {
      vec.set(0,0,0);
    }
  }
  return vec;
};
