
import React, { ReactNode } from 'react';

interface SidebarItem {
  id: string;
  label: string;
  icon: ReactNode;
}

interface LayoutProps {
  sidebarItems: SidebarItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
  userName?: string;
  userRole?: string;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ 
  sidebarItems, 
  activeItem, 
  onItemClick, 
  userName, 
  userRole, 
  children 
}) => {
  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Sidebar - Desktop Only */}
      <aside className="w-80 bg-[#111111] border-r border-white/5 flex flex-col flex-shrink-0 p-10">
        <div className="mb-16 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#D7FF5A] rounded-lg"></div>
          <h1 className="text-3xl font-extrabold text-white tracking-tighter">Lurnip.</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`w-full flex items-center px-8 py-5 text-lg font-bold rounded-[2rem] transition-all duration-300 ${
                activeItem === item.id
                  ? 'bg-white text-black shadow-2xl shadow-white/5'
                  : 'text-[#666666] hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="mr-5 shrink-0 transition-transform group-active:scale-90">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-6">
          <div className="p-6 rounded-[2.5rem] bg-black border border-white/5 flex items-center gap-5">
            <div className="w-14 h-14 bg-[#222222] border border-white/10 rounded-2xl flex items-center justify-center font-extrabold text-[#D7FF5A] text-xl shadow-inner">
              {userName?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-base font-extrabold text-white truncate">{userName}</p>
              <p className="text-[10px] text-[#444444] font-black uppercase tracking-widest">{userRole}</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full flex items-center justify-center px-6 py-5 text-sm font-black text-[#FF3AD3] bg-[#FF3AD3]/5 rounded-[2rem] border border-[#FF3AD3]/10 hover:bg-[#FF3AD3]/10 transition-colors uppercase tracking-widest"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative no-scrollbar">
        <div className="max-w-7xl mx-auto p-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;