import React, { useState } from 'react';
import { Zap, Sun, ArrowUp, Circle, Atom, ArrowRight } from 'lucide-react';

interface OverviewProps {
  onChangeView: (view: any) => void;
}

const Overview: React.FC<OverviewProps> = ({ onChangeView }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "1. 光能吸收 (Absorption)",
      description: "光子(Photon)撞击类囊体膜上的天线色素分子（如叶绿素b、类胡萝卜素）。能量被色素吸收，电子被激发。",
    },
    {
      title: "2. 能量传递 (Transfer)",
      description: "激发能通过共振能量传递（Resonance Energy Transfer）在色素分子间跳跃，最终汇聚到反应中心。",
    },
    {
      title: "3. 原初反应 (Separation)",
      description: "反应中心叶绿素a (P680) 接收能量后，发射高能电子(e-)。光能转化为电能，实现了电荷分离。",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
        <h1 className="text-3xl font-bold text-emerald-900 mb-4">光合作用：生命的引擎</h1>
        <p className="text-slate-600 leading-relaxed">
          光合作用主要分为两个阶段：<strong>光反应</strong>和<strong>暗反应</strong>。
          而一切的开始，是<strong>原初反应</strong>——将光能转化为电能的关键步骤。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Zap className="text-yellow-500" />
            原初反应交互演示
          </h3>
          
          <div className="bg-slate-900 rounded-xl p-8 h-80 relative overflow-hidden flex flex-col items-center justify-center border-2 border-slate-700 shadow-inner group select-none">
             <style>{`
                @keyframes photon-in {
                    0% { transform: translate(-150px, -150px) scale(0.5); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translate(-40px, 40px) scale(1); opacity: 1; }
                }
                @keyframes energy-hop {
                    0% { transform: scale(1); filter: brightness(1); }
                    50% { transform: scale(1.3); filter: brightness(2); box-shadow: 0 0 15px #fbbf24; }
                    100% { transform: scale(1); filter: brightness(1); }
                }
                @keyframes electron-shoot {
                    0% { bottom: 50%; opacity: 1; transform: scale(1) translateX(-50%); }
                    100% { bottom: 80%; opacity: 0; transform: scale(1.5) translateX(-50%); } 
                }
             `}</style>
             
             {/* Background */}
             <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-950 opacity-90"></div>

             {/* Primary Electron Acceptor */}
             <div className={`absolute top-6 left-1/2 -translate-x-1/2 w-32 h-14 border-2 border-dashed border-blue-400 rounded-lg flex flex-col items-center justify-center text-blue-200 text-xs font-bold transition-all duration-500 z-10 ${step === 2 ? 'bg-blue-500/30 border-solid scale-105 shadow-[0_0_20px_rgba(59,130,246,0.6)]' : 'bg-transparent'}`}>
                <span>电子受体</span>
                {step === 2 && (
                    <div className="flex items-center gap-1 text-[10px] text-blue-100 mt-1">
                        <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
                        已还原
                    </div>
                )}
             </div>

             {/* Pigment Cluster */}
             <div className="relative w-full h-full flex items-center justify-center pt-12">
                
                {/* Connecting Lines */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <svg width="100%" height="100%">
                        <line x1="30%" y1="75%" x2="50%" y2="65%" stroke="white" strokeWidth="2" />
                        <line x1="70%" y1="75%" x2="50%" y2="65%" stroke="white" strokeWidth="2" />
                        <line x1="50%" y1="85%" x2="50%" y2="65%" stroke="white" strokeWidth="2" />
                    </svg>
                </div>

                {/* Reaction Center P680 */}
                <div className={`absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 flex items-center justify-center z-20 transition-all duration-700 ${step === 2 ? 'bg-red-900 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 'bg-emerald-800 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'} ${step === 1 ? 'animate-[energy-hop_0.8s_ease-in-out_0.9s]' : ''}`}>
                    <div className="text-center">
                        <span className={`block text-xl font-bold ${step === 2 ? 'text-red-200' : 'text-emerald-100'}`}>P680</span>
                        {step === 2 && <span className="text-[10px] text-red-300 font-bold block">P680⁺</span>}
                    </div>

                    {/* Ejected Electron */}
                    {step === 2 && (
                        <div className="absolute w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-[0_0_15px_yellow] z-30"
                             style={{ animation: 'electron-shoot 1.5s cubic-bezier(0.1, 0.7, 1.0, 0.1) forwards', bottom: '50%', left: '50%' }}>
                             <span className="text-xs font-bold text-black">e⁻</span>
                        </div>
                    )}
                </div>

                {/* Antenna Pigments */}
                <div className={`absolute left-[20%] bottom-[15%] w-14 h-14 rounded-full bg-green-700 border-2 border-green-500 flex flex-col items-center justify-center pigment z-10 ${step === 0 ? 'ring-4 ring-yellow-300/50' : ''} ${step === 1 ? 'animate-[energy-hop_0.8s_ease-in-out]' : ''}`}>
                    <Circle className="text-green-300 opacity-60" size={24} />
                    <span className="text-[8px] text-green-200 mt-1">色素</span>
                </div>
                
                <div className={`absolute right-[20%] bottom-[15%] w-14 h-14 rounded-full bg-green-700 border-2 border-green-500 flex items-center justify-center pigment z-10 ${step === 1 ? 'animate-[energy-hop_0.8s_ease-in-out_0.3s]' : ''}`}>
                     <Circle className="text-green-300 opacity-60" size={24} />
                </div>

                <div className={`absolute bottom-[5%] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-green-700 border-2 border-green-500 flex items-center justify-center pigment z-10 ${step === 1 ? 'animate-[energy-hop_0.8s_ease-in-out_0.6s]' : ''}`}>
                     <Circle className="text-green-300 opacity-60" size={24} />
                </div>
             </div>

             {/* Photon Animation (Step 0) */}
             {step === 0 && (
                <div className="absolute top-10 left-10 pointer-events-none z-30" style={{ animation: 'photon-in 1s ease-out forwards' }}>
                    <Sun className="w-12 h-12 text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,1)] animate-spin-slow" />
                    <div className="text-center mt-1">
                        <span className="text-[10px] text-black font-bold bg-yellow-400 px-2 py-0.5 rounded-full">光子</span>
                    </div>
                </div>
             )}
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-50 font-medium text-slate-700 transition-colors"
            >
              上一步
            </button>
            <button 
              onClick={() => setStep(Math.min(2, step + 1))}
              disabled={step === 2}
              className="flex-1 px-4 py-2 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {step < 2 ? (
                  <>下一步 <ArrowRight size={16} /></>
              ) : '演示完成'}
            </button>
            {step === 2 && (
                <button 
                    onClick={() => setStep(0)}
                    className="px-4 py-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium transition-colors"
                >
                    重置
                </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="flex-1">
                <h4 className="font-bold text-xl mb-4 text-emerald-800 border-b pb-2">{steps[step].title}</h4>
                <p className="text-slate-600 text-lg leading-relaxed">{steps[step].description}</p>
            </div>
            
            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                 <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <Atom size={18}/> 关键知识点
                 </h4>
                 <ul className="list-disc list-inside text-sm text-blue-800 space-y-2">
                   {step === 0 && <li>色素分子主要吸收红光和蓝紫光。</li>}
                   {step === 0 && <li>绿光被反射，所以植物呈现绿色。</li>}
                   {step === 1 && <li>能量传递效率极高（&gt;95%）。</li>}
                   {step === 1 && <li>这仅仅是能量的物理转移，没有电子得失。</li>}
                   {step === 2 && <li><strong>这是光反应的起点</strong>。</li>}
                   {step === 2 && <li>P680+ 是生物界最强的氧化剂之一，它随后会从水中夺取电子（水的光解）。</li>}
                 </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;