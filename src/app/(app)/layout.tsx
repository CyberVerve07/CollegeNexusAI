"use client";

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useUser } from "@/contexts/user-context";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      // If loading is finished and there's no user, redirect to home.
      router.push('/');
    }
  }, [user, isUserLoading, router]);
  
  if (isUserLoading || !user) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-primary" style={{animationDelay: '0.2s'}}></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-primary" style={{animationDelay: '0.4s'}}></div>
                <p>Loading user profile...</p>
            </div>
        </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1">
        <SidebarInset>
          <AppHeader />
          <main className="p-4 md:p-6 lg:p-8">
            {children}
            <Toaster />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
