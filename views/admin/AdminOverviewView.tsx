import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';

interface AdminOverviewViewProps {
  onNavigate: (id: string) => void;
  onOpenNotifications: () => void;
  unreadCount: number;
}

const AdminOverviewView: React.FC<AdminOverviewViewProps> = ({ onNavigate, onOpenNotifications, unreadCount }) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const { data } = await adminService.getAttendanceOverview();
      if (data) setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-[#D8FF5B]/10 border-t-[#D8FF5B] rounded-full animate-spin mb-6" />
        <span className="text-[10px] font-black text-[#555555] uppercase tracking-[0.4em]">Establishing Sync...</span>
      </div>
    );
  }

  return (
    <div className="space-y-16 animate-in fade-in duration-700 pt-4">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-2.5 h-2.5 bg-[#D8FF5B] rounded-full animate-pulse shadow-[0_0_15px_#D8FF5B]" />
             <span className="text-[10px] font-black text-[#D8FF5B] uppercase tracking-[0.5em]">SYSTEM: ACTIVE</span>
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase break-words">
            Operations.
          </h2>
          <p className="text-[#888888] font-medium text-xl md:text-2xl mt-6 tracking-tight max-w-lg leading-snug">Global institutional visibility and autonomous monitoring.</p>
        </div>
        <button 
          onClick={onOpenNotifications}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-[#111111] border border-white/10 rounded-[28px] sm:rounded-[32px] flex items-center justify-center text-white relative active:scale-95 transition-all shadow-2xl hover:border-[#D8FF5B]/20 group shrink-0 self-start lg:self-center"
        >
           <svg className="w-6 h-6 sm:w-8 sm:h-8 group-hover:text-[#D8FF5B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
           {unreadCount > 0 && (
             <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-[#FF3FD3] rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-black text-white border-4 border-black">
               {unreadCount}
             </div>
           )}
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          onClick={() => onNavigate('attendance')}
          className="bg-[#0C0C0C] border border-white/5 rounded-[56px] p-10 sm:p-12 flex flex-col justify-between aspect-square group cursor-pointer hover:border-[#D8FF5B]/20 transition-all shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#D8FF5B]/5 blur-[80px] rounded-full group-hover:bg-[#D8FF5B]/10 transition-all" />
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[22px] sm:rounded-[24px] bg-[#D8FF5B]/10 flex items-center justify-center text-[#D8FF5B] mb-8 relative z-10 group-hover:scale-110 transition-transform">
             <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div className="relative z-10">
            <span className="text-[10px] font-black text-[#555555] uppercase tracking-[0.4em] block mb-4">Daily Conduction</span>
            <div className="flex items-baseline gap-4">
              <div className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-none">{stats?.todaySessions}</div>
              <div className="text-lg sm:text-xl font-bold text-[#444444] uppercase tracking-widest">Slots</div>
            </div>
            <div className="flex gap-6 mt-8">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{stats?.conducted} SYNCED</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_10px_#f43f5e]" />
                  <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest">{stats?.missed} VOID</span>
               </div>
            </div>
          </div>
        </div>

        <div 
          onClick={() => onNavigate('attendance')}
          className="bg-[#0C0C0C] border border-white/5 rounded-[56px] p-10 sm:p-12 flex flex-col justify-between aspect-square group cursor-pointer hover:border-[#4B89FF]/20 transition-all shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#4B89FF]/5 blur-[80px] rounded-full group-hover:bg-[#4B89FF]/10 transition-all" />
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[22px] sm:rounded-[24px] bg-[#4B89FF]/10 flex items-center justify-center text-[#4B89FF] mb-8 relative z-10 group-hover:scale-110 transition-transform">
             <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <div className="relative z-10">
            <span className="text-[10px] font-black text-[#555555] uppercase tracking-[0.4em] block mb-4">Faculty Registry</span>
            <div className="flex items-baseline gap-4">
              <div className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-none">{stats?.facultyPresent}</div>
              <div className="text-lg sm:text-xl font-bold text-[#444444] uppercase tracking-widest">Active</div>
            </div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mt-8">MAX SECTOR ATTENDANCE REACHED</p>
          </div>
        </div>

        <div 
          onClick={() => onNavigate('attendance')}
          className="bg-[#0C0C0C] border border-white/5 rounded-[56px] p-10 sm:p-12 flex flex-col justify-between aspect-square group cursor-pointer hover:border-[#FF3FD3]/20 transition-all shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#FF3FD3]/5 blur-[80px] rounded-full group-hover:bg-[#FF3FD3]/10 transition-all" />
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[22px] sm:rounded-[24px] bg-[#FF3FD3]/10 flex items-center justify-center text-[#FF3FD3] mb-8 relative z-10 group-hover:scale-110 transition-transform">
             <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <div className="relative z-10">
            <span className="text-[10px] font-black text-[#555555] uppercase tracking-[0.4em] block mb-4">Learner Health</span>
            <div className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-none">{stats?.studentAvgAttendance}%</div>
            <div className="mt-8 flex items-center gap-3">
              <span className="bg-orange-500/10 text-orange-500 text-[9px] font-black px-4 py-2 rounded-xl border border-orange-500/20 uppercase tracking-widest">AT RISK: {stats?.alertBatches} BATCHES</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          onClick={() => onNavigate('complaints')}
          className="bg-[#0C0C0C] border border-white/5 rounded-[48px] p-8 sm:p-10 flex items-center justify-between group cursor-pointer hover:border-rose-500/20 transition-all active:scale-[0.98] shadow-xl"
        >
           <div className="flex items-center gap-6 sm:gap-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] sm:rounded-[28px] bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <div>
                <span className="text-[10px] font-black text-[#444444] uppercase tracking-[0.3em] block mb-2">Safety Reports</span>
                <div className="text-3xl sm:text-5xl font-black text-white leading-none tracking-tighter">03 <span className="text-lg sm:text-xl text-[#222222]">/ NEW</span></div>
              </div>
           </div>
           <div className="text-[#1a1a1a] group-hover:text-white transition-colors">
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}><path d="M9 5l7 7-7 7" /></svg>
           </div>
        </div>

        <div 
          onClick={() => onNavigate('announcements')}
          className="bg-[#0C0C0C] border border-white/5 rounded-[48px] p-8 sm:p-10 flex items-center justify-between group cursor-pointer hover:border-[#D8FF5B]/20 transition-all active:scale-[0.98] shadow-xl"
        >
           <div className="flex items-center gap-6 sm:gap-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] sm:rounded-[28px] bg-[#D8FF5B]/10 flex items-center justify-center text-[#D8FF5B] shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M11 5L6 9H2V15H6L11 19V5Z" /><path d="M15.54 8.46c.937.937 1.464 2.209 1.464 3.54 0 1.331-.527 2.603-1.464 3.54" /></svg>
              </div>
              <div>
                <span className="text-[10px] font-black text-[#444444] uppercase tracking-[0.3em] block mb-2">Broadcasts</span>
                <div className="text-3xl sm:text-5xl font-black text-white leading-none tracking-tighter">08 <span className="text-lg sm:text-xl text-[#222222]">/ ACTIVE</span></div>
              </div>
           </div>
           <div className="text-[#1a1a1a] group-hover:text-white transition-colors">
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}><path d="M9 5l7 7-7 7" /></svg>
           </div>
        </div>
      </section>

      <footer className="pt-24 text-center opacity-10">
        <p className="text-xs font-black text-white uppercase tracking-[1.5em]">Intellectual Integrity Secured</p>
      </footer>
    </div>
  );
};

export default AdminOverviewView;