import React, { useState } from 'react';
import { authService } from '../../services/authService';

interface LoginViewProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSwitchToSignup: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await onLogin(email, password);
    } catch (err: any) {
      setError(err.message || 'Identity verification failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 selection:bg-[#D8FF5B]">
      <div className="w-full max-w-[440px] space-y-16 animate-finish">
        <header className="space-y-6 text-center">
          <div className="w-24 h-24 bg-[#D8FF5B] rounded-[32px] flex items-center justify-center text-black mx-auto shadow-[0_20px_60px_rgba(216,255,91,0.2)] transition-transform hover:scale-105 duration-500">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-7xl font-black tracking-tighter leading-none">Lurnip.</h1>
            <p className="text-[#555555] font-black uppercase tracking-[0.4em] text-[10px]">Academic Operating System</p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-[28px] text-rose-500 text-[10px] font-black uppercase tracking-widest text-center animate-finish">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#444444] uppercase tracking-[0.3em] ml-6">Institutional ID</label>
              <input 
                type="email"
                required
                className="input-pill"
                placeholder="name@institution.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#444444] uppercase tracking-[0.3em] ml-6">Access Key</label>
              <input 
                type="password"
                required
                className="input-pill"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary w-full"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
              ) : 'Authenticate Session'}
            </button>
          </div>
        </form>

        <footer className="pt-10 border-t border-white/5 text-center flex flex-col items-center gap-8">
          <p className="text-[#555555] font-bold text-lg">
            Need an entry? <button onClick={onSwitchToSignup} className="text-white hover:text-[#D8FF5B] transition-colors underline underline-offset-8 decoration-white/20 font-black">Register Profile</button>
          </p>
          <div className="text-[9px] font-black text-[#222222] uppercase tracking-[1em]">Secured Infrastructure</div>
        </footer>
      </div>
    </div>
  );
};

export default LoginView;