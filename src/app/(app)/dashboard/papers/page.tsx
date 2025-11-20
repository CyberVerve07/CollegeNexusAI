"use client";

import { useUser } from "@/contexts/user-context";
import { useState, useMemo } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Download, Upload, Filter, Check, X } from "lucide-react";
import { questionPapers as initialPapers, subjects, courses } from "@/lib/data";
import { QuestionPaper } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PapersPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [papers, setPapers] = useState(initialPapers);
  
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [semesterFilter, setSemesterFilter] = useState<string>('all');
  
  const filteredPapers = useMemo(() => {
    return papers.filter(paper => 
      (courseFilter === 'all' || paper.courseId === courseFilter) &&
      (semesterFilter === 'all' || paper.semester.toString() === semesterFilter)
    );
  }, [papers, courseFilter, semesterFilter]);

  const canUpload = user?.role === 'admin' || user?.role === 'teacher';
  const isAdmin = user?.role === 'admin';

  const handleVerify = (paperId: string) => {
    setPapers(papers.map(p => p.id === paperId ? {...p, verified: true} : p));
    toast({
        title: "Paper Verified!",
        description: "The question paper is now available to students."
    })
  };

  const PapersTable = ({ papersToList, isVerification = false }: { papersToList: QuestionPaper[], isVerification?: boolean}) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Subject</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Exam Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {papersToList.length > 0 ? papersToList.map((paper) => (
          <TableRow key={paper.id}>
            <TableCell className="font-medium">{subjects.find(s => s.id === paper.subjectId)?.name}</TableCell>
            <TableCell>{paper.year}</TableCell>
            <TableCell><Badge variant="outline">{paper.examType}</Badge></TableCell>
            <TableCell>
              {paper.verified ? (
                <Badge variant="default" className="bg-green-500 hover:bg-green-600">Verified</Badge>
              ) : (
                <Badge variant="destructive">Unverified</Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
                {isVerification ? (
                     <Button variant="outline" size="sm" onClick={() => handleVerify(paper.id)}><Check className="mr-2 h-4 w-4"/>Approve</Button>
                ) : (
                    <Button variant="outline" size="sm" asChild>
                        <a href={paper.url} download><Download className="mr-2 h-4 w-4"/>Download</a>
                    </Button>
                )}
            </TableCell>
          </TableRow>
        )) : <TableRow><TableCell colSpan={5} className="text-center">No papers match your filters.</TableCell></TableRow>}
      </TableBody>
    </Table>
  );

  const mainView = (
    <Card>
      <CardHeader>
        <CardTitle>Previous Year Papers</CardTitle>
        <CardDescription>Filter and download question papers.</CardDescription>
        <div className="flex flex-col md:flex-row gap-4 pt-4">
            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground"/>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                    <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Filter by course..." /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        {courses.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground"/>
                 <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                    <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Filter by semester..." /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Semesters</SelectItem>
                        {[1, 2, 3, 4, 5, 6].map(s => <SelectItem key={s} value={s.toString()}>Semester {s}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <PapersTable papersToList={filteredPapers.filter(p => p.verified || isAdmin)} />
      </CardContent>
    </Card>
  );

  const verificationView = (
    <Card>
        <CardHeader>
            <CardTitle>Verification Queue</CardTitle>
            <CardDescription>Approve or reject question papers uploaded by teachers.</CardDescription>
        </CardHeader>
        <CardContent>
            <PapersTable papersToList={papers.filter(p => !p.verified)} isVerification={true} />
        </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold font-headline">Question Papers</h1>
            <p className="text-muted-foreground">Find resources for your exams.</p>
          </div>
        </div>
        {canUpload && (
          <Button><Upload className="mr-2 h-4 w-4" /> Upload Paper</Button>
        )}
      </div>

      {isAdmin ? (
        <Tabs defaultValue="browse">
            <TabsList>
                <TabsTrigger value="browse">Browse All Papers</TabsTrigger>
                <TabsTrigger value="verify">
                    Verification Queue 
                    <Badge className="ml-2">{papers.filter(p => !p.verified).length}</Badge>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="browse">{mainView}</TabsContent>
            <TabsContent value="verify">{verificationView}</TabsContent>
        </Tabs>
      ) : (
        mainView
      )}
    </div>
  );
}
