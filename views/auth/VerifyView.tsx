
import React from 'react';

interface VerifyViewProps {
  email: string;
}

const VerifyView: React.FC<VerifyViewProps> = ({ email }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col px-8 py-12 items-center justify-center animate-in fade-in duration-700">
      <div className="max-w-sm w-full text-center space-y-12">
        {/* Refined Premium Illustration */}
        <div className="relative mx-auto w-44 h-44">
          {/* Multi-layered Glow System */}
          <div className="absolute inset-0 bg-[#D7FF5A] rounded-[3.5rem] animate-pulse opacity-[0.03] scale-150 blur-2xl" />
          <div className="absolute inset-0 bg-[#D7FF5A] rounded-[3.5rem] animate-ping opacity-[0.05] scale-110" />
          
          <div className="relative w-44 h-44 bg-gradient-to-b from-[#181818] to-[#0A0A0A] rounded-[3.5rem] border border-white/10 flex items-center justify-center text-[#D7FF5A] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] group overflow-hidden">
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#D7FF5A]/5 to-transparent opacity-50" />
            
            {/* Minimalist Refined Icon */}
            <div className="relative z-10 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3">
              <svg className="w-20 h-20 drop-shadow-[0_0_12px_rgba(215,255,90,0.3)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 19v-8.93a2 2 0 01.897-1.664l7-4.666a2 2 0 012.206 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76m4.5 0L21 10.07M9.75 14.5L3 10.07" />
              </svg>
            </div>

            {/* Accent Corner Detail */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#D7FF5A]/5 blur-2xl rounded-full" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-5xl font-extrabold text-white tracking-tight leading-tight">Check your email</h2>
          <p className="text-[#888888] font-medium text-lg leading-relaxed px-4">
            A secure access link is waiting for you at <span className="text-white font-bold decoration-[#D7FF5A] decoration-2 underline underline-offset-8">{email}</span>.
          </p>
        </div>

        <div className="pt-4">
          <div className="inline-flex items-center gap-3 text-[#D7FF5A] font-black text-[10px] uppercase tracking-[0.3em] px-10 py-5 bg-[#0A0A0A] rounded-full border border-white/5 shadow-2xl">
            <span className="w-2 h-2 bg-[#D7FF5A] rounded-full animate-pulse shadow-[0_0_12px_#D7FF5A]" />
            Verifying identity
          </div>
        </div>

        <div className="pt-8">
          <button 
            onClick={() => window.location.reload()}
            className="group flex items-center justify-center mx-auto gap-2 text-xs font-black text-[#444444] hover:text-white transition-all uppercase tracking-[0.25em]"
          >
            <span>Resend Link</span>
            <svg className="w-4 h-4 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyView;
