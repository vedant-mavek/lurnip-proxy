import React, { useState } from 'react';
import { Lesson } from '../../types';
import FileUpload from '../../components/FileUpload';
import { studentService } from '../../services/studentService';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  studentId: string;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson, onBack, studentId }) => {
  const [submission, setSubmission] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const isSubmissionValid = submission.trim().length >= 20;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submission.trim()) {
      setError('Please provide content for your submission.');
      return;
    }

    if (!isSubmissionValid) {
        setError('Submission must be at least 20 characters.');
        return;
    }
    
    setSubmitting(true);
    setError(null);

    try {
      const { data: aiFeedback } = await studentService.evaluateSubmission(
        lesson.assignment?.instructions || lesson.title,
        submission
      );
      
      // Also perform the logical submission
      await studentService.submitAssignment(studentId, lesson.id, submission, selectedFile || undefined);
      
      setFeedback(aiFeedback || "Submission received and recorded.");
    } catch (err) {
      setError('An error occurred during evaluation. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (feedback) {
    return (
      <div className="space-y-8 animate-in zoom-in-95 duration-700 max-w-2xl mx-auto py-8">
        <div className="card-astra p-12 text-center border-[#82e3a1]/20 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#82e3a1]/5 rounded-full blur-[60px]" />
          <div className="w-16 h-16 bg-[#D8FF5B] text-black rounded-[20px] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D8FF5B]/20">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">Goal Achieved</h2>
          <p className="text-[#888888] font-medium leading-relaxed">Lurnip AI has evaluated your summary.</p>
        </div>

        <div className="bg-[#4B89FF]/5 border border-[#4B89FF]/15 rounded-[24px] p-8 relative overflow-hidden">
          <h3 className="text-[10px] font-black text-[#4B89FF] uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
            Real-time AI Review
          </h3>
          <p className="text-lg text-white font-medium leading-relaxed italic opacity-90">"{feedback}"</p>
        </div>

        <button 
          onClick={onBack}
          className="w-full bg-white text-black h-16 rounded-full font-black text-lg active:scale-95 transition-all shadow-xl"
        >
          Return to Course
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-40 max-w-2xl mx-auto animate-in fade-in duration-700">
      <button onClick={onBack} className="flex items-center text-xs font-black text-[#555555] hover:text-white uppercase tracking-[0.2em] transition-colors group">
        <svg className="w-4 h-4 mr-2.5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to Material
      </button>

      <header className="space-y-3">
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight">{lesson.title}</h2>
        <div className="h-1.5 w-16 bg-[#D8FF5B] rounded-full" />
      </header>

      <article className="max-w-none">
        <div className="text-[#888888] leading-relaxed font-medium whitespace-pre-wrap text-lg">
          {lesson.content}
        </div>
      </article>

      {lesson.assignment && (
        <section className="bg-[#121212] border border-white/5 rounded-[32px] p-10 mt-12 relative shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="bg-[#FF3FD3]/10 text-[#FF3FD3] text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-[#FF3FD3]/15">Self-Check</span>
            <span className="text-xs font-bold text-[#444444] uppercase tracking-tighter">{lesson.assignment.type} Task</span>
          </div>
          <p className="text-xl text-white font-extrabold mb-8 tracking-tight leading-relaxed">{lesson.assignment.instructions}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              {error && (
                <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs font-bold text-rose-500 animate-in fade-in slide-in-from-top-2 mb-2">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <span>{error}</span>
                </div>
              )}
              <textarea
                className={`w-full p-8 rounded-[24px] bg-black border outline-none text-base text-white font-medium placeholder:text-[#333333] transition-all resize-none no-scrollbar ${error ? 'border-rose-500/50' : 'border-white/5 focus:border-[#D8FF5B]/30'}`}
                placeholder="Synthesize your understanding here..."
                rows={6}
                value={submission}
                onChange={(e) => { setSubmission(e.target.value); if (error) setError(null); }}
              />
              {!isSubmissionValid && submission.length > 0 && (
                <p className="text-[#333333] text-[10px] font-black uppercase tracking-widest pl-4">{submission.length} / 20 characters minimum</p>
              )}
            </div>

            <FileUpload 
              label="Supporting Evidence"
              accept="image/*,application/pdf"
              maxSize={10 * 1024 * 1024}
              onFileSelect={(file) => { setSelectedFile(file); setError(null); }}
              selectedFile={selectedFile}
              placeholder="Attach relevant documentation"
            />

            <button
              type="submit"
              disabled={submitting || !isSubmissionValid}
              className="w-full bg-[#D8FF5B] text-black h-20 rounded-full font-black text-xl shadow-xl active:scale-[0.98] disabled:opacity-20 transition-all flex items-center justify-center gap-3"
            >
              {submitting ? (
                <>
                  <div className="w-7 h-7 border-4 border-black/10 border-t-black rounded-full animate-spin" />
                  <span className="text-sm uppercase tracking-widest">Evaluating...</span>
                </>
              ) : (
                <>
                  Run AI Evaluation
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </>
              )}
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default LessonView;