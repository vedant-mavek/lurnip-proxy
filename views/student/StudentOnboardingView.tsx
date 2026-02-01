import React, { useState } from 'react';

interface StudentOnboardingViewProps {
  onComplete: (name: string, batchId: string) => void;
}

const StudentOnboardingView: React.FC<StudentOnboardingViewProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [batchId, setBatchId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const batches = [
    { id: 'b1', name: 'Class 2024 - Section A' },
    { id: 'b2', name: 'Class 2024 - Section B' },
    { id: 'b3', name: 'Year 2 - CS Dept' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && batchId) {
      setIsSubmitting(true);
      setTimeout(() => onComplete(name, batchId), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 md:p-12 animate-in fade-in duration-700">
      <div className="w-full max-w-[460px] space-y-16">
        <header className="space-y-6 text-center">
          <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none">Setup.</h2>
          <p className="text-[#888888] text-xl font-medium tracking-tight">Sync your profile with institutional records.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="input-pill-container">
              <label className="input-pill-label">Display Name</label>
              <input type="text" required className="input-pill-element" value={name} onChange={(e) => setName(e.target.value)} placeholder="Hanna Dowie" />
            </div>

            <div className="input-pill-container">
              <label className="input-pill-label">Assigned Batch</label>
              <select required className="input-pill-element appearance-none cursor-pointer" value={batchId} onChange={(e) => setBatchId(e.target.value)}>
                <option value="" disabled className="bg-black">Select your section...</option>
                {batches.map((b) => <option key={b.id} value={b.id} className="bg-[#111111]">{b.name}</option>)}
              </select>
            </div>
          </div>

          <div className="pt-8">
            <button type="submit" disabled={!name || !batchId || isSubmitting} className="btn-primary-pill w-full">
              {isSubmitting ? 'Entering...' : 'Confirm & Enter'}
            </button>
          </div>
        </form>

        <p className="text-center text-[10px] font-black text-[#222222] uppercase tracking-[1em]">LURNIP OPERATIONS</p>
      </div>
    </div>
  );
};

export default StudentOnboardingView;