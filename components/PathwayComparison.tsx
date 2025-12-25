import React, { useState } from 'react';
import { Sun, Moon, Map, Thermometer, ArrowDown, X, Wind, ArrowRight } from 'lucide-react';

const PathwayComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'C3' | 'C4' | 'CAM'>('C3');

  const data = {
    C3: {
      name: "C3 植物",
      examples: "水稻, 小麦, 大豆",
      habitat: "温和湿润环境",
      mechanism: "CO₂ 直接进入叶肉细胞，被 Rubisco 固定形成 C3 化合物。",
      pros: "能量效率高 (消耗 ATP 少)。",
      cons: "高温强光下，Rubisco 易错误结合 O₂ 发生光呼吸 (Photorespiration)，消耗 ATP 和还原力却不产生糖，严重浪费能量。",
      color: "bg-green-100 border-green-300"
    },
    C4: {
      name: "C4 植物",
      examples: "玉米, 甘蔗, 高粱",
      habitat: "高温、强光热带环境",
      mechanism: "空间隔离：叶肉细胞 PEPC 固定 CO₂ (生成 C4) -> 维管束鞘细胞释放 CO₂ -> Rubisco。",
      pros: "消除光呼吸，强光下光合速率极高。",
      cons: "结构复杂，需要额外 ATP 泵送 C4 化合物。",
      color: "bg-orange-100 border-orange-300"
    },
    CAM: {
      name: "CAM 植物",
      examples: "仙人掌, 菠萝, 景天科",
      habitat: "极端干旱沙漠环境",
      mechanism: "时间隔离：夜间气孔打开固定 CO₂ (储存在液泡)；白天气孔关闭，释放 CO₂ 进行光合作用。",
      pros: "极度节水。",
      cons: "生长极其缓慢，储存的苹果酸有限。",
      color: "bg-yellow-100 border-yellow-300"
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">碳同化途径对比</h2>
        <p className="text-slate-600">植物为了适应不同的环境压力（水分、温度、光照），进化出了不同的固碳策略。</p>
      </div>

      <div className="flex justify-center gap-4">
        {(['C3', 'C4', 'CAM'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
              activeTab === type 
                ? 'bg-emerald-600 text-white shadow-lg scale-105' 
                : 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className={`p-8 rounded-2xl border-2 ${data[activeTab].color} transition-all duration-300`}>
         <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
                <div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-2">{data[activeTab].name}</h3>
                    <p className="text-slate-700 italic flex items-center gap-2">
                        <Map size={18} /> 典型环境: {data[activeTab].habitat}
                    </p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-lg">
                    <h4 className="font-bold text-slate-800 mb-2">核心机制</h4>
                    <p className="text-slate-700 leading-relaxed">{data[activeTab].mechanism}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-200/50 p-4 rounded-lg">
                        <h4 className="font-bold text-green-900 mb-1">优势</h4>
                        <p className="text-sm text-green-800">{data[activeTab].pros}</p>
                    </div>
                    <div className="bg-red-200/50 p-4 rounded-lg">
                        <h4 className="font-bold text-red-900 mb-1">劣势</h4>
                        <p className="text-sm text-red-800">{data[activeTab].cons}</p>
                    </div>
                </div>
                
                <div>
                    <span className="font-bold text-slate-700">代表植物: </span>
                    <span className="text-slate-600">{data[activeTab].examples}</span>
                </div>
            </div>

            {/* Visual Diagram Area */}
            <div className="flex-1 bg-white rounded-xl shadow-inner border border-slate-200 p-6 flex items-center justify-center min-h-[420px] relative overflow-hidden">
                {activeTab === 'C3' && (
                    <div className="text-center space-y-4">
                        <div className="w-32 h-32 bg-green-100 rounded-full border-4 border-green-500 flex items-center justify-center mx-auto relative">
                             <span className="font-bold text-green-800">叶肉细胞</span>
                             <div className="absolute -top-4 bg-white px-2 border rounded border-slate-200 text-sm">气孔</div>
                        </div>
                        <div className="text-sm text-slate-500 font-medium">CO₂ 直接 → Calvin Cycle</div>
                    </div>
                )}
                
                {activeTab === 'C4' && (
                    <div className="w-full h-full relative">
                         <style>{`
                            @keyframes c4-step1-entry {
                                0% { top: -10%; left: 25%; opacity: 0; transform: translate(-50%, 0); }
                                20% { opacity: 1; }
                                40% { top: 40%; left: 25%; opacity: 1; transform: translate(-50%, 0); }
                                45% { top: 40%; left: 25%; opacity: 0; transform: translate(-50%, 0) scale(0.5); }
                                100% { opacity: 0; }
                            }
                            @keyframes c4-step2-transport {
                                0% { opacity: 0; }
                                40% { top: 40%; left: 25%; opacity: 0; transform: translate(-50%, 0) scale(0.5); }
                                45% { top: 40%; left: 25%; opacity: 1; transform: translate(-50%, 0) scale(1); }
                                70% { top: 40%; left: 75%; opacity: 1; transform: translate(-50%, 0) scale(1); }
                                75% { top: 40%; left: 75%; opacity: 0; transform: translate(-50%, 0) scale(0.5); }
                                100% { opacity: 0; }
                            }
                            @keyframes c4-step3-release {
                                0% { opacity: 0; }
                                70% { top: 40%; left: 75%; opacity: 0; transform: translate(-50%, 0) scale(0); }
                                75% { top: 40%; left: 75%; opacity: 1; transform: translate(-50%, 0) scale(1); }
                                90% { top: 55%; left: 75%; opacity: 1; transform: translate(-50%, 0) scale(1); }
                                100% { top: 55%; left: 75%; opacity: 0; transform: translate(-50%, 0) scale(0); }
                            }
                        `}</style>
                        
                        {/* Background Structure */}
                        <div className="absolute inset-0 flex rounded-lg overflow-hidden border border-slate-200">
                             {/* Mesophyll */}
                             <div className="w-1/2 bg-green-50 p-4 border-r-2 border-dashed border-green-300 relative flex flex-col items-center">
                                 <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold mb-4">叶肉细胞</div>
                                 <div className="absolute top-2 left-2 text-[10px] text-slate-400">气孔</div>
                                 <div className="mt-12 w-20 h-20 rounded-full border-4 border-orange-200 bg-white flex flex-col items-center justify-center z-10">
                                     <span className="text-orange-600 font-bold">PEPC</span>
                                 </div>
                             </div>

                             {/* Bundle Sheath */}
                             <div className="w-1/2 bg-emerald-100 p-4 relative flex flex-col items-center">
                                 <div className="bg-emerald-200 text-emerald-900 px-2 py-1 rounded text-xs font-bold mb-4">维管束鞘细胞</div>
                                 <div className="mt-12 w-24 h-24 rounded-full border-4 border-emerald-500 border-dashed bg-white flex flex-col items-center justify-center z-10 animate-spin-slow">
                                 </div>
                                 <div className="absolute top-[120px] left-1/2 -translate-x-1/2 text-center z-20">
                                     <span className="text-emerald-700 font-bold block">Rubisco</span>
                                     <span className="text-[10px] text-slate-500">卡尔文循环</span>
                                 </div>
                             </div>
                        </div>

                        {/* Connection/Plasmodesmata */}
                        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-6 bg-white border-y border-green-300 z-0 flex items-center justify-center">
                             <span className="text-[8px] text-slate-400">胞间连丝</span>
                        </div>

                        {/* Animations */}
                        {/* 1. CO2 Entry */}
                        <div className="absolute z-20 w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center text-xs font-bold shadow-lg"
                             style={{ animation: 'c4-step1-entry 4s linear infinite' }}>
                            CO₂
                        </div>

                        {/* 2. C4 Transport */}
                        <div className="absolute z-20 w-10 h-10 rounded bg-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-lg border-2 border-orange-300"
                             style={{ animation: 'c4-step2-transport 4s linear infinite' }}>
                            C4
                        </div>

                        {/* 3. CO2 Release */}
                        <div className="absolute z-20 w-8 h-8 rounded-full bg-slate-600 text-white flex items-center justify-center text-xs font-bold shadow-lg ring-2 ring-emerald-300"
                             style={{ animation: 'c4-step3-release 4s linear infinite' }}>
                            CO₂
                        </div>

                        {/* Legend */}
                        <div className="absolute bottom-2 left-2 right-2 bg-white/80 p-2 rounded text-[10px] text-slate-600 flex justify-around">
                             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-500"></div> CO₂</div>
                             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-orange-500"></div> C4化合物</div>
                             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full border-dashed border-emerald-500"></div> 循环</div>
                        </div>
                    </div>
                )}
                
                {activeTab === 'CAM' && (
                    <div className="flex flex-col h-full w-full gap-4">
                        {/* Night Phase */}
                        <div className="flex-1 bg-slate-800 rounded-xl p-4 relative text-white border border-slate-700 shadow-sm">
                            <div className="absolute top-3 right-3 flex items-center gap-2 text-yellow-200 text-sm font-bold opacity-90 bg-slate-700 px-2 py-1 rounded-full border border-slate-600">
                                <Moon size={14} /> 夜间 (低温/高湿)
                            </div>
                            
                            <div className="flex items-center h-full gap-2 mt-4">
                                {/* Stomata Open */}
                                <div className="flex flex-col items-center w-1/4">
                                    <div className="text-xs text-green-300 mb-1 font-bold">气孔开放</div>
                                    <div className="w-14 h-8 border-4 border-green-500 rounded-full border-t-0 border-b-0 flex items-center justify-center relative bg-slate-900/50">
                                       <Wind className="text-blue-200 w-4 h-4 animate-pulse absolute -top-4" />
                                       <ArrowDown className="text-white w-4 h-4 animate-bounce mt-2" />
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-1">吸入 CO₂</div>
                                </div>
                                
                                {/* Process Flow */}
                                <div className="flex-1 flex items-center justify-center relative">
                                    <div className="absolute h-0.5 w-full bg-slate-600 top-1/2 -z-10"></div>
                                    
                                    <div className="flex flex-col items-center bg-slate-800 px-2 z-10">
                                        <div className="text-[10px] text-orange-300 mb-1">C4途径固定</div>
                                        <div className="w-10 h-10 rounded bg-orange-900/50 border border-orange-500 flex items-center justify-center text-[10px] font-bold text-orange-200 shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                                            PEPC
                                        </div>
                                    </div>
                                    
                                    <ArrowDown className="text-slate-500 -rotate-90 mx-1" size={16} />
                                    
                                    <div className="flex flex-col items-center bg-slate-800 px-2 z-10">
                                         <div className="text-[10px] text-blue-300 mb-1">储存</div>
                                         <div className="w-14 h-14 rounded-full border-2 border-dashed border-blue-400 bg-blue-900/30 flex flex-col items-center justify-center">
                                            <span className="text-[9px] text-blue-200">液泡</span>
                                            <span className="font-bold text-xs text-white">苹果酸</span>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Day Phase */}
                        <div className="flex-1 bg-yellow-50 rounded-xl p-4 relative text-slate-800 border border-yellow-200 shadow-sm">
                            <div className="absolute top-3 right-3 flex items-center gap-2 text-orange-600 text-sm font-bold opacity-90 bg-yellow-100 px-2 py-1 rounded-full border border-yellow-200">
                                <Sun size={14} /> 白天 (高温/干旱)
                            </div>
                             <div className="flex items-center h-full gap-2 mt-4">
                                {/* Stomata Closed */}
                                <div className="flex flex-col items-center w-1/4 opacity-75">
                                     <div className="text-xs text-green-700 mb-1 font-bold">气孔关闭</div>
                                     <div className="w-14 h-8 bg-green-200 border-2 border-green-600 rounded-full flex items-center justify-center relative">
                                       <X className="text-red-500 w-5 h-5" />
                                    </div>
                                    <div className="text-[10px] text-slate-500 mt-1">防止失水</div>
                                </div>

                                {/* Process Flow */}
                                <div className="flex-1 flex items-center justify-center relative">
                                     <div className="absolute h-0.5 w-full bg-yellow-200 top-1/2 -z-10"></div>
                                     
                                    <div className="flex flex-col items-center bg-yellow-50 px-2 z-10">
                                        <div className="text-[10px] text-blue-600 mb-1">释放</div>
                                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-blue-300 bg-blue-50 flex items-center justify-center">
                                            <span className="text-[9px] font-bold text-blue-800">苹果酸</span>
                                        </div>
                                    </div>

                                    <div className="mx-1 flex flex-col items-center">
                                        <span className="text-xs font-bold text-slate-600">→ CO₂ →</span>
                                    </div>

                                     <div className="flex flex-col items-center bg-yellow-50 px-2 z-10">
                                        <div className="text-[10px] text-green-700 mb-1">光合作用</div>
                                        <div className="w-14 h-14 rounded-lg bg-green-100 border-2 border-green-500 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
                                            <div className="absolute inset-0 bg-green-200 opacity-20 animate-pulse"></div>
                                            <span className="font-bold text-xs text-green-900 relative z-10">Calvin</span>
                                            <span className="text-[9px] text-green-700 relative z-10">循环</span>
                                            <Sun size={10} className="absolute top-1 right-1 text-orange-400 bg-white rounded-full z-10" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default PathwayComparison;