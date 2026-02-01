import React, { useState } from 'react';
import Modal from '../../components/Modal';

interface SignupViewProps {
  onSignup: (email: string, name: string, password: string) => Promise<void>;
  onSwitchToLogin: () => void;
}

const SignupView: React.FC<SignupViewProps> = ({ onSignup, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string; form?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [legalView, setLegalView] = useState<'NONE' | 'TOS' | 'PRIVACY'>('NONE');

  const isFormValid = name.trim().length > 0 && /\S+@\S+\.\S+/.test(email) && password.length >= 6 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    try {
      await onSignup(email, name, password);
    } catch (err: any) {
      setErrors({ form: err.message || 'Registry initialization failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => onSignup('google-user@gmail.com', 'Google User', 'google-pass'), 1800);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 md:p-12 animate-in fade-in duration-700">
      <div className="w-full max-w-[460px] space-y-12">
        <header className="space-y-4">
          <h1 className="text-7xl font-black text-white tracking-tighter leading-none">Join.</h1>
          <p className="text-[#888888] text-xl font-medium tracking-tight">Establish your academic identity.</p>
        </header>

        <div className="space-y-10">
          <button onClick={handleGoogleLogin} disabled={isGoogleLoading || isSubmitting} className="btn-google-pill">
            {isGoogleLoading ? <div className="w-6 h-6 border-4 border-white/10 border-t-white rounded-full animate-spin" /> : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                <span className="text-white font-bold text-lg tracking-tight">Sign up with Google</span>
              </>
            )}
          </button>
          
          <div className="flex items-center gap-6 px-2">
            <div className="h-px bg-white/5 flex-1" />
            <span className="text-[10px] font-black text-[#222222] uppercase tracking-[0.8em]">OR</span>
            <div className="h-px bg-white/5 flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.form && <div className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-[24px] text-rose-500 text-xs font-black uppercase text-center">{errors.form}</div>}
            
            <div className="space-y-4">
              <div className="input-pill-container">
                <label className="input-pill-label">Legal Name</label>
                <input type="text" required className="input-pill-element" value={name} onChange={(e) => setName(e.target.value)} placeholder="Hanna Dowie" />
              </div>
              <div className="input-pill-container">
                <label className="input-pill-label">Institution Email</label>
                <input type="email" required className="input-pill-element" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@astra.edu" />
              </div>
              <div className="input-pill-container">
                <label className="input-pill-label">Password</label>
                <input type="password" required className="input-pill-element" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" />
              </div>
              <div className="input-pill-container">
                <label className="input-pill-label">Confirm Password</label>
                <input type="password" required className="input-pill-element" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••••••" />
              </div>
            </div>

            <div className="pt-6">
              <button type="submit" disabled={isSubmitting || !isFormValid} className="btn-primary-pill w-full">
                {isSubmitting ? 'Establishing...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>

        <footer className="pt-8 border-t border-white/5 text-center space-y-8">
          <p className="text-[#666666] font-bold text-lg">Already enrolled? <button onClick={onSwitchToLogin} className="text-white hover:text-[#D8FF5B] transition-colors underline underline-offset-8 decoration-white/20 font-black">Log In</button></p>
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] font-black text-[#222222] uppercase tracking-[0.5em]">OPERATING PROTOCOLS</span>
            <div className="flex items-center gap-5">
              <button onClick={() => setLegalView('TOS')} className="text-[10px] font-black text-white uppercase tracking-widest border-b border-white/10 hover:border-white transition-all">TOS</button>
              <div className="w-1 h-1 bg-[#111111] rounded-full" />
              <button onClick={() => setLegalView('PRIVACY')} className="text-[10px] font-black text-white uppercase tracking-widest border-b border-white/10 hover:border-white transition-all">Privacy</button>
            </div>
          </div>
        </footer>
      </div>

      <Modal isOpen={legalView !== 'NONE'} onClose={() => setLegalView('NONE')} title={legalView === 'TOS' ? "Service Protocol" : "Security Shield"}>
        <div className="text-[#888888] font-medium text-lg leading-relaxed space-y-6">
          <p>{legalView === 'TOS' ? 'By accessing Lurnip, you agree to uphold institutional integrity standards.' : 'Academic records are encrypted using Zero-Knowledge architecture.'}</p>
        </div>
        <button onClick={() => setLegalView('NONE')} className="btn-primary-pill w-full mt-12 h-16 text-lg">Acknowledge</button>
      </Modal>
    </div>
  );
};

export default SignupView;