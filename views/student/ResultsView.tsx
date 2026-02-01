
import React from 'react';

// Added studentId prop to match dashboard usage
interface ResultsViewProps {
  onBack: () => void;
  studentId: string;
}

const ResultsView: React.FC<ResultsViewProps> = ({ onBack, studentId }) => {
  const subjectGrades = [
    { name: 'Macroeconomics', grade: 'A', score: '92/100', trend: 'up' },
    { name: 'Advanced Calculus', grade: 'A-', score: '88/100', trend: 'down' },
    { name: 'Modern Literature', grade: 'A+', score: '98/100', trend: 'stable' },
    { name: 'Quantum Physics', grade: 'B+', score: '79/100', trend: 'up' },
  ];

  return (
    <div className="space-y-10 pb-40 animate-in slide-in-from-right-8 duration-500">
      <button 
        onClick={onBack} 
        className="flex items-center text-xs font-black text-[#555555] hover:text-white uppercase tracking-[0.2em] transition-colors group"
      >
        <svg className="w-4 h-4 mr-2.5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to Dashboard
      </button>

      <header>
        <h2 className="text-5xl font-extrabold text-white tracking-tight">Academic Performance</h2>
        <p className="text-[#888888] font-medium text-lg mt-2">Term 1 • Winter 2024</p>
      </header>

      {/* GPA Hero */}
      <div className="bg-[#0C0C0C] rounded-[48px] p-10 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center sm:items-start">
          <span className="text-[10px] font-black text-[#444444] uppercase tracking-[0.3em] mb-4">Cumulative GPA</span>
          <div className="flex items-baseline gap-4">
            <span className="text-8xl font-black text-white tracking-tighter">3.82</span>
            <span className="text-2xl font-bold text-blue-500">/ 4.0</span>
          </div>
          <div className="mt-8 px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-[10px] font-black text-blue-500 uppercase tracking-widest">
            Top 5% of Batch
          </div>
        </div>
      </div>

      {/* Subject Wise Breakdown */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-white tracking-tight px-2">Subject Breakdown</h3>
        <div className="grid grid-cols-1 gap-3">
          {subjectGrades.map((s, idx) => (
            <div key={idx} className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-6 flex items-center justify-between group hover:border-white/10 transition-all">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl font-black text-white">
                  {s.grade[0]}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">{s.name}</h4>
                  <span className="text-[9px] font-black text-[#444444] uppercase tracking-widest">{s.score}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-xl font-black ${
                  s.grade.includes('+') ? 'text-[#D8FF5B]' : s.grade.includes('-') ? 'text-orange-500' : 'text-white'
                }`}>{s.grade}</span>
                <div className="mt-1">
                  {s.trend === 'up' && <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg>}
                  {s.trend === 'down' && <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>}
                  {s.trend === 'stable' && <svg className="w-4 h-4 text-[#444444]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14" /></svg>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResultsView;
