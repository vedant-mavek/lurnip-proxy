
import React, { useState } from 'react';

// Added studentId prop to match dashboard usage
interface AssignmentsViewProps {
  onBack: () => void;
  studentId: string;
}

const EmptyState: React.FC<{ title: string; subtitle: string; icon: React.ReactNode }> = ({ title, subtitle, icon }) => (
  <div className="py-24 md:py-32 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
    <div className="w-20 h-20 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-[#222222] mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-[#444444] tracking-tight">{title}</h3>
    <p className="text-[#333333] font-medium mt-1">{subtitle}</p>
  </div>
);

const AssignmentsView: React.FC<AssignmentsViewProps> = ({ onBack, studentId }) => {
  const [filter, setFilter] = useState<'pending' | 'completed'>('pending');

  const assignments = [
    { id: 'a1', title: 'Macro Policy Analysis', course: 'Macroeconomics', deadline: 'Oct 28', status: 'pending', urgent: true },
    { id: 'a2', title: 'Calculus Problem Set 4', course: 'Advanced Calculus', deadline: 'Oct 30', status: 'pending', urgent: false },
    { id: 'a3', title: 'Poetry Appreciation Essay', course: 'Modern Literature', deadline: 'Nov 02', status: 'pending', urgent: false },
    { id: 'a4', title: 'Lab Report: Optics', course: 'Physics II', deadline: 'Oct 24', status: 'completed', urgent: false },
  ];

  const filtered = assignments.filter(a => a.status === filter);

  return (
    <div className="space-y-10 pb-40 animate-in slide-in-from-right-8 duration-500">
      <button 
        onClick={onBack} 
        className="flex items-center text-xs font-black text-[#555555] hover:text-white uppercase tracking-[0.2em] transition-colors group"
      >
        <svg className="w-4 h-4 mr-2.5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to Dashboard
      </button>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-extrabold text-white tracking-tight">Assignments</h2>
          <p className="text-[#888888] font-medium text-lg mt-2">Manage your academic submissions.</p>
        </div>

        <div className="bg-[#121212] p-1.5 rounded-full flex gap-1 border border-white/5">
          <button
            onClick={() => setFilter('pending')}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              filter === 'pending' ? 'bg-[#FF3FD3] text-black shadow-lg shadow-[#FF3FD3]/10' : 'text-[#555555] hover:text-white'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              filter === 'completed' ? 'bg-white text-black' : 'text-[#555555] hover:text-white'
            }`}
          >
            Completed
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {filtered.length > 0 ? filtered.map((a) => (
          <div key={a.id} className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 flex flex-col group hover:border-white/10 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-[10px] font-black text-[#444444] uppercase tracking-widest block mb-2">{a.course}</span>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">{a.title}</h3>
              </div>
              {a.urgent && filter === 'pending' && (
                <span className="bg-rose-500/10 text-rose-500 text-[9px] font-black px-3 py-1.5 rounded-full border border-rose-500/20 uppercase tracking-widest">Urgent</span>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#555555]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <span className="text-xs font-bold text-[#666666]">Due: {a.deadline}</span>
              </div>
              <button className={`h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === 'pending' ? 'bg-[#FF3FD3] text-black hover:bg-[#FF55DD]' : 'bg-[#181818] text-[#555555]'
              }`}>
                {filter === 'pending' ? 'Submit Now' : 'View Submission'}
              </button>
            </div>
          </div>
        )) : (
          <EmptyState 
            title={filter === 'pending' ? "All caught up!" : "No completed tasks"} 
            subtitle={filter === 'pending' ? "No pending assignments require your attention." : "You haven't finished any assignments in this category yet."}
            icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
          />
        )}
      </div>
    </div>
  );
};

export default AssignmentsView;
