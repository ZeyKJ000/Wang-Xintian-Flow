
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import FloatingParticles from './components/FloatingParticles';
import Controls from './components/Controls';
import StarryBackground from './components/StarryBackground';
import { AppConfig } from './types';
import { DEFAULT_CHARACTERS, DEFAULT_PARTICLE_COUNT, PRESET_COLORS, DEFAULT_BG_COLOR } from './constants';

const App: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>({
    particleCount: DEFAULT_PARTICLE_COUNT,
    shape: 'mobius',
    characters: DEFAULT_CHARACTERS,
    bgColor: DEFAULT_BG_COLOR, 
    colorPalette: PRESET_COLORS,
    fontSize: 0.5
  });

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black selection:bg-pink-500/30">
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 2, 18], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }} // alpha: false for pure black
      >
        <Suspense fallback={null}>
          <color attach="background" args={[config.bgColor]} />
          
          {/* Minimal ambient light, relying on toneMapped=false on particles for glow */}
          <ambientLight intensity={0.1} />
          
          <StarryBackground />
          <FloatingParticles config={config} />
          
          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            minDistance={10} 
            maxDistance={30}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
          />
          
          {/* Reflection environment */}
          <Environment preset="city" blur={1} background={false} />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <Controls config={config} setConfig={setConfig} />
    </div>
  );
};

export default App;
