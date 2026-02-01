import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  children, 
  maxWidth = 'max-w-xl' 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className={`bg-[#0C0C0C] w-full sm:max-h-[85vh] ${maxWidth} rounded-[40px] sm:rounded-[56px] border border-white/5 shadow-[0_64px_128px_-32px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-500 flex flex-col relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
        
        <header className="px-8 sm:px-12 pt-12 sm:pt-16 pb-6 sm:pb-8 flex flex-col items-center text-center shrink-0 relative z-10">
          {title && (
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-[1.1] sm:leading-none mb-3 sm:mb-4 px-10">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-[#555555] font-black text-[10px] sm:text-[11px] uppercase tracking-[0.3em]">
              {subtitle}
            </p>
          )}
          
          <button 
            onClick={onClose}
            className="absolute top-6 sm:top-8 right-6 sm:right-12 w-10 h-10 sm:w-14 sm:h-14 bg-white/5 rounded-full flex items-center justify-center text-[#444444] hover:text-white transition-all active:scale-90"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar px-8 sm:px-12 pb-12 sm:pb-16 pt-4 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;