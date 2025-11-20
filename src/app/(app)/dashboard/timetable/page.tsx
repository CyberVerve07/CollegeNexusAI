"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { timetable } from "@/lib/data";
import { Calendar } from "lucide-react";
import { useMemo } from "react";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const timeSlots = ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "14:00 - 15:00"];

export default function TimetablePage() {
  const schedule = useMemo(() => {
    const grid: { [time: string]: { [day: string]: any } } = {};
    timeSlots.forEach(time => {
        grid[time] = {};
        daysOfWeek.forEach(day => {
            grid[time][day] = timetable.find(entry => entry.day === day && entry.time === time) || null;
        });
    });
    return grid;
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Calendar className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Weekly Timetable</h1>
          <p className="text-muted-foreground">
            Your class schedule for the week.
          </p>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="border-collapse">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Time</TableHead>
                  {daysOfWeek.map((day) => (
                    <TableHead key={day} className="text-center">{day}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeSlots.map(time => (
                    <TableRow key={time}>
                        <TableCell className="font-semibold">{time}</TableCell>
                        {daysOfWeek.map(day => {
                            const entry = schedule[time][day];
                            return (
                                <TableCell key={day} className={`text-center p-2 ${entry ? 'border' : ''} rounded-lg`}>
                                    {entry ? (
                                        <div className="bg-secondary p-2 rounded-md h-full flex flex-col justify-center">
                                            <p className="font-bold text-sm">{entry.subject}</p>
                                            <p className="text-xs text-muted-foreground">{entry.teacher}</p>
                                        </div>
                                    ) : null}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
