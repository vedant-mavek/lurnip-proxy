
import React, { useState, useMemo } from 'react';
import FileUpload from '../../components/FileUpload';
import { csvParser } from '../../utils/csvParser';

interface ValidationError {
  row: number;
  column: string;
  message: string;
}

const ImportUsersView: React.FC = () => {
  const [importType, setImportType] = useState<'STUDENT' | 'TEACHER'>('STUDENT');
  const [step, setStep] = useState<'UPLOAD' | 'PREVIEW' | 'SUCCESS'>('UPLOAD');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [totalRowCount, setTotalRowCount] = useState(0);

  const validateRows = (rows: any[], type: 'STUDENT' | 'TEACHER'): ValidationError[] => {
    const errors: ValidationError[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    rows.forEach((row, index) => {
      // Keys are derived from headers in csvParser: trimmed, lowercase, replace spaces with _
      const email = row.email || row.email_address;
      const name = row.name || row.full_name;
      const batch = row.batch || row.batch_id || row.class;

      if (!name) errors.push({ row: index, column: 'name', message: 'Name is required' });
      if (!email) {
        errors.push({ row: index, column: 'email', message: 'Email is required' });
      } else if (!emailRegex.test(email)) {
        errors.push({ row: index, column: 'email', message: 'Invalid email format' });
      }

      if (type === 'STUDENT' && !batch) {
        errors.push({ row: index, column: 'batch', message: 'Batch is required for students' });
      }
    });

    return errors;
  };

  const validationErrors = useMemo(() => validateRows(parsedRows, importType), [parsedRows, importType]);
  const hasErrors = validationErrors.length > 0;

  const handleStartImport = async () => {
    if (!selectedFile) return;
    setIsValidating(true);
    setError(null);
    
    const result = await csvParser.parseFile(selectedFile);
    
    setTimeout(() => {
      setIsValidating(false);
      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.data && result.headers) {
        setTotalRowCount(result.data.length);
        setHeaders(result.headers);
        setParsedRows(result.data);
        setStep('PREVIEW');
      }
    }, 1000);
  };

  const handleSimulateConfirm = () => {
    if (hasErrors) return;
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setStep('SUCCESS');
    }, 2000);
  };

  const getCellError = (rowIndex: number, rawHeader: string) => {
    const key = rawHeader.trim().toLowerCase().replace(/[^a-z0-9_]/gi, '_');
    // Map specific column checks
    let columnMatch = key;
    if (key.includes('name')) columnMatch = 'name';
    if (key.includes('email')) columnMatch = 'email';
    if (key.includes('batch') || key.includes('class')) columnMatch = 'batch';

    return validationErrors.find(e => e.row === rowIndex && e.column === columnMatch);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 px-1">
      <header>
        <h2 className="text-5xl font-extrabold text-white tracking-tighter leading-none">Bulk Import</h2>
        <p className="text-[#888888] font-medium text-lg mt-4 tracking-tight">Onboard faculty and students via high-trust CSV sync.</p>
      </header>

      {step === 'UPLOAD' && (
        <div className="space-y-10">
          <div className="bg-[#121212] p-1.5 rounded-full flex gap-1 border border-white/5 w-fit">
            <button
              onClick={() => setImportType('STUDENT')}
              className={`px-10 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                importType === 'STUDENT' ? 'bg-white text-black' : 'text-[#555555] hover:text-white'
              }`}
            >
              Import Students
            </button>
            <button
              onClick={() => setImportType('TEACHER')}
              className={`px-10 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                importType === 'TEACHER' ? 'bg-white text-black' : 'text-[#555555] hover:text-white'
              }`}
            >
              Import Teachers
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <FileUpload 
              accept=".csv"
              maxSize={2 * 1024 * 1024}
              onFileSelect={(file) => { setSelectedFile(file); setError(null); }}
              selectedFile={selectedFile}
              error={error}
              placeholder="Drop your registry CSV here"
              className="h-[440px]"
              icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>}
            />

            {selectedFile && !isValidating && (
              <button 
                onClick={handleStartImport}
                className="w-full bg-[#D8FF5B] text-black h-20 rounded-[32px] font-black text-xl shadow-xl shadow-[#D8FF5B]/10 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                Analyze CSV Structure
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            )}

            {isValidating && (
              <div className="w-full h-20 bg-[#111111] rounded-[32px] flex items-center justify-center gap-3 border border-white/5 animate-in fade-in">
                <div className="w-6 h-6 border-4 border-black/10 border-t-[#D8FF5B] rounded-full animate-spin" />
                <span className="text-sm font-black text-[#D8FF5B] uppercase tracking-widest">Parsing Registry...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {step === 'PREVIEW' && (
        <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-500 relative">
           {isValidating && (
            <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-6 animate-in fade-in rounded-[44px]">
              <div className="w-20 h-20 border-8 border-white/5 border-t-[#D8FF5B] rounded-full animate-spin" />
              <span className="text-[11px] font-black text-[#D8FF5B] uppercase tracking-[0.3em] animate-pulse">Syncing Records...</span>
            </div>
           )}

           <div className="bg-[#0C0C0C] rounded-[44px] border border-white/5 overflow-hidden">
             <header className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                   <h3 className="text-3xl font-black text-white tracking-tight">File Preview</h3>
                   <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">{totalRowCount} total entries detected</p>
                   {hasErrors && (
                     <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-2 flex items-center gap-2">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                       {validationErrors.length} validation errors found. Please correct your CSV.
                     </p>
                   )}
                </div>
                <div className="flex gap-4">
                   <button onClick={() => { setStep('UPLOAD'); setSelectedFile(null); }} className="px-8 h-14 rounded-2xl text-[11px] font-black text-[#555555] hover:text-white uppercase tracking-widest transition-colors">Discard</button>
                   <button 
                    onClick={handleSimulateConfirm} 
                    disabled={hasErrors}
                    className={`px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${hasErrors ? 'bg-[#222222] text-[#444444] cursor-not-allowed' : 'bg-[#D8FF5B] text-black shadow-xl shadow-[#D8FF5B]/10 active:scale-95'}`}
                   >
                     Confirm Import
                   </button>
                </div>
             </header>
             <div className="p-10 overflow-x-auto no-scrollbar">
                <table className="w-full text-left">
                   <thead>
                      <tr className="border-b border-white/5">
                        {headers.map((col, i) => (
                          <th key={i} className="pb-6 text-[10px] font-black text-[#444444] uppercase tracking-widest pr-8">{col}</th>
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
                               <td key={j} className={`py-6 whitespace-nowrap pr-8 relative ${j === 0 ? 'font-extrabold text-lg' : 'font-medium'}`}>
                                 <span className={cellError ? 'text-rose-500' : 'text-white'}>
                                   {cellValue || <span className="opacity-20 italic">Empty</span>}
                                 </span>
                                 {cellError && (
                                   <div className="absolute top-1/2 -translate-y-1/2 left-full -ml-6 w-max bg-rose-500 text-white text-[8px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                     {cellError.message}
                                   </div>
                                 )}
                               </td>
                             );
                           })}
                        </tr>
                      ))}
                      {totalRowCount > 5 && (
                        <tr>
                          <td colSpan={headers.length} className="py-6 text-[10px] font-black text-[#333333] uppercase tracking-[0.3em] text-center bg-black/20">
                            + {totalRowCount - 5} more records identified
                          </td>
                        </tr>
                      )}
                   </tbody>
                </table>
             </div>
           </div>
        </div>
      )}

      {step === 'SUCCESS' && (
        <div className="h-[600px] flex flex-col items-center justify-center gap-12 animate-in zoom-in-95 duration-500">
           <div className="relative">
              <div className="absolute inset-0 bg-[#D8FF5B] rounded-[40px] blur-[60px] opacity-20 animate-pulse" />
              <div className="relative w-32 h-32 bg-[#D8FF5B] text-black rounded-[40px] flex items-center justify-center shadow-2xl">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg>
              </div>
           </div>
           <div className="text-center space-y-4 px-6">
              <h3 className="text-5xl font-black text-white tracking-tighter">Sync Successful</h3>
              <p className="text-[#888888] font-medium text-xl max-w-sm mx-auto leading-relaxed">{totalRowCount} users have been added to the institutional repository and assigned to their batches.</p>
           </div>
           <button 
            onClick={() => { setStep('UPLOAD'); setSelectedFile(null); setParsedRows([]); setTotalRowCount(0); }}
            className="bg-[#111111] text-white h-16 px-12 rounded-[24px] font-black text-lg border border-white/5 hover:border-white/10 active:scale-95 transition-all shadow-xl"
           >
            Back to Sync Room
           </button>
        </div>
      )}
    </div>
  );
};

export default ImportUsersView;
