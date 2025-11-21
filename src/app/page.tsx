
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user-context";
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

export default function Home() {
  const router = useRouter();
  const { user, loginWithPassword } = useUser();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = loginWithPassword(password);

    if (success) {
      toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
      });
      // The useEffect will handle the redirect
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Incorrect password. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background dark:bg-black p-4">
      <div className="flex items-center gap-3 mb-8 text-primary">
        <Building2 className="h-12 w-12" />
        <h1 className="text-5xl font-bold font-headline text-foreground">
          CollegeNexus AI
        </h1>
      </div>
      <p className="max-w-2xl mx-auto mb-10 text-lg text-muted-foreground">
          Your all-in-one college management solution.
      </p>
      
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle>Role-Based Login</CardTitle>
          <CardDescription>Enter a password to log in as a specific user role.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter role password"
                required
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-muted-foreground px-1">
              Use: `admin123`, `teacher123`, or `student123`
            </p>
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
