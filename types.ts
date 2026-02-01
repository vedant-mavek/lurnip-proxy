
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export enum Sector {
  SCHOOL = 'SCHOOL',
  COLLEGE = 'COLLEGE',
  UNIVERSITY = 'UNIVERSITY',
  COACHING = 'COACHING'
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED'
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role?: UserRole;
  batchId?: string;
  sector?: Sector;
  isInstitutionSetupComplete?: boolean;
}

/** 
 * DATABASE TABLE TYPES 
 * These follow the standard Supabase structure for Row, Insert, and Update operations.
 */

// 1. Institutions
export interface InstitutionRow {
  id: string;
  name: string;
  slug: string;
  type: string;
  created_at: string;
  owner_id: string;
}
export type InstitutionInsert = Omit<InstitutionRow, 'id' | 'created_at'>;
export type InstitutionUpdate = Partial<InstitutionInsert>;

// 2. Profiles (Extended User Data)
export interface ProfileRow {
  id: string; // References auth.users.id
  institution_id: string | null;
  email: string;
  name: string | null;
  role: UserRole | null;
  batch_id: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}
export type ProfileInsert = Omit<ProfileRow, 'created_at' | 'updated_at'>;
export type ProfileUpdate = Partial<ProfileInsert>;

// 3. Batches
export interface BatchRow {
  id: string;
  institution_id: string;
  name: string;
  year: string;
  program: string | null;
  sector: Sector;
  status: 'ACTIVE' | 'ARCHIVED';
  created_at: string;
}
export type BatchInsert = Omit<BatchRow, 'id' | 'created_at'>;
export type BatchUpdate = Partial<BatchInsert>;

// 4. Subjects
export interface SubjectRow {
  id: string;
  institution_id: string;
  name: string;
  code: string | null;
  description: string | null;
  created_at: string;
}
export type SubjectInsert = Omit<SubjectRow, 'id' | 'created_at'>;
export type SubjectUpdate = Partial<SubjectInsert>;

// 5. Courses (Batch-Subject Mapping)
export interface CourseRow {
  id: string;
  batch_id: string;
  subject_id: string;
  teacher_id: string;
  created_at: string;
}
export type CourseInsert = Omit<CourseRow, 'id' | 'created_at'>;
export type CourseUpdate = Partial<CourseInsert>;

// 6. Lessons
export interface LessonRow {
  id: string;
  course_id: string;
  title: string;
  content: string | null;
  order_index: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'SUBMITTED';
  created_at: string;
}
export type LessonInsert = Omit<LessonRow, 'id' | 'created_at'>;
export type LessonUpdate = Partial<LessonInsert>;

// 7. Assignments
export interface AssignmentRow {
  id: string;
  lesson_id: string;
  title: string;
  type: 'ONLINE' | 'OFFLINE';
  instructions: string | null;
  due_date: string | null;
  max_points: number | null;
  created_at: string;
}
export type AssignmentInsert = Omit<AssignmentRow, 'id' | 'created_at'>;
export type AssignmentUpdate = Partial<AssignmentInsert>;

// 8. Submissions
export interface SubmissionRow {
  id: string;
  assignment_id: string;
  student_id: string;
  content: string | null;
  file_url: string | null;
  ai_feedback: string | null;
  is_low_effort: boolean;
  score: number | null;
  submitted_at: string;
}
export type SubmissionInsert = Omit<SubmissionRow, 'id' | 'submitted_at'>;
export type SubmissionUpdate = Partial<SubmissionInsert>;

// 9. Attendance
export interface AttendanceRow {
  id: string;
  timetable_id: string;
  student_id: string;
  status: AttendanceStatus;
  session_date: string;
  marked_by: string; // Teacher ID
  created_at: string;
}
export type AttendanceInsert = Omit<AttendanceRow, 'id' | 'created_at'>;
export type AttendanceUpdate = Partial<AttendanceInsert>;

// 10. Timetable
export interface TimetableRow {
  id: string;
  batch_id: string;
  course_id: string;
  day_of_week: DayOfWeek;
  start_time: string;
  end_time: string;
  room: string | null;
  created_at: string;
}
export type TimetableInsert = Omit<TimetableRow, 'id' | 'created_at'>;
export type TimetableUpdate = Partial<TimetableInsert>;

// 11. Data Exports
export interface ExportRow {
  id: string;
  institution_id: string;
  requester_id: string;
  type: 'ATTENDANCE' | 'ASSIGNMENTS' | 'SUBMISSIONS';
  title: string;
  date_range: string | null;
  format: 'CSV' | 'ZIP';
  file_size: string | null;
  download_url: string | null;
  created_at: string;
}
export type ExportInsert = Omit<ExportRow, 'id' | 'created_at'>;
export type ExportUpdate = Partial<ExportInsert>;

// 12. Announcements
export interface AnnouncementRow {
  id: string;
  institution_id: string;
  batch_id: string | null; // Null means global
  author_id: string;
  title: string;
  content: string;
  is_urgent: boolean;
  type: 'GENERAL' | 'EVENT' | 'URGENT';
  created_at: string;
}
export type AnnouncementInsert = Omit<AnnouncementRow, 'id' | 'created_at'>;
export type AnnouncementUpdate = Partial<AnnouncementInsert>;

// 13. Complaints
export interface ComplaintRow {
  id: string;
  institution_id: string;
  batch_id: string | null;
  user_id: string | null; // Null if anonymous
  category: string;
  text: string;
  is_anonymous: boolean;
  status: 'NEW' | 'REVIEWED' | 'RESOLVED';
  internal_note: string | null;
  created_at: string;
}
export type ComplaintInsert = Omit<ComplaintRow, 'id' | 'created_at'>;
export type ComplaintUpdate = Partial<ComplaintInsert>;

/** 
 * UI Interfaces (Used for display and component props)
 * These often represent joined data from multiple tables.
 */

export interface Batch extends BatchRow {
  studentCount: number;
  teacherCount: number;
}

export interface TeacherAssignment {
  id: string;
  teacherId: string;
  teacherName: string;
  subjectName: string;
  batchId: string;
}

export interface TeacherPresence {
  id: string;
  teacherName: string;
  subject: string;
  batchName: string;
  status: 'CONDUCTED' | 'MISSED' | 'PENDING';
  time: string;
}

export interface Lesson extends LessonRow {
  courseId: string; // UI compatibility with legacy code
  assignment?: Assignment;
}

export interface Assignment {
  id: string;
  type: 'ONLINE' | 'OFFLINE';
  instructions: string;
  isSubmitted: boolean;
  submissionDate?: string;
  aiFeedback?: string;
}

export interface Submission {
  id: string;
  studentName: string;
  courseName: string;
  lessonName: string;
  batchId: string;
  content: string;
  aiFeedback: string;
  isLowEffort: boolean;
}

export interface Complaint {
  id: string;
  category: string;
  text: string;
  batchName: string;
  isAnonymous: boolean;
  createdAt: string;
  status: 'NEW' | 'REVIEWED';
  internalNote?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'ASSIGNMENT' | 'ANNOUNCEMENT' | 'MESSAGE';
  isRead: boolean;
  createdAt: string;
}

export interface DataExport {
  id: string;
  type: 'ATTENDANCE' | 'ASSIGNMENTS' | 'SUBMISSIONS';
  title: string;
  dateRange: string;
  format: 'CSV' | 'ZIP';
  fileSize: string;
  createdAt: string;
  downloadUrl: string;
}
