import React, { useState } from 'react';
import { Leaf, Sun, Moon, GitCompare, MessageCircle, BookOpen } from 'lucide-react';
import LightReactionSim from './components/LightReactionSim';
import DarkReactionSim from './components/DarkReactionSim';
import PathwayComparison from './components/PathwayComparison';
import AITutor from './components/AITutor';
import Overview from './components/Overview';

enum ViewState {
  OVERVIEW = 'overview',
  LIGHT_REACTION = 'light',
  DARK_REACTION = 'dark',
  COMPARISON = 'comparison',
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.OVERVIEW);
  const [showChat, setShowChat] = useState(false);

  // Global state for simulation connections (simplified)
  // In a full app, ATP/NADPH produced in Light could fuel Dark reaction
  const [atpPool, setAtpPool] = useState(0);
  const [nadphPool, setNadphPool] = useState(0);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.OVERVIEW:
        return <Overview onChangeView={setCurrentView} />;
      case ViewState.LIGHT_REACTION:
        return (
          <LightReactionSim 
            atpPool={atpPool} 
            setAtpPool={setAtpPool}
            nadphPool={nadphPool}
            setNadphPool={setNadphPool}
          />
        );
      case ViewState.DARK_REACTION:
        return (
          <DarkReactionSim 
            atpPool={atpPool} 
            setAtpPool={setAtpPool}
            nadphPool={nadphPool}
            setNadphPool={setNadphPool}
          />
        );
      case ViewState.COMPARISON:
        return <PathwayComparison />;
      default:
        return <Overview onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar Navigation */}
      <nav className="w-20 md:w-64 bg-emerald-900 text-white flex-shrink-0 flex flex-col justify-between">
        <div>
          <div className="p-4 md:p-6 flex items-center justify-center md:justify-start gap-3 font-bold text-xl border-b border-emerald-800">
            <Leaf className="w-8 h-8 text-emerald-300" />
            <span className="hidden md:inline">光合实验室</span>
          </div>
          
          <div className="flex flex-col gap-2 p-2 mt-4">
            <NavButton 
              active={currentView === ViewState.OVERVIEW} 
              onClick={() => setCurrentView(ViewState.OVERVIEW)}
              icon={<BookOpen size={20} />}
              label="总览与原初反应"
            />
            <NavButton 
              active={currentView === ViewState.LIGHT_REACTION} 
              onClick={() => setCurrentView(ViewState.LIGHT_REACTION)}
              icon={<Sun size={20} />}
              label="光反应阶段"
            />
            <NavButton 
              active={currentView === ViewState.DARK_REACTION} 
              onClick={() => setCurrentView(ViewState.DARK_REACTION)}
              icon={<Moon size={20} />}
              label="暗反应 (卡尔文循环)"
            />
            <NavButton 
              active={currentView === ViewState.COMPARISON} 
              onClick={() => setCurrentView(ViewState.COMPARISON)}
              icon={<GitCompare size={20} />}
              label="C3 / C4 / CAM 途径"
            />
          </div>
        </div>

        <div className="p-4 border-t border-emerald-800">
          <button 
            onClick={() => setShowChat(!showChat)}
            className={`w-full flex items-center justify-center md:justify-start gap-3 p-3 rounded-lg transition-colors ${showChat ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-800 text-emerald-100'}`}
          >
            <MessageCircle size={20} />
            <span className="hidden md:inline">{showChat ? '隐藏AI导师' : '向AI导师提问'}</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 shadow-sm z-10">
          <h2 className="text-xl font-semibold text-slate-800">
            {currentView === ViewState.OVERVIEW && "光合作用总览 & 原初反应"}
            {currentView === ViewState.LIGHT_REACTION && "光反应：电子传递链与光合磷酸化"}
            {currentView === ViewState.DARK_REACTION && "暗反应：卡尔文循环"}
            {currentView === ViewState.COMPARISON && "碳同化途径对比：C3 vs C4 vs CAM"}
          </h2>
          <div className="ml-auto flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              ATP池: {atpPool}
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              NADPH池: {nadphPool}
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-6 relative">
          {renderContent()}
        </div>

        {/* AI Tutor Slide-over */}
        {showChat && (
          <div className="absolute top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl border-l border-slate-200 z-50 transform transition-transform duration-300">
            <AITutor onClose={() => setShowChat(false)} context={currentView} />
          </div>
        )}
      </main>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-center md:justify-start gap-3 p-3 rounded-lg transition-all ${
      active 
        ? 'bg-emerald-100 text-emerald-900 font-medium' 
        : 'text-emerald-100 hover:bg-emerald-800'
    }`}
  >
    {icon}
    <span className="hidden md:inline">{label}</span>
  </button>
);

export default App;