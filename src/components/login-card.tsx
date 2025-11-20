
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, KeyRound } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User as FirebaseUser,
} from "firebase/auth";
import { Separator } from "@/components/ui/separator";

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
    </svg>
);


export function LoginCard() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSuccess = (user: FirebaseUser) => {
    toast({
        title: "Login Successful",
        description: `Welcome back, ${user.displayName || user.email}!`,
    });
    router.push("/dashboard");
  }

  const handleLoginError = (error: any) => {
    console.error("Firebase Auth Error:", error);
    let errorMessage = "An unknown error occurred. Please try again.";
    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMessage = "Invalid email or password. Please try again. Use password 'password123' for any user.";
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = "Sign-in process was cancelled.";
          break;
        default:
          errorMessage = "Login failed. Please check your credentials and try again.";
          break;
      }
    }
     toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
    });
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      handleLoginSuccess(userCredential.user);
    } catch (error: any) {
      handleLoginError(error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!auth) return;
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        handleLoginSuccess(result.user);
    } catch (error: any) {
        handleLoginError(error);
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleLogin} className="grid gap-4">
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-muted-foreground px-1">
              Hint: Use any email from the system with the password `password123`.
            </p>
             <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <KeyRound className="mr-2" />
                )}
                Sign In
              </Button>
          </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                    </span>
                </div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                Sign in with Google
            </Button>
        </CardContent>
    </Card>
  );
}
