import React, { useRef, useState } from 'react';

interface FileUploadProps {
  label?: string;
  accept: string;
  maxSize: number; // in bytes
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  error?: string | null;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept,
  maxSize,
  onFileSelect,
  selectedFile,
  error: externalError,
  placeholder = "Select a file",
  icon,
  className = ""
}) => {
  const [internalError, setInternalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const error = externalError || internalError;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setInternalError(null);
    
    if (file) {
      const isTypeValid = accept.split(',').some(type => {
        const trimmed = type.trim();
        if (trimmed.endsWith('/*')) {
          return file.type.startsWith(trimmed.replace('/*', ''));
        }
        return file.type === trimmed || file.name.endsWith(trimmed);
      });

      if (!isTypeValid) {
        setInternalError(`Format Restricted: ${accept}`);
        onFileSelect(null);
        return;
      }

      if (file.size > maxSize) {
        setInternalError(`Size Overflow: ${(maxSize / (1024 * 1024)).toFixed(0)}MB Cap`);
        onFileSelect(null);
        return;
      }

      onFileSelect(file);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    setInternalError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <label className="text-[10px] font-black text-[#555555] uppercase tracking-[0.4em] block px-4">
          {label}
        </label>
      )}
      
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept={accept} 
        onChange={handleFileChange} 
      />
      
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={`w-full p-8 rounded-[40px] border-2 border-dashed flex items-center justify-between transition-all group relative overflow-hidden ${
          selectedFile 
            ? 'bg-[#D8FF5B]/5 border-[#D8FF5B]/30' 
            : 'bg-[#0A0A0A] border-white/5 hover:border-white/20'
        }`}
      >
        <div className="flex items-center gap-6 overflow-hidden relative z-10 text-left">
          <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 transition-all duration-500 ${
            selectedFile ? 'bg-[#D8FF5B] text-black shadow-[0_0_20px_#D8FF5B44]' : 'bg-[#1a1a1a] text-[#333333] group-hover:text-white'
          }`}>
            {icon || (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            )}
          </div>
          <div className="overflow-hidden">
            <p className={`text-xl font-black tracking-tight truncate ${selectedFile ? 'text-white' : 'text-[#333333] group-hover:text-[#666666]'}`}>
              {selectedFile ? selectedFile.name : placeholder}
            </p>
            {selectedFile && (
              <p className="text-[10px] font-black text-[#D8FF5B] uppercase tracking-[0.2em] mt-1.5 animate-in fade-in slide-in-from-left-2">
                {(selectedFile.size / 1024).toFixed(1)} KB • UPLOAD READY
              </p>
            )}
          </div>
        </div>
        {selectedFile && (
          <button 
            type="button" 
            onClick={clearFile}
            className="text-rose-500 hover:text-white p-3 shrink-0 transition-all relative z-20 active:scale-75"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}>
              <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        )}
      </button>

      {error && (
        <div className="flex items-center gap-3 p-5 bg-rose-500/10 border border-rose-500/20 rounded-[28px] text-xs font-black text-rose-500 animate-in fade-in slide-in-from-top-2 uppercase tracking-widest px-8">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;