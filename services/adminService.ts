
import { supabase } from '../supabase';
import { Batch, Complaint, DataExport, Sector, UserProfile, UserRole } from '../types';
import { ServiceResponse } from './authService';

export const adminService = {
  async createInstitution(name: string, type: string, slug: string): Promise<ServiceResponse<UserProfile>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id: 'admin-f6f1-4432-8811',
            email: 'registrar@' + slug + '.edu.in',
            name: 'Administrative Office',
            role: UserRole.ADMIN,
            isInstitutionSetupComplete: true
          },
          error: null
        });
      }, 1500);
    });
  },

  async createBatch(name: string, year: string, program: string, sector: Sector): Promise<ServiceResponse<Batch>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id: 'b-' + Math.random().toString(36).substr(2, 9),
            institution_id: 'inst-7721-a4b3',
            name,
            year,
            program,
            sector,
            studentCount: 0,
            teacherCount: 0,
            status: 'ACTIVE',
            created_at: new Date().toISOString()
          },
          error: null
        });
      }, 1200);
    });
  },

  async getBatches(): Promise<ServiceResponse<Batch[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 'b-9901', institution_id: 'inst-7721', name: 'B.Tech CSE - 2024 - A', sector: Sector.UNIVERSITY, program: 'Computer Science', year: 'Year 3', studentCount: 64, teacherCount: 8, status: 'ACTIVE', created_at: '2024-06-15T10:00:00Z' },
            { id: 'b-9902', institution_id: 'inst-7721', name: 'B.Tech IT - 2024 - B', sector: Sector.UNIVERSITY, program: 'Information Technology', year: 'Year 2', studentCount: 58, teacherCount: 6, status: 'ACTIVE', created_at: '2024-06-15T10:00:00Z' },
            { id: 'b-9903', institution_id: 'inst-7721', name: 'M.Tech AI - 2024', sector: Sector.UNIVERSITY, program: 'Artificial Intelligence', year: 'Year 1', studentCount: 18, teacherCount: 4, status: 'ACTIVE', created_at: '2024-08-01T09:00:00Z' },
          ],
          error: null
        });
      }, 800);
    });
  },

  async importUsers(file: File, type: 'STUDENT' | 'TEACHER'): Promise<ServiceResponse<{ total: number }>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: { total: 128 }, error: null }), 2000);
    });
  },

  async uploadTimetable(file: File, batchId: string): Promise<ServiceResponse<boolean>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: true, error: null }), 1800);
    });
  },

  async assignTeacher(batchId: string, subject: string, teacherId: string): Promise<ServiceResponse<boolean>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: true, error: null }), 1000);
    });
  },

  async getAttendanceOverview(): Promise<ServiceResponse<any>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            todaySessions: 42,
            conducted: 38,
            missed: 4,
            facultyPresent: 34,
            facultyTotal: 36,
            studentAvgAttendance: 84,
            alertBatches: 2
          },
          error: null
        });
      }, 600);
    });
  },

  async getComplaints(): Promise<ServiceResponse<Complaint[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 'cp-882', category: 'Facilities', text: 'Central Library air conditioning requires maintenance in the reading hall.', batchName: 'Institution-wide', isAnonymous: true, createdAt: '3h ago', status: 'NEW' },
            { id: 'cp-883', category: 'Academic', text: 'Delay in publication of Internal Assessment-2 results for CSE-3A.', batchName: 'B.Tech CSE - 3A', isAnonymous: false, createdAt: '6h ago', status: 'NEW' },
            { id: 'cp-884', category: 'Technical', text: 'WiFi latency issues reported in Block-B faculty rooms.', batchName: 'Staff-Global', isAnonymous: true, createdAt: '1d ago', status: 'REVIEWED' }
          ],
          error: null
        });
      }, 700);
    });
  },

  async exportData(type: string, dateRange: { start: string; end: string }): Promise<ServiceResponse<DataExport[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 'exp-12', type: 'ATTENDANCE', title: 'Monthly Attendance Log', dateRange: 'Sep 2024', format: 'CSV', fileSize: '2.4 MB', createdAt: 'Oct 01, 2024', downloadUrl: '#' },
            { id: 'exp-13', type: 'SUBMISSIONS', title: 'End-Term Assignment Data', dateRange: 'Aug - Sep 2024', format: 'ZIP', fileSize: '28.6 MB', createdAt: 'Oct 05, 2024', downloadUrl: '#' }
          ],
          error: null
        });
      }, 900);
    });
  }
};
