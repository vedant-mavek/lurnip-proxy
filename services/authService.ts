
import { supabase } from '../supabase';
import { UserRole, UserProfile } from '../types';

// Updated: Renamed AuthResponse to ServiceResponse to satisfy dependencies in student, teacher, and admin services
export interface ServiceResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

export const authService = {
  // Updated: Return type changed to ServiceResponse
  async login(email: string, password: string): Promise<ServiceResponse<UserProfile>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (password === 'error') {
          resolve({ data: null, error: { message: 'Invalid credentials. Please verify your institutional identity.' } });
        } else {
          resolve({
            data: {
              id: 'a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3o4p5',
              email,
              name: 'Dr. Rajesh Kumar',
              role: UserRole.ADMIN,
              isInstitutionSetupComplete: true
            },
            error: null
          });
        }
      }, 1500);
    });
  },

  // Updated: Return type changed to ServiceResponse
  async signup(email: string, password: string, name: string): Promise<ServiceResponse<UserProfile>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: { id: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', email, name },
          error: null
        });
      }, 1500);
    });
  },

  // Updated: Return type changed to ServiceResponse
  async resetPassword(email: string): Promise<ServiceResponse<void>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: null, error: null }), 1000);
    });
  },

  // Updated: Return type changed to ServiceResponse
  async logout(): Promise<ServiceResponse<void>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: null, error: null }), 500);
    });
  },

  // Updated: Return type changed to ServiceResponse
  async getCurrentUser(): Promise<ServiceResponse<UserProfile>> {
    return { data: null, error: null };
  }
};
