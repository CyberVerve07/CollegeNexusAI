
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CheckCircle,
  Calendar,
  Book,
  FileText,
  Megaphone,
  Bot,
  Users,
  GraduationCap,
  BadgeCheck,
  Building2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useUser } from "@/contexts/user-context";
import { cn } from "@/lib/utils";

const studentNav = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/attendance", icon: CheckCircle, label: "Attendance" },
  { href: "/dashboard/timetable", icon: Calendar, label: "Timetable" },
  { href: "/dashboard/materials", icon: Book, label: "Study Materials" },
  { href: "/dashboard/papers", icon: FileText, label: "Question Papers" },
  { href: "/dashboard/notices", icon: Megaphone, label: "Notices" },
  { href: "/dashboard/ai-assistant", icon: Bot, label: "AI Assistant" },
];

const teacherNav = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/attendance", icon: CheckCircle, label: "Take Attendance" },
  { href: "/dashboard/materials", icon: Book, label: "Upload Materials" },
  { href: "/dashboard/papers", icon: FileText, label: "Upload Papers" },
  { href: "/dashboard/notices", icon: Megaphone, label: "Class Notices" },
];

const adminNav = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/admin/users", icon: Users, label: "Manage Users" },
  { href: "/dashboard/admin/academics", icon: GraduationCap, label: "Manage Academics" },
  { href: "/dashboard/papers", icon: BadgeCheck, label: "Verify Papers" },
  { href: "/dashboard/notices", icon: Megaphone, label: "Global Notices" },
];

const navItemsMap = {
  student: studentNav,
  teacher: teacherNav,
  admin: adminNav,
};

export function AppSidebar() {
  const { user } = useUser();
  const pathname = usePathname();
  
  if (!user) {
    return null; // Don't render sidebar if no user is logged in
  }

  const navItems = navItemsMap[user.role];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 p-2">
          <Building2 className="w-8 h-8 text-primary" />
          <h2 className={cn("text-xl font-bold font-headline transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0")}>
            CollegeNexus
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
                className="justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0">
                    {item.label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
