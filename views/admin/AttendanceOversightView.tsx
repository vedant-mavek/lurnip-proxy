
import React, { useState } from 'react';

const AttendanceOversightView: React.FC = () => {
  const [filter, setFilter] = useState<'FACULTY' | 'STUDENT'>('FACULTY');

  return (
    <div className="space-y-12 animate-in fade-in duration-700 px-1">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter">Attendance Audit</h2>
          <p className="text-[#888888] font-medium text-base sm:text-lg mt-1 tracking-tight">Visibility into institutional conduction and presence logs.</p>
        </div>

        <div className="bg-[#121212] p-1.5 rounded-full flex gap-1 border border-white/5 self-start md:self-auto overflow-x-auto no-scrollbar max-w-full">
          <button
            onClick={() => setFilter('FACULTY')}
            className={`px-6 sm:px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              filter === 'FACULTY' ? 'bg-[#D8FF5B] text-black shadow-lg shadow-[#D8FF5B]/10' : 'text-[#555555] hover:text-white'
            }`}
          >
            Faculty Conduction
          </button>
          <button
            onClick={() => setFilter('STUDENT')}
            className={`px-6 sm:px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              filter === 'STUDENT' ? 'bg-[#D8FF5B] text-black shadow-lg shadow-[#D8FF5B]/10' : 'text-[#555555] hover:text-white'
            }`}
          >
            Student Health
          </button>
        </div>
      </header>

      {filter === 'FACULTY' ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="bg-[#0C0C0C] rounded-[32px] sm:rounded-[44px] p-8 sm:p-10 border border-white/5 flex flex-col justify-between h-[180px] sm:h-[200px]">
                <span className="text-[11px] font-black text-[#555555] uppercase tracking-widest block mb-2">Today's Conduction</span>
                <div className="text-5xl sm:text-6xl font-black text-white leading-none">92%</div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter mt-4">22/24 Sessions Conducted</span>
             </div>
             <div className="bg-[#0C0C0C] rounded-[32px] sm:rounded-[44px] p-8 sm:p-10 border border-white/5 flex flex-col justify-between h-[180px] sm:h-[200px]">
                <span className="text-[11px] font-black text-[#555555] uppercase tracking-widest block mb-2">Faculty Present</span>
                <div className="text-5xl sm:text-6xl font-black text-white leading-none">18</div>
                <span className="text-[10px] font-bold text-[#888888] uppercase tracking-tighter mt-4">1 Exception Logged</span>
             </div>
             <div className="bg-[#0C0C0C] rounded-[32px] sm:rounded-[44px] p-8 sm:p-10 border border-white/5 flex flex-col justify-between h-[180px] sm:h-[200px] bg-rose-500/[0.02] border-rose-500/10">
                <span className="text-[11px] font-black text-rose-500 uppercase tracking-widest block mb-2">Missed Sessions</span>
                <div className="text-5xl sm:text-6xl font-black text-rose-500 leading-none">02</div>
                <span className="text-[10px] font-bold text-[#888888] uppercase tracking-tighter mt-4">Manual override available</span>
             </div>
          </div>

          <div className="bg-[#0C0C0C] rounded-[32px] sm:rounded-[44px] border border-white/5 overflow-hidden">
             <div className="p-8 sm:p-10 border-b border-white/5">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none">Conduction Log</h3>
             </div>
             <div className="divide-y divide-white/5">
                {[
                  { teacher: 'Dr. Sarah Smith', subject: 'Data Structures', batch: 'BSCS-24-A', time: '09:00 AM', status: 'CONDUCTED' },
                  { teacher: 'Prof. James Wilson', subject: 'Calculus II', batch: 'BSCS-24-B', time: '10:30 AM', status: 'MISSED' },
                  { teacher: 'Dr. Emily Brown', subject: 'AI Ethics', batch: 'BSCS-24-A', time: '11:00 AM', status: 'CONDUCTED' }
                ].map((log, i) => (
                  <div key={i} className="p-6 sm:p-8 flex items-center justify-between gap-4 group hover:bg-white/[0.01] transition-colors">
                     <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-white/5 flex items-center justify-center font-black text-white text-base sm:text-xl border border-white/5 shrink-0">
                           {log.teacher[0]}
                        </div>
                        <div className="min-w-0">
                           <h4 className="text-base sm:text-xl font-extrabold text-white tracking-tight leading-none truncate">{log.teacher}</h4>
                           <p className="text-[9px] sm:text-[11px] font-black text-[#555555] uppercase tracking-widest mt-1.5 truncate">{log.subject} • {log.batch}</p>
                        </div>
                     </div>
                     <div className="flex flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-8 shrink-0">
                        <span className="text-[9px] sm:text-[11px] font-black text-[#444444] uppercase tracking-[0.2em]">{log.time}</span>
                        <div className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl text-[8px] sm:text-[10px] font-black uppercase tracking-widest border ${
                          log.status === 'CONDUCTED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20 animate-pulse'
                        }`}>
                          {log.status}
                        </div>
                        <button className="hidden sm:block text-[#222222] hover:text-[#D8FF5B] transition-colors">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                        </button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {['BSCS-2024-A', 'BSCS-2024-B', 'PRE-ENG-2024'].map((batch, i) => (
             <div key={i} className="bg-[#0C0C0C] border border-white/5 rounded-[32px] sm:rounded-[44px] p-8 sm:p-10 flex flex-col group hover:border-white/10 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-8">
                   <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none truncate pr-4">{batch}</h3>
                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[20px] bg-white/5 flex items-center justify-center text-[10px] sm:text-[11px] font-black text-[#555555] shrink-0">
                      {85 - (i * 10)}%
                   </div>
                </div>
                <div className="space-y-3 mb-8">
                   <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest block">Average Attendance</span>
                   <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/5">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${i === 2 ? 'bg-orange-500' : 'bg-[#D8FF5B]'}`}
                        style={{ width: `${85 - (i * 10)}%` }}
                      />
                   </div>
                </div>
                <button className="mt-auto w-full h-12 sm:h-14 bg-white/5 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-colors">View Student Logs</button>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceOversightView;
