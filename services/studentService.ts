import { supabase } from '../supabase';
import { ServiceResponse } from './authService';

export const studentService = {
  async getCourses(batchId: string): Promise<ServiceResponse<any[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 'c1d2e3f4-5678-4321-8765-a1b2c3d4e5f6',
              name: 'Advanced Data Structures',
              lessons: [
                { id: 'l1a2b3c4', title: 'AVL Trees & Rotations', status: 'SUBMITTED', content: 'In computer science, an AVL tree is a self-balancing binary search tree...' },
                { id: 'l2b3c4d5', title: 'B-Trees in Database Systems', status: 'IN_PROGRESS', content: 'A B-tree is a self-balancing tree data structure that maintains sorted data...' }
              ]
            },
            {
              id: 'd2e3f4g5-6789-5432-9876-b2c3d4e5f6g7',
              name: 'Microprocessors & Interfacing',
              lessons: [
                { id: 'l3c4d5e6', title: '8086 Instruction Set Architecture', status: 'NOT_STARTED', content: 'The 8086 is a 16-bit microprocessor chip designed by Intel...' }
              ]
            }
          ],
          error: null
        });
      }, 800);
    });
  },

  async getAssignments(studentId: string): Promise<ServiceResponse<any[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 'as-101', title: 'Red-Black Tree Simulation', course: 'ADS', deadline: '25 Oct 2024', status: 'pending', urgent: true },
            { id: 'as-102', title: 'DMA Controller Interfacing Lab', course: 'Microprocessors', deadline: '30 Oct 2024', status: 'pending', urgent: false }
          ],
          error: null
        });
      }, 600);
    });
  },

  async evaluateSubmission(instructions: string, content: string): Promise<ServiceResponse<string>> {
    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instructions, content }),
      });
      const result = await response.json();
      return { data: result.data, error: null };
    } catch (error: any) {
      console.error('Evaluation Error:', error);
      return { data: 'Submission received. AI evaluation currently unavailable, but your instructor will review it shortly.', error: null };
    }
  },

  async submitAssignment(studentId: string, lessonId: string, content: string, file?: File): Promise<ServiceResponse<boolean>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: true, error: null }), 1500);
    });
  },

  async getResults(studentId: string): Promise<ServiceResponse<any>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            gpa: 8.74,
            scale: 10.0,
            subjects: [
              { name: 'Engineering Mathematics III', grade: 'O', score: '96/100', trend: 'up' },
              { name: 'Computer Organization', grade: 'A+', score: '89/100', trend: 'stable' },
              { name: 'Digital Electronics', grade: 'A', score: '82/100', trend: 'down' }
            ]
          },
          error: null
        });
      }, 1000);
    });
  },

  async getAnnouncements(batchId: string): Promise<ServiceResponse<any[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 101, title: 'Diwali Institutional Holiday', content: 'The institution will remain closed from October 31st to November 4th for Diwali festivities.', date: '2h ago', type: 'GENERAL', color: '#FF3FD3' },
            { id: 102, title: 'Campus Recruitment: Infosys', content: 'Infosys will be conducting a pool campus drive for final year B.E./B.Tech students on Nov 12th.', date: '5h ago', type: 'URGENT', color: '#D8FF5B' }
          ],
          error: null
        });
      }, 700);
    });
  },

  async uploadReport(studentId: string, category: string, text: string, isAnonymous: boolean): Promise<ServiceResponse<boolean>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: true, error: null }), 1200);
    });
  }
};