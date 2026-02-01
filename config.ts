
/**
 * Lurnip Application Configuration
 * Centralized store for environment variables and global constants.
 */

export const CONFIG = {
  APP: {
    NAME: 'Lurnip',
    VERSION: '1.0.0',
    DESCRIPTION: 'AI-First Education Operations Platform',
    INSTITUTION_DOMAIN: 'lurnip.edu',
  },
  
  SUPABASE: {
    URL: (import.meta as any).env?.VITE_SUPABASE_URL || '',
    ANON_KEY: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '',
  },

  STORAGE: {
    BUCKETS: {
      MATERIALS: 'study-materials',
      ASSIGNMENTS: 'student-submissions',
      INSTITUTION_ASSETS: 'institutional-records',
      PROFILES: 'user-avatars',
    },
  },

  AI: {
    MODEL_PRIMARY: 'gemini-3-flash-preview',
    MODEL_COMPLEX: 'gemini-3-pro-preview',
    DEFAULT_TEMPERATURE: 0.7,
  },

  OPERATIONS: {
    MAX_FILE_SIZE_MB: 15,
    SESSION_TIMEOUT_MS: 3600000, // 1 hour
    ATTENDANCE_THRESHOLD: 75, // Percentage
  }
};

export default CONFIG;
