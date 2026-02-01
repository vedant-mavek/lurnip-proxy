import React from 'react';

interface HomeViewProps {
  userName: string;
  onContinueLesson: () => void;
  onShowResults: () => void;
  onShowAssignments: () => void;
  onShowAnnouncements: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ 
  userName, 
  onContinueLesson, 
  onShowResults, 
  onShowAssignments, 
  onShowAnnouncements 
}) => {
  return (
    <div className="space-y-24 lg:space-y-32 pb-40 max-w-5xl">
      {/* Welcome Stage */}
      <header className="space-y-6">
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 bg-[#D8FF5B] rounded-full shadow-[0_0_10px_#D8FF5B] animate-pulse" />
           <span className="text-[10px] font-black text-[#555555] uppercase tracking-[0.4em]">Node Active</span>
        </div>
        <h2 className="text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter leading-[0.85] text-white">
          Hello,<br/>{userName.split(' ')[0]}.
        </h2>
      </header>

      {/* Primary Directive */}
      <section className="space-y-12">
        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#444444] border-b border-white/5 pb-6">Current Priority</h3>

        <div 
          onClick={onContinueLesson}
          className="group cursor-pointer space-y-10"
        >
          <div className="space-y-4">
            <h4 className="text-4xl md:text-6xl font-black tracking-tighter group-hover:text-[#D8FF5B] transition-colors leading-none">Advanced Structure Analysis</h4>
            <p className="text-xl md:text-2xl text-[#888888] max-w-2xl font-medium tracking-tight leading-relaxed italic">"A technical synthesis of modern macro-economic models in the digital age."</p>
          </div>
          
          <button className="h-16 px-8 rounded-full border border-white/10 hover:border-[#D8FF5B]/30 hover:bg-[#D8FF5B]/5 flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all group-hover:translate-x-2">
             Resume Current Module
             <svg className="w-5 h-5 text-[#D8FF5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </section>

      {/* Sector Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
        <div onClick={onShowResults} className="cursor-pointer group space-y-6">
           <span className="text-[9px] font-black text-[#444444] uppercase tracking-[0.4em] group-hover:text-white transition-colors">Cumulative GPA</span>
           <div className="text-7xl font-black tracking-tighter leading-none">3.82</div>
           <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
             <div className="w-[92%] h-full bg-[#4B89FF] shadow-[0_0_15px_#4B89FF55]" />
           </div>
        </div>

        <div onClick={onShowAssignments} className="cursor-pointer group space-y-6">
           <span className="text-[9px] font-black text-[#444444] uppercase tracking-[0.4em] group-hover:text-white transition-colors">Tasks Due</span>
           <div className="text-7xl font-black tracking-tighter leading-none">03</div>
           <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-500/10 px-4 py-2 rounded-full w-fit">Priority: Critical</p>
        </div>

        <div onClick={onShowAnnouncements} className="cursor-pointer group space-y-6">
           <span className="text-[9px] font-black text-[#444444] uppercase tracking-[0.4em] group-hover:text-white transition-colors">Broadcasts</span>
           <div className="text-7xl font-black tracking-tighter text-[#D8FF5B] leading-none">08</div>
           <p className="text-[10px] font-black text-[#555555] uppercase tracking-widest">Unread System Logs</p>
        </div>
      </section>

      <footer className="pt-40 opacity-10 flex flex-col items-center gap-6">
        <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center opacity-30">
          <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
        </div>
        <p className="text-[11px] font-black uppercase tracking-[1.5em] text-center">Protocol Integrity 100%</p>
      </footer>
    </div>
  );
};

export default HomeView;