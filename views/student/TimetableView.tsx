
import React, { useState } from 'react';

type ViewMode = 'day' | 'week';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const MOCK_SCHEDULE = {
  'Mon': [
    { time: '09:00 AM', subject: 'Calculus I', type: 'Lecture', room: '201', status: 'PAST' },
    { time: '10:00 AM', subject: 'Macroeconomics', type: 'Seminar', room: '402', status: 'ACTIVE' },
    { time: '12:00 PM', subject: 'Computer Science', type: 'Lab', room: 'B-Lab', status: 'UPCOMING' },
  ],
  'Tue': [
    { time: '09:00 AM', subject: 'English Lit', type: 'Lecture', room: 'Auditorium', status: 'UPCOMING' },
    { time: '11:00 AM', subject: 'Macroeconomics', type: 'Lecture', room: '402', status: 'UPCOMING' },
  ],
  'Wed': [
    { time: '10:00 AM', subject: 'Calculus I', type: 'Seminar', room: '201', status: 'UPCOMING' },
    { time: '02:00 PM', subject: 'Design Thinking', type: 'Workshop', room: 'Studio B', status: 'UPCOMING' },
  ],
  'Thu': [
    { time: '09:00 AM', subject: 'Computer Science', type: 'Lecture', room: 'B-Lab', status: 'UPCOMING' },
    { time: '01:00 PM', subject: 'English Lit', type: 'Seminar', room: 'Auditorium', status: 'UPCOMING' },
  ],
  'Fri': [
    { time: '11:00 AM', subject: 'Weekly Review', type: 'Mentorship', room: 'Online', status: 'UPCOMING' },
  ],
};

const TimetableView: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const [activeDay, setActiveDay] = useState<string>('Mon');

  const renderDayView = () => {
    const daySchedule = MOCK_SCHEDULE[activeDay as keyof typeof MOCK_SCHEDULE] || [];

    return (
      <div className="relative space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        {/* Timeline line */}
        <div className="absolute left-6 top-4 bottom-4 w-px bg-white/5" />

        {daySchedule.length > 0 ? (
          daySchedule.map((item, idx) => (
            <div key={idx} className={`relative flex items-start gap-8 group`}>
              {/* Timeline dot */}
              <div className={`z-10 w-12 h-12 rounded-2xl border-4 border-black flex items-center justify-center shrink-0 transition-all duration-500 ${
                item.status === 'ACTIVE' ? 'bg-[#D8FF5B] scale-110 shadow-[0_0_20px_#D8FF5B44]' : 
                item.status === 'PAST' ? 'bg-[#222222] opacity-40' : 'bg-[#121212] border-white/5'
              }`}>
                {item.status === 'ACTIVE' ? (
                  <div className="w-2.5 h-2.5 bg-black rounded-full animate-pulse" />
                ) : (
                  <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                )}
              </div>

              <div className={`flex-1 bg-[#121212] p-8 rounded-[32px] border transition-all duration-300 ${
                item.status === 'ACTIVE' ? 'border-[#D8FF5B]/30 shadow-2xl' : 'border-white/5 opacity-80'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                    item.status === 'ACTIVE' ? 'text-[#D8FF5B]' : 'text-[#555555]'
                  }`}>{item.time}</span>
                  <span className="text-[10px] font-black text-[#444444] uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Room {item.room}</span>
                </div>
                <h4 className="text-2xl font-extrabold text-white tracking-tight">{item.subject}</h4>
                <p className="text-sm text-[#555555] font-bold mt-1 uppercase tracking-wider">{item.type}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-[#555555] font-bold">No classes scheduled for today.</div>
        )}
      </div>
    );
  };

  const renderWeekView = () => {
    return (
      <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
        {DAYS.map((day) => {
          const daySchedule = MOCK_SCHEDULE[day as keyof typeof MOCK_SCHEDULE] || [];
          return (
            <div key={day} className="bg-[#121212] rounded-[32px] p-6 border border-white/5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="md:w-20 shrink-0">
                <span className="text-xl font-black text-white">{day}</span>
                <p className="text-[10px] font-bold text-[#555555] uppercase tracking-widest mt-0.5">Oct {24 + DAYS.indexOf(day)}</p>
              </div>
              
              <div className="flex flex-wrap gap-3 flex-1">
                {daySchedule.map((slot, i) => (
                  <div key={i} className={`px-5 py-4 rounded-2xl border transition-colors ${
                    slot.status === 'ACTIVE' ? 'bg-[#D8FF5B] border-[#D8FF5B]' : 'bg-black border-white/5'
                  }`}>
                    <div className={`text-[9px] font-black uppercase tracking-tighter mb-1 ${
                      slot.status === 'ACTIVE' ? 'text-black/60' : 'text-[#444444]'
                    }`}>
                      {slot.time}
                    </div>
                    <div className={`text-sm font-extrabold ${
                      slot.status === 'ACTIVE' ? 'text-black' : 'text-white'
                    }`}>
                      {slot.subject}
                    </div>
                  </div>
                ))}
                {daySchedule.length === 0 && (
                  <span className="text-xs font-bold text-[#333333] uppercase">No Sessions</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-10 pb-40 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Timetable</h2>
          <p className="text-[#888888] font-medium text-lg mt-1">
            {viewMode === 'day' ? `${activeDay}, Oct 24` : 'Full Week Overview'}
          </p>
        </div>

        {/* Mode Toggle Segmented Control */}
        <div className="bg-[#121212] p-1.5 rounded-full flex gap-1 border border-white/5 self-start md:self-auto">
          <button
            onClick={() => setViewMode('day')}
            className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              viewMode === 'day' ? 'bg-[#D8FF5B] text-black shadow-lg shadow-[#D8FF5B]/10' : 'text-[#555555] hover:text-white'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              viewMode === 'week' ? 'bg-[#D8FF5B] text-black shadow-lg shadow-[#D8FF5B]/10' : 'text-[#555555] hover:text-white'
            }`}
          >
            Week
          </button>
        </div>
      </header>

      {/* Day Selector - Only visible in Day mode */}
      {viewMode === 'day' && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`min-w-[70px] h-14 rounded-2xl flex flex-col items-center justify-center transition-all border ${
                activeDay === day ? 'bg-[#121212] border-[#D8FF5B] text-[#D8FF5B]' : 'bg-[#121212] border-white/5 text-[#555555] hover:border-white/20'
              }`}
            >
              <span className="text-sm font-black uppercase tracking-widest">{day}</span>
              <span className="text-[9px] font-bold opacity-60">24th</span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-8">
        {viewMode === 'day' ? renderDayView() : renderWeekView()}
      </div>
    </div>
  );
};

export default TimetableView;
