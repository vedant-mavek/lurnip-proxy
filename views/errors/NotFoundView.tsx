
import React from 'react';

interface NotFoundViewProps {
  onReturn: () => void;
  isLoggedIn: boolean;
}

const NotFoundView: React.FC<NotFoundViewProps> = ({ onReturn, isLoggedIn }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D8FF5B]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-md w-full space-y-10">
        {/* Large 404 Display */}
        <div className="relative">
          <h1 className="text-[120px] sm:text-[160px] font-black text-white leading-none tracking-tighter opacity-10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center text-[#D8FF5B] shadow-2xl animate-bounce duration-[3000ms]">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">OPERATIONAL GAP</h2>
          <p className="text-[#888888] font-medium text-lg leading-relaxed px-4">
            The resource you are looking for has been moved or does not exist in this sector.
          </p>
        </div>

        <div className="pt-6">
          <button
            onClick={onReturn}
            className="w-full bg-[#D8FF5B] text-black h-18 py-5 rounded-full font-black text-sm uppercase tracking-widest active:scale-95 transition-all shadow-2xl shadow-[#D8FF5B]/10 hover:bg-[#e4ff88]"
          >
            {isLoggedIn ? 'Return to Dashboard' : 'Back to Login'}
          </button>
        </div>

        <div className="pt-12">
          <p className="text-[10px] text-[#333333] font-black uppercase tracking-[0.5em]">
            Institutional integrity: Nominal
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundView;
