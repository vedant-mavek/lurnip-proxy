
import React, { useState } from 'react';
import { UserRole } from '../../types';

const InviteManagementView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole.TEACHER | UserRole.STUDENT>(UserRole.TEACHER);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [invites, setInvites] = useState([
    { id: '1', email: 'prof.smith@university.edu', role: UserRole.TEACHER, status: 'PENDING', createdAt: '2 days ago' },
    { id: '2', email: 'sarah.jones@student.edu', role: UserRole.STUDENT, status: 'ACCEPTED', createdAt: '5 days ago' },
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError(null);
    setTimeout(() => {
      if (Math.random() < 0.05) {
        setError('Dispatch failed. Please try again.');
        setIsSubmitting(false);
        return;
      }
      const newInvite = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role,
        status: 'PENDING' as const,
        createdAt: 'Just now'
      };
      setInvites([newInvite, ...invites]);
      setEmail('');
      setIsSubmitting(false);
      setSuccessMsg('Invite Dispatched Successfully');
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 px-1 relative">
      {successMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-emerald-500/10 border border-emerald-500/20 rounded-full px-8 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 shadow-2xl backdrop-blur-md">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
          <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">{successMsg}</span>
        </div>
      )}

      <header>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">Invite Hub</h2>
        <p className="text-[#888888] font-medium text-lg mt-1 tracking-tight">Onboard faculty and learners securely.</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <form onSubmit={handleInvite} className="bg-[#0C0C0C] border border-white/5 rounded-[32px] p-8 space-y-6">
            <h3 className="text-xl font-black text-white tracking-tight mb-2">Generate Invite</h3>
            
            {error && (
              <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs font-bold text-rose-500 animate-in fade-in slide-in-from-top-2">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>{error}</span>
              </div>
            )}

            <div className="bg-[#121212] rounded-[22px] px-6 py-5 flex flex-col border border-white/5 focus-within:border-[#D8FF5B]/30 transition-all min-h-[88px]">
              <label htmlFor="invite-email" className="text-[9px] font-black text-[#555555] uppercase tracking-widest mb-1.5">Recipient Email</label>
              <input
                id="invite-email"
                type="email"
                inputMode="email"
                required
                className="bg-transparent border-none text-white text-base sm:text-lg font-bold outline-none placeholder:text-[#333333]"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                placeholder="name@email.com"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setRole(UserRole.TEACHER)}
                className={`flex-1 h-14 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${role === UserRole.TEACHER ? 'bg-white text-black' : 'bg-black text-[#555555] border border-white/5 hover:border-white/10'}`}
              >
                Teacher
              </button>
              <button
                type="button"
                onClick={() => setRole(UserRole.STUDENT)}
                className={`flex-1 h-14 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${role === UserRole.STUDENT ? 'bg-white text-black' : 'bg-black text-[#555555] border border-white/5 hover:border-white/10'}`}
              >
                Student
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="w-full bg-[#D8FF5B] text-black h-16 rounded-[22px] font-black text-lg flex items-center justify-center transition-all active:scale-[0.98] shadow-xl shadow-[#D8FF5B]/10 disabled:opacity-20 mt-2 gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm uppercase tracking-widest">Dispatching...</span>
                </>
              ) : 'Dispatch Invite'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-[10px] font-black text-[#444444] uppercase tracking-[0.3em] px-2 mb-2">Pending Logs</h3>
          <div className="space-y-3">
            {invites.map((invite) => (
              <div key={invite.id} className="bg-[#0C0C0C] border border-white/5 rounded-[24px] p-5 flex items-center justify-between group hover:border-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[#555555] border border-white/5 shrink-0 ${invite.role === UserRole.TEACHER ? 'bg-blue-500/5' : 'bg-pink-500/5'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-white tracking-tight mb-0.5 truncate">{invite.email}</h4>
                    <span className="text-[9px] font-black text-[#555555] uppercase tracking-widest">{invite.role} • {invite.createdAt}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border shrink-0 ${invite.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-[#D8FF5B]/10 text-[#D8FF5B] border-[#D8FF5B]/20 animate-pulse'}`}>
                  {invite.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InviteManagementView;
