import React, { useState, useEffect } from 'react';
import { Sun, Droplets, Zap, ArrowRight, RotateCcw } from 'lucide-react';

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
      setProtons(p => p + 2); // Build gradient
    }, 1500);

    // Step 2: PQ -> Cyt -> PC
    setTimeout(() => {
        setElectronPos(2);
        setProtons(p => p + 1); // Pump more protons
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
           <p className="text-slate-600 text-sm">点击"发射光子"开始电子传递。积累质子(H+)后点击ATP合酶生成ATP。</p>
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
                合成 ATP ({Math.floor(protons/3)}次可用)
             </button>
        </div>
      </div>

      {/* Main Visualization Container */}
      <div className="relative w-full h-96 bg-gradient-to-b from-blue-100 to-blue-200 rounded-xl overflow-hidden border-2 border-slate-300 shadow-inner">
        
        {/* Stroma Label */}
        <div className="absolute top-4 left-4 font-bold text-slate-500 tracking-widest">基质 (STROMA) [低 H+]</div>
        
        {/* Membrane */}
        <div className="absolute top-1/2 left-0 w-full h-12 bg-yellow-100 border-y-4 border-yellow-300 flex items-center justify-around px-10 z-10">
           {/* Thylakoid Membrane proteins would go here visually */}
        </div>

        {/* Lumen Label */}
        <div className="absolute bottom-4 left-4 font-bold text-emerald-700 tracking-widest">类囊体腔 (LUMEN) [高 H+]</div>


        {/* Components on Membrane */}
        <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 flex justify-between px-16 items-center z-20">
            
            {/* PSII */}
            <div className="relative group">
                <div className={`w-16 h-20 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg ${electronPos === 0 && isAnimating ? 'ring-4 ring-yellow-400' : ''}`}>
                    PSII
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-800">H₂O→O₂+H⁺</div>
            </div>

            {/* PQ / Cytochrome Complex */}
            <div className={`w-12 h-16 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg ${electronPos === 2 ? 'scale-110' : ''}`}>
                Cyt b6f
            </div>

            {/* PSI */}
            <div className="relative">
                <div className={`w-16 h-20 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg ${electronPos === 4 ? 'ring-4 ring-yellow-400' : ''}`}>
                    PSI
                </div>
                 {/* Second photon hit needed for PSI theoretically, simplifying here */}
            </div>

             {/* NADP Reductase */}
             <div className={`w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ${electronPos === 6 ? 'animate-pulse' : ''}`}>
                FNR
            </div>

            {/* ATP Synthase */}
            <div className={`relative w-20 h-24 bg-blue-600 rounded-t-full rounded-b-lg flex flex-col items-center justify-center text-white font-bold shadow-lg ml-8 cursor-pointer hover:bg-blue-700 transition-colors ${protons >= 3 ? 'animate-pulse ring-4 ring-blue-300' : ''}`} onClick={synthesizeATP}>
                <div className={`w-16 h-16 border-4 border-dashed border-white rounded-full flex items-center justify-center ${protons >= 3 || justSynthesized ? 'animate-spin-slow' : ''}`}>
                    ATP酶
                </div>
                {justSynthesized && (
                     <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-float">
                        <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg border border-yellow-200 shadow-lg font-bold text-sm whitespace-nowrap">
                            +1 ATP
                        </div>
                     </div>
                )}
                <div className="absolute -bottom-10 w-32 text-center text-[10px] text-blue-800 font-bold bg-white/50 rounded px-1">
                    每3个H⁺驱动旋转<br/>生成1个ATP
                </div>
            </div>
        </div>

        {/* Dynamic Electron */}
        {isAnimating && (
          <div 
            className="absolute z-30 w-4 h-4 bg-yellow-300 rounded-full shadow-[0_0_10px_yellow] transition-all duration-1000 ease-linear"
            style={{
                top: '48%',
                left: electronPos === 0 ? '10%' : 
                      electronPos === 1 ? '20%' :
                      electronPos === 2 ? '30%' :
                      electronPos === 3 ? '45%' :
                      electronPos === 4 ? '55%' :
                      electronPos === 5 ? '65%' : '75%'
            }}
          >
            <span className="absolute -top-4 left-0 text-xs font-bold">e-</span>
          </div>
        )}

        {/* Protons (H+) Visualization */}
        <div className="absolute bottom-10 left-0 w-full flex justify-center gap-2 flex-wrap px-10">
            {[...Array(protons)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-red-500 rounded-full animate-bounce shadow-sm text-[8px] flex items-center justify-center text-white font-bold">H+</div>
            ))}
            {protons === 0 && <span className="text-emerald-700 opacity-50 text-sm">无质子积累 (请点击发射光子)</span>}
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
         <div className="bg-white p-4 rounded-lg border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">1. 水的光解</h4>
            <p className="text-slate-600">PSII 夺取水的电子，产生氧气和 H+。这是地球氧气的主要来源。</p>
         </div>
         <div className="bg-white p-4 rounded-lg border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">2. 电子传递与质子泵</h4>
            <p className="text-slate-600">电子流经 Cyt b6f 复合体时，将 H+ 从基质泵入类囊体腔，建立跨膜质子梯度。</p>
         </div>
         <div className="bg-white p-4 rounded-lg border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">3. 光合磷酸化</h4>
            <p className="text-slate-600">H+ 顺浓度梯度穿过 ATP 合酶，驱动其旋转，催化 ADP+Pi 合成 ATP。</p>
         </div>
      </div>
    </div>
  );
};

export default LightReactionSim;