
import React, { useState, useEffect } from 'react';
import { UserProfile, Submission } from '../../types';
import MobileLayout from '../../components/MobileLayout';
import { teacherService } from '../../services/teacherService';
import TeacherHomeView from './HomeView';
import TeacherCoursesView from './CoursesView';
import TeacherSubmissionsView from './SubmissionsView';
import TeacherTimetableView from './TimetableView';
import AttendanceView from './AttendanceView';
import CreateAnnouncementView from './CreateAnnouncementView';
import AssignmentsManagementView from './AssignmentsManagementView';

const TeacherDashboard: React.FC<{ user: UserProfile; onLogout: () => void }> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedBatchId, setSelectedBatchId] = useState('b1');
  const [subView, setSubView] = useState<'none' | 'submissions' | 'create-announcement' | 'assignments-management'>('none');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  useEffect(() => {
    if (subView === 'submissions') {
      const fetchSubs = async () => {
        setLoadingSubmissions(true);
        const { data } = await teacherService.getSubmissions(selectedBatchId);
        if (data) setSubmissions(data);
        setLoadingSubmissions(false);
      };
      fetchSubs();
    }
  }, [subView, selectedBatchId]);

  const navItems = [
    { id: 'home', label: 'Home', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { id: 'attendance', label: 'Attendance', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> },
    { id: 'study', label: 'Study', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
    { id: 'timetable', label: 'Schedule', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  ];

  const handleNavigate = (id: string) => {
    setActiveTab(id);
    setSubView('none');
  };

  const renderContent = () => {
    if (subView === 'submissions') {
      return (
        <div className={loadingSubmissions ? 'opacity-50 pointer-events-none' : ''}>
          <TeacherSubmissionsView 
            batchId={selectedBatchId} 
            submissions={submissions} 
            onBack={() => setSubView('none')} 
          />
          {loadingSubmissions && (
             <div className="flex justify-center py-20">
               <div className="w-8 h-8 border-4 border-[#D8FF5B]/20 border-t-[#D8FF5B] rounded-full animate-spin" />
             </div>
          )}
        </div>
      );
    }
    if (subView === 'create-announcement') {
      return <CreateAnnouncementView onBack={() => setSubView('none')} batchId={selectedBatchId} />;
    }
    if (subView === 'assignments-management') {
      return <AssignmentsManagementView batchId={selectedBatchId} onBack={() => setSubView('none')} />;
    }

    switch (activeTab) {
      case 'home':
        return (
          <TeacherHomeView 
            batchId={selectedBatchId} 
            onBatchChange={setSelectedBatchId} 
            onTakeAttendance={() => setActiveTab('attendance')}
            onViewSubmissions={() => setSubView('submissions')}
            onPostAnnouncement={() => setSubView('create-announcement')}
            onViewAssignments={() => setSubView('assignments-management')}
            teacherId={user.id}
          />
        );
      case 'attendance':
        return <AttendanceView batchId={selectedBatchId} />;
      case 'study':
        return <TeacherCoursesView batchId={selectedBatchId} />;
      case 'timetable':
        return <TeacherTimetableView batchId={selectedBatchId} teacherId={user.id} />;
      default:
        return null;
    }
  };

  return (
    <MobileLayout
      navItems={navItems}
      activeId={activeTab}
      onNavigate={handleNavigate}
      userName={user.name}
      onLogout={onLogout}
    >
      <div className="max-w-2xl mx-auto w-full">
        {renderContent()}
      </div>
    </MobileLayout>
  );
};

export default TeacherDashboard;
