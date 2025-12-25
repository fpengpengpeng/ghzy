import React, { useState, useEffect } from 'react';
import { Sun, Droplets, Zap, ArrowRight, RotateCcw, Plus, ArrowDown } from 'lucide-react';

interface LightReactionProps {
  atpPool: number;
  setAtpPool: React.Dispatch<React.SetStateAction<number>>;
  nadphPool: number;
  setNadphPool: React.Dispatch<React.SetStateAction<number>>;
}

const LightReactionSim: React.FC<LightReactionProps> = ({ atpPool, setAtpPool, nadphPool, setNadphPool }) => {
  const [activePhoton, setActivePhoton] = useState(false);
  const [electronPos, setElectronPos] = useState(0); // 0: PSII, 1: PQ, 2: Cyt, 3: PC, 4: PSI, 5: FD, 6: Reductase
  const [protons, setProtons] = useState(0); // H+ gradient
  const [isAnimating, setIsAnimating] = useState(false);
  const [justSynthesized, setJustSynthesized] = useState(false);

  const startSimulation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActivePhoton(true);
    setElectronPos(0);
    
    // Step 1: Photolysis of Water
    // 2H2O -> 4H+ + O2 + 4e-
    setTimeout(() => {
      setElectronPos(1);
      setProtons(p => p + 2); // Build gradient (Simulating 2H+ from water)
    }, 1500);

    // Step 2: PQ -> Cyt -> PC
    setTimeout(() => {
        setElectronPos(2);
        setProtons(p => p + 1); // Pump more protons (PQ cycle)
    }, 3000);

    setTimeout(() => {
        setElectronPos(4); // Arrive at PSI
    }, 4500);

    // Step 3: PSI Re-excitation
    setTimeout(() => {
        setElectronPos(5); // FD
    }, 6000);

    // Step 4: NADP+ Reductase
    setTimeout(() => {
        setElectronPos(6);
        setNadphPool(prev => prev + 1);
        setActivePhoton(false);
        setIsAnimating(false);
    }, 7500);
  };

  const synthesizeATP = () => {
    if (protons >= 3) {
      setProtons(p => p - 3);
      setAtpPool(a => a + 1);
      setJustSynthesized(true);
      setTimeout(() => setJustSynthesized(false), 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-2xl font-bold text-emerald-900">光反应阶段 (类囊体膜)</h2>
           <p className="text-slate-600 text-sm">点击"发射光子"开始电子传递。注意观察下方类囊体腔中 <strong>H⁺ 浓度</strong> 的变化。</p>
        </div>
        <div className="flex gap-4">
             <button 
                onClick={startSimulation}
                disabled={isAnimating}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold shadow-sm transition-all ${isAnimating ? 'bg-slate-300 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900'}`}
             >
                <Sun size={20} />
                发射光子 (启动PSII)
             </button>
             <button 
                onClick={synthesizeATP}
                disabled={protons < 3}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold shadow-sm transition-all ${protons < 3 ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
             >
                <RotateCcw size={20} className={protons >= 3 ? "animate-spin-slow" : ""} />
                合成 ATP (现有H⁺: {protons})
             </button>
        </div>
      </div>

      {/* Main Visualization Container */}
      <div className="relative w-full h-96 bg-gradient-to-b from-blue-100 to-blue-200 rounded-xl overflow-hidden border-2 border-slate-300 shadow-inner select-none">
        
        {/* Stroma Label */}
        <div className="absolute top-4 left-4 font-bold text-slate-500 tracking-widest z-0">基质 (STROMA) [低 H⁺]</div>
        
        {/* Membrane */}
        <div className="absolute top-1/2 left-0 w-full h-14 bg-yellow-100 border-y-4 border-yellow-300 flex items-center justify-around px-10 z-10 shadow-sm">
           {/* Membrane texture */}
           <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #f59e0b 10px, #f59e0b 20px)'}}></div>
        </div>

        {/* Lumen Area (Bottom) - H+ Ion Visualization */}
        <div className="absolute bottom-0 left-0 w-full h-[calc(50%-28px)] bg-emerald-900/10 z-0 overflow-hidden">
            <div className="absolute bottom-4 left-4 font-bold text-emerald-700 tracking-widest bg-white/50 px-2 rounded">类囊体腔 (LUMEN) [高 H⁺]</div>
            
            {/* H+ Ions Particles */}
            {Array.from({ length: protons }).map((_, i) => (
                <div 
                    key={i}
                    className="absolute w-6 h-6 rounded-full bg-yellow-300 border border-yellow-500 flex items-center justify-center text-[10px] font-bold text-yellow-800 shadow-sm animate-float"
                    style={{
                        left: `${Math.min(95, Math.max(5, (i * 7 + 13) % 90))}%`,
                        top: `${Math.min(80, Math.max(20, (i * 11 + 7) % 80))}%`,
                        animationDelay: `${i * 0.2}s`,
                        transition: 'all 0.5s ease-out'
                    }}
                >
                    H⁺
                </div>
            ))}
            {protons === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-emerald-800/30 text-sm font-medium">
                    (暂无 H⁺ 积累，请发射光子)
                </div>
            )}
        </div>


        {/* Components on Membrane */}
        <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 flex justify-between px-16 items-center z-20 pointer-events-none">
            
            {/* PSII */}
            <div className="relative group pointer-events-auto">
                <div className={`w-16 h-20 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg border-b-4 border-green-800 transition-all ${electronPos === 0 && isAnimating ? 'ring-4 ring-yellow-400 brightness-110' : ''}`}>
                    PSII
                </div>
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-800 bg-white/80 px-1 rounded whitespace-nowrap">
                    H₂O → O₂ + 4H⁺
                </div>
            </div>

            {/* PQ / Cytochrome Complex */}
            <div className={`w-14 h-18 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg border-b-4 border-orange-700 transition-transform duration-500 ${electronPos === 2 ? 'scale-110 brightness-110' : ''}`}>
                Cyt b6f
                {/* Proton pumping animation */}
                {electronPos === 2 && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2">
                        <ArrowDown className="text-yellow-600 animate-bounce" size={20} />
                        <span className="text-xs font-bold text-yellow-700">H⁺</span>
                    </div>
                )}
            </div>

            {/* PSI */}
            <div className="relative pointer-events-auto">
                <div className={`w-16 h-20 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg border-b-4 border-green-700 transition-all ${electronPos === 4 ? 'ring-4 ring-yellow-400 brightness-110' : ''}`}>
                    PSI
                </div>
            </div>

             {/* NADP Reductase */}
             <div className={`w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-b-4 border-pink-700 transition-all ${electronPos === 6 ? 'animate-pulse scale-110' : ''}`}>
                FNR
                <div className="absolute -top-8 text-[10px] text-pink-700 font-bold w-24 text-center">
                    NADP⁺ → NADPH
                </div>
            </div>

            {/* ATP Synthase */}
            <div className={`relative w-20 h-28 bg-blue-600 rounded-t-full rounded-b-lg flex flex-col items-center justify-center text-white font-bold shadow-lg ml-8 cursor-pointer pointer-events-auto hover:bg-blue-500 transition-all border-b-4 border-blue-800 ${protons >= 3 ? 'animate-pulse ring-4 ring-blue-300' : ''}`} onClick={synthesizeATP}>
                <div className={`w-16 h-16 border-4 border-dashed border-white rounded-full flex items-center justify-center bg-blue-500 ${protons >= 3 || justSynthesized ? 'animate-spin-slow' : ''}`}>
                    ATP酶
                </div>
                {justSynthesized && (
                     <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-float z-50">
                        <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full border-2 border-yellow-200 shadow-xl font-bold text-sm whitespace-nowrap flex items-center gap-1">
                            <Zap size={14} fill="currentColor" /> +1 ATP
                        </div>
                     </div>
                )}
                <div className="absolute -bottom-12 w-36 text-center text-[10px] text-blue-900 font-bold bg-white/80 rounded px-1 py-0.5">
                    每3个H⁺驱动旋转
                </div>
                
                {/* H+ flowing through animation */}
                {justSynthesized && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 h-8 w-1 bg-yellow-300/50 animate-ping"></div>
                )}
            </div>
        </div>

        {/* Electron Path Animation */}
        {activePhoton && (
            <div className="absolute top-[48%] left-16 w-[70%] h-1 bg-yellow-300/30 z-10 pointer-events-none rounded-full">
                <div 
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow-[0_0_10px_yellow] transition-all duration-[1500ms] ease-linear"
                    style={{ 
                        left: `${
                            electronPos === 0 ? '0%' : 
                            electronPos === 1 ? '10%' :
                            electronPos === 2 ? '30%' : 
                            electronPos === 4 ? '60%' : 
                            electronPos === 5 ? '75%' : 
                            electronPos === 6 ? '85%' : '0%'
                        }`,
                        opacity: electronPos > 6 ? 0 : 1
                    }}
                >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-yellow-700">e⁻</span>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default LightReactionSim;