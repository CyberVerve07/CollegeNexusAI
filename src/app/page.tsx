
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useAuth } from "@/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Building2, KeyRound, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Role = "student" | "teacher" | "admin";

const roleEmails: Record<Role, string> = {
    student: 'student@collegenexus.edu',
    teacher: 'teacher@collegenexus.edu',
    admin: 'admin@collegenexus.edu'
};

export default function Home() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isUserLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Please select a role.",
        });
        return;
    }
    setIsLoading(true);

    const email = roleEmails[selectedRole];
    
    try {
      // First, try to sign in.
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
      });
    } catch (error: any) {
      // If sign-in fails because the user doesn't exist, create the user.
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          toast({
            title: "Account Created & Logged In",
            description: "Redirecting to your dashboard...",
          });
          // The useEffect will handle redirect after state change
        } catch (creationError: any) {
          console.error("Account Creation Error:", creationError);
          toast({
            variant: "destructive",
            title: "Registration Failed",
            description: creationError.message || "Could not create an account for this role.",
          });
          setIsLoading(false);
        }
      } else {
        // Handle other login errors (e.g., wrong password for an existing user)
        console.error("Login Error:", error);
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid credentials. Please check your role and password.",
        });
        setIsLoading(false);
      }
    }
  };

  if (isUserLoading || (!isUserLoading && user)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="flex items-center gap-3 mb-8 text-primary">
        <Building2 className="h-12 w-12" />
        <h1 className="text-5xl font-bold font-headline text-foreground">
          CollegeNexus
        </h1>
      </div>
      <p className="max-w-2xl mx-auto mb-10 text-lg text-muted-foreground">
          Your all-in-one college management solution.
      </p>
      
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Select your role and enter the password to sign in.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6">
            <div className="space-y-3">
                <Label>Select Your Role</Label>
                <RadioGroup
                    defaultValue="student"
                    className="grid grid-cols-3 gap-4"
                    value={selectedRole}
                    onValueChange={(value: Role) => setSelectedRole(value)}
                >
                    <div>
                        <RadioGroupItem value="student" id="student" className="peer sr-only" />
                        <Label htmlFor="student" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            Student
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="teacher" id="teacher" className="peer sr-only" />
                        <Label htmlFor="teacher" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            Teacher
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="admin" id="admin" className="peer sr-only" />
                        <Label htmlFor="admin" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            Admin
                        </Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                disabled={isLoading}
              />
               <p className="text-xs text-muted-foreground px-1">
                Hint: Use `admin123`, `teacher123`, or `student123`.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <KeyRound className="mr-2 h-4 w-4" />
              )}
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
