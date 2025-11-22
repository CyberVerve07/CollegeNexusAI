
"use client";

import { useUser } from "@/contexts/user-context";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Megaphone, PlusCircle } from "lucide-react";
import { notices as initialNotices, courses } from "@/lib/data";
import type { Notice } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export default function NoticesPage() {
  const { user } = useUser();
  const [isNewNoticeOpen, setNewNoticeOpen] = useState(false);
  const [notices, setNotices] = useState(initialNotices);

  const canCreateNotice = user?.role === "admin" || user?.role === "teacher";

  const handleCreateNotice = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newNotice: Notice = {
      id: `notice-${Date.now()}`,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      date: new Date().toISOString().split("T")[0],
      audience: formData.get("audience") as string,
    };
    setNotices((prev) => [newNotice, ...prev]);
    setNewNoticeOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
            <Megaphone className="h-8 w-8 text-primary" />
            <div>
                <h1 className="text-3xl font-bold font-headline">Notices</h1>
                <p className="text-muted-foreground">Latest announcements and updates.</p>
            </div>
        </div>
        {canCreateNotice && (
          <Button onClick={() => setNewNoticeOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Notice
          </Button>
        )}
      </div>

      <div className="grid gap-6">
        {notices.map((notice) => (
          <Card key={notice.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{notice.title}</CardTitle>
                  <CardDescription>
                    Posted on {notice.date}
                  </CardDescription>
                </div>
                <Badge variant={notice.audience === 'Global' ? 'default' : 'secondary'}>
                    For: {notice.audience}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{notice.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isNewNoticeOpen} onOpenChange={setNewNoticeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Notice</DialogTitle>
            <DialogDescription>
              This notice will be visible to the selected audience.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateNotice} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="e.g., Holiday Announcement" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" name="content" placeholder="Enter the full notice text here..." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience">Audience</Label>
              <Select name="audience" defaultValue="Global" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Global">Global (All Users)</SelectItem>
                  {courses.map(c => <SelectItem key={c.id} value={c.code}>{c.name}</SelectItem>)}
                  <SelectItem value="BCA-3A">BCA - Sem 3 - Sec A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setNewNoticeOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Publish Notice</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
