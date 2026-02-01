import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { DataExport } from '../../types';

const DataExportsView: React.FC = () => {
  const [exports, setExports] = useState<DataExport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const fetchExports = async () => {
      setLoading(true);
      const { data } = await adminService.exportData(filterType, { start: startDate, end: endDate });
      if (data) setExports(data);
      setLoading(false);
    };
    fetchExports();
  }, [filterType, startDate, endDate]);

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-[#D8FF5B]/10 border-t-[#D8FF5B] rounded-full animate-spin mb-4" />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 px-1 flex flex-col min-h-full">
      <header className="space-y-4">
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Data Repository</h2>
        <div className="flex flex-wrap gap-3">
          <div className="bg-[#111111] border border-white/5 rounded-2xl px-4 py-2 flex items-center gap-3">
             <span className="text-[10px] font-black text-[#444444] uppercase tracking-widest">Type</span>
             <select 
               value={filterType}
               onChange={(e) => setFilterType(e.target.value)}
               className="bg-transparent text-white text-xs font-bold outline-none cursor-pointer"
             >
               <option value="ALL">All Reports</option>
               <option value="ATTENDANCE">Attendance</option>
               <option value="ASSIGNMENTS">Assignments</option>
             </select>
          </div>
        </div>
      </header>

      <div className="space-y-6 flex-1">
        {exports.map((exp) => (
          <div 
            key={exp.id}
            className="bg-[#0C0C0C] border border-white/5 rounded-[44px] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Top Content Area */}
            <div className="p-8 flex items-start gap-6">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border border-white/10 shrink-0 ${
                exp.type === 'ATTENDANCE' ? 'bg-blue-500/5 text-blue-500' : 'bg-pink-500/5 text-pink-500'
              }`}>
                {exp.type === 'ATTENDANCE' ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                )}
              </div>
              
              <div className="space-y-2 overflow-hidden">
                <h4 className="text-xl font-black text-white uppercase tracking-tighter truncate leading-none">{exp.title}</h4>
                <p className="text-xs font-black text-[#555555] uppercase tracking-widest">{exp.dateRange}</p>
                <div className="flex items-center gap-3 pt-1">
                  <span className="bg-[#1A1A1A] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">{exp.format}</span>
                  <span className="text-[10px] font-bold text-[#333333] uppercase">{exp.fileSize}</span>
                  <span className="text-[10px] font-bold text-[#333333] uppercase">GEN {exp.createdAt}</span>
                </div>
              </div>
            </div>

            {/* Bottom Button Area */}
            <div className="px-8 pb-8">
              <a 
                href={exp.downloadUrl}
                className="w-full bg-[#A3C644] hover:bg-[#b8d955] text-black h-16 rounded-[22px] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                Download
              </a>
            </div>
          </div>
        ))}
      </div>

      <footer className="pt-20 pb-12 text-center">
        <p className="text-[10px] font-black text-[#222222] uppercase tracking-[0.8em]">Secured Data Room</p>
      </footer>
    </div>
  );
};

export default DataExportsView;