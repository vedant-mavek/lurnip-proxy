import React, { useState } from 'react';
import { UserRole } from '../../types';

interface RoleSelectionViewProps {
  onSelectRole: (role: UserRole) => void;
}

const RoleSelectionView: React.FC<RoleSelectionViewProps> = ({ onSelectRole }) => {
  const [selected, setSelected] = useState<UserRole | null>(null);

  const roles = [
    {
      id: UserRole.STUDENT,
      title: 'Student',
      description: 'Access lessons & track progress.',
    },
    {
      id: UserRole.TEACHER,
      title: 'Teacher',
      description: 'Manage batches & guide learning.',
    },
    {
      id: UserRole.ADMIN,
      title: 'Admin',
      description: 'Oversee institutional operations.',
    }
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-8 py-12">
      <div className="w-full max-w-[440px] space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <header className="space-y-4">
          <h1 className="text-6xl font-black text-white tracking-tighter leading-none">Identify.</h1>
          <p className="text-[#888888] font-medium text-xl tracking-tight">Select your primary sector responsibility.</p>
        </header>

        <div className="space-y-4">
          {roles.map((role) => {
            const isSelected = selected === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelected(role.id)}
                className={`w-full flex items-center p-8 rounded-[40px] border-2 transition-all duration-500 text-left group ${
                  isSelected ? 'border-[#D8FF5B] bg-[#111111] shadow-[0_0_30px_rgba(216,255,91,0.1)]' : 'border-white/5 bg-[#0C0C0C] hover:bg-[#111111] hover:border-white/10'
                }`}
              >
                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 transition-all duration-500 ${isSelected ? 'bg-[#D8FF5B] text-black shadow-lg' : 'bg-black text-[#333333] group-hover:text-white'}`}>
                  {role.id === UserRole.STUDENT && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>}
                  {role.id === UserRole.TEACHER && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg>}
                  {role.id === UserRole.ADMIN && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
                </div>
                <div className="ml-6 overflow-hidden">
                  <h3 className="font-black text-2xl text-white tracking-tighter">{role.title}</h3>
                  <p className="text-[10px] text-[#555555] font-black uppercase tracking-[0.15em] mt-1 truncate">{role.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-6">
          <button
            onClick={() => selected && onSelectRole(selected)}
            disabled={!selected}
            className="btn-primary-pill w-full"
          >
            Establish Role
          </button>
        </div>

        <p className="text-center text-[10px] text-[#222222] font-black uppercase tracking-[0.5em]">LURNIP OS V1.0</p>
      </div>
    </div>
  );
};

export default RoleSelectionView;