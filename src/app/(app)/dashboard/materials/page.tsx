"use client";

import { useUser } from "@/contexts/user-context";
import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Book, Download, File, Image, Upload } from "lucide-react";
import { studyMaterials as initialMaterials, subjects, teachers } from "@/lib/data";
import { StudyMaterial } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

function TeacherMaterialsView() {
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [materials, setMaterials] = useState(initialMaterials);
  
  const handleUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newMaterial: StudyMaterial = {
        id: `mat-${Date.now()}`,
        title: formData.get('title') as string,
        subjectId: formData.get('subject') as string,
        uploadDate: new Date().toISOString().split('T')[0],
        type: (formData.get('file') as File).type.startsWith('image/') ? 'Image' : 'PDF',
        uploadedBy: 'teacher-01',
        url: '#'
    };
    setMaterials(prev => [newMaterial, ...prev]);
    setUploadDialogOpen(false);
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manage Study Materials</CardTitle>
            <CardDescription>Upload and manage resources for your subjects.</CardDescription>
          </div>
          <Button onClick={() => setUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" /> Upload Material
          </Button>
        </CardHeader>
        <CardContent>
           <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Upload Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {materials.map((material) => (
                        <TableRow key={material.id}>
                            <TableCell className="font-medium">{material.title}</TableCell>
                            <TableCell>{subjects.find(s => s.id === material.subjectId)?.name}</TableCell>
                            <TableCell>
                                <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                                    {material.type === 'PDF' ? <File className="h-3 w-3"/> : <Image className="h-3 w-3" />}
                                    {material.type}
                                </Badge>
                            </TableCell>
                            <TableCell>{material.uploadDate}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm">Edit</Button>
                                <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isUploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Upload New Material</DialogTitle>
                <DialogDescription>Fill in the details and upload the file for your students.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="e.g., Lecture 3 Notes on Algorithms" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select name="subject" required>
                        <SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger>
                        <SelectContent>
                            {subjects.filter(s => s.courseId === 'course-bca').map(s => (
                                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="file">File</Label>
                    <Input id="file" name="file" type="file" required accept=".pdf, image/*" />
                </div>
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">Upload</Button>
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

function StudentMaterialsView() {
  return (
     <Card>
        <CardHeader>
            <CardTitle>Study Materials</CardTitle>
            <CardDescription>Download lecture notes, presentations, and other resources.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Download</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {initialMaterials.map((material) => (
                        <TableRow key={material.id}>
                            <TableCell className="font-medium flex items-center gap-2">
                                {material.type === 'PDF' ? <File className="h-4 w-4 text-muted-foreground"/> : <Image className="h-4 w-4 text-muted-foreground" />}
                                {material.title}
                            </TableCell>
                            <TableCell>{subjects.find(s => s.id === material.subjectId)?.name}</TableCell>
                            <TableCell>{teachers.find(t => t.id === material.uploadedBy)?.name}</TableCell>
                            <TableCell>{material.uploadDate}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm" asChild>
                                    <a href={material.url} download><Download className="mr-2 h-4 w-4"/>Download</a>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
     </Card>
  );
}


export default function MaterialsPage() {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
        <Book className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline">Study Materials</h1>
      </div>
      {user.role === "teacher" || user.role === "admin" ? <TeacherMaterialsView /> : <StudentMaterialsView />}
    </div>
  );
}
