
import React, { ReactNode } from 'react';
import { UserRole } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  /**
   * Callback to force the app to "redirect" back to the correct dashboard
   */
  onRoleMismatch: () => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles, onRoleMismatch }) => {
  const { user, loading, logout } = useAuth();

  // 1. Authorization is in progress
  if (loading) return null;

  // 2. Authentication Check: No user found
  if (!user) return null;

  // 3. Authorization Check: Role check
  const isAuthorized = user.role && allowedRoles.includes(user.role);

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black p-8 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-rose-500/10 rounded-[2.5rem] flex items-center justify-center text-rose-500 mb-8 border border-rose-500/20">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="text-4xl font-black text-white tracking-tighter mb-4 uppercase">Restricted Department</h2>
        <p className="text-[#888888] font-medium text-lg max-w-sm mb-10 leading-relaxed">
          Access denied. Your account is verified for <span className="text-white font-bold">{user.role}</span> operations only.
        </p>

        <div className="flex flex-col w-full max-w-xs gap-4">
          <button 
            onClick={onRoleMismatch}
            className="w-full bg-[#D8FF5B] text-black h-16 rounded-full font-black text-sm uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-[#D8FF5B]/10"
          >
            Go to My Workspace
          </button>
          
          <button 
            onClick={logout}
            className="w-full bg-white/5 text-white h-16 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/10 active:scale-95 transition-all border border-white/5"
          >
            Switch Account
          </button>
        </div>

        <p className="mt-12 text-[10px] text-[#333333] font-black uppercase tracking-[0.3em]">Access Violation Logged</p>
      </div>
    );
  }

  // 4. Fully Authorized
  return <>{children}</>;
};

export default ProtectedRoute;
