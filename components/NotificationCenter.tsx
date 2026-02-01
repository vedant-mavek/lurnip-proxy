
import React from 'react';
import { AppNotification } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose, notifications, onMarkAsRead }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-start sm:justify-end p-4 sm:p-8 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative w-full max-w-sm bg-[#111111] rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-8 sm:slide-in-from-right-8 duration-500">
        <header className="px-10 pt-10 pb-6 flex items-center justify-between sticky top-0 bg-[#111111] z-10">
          <h3 className="text-3xl font-extrabold text-white tracking-tight">Alerts</h3>
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-[#222222] rounded-full flex items-center justify-center text-[#555555] hover:text-white transition-colors border border-white/5"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 pb-12 space-y-4 no-scrollbar">
          {notifications.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-[#222222] rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-[#333333]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </div>
              <p className="text-[#555555] font-black text-sm uppercase tracking-widest">Quiet for now</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div 
                key={n.id}
                onClick={() => onMarkAsRead(n.id)}
                className={`group p-6 rounded-[32px] border transition-all cursor-pointer relative ${
                  n.isRead ? 'bg-black/40 border-white/5 opacity-50' : 'bg-[#181818] border-white/5 shadow-xl'
                }`}
              >
                {!n.isRead && (
                  <div className="absolute top-8 right-8 w-2 h-2 bg-[#D7FF5A] rounded-full shadow-[0_0_12px_rgba(215,255,90,0.5)]" />
                )}
                
                <div className="flex gap-5 items-start">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                    n.type === 'ASSIGNMENT' ? 'bg-[#4B85FD]/10 text-[#4B85FD]' :
                    n.type === 'ANNOUNCEMENT' ? 'bg-[#D7FF5A]/10 text-[#D7FF5A]' :
                    'bg-[#FF3AD3]/10 text-[#FF3AD3]'
                  }`}>
                    {n.type === 'ASSIGNMENT' && <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                    {n.type === 'ANNOUNCEMENT' && <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}
                    {n.type === 'MESSAGE' && <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-white leading-tight mb-1">{n.title}</h4>
                    <p className="text-sm text-[#888888] font-medium leading-relaxed line-clamp-2">{n.message}</p>
                    <span className="text-[10px] text-[#444444] font-black uppercase tracking-widest block mt-4">{n.createdAt}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
