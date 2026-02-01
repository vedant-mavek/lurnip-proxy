import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Complaint } from '../../types';
import Modal from '../../components/Modal';

const EmptyState: React.FC<{ title: string; subtitle: string; icon: React.ReactNode }> = ({ title, subtitle, icon }) => (
  <div className="py-24 md:py-32 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
    <div className="w-20 h-20 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-[#222222] mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-[#444444] tracking-tight">{title}</h3>
    <p className="text-[#333333] font-medium mt-1">{subtitle}</p>
  </div>
);

const ComplaintsView: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Complaint | null>(null);
  const [internalNote, setInternalNote] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      const { data } = await adminService.getComplaints();
      if (data) setComplaints(data);
      setLoading(false);
    };
    fetchComplaints();
  }, []);

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-[#D8FF5B]/10 border-t-[#D8FF5B] rounded-full animate-spin mb-4" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700 px-1">
      <header className="space-y-4">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase">
          Reports &<br className="md:hidden" /> Feedback
        </h2>
        <p className="text-[#888888] font-medium text-base md:text-xl tracking-tight max-w-lg">
          Direct institutional oversight of safety and operational concerns.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {complaints.length > 0 ? complaints.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelected(item)}
            className={`bg-[#0C0C0C] border rounded-[44px] p-8 md:p-10 group cursor-pointer transition-all active:scale-[0.99] flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
              item.status === 'NEW' ? 'border-white/10 shadow-2xl' : 'border-white/5 opacity-60 hover:opacity-100'
            }`}
          >
             <div className="flex items-start gap-6 md:gap-8 flex-1 min-w-0">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] flex items-center justify-center border border-white/5 shrink-0 ${
                  item.status === 'NEW' ? 'bg-rose-500/10 text-rose-500 shadow-lg shadow-rose-500/10' : 'bg-white/5 text-[#555555]'
                }`}>
                   <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest">{item.category} • {item.batchName}</span>
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border ${
                        item.isAnonymous ? 'bg-white/5 text-[#555555] border-white/10' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }`}>
                         {item.isAnonymous ? 'Anonymous' : 'Named'}
                      </span>
                   </div>
                   <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-snug group-hover:text-rose-500 transition-colors">
                     {item.text}
                   </h3>
                   <span className="text-[10px] font-black text-[#333333] uppercase tracking-widest block mt-4">{item.createdAt}</span>
                </div>
             </div>
             
             <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 border-t border-white/5 sm:border-none pt-4 sm:pt-0">
                <span className="sm:hidden text-[9px] font-black text-[#444444] uppercase tracking-widest">Open Case</span>
                <div className="flex items-center gap-6">
                   {item.status === 'NEW' && <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_12px_#ef4444]" />}
                   <div className="text-[#222222] group-hover:text-white transition-colors">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path d="M9 5l7 7-7 7" /></svg>
                   </div>
                </div>
             </div>
          </div>
        )) : (
          <EmptyState 
            title="Registry is clean" 
            subtitle="No safety or facilities reports have been filed yet."
            icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
          />
        )}
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Case Detail"
        subtitle="INTERNAL INVESTIGATION LOG"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/[0.02] blur-[80px] rounded-full translate-x-10 -translate-y-10" />
          <div className="relative z-10 space-y-8">
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-[32px] border border-white/5">
              <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest block mb-4">Original Broadcast</span>
              <p className="text-lg md:text-xl text-white font-medium leading-relaxed italic">"{selected?.text}"</p>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D8FF5B]" />
                  <span className="text-[11px] font-black text-[#666666] uppercase tracking-widest">Sect: {selected?.category}</span>
                </div>
                <span className="text-[#222222] hidden sm:block">/</span>
                <span className="text-[11px] font-black text-[#666666] uppercase tracking-widest">Batch: {selected?.batchName}</span>
              </div>
            </div>

            <div className="bg-[#121212] rounded-[32px] px-8 py-7 flex flex-col border border-white/5 focus-within:border-[#D8FF5B]/30 transition-all">
              <label className="text-[10px] font-black text-[#555555] uppercase tracking-widest mb-3">Institutional Resolution</label>
              <textarea 
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                rows={3} 
                placeholder="Log internal context or corrective action plan..." 
                className="bg-transparent border-none text-white text-lg font-medium outline-none placeholder:text-[#333333] resize-none" 
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="order-2 sm:order-1 flex-1 h-18 py-5 rounded-[32px] border border-white/5 text-[11px] font-black text-[#555555] hover:text-rose-500 transition-colors uppercase tracking-widest">Discard Entry</button>
              <button 
                onClick={() => setSelected(null)}
                className="order-1 sm:order-2 flex-1 bg-white text-black h-18 py-5 rounded-[32px] font-black text-lg shadow-2xl active:scale-[0.98] transition-all"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ComplaintsView;