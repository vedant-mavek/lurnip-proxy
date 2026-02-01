
import React, { useState } from 'react';
import { Submission } from '../../types';

interface TeacherSubmissionsViewProps {
  batchId: string;
  submissions: Submission[];
  onBack?: () => void;
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

const TeacherSubmissionsView: React.FC<TeacherSubmissionsViewProps> = ({ batchId, submissions, onBack }) => {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());

  const toggleReviewed = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReviewedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (selectedSubmission) {
    return (
      <div className="space-y-10 pb-40 animate-in slide-in-from-right-8 duration-500 px-1">
        <button 
          onClick={() => setSelectedSubmission(null)} 
          className="flex items-center text-xs font-black text-[#555555] hover:text-white uppercase tracking-[0.2em] transition-colors group"
        >
          <svg className="w-4 h-4 mr-2.5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back to Student List
        </button>

        <header>
          <div className="flex items-center gap-4 mb-3">
            <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight">{selectedSubmission.studentName}</h2>
            {selectedSubmission.isLowEffort && (
              <span className="bg-rose-500/10 text-rose-500 text-[9px] font-black px-4 py-2 rounded-full border border-rose-500/20 uppercase tracking-widest">Low Effort Flag</span>
            )}
          </div>
          <p className="text-lg text-[#888888] font-medium">{selectedSubmission.courseName} • {selectedSubmission.lessonName}</p>
        </header>

        <div className="space-y-8">
          <section className="bg-[#0C0C0C] border border-white/5 rounded-[44px] p-10 shadow-2xl relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 blur-3xl rounded-full" />
            <span className="text-[10px] font-black text-[#444444] uppercase tracking-[0.3em] block mb-8">Submission Content</span>
            <div className="text-white text-xl font-medium leading-relaxed whitespace-pre-wrap relative z-10">{selectedSubmission.content}</div>
          </section>

          <section className="bg-blue-500/5 border border-blue-500/10 rounded-[44px] p-10 relative overflow-hidden">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] block mb-6 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
              Lurnip AI Feedback Insight (Read-Only)
            </span>
            <div className="text-blue-500 text-xl font-bold italic leading-relaxed">"{selectedSubmission.aiFeedback}"</div>
          </section>

          <div className="text-center p-12 bg-black border border-white/5 border-dashed rounded-[44px]">
            <p className="text-xs text-[#333333] font-black uppercase tracking-[0.2em] leading-relaxed max-w-sm mx-auto">Grading is handled by institutional board. This viewer is for pedagogical audit only.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-40 animate-in fade-in duration-500 px-1">
      {onBack && (
        <button 
          onClick={onBack} 
          className="flex items-center text-xs font-black text-[#555555] hover:text-white uppercase tracking-[0.2em] transition-colors group"
        >
          <svg className="w-4 h-4 mr-2.5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back to Home
        </button>
      )}
      
      <header>
        <h2 className="text-4xl font-extrabold text-white tracking-tight">Audit Work</h2>
        <p className="text-[#888888] font-medium text-lg mt-1">Review student submissions for Macroeconomics.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {submissions.length > 0 ? submissions.map(s => (
          <div
            key={s.id}
            onClick={() => setSelectedSubmission(s)}
            className="bg-[#0C0C0C] border border-white/5 rounded-[44px] p-8 group active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-5 flex-1 pr-10">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white font-black text-xl border border-white/5 transition-colors`}>
                  {s.studentName[0]}
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest block mb-1">{s.courseName}</span>
                  <h3 className="text-[22px] font-extrabold text-white tracking-tighter leading-none group-hover:text-blue-500 transition-colors">
                    {s.studentName}
                  </h3>
                </div>
              </div>
              
              <button 
                onClick={(e) => toggleReviewed(s.id, e)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${reviewedIds.has(s.id) ? 'bg-[#D8FF5B] text-black shadow-lg shadow-[#D8FF5B]/10' : 'bg-black border border-white/10 text-[#222222] hover:text-[#555555]'}`}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg>
              </button>
            </div>
            
            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-4">
              <span className="text-[10px] font-black text-[#444444] uppercase tracking-[0.2em]">{s.lessonName}</span>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-black uppercase tracking-widest ${reviewedIds.has(s.id) ? 'text-[#D8FF5B]' : 'text-[#333333]'}`}>
                  {reviewedIds.has(s.id) ? 'Marked Reviewed' : 'Pending Audit'}
                </span>
                {s.isLowEffort && <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />}
              </div>
            </div>
          </div>
        )) : (
          <EmptyState 
            title="No submissions yet" 
            subtitle="Assignments have been distributed but no responses recorded."
            icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>}
          />
        )}
      </div>
    </div>
  );
};

export default TeacherSubmissionsView;
