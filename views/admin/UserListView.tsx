
import React, { useState } from 'react';
import { UserRole, UserProfile } from '../../types';

const UserListView: React.FC = () => {
  const [roleFilter, setRoleFilter] = useState<UserRole | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [batchFilter, setBatchFilter] = useState('ALL');

  const users: UserProfile[] = [
    { id: '1', name: 'Dr. Emily Watson', email: 'e.watson@lurnip.edu', role: UserRole.TEACHER, batchId: 'FACULTY' },
    { id: '2', name: 'James Morrison', email: 'j.morrison@lurnip.edu', role: UserRole.TEACHER, batchId: 'FACULTY' },
    { id: '3', name: 'Alex Rivera', email: 'alex.r@lurnip.edu', role: UserRole.STUDENT, batchId: 'BSCS-24-A' },
    { id: '4', name: 'Chloe Kim', email: 'chloe.k@lurnip.edu', role: UserRole.STUDENT, batchId: 'BSCS-24-B' },
    { id: '5', name: 'Sarah Jenkins', email: 'sarah.j@lurnip.edu', role: UserRole.STUDENT, batchId: 'BSCS-24-A' },
    { id: '6', name: 'Marcus Thompson', email: 'm.thompson@lurnip.edu', role: UserRole.STUDENT, batchId: 'PRE-ENG-24' },
  ];

  const batches = Array.from(new Set(users.map(u => u.batchId).filter(Boolean)));

  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
    const matchesBatch = batchFilter === 'ALL' || user.batchId === batchFilter;
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRole && matchesBatch && matchesSearch;
  });

  const clearFilters = () => {
    setRoleFilter('ALL');
    setSearchTerm('');
    setBatchFilter('ALL');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 px-1">
      <header className="space-y-6">
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter">Registry</h2>
          <p className="text-[#888888] font-medium text-base sm:text-lg mt-1 tracking-tight">Active institutional users directory.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="bg-[#121212] p-1 rounded-full flex gap-1 border border-white/5 w-fit overflow-x-auto no-scrollbar max-w-full">
            {(['ALL', UserRole.TEACHER, UserRole.STUDENT] as const).map((f) => (
              <button
                key={f}
                onClick={() => setRoleFilter(f)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${roleFilter === f ? 'bg-white text-black shadow-lg' : 'text-[#555555] hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-[#444444] group-focus-within:text-[#D8FF5B] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                placeholder="Search name/email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#111111] rounded-full h-12 pl-12 pr-6 text-white text-sm font-bold outline-none border border-white/5 focus:border-[#D8FF5B]/30 transition-all placeholder:text-[#333333]"
              />
            </div>
            
            <div className="relative sm:w-48">
              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="w-full h-12 bg-[#111111] border border-white/5 rounded-full px-6 pr-10 text-[10px] font-black uppercase tracking-widest text-white outline-none appearance-none cursor-pointer focus:border-[#D8FF5B]/30 transition-all"
              >
                <option value="ALL">All Batches</option>
                {batches.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#444444]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-12">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-[#0C0C0C] border border-white/5 rounded-[24px] p-5 sm:p-6 group hover:border-white/10 transition-all active:scale-[0.98]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center font-black shrink-0 transition-colors ${user.role === UserRole.TEACHER ? 'text-[#D8FF5B]' : 'text-[#4B85FD]'}`}>
                    {user.name?.[0]}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-none mb-1 truncate">{user.name}</h4>
                    <p className="text-xs sm:text-sm text-[#555555] font-medium truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-[9px] sm:text-[10px] font-black text-[#555555] uppercase tracking-widest bg-white/5 px-2 sm:px-3 py-1 rounded-lg">{user.role}</span>
                  <span className="text-[8px] font-black text-[#333333] uppercase tracking-widest">{user.batchId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 sm:py-32 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-[#222222] mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#444444] tracking-tight px-4">No registry matches</h3>
          <p className="text-sm text-[#333333] font-medium mt-1 px-4">Try adjusting your filters or search terms.</p>
          <button 
            onClick={clearFilters}
            className="mt-8 text-xs font-black text-[#D8FF5B] uppercase tracking-[0.2em] border-b border-[#D8FF5B]/20 pb-1 hover:text-white hover:border-white transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default UserListView;
