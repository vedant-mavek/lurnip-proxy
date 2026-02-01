
import React, { useState, useEffect } from 'react';
import { UserProfile, Lesson } from '../../types';
import MobileLayout from '../../components/MobileLayout';
import { studentService } from '../../services/studentService';
import HomeView from './HomeView';
import StudyMaterialView from './StudyMaterialView';
import LessonView from './LessonView';
import TimetableView from './TimetableView';
import ReportIssueView from './ReportIssueView';
import ResultsView from './ResultsView';
import AssignmentsView from './AssignmentsView';
import AnnouncementsView from './AnnouncementsView';

interface StudentDashboardProps {
  user: UserProfile;
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeSubView, setActiveSubView] = useState<'none' | 'results' | 'assignments' | 'announcements'>('none');
  const [isLoading, setIsLoading] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { id: 'study', label: 'Study', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
    { id: 'timetable', label: 'Schedule', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'report', label: 'Report', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
  ];

  const handleNavigate = (id: string) => {
    setActiveTab(id);
    setSelectedLesson(null);
    setActiveSubView('none');
  };

  const renderContent = () => {
    if (selectedLesson) {
      return <LessonView lesson={selectedLesson} onBack={() => setSelectedLesson(null)} studentId={user.id} />;
    }

    if (activeTab === 'home') {
      switch (activeSubView) {
        case 'results':
          return <ResultsView onBack={() => setActiveSubView('none')} studentId={user.id} />;
        case 'assignments':
          return <AssignmentsView onBack={() => setActiveSubView('none')} studentId={user.id} />;
        case 'announcements':
          return <AnnouncementsView onBack={() => setActiveSubView('none')} batchId={user.batchId || 'default'} />;
        default:
          return (
            <HomeView 
              userName={user.name || 'Student'} 
              onContinueLesson={() => setActiveTab('study')}
              onShowResults={() => setActiveSubView('results')}
              onShowAssignments={() => setActiveSubView('assignments')}
              onShowAnnouncements={() => setActiveSubView('announcements')}
            />
          );
      }
    }

    switch (activeTab) {
      case 'study':
        return <StudyMaterialView onSelectLesson={(l) => setSelectedLesson(l)} batchId={user.batchId || 'default'} />;
      case 'timetable':
        return <TimetableView />;
      case 'report':
        return <ReportIssueView studentId={user.id} />;
      default:
        return (
          <HomeView 
            userName={user.name || 'Student'} 
            onContinueLesson={() => setActiveTab('study')}
            onShowResults={() => setActiveSubView('results')}
            onShowAssignments={() => setActiveSubView('assignments')}
            onShowAnnouncements={() => setActiveSubView('announcements')}
          />
        );
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
      {renderContent()}
    </MobileLayout>
  );
};

export default StudentDashboard;
