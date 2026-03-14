"use client";

import LoadingAnimation from "@components/Loading Animation/Loading";
import { useRouter } from "next/navigation"; // Cleaned up import path
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, UserCog, ShieldCheck, Key } from "lucide-react";
import { useAccessControl } from "@/hooks/useAccessControl";
import AccessRequestor from "@/components/Settings Page Components/RequestAccess/RequestAccess";
import { RegisterLink, LoginLink , LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { ErrorCreateAccount } from "@/components/Error handling/Create Account/Error";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function SettingsPage() {
  const route = useRouter();
  const { isAuthenticated, isLoading, user } = useKindeBrowserClient();
  const access = useAccessControl();
  if (access.state === "loading") return <LoadingAnimation/>;
  if (access.state === "unauthenticated") return <ErrorCreateAccount />;

  return (
    // Added horizontal padding for mobile (px-4) and vertical spacing
    <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
      
      {/*  USER HEADER */}
      <Card className="p-4 md:p-6">
        {/* flex-col on mobile, flex-row on desktop */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.picture} alt="User" />
            <AvatarFallback>
              {user?.given_name?.[0]}
              {user?.family_name?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold truncate">
              {user?.given_name} {user?.family_name}
            </h2>
            <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
          </div>

          <div className="w-full md:w-auto mt-2 md:mt-0">
            {isAuthenticated ? (
              <LogoutLink> 
                <Button variant="destructive" className="w-full md:w-auto">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </LogoutLink>
            ) : (
              <div className="flex flex-col md:flex-row gap-2">
                <RegisterLink>
                  <Button className="w-full">Register</Button>
                </RegisterLink>
                <LoginLink>
                  <Button variant="outline" className="w-full">Log in</Button>
                </LoginLink>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Institution Selector Component */}
      <AccessRequestor />

      {/* Privacy Card */}
      <Card
        onClick={() => route.push("/policy")}
        className="w-full p-4 hover:bg-muted/50 transition cursor-pointer"
      >
        <CardHeader className="flex flex-row items-center gap-3 p-0 pb-2 space-y-0">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <CardTitle className="text-lg">Privacy & Permissions</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground p-0">
          Review policy agreements and permissions.
        </CardContent>
      </Card>

      {/* Other Actions */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="w-full p-4 hover:bg-muted/50 transition cursor-pointer">
          <CardHeader className="flex flex-row items-center gap-3 p-0 pb-2 space-y-0">
            <UserCog className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">Account</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground p-0">
            Manage profile and user details... Coming Soon
          </CardContent>
        </Card>

        <Card className="w-full p-4 hover:bg-muted/50 transition cursor-pointer">
          <CardHeader className="flex flex-row items-center gap-3 p-0 pb-2 space-y-0">
            <Key className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">Security</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground p-0">
            Update login methods and authentication... Coming Soon
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
