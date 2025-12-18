"use client";

import {
  LoginLink,
  RegisterLink,
  LogoutLink,
  useKindeAuth,
} from "@kinde-oss/kinde-auth-nextjs";

import {
  ChevronsUpDown,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

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

export function NavUser() {
  const { isMobile } = useSidebar();
  const { isAuthenticated, isLoading, user } = useKindeAuth();

  if (isLoading) return null;

  const initials =
    (user?.given_name?.[0] || "") +
    (user?.family_name?.[0] || "") || "G";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm">
                <span className="truncate font-medium">
                  {isAuthenticated
                    ? `${user?.given_name || ""} ${user?.family_name || ""}`
                    : "Guest"}
                </span>
                <span className="truncate text-xs">
                  {isAuthenticated ? user?.email : "Not signed in"}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={isMobile ? "bottom" : "right"}
            align="end"
          >
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
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
