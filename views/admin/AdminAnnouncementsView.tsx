import React, { useState } from 'react';
import Modal from '../../components/Modal';

const AdminAnnouncementsView: React.FC = () => {
  const [showNewModal, setShowNewModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [announcements, setAnnouncements] = useState([
    { id: 1, author: 'DR. SARAH SMITH', batch: 'BSCS-24-A', title: 'CALCULUS QUIZ POSTPONED', date: '2H AGO', status: 'ACTIVE' },
    { id: 2, author: 'ADMINISTRATOR', batch: 'INSTITUTION-WIDE', title: 'WINTER BREAK NOTICE', date: '1D AGO', status: 'ACTIVE' },
    { id: 3, author: 'PROF. WILSON', batch: 'BSCS-24-B', title: 'LAB EQUIPMENT UPDATE', date: '2D AGO', status: 'ARCHIVED' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newAnn = {
        id: Date.now(),
        author: 'ADMINISTRATOR',
        batch: 'GLOBAL',
        title: title.toUpperCase(),
        date: 'JUST NOW',
        status: 'ACTIVE'
      };
      setAnnouncements([newAnn, ...announcements]);
      setIsSubmitting(false);
      setShowNewModal(false);
      setTitle('');
      setMessage('');
    }, 1000);
  };

  const handleArchive = (id: number) => {
    setAnnouncements(prev => prev.map(a => 
      a.id === id ? { ...a, status: a.status === 'ARCHIVED' ? 'ACTIVE' : 'ARCHIVED' } : a
    ));
  };

  const handleDelete = (id: number) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-40">
      {/* Visual OS Header */}
      <header className="relative py-12 flex flex-col items-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[120px] font-black text-white/5 tracking-tighter whitespace-nowrap pointer-events-none select-none">
          ANNOUNCEMENTS
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2">
           <div className="flex items-center gap-3">
             <div className="w-5 h-5 bg-[#D8FF5B] rounded-md" />
             <span className="text-2xl font-black tracking-tighter text-white uppercase">Lurnip</span>
             <span className="text-[10px] font-black text-[#444444] uppercase tracking-widest ml-4">Term.</span>
           </div>
           <p className="text-[11px] font-black text-[#555555] uppercase tracking-[0.3em]">Oversight and institutional broadcasting.</p>
        </div>
        
        <button 
          onClick={() => setShowNewModal(true)}
          className="mt-12 bg-[#D8FF5B] text-black h-14 px-10 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all shadow-xl shadow-[#D8FF5B]/10 flex items-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M12 4v16m8-8H4" /></svg>
          Broadcast Alert
        </button>
      </header>

      {/* Announcements List */}
      <div className="max-w-2xl mx-auto space-y-8 px-4">
        {announcements.length > 0 ? announcements.map((post) => (post.status !== 'DELETED' && (
          <div key={post.id} className="flex items-center gap-4 group">
            <div className="flex-1 bg-[#0C0C0C] rounded-[48px] overflow-hidden flex min-h-[220px]">
              {/* Left Speaker Gutter */}
              <div className="w-24 sm:w-32 flex items-center justify-center shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-[#444444]">
                   <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                     <path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11.5 19l-4-4H4V9h3.5l4-4v14z" />
                   </svg>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 bg-[#080808] m-2 rounded-[40px] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-[#444444] uppercase tracking-widest">{post.author} •</span>
                    <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest">{post.batch}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6">
                    <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tighter leading-[0.9] flex-1">
                      {post.title}
                    </h3>
                    <button 
                      onClick={() => handleArchive(post.id)}
                      className={`h-11 px-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                        post.status === 'ARCHIVED' ? 'bg-[#D8FF5B] text-black' : 'bg-white/5 text-[#555555] hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {post.status === 'ARCHIVED' ? 'UNARCHIVE' : 'ARCHIVE'}
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <span className="text-[10px] font-black text-[#333333] uppercase tracking-[0.3em]">{post.date}</span>
                </div>
              </div>
            </div>

            {/* Outside Delete Action */}
            <button 
              onClick={() => handleDelete(post.id)}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-[24px] bg-rose-500/10 border border-rose-500/10 flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all active:scale-90"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))) : (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-[#222222]">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M11 5L6 9H2V15H6L11 19V5Z" /><path d="M15.54 8.46c.937.937 1.464 2.209 1.464 3.54 0 1.331-.527 2.603-1.464 3.54" /></svg>
            </div>
            <p className="text-[#333333] font-black uppercase tracking-[0.3em] text-xs">No active broadcasts</p>
          </div>
        )}
      </div>

      <Modal 
        isOpen={showNewModal} 
        onClose={() => setShowNewModal(false)}
        title="NEW ALERT"
        subtitle="ESTABLISH INSTITUTIONAL BROADCAST"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-[#121212] rounded-[32px] px-8 py-7 flex flex-col border border-white/5 focus-within:border-[#D8FF5B]/30 transition-all">
            <label className="text-[10px] font-black text-[#555555] uppercase tracking-widest mb-3">Topic Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="QUAKE DRILL NOTICE..." 
              required 
              className="bg-transparent border-none text-white text-xl font-extrabold outline-none placeholder:text-[#333333] uppercase" 
            />
          </div>
          <div className="bg-[#121212] rounded-[32px] px-8 py-7 flex flex-col border border-white/5 focus-within:border-[#D8FF5B]/30 transition-all">
            <label className="text-[10px] font-black text-[#555555] uppercase tracking-widest mb-3">Announcement Data</label>
            <textarea 
              rows={4} 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="TYPE BROADCAST PARAMETERS..." 
              className="bg-transparent border-none text-white text-lg font-medium outline-none placeholder:text-[#333333] resize-none" 
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button type="button" onClick={() => setShowNewModal(false)} className="order-2 sm:order-1 h-16 font-black text-[#555555] hover:text-white uppercase tracking-widest transition-colors text-xs">Cancel</button>
            <button 
              type="submit" 
              disabled={isSubmitting || !title || !message}
              className="order-1 sm:order-2 flex-1 bg-[#D8FF5B] text-black h-20 rounded-[32px] font-black text-xl shadow-xl shadow-[#D8FF5B]/10 active:scale-95 transition-all disabled:opacity-20 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-black/10 border-t-black rounded-full animate-spin"></div>
              ) : 'POST BROADCAST'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminAnnouncementsView;