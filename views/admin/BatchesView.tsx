
import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Batch, Sector } from '../../types';
import Modal from '../../components/Modal';

const MOCK_TEACHERS = [
  { id: 't1', name: 'Dr. Sarah Smith', department: 'CS' },
  { id: 't2', name: 'Prof. James Wilson', department: 'Math' },
  { id: 't3', name: 'Dr. Emily Watson', department: 'CS' },
  { id: 't4', name: 'Prof. Michael Brown', department: 'Economics' },
];

const EmptyState: React.FC<{ title: string; subtitle: string; icon: React.ReactNode }> = ({ title, subtitle, icon }) => (
  <div className="py-24 md:py-32 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
    <div className="w-20 h-20 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-[#222222] mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-[#444444] tracking-tight">{title}</h3>
    <p className="text-[#333333] font-medium mt-1">{subtitle}</p>
  </div>
);

const BatchesView: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isMapping, setIsMapping] = useState<string | null>(null);
  const [assigningTo, setAssigningTo] = useState<{ subject: string; currentTeacher: string } | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal Form State
  const [newBatchName, setNewBatchName] = useState('');
  const [newBatchYear, setNewBatchYear] = useState('');
  const [modalErrors, setModalErrors] = useState<{ name?: string; year?: string; form?: string }>({});

  const isFormValid = newBatchName.trim().length > 0;

  const [currentMappings, setCurrentMappings] = useState([
    { subject: 'Data Structures', teacher: 'Dr. Sarah Smith', status: 'STABLE' },
    { subject: 'Calculus II', teacher: 'Prof. James Wilson', status: 'STABLE' },
    { subject: 'Operating Systems', teacher: 'Unassigned', status: 'ALERT' }
  ]);

  useEffect(() => {
    const fetchBatches = async () => {
      setLoading(true);
      const { data } = await adminService.getBatches();
      if (data) setBatches(data);
      setLoading(false);
    };
    fetchBatches();
  }, []);

  const handleAddBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setModalErrors({ name: 'Batch name is required' });
      return;
    }
    
    setIsCreating(true);
    setModalErrors({});
    const { data, error } = await adminService.createBatch(newBatchName, newBatchYear || '2024', 'Standard Program', Sector.UNIVERSITY);
    
    setIsCreating(false);
    if (data) {
      setBatches([data, ...batches]);
      setShowModal(false);
      setNewBatchName('');
      setNewBatchYear('');
      setModalErrors({});
      setSuccessMessage('New Batch Created Successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } else if (error) {
      setModalErrors({ form: error.message || 'Failed to create batch' });
    }
  };

  const handleAssignTeacher = async (teacherName: string) => {
    if (!assigningTo || !isMapping) return;
    
    const { data } = await adminService.assignTeacher(isMapping, assigningTo.subject, 'mock-t-id');
    if (data) {
      setCurrentMappings(prev => prev.map(m => 
        m.subject === assigningTo.subject 
          ? { ...m, teacher: teacherName, status: 'STABLE' } 
          : m
      ));
      setAssigningTo(null);
    }
  };

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-[#D8FF5B]/10 border-t-[#D8FF5B] rounded-full animate-spin mb-4" />
      </div>
    );
  }

  if (isMapping) {
    return (
      <div className="space-y-8 md:space-y-12 animate-in slide-in-from-right-8 duration-500">
        <button 
          onClick={() => setIsMapping(null)} 
          className="flex items-center text-xs font-black text-[#555555] hover:text-white uppercase tracking-[0.2em] transition-colors group h-10"
        >
          <svg className="w-4 h-4 mr-2.5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back to Batches
        </button>
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter leading-none">Manage Mapping</h2>
            <p className="text-[#888888] font-medium text-base md:text-lg mt-3 tracking-tight">Mapping faculty and subjects for <span className="text-white font-bold">"{batches.find(b => b.id === isMapping)?.name}"</span>.</p>
          </div>
          <button className="h-14 px-6 md:px-8 bg-white/5 border border-white/10 rounded-2xl text-[10px] md:text-[11px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export Sheet
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-20">
           {currentMappings.length > 0 ? currentMappings.map((map, i) => (
             <div key={i} className="bg-[#0C0C0C] border border-white/5 rounded-[32px] p-6 md:p-8 flex flex-col justify-between group hover:border-white/10 transition-all">
                <div className="flex items-start justify-between mb-6 md:mb-8">
                  <div>
                     <span className="text-[9px] md:text-[10px] font-black text-[#555555] uppercase tracking-widest block mb-2">Subject Mapping</span>
                     <h4 className="text-xl md:text-2xl font-black text-white tracking-tight leading-none mb-3 truncate">{map.subject}</h4>
                     <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-xs md:text-sm font-black transition-all ${map.status === 'ALERT' ? 'bg-rose-500/10 text-rose-500' : 'bg-[#D8FF5B]/10 text-[#D8FF5B]'}`}>
                          {map.teacher === 'Unassigned' ? '?' : map.teacher[0]}
                        </div>
                        <span className={`text-sm md:text-base font-bold transition-colors ${map.status === 'ALERT' ? 'text-rose-500' : 'text-[#888888]'}`}>{map.teacher}</span>
                     </div>
                  </div>
                  {map.status === 'ALERT' && (
                    <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse shadow-[0_0_10px_#f43f5e]" />
                  )}
                </div>
                
                <button 
                  onClick={() => setAssigningTo({ subject: map.subject, currentTeacher: map.teacher })}
                  className={`w-full h-14 rounded-2xl flex items-center justify-center gap-2 text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all ${
                    map.status === 'ALERT' 
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' 
                      : 'bg-[#1a1a1a] text-[#666666] hover:bg-[#222222] hover:text-white'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                  {map.teacher === 'Unassigned' ? 'Assign Faculty' : 'Change Assignment'}
                </button>
             </div>
           )) : (
             <EmptyState 
               title="No mappings defined" 
               subtitle="This batch currently has no faculty or subjects assigned."
               icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>}
             />
           )}
           <button className="bg-black border border-dashed border-white/10 rounded-[32px] p-6 md:p-8 min-h-[180px] md:min-h-[220px] flex flex-col items-center justify-center gap-4 text-[#333333] hover:text-white hover:border-[#D8FF5B]/30 transition-all group active:scale-[0.98]">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-dashed border-[#222222] flex items-center justify-center transition-colors group-hover:border-white/20">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M12 4v16m8-8H4" /></svg>
              </div>
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">Add Mapping</span>
           </button>
        </div>

        {/* Assign Teacher Modal */}
        <Modal
          isOpen={!!assigningTo}
          onClose={() => setAssigningTo(null)}
          title="Assign Faculty"
          subtitle={assigningTo ? `Selecting for: ${assigningTo.subject}` : ''}
          maxWidth="max-w-lg"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-black text-[#444444] uppercase tracking-[0.3em] block px-2">Available Faculty</span>
            <div className="space-y-3 pr-1">
              {MOCK_TEACHERS.map(teacher => (
                <button
                  key={teacher.id}
                  onClick={() => handleAssignTeacher(teacher.name)}
                  className={`w-full p-6 rounded-[24px] border flex items-center justify-between transition-all text-left min-h-[88px] ${
                    assigningTo?.currentTeacher === teacher.name 
                      ? 'bg-[#D8FF5B] border-[#D8FF5B] text-black' 
                      : 'bg-black border-white/5 text-white hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${assigningTo?.currentTeacher === teacher.name ? 'bg-black/10' : 'bg-[#1a1a1a] text-[#555555]'}`}>
                      {teacher.name[0]}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-extrabold leading-tight truncate text-base">{teacher.name}</div>
                      <div className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest mt-1.5 truncate ${assigningTo?.currentTeacher === teacher.name ? 'text-black/60' : 'text-[#444444]'}`}>
                        Dept: {teacher.department}
                      </div>
                    </div>
                  </div>
                  {assigningTo?.currentTeacher === teacher.name && (
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}><path d="M5 13l4 4L19 7" /></svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 md:mt-10 pt-6 border-t border-white/5 text-center">
            <button 
              onClick={() => setAssigningTo(null)}
              className="text-[10px] font-black text-[#555555] uppercase tracking-widest hover:text-white transition-colors h-12 inline-flex items-center"
            >
              Cancel and Keep Current
            </button>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="space-y-10 md:space-y-12 animate-in fade-in duration-700 relative">
      {successMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[300] bg-emerald-500/10 border border-emerald-500/20 rounded-full px-8 md:px-10 py-3 flex items-center gap-3 shadow-2xl backdrop-blur-md animate-in slide-in-from-top-4 whitespace-nowrap">
           <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
           <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">{successMessage}</span>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-none">Batches</h2>
          <p className="text-[#888888] font-medium text-base md:text-lg mt-2 md:mt-4 tracking-tight">Academic structures and sections.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#D8FF5B] text-black h-16 px-6 md:px-10 rounded-[24px] font-black text-base md:text-lg active:scale-95 transition-all shadow-xl shadow-[#D8FF5B]/10 flex items-center justify-center gap-2 md:gap-3 shrink-0 w-full md:w-auto"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M12 4v16m8-8H4" /></svg>
          New Batch
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {batches.length > 0 ? batches.map(batch => (
          <div key={batch.id} className="bg-[#0C0C0C] border border-white/5 rounded-[44px] p-8 md:p-10 flex flex-col group hover:border-white/10 transition-all cursor-pointer relative overflow-hidden active:scale-[0.99]">
             <div className="flex items-start justify-between mb-8">
               <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none group-hover:text-[#D8FF5B] transition-colors truncate">{batch.name}</h3>
             </div>
             
             <div className="grid grid-cols-2 gap-3 md:gap-4 mt-auto">
                <div className="bg-black/50 rounded-2xl p-4 border border-white/5">
                   <span className="text-[9px] md:text-[10px] font-black text-[#444444] uppercase tracking-widest block mb-1">Students</span>
                   <span className="text-xl md:text-2xl font-black text-white">{batch.studentCount}</span>
                </div>
                <div className="bg-black/50 rounded-2xl p-4 border border-white/5">
                   <span className="text-[9px] md:text-[10px] font-black text-[#444444] uppercase tracking-widest block mb-1">Faculty</span>
                   <span className="text-xl md:text-2xl font-black text-white">{batch.teacherCount}</span>
                </div>
             </div>

             <button 
              onClick={(e) => { e.stopPropagation(); setIsMapping(batch.id); }}
              className="mt-8 w-full h-14 bg-white/5 rounded-2xl text-[10px] md:text-[11px] font-black text-white uppercase tracking-widest hover:bg-[#D8FF5B] hover:text-black transition-all whitespace-nowrap active:scale-95"
             >
                Manage Mapping
             </button>
          </div>
        )) : (
          <div className="col-span-full">
            <EmptyState 
              title="No batches found" 
              subtitle="Initialize your academic structure by creating your first batch."
              icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            />
          </div>
        )}
      </div>

      <Modal 
        isOpen={showModal} 
        onClose={() => { setShowModal(false); setModalErrors({}); }}
        title="Create New Batch"
        subtitle="Define academic structure and mapping workflow."
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleAddBatch} className="space-y-6">
          {modalErrors.form && (
            <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs font-bold text-rose-500 animate-in fade-in slide-in-from-top-2">
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>{modalErrors.form}</span>
            </div>
          )}
          <div className="space-y-4">
            <div className={`bg-[#121212] rounded-[32px] px-8 py-6 flex flex-col border transition-all min-h-[96px] ${modalErrors.name ? 'border-rose-500/50' : 'border-white/5 focus-within:border-[#D8FF5B]/30'}`}>
              <label htmlFor="new-batch-name" className="text-[9px] md:text-[10px] font-black text-[#555555] uppercase tracking-widest mb-2.5">Batch Name</label>
              <input 
                id="new-batch-name"
                type="text" 
                placeholder="BSCS-2025-A" 
                value={newBatchName}
                onChange={(e) => { setNewBatchName(e.target.value); setModalErrors({}); }}
                className="bg-transparent border-none text-base sm:text-xl font-extrabold text-white outline-none placeholder:text-[#333333]" 
              />
              {modalErrors.name && <span className="text-[10px] text-rose-500 font-bold mt-2 uppercase tracking-tight">{modalErrors.name}</span>}
            </div>
            <div className={`bg-[#121212] rounded-[32px] px-8 py-6 flex flex-col border transition-all border-white/5 focus-within:border-[#D8FF5B]/30 min-h-[96px]`}>
              <label htmlFor="new-batch-year" className="text-[9px] md:text-[10px] font-black text-[#555555] uppercase tracking-widest mb-2.5">Year / Level</label>
              <input 
                id="new-batch-year"
                type="text" 
                placeholder="1st Year" 
                value={newBatchYear}
                onChange={(e) => { setNewBatchYear(e.target.value); setModalErrors({}); }}
                className="bg-transparent border-none text-base sm:text-xl font-extrabold text-white outline-none placeholder:text-[#333333]" 
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button type="button" onClick={() => { setShowModal(false); setModalErrors({}); }} className="order-2 sm:order-1 h-16 md:h-20 font-black text-[#555555] hover:text-white uppercase tracking-widest transition-colors text-sm">Cancel</button>
            <button 
              type="submit" 
              disabled={isCreating || !isFormValid}
              className="order-1 sm:order-2 flex-1 bg-[#D8FF5B] text-black h-16 md:h-20 rounded-[32px] font-black text-lg md:text-xl shadow-xl shadow-[#D8FF5B]/10 active:scale-95 transition-all disabled:opacity-20 flex items-center justify-center gap-3"
            >
                {isCreating ? (
                <>
                  <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm uppercase tracking-widest">Saving...</span>
                </>
              ) : 'Create Batch'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BatchesView;
