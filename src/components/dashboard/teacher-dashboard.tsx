"use client";

import { useUser } from "@/contexts/user-context";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
  CheckCircle,
  Upload,
  Megaphone,
  BarChart3,
  Users,
  Book,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { teachers, subjects, students } from "@/lib/data";
import { Teacher } from "@/lib/types";

export function TeacherDashboard() {
  const { user } = useUser();
  const teacherData = teachers.find(t => t.id === user?.id) as Teacher;
  const assignedSubjects = teacherData?.assignedSubjects.map(as => {
    return subjects.find(s => s.id === as.subjectId);
  }).filter(Boolean);

  const totalStudents = students.filter(s => (s as any).section === 'A' && (s as any).courseId === 'course-bca').length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">
        Welcome, {user?.name}!
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="w-5 h-5 text-accent" />
              Attendance
            </CardTitle>
            <CardDescription>Mark attendance for your classes.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <Link href="/dashboard/attendance" passHref className="w-full">
                <Button className="w-full">Take Attendance</Button>
            </Link>
          </CardContent>
        </Card>
         <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Upload className="w-5 h-5 text-accent" />
              Uploads
            </CardTitle>
            <CardDescription>Share materials and papers.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col gap-2 justify-end">
             <Link href="/dashboard/materials" passHref className="w-full">
                <Button className="w-full" variant="outline">Upload Materials</Button>
            </Link>
             <Link href="/dashboard/papers" passHref className="w-full">
                <Button className="w-full" variant="outline">Upload Papers</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Megaphone className="w-5 h-5 text-accent" />
              Notices
            </CardTitle>
            <CardDescription>Inform your students about updates.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
             <Link href="/dashboard/notices" passHref className="w-full">
                <Button className="w-full">Send Notice</Button>
            </Link>
          </CardContent>
        </Card>
         <Card className="flex flex-col bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="w-5 h-5" />
              Class Analytics
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">View statistics for your classes.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <Button variant="secondary" className="w-full">View Analytics</Button>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Assigned Subjects</CardTitle>
                    <CardDescription>Subjects you are teaching this semester.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {assignedSubjects?.map(subject => (
                        <div key={subject?.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                            <div>
                                <p className="font-semibold">{subject?.name}</p>
                                <p className="text-sm text-muted-foreground">{subject?.code} - Semester {subject?.semester}</p>
                            </div>
                            <Book className="w-5 h-5 text-muted-foreground" />
                        </div>
                    ))}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Class Roster</CardTitle>
                    <CardDescription>BCA - Semester 3 - Section A</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                   <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-muted-foreground" />
                            <p className="font-semibold">Total Students</p>
                        </div>
                        <p className="font-bold text-xl">{totalStudents}</p>
                   </div>
                   <div className="text-center pt-2">
                        <Button variant="link">View full student list</Button>
                   </div>
                </CardContent>
            </Card>
       </div>
    </div>
  );
}
