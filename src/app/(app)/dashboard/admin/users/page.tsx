
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, MoreHorizontal, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { students, teachers, courses } from "@/lib/data";
import placeholderImages from "@/lib/placeholder-images.json";
import type { Student, Teacher } from "@/lib/types";

export default function UsersPage() {
    
    const UserActions = ({ userId }: { userId: string }) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold font-headline">User Management</h1>
            <p className="text-muted-foreground">Add, edit, and manage student and teacher accounts.</p>
          </div>
        </div>
        <div className="flex gap-2">
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Teacher</Button>
            <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add Student</Button>
        </div>
      </div>

      <Tabs defaultValue="students">
        <TabsList>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
            <Card>
                <CardHeader>
                    <CardTitle>Students</CardTitle>
                    <CardDescription>A list of all students in the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Semester</TableHead>
                                <TableHead>Section</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((s) => {
                                const student = s as Student;
                                const avatar = placeholderImages.placeholderImages.find(p => p.id === student.avatar);
                                return (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium flex items-center gap-3">
                                        <Avatar>
                                            {avatar && <AvatarImage src={avatar.imageUrl} />}
                                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p>{student.name}</p>
                                            <p className="text-sm text-muted-foreground">{student.email}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{courses.find(c => c.id === student.courseId)?.code}</TableCell>
                                    <TableCell>{student.semester}</TableCell>
                                    <TableCell>{student.section}</TableCell>
                                    <TableCell className="text-right"><UserActions userId={student.id} /></TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="teachers">
            <Card>
                <CardHeader>
                    <CardTitle>Teachers</CardTitle>
                    <CardDescription>A list of all teachers in the system.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Assigned Subjects</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teachers.map((t) => {
                                const teacher = t as Teacher;
                                const avatar = placeholderImages.placeholderImages.find(p => p.id === teacher.avatar);
                                return (
                                <TableRow key={teacher.id}>
                                    <TableCell className="font-medium flex items-center gap-3">
                                        <Avatar>
                                            {avatar && <AvatarImage src={avatar.imageUrl} />}
                                            <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p>{teacher.name}</p>
                                            <p className="text-sm text-muted-foreground">{teacher.email}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{teacher.assignedSubjects.length}</TableCell>
                                    <TableCell className="text-right"><UserActions userId={teacher.id} /></TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
