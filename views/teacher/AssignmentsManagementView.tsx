
import React, { useState } from 'react';
import FileUpload from '../../components/FileUpload';
import Modal from '../../components/Modal';

interface AssignmentsManagementViewProps {
  batchId: string;
  onBack: () => void;
}

interface StudentAssignmentStatus {
  id: string;
  name: string;
  status: 'PENDING' | 'SUBMITTED' | 'EVALUATED' | 'LATE';
}

const AssignmentsManagementView: React.FC<AssignmentsManagementViewProps> = ({ batchId, onBack }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const [studentStatuses, setStudentStatuses] = useState<StudentAssignmentStatus[]>([
    { id: 'st1', name: 'Alex Rivera', status: 'EVALUATED' },
    { id: 'st2', name: 'Sarah Jenkins', status: 'SUBMITTED' },
    { id: 'st3', name: 'David Chen', status: 'PENDING' },
    { id: 'st4', name: 'Elena Rodriguez', status: 'SUBMITTED' },
    { id: 'st5', name: 'Marcus Thompson', status: 'PENDING' },
    { id: 'st6', name: 'Chloe Kim', status: 'LATE' },
  ]);

  const handleStatusChange = (studentId: string, newStatus: StudentAssignmentStatus['status']) => {
    setStudentStatuses(prev => prev.map(s => s.id === studentId ? { ...s, status: newStatus } : s));
  };

  const handleUploadAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentTitle) return;
    setIsUploading(true);
    setSubmissionError(null);
    
    setTimeout(() => {
      if (Math.random() < 0.05) {
        setSubmissionError('Upload failed. Institutional storage capacity reached.');
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
      setShowUploadModal(false);
      setAssignmentTitle('');
      setAssignmentDescription('');
      setSelectedFile(null);
    }, 2000);
  };

  return (
    <div className="space-y-10 pb-40 animate-in fade-in duration-500 px-1">
      <header className="flex flex-col gap-6">
        <button 
          onClick={onBack} 
          className="flex items-center text-xs font-black text-[#555555] hover:text-white uppercase tracking-[0.2em] transition-colors group w-fit h-10"
        >
          <svg className="w-4 h-4 mr-2.5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back to Home
        </button>
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">Manage Assignments</h2>
            <p className="text-[#888888] font-medium text-lg mt-1">Batch 2024 Section A • Macroeconomics</p>
          </div>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="w-full sm:w-auto bg-[#D8FF5B] text-black h-14 px-8 rounded-[20px] font-black text-sm uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-[#D8FF5B]/10 flex items-center justify-center gap-2 shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M12 4v16m8-8H4"/></svg>
            Upload New
          </button>
        </div>
      </header>

      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-[#444444] uppercase tracking-[0.3em] px-2 mb-2">Student Assignment Tracker</h3>
        <div className="grid grid-cols-1 gap-3">
          {studentStatuses.map((s) => (
            <div key={s.id} className="bg-[#0C0C0C] border border-white/5 rounded-[32px] p-6 flex items-center justify-between group hover:border-white/10 transition-all">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white font-black text-lg">
                  {s.name[0]}
                </div>
                <div>
                  <h4 className="text-[17px] font-bold text-white tracking-tight leading-none">{s.name}</h4>
                  <p className="text-[9px] font-black text-[#444444] uppercase tracking-widest mt-1.5">Reg ID: {s.id.toUpperCase()}</p>
                </div>
              </div>

              <div className="relative group">
                <select
                  value={s.status}
                  onChange={(e) => handleStatusChange(s.id, e.target.value as any)}
                  className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border outline-none appearance-none cursor-pointer transition-all min-h-[44px] ${
                    s.status === 'EVALUATED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                    s.status === 'SUBMITTED' ? 'bg-[#D8FF5B]/10 text-[#D8FF5B] border-[#D8FF5B]/20' :
                    s.status === 'LATE' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                    'bg-[#121212] text-[#555555] border-white/5'
                  }`}
                >
                  <option value="PENDING">Pending</option>
                  <option value="SUBMITTED">Submitted</option>
                  <option value="EVALUATED">Evaluated</option>
                  <option value="LATE">Late</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Modal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)}
        title="New Assignment"
        subtitle="Define a new task for Macroeconomics."
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleUploadAssignment} className="space-y-6">
          <div className="bg-[#121212] rounded-[24px] px-6 py-5 flex flex-col border border-white/5 focus-within:border-[#D8FF5B]/30 transition-all min-h-[96px]">
            <label htmlFor="assignment-title" className="text-[9px] font-black text-[#555555] uppercase tracking-widest mb-2">Assignment Title</label>
            <input 
              id="assignment-title"
              type="text" 
              required
              value={assignmentTitle}
              onChange={(e) => { setAssignmentTitle(e.target.value); setSubmissionError(null); }}
              placeholder="Market Equilibrium Analysis..." 
              className="bg-transparent border-none text-white text-base sm:text-lg font-extrabold outline-none placeholder:text-[#333333]" 
            />
          </div>
          <div className="bg-[#121212] rounded-[24px] px-6 py-5 flex flex-col border border-white/5 focus-within:border-[#D8FF5B]/30 transition-all min-h-[160px]">
            <label htmlFor="assignment-desc" className="text-[9px] font-black text-[#555555] uppercase tracking-widest mb-2">Instructions</label>
            <textarea 
              id="assignment-desc"
              required
              value={assignmentDescription}
              onChange={(e) => { setAssignmentDescription(e.target.value); setSubmissionError(null); }}
              rows={4}
              placeholder="Summarize the circular flow model and its impact..." 
              className="bg-transparent border-none text-white text-base font-medium outline-none placeholder:text-[#333333] resize-none no-scrollbar" 
            />
          </div>

          <FileUpload 
            accept="application/pdf,.doc,.docx"
            maxSize={15 * 1024 * 1024}
            onFileSelect={(file) => { setSelectedFile(file); setSubmissionError(null); }}
            selectedFile={selectedFile}
            error={submissionError}
            placeholder="Attach PDF/DOC (Max 15MB)"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button type="button" onClick={() => setShowUploadModal(false)} className="order-2 sm:order-1 h-16 font-black text-[#555555] hover:text-white uppercase tracking-widest transition-colors text-sm">Discard</button>
            <button 
              type="submit"
              disabled={isUploading || !assignmentTitle}
              className="order-1 sm:order-2 flex-1 bg-[#D8FF5B] text-black h-16 rounded-[24px] font-black text-lg active:scale-95 transition-all disabled:opacity-20 flex items-center justify-center gap-3"
            >
              {isUploading ? (
                <>
                  <div className="w-6 h-6 border-4 border-black/10 border-t-black rounded-full animate-spin" />
                  <span className="text-sm uppercase font-black">Uploading...</span>
                </>
              ) : (
                <>
                  Broadcast
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AssignmentsManagementView;
