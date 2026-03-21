"use client";
import React from "react";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs";

import { ChevronsUpDown, LogOut, LogIn, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";  
import LoadingAnimation from "@components/LoadingAnimation/Loading";

export default function NavUser() {
  const { isMobile } = useSidebar();
  const { isAuthenticated, isLoading, user } = useKindeBrowserClient(); 
  const initials = ((user?.given_name?.[0] || "") + (user?.family_name?.[0] || "")).toUpperCase() || "G";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="lg" className="w-full group">
          {/* ✅ Branded Avatar with the Ring */}
          <div className="relative flex items-center justify-center shrink-0">
            {/* Animated Brand Ring (Subtle for Sidebar) */}
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-[#4f46e5] via-[#9333ea] to-transparent animate-[spin_8s_linear_infinite] opacity-30" />
            
            <Avatar className="h-8 w-8 rounded-lg border-2 border-white dark:border-zinc-950 z-10">
              <AvatarFallback 
                className="rounded-lg text-[10px] font-black tracking-tighter text-white"
                style={{ background: `linear-gradient(270deg, #4f46e5, #6366f1, #9333ea)` }}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight ml-2">
            <span className="truncate font-bold tracking-tight">
              {user?.given_name || "Guest"}
            </span>
            <span className="truncate text-[10px] font-medium text-muted-foreground">
              {user?.email || "Sign in to account"}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-3 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        side={isMobile ? "bottom" : "right"} 
        align="end" 
        className="w-56 rounded-xl border-zinc-200 dark:border-zinc-800 shadow-xl"
      >
        {isAuthenticated ? (
          <DropdownMenuItem asChild className="cursor-pointer focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-900/20">
            <LogoutLink className="w-full">
              <div className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Log out
              </div>
            </LogoutLink>
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem asChild className="cursor-pointer">
              <LoginLink className="w-full">
                <div className="flex items-center gap-2">
                  <LogIn className="h-4 w-4 text-primary" />
                  Log in
                </div>
              </LoginLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <RegisterLink className="w-full">
                <div className="flex items-center gap-2"> 
                  <UserPlus className="h-4 w-4 text-primary" />
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
