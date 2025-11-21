
"use client";

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useUser } from "@/contexts/user-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace("/");
    }
  }, [user, isUserLoading, router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
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
