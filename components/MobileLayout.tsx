import React, { ReactNode } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

interface MobileLayoutProps {
  navItems: NavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
  userName?: string;
  onLogout?: () => void;
  children: ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  navItems, 
  activeId, 
  onNavigate, 
  userName, 
  onLogout,
  children 
}) => {
  return (
    <div className="flex h-screen bg-black text-white selection:bg-[#D8FF5B] selection:text-black overflow-hidden font-sans">
      {/* Refined Navigation Rail (Desktop) */}
      <aside className="hidden lg:flex w-72 flex-col bg-[#050505] border-r border-white/[0.05] p-10 shrink-0">
        <div className="mb-20 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#D8FF5B] rounded-[10px] shadow-[0_0_20px_rgba(216,255,91,0.2)]"></div>
          <span className="text-2xl font-black tracking-tighter">Lurnip.</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-6 py-4 rounded-2xl transition-all duration-300 group ${
                activeId === item.id 
                  ? 'bg-white/[0.03] text-[#D8FF5B]' 
                  : 'text-[#444444] hover:text-white hover:bg-white/[0.01]'
              }`}
            >
              <span className={`mr-4 transition-colors ${activeId === item.id ? 'text-[#D8FF5B]' : 'text-[#222222] group-hover:text-white'}`}>
                {React.cloneElement(item.icon as React.ReactElement<any>, { 
                  className: `w-5 h-5 ${activeId === item.id ? 'stroke-[2.5px]' : 'stroke-[2px]'}` 
                })}
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
           <button 
             onClick={onLogout}
             className="flex flex-col items-start gap-1 group w-full text-left"
           >
             <span className="text-[8px] font-black text-[#222222] uppercase tracking-[0.3em] group-hover:text-rose-500 transition-colors">Session Terminal</span>
             <span className="text-sm font-black text-white truncate w-full tracking-tighter">{userName}</span>
           </button>
        </div>
      </aside>

      {/* Primary Workspace */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-black">
        {/* Mobile Header (Floating style) */}
        <header className="lg:hidden flex items-center justify-between px-8 py-5 border-b border-white/5 bg-black/90 backdrop-blur-3xl sticky top-0 z-[100] h-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#D8FF5B] rounded-md shadow-[0_0_10px_rgba(216,255,91,0.1)]"></div>
            <span className="text-xl font-black tracking-tighter uppercase">Lurnip</span>
          </div>
          <button 
            onClick={onLogout} 
            className="text-[10px] font-black uppercase tracking-[0.2em] text-[#555555] hover:text-white transition-all active:scale-90"
          >
            Term.
          </button>
        </header>

        {/* Content Container - pt-24 ensures it clears the 80px header on mobile */}
        <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 sm:px-12 pt-24 pb-8 sm:py-20 sm:pb-40 animate-finish">
          {children}
        </div>

        {/* Mobile Navigation Dock */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[420px] px-6 z-[100]">
          <nav className="h-[72px] w-full bg-[#0A0A0A]/95 backdrop-blur-3xl border border-white/10 rounded-[36px] flex items-center justify-between px-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-12 h-12 rounded-[14px] flex items-center justify-center transition-all duration-500 relative ${
                  activeId === item.id 
                    ? 'bg-[#D8FF5B] text-black shadow-[0_0_15px_#D8FF5B]' 
                    : 'text-[#333333] hover:text-[#777777]'
                }`}
              >
                {React.cloneElement(item.icon as React.ReactElement<any>, { 
                  className: "w-5 h-5 stroke-[2.5px]" 
                })}
              </button>
            ))}
          </nav>
        </div>
      </main>
    </div>
  );
};

export default MobileLayout;