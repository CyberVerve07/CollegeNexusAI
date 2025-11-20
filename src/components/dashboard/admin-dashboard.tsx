"use client";

import { useUser } from "@/contexts/user-context";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  FileText,
  Building2,
  Megaphone,
  BadgeCheck,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { courses, students, teachers, questionPapers } from "@/lib/data";

export function AdminDashboard() {
  const { user } = useUser();
  const unverifiedPapers = questionPapers.filter(p => !p.verified).length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">
        Administration Dashboard
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center p-4 bg-secondary rounded-lg">
                <Users className="w-8 h-8 text-primary mr-4"/>
                <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">{students.length}</p>
                </div>
            </div>
            <div className="flex items-center p-4 bg-secondary rounded-lg">
                <GraduationCap className="w-8 h-8 text-primary mr-4"/>
                <div>
                    <p className="text-sm text-muted-foreground">Total Teachers</p>
                    <p className="text-2xl font-bold">{teachers.length}</p>
                </div>
            </div>
             <div className="flex items-center p-4 bg-secondary rounded-lg">
                <Building2 className="w-8 h-8 text-primary mr-4"/>
                <div>
                    <p className="text-sm text-muted-foreground">Total Courses</p>
                    <p className="text-2xl font-bold">{courses.length}</p>
                </div>
            </div>
            <div className="flex items-center p-4 bg-secondary rounded-lg">
                <FileText className="w-8 h-8 text-primary mr-4"/>
                <div>
                    <p className="text-sm text-muted-foreground">Total Papers</p>
                    <p className="text-2xl font-bold">{questionPapers.length}</p>
                </div>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage core components of the application.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/dashboard/admin/users" passHref>
                <Button className="w-full h-20 text-lg" variant="outline"><Users className="mr-2"/>Manage Users</Button>
            </Link>
            <Link href="/dashboard/admin/academics" passHref>
                <Button className="w-full h-20 text-lg" variant="outline"><GraduationCap className="mr-2"/>Manage Academics</Button>
            </Link>
            <Link href="/dashboard/notices" passHref>
                <Button className="w-full h-20 text-lg" variant="outline"><Megaphone className="mr-2"/>Send Global Notice</Button>
            </Link>
        </CardContent>
      </Card>

      <Card className="border-accent">
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><BadgeCheck className="text-accent"/>Verification Queue</CardTitle>
            <CardDescription>Review and approve teacher uploads.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
            <div>
                <p className="text-3xl font-bold">{unverifiedPapers}</p>
                <p className="text-muted-foreground">Question Papers waiting for approval.</p>
            </div>
            <Link href="/dashboard/papers" passHref>
                <Button>Review Uploads</Button>
            </Link>
        </CardContent>
      </Card>

    </div>
  );
}
