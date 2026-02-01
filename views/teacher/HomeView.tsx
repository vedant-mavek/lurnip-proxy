
import React, { useState, useEffect } from 'react';
import { teacherService } from '../../services/teacherService';

interface TeacherHomeViewProps {
  batchId: string;
  onBatchChange: (id: string) => void;
  onTakeAttendance: () => void;
  onViewSubmissions: () => void;
  onPostAnnouncement: () => void;
  onViewAssignments: () => void;
  teacherId: string;
}

const TeacherHomeView: React.FC<TeacherHomeViewProps> = ({ 
  batchId, 
  onBatchChange, 
  onTakeAttendance, 
  onViewSubmissions, 
  onPostAnnouncement,
  onViewAssignments,
  teacherId
}) => {
  const [batches, setBatches] = useState<any[]>([]);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [batchesRes, sessionRes] = await Promise.all([
        teacherService.getBatches(teacherId),
        teacherService.getCurrentSession(teacherId)
      ]);
      if (batchesRes.data) setBatches(batchesRes.data);
      if (sessionRes.data) setCurrentSession(sessionRes.data);
      setLoading(false);
    };
    loadData();
  }, [teacherId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <div className="w-10 h-10 border-4 border-[#D8FF5B]/10 border-t-[#D8FF5B] rounded-full animate-spin mb-4" />
        <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest">Waking up Control Center...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 pb-32 animate-in fade-in duration-500">
      {/* Header with Batch Switcher */}
      <header className="px-1 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-[#555555] uppercase tracking-[0.3em] mb-1">Active Batch</span>
          <div className="relative group">
            <select 
              value={batchId} 
              onChange={(e) => onBatchChange(e.target.value)}
              className="bg-transparent text-3xl font-extrabold text-white tracking-tight outline-none appearance-none cursor-pointer pr-8"
            >
              {batches.map(b => <option key={b.id} value={b.id} className="bg-black text-white">{b.name}</option>)}
            </select>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#555555]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
        <button className="w-12 h-12 rounded-[20px] bg-[#121212] border border-white/5 flex items-center justify-center text-white active:scale-95 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
        </button>
      </header>

      {/* Primary Action Card: Current Session */}
      <section className="px-1">
        <div className="bg-[#0C0C0C] border border-white/10 rounded-[44px] p-8 md:p-10 flex flex-col relative overflow-hidden transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D8FF5B]/5 blur-[80px] rounded-full pointer-events-none opacity-40 translate-x-20 -translate-y-20 transition-colors duration-1000" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-black text-[#555555] uppercase tracking-[0.3em]">Current Session</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-[#D8FF5B] uppercase tracking-widest">{currentSession?.status || 'Active'}</span>
                <div className="w-1.5 h-1.5 bg-[#D8FF5B] rounded-full shadow-[0_0_8px_#D8FF5B] animate-pulse"></div>
              </div>
            </div>

            <div className="flex flex-col mb-10">
              <h3 className="text-[34px] font-[800] text-white tracking-tighter leading-tight mb-2">{currentSession?.subject || 'Macroeconomics'}</h3>
              <p className="text-[#888888] font-medium text-lg">{currentSession?.unit || 'Loading unit...'} • {batches.find(b => b.id === batchId)?.name}</p>
            </div>
            
            <button 
              onClick={onTakeAttendance}
              className="w-full bg-[#D8FF5B] text-black h-16 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-[#D8FF5B]/10 hover:bg-[#e4ff88]"
            >
              Take Attendance
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 gap-4 px-1">
        <div className="bg-[#0C0C0C] rounded-[32px] p-6 border border-white/5 flex flex-col justify-between aspect-square group cursor-pointer hover:border-white/10 transition-all">
          <div className="w-12 h-12 rounded-[20px] bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4 transition-colors group-hover:bg-blue-500/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest block mb-1">Today's Attendance</span>
            <div className="text-4xl font-black text-white leading-none">02</div>
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter mt-2">Sessions Taken</p>
          </div>
        </div>

        <div 
          onClick={onViewAssignments}
          className="bg-[#0C0C0C] rounded-[32px] p-6 border border-white/5 flex flex-col justify-between aspect-square group cursor-pointer hover:border-white/10 transition-all"
        >
          <div className="w-12 h-12 rounded-[20px] bg-[#D8FF5B]/10 flex items-center justify-center text-[#D8FF5B] mb-4 transition-colors group-hover:bg-[#D8FF5B]/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
            </svg>
          </div>
          <div>
            <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest block mb-1">Assignments</span>
            <div className="text-4xl font-black text-white leading-none">05</div>
            <p className="text-[10px] font-bold text-[#D8FF5B] uppercase tracking-tighter mt-2">Manage All</p>
          </div>
        </div>
      </section>

      {/* Action Links */}
      <section className="grid grid-cols-1 gap-4 px-1">
        <div 
          onClick={onPostAnnouncement}
          className="bg-[#0C0C0C] rounded-[32px] p-6 border border-white/5 flex items-center justify-between group cursor-pointer hover:border-white/10 active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-[#D8FF5B] shrink-0 border border-white/5 transition-transform group-hover:scale-[1.02]">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2V15H6L11 19V5Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 12C17.004 13.3308 16.4774 14.6024 15.54 15.54" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-black text-[#555555] uppercase tracking-[0.2em] block mb-1">Batch Communications</span>
              <p className="text-[17px] font-[800] text-white tracking-tight leading-tight">Post new announcement.</p>
            </div>
          </div>
          <div className="text-[#333333] group-hover:text-white transition-colors pr-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>

        <div 
          onClick={onViewSubmissions}
          className="bg-[#0C0C0C] rounded-[32px] p-6 border border-white/5 flex items-center justify-between group cursor-pointer hover:border-white/10 active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-[#FF3FD3] shrink-0 border border-white/5 transition-transform group-hover:scale-[1.02]">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-black text-[#555555] uppercase tracking-[0.2em] block mb-1">Student Submissions</span>
              <p className="text-[17px] font-[800] text-white tracking-tight leading-tight">Review and audit work.</p>
            </div>
          </div>
          <div className="text-[#333333] group-hover:text-white transition-colors pr-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherHomeView;
