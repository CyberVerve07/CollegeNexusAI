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
import { PlusCircle, GraduationCap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { subjects, courses } from "@/lib/data";

export default function AcademicsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <GraduationCap className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold font-headline">Academic Management</h1>
            <p className="text-muted-foreground">Manage courses, subjects, batches, and sections.</p>
          </div>
        </div>
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New</Button>
      </div>

      <Tabs defaultValue="courses">
        <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="batches">Batches & Years</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
            <Card>
                <CardHeader><CardTitle>Courses</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course Name</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.map(c => (
                                <TableRow key={c.id}>
                                    <TableCell>{c.name}</TableCell>
                                    <TableCell>{c.code}</TableCell>
                                    <TableCell><Button variant="outline" size="sm">Edit</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="subjects">
            <Card>
                <CardHeader><CardTitle>Subjects</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Subject Name</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Semester</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subjects.map(s => (
                                <TableRow key={s.id}>
                                    <TableCell>{s.name}</TableCell>
                                    <TableCell>{s.code}</TableCell>
                                    <TableCell>{courses.find(c=>c.id === s.courseId)?.code}</TableCell>
                                    <TableCell>{s.semester}</TableCell>
                                    <TableCell><Button variant="outline" size="sm">Edit</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="batches">
             <Card>
                <CardHeader><CardTitle>Batches & Years</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Batch management UI would be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="sections">
             <Card>
                <CardHeader><CardTitle>Sections</CardTitle></CardHeader>
                <CardContent>
                     <p className="text-muted-foreground">Section management UI would be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
