
import React, { useState, useEffect } from 'react';
import { teacherService } from '../../services/teacherService';

type ViewMode = 'day' | 'week';
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

interface TeacherTimetableViewProps {
  batchId: string;
  teacherId: string;
}

const TeacherTimetableView: React.FC<TeacherTimetableViewProps> = ({ batchId, teacherId }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const [activeDay, setActiveDay] = useState<string>('Mon');
  const [schedule, setSchedule] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      const { data } = await teacherService.getSchedule(teacherId);
      if (data) setSchedule(data);
      setLoading(false);
    };
    fetchSchedule();
  }, [teacherId]);

  const renderDayView = () => {
    const slots = schedule[activeDay] || [];
    return (
      <div className="relative space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="absolute left-6 top-4 bottom-4 w-px bg-white/5" />
        {slots.map((item: any, idx: number) => (
          <div key={idx} className="relative flex items-start gap-8 group">
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

              <div className={`flex-1 bg-[#0C0C0C] p-8 rounded-[32px] border transition-all duration-300 ${
                item.status === 'ACTIVE' ? 'border-[#D8FF5B]/30 shadow-2xl' : 'border-white/5 opacity-80'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                    item.status === 'ACTIVE' ? 'text-[#D8FF5B]' : 'text-[#555555]'
                  }`}>{item.time}</span>
                  <span className="text-[10px] font-black text-black bg-[#D8FF5B] px-3 py-1 rounded-full uppercase tracking-widest">{item.batch}</span>
                </div>
                <h4 className="text-2xl font-extrabold text-white tracking-tight">{item.subject}</h4>
                <div className="text-sm text-[#555555] font-black uppercase tracking-wider mt-1">{item.type} • Room {item.room}</div>
              </div>
          </div>
        ))}
        {!loading && slots.length === 0 && (
          <div className="py-20 text-center text-[#333333] font-black uppercase tracking-widest border border-dashed border-white/5 rounded-[32px]">No Sessions Scheduled</div>
        )}
      </div>
    );
  };

  const renderWeekView = () => {
    return (
      <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
        {DAYS.map((day) => {
          const daySchedule = schedule[day] || [];
          return (
            <div key={day} className="bg-[#0C0C0C] rounded-[32px] p-6 border border-white/5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="md:w-24 shrink-0">
                <span className="text-xl font-black text-white">{day}</span>
                <p className="text-[10px] font-bold text-[#555555] uppercase tracking-widest mt-0.5">Oct {24 + DAYS.indexOf(day)}</p>
              </div>
              <div className="flex flex-wrap gap-3 flex-1">
                {daySchedule.map((slot: any, i: number) => (
                  <div key={i} className={`px-5 py-4 rounded-2xl border transition-colors ${
                    slot.status === 'ACTIVE' ? 'bg-[#D8FF5B] border-[#D8FF5B]' : 'bg-black/50 border-white/5'
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
                    <div className={`text-[8px] font-black uppercase mt-1 ${
                      slot.status === 'ACTIVE' ? 'text-black/40' : 'text-[#333333]'
                    }`}>
                      {slot.batch}
                    </div>
                  </div>
                ))}
                {daySchedule.length === 0 && (
                  <span className="text-[10px] font-black text-[#222222] uppercase tracking-widest self-center">Free Day</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-[#D8FF5B]/10 border-t-[#D8FF5B] rounded-full animate-spin mb-4" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-40 animate-in fade-in duration-500">
      <header className="px-1 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Schedule</h2>
          <p className="text-[#888888] font-medium text-lg mt-1">Institutional academic commitments.</p>
        </div>

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

      {viewMode === 'day' && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 px-1">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`min-w-[80px] h-14 rounded-2xl flex flex-col items-center justify-center transition-all border ${
                activeDay === day ? 'bg-[#121212] border-[#D8FF5B] text-[#D8FF5B]' : 'bg-[#121212] border-white/5 text-[#555555] hover:border-white/20'
              }`}
            >
              <span className="text-xs font-black uppercase tracking-widest">{day}</span>
              <span className="text-[9px] font-bold opacity-60">{24 + DAYS.indexOf(day)}th</span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 px-1">
        {viewMode === 'day' ? renderDayView() : renderWeekView()}
      </div>
    </div>
  );
};

export default TeacherTimetableView;
