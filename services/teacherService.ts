
import { supabase } from '../supabase';
import { Submission } from '../types';
import { ServiceResponse } from './authService';

export const teacherService = {
  async getBatches(teacherId: string): Promise<ServiceResponse<any[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 'b-9901', name: 'B.Tech CSE - 3A', studentCount: 64, program: 'Computer Science & Engineering' },
            { id: 'b-9902', name: 'B.Tech CSE - 3B', studentCount: 62, program: 'Computer Science & Engineering' },
            { id: 'b-9903', name: 'M.Tech Data Science - Yr1', studentCount: 22, program: 'Data Science' }
          ],
          error: null
        });
      }, 600);
    });
  },

  async getCurrentSession(teacherId: string): Promise<ServiceResponse<any>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id: 'ses-4421',
            subject: 'Theory of Computation',
            unit: 'Module 4: Turing Machines',
            batchId: 'b-9901',
            batchName: 'B.Tech CSE - 3A',
            startTime: '10:30 AM',
            status: 'ONGOING'
          },
          error: null
        });
      }, 400);
    });
  },

  async takeAttendance(sessionId: string, records: { studentId: string; isPresent: boolean }[]): Promise<ServiceResponse<boolean>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: true, error: null }), 1200);
    });
  },

  async getSubmissions(batchId: string): Promise<ServiceResponse<Submission[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 'sub-001', studentName: 'Aditya Deshmukh', courseName: 'ToC', lessonName: 'Context-Free Grammars', batchId: 'b-9901', content: 'A context-free grammar (CFG) is a formal grammar in which every production rule is of the form...', aiFeedback: 'Excellent grasp of formal definitions.', isLowEffort: false },
            { id: 'sub-002', studentName: 'Ananya Iyer', courseName: 'ToC', lessonName: 'Context-Free Grammars', batchId: 'b-9901', content: 'CFG basics...', aiFeedback: 'Insufficient depth for a technical summary.', isLowEffort: true },
            { id: 'sub-003', studentName: 'Rahul Mehra', courseName: 'ToC', lessonName: 'Context-Free Grammars', batchId: 'b-9901', content: 'The Chomsky hierarchy classifies CFGs as Type 2 grammars...', aiFeedback: 'Precise and well-structured analysis.', isLowEffort: false },
          ],
          error: null
        });
      }, 800);
    });
  },

  async uploadStudyMaterial(courseId: string, title: string, content: string, pdfFile?: File): Promise<ServiceResponse<boolean>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: true, error: null }), 1500);
    });
  },

  async createAnnouncement(batchId: string, title: string, message: string, isUrgent: boolean): Promise<ServiceResponse<boolean>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: true, error: null }), 1000);
    });
  },

  async getSchedule(teacherId: string): Promise<ServiceResponse<any>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            'Mon': [
              { time: '09:00 AM', subject: 'Discrete Structures', type: 'Lecture', room: 'L-201', batch: 'CSE-3A', status: 'PAST' },
              { time: '10:30 AM', subject: 'Theory of Computation', type: 'Lecture', room: 'L-402', batch: 'CSE-3A', status: 'ACTIVE' },
            ],
            'Tue': [
              { time: '11:00 AM', subject: 'Compiler Design Lab', type: 'Lab', room: 'CL-02', batch: 'CSE-3B', status: 'UPCOMING' },
            ],
            'Wed': [
              { time: '10:30 AM', subject: 'Discrete Structures', type: 'Tutorial', room: 'T-101', batch: 'CSE-3A', status: 'UPCOMING' },
            ],
            'Thu': [
              { time: '09:00 AM', subject: 'Theory of Computation', type: 'Lecture', room: 'L-402', batch: 'CSE-3B', status: 'UPCOMING' },
            ],
            'Fri': [
              { time: '02:30 PM', subject: 'Project Mentorship', type: 'Review', room: 'Online', batch: 'DS-Yr1', status: 'UPCOMING' },
            ],
          },
          error: null
        });
      }, 700);
    });
  }
};
