import React, { useState } from 'react';
import { RefreshCw, ArrowDown, Package, Zap, AlertCircle } from 'lucide-react';

interface DarkReactionProps {
  atpPool: number;
  setAtpPool: React.Dispatch<React.SetStateAction<number>>;
  nadphPool: number;
  setNadphPool: React.Dispatch<React.SetStateAction<number>>;
}

const DarkReactionSim: React.FC<DarkReactionProps> = ({ atpPool, setAtpPool, nadphPool, setNadphPool }) => {
  const [cycleStage, setCycleStage] = useState(0); // 0: Fixation, 1: Reduction, 2: Regeneration
  const [sugarProduced, setSugarProduced] = useState(0);
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Stoichiometry settings (Simplified for gameplay)
  const COST_REDUCTION_ATP = 1;
  const COST_REDUCTION_NADPH = 1;
  const COST_REGENERATION_ATP = 1;

  const canRunReduction = atpPool >= COST_REDUCTION_ATP && nadphPool >= COST_REDUCTION_NADPH;
  const canRunRegeneration = atpPool >= COST_REGENERATION_ATP;

  const triggerFeedback = (msg: string) => {
    setLastAction(msg);
    setTimeout(() => setLastAction(null), 2000);
  };

  const handleFixation = () => {
      setCycleStage(1);
  };

  const handleReduction = () => {
      if (canRunReduction) {
          // Deduct resources from parent state
          setAtpPool(prev => prev - COST_REDUCTION_ATP);
          setNadphPool(prev => prev - COST_REDUCTION_NADPH);
          
          setCycleStage(2);
          setSugarProduced(s => s + 0.5); // Simplified sugar logic
          triggerFeedback(`消耗 ${COST_REDUCTION_ATP} ATP, ${COST_REDUCTION_NADPH} NADPH`);
      }
  };

  const handleRegeneration = () => {
      if (canRunRegeneration) {
          // Deduct resources from parent state
          setAtpPool(prev => prev - COST_REGENERATION_ATP);
          
          setCycleStage(0);
          triggerFeedback(`消耗 ${COST_REGENERATION_ATP} ATP`);
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-emerald-900">暗反应 (卡尔文循环)</h2>
           <p className="text-slate-600 text-sm">在叶绿体基质中进行。需要消耗光反应产生的 ATP 和 NADPH。</p>
        </div>
        <div className="flex items-center gap-4">
             {lastAction && (
                 <div className="animate-float text-sm font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                     {lastAction}
                 </div>
             )}
            <div className="bg-emerald-100 px-4 py-2 rounded-lg text-emerald-800 font-bold flex items-center gap-2 shadow-sm">
                <Package size={20} />
                已产生糖类(G3P当量): {sugarProduced}
            </div>
        </div>
      </div>

      <div className="relative h-[500px] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        {/* Central Cycle Diagram */}
        <div className="relative w-80 h-80 rounded-full border-4 border-emerald-100 flex items-center justify-center bg-white shadow-sm z-10">
            
            {/* Arrows */}
            <div className={`absolute top-0 w-full h-full rounded-full border-t-8 border-r-8 border-transparent transition-all duration-700 ease-in-out ${cycleStage === 0 ? 'border-t-emerald-500 rotate-0' : cycleStage === 1 ? 'border-r-emerald-500 rotate-90' : 'border-b-emerald-500 rotate-180'}`}></div>

            <div className="text-center p-4">
                <RefreshCw className={`w-12 h-12 mx-auto mb-2 text-emerald-600 ${cycleStage !== 0 ? 'animate-spin-slow' : ''}`} />
                <h3 className="text-xl font-bold text-slate-700">RuBP</h3>
                <p className="text-xs text-slate-500">(五碳化合物)</p>
            </div>
        </div>

        {/* Stage 1: Fixation */}
        <div className={`absolute top-8 transform -translate-x-1/2 left-1/2 text-center transition-all duration-500 z-20 ${cycleStage === 0 ? 'opacity-100 scale-100' : 'opacity-40 scale-90 blur-[1px]'}`}>
             <div className={`bg-white p-4 rounded-xl shadow-lg border-2 ${cycleStage === 0 ? 'border-emerald-500 ring-4 ring-emerald-50' : 'border-slate-200'}`}>
                <h4 className="font-bold text-emerald-700 flex items-center justify-center gap-2">
                    1. 碳固定 (CO₂ 固定)
                </h4>
                <p className="text-xs mt-1 text-slate-500">CO₂ + RuBP → 2 × 3-PGA</p>
                <div className="mt-2 text-xs font-mono bg-slate-100 p-1 rounded inline-block text-slate-600">酶: Rubisco</div>
                <button 
                    onClick={handleFixation}
                    disabled={cycleStage !== 0}
                    className="mt-3 w-full bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 disabled:bg-slate-300 transition-colors shadow-md active:transform active:scale-95"
                >
                    执行固定
                </button>
             </div>
        </div>

        {/* Stage 2: Reduction */}
        <div className={`absolute bottom-20 right-8 w-64 text-center transition-all duration-500 z-20 ${cycleStage === 1 ? 'opacity-100 scale-100' : 'opacity-40 scale-90 blur-[1px]'}`}>
             <div className={`bg-white p-4 rounded-xl shadow-lg border-2 ${cycleStage === 1 ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-200'}`}>
                <h4 className="font-bold text-blue-700 flex items-center justify-center gap-2">
                    <Zap size={16} /> 2. 还原
                </h4>
                <p className="text-xs mt-1 text-slate-500">3-PGA → G3P (糖)</p>
                
                <div className="mt-3 space-y-1">
                    <div className={`flex justify-between text-xs font-bold px-2 py-1 rounded ${atpPool >= COST_REDUCTION_ATP ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        <span>ATP</span>
                        <span>{atpPool} / {COST_REDUCTION_ATP}</span>
                    </div>
                    <div className={`flex justify-between text-xs font-bold px-2 py-1 rounded ${nadphPool >= COST_REDUCTION_NADPH ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                        <span>NADPH</span>
                        <span>{nadphPool} / {COST_REDUCTION_NADPH}</span>
                    </div>
                </div>

                <button 
                    onClick={handleReduction}
                    disabled={cycleStage !== 1 || !canRunReduction}
                    className={`mt-3 w-full px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md active:transform active:scale-95 ${
                        canRunReduction 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                >
                    {canRunReduction ? '注入能量 (还原)' : '能量不足'}
                </button>
             </div>
        </div>

        {/* Stage 3: Regeneration */}
        <div className={`absolute bottom-20 left-8 w-64 text-center transition-all duration-500 z-20 ${cycleStage === 2 ? 'opacity-100 scale-100' : 'opacity-40 scale-90 blur-[1px]'}`}>
             <div className={`bg-white p-4 rounded-xl shadow-lg border-2 ${cycleStage === 2 ? 'border-yellow-500 ring-4 ring-yellow-50' : 'border-slate-200'}`}>
                <h4 className="font-bold text-yellow-700 flex items-center justify-center gap-2">
                    <RefreshCw size={16} /> 3. RuBP 再生
                </h4>
                <p className="text-xs mt-1 text-slate-500">G3P → RuBP</p>
                
                <div className="mt-3">
                    <div className={`flex justify-between text-xs font-bold px-2 py-1 rounded ${atpPool >= COST_REGENERATION_ATP ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        <span>ATP</span>
                        <span>{atpPool} / {COST_REGENERATION_ATP}</span>
                    </div>
                </div>

                <button 
                    onClick={handleRegeneration}
                    disabled={cycleStage !== 2 || !canRunRegeneration}
                    className={`mt-3 w-full px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md active:transform active:scale-95 ${
                        canRunRegeneration 
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                >
                    {canRunRegeneration ? '再生受体' : 'ATP 不足'}
                </button>
             </div>
        </div>

      </div>
      
      {/* Global Warnings */}
      {cycleStage === 1 && !canRunReduction && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 animate-pulse">
            <AlertCircle />
            <span className="font-bold">警告：光反应产物不足！</span>
            <span className="text-sm">请切换到【光反应阶段】合成更多 ATP 和 NADPH。</span>
        </div>
      )}
      {cycleStage === 2 && !canRunRegeneration && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 animate-pulse">
            <AlertCircle />
            <span className="font-bold">警告：ATP 不足！</span>
            <span className="text-sm">再生 RuBP 需要消耗 ATP。请返回光反应阶段。</span>
        </div>
      )}
    </div>
  );
};

export default DarkReactionSim;