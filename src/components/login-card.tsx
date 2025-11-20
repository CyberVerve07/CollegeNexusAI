"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, User, BookUser, Loader2, KeyRound } from "lucide-react";
import { useUser } from "@/contexts/user-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { users } from "@/lib/data";

export function LoginCard() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a simplified, mock authentication for demonstration.
    // In a real app, you would use Firebase Auth to sign in.
    const mockUser = users.find(u => u.email === email);
    
    if (mockUser) {
        try {
            // In a real app, you wouldn't need the mock password check.
            // Firebase handles the password verification.
            // We use a mock password of 'password123' for all demo users.
            if (password !== 'password123') {
                 throw new Error("Invalid credentials.");
            }
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: "Login Successful",
                description: `Welcome back, ${mockUser.name}!`,
            });
            router.push("/dashboard");
        } catch (error: any) {
             toast({
                variant: "destructive",
                title: "Login Failed",
                description: "Invalid email or password. Please try again. Use password 'password123' for any user.",
            });
        }
    } else {
       toast({
            variant: "destructive",
            title: "Login Failed",
            description: "No user found with that email address.",
        });
    }

    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-sm">
      <form onSubmit={handleLogin}>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@collegenexus.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
           <p className="text-xs text-muted-foreground px-1">
              Hint: Use any email from the system (e.g., `admin@collegenexus.edu`, `student@collegenexus.edu`) with the password `password123`.
            </p>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <KeyRound className="mr-2" />
            )}
            Sign In
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
