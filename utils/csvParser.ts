/**
 * CSV Parser Utility
 * Handles conversion of CSV content into structured JSON arrays.
 */

export interface ParseResult<T> {
  data: T[] | null;
  headers: string[] | null;
  error: string | null;
}

export const csvParser = {
  /**
   * Parses a CSV file into an array of objects using the first row as keys.
   */
  async parseFile<T = any>(file: File): Promise<ParseResult<T>> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text !== 'string') {
          resolve({ data: null, headers: null, error: 'Failed to read file as text.' });
          return;
        }
        // Fix: Use explicit reference to csvParser instead of 'this' to ensure generic type inference works correctly in nested callbacks
        resolve(csvParser.parseString<T>(text));
      };

      reader.onerror = () => {
        resolve({ data: null, headers: null, error: 'FileReader encountered an error.' });
      };

      reader.readAsText(file);
    });
  },

  /**
   * Parses a CSV string into an array of objects.
   */
  parseString<T = any>(csvText: string): ParseResult<T> {
    try {
      const lines = csvText.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
      
      if (lines.length < 1) {
        return { data: null, headers: null, error: 'The file is empty.' };
      }

      // Simple CSV split logic (handles commas, but not nested commas in quotes)
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/[^a-z0-9_]/gi, '_'));
      const rawHeaders = lines[0].split(',').map(h => h.trim());

      if (headers.some(h => !h)) {
        return { data: null, headers: null, error: 'Invalid headers detected (empty column names).' };
      }

      const data: T[] = [];

      for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split(',').map(c => c.trim());
        
        if (columns.length !== headers.length) {
          return { 
            data: null, 
            headers: null, 
            error: `Row ${i + 1} has ${columns.length} columns, but expected ${headers.length}.` 
          };
        }

        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header] = columns[index];
        });
        data.push(obj as T);
      }

      return { data, headers: rawHeaders, error: null };
    } catch (err) {
      return { data: null, headers: null, error: 'An unexpected error occurred while parsing the CSV.' };
    }
  }
};