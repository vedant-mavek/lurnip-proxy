
import React from 'react';

// Added batchId prop to match dashboard usage
interface AnnouncementsViewProps {
  onBack: () => void;
  batchId: string;
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

const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({ onBack, batchId }) => {
  const announcements = [
    { 
      id: 1, 
      title: 'Exam Schedule for Winter 2024', 
      content: 'The official schedule for final exams has been uploaded to the institutional portal. Please check your specific batch dates.', 
      date: '2h ago', 
      type: 'URGENT', 
      color: '#D8FF5B' 
    },
    { 
      id: 2, 
      title: 'Workshop: AI in Design', 
      content: 'Join us for a specialized session on how Generative AI is reshaping the UX landscape this Friday at the Main Hall.', 
      date: '1d ago', 
      type: 'EVENT', 
      color: '#4B85FD' 
    },
    { 
      id: 3, 
      title: 'Campus Maintenance Notice', 
      content: 'Library access will be restricted during the upcoming weekend for system upgrades and facility maintenance.', 
      date: '3d ago', 
      type: 'GENERAL', 
      color: '#FF3FD3' 
    },
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
        <h2 className="text-5xl font-extrabold text-white tracking-tight">Announcements</h2>
        <p className="text-[#888888] font-medium text-lg mt-2">Institutional news and batch updates.</p>
      </header>

      <div className="space-y-6">
        {announcements.length > 0 ? announcements.map((item) => (
          <div key={item.id} className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 flex flex-col md:flex-row gap-6 hover:border-white/10 transition-all">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner"
              style={{ backgroundColor: `${item.color}10`, color: item.color }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.167a2.406 2.406 0 00-1.045-1.285 4.958 4.958 0 01-1.264-1.298 1.41 1.41 0 01.442-2.105 1.758 1.758 0 011.65-.012l.608.306a2.414 2.414 0 002.522-.372l1.393-1.071a1.76 1.76 0 012.261.05z" />
              </svg>
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: item.color }}>{item.type}</span>
                <span className="text-[10px] font-bold text-[#444444] uppercase tracking-tighter">{item.date}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">{item.title}</h3>
              <p className="text-base text-[#888888] font-medium leading-relaxed">{item.content}</p>
            </div>
          </div>
        )) : (
          <EmptyState 
            title="All clear" 
            subtitle="There are no new announcements for your batch right now."
            icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2V15H6L11 19V5Z" /><path d="M15.54 8.46c.937.937 1.464 2.209 1.464 3.54 0 1.331-.527 2.603-1.464 3.54" /></svg>}
          />
        )}
      </div>
    </div>
  );
};

export default AnnouncementsView;
