"use client";

import { useUser } from "@/contexts/user-context";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  CheckCircle,
  Megaphone,
  BookOpen,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { notices, timetable } from "@/lib/data";
import { Badge } from "../ui/badge";

export function StudentDashboard() {
  const { user } = useUser();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  const upcomingClasses = timetable.filter(t => t.day === today).slice(0, 2);
  const recentNotices = notices.slice(0, 3);
  const attendancePercentage = 78; // Mock data

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">
        Welcome back, {user?.name.split(" ")[0]}!
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Attendance
            </CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendancePercentage}%</div>
            <Progress value={attendancePercentage} className="w-full h-2 mt-2" />
            {attendancePercentage < 75 && <p className="text-xs text-destructive mt-1">Attendance is low!</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Lectures Today
            </CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingClasses.length}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingClasses.map(c => c.subject).join(', ') || 'No classes today'}
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recent Notices</CardTitle>
            <Megaphone className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentNotices.length}</div>
            <p className="text-xs text-muted-foreground">New announcements available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Materials</CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">For Data Structures</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your schedule for today, {today}.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Teacher</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingClasses.length > 0 ? upcomingClasses.map((item) => (
                  <TableRow key={item.time}>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.teacher}</TableCell>
                  </TableRow>
                )) : <TableRow><TableCell colSpan={3} className="text-center">No more classes scheduled for today.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notices</CardTitle>
            <CardDescription>Stay updated with the latest news.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentNotices.map((notice) => (
              <div key={notice.id} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Megaphone className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold">{notice.title}</p>
                  <p className="text-sm text-muted-foreground">{notice.content.substring(0, 50)}...</p>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                    <span>{notice.date}</span>
                    <Badge variant={notice.audience === 'Global' ? 'default' : 'secondary'}>{notice.audience}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
