
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const StarryBackground: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50; // z
    }
    return positions;
  }, [count]);

  const particlesColor = useMemo(() => {
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Pinkish/Purple/White stars
      const r = 0.8 + Math.random() * 0.2;
      const g = 0.5 + Math.random() * 0.5;
      const b = 0.8 + Math.random() * 0.2;
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }
    return colors;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Flowing effect: Rotate slowly
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.01;
      
      // Gentle pulsing scale? No, just movement.
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesColor.length / 3}
          array={particlesColor}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default StarryBackground;
