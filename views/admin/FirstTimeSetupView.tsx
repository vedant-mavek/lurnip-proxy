import React, { useState } from 'react';
import { adminService } from '../../services/adminService';
import { CONFIG } from '../../config';

interface FirstTimeSetupViewProps {
  onComplete: (data: { name: string; slug: string; type: string }) => void;
}

const FirstTimeSetupView: React.FC<FirstTimeSetupViewProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [type, setType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const institutionTypes = [
    { value: 'school', label: 'School' },
    { value: 'college_university', label: 'College / University' },
    { value: 'coaching_institute', label: 'Coaching / Institute' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug || !type) return;
    setIsSubmitting(true);
    const { data, error: apiError } = await adminService.createInstitution(name, type, slug);
    setIsSubmitting(false);
    if (data) onComplete({ name, slug, type });
    else setError(apiError?.message || 'Initialization failure.');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 md:p-12 selection:bg-[#D8FF5B] selection:text-black">
      <div className="w-full max-w-[500px] space-y-16">
        <header className="space-y-6 text-center">
          <div className="w-20 h-20 bg-[#D8FF5B] rounded-[24px] flex items-center justify-center text-black mx-auto shadow-2xl animate-pulse-lime">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">Initialization</h1>
          <p className="text-[#888888] text-xl font-medium max-w-sm mx-auto">Configure your workspace identity.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-[24px] text-rose-500 text-xs font-black uppercase text-center">{error}</div>}
          
          <div className="space-y-4">
            <div className="input-pill-container">
              <label className="input-pill-label">Institution Name</label>
              <input type="text" required className="input-pill-element" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Astra Academy" />
            </div>

            <div className="input-pill-container">
              <label className="input-pill-label">Institutional Category</label>
              <select required className="input-pill-element appearance-none cursor-pointer" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="" disabled className="bg-black">Select category...</option>
                {institutionTypes.map((t) => <option key={t.value} value={t.value} className="bg-[#111111]">{t.label}</option>)}
              </select>
            </div>

            <div className="input-pill-container">
              <label className="input-pill-label">Workspace URL Slug</label>
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-[#444444] font-bold text-xl shrink-0">{CONFIG.APP.INSTITUTION_DOMAIN}/</span>
                <input type="text" required className="input-pill-element flex-1" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} placeholder="astra-univ" />
              </div>
            </div>
          </div>

          <div className="pt-10">
            <button type="submit" disabled={isSubmitting || !name || !slug || !type} className="btn-primary-pill w-full">
              {isSubmitting ? 'Establishing...' : 'Confirm Setup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FirstTimeSetupView;