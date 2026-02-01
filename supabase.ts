
import { createClient } from '@supabase/supabase-js';
import { CONFIG } from './config';

const { URL, ANON_KEY } = CONFIG.SUPABASE;

/**
 * Supabase client instance.
 * Gracefully handles missing credentials by logging a warning instead of crashing,
 * allowing UI development to proceed without a live backend connection.
 */
export const supabase = (URL && ANON_KEY) 
  ? createClient(URL, ANON_KEY)
  : new Proxy({} as any, {
      get: (target, prop) => {
        return (...args: any[]) => {
          console.warn(`Supabase method "${String(prop)}" called without configured credentials in config.ts.`);
          return Promise.resolve({ data: null, error: new Error('Supabase not configured') });
        };
      }
    });

export default supabase;
