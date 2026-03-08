"use client";
import React from "react";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
  useKindeAuth,
} from "@kinde-oss/kinde-auth-nextjs";

import { ChevronsUpDown, LogOut, LogIn, UserPlus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";  

export default function NavUser() {
  const { isMobile } = useSidebar();
    const { isAuthenticated, isLoading, user } = useKindeBrowserClient(); 

  // Onboard profile for authenticated users
  React.useEffect(() => {
    // 3. Ensure we only fire when NOT loading and authenticated
    if (isLoading || !isAuthenticated) return;
    fetch("/api/onboard", { method: "POST" });
  }, [isAuthenticated, isLoading]);

   if (isLoading) {
    return (
      <div className="flex items-center gap-2 p-2">
        <div className="h-8 w-8 rounded-lg bg-muted animate-pulse" />
        <div className="flex-1 space-y-1">
          <div className="h-3 w-16 bg-muted animate-pulse rounded" />
          <div className="h-2 w-24 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  const initials =
    (user?.given_name?.[0] || "") + (user?.family_name?.[0] || "") || "G";

  return (
    <DropdownMenu>
           <DropdownMenuTrigger asChild>
      {/* Ensure this button has a high z-index and block display */}
      <SidebarMenuButton size="lg" className="w-full">
         <Avatar className="h-8 w-8 shrink-0">
           <AvatarFallback>{initials}</AvatarFallback>
         </Avatar>
         <div className="grid flex-1 text-left text-sm leading-tight ml-2">
           <span className="truncate font-medium">{user?.given_name || "Guest"}</span>
           <span className="truncate text-xs text-muted-foreground">{user?.email || "Sign in"}</span>
         </div>
         <ChevronsUpDown className="ml-auto size-4 shrink-0" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>

      <DropdownMenuContent side={isMobile ? "bottom" : "right"} align="end">
        {isAuthenticated ? (
          <DropdownMenuItem asChild>
            <LogoutLink>
              <div className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Log out
              </div>
            </LogoutLink>
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <LoginLink>
                <div className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Log in
                </div>
              </LoginLink>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <RegisterLink>
                <div className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Register
                </div>
              </RegisterLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
