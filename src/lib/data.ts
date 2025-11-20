import type { User, Student, Teacher, Course, Subject, AttendanceRecord, TimetableEntry, StudyMaterial, QuestionPaper, Notice } from './types';

export const users: User[] = [
  { id: 'admin-01', name: 'Dr. Evelyn Reed', email: 'admin@collegenexus.edu', role: 'admin', avatar: 'admin-avatar' },
  { id: 'teacher-01', name: 'Prof. Alan Grant', email: 'agrant@collegenexus.edu', role: 'teacher', avatar: 'teacher-avatar' },
  { id: 'student-01', name: 'Alex Johnson', email: 'ajohnson@collegenexus.edu', role: 'student', avatar: 'student-avatar' },
];

export const courses: Course[] = [
  { id: 'course-bca', name: 'Bachelor of Computer Applications', code: 'BCA' },
  { id: 'course-bba', name: 'Bachelor of Business Administration', code: 'BBA' },
  { id: 'course-bcom', name: 'Bachelor of Commerce', code: 'BCom' },
  { id: 'course-ba', name: 'Bachelor of Arts', code: 'BA' },
];

export const subjects: Subject[] = [
    // BCA Sem 3
    { id: 'subj-bca3-1', name: 'Data Structures', code: 'BCA-301', semester: 3, courseId: 'course-bca' },
    { id: 'subj-bca3-2', name: 'Operating Systems', code: 'BCA-302', semester: 3, courseId: 'course-bca' },
    { id: 'subj-bca3-3', name: 'Database Management', code: 'BCA-303', semester: 3, courseId: 'course-bca' },
    { id: 'subj-bca3-4', name: 'Web Technologies', code: 'BCA-304', semester: 3, courseId: 'course-bca' },
    // BBA Sem 3
    { id: 'subj-bba3-1', name: 'Business Law', code: 'BBA-301', semester: 3, courseId: 'course-bba' },
    // BCom Sem 3
    { id: 'subj-bcom3-1', name: 'Corporate Accounting', code: 'BCOM-301', semester: 3, courseId: 'course-bcom' },
];

export const students: (Student | User)[] = [
  { ...users.find(u => u.role === 'student')!, id: 'student-01', courseId: 'course-bca', semester: 3, section: 'A', batch: '2022-2025' },
  { id: 'student-02', name: 'Maria Garcia', email: 'mgarcia@collegenexus.edu', role: 'student', courseId: 'course-bca', semester: 3, section: 'A', batch: '2022-2025', avatar: 'student-1' },
  { id: 'student-03', name: 'Chen Wei', email: 'cwei@collegenexus.edu', role: 'student', courseId: 'course-bca', semester: 3, section: 'A', batch: '2022-2025', avatar: 'student-2' },
  { id: 'student-04', name: 'Fatima Al-Jamil', email: 'faljamil@collegenexus.edu', role: 'student', courseId: 'course-bca', semester: 3, section: 'A', batch: '2022-2025', avatar: 'student-3' },
];


export const teachers: (Teacher | User)[] = [
    {
        ...users.find(u => u.role === 'teacher')!,
        id: 'teacher-01',
        assignedSubjects: [
            { subjectId: 'subj-bca3-1', section: 'A' },
            { subjectId: 'subj-bca3-2', section: 'A' },
        ],
    },
    { id: 'teacher-02', name: 'Dr. Ellie Sattler', email: 'esattler@collegenexus.edu', role: 'teacher', avatar: 'admin-avatar', assignedSubjects: [{ subjectId: 'subj-bca3-3', section: 'A' }]}
];

export const attendanceRecords: AttendanceRecord[] = [
    { id: 'att-1', studentId: 'student-01', subjectId: 'subj-bca3-1', date: '2023-10-26', status: 'Present' },
    { id: 'att-2', studentId: 'student-01', subjectId: 'subj-bca3-1', date: '2023-10-27', status: 'Present' },
    { id: 'att-3', studentId: 'student-01', subjectId: 'subj-bca3-1', date: '2023-10-28', status: 'Absent' },
    { id: 'att-4', studentId: 'student-01', subjectId: 'subj-bca3-2', date: '2023-10-26', status: 'Present' },
    { id: 'att-5', studentId: 'student-01', subjectId: 'subj-bca3-2', date: '2023-10-27', status: 'Late' },
    { id: 'att-6', studentId: 'student-02', subjectId: 'subj-bca3-1', date: '2023-10-26', status: 'Present' },
    { id: 'att-7', studentId: 'student-02', subjectId: 'subj-bca3-1', date: '2023-10-27', status: 'Absent' },
    { id: 'att-8', studentId: 'student-03', subjectId: 'subj-bca3-1', date: '2023-10-26', status: 'Absent' },
    { id: 'att-9', studentId: 'student-03', subjectId: 'subj-bca3-1', date: '2023-10-27', status: 'Present' },
];

export const timetable: TimetableEntry[] = [
    { day: 'Monday', time: '09:00 - 10:00', subject: 'Data Structures', teacher: 'Prof. Alan Grant' },
    { day: 'Monday', time: '10:00 - 11:00', subject: 'Operating Systems', teacher: 'Prof. Alan Grant' },
    { day: 'Tuesday', time: '11:00 - 12:00', subject: 'Database Management', teacher: 'Dr. Ellie Sattler' },
    { day: 'Wednesday', time: '09:00 - 10:00', subject: 'Data Structures', teacher: 'Prof. Alan Grant' },
    { day: 'Wednesday', time: '10:00 - 11:00', subject: 'Web Technologies', teacher: 'Dr. Ian Malcolm' },
    { day: 'Thursday', time: '11:00 - 12:00', subject: 'Operating Systems', teacher: 'Prof. Alan Grant' },
    { day: 'Friday', time: '09:00 - 10:00', subject: 'Database Management', teacher: 'Dr. Ellie Sattler' },
];

export const studyMaterials: StudyMaterial[] = [
    { id: 'mat-1', title: 'Lecture 1: Intro to Linked Lists', subjectId: 'subj-bca3-1', uploadedBy: 'teacher-01', uploadDate: '2023-10-15', type: 'PDF', url: '#' },
    { id: 'mat-2', title: 'Lecture 2: Stacks and Queues', subjectId: 'subj-bca3-1', uploadedBy: 'teacher-01', uploadDate: '2023-10-22', type: 'PDF', url: '#' },
    { id: 'mat-3', title: 'Diagram: Process States', subjectId: 'subj-bca3-2', uploadedBy: 'teacher-01', uploadDate: '2023-10-18', type: 'Image', url: '#' },
];

export const questionPapers: QuestionPaper[] = [
    { id: 'qp-1', subjectId: 'subj-bca3-1', courseId: 'course-bca', semester: 3, examType: 'Midterm', year: 2023, uploadedBy: 'teacher-01', verified: true, url: '#' },
    { id: 'qp-2', subjectId: 'subj-bca3-1', courseId: 'course-bca', semester: 3, examType: 'End Sem', year: 2022, uploadedBy: 'admin-01', verified: true, url: '#' },
    { id: 'qp-3', subjectId: 'subj-bca3-3', courseId: 'course-bca', semester: 3, examType: 'Midterm', year: 2023, uploadedBy: 'teacher-02', verified: false, url: '#' },
];

export const notices: Notice[] = [
    { id: 'notice-1', title: 'Midterm Exam Schedule', content: 'The midterm examinations for 3rd semester will commence from November 15th.', date: '2023-10-25', audience: 'Global' },
    { id: 'notice-2', title: 'Data Structures Extra Class', content: 'An extra class for Data Structures will be held on Saturday at 10 AM.', date: '2023-10-26', audience: 'BCA-3A' },
];
