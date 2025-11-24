
import React from 'react';
import { AppConfig, ShapeType } from '../types';
import { MAX_PARTICLES, MIN_PARTICLES } from '../constants';
import { Heart, Waves, Globe, Rotate3d, Box, Triangle, Hexagon, Gem, X } from 'lucide-react';

interface ControlsProps {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
}

const Controls: React.FC<ControlsProps> = ({ config, setConfig }) => {
  
  const shapes: { id: ShapeType; icon: React.ReactNode; label: string }[] = [
    { id: 'sphere', icon: <Globe size={18} />, label: 'Sphere' },
    { id: 'mobius', icon: <Rotate3d size={18} />, label: 'Mobius' },
    { id: 'heart', icon: <Heart size={18} />, label: 'Heart' },
    { id: 'ribbon', icon: <Waves size={18} />, label: 'Flow' },
    { id: 'capsule', icon: <Box size={18} />, label: 'Capsule' },
    { id: 'pyramid', icon: <Triangle size={18} />, label: 'Pyramid' },
    { id: 'tetrahedron', icon: <Gem size={18} />, label: 'Tetra' },
    { id: 'icosahedron', icon: <Hexagon size={18} />, label: 'Crystal' },
    { id: 'xshape', icon: <X size={18} />, label: 'X-Factor' },
  ];

  return (
    <>
      {/* Top Left: Title */}
      <div className="fixed top-0 left-0 p-6 z-30 pointer-events-none select-none max-w-lg">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter font-serif mb-2 bg-gradient-to-r from-pink-300 via-fuchsia-300 to-rose-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,105,180,0.3)]">
          Wang Xintian Flow
        </h1>
        <p className="text-pink-200/70 text-sm font-medium leading-relaxed tracking-wide drop-shadow-md">
           Immerse yourself in a generative particle system where typography transcends two dimensions. 
           Watch as characters morph into sacred geometric forms—from infinite mobius loops to crystalline structures—illuminated by a neon-pink data stream.
        </p>
      </div>

      {/* Top Right: Color & Background Palette */}
      <div className="fixed top-0 right-0 p-6 z-30 flex flex-col items-end gap-3">
        <div className="bg-black/20 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-lg transition-all hover:bg-black/40">
           <span className="text-[10px] font-bold uppercase text-pink-200/50 mb-3 block text-right tracking-widest">Theme Colors</span>
           <div className="grid grid-cols-4 gap-3">
             {config.colorPalette.map((col, idx) => (
               <button
                 key={idx}
                 className="w-6 h-6 rounded-full hover:scale-125 transition-transform shadow-[0_0_8px_rgba(255,100,200,0.4)] ring-1 ring-white/10"
                 style={{ backgroundColor: col }}
                 title={col}
               />
             ))}
           </div>
        </div>
      </div>

      {/* Bottom Center: Shape & Density Controls - Horizontal Strip */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-fit px-4">
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-full shadow-2xl px-6 py-3 flex flex-col xl:flex-row items-center gap-6 xl:gap-8 transition-all hover:bg-black/40">
          
          {/* Shape Selectors */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
            {shapes.map((s) => (
              <button
                key={s.id}
                onClick={() => setConfig({ ...config, shape: s.id })}
                className={`
                  group relative flex items-center justify-center gap-2 px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300
                  ${config.shape === s.id 
                    ? 'bg-pink-500/80 text-white shadow-[0_0_15px_rgba(255,20,147,0.4)] scale-105' 
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                {s.icon}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden xl:block h-8 w-px bg-white/10"></div>
          <div className="block xl:hidden w-full h-px bg-white/10"></div>

          {/* Sliders & Input */}
          <div className="flex flex-row items-center gap-6">
            
            {/* Density */}
            <div className="flex flex-col gap-1 w-24 sm:w-32">
              <label className="text-[10px] uppercase font-bold text-pink-200/50 pl-1">Density</label>
              <input
                type="range"
                min={MIN_PARTICLES}
                max={MAX_PARTICLES}
                value={config.particleCount}
                onChange={(e) => setConfig({ ...config, particleCount: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer outline-none
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:w-3.5 
                  [&::-webkit-slider-thumb]:h-3.5 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-pink-400 
                  [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,100,200,0.5)]
                  [&::-webkit-slider-thumb]:transition-transform
                  active:[&::-webkit-slider-thumb]:scale-125"
              />
            </div>

            {/* Scale */}
            <div className="flex flex-col gap-1 w-24 sm:w-32">
              <label className="text-[10px] uppercase font-bold text-pink-200/50 pl-1">Scale</label>
              <input
                type="range"
                min={0.1}
                max={1.5}
                step={0.1}
                value={config.fontSize}
                onChange={(e) => setConfig({ ...config, fontSize: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer outline-none
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:w-3.5 
                  [&::-webkit-slider-thumb]:h-3.5 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-pink-400 
                  [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,100,200,0.5)]
                  [&::-webkit-slider-thumb]:transition-transform
                  active:[&::-webkit-slider-thumb]:scale-125"
              />
            </div>

            {/* Characters */}
            <div className="flex flex-col gap-1 w-20">
               <label className="text-[10px] uppercase font-bold text-pink-200/50 pl-1">Chars</label>
               <input
                  type="text"
                  value={config.characters}
                  onChange={(e) => setConfig({ ...config, characters: e.target.value })}
                  className="w-full h-8 bg-white/5 border border-white/10 rounded-lg text-center text-xs font-bold text-pink-100 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all placeholder-white/20"
               />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Controls;
