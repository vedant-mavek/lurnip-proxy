
import React, { useState } from 'react';

interface Student {
  id: string;
  name: string;
  isPresent: boolean;
}

interface AttendanceViewProps {
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

const AttendanceView: React.FC<AttendanceViewProps> = ({ batchId }) => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([
    { id: 'st1', name: 'Alex Rivera', isPresent: true },
    { id: 'st2', name: 'Sarah Jenkins', isPresent: true },
    { id: 'st3', name: 'David Chen', isPresent: false },
    { id: 'st4', name: 'Elena Rodriguez', isPresent: true },
    { id: 'st5', name: 'Marcus Thompson', isPresent: true },
    { id: 'st6', name: 'Chloe Kim', isPresent: false },
  ]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sessions = [
    { id: 'ses1', time: '09:00 AM', subject: 'Macroeconomics', status: 'COMPLETED' },
    { id: 'ses2', time: '11:00 AM', subject: 'Microeconomics', status: 'ONGOING' },
    { id: 'ses3', time: '02:00 PM', subject: 'Economic Policy', status: 'UPCOMING' },
  ];

  const togglePresence = (id: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, isPresent: !s.isPresent } : s));
    setSaved(false);
    setError(null);
  };

  const handleSave = () => {
    setSaving(true);
    setError(null);
    setTimeout(() => {
      if (Math.random() < 0.05) {
        setError('Failed to save attendance. Please retry.');
        setSaving(false);
        return;
      }
      setSaving(false);
      setSaved(true);
    }, 1200);
  };

  if (selectedSession) {
    const session = sessions.find(s => s.id === selectedSession);
    return (
      <div className="space-y-10 pb-40 animate-in slide-in-from-right-8 duration-500 px-1">
        <button 
          onClick={() => setSelectedSession(null)} 
          className="flex items-center text-xs font-black text-[#555555] hover:text-white uppercase tracking-[0.2em] transition-colors group"
        >
          <svg className="w-4 h-4 mr-2.5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          All Sessions
        </button>

        <header>
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-2">{session?.time} • {session?.status}</span>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">{session?.subject}</h2>
          <p className="text-[#888888] font-medium text-lg mt-1">Batch 2024 Section A</p>
        </header>

        {error && (
          <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs font-bold text-rose-500 animate-in fade-in slide-in-from-top-2 mb-6">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-3">
          {students.map(s => (
            <div 
              key={s.id} 
              onClick={() => togglePresence(s.id)}
              className="bg-[#0C0C0C] border border-white/5 rounded-[32px] p-6 flex items-center justify-between group hover:border-white/10 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white font-black text-xl border border-white/5 transition-colors ${s.isPresent ? 'border-[#D8FF5B]/20 bg-[#D8FF5B]/5' : ''}`}>
                  {s.name[0]}
                </div>
                <div>
                  <h4 className="text-[18px] font-bold text-white tracking-tight leading-none">{s.name}</h4>
                  <span className={`text-[10px] font-black uppercase tracking-widest mt-2 block ${s.isPresent ? 'text-[#D8FF5B]' : 'text-rose-500'}`}>
                    {s.isPresent ? 'Present' : 'Absent'}
                  </span>
                </div>
              </div>
              
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${s.isPresent ? 'bg-[#D8FF5B] text-black shadow-lg shadow-[#D8FF5B]/10' : 'bg-black border border-white/10 text-[#222222]'}`}>
                {s.isPresent ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M6 18L18 6M6 6l12 12" /></svg>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-32 left-0 right-0 px-8 max-w-2xl mx-auto z-50">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`w-full h-16 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl ${
              saved ? 'bg-emerald-500 text-white' : 'bg-[#D8FF5B] text-black shadow-[#D8FF5B]/20'
            }`}
          >
            {saving ? (
              <>
                <div className="w-6 h-6 border-4 border-black/10 border-t-black rounded-full animate-spin" />
                <span className="text-sm uppercase tracking-widest">Saving...</span>
              </>
            ) : saved ? (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg>
                Attendance Saved
              </>
            ) : (
              'Save Attendance'
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-40 animate-in fade-in duration-500 px-1">
      <header>
        <h2 className="text-4xl font-extrabold text-white tracking-tight">Attendance</h2>
        <p className="text-[#888888] font-medium text-lg mt-1">Select a session to record presence.</p>
      </header>

      <div className="space-y-4">
        {sessions.length > 0 ? sessions.map(s => (
          <div 
            key={s.id}
            onClick={() => setSelectedSession(s.id)}
            className="bg-[#0C0C0C] border border-white/5 rounded-[44px] p-8 flex flex-col group hover:border-white/10 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest block mb-2">{s.time}</span>
                <h3 className="text-[28px] font-extrabold text-white tracking-tighter leading-none group-hover:text-[#D8FF5B] transition-colors">{s.subject}</h3>
              </div>
              <div className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                s.status === 'ONGOING' ? 'bg-[#D8FF5B]/10 text-[#D8FF5B] border-[#D8FF5B]/20 animate-pulse' : 'bg-white/5 text-[#555555] border-white/10'
              }`}>
                {s.status}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-[#333333] group-hover:text-white transition-colors">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Open Attendance Sheet</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>
        )) : (
          <EmptyState 
            title="No sessions scheduled" 
            subtitle="Your timetable for today appears to be empty."
            icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
        )}
      </div>
    </div>
  );
};

export default AttendanceView;
