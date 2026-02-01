
import React, { useState } from 'react';
import FileUpload from '../../components/FileUpload';
import Modal from '../../components/Modal';

interface LessonData {
  id: string;
  title: string;
  status: 'PUBLISHED' | 'DRAFT';
  lessonContent?: string;
}

const TeacherCoursesView: React.FC<{ batchId: string }> = ({ batchId }) => {
  const [expandedCourse, setExpandedCourse] = useState<string | null>('c1');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonContent, setNewLessonContent] = useState('');
  const [selectedPDF, setSelectedPDF] = useState<File | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const courses = [
    { 
      id: 'c1', 
      name: 'Macroeconomics', 
      lessons: [
        { id: 'l1', title: 'Circular Flow Model', status: 'PUBLISHED' },
        { id: 'l2', title: 'Supply & Demand', status: 'PUBLISHED' },
        { id: 'l3', title: 'Market Equilibrium', status: 'DRAFT' },
      ] as LessonData[]
    },
    { id: 'c2', name: 'Microeconomics', lessons: [] },
  ];

  const handleAddLesson = () => {
    if (newLessonTitle) {
      setIsPublishing(true);
      setError(null);
      setTimeout(() => {
        if (Math.random() < 0.05) {
          setError('Failed to publish. Storage limit reached.');
          setIsPublishing(false);
          return;
        }
        setIsPublishing(false);
        setShowAddModal(false);
        setNewLessonTitle('');
        setNewLessonContent('');
        setSelectedPDF(null);
        setSuccessMsg('Lesson Published Successfully');
        setTimeout(() => setSuccessMsg(null), 3000);
      }, 1500);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 relative">
      {successMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-emerald-500/10 border border-emerald-500/20 rounded-full px-8 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 shadow-2xl backdrop-blur-md whitespace-nowrap">
          <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
          <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">{successMsg}</span>
        </div>
      )}

      <header>
        <h2 className="text-4xl font-extrabold text-white tracking-tight">Study Repository</h2>
        <p className="text-[#888888] font-medium text-lg mt-1">Manage curriculum and materials.</p>
      </header>

      <div className="space-y-4">
        {courses.map(course => (
          <div 
            key={course.id} 
            className="bg-[#0A0A0A] border border-white/5 rounded-[32px] md:rounded-[44px] overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
              className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-white/[0.02] transition-colors"
            >
              <div className="text-left">
                <h3 className={`text-xl md:text-2xl font-extrabold tracking-tight transition-colors ${expandedCourse === course.id ? 'text-[#D8FF5B]' : 'text-[#666666]'}`}>
                  {course.name}
                </h3>
                <p className="text-[9px] font-black text-[#444444] uppercase tracking-[0.2em] mt-1.5">{course.lessons.length} Lessons Active</p>
              </div>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/5 flex items-center justify-center transition-all duration-300 ${expandedCourse === course.id ? 'rotate-180 bg-white/5 text-white' : 'text-[#444444]'}`}>
                 <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M19 9l-7 7-7-7" /></svg>
              </div>
            </button>
            
            {expandedCourse === course.id && (
              <div className="p-6 md:p-8 pt-2 border-t border-white/5 bg-black/20 space-y-4">
                {course.lessons.map(lesson => (
                  <div key={lesson.id} className="flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-[20px] md:rounded-[24px] bg-[#141414] border border-white/5 hover:border-white/10 transition-all">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 ${lesson.status === 'PUBLISHED' ? 'bg-[#D8FF5B]/10 text-[#D8FF5B]' : 'bg-white/5 text-[#444444]'}`}>
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-sm md:text-[16px] font-bold text-white tracking-tight leading-tight truncate">{lesson.title}</h4>
                      <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-[#555555] mt-1.5 block">{lesson.status}</span>
                    </div>
                    <button className="text-[#333333] hover:text-white transition-colors shrink-0">
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                  </div>
                ))}
                
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="w-full h-14 md:h-16 rounded-[20px] md:rounded-[24px] border border-dashed border-white/10 flex items-center justify-center gap-3 text-[#555555] font-black text-xs md:text-sm uppercase tracking-widest hover:border-[#D8FF5B]/20 hover:text-white transition-all"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M12 4v16m8-8H4"/></svg>
                  New Lesson
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal 
        isOpen={showAddModal} 
        onClose={() => { setShowAddModal(false); setError(null); }}
        title="Create Lesson"
        subtitle="Upload core content to Macroeconomics."
        maxWidth="max-w-md"
      >
        <div className="space-y-6">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs font-bold text-rose-500 animate-in fade-in slide-in-from-top-2">
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>{error}</span>
            </div>
          )}
          <div className="bg-[#121212] rounded-[24px] px-6 py-5 flex flex-col border border-white/5 focus-within:border-[#D8FF5B]/30 transition-all min-h-[96px]">
            <label htmlFor="lesson-title" className="text-[9px] font-black text-[#555555] uppercase tracking-widest mb-1.5 md:mb-2">Lesson Title</label>
            <input 
              id="lesson-title"
              type="text" 
              value={newLessonTitle}
              onChange={(e) => { setNewLessonTitle(e.target.value); setError(null); }}
              placeholder="The multiplier effect..." 
              className="bg-transparent border-none text-white text-base sm:text-lg font-extrabold outline-none placeholder:text-[#333333]" 
            />
          </div>
          <div className="bg-[#121212] rounded-[24px] px-6 py-5 flex flex-col border border-white/5 focus-within:border-[#D8FF5B]/30 transition-all min-h-[160px]">
            <label htmlFor="lesson-content" className="text-[9px] font-black text-[#555555] uppercase tracking-widest mb-1.5 md:mb-2">Detailed Content</label>
            <textarea 
              id="lesson-content"
              value={newLessonContent}
              onChange={(e) => { setNewLessonContent(e.target.value); setError(null); }}
              rows={4}
              placeholder="Lesson text body..." 
              className="bg-transparent border-none text-white text-base font-medium outline-none placeholder:text-[#333333] resize-none no-scrollbar" 
            />
          </div>

          <FileUpload 
            accept="application/pdf"
            maxSize={10 * 1024 * 1024}
            onFileSelect={(file) => { setSelectedPDF(file); setError(null); }}
            selectedFile={selectedPDF}
            placeholder="Attach PDF Notes"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button onClick={() => { setShowAddModal(false); setError(null); }} className="flex-1 h-16 font-black text-[#555555] hover:text-white uppercase tracking-widest transition-colors text-xs md:text-sm">Cancel</button>
            <button 
              onClick={handleAddLesson}
              disabled={!newLessonTitle || isPublishing}
              className="flex-1 bg-[#D8FF5B] text-black h-16 rounded-[20px] md:rounded-[24px] font-black text-lg active:scale-95 transition-all disabled:opacity-20 flex items-center justify-center gap-3"
            >
              {isPublishing ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs uppercase tracking-widest">Saving...</span>
                </>
              ) : 'Publish'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherCoursesView;
