"use client";

import { useRouter } from "next/navigation";
import { Shield, User, BookUser } from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LoginCard() {
  const { setUserRole } = useUser();
  const router = useRouter();

  const handleLogin = (role: "admin" | "teacher" | "student") => {
    setUserRole(role);
    router.push("/dashboard");
  };

  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Select Your Role</CardTitle>
        <CardDescription>Choose your profile to access the dashboard.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button
          onClick={() => handleLogin("admin")}
          className="w-full justify-start py-6 text-lg"
          variant="outline"
        >
          <Shield className="mr-4 h-6 w-6 text-primary" />
          Super Admin
        </Button>
        <Button
          onClick={() => handleLogin("teacher")}
          className="w-full justify-start py-6 text-lg"
          variant="outline"
        >
          <BookUser className="mr-4 h-6 w-6 text-primary" />
          Teacher
        </Button>
        <Button
          onClick={() => handleLogin("student")}
          className="w-full justify-start py-6 text-lg"
          variant="outline"
        >
          <User className="mr-4 h-6 w-6 text-primary" />
          Student
        </Button>
      </CardContent>
    </Card>
  );
}
