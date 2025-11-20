export type UserRole = "student" | "teacher" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Course {
  id: string;
  name: string;
  code: "BCA" | "BBA" | "BCom" | "BA";
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  semester: number;
  courseId: string;
}

export interface Student extends User {
  role: "student";
  courseId: string;
  semester: number;
  section: "A" | "B" | "C";
  batch: string; // e.g., "2022-2025"
}

export interface Teacher extends User {
  role: "teacher";
  assignedSubjects: {
    subjectId: string;
    section: "A" | "B" | "C";
  }[];
}

export type AttendanceStatus = "Present" | "Absent" | "Late";

export interface AttendanceRecord {
  id: string;
  studentId: string;
  subjectId: string;
  date: string;
  status: AttendanceStatus;
}

export interface TimetableEntry {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  time: string; // e.g., "09:00 - 10:00"
  subject: string;
  teacher: string;
}

export interface StudyMaterial {
    id: string;
    title: string;
    subjectId: string;
    uploadedBy: string; // Teacher ID
    uploadDate: string;
    type: 'PDF' | 'Image';
    url: string;
}

export type ExamType = 'Midterm' | 'End Sem' | 'Internal';

export interface QuestionPaper {
    id: string;
    subjectId: string;
    courseId: string;
    semester: number;
    examType: ExamType;
    year: number;
    uploadedBy: string; // Teacher or Admin ID
    verified: boolean;
    url: string;
}

export interface Notice {
    id: string;
    title: string;
    content: string;
    date: string;
    audience: 'Global' | 'BCA' | 'BBA' | 'BCom' | 'BA' | string; // Can be global, course-specific, or class-specific (e.g., 'BCA-3A')
}
