
import React, { useState, useMemo } from 'react';
import FileUpload from '../../components/FileUpload';
import { csvParser } from '../../utils/csvParser';

interface TimetableError {
  row: number;
  column: string;
  message: string;
}

const TimetableManagementView: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [hasPreview, setHasPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBatch, setSelectedBatch] = useState('ALL');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [totalRowCount, setTotalRowCount] = useState(0);

  const batches = [
    { id: 'b1', name: 'BSCS-2024-A' },
    { id: 'b2', name: 'BSCS-2024-B' },
    { id: 'b3', name: 'PRE-ENG-2024' },
  ];

  const validateTimetable = (rows: any[]): TimetableError[] => {
    const errors: TimetableError[] = [];
    rows.forEach((row, index) => {
      // Keys derived from csvParser mapping
      const batch = row.batch || row.batch_id;
      const day = row.day || row.day_of_week;
      const time = row.time || row.start_time;
      const subject = row.subject || row.course;

      if (!batch) errors.push({ row: index, column: 'batch', message: 'Batch is required' });
      if (!day) errors.push({ row: index, column: 'day', message: 'Day is required' });
      if (!time) errors.push({ row: index, column: 'time', message: 'Time is required' });
      if (!subject) errors.push({ row: index, column: 'subject', message: 'Subject is required' });
    });
    return errors;
  };

  const validationErrors = useMemo(() => validateTimetable(parsedRows), [parsedRows]);
  const hasErrors = validationErrors.length > 0;

  const handleStartValidation = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);
    
    const result = await csvParser.parseFile(selectedFile);
    
    setTimeout(() => {
      setIsUploading(false);
      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.data && result.headers) {
        setTotalRowCount(result.data.length);
        setHeaders(result.headers);
        setParsedRows(result.data);
        setHasPreview(true);
      }
    }, 1500);
  };

  const handleConfirmReplacement = () => {
    if (hasErrors) return;
    setHasPreview(false);
    setSelectedFile(null);
    setParsedRows([]);
    setTotalRowCount(0);
    setSuccessMsg('Active Schedule Updated Successfully');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const getCellError = (rowIndex: number, rawHeader: string) => {
    const key = rawHeader.trim().toLowerCase().replace(/[^a-z0-9_]/gi, '_');
    let columnMatch = key;
    if (key.includes('batch')) columnMatch = 'batch';
    if (key.includes('day')) columnMatch = 'day';
    if (key.includes('time')) columnMatch = 'time';
    if (key.includes('subject') || key.includes('course')) columnMatch = 'subject';

    return validationErrors.find(e => e.row === rowIndex && e.column === columnMatch);
  };

  return (
    <div className="space-y-10 md:space-y-12 animate-in fade-in duration-700 relative">
      {successMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-emerald-500/10 border border-emerald-500/20 rounded-full px-8 md:px-10 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 shadow-2xl backdrop-blur-md whitespace-nowrap">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
          <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">{successMsg}</span>
        </div>
      )}

      <header>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter leading-none text-center md:text-left">Master Schedule</h2>
        <p className="text-[#888888] font-medium text-base md:text-lg mt-3 md:mt-4 tracking-tight text-center md:text-left">Upload schedules to drive sessions and attendance.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
           <div className="bg-[#0C0C0C] border border-white/5 rounded-[28px] md:rounded-[32px] p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all">
             <div className="overflow-hidden">
                <label className="text-[10px] font-black text-[#555555] uppercase tracking-widest mb-1.5 block">Target Batch</label>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight truncate">Specify recipient batch</h3>
             </div>
             <div className="relative min-w-full sm:min-w-[240px]">
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="w-full h-12 md:h-14 bg-[#111111] border border-white/5 rounded-2xl px-5 pr-10 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white outline-none appearance-none cursor-pointer focus:border-[#D8FF5B]/30 transition-all shadow-inner"
                >
                  <option value="ALL">Institutional (Global)</option>
                  {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#555555]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M19 9l-7 7-7-7" /></svg>
                </div>
             </div>
           </div>

           <FileUpload 
              accept=".csv"
              maxSize={2 * 1024 * 1024}
              onFileSelect={(file) => { setSelectedFile(file); setHasPreview(false); setError(null); }}
              selectedFile={selectedFile}
              error={error}
              placeholder="Upload Schedule CSV"
              className="min-h-[300px]"
              icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
           />

           {selectedFile && !hasPreview && !isUploading && (
             <button 
              onClick={handleStartValidation}
              className="w-full bg-[#D8FF5B] text-black h-16 rounded-[24px] font-black text-xl shadow-xl shadow-[#D8FF5B]/10 active:scale-95 transition-all flex items-center justify-center gap-3"
             >
                Process Schedule Data
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
             </button>
           )}

           {isUploading && (
             <div className="w-full h-16 bg-[#111111] rounded-[24px] flex items-center justify-center gap-3 border border-white/5 animate-in fade-in">
               <div className="w-6 h-6 border-4 border-black/10 border-t-[#D8FF5B] rounded-full animate-spin" />
               <span className="text-sm font-black text-[#D8FF5B] uppercase tracking-widest">Validating Schema...</span>
             </div>
           )}

           {hasPreview && (
             <div className="bg-[#0C0C0C] rounded-[32px] md:rounded-[44px] border border-white/5 p-6 md:p-10 animate-in slide-in-from-bottom-8 duration-500 overflow-hidden">
               <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 gap-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-none">Schedule Preview</h3>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-2">{totalRowCount} total slots found</p>
                    {hasErrors && (
                      <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-2 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        {validationErrors.length} issues detected.
                      </p>
                    )}
                  </div>
                  <button 
                    onClick={handleConfirmReplacement} 
                    disabled={hasErrors}
                    className={`w-full md:w-auto h-12 md:h-14 px-6 md:px-8 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${hasErrors ? 'bg-[#222222] text-[#444444] cursor-not-allowed' : 'bg-[#D8FF5B] text-black shadow-xl shadow-[#D8FF5B]/10 active:scale-95'}`}
                  >
                    Apply Schedule
                  </button>
               </div>
               
               <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left">
                   <thead>
                      <tr className="border-b border-white/5">
                        {headers.map((col, i) => (
                          <th key={i} className="pb-6 text-[10px] font-black text-[#444444] uppercase tracking-widest pr-8 whitespace-nowrap">{col}</th>
                        ))}
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {parsedRows.slice(0, 5).map((row, i) => (
                        <tr key={i} className="group hover:bg-white/[0.01] transition-colors">
                           {headers.map((h, j) => {
                             const key = h.trim().toLowerCase().replace(/[^a-z0-9_]/gi, '_');
                             const cellValue = row[key];
                             const cellError = getCellError(i, h);
                             return (
                               <td key={j} className="py-5 whitespace-nowrap pr-8 relative">
                                 <span className={`text-sm font-bold ${cellError ? 'text-rose-500' : 'text-white/80'}`}>
                                   {cellValue || <span className="opacity-20 italic">Missing</span>}
                                 </span>
                               </td>
                             );
                           })}
                        </tr>
                      ))}
                      {totalRowCount > 5 && (
                        <tr>
                          <td colSpan={headers.length} className="py-6 text-[10px] font-black text-[#333333] uppercase tracking-[0.3em] text-center">
                            + {totalRowCount - 5} additional entries hidden
                          </td>
                        </tr>
                      )}
                   </tbody>
                </table>
               </div>
             </div>
           )}
        </div>

        <div className="space-y-6 md:space-y-8">
           <div className="bg-blue-500/5 border border-blue-500/10 rounded-[32px] md:rounded-[44px] p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
              <h3 className="text-xl md:text-2xl font-black text-white mb-6 tracking-tight leading-none">Schedule Rules</h3>
              <div className="space-y-4 md:space-y-6">
                 {[
                   'Teachers must be mapped to subjects.',
                   'Batch IDs must exist in registry.',
                   'Time slots allocated in 60m blocks.'
                 ].map((rule, i) => (
                   <div key={i} className="flex gap-4 items-start">
                      <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      </div>
                      <p className="text-sm md:text-[15px] font-medium text-[#888888] leading-relaxed">{rule}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-[#0C0C0C] border border-white/5 rounded-[32px] md:rounded-[44px] p-8 md:p-10 flex flex-col items-center justify-center gap-6">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#111111] rounded-2xl flex items-center justify-center text-[#444444] shadow-inner shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </div>
              <div className="text-center">
                 <h4 className="text-lg md:text-xl font-extrabold text-white tracking-tight leading-none">CSV Template</h4>
                 <p className="text-[8px] md:text-[9px] font-black text-[#444444] uppercase tracking-widest mt-1.5">DOWNLOAD STRUCTURE</p>
              </div>
              <button className="w-full h-12 md:h-14 bg-[#111111] border border-white/5 rounded-2xl text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/5 transition-all shadow-md active:scale-95 whitespace-nowrap">
                DOWNLOAD .CSV
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableManagementView;
