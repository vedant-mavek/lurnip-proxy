import React, { useState } from 'react';
import { Lesson, Assignment } from '../../types';

interface StudyMaterialViewProps {
  onSelectLesson: (lesson: Lesson) => void;
  batchId: string;
}

type TabCategory = 'lessons' | 'notes' | 'pyq' | 'vital';

const MOCK_COURSES = [
  {
    id: 'c1',
    name: 'Macroeconomics',
    lessons: [
      { id: 'l1', title: 'Circular Flow Model', status: 'SUBMITTED', content: 'The circular flow model represents the monetary transactions in an economy...' },
      { id: 'l2', title: 'Supply & Demand', status: 'IN_PROGRESS', content: 'Market forces interact to determine equilibrium prices...', assignment: { id: 'a1', type: 'ONLINE', instructions: 'Explain price movements vs curve shifts.', isSubmitted: false } as Assignment },
    ] as Lesson[],
    notes: [
      { id: 'n1', title: 'National Income Accounting', size: '2.4 MB', date: 'OCT 12' },
    ],
    pyq: [{ id: 'p1', title: '2023 Final Examination', year: '2023', shift: 'Morning' }],
    vital: [{ id: 'v1', title: 'Top 50 MCQ for Macro', type: 'QUIZ', count: '50 QS' }]
  },
  {
    id: 'c2',
    name: 'Advanced Calculus',
    lessons: [{ id: 'l4', title: 'Limits & Continuity', status: 'NOT_STARTED', content: 'A limit is the value a function approaches...' }] as Lesson[],
    notes: [],
    pyq: [],
    vital: []
  }
];

const EmptyState: React.FC<{ title: string; subtitle: string; icon: React.ReactNode }> = ({ title, subtitle, icon }) => (
  <div className="py-20 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
    <div className="w-20 h-20 bg-white/5 rounded-[32px] flex items-center justify-center text-[#222222] mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-[#444444] tracking-tight">{title}</h3>
    <p className="text-sm text-[#333333] font-medium mt-1 uppercase tracking-widest">{subtitle}</p>
  </div>
);

const StudyMaterialView: React.FC<StudyMaterialViewProps> = ({ onSelectLesson, batchId }) => {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(MOCK_COURSES[0].id);
  const [activeTab, setActiveTab] = useState<TabCategory>('lessons');

  return (
    <div className="space-y-12 pb-32 animate-in fade-in duration-700">
      <header className="px-1">
        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">Curriculum</h2>
        <p className="text-[#888888] font-medium text-lg md:text-xl mt-4 tracking-tight">Structured repository for <span className="text-white font-bold">{batchId}</span>.</p>
      </header>

      <div className="space-y-6">
        {MOCK_COURSES.map(course => (
          <div 
            key={course.id} 
            className="card-astra overflow-hidden border-white/10"
          >
            <button
              onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
              className="w-full flex items-center justify-between p-10 hover:bg-white/[0.02] transition-all"
            >
              <div className="text-left">
                <h3 className={`text-3xl md:text-4xl font-black tracking-tight leading-none transition-all ${expandedCourse === course.id ? 'text-[#D8FF5B]' : 'text-[#444444]'}`}>
                  {course.name}
                </h3>
                <div className="flex items-center gap-3 mt-3">
                   <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest">Active Material</span>
                   <div className="w-1 h-1 bg-[#222222] rounded-full" />
                   <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest">{course.lessons.length} Modules</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-2xl border border-white/5 flex items-center justify-center transition-all duration-500 ${expandedCourse === course.id ? 'rotate-180 bg-[#D8FF5B] text-black border-[#D8FF5B]' : 'text-[#333333]'}`}>
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M19 9l-7 7-7-7" /></svg>
              </div>
            </button>
            
            <div className={`transition-all duration-700 overflow-hidden ${expandedCourse === course.id ? 'max-h-[2000px] opacity-100 border-t border-white/5' : 'max-h-0 opacity-0'}`}>
              <div className="p-10 space-y-10">
                <div className="bg-[#111111] p-1.5 rounded-full flex gap-1 border border-white/5 max-w-md">
                  {(['lessons', 'notes', 'pyq', 'vital'] as TabCategory[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeTab === tab ? 'bg-white text-black shadow-xl' : 'text-[#444444] hover:text-[#777777]'
                      }`}
                    >
                      {tab === 'vital' ? 'Vital Q' : tab}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {activeTab === 'lessons' && (course.lessons.length > 0 ? course.lessons.map(lesson => (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson)}
                      className="w-full group flex items-center gap-6 p-6 rounded-[32px] bg-black border border-white/5 hover:border-[#D8FF5B]/20 transition-all text-left active:scale-[0.98]"
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                        lesson.status === 'SUBMITTED' ? 'bg-[#D8FF5B]/10 text-[#D8FF5B]' : 'bg-[#1a1a1a] text-[#333333]'
                      }`}>
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h4 className="text-xl font-black text-white tracking-tight leading-none group-hover:text-[#D8FF5B] transition-colors truncate">{lesson.title}</h4>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#555555] mt-2 block">{lesson.status.replace('_', ' ')}</span>
                      </div>
                      <div className="text-[#222222] group-hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}><path d="M9 5l7 7-7 7"/></svg>
                      </div>
                    </button>
                  )) : (
                    <EmptyState title="No lessons found" subtitle="Registry update in progress." icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>} />
                  ))}
                  
                  {activeTab !== 'lessons' && <EmptyState title="Resource Locked" subtitle="Pending batch availability." icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>} />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="pt-16 text-center">
        <p className="text-[10px] font-black text-[#1a1a1a] uppercase tracking-[1em]">Repository Secured</p>
      </footer>
    </div>
  );
};

export default StudyMaterialView;