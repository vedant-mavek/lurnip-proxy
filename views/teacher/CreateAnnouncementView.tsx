
import React, { useState } from 'react';
import { teacherService } from '../../services/teacherService';

interface CreateAnnouncementViewProps {
  onBack: () => void;
  batchId: string;
}

const CreateAnnouncementView: React.FC<CreateAnnouncementViewProps> = ({ onBack, batchId }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePublish = async () => {
    if (title && message) {
      setPublishing(true);
      setError(null);
      const { data, error: apiError } = await teacherService.createAnnouncement(batchId, title, message, isUrgent);
      setPublishing(false);
      
      if (data) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onBack();
        }, 1500);
      } else {
        setError(apiError?.message || 'Failed to publish announcement. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-10 pb-40 animate-in slide-in-from-right-8 duration-500 px-1 relative">
      {showSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-[#0C0C0C] border border-white/10 rounded-[44px] p-12 text-center shadow-2xl animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-500 text-black rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/10">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">Broadcast Sent</h3>
              <p className="text-[#555555] font-bold mt-2 uppercase tracking-widest text-[10px]">ALL STUDENTS NOTIFIED</p>
           </div>
        </div>
      )}

      <button 
        onClick={onBack} 
        className="flex items-center text-xs font-black text-[#555555] hover:text-white uppercase tracking-[0.2em] transition-colors group h-12"
      >
        <svg className="w-4 h-4 mr-2.5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Cancel Post
      </button>

      <header>
        <h2 className="text-4xl font-extrabold text-white tracking-tight">New Announcement</h2>
        <p className="text-[#888888] font-medium text-lg mt-1">Push important updates to all batch students.</p>
      </header>

      <div className="space-y-6">
        {error && (
          <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs font-bold text-rose-500 animate-in fade-in slide-in-from-top-2">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>{error}</span>
          </div>
        )}
        <div className="bg-[#0C0C0C] rounded-[32px] px-8 py-6 flex flex-col border border-white/5 focus-within:border-[#D8FF5B]/30 transition-all min-h-[96px]">
          <label htmlFor="announcement-title" className="text-[10px] font-black text-[#555555] uppercase tracking-widest mb-3">Topic Title</label>
          <input 
            id="announcement-title"
            type="text" 
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(null); }}
            placeholder="Exam Schedule Update..." 
            className="bg-transparent border-none text-white text-base sm:text-xl font-extrabold outline-none placeholder:text-[#333333]" 
          />
        </div>

        <div className="bg-[#0C0C0C] rounded-[32px] px-8 py-6 flex flex-col border border-white/5 focus-within:border-[#D8FF5B]/30 transition-all min-h-[200px]">
          <label htmlFor="announcement-msg" className="text-[10px] font-black text-[#555555] uppercase tracking-widest mb-3">Announcement Message</label>
          <textarea 
            id="announcement-msg"
            value={message}
            onChange={(e) => { setMessage(e.target.value); setError(null); }}
            rows={6}
            placeholder="Type your message to the students..." 
            className="bg-transparent border-none text-white text-base sm:text-lg font-medium leading-relaxed outline-none placeholder:text-[#333333] resize-none no-scrollbar" 
          />
        </div>

        <div 
          onClick={() => setIsUrgent(!isUrgent)}
          className="bg-[#0C0C0C] rounded-[32px] p-6 sm:p-8 border border-white/5 flex items-center justify-between group cursor-pointer hover:border-white/10 transition-all active:bg-white/[0.02]"
        >
          <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shrink-0 ${isUrgent ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-white/5 text-[#444444]'}`}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-white block">Mark as Urgent</span>
              <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest mt-1 block">Trigger push notification</span>
            </div>
          </div>
          <div className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${isUrgent ? 'bg-rose-500' : 'bg-[#1a1a1a]'}`}>
             <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isUrgent ? 'left-7' : 'left-1'}`} />
          </div>
        </div>
      </div>

      <div className="pt-10">
        <button 
          onClick={handlePublish}
          disabled={publishing || !title || !message}
          className="w-full bg-[#D8FF5B] text-black h-20 rounded-full font-black text-2xl transition-all active:scale-[0.98] shadow-2xl shadow-[#D8FF5B]/10 disabled:opacity-20 flex items-center justify-center gap-4"
        >
          {publishing ? (
            <>
              <div className="w-7 h-7 border-4 border-black border-t-transparent rounded-full animate-spin" />
              <span className="text-sm uppercase tracking-widest">Submitting...</span>
            </>
          ) : (
            <>
              Publish Announcement
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateAnnouncementView;
