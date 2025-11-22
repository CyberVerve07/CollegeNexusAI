
"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Bell,
  ChevronRight,
  LogOut,
  Search,
  Settings,
  User as UserIcon,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useUser } from "@/contexts/user-context";
import placeholderImages from '@/lib/placeholder-images.json'

function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const formatSegment = (segment: string) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="hidden md:flex items-center text-sm text-muted-foreground">
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          <span
            className={
              index === segments.length - 1
                ? "font-medium text-foreground"
                : ""
            }
          >
            {formatSegment(segment)}
          </span>
          {index < segments.length - 1 && (
            <ChevronRight className="h-4 w-4 mx-1" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function AppHeader() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const avatar = placeholderImages.placeholderImages.find(p => p.id === user?.avatar);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <Breadcrumbs />
      </div>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
                {user && avatar && <Image
                    src={avatar.imageUrl}
                    width={36}
                    height={36}
                    alt={user.name}
                    className="rounded-full"
                />}
                 {!avatar && user && <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground">{user.name.charAt(0)}</div>}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
                <div className="font-medium">{user?.name}</div>
                <div className="text-xs text-muted-foreground">{user?.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
