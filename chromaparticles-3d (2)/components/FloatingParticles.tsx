
import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { AppConfig, ParticleData } from '../types';
import { getRandomPositionInShape } from '../utils/geometry';
import { FONTS } from '../constants';

interface FloatingParticlesProps {
  config: AppConfig;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({ config }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => {
    const items: ParticleData[] = [];
    const charSource = config.characters.length > 0 ? config.characters : "?";
    const charArray = Array.from(charSource);
    
    for (let i = 0; i < config.particleCount; i++) {
      const targetPos = getRandomPositionInShape(config.shape, i, config.particleCount);
      const char = charArray[i % charArray.length];
      const color = config.colorPalette[i % config.colorPalette.length];
      
      items.push({
        id: i,
        char,
        color,
        targetPosition: targetPos,
        currentPosition: new THREE.Vector3((Math.random()-0.5)*30, (Math.random()-0.5)*30, (Math.random()-0.5)*30),
        rotation: new THREE.Euler(
          0, 
          Math.random() * Math.PI * 2, 
          0 
        ),
        rotationSpeed: new THREE.Vector3(
          Math.random() * 0.001, 
          0.01 + Math.random() * 0.01, 
          Math.random() * 0.001
        )
      });
    }
    return items;
  }, [config.particleCount, config.shape, config.characters, config.colorPalette]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
  });

  return (
    <group ref={groupRef}>
      {particles.map((p) => (
        <AnimatedTextParticle key={p.id} data={p} fontSize={config.fontSize} />
      ))}
    </group>
  );
};

const AnimatedTextParticle = ({ data, fontSize }: { data: ParticleData, fontSize: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.lerp(data.targetPosition, 2.0 * delta);
      
      const time = state.clock.elapsedTime;
      
      // Slight upright sway
      meshRef.current.rotation.x = Math.sin(time * 1 + data.id) * 0.1;
      meshRef.current.rotation.z = Math.cos(time * 1 + data.id) * 0.05;
      
      // Slowly face camera or rotate Y
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.Material;
      if (material) {
        material.toneMapped = false;
        material.needsUpdate = true;
      }
    }
  }, []);

  return (
    <Text
      ref={meshRef}
      font={FONTS.default}
      fontSize={fontSize}
      color={data.color}
      anchorX="center"
      anchorY="middle"
      position={[data.currentPosition.x, data.currentPosition.y, data.currentPosition.z]}
      rotation={[data.rotation.x, data.rotation.y, data.rotation.z]}
    >
      {data.char}
    </Text>
  );
};

export default FloatingParticles;
