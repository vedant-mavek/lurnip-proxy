
import React, { useState } from 'react';

// Added studentId prop to match dashboard usage
interface ReportIssueViewProps {
  studentId: string;
}

const ReportIssueView: React.FC<ReportIssueViewProps> = ({ studentId }) => {
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ category?: string; text?: string }>({});

  const isFormValid = category !== '' && text.trim().length > 0;

  const validate = () => {
    const newErrors: { category?: string; text?: string } = {};
    if (!category) newErrors.category = 'Please select a category';
    if (!text.trim()) newErrors.text = 'Please provide details about the issue';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    setSubmissionError(null);
    // Simulate API call
    setTimeout(() => {
      // Chance of failure
      if (Math.random() < 0.05) {
        setSubmissionError('Failed to submit report. Please try again.');
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-32 text-center space-y-10 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-[#D8FF5B] text-black rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-[#D8FF5B]/10">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">Issue Recorded</h2>
          <p className="text-[#888888] font-medium text-lg leading-relaxed">Your report has been securely sent to administration for student {studentId}. Thank you for your feedback.</p>
        </div>
        <button 
          onClick={() => {setSubmitted(false); setText(''); setCategory(''); setErrors({}); setSubmissionError(null); }}
          className="w-full sm:w-auto bg-white text-black h-16 px-10 rounded-full font-black text-lg shadow-xl active:scale-95 transition-all"
        >
          Submit another report
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-12 pb-40 animate-in fade-in duration-500">
      <header>
        <h2 className="text-5xl font-extrabold text-white tracking-tight">Report Issue</h2>
        <p className="text-[#888888] font-medium text-lg mt-2">Direct encrypted link to administration.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {submissionError && (
          <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs font-bold text-rose-500 animate-in fade-in slide-in-from-top-2">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>{submissionError}</span>
          </div>
        )}
        {/* Category Selector */}
        <div className="space-y-3">
          <label htmlFor="report-category" className="block text-[10px] font-black text-[#555555] uppercase tracking-[0.25em] px-2">Category</label>
          <div className="relative">
            <select 
              id="report-category"
              className={`w-full h-20 px-8 rounded-[32px] bg-[#121212] border text-white font-extrabold text-base sm:text-lg outline-none appearance-none cursor-pointer transition-all ${errors.category ? 'border-rose-500/50' : 'border-white/5 focus:border-[#D8FF5B]/30'}`}
              value={category}
              onChange={(e) => { setCategory(e.target.value); if (errors.category) setErrors({ ...errors, category: undefined }); setSubmissionError(null); }}
            >
              <option value="" disabled className="bg-black">Select a category...</option>
              <option value="Academic" className="bg-black">Academic</option>
              <option value="Facilities" className="bg-black">Facilities</option>
              <option value="Conduct" className="bg-black">Conduct</option>
              <option value="Technical" className="bg-black">Technical</option>
              <option value="Other" className="bg-black">Other</option>
            </select>
            <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none text-[#555555]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          {errors.category && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest px-4">{errors.category}</p>}
        </div>

        {/* Details Area */}
        <div className="space-y-3">
          <label htmlFor="report-text" className="block text-[10px] font-black text-[#555555] uppercase tracking-[0.25em] px-2">Details</label>
          <textarea
            id="report-text"
            rows={6}
            className={`w-full p-8 rounded-[32px] bg-[#121212] border text-white font-extrabold text-base sm:text-lg outline-none placeholder:text-[#333333] transition-all resize-none no-scrollbar ${errors.text ? 'border-rose-500/50' : 'border-white/5 focus:border-[#D8FF5B]/30'}`}
            placeholder="Please describe the issue in detail..."
            value={text}
            onChange={(e) => { setText(e.target.value); if (errors.text) setErrors({ ...errors, text: undefined }); setSubmissionError(null); }}
          />
          {errors.text && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest px-4">{errors.text}</p>}
        </div>

        {/* Anonymity Toggle */}
        <div className="flex items-center p-6 sm:p-8 bg-[#121212] border border-white/5 rounded-[32px] cursor-pointer group hover:bg-[#181818] transition-colors" onClick={() => setIsAnonymous(!isAnonymous)}>
          <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all shrink-0 ${isAnonymous ? 'bg-[#D8FF5B] border-[#D8FF5B]' : 'bg-[#222222] border-white/5'}`}>
            {isAnonymous && <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
          </div>
          <div className="ml-5">
            <span className="block text-lg sm:text-xl font-extrabold text-white">Report Anonymously</span>
            <span className="block text-[10px] font-black text-[#555555] uppercase tracking-widest mt-0.5">Your identity will be hidden</span>
          </div>
        </div>

        {/* Action Button - Glassmorphism Refined */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="group relative w-full h-20 rounded-full font-black text-2xl transition-all duration-300 active:scale-[0.96] overflow-hidden disabled:opacity-20"
          >
            {/* Glass Background Layer */}
            <div className="absolute inset-0 bg-[#D8FF5B]/80 backdrop-blur-2xl border border-white/20 transition-all group-hover:bg-[#D8FF5B]/95 group-active:bg-[#D8FF5B]/70" />
            
            {/* Shine/Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/30 to-transparent transition-opacity duration-500 pointer-events-none" />
            
            {/* Button Content */}
            <span className="relative z-10 text-black drop-shadow-sm flex items-center justify-center gap-3">
              {isSubmitting ? (
                <>
                  <div className="w-7 h-7 border-4 border-black/10 border-t-black rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Report
                  <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </span>
            
            {/* Outer Glow */}
            <div className="absolute -inset-10 bg-[#D8FF5B]/20 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportIssueView;
