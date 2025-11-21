
"use client";

import { useUser } from "@/contexts/user-context";
import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle, BarChart, Percent, Loader2 } from "lucide-react";
import { teachers, subjects, students as allStudents, attendanceRecords } from "@/lib/data";
import { Teacher, Student, AttendanceStatus } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import placeholderImages from "@/lib/placeholder-images.json";
import { useToast } from "@/hooks/use-toast";

function TeacherAttendanceView() {
  const { user } = useUser();
  const { toast } = useToast();
  const teacherData = useMemo(() => teachers.find((t) => t.id === user?.id) as Teacher, [user]);

  const assignedSubjects = useMemo(() => {
    if (!teacherData) return [];
    return teacherData.assignedSubjects.map((as) => {
    const subject = subjects.find((s) => s.id === as.subjectId);
    return subject ? { ...subject, section: as.section } : null;
  }).filter(Boolean);
}, [teacherData]);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [attendance, setAttendance] = useState<{ [studentId: string]: AttendanceStatus }>({});

  const studentsInClass = useMemo(() => {
    const selected = assignedSubjects?.find(s => s?.id === selectedSubjectId);
    if (!selected) return [];
    return allStudents.filter(s => {
        const studentData = s as Student;
        return studentData.courseId === selected.courseId && studentData.semester === selected.semester && studentData.section === selected.section
    });
  }, [selectedSubjectId, assignedSubjects]);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = () => {
    console.log("Submitting attendance:", attendance);
    toast({
        title: "Attendance Submitted!",
        description: `Attendance for ${subjects.find(s => s.id === selectedSubjectId)?.name} has been recorded.`,
    });
  };
  
  if (!teacherData) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Take Attendance</CardTitle>
        <CardDescription>
          Select a subject to start marking attendance for your class.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={setSelectedSubjectId}>
          <SelectTrigger className="w-full md:w-1/2">
            <SelectValue placeholder="Select a subject..." />
          </SelectTrigger>
          <SelectContent>
            {assignedSubjects?.map((subject) => (
              subject && <SelectItem key={subject.id} value={subject.id}>
                {subject.name} (Sec: {subject.section})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedSubjectId && (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentsInClass.map((student) => {
                  const avatar = placeholderImages.placeholderImages.find(p => p.id === (student as Student).avatar);
                  return (
                  <TableRow key={student.id}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar>
                        {avatar && <AvatarImage src={avatar.imageUrl} alt={student.name} data-ai-hint={avatar.imageHint} />}
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <RadioGroup
                        className="flex justify-center gap-4 md:gap-8"
                        onValueChange={(status) => handleStatusChange(student.id, status as AttendanceStatus)}
                        defaultValue="Present"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Present" id={`p-${student.id}`} />
                          <Label htmlFor={`p-${student.id}`} className="text-green-600 flex items-center gap-1"><CheckCircle className="w-4 h-4"/>Present</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Absent" id={`a-${student.id}`} />
                          <Label htmlFor={`a-${student.id}`} className="text-red-600 flex items-center gap-1"><XCircle className="w-4 h-4"/>Absent</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Late" id={`l-${student.id}`} />
                          <Label htmlFor={`l-${student.id}`} className="text-yellow-600 flex items-center gap-1"><Clock className="w-4 h-4"/>Late</Label>
                        </div>
                      </RadioGroup>
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      {selectedSubjectId && (
        <CardFooter>
            <Button onClick={handleSubmit}>Submit Attendance</Button>
        </CardFooter>
      )}
    </Card>
  );
}

function StudentAttendanceView() {
  const { user } = useUser();
  const studentRecords = useMemo(() => attendanceRecords.filter((r) => r.studentId === user?.id), [user]);

  const subjectWiseAttendance = useMemo(() => {
    const stats: { [subjectId: string]: { present: number; total: number } } = {};
    studentRecords.forEach((record) => {
      if (!stats[record.subjectId]) {
        stats[record.subjectId] = { present: 0, total: 0 };
      }
      if (record.status === "Present" || record.status === "Late") {
        stats[record.subjectId].present++;
      }
      stats[record.subjectId].total++;
    });

    return Object.entries(stats).map(([subjectId, data]) => ({
      subject: subjects.find((s) => s.id === subjectId),
      percentage: Math.round((data.present / data.total) * 100),
    }));
  }, [studentRecords]);

  const overallPercentage = useMemo(() => {
    const present = studentRecords.filter(r => r.status === 'Present' || r.status === 'Late').length;
    return studentRecords.length > 0 ? Math.round((present / studentRecords.length) * 100) : 0;
  }, [studentRecords]);
  
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart className="text-primary"/>Overall Attendance</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <div className="text-6xl font-bold text-primary">{overallPercentage}%</div>
                <Progress value={overallPercentage} className="mt-4 h-3" />
                {overallPercentage < 75 && <p className="text-destructive mt-2">Warning: Your attendance is below 75%.</p>}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Percent className="text-primary"/>Subject-wise Attendance</CardTitle>
                <CardDescription>Your attendance percentage for each subject.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
                {subjectWiseAttendance.map(({ subject, percentage }) => (
                    subject && <div key={subject.id} className="p-4 bg-secondary rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                           <p className="font-semibold">{subject.name}</p> 
                           <p className={`font-bold text-lg ${percentage < 75 ? 'text-destructive': 'text-primary'}`}>{percentage}%</p>
                        </div>
                        <Progress value={percentage} className="h-2" />
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
  );
}

export default function AttendancePage() {
  const { user, isUserLoading } = useUser();
  
  if (isUserLoading) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin" /></div>;
  }
  
  if (!user) return null;
  return user.role === "teacher" ? <TeacherAttendanceView /> : <StudentAttendanceView />;
}
