
import React, { useState } from 'react';
import { UserProfile, AppNotification } from '../../types';
import MobileLayout from '../../components/MobileLayout';
import NotificationCenter from '../../components/NotificationCenter';
import AdminOverviewView from './AdminOverviewView';
import BatchesView from './BatchesView';
import ImportUsersView from './ImportUsersView';
import TimetableManagementView from './TimetableManagementView';
import AttendanceOversightView from './AttendanceOversightView';
import AdminAnnouncementsView from './AdminAnnouncementsView';
import ComplaintsView from './ComplaintsView';
import FirstTimeSetupView from './FirstTimeSetupView';
import InviteManagementView from './InviteManagementView';
import UserListView from './UserListView';
import DataExportsView from './DataExportsView';

const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: 'an1', title: 'System Warning', message: 'Higher than usual latency detected in API response for Batch Imports.', type: 'ANNOUNCEMENT', isRead: false, createdAt: '5 mins ago' },
  { id: 'an2', title: 'New Report', message: 'A safety report has been filed by a student in BSCS-2024-A.', type: 'MESSAGE', isRead: false, createdAt: '1 hour ago' },
];

const AdminDashboard: React.FC<{ user: UserProfile; onLogout: () => void }> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  
  const [isSetupComplete, setIsSetupComplete] = useState(!!user.isInstitutionSetupComplete);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleSetupComplete = (data: { name: string; slug: string; type: string }) => {
    console.debug('Institution established:', data);
    setIsSetupComplete(true);
  };

  if (!isSetupComplete) {
    return <FirstTimeSetupView onComplete={handleSetupComplete} />;
  }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
    { id: 'structure', label: 'Batches', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
    { id: 'import', label: 'Import', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M12 4v16m8-8H4" /></svg> },
    { id: 'exports', label: 'Exports', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { id: 'invites', label: 'Invites', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> },
    { id: 'users', label: 'Registry', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
    { id: 'timetable', label: 'Timetable', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { id: 'attendance', label: 'Audit', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
    { id: 'announcements', label: 'News', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M11 5L6 9H2V15H6L11 19V5Z" /><path d="M15.54 8.46c.937.937 1.464 2.209 1.464 3.54 0 1.331-.527 2.603-1.464 3.54" /></svg> },
    { id: 'complaints', label: 'Reports', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverviewView onNavigate={setActiveTab} onOpenNotifications={() => setIsNotifOpen(true)} unreadCount={unreadCount} />;
      case 'structure':
        return <BatchesView />;
      case 'import':
        return <ImportUsersView />;
      case 'exports':
        return <DataExportsView />;
      case 'invites':
        return <InviteManagementView />;
      case 'users':
        return <UserListView />;
      case 'timetable':
        return <TimetableManagementView />;
      case 'attendance':
        return <AttendanceOversightView />;
      case 'announcements':
        return <AdminAnnouncementsView />;
      case 'complaints':
        return <ComplaintsView />;
      default:
        return <AdminOverviewView onNavigate={setActiveTab} onOpenNotifications={() => setIsNotifOpen(true)} unreadCount={unreadCount} />;
    }
  };

  return (
    <MobileLayout 
      navItems={navItems} 
      activeId={activeTab} 
      onNavigate={setActiveTab} 
      userName="Admin"
      onLogout={onLogout}
    >
      <div className="pb-32">
        {renderContent()}
      </div>
      <NotificationCenter 
        isOpen={isNotifOpen} 
        onClose={() => setIsNotifOpen(false)} 
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
      />
    </MobileLayout>
  );
};

export default AdminDashboard;
