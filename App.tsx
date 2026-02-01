
import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import { useAuth } from './contexts/AuthContext';
import { CONFIG } from './config';
import LoginView from './views/auth/LoginView';
import SignupView from './views/auth/SignupView';
import VerifyView from './views/auth/VerifyView';
import RoleSelectionView from './views/auth/RoleSelectionView';
import StudentOnboardingView from './views/student/StudentOnboardingView';
import StudentDashboard from './views/student/StudentDashboard';
import TeacherDashboard from './views/teacher/TeacherDashboard';
import AdminDashboard from './views/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundView from './views/errors/NotFoundView';

type AuthStatus = 'LOGIN' | 'SIGNUP' | 'VERIFYING' | 'ROLE_SELECTION' | 'ONBOARDING' | 'AUTHENTICATED' | 'NOT_FOUND';

const App: React.FC = () => {
  const { user, loading, login, signup, logout, updateUser } = useAuth();
  const [status, setStatus] = useState<AuthStatus>('LOGIN');

  /**
   * CENTRAL STATE ROUTER
   * Acts as the "Redirect Engine". Monitors auth state changes and 
   * funnels users to the correct dashboard or onboarding flow.
   */
  useEffect(() => {
    if (!loading) {
      if (user) {
        // If user is logged in, determine their destination
        if (user.role) {
          if (user.role === UserRole.STUDENT && !user.batchId) {
            // Student needs to select a batch before entering
            setStatus('ONBOARDING');
          } else {
            // Authorized and fully setup - Go to Dashboard
            // Only set to AUTHENTICATED if we aren't currently showing a 404
            if (status !== 'NOT_FOUND') {
              setStatus('AUTHENTICATED');
            }
          }
        } else {
          // New user needs to select their primary role
          setStatus('ROLE_SELECTION');
        }
      } else {
        // Not logged in - Always show Login unless on specific auth pages
        if (status !== 'SIGNUP' && status !== 'VERIFYING' && status !== 'NOT_FOUND') {
          setStatus('LOGIN');
        }
      }
    }
  }, [user, loading]);

  const handleLogout = async () => {
    await logout();
    setStatus('LOGIN');
  };

  const handleLoginSubmit = async (email: string, password: string) => {
    await login(email, password);
  };

  const handleSignupSubmit = async (email: string, name: string, password: string) => {
    await signup(email, name, password);
    setStatus('VERIFYING');
  };

  const handleRoleSelection = (role: UserRole) => {
    updateUser({ role });
  };

  const handleOnboardingComplete = (name: string, batchId: string) => {
    updateUser({ name, batchId });
    setStatus('AUTHENTICATED');
  };

  const handleRoleMismatch = () => {
    setStatus('AUTHENTICATED');
  };

  const handleReturnFromError = () => {
    if (user) {
      setStatus('AUTHENTICATED');
    } else {
      setStatus('LOGIN');
    }
  };

  // Loading State - Branded Spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex flex-col items-center animate-in fade-in duration-700">
          <div className="w-20 h-20 bg-[#D8FF5B]/5 rounded-[2.5rem] flex items-center justify-center text-[#D8FF5B] relative overflow-hidden border border-[#D8FF5B]/10">
            <div className="absolute inset-0 bg-[#D8FF5B]/10 animate-pulse"></div>
            <svg className="w-10 h-10 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="mt-8 text-white font-black tracking-[0.5em] text-[10px] uppercase opacity-60">{CONFIG.APP.NAME}</p>
        </div>
      </div>
    );
  }

  // Error States
  if (status === 'NOT_FOUND') {
    return <NotFoundView isLoggedIn={!!user} onReturn={handleReturnFromError} />;
  }

  // Auth Flow Views
  if (status === 'LOGIN') return <LoginView onLogin={handleLoginSubmit} onSwitchToSignup={() => setStatus('SIGNUP')} />;
  if (status === 'SIGNUP') return <SignupView onSignup={handleSignupSubmit} onSwitchToLogin={() => setStatus('LOGIN')} />;
  if (status === 'VERIFYING') return <VerifyView email={user?.email || 'your email'} />;
  if (status === 'ROLE_SELECTION') return <RoleSelectionView onSelectRole={handleRoleSelection} />;
  if (status === 'ONBOARDING') return <StudentOnboardingView onComplete={handleOnboardingComplete} />;

  // Authenticated "Routes"
  if (status === 'AUTHENTICATED' && user) {
    switch (user.role) {
      case UserRole.STUDENT: 
        return (
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]} onRoleMismatch={handleRoleMismatch}>
            <StudentDashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        );
      case UserRole.TEACHER: 
        return (
          <ProtectedRoute allowedRoles={[UserRole.TEACHER]} onRoleMismatch={handleRoleMismatch}>
            <TeacherDashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        );
      case UserRole.ADMIN: 
        return (
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]} onRoleMismatch={handleRoleMismatch}>
            <AdminDashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        );
      default: 
        return <LoginView onLogin={handleLoginSubmit} onSwitchToSignup={() => setStatus('SIGNUP')} />;
    }
  }

  return <LoginView onLogin={handleLoginSubmit} onSwitchToSignup={() => setStatus('SIGNUP')} />;
};

export default App;
