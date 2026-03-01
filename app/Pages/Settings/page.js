"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@node_modules/next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut, UserCog, ShieldCheck, Globe, Key } from "lucide-react";
import AccessRequestor from "@/components/Settings Page Components/RequestAccess/RequestAccess";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { ErrorCreateAccount } from "@/components/Error handling/Create Account/Error";
import { useAccessControl } from "@/hooks/useAccessControl";

export default function SettingsPage() {
  const route = useRouter("");
  const access = useAccessControl();
  const profile = access?.profile;
  useEffect(() => {
    if (
      access.state === "loading" ||
      access.state === "unauthenticated" ||
      access.state === "no-profile"
    )
      return;
    fetch("/api/onboard", { method: "POST" });
  }, [access.state]);

  // If not authenticated or no profile, show error (like Generator page)
  if (access.state === "loading") {
    return null;
  } else if (
    access.state === "unauthenticated" ||
    access.state === "no-profile"
  ) {
    return <ErrorCreateAccount />;
  } else if (access.state === "pending") {
    // Optionally, import and show ErrorAdminApproval if needed
    return <ErrorCreateAccount />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* ---------------------------- */}
      {/*  USER HEADER WITH INSTITUTION */}
      {/* ---------------------------- */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile?.picture} alt="User" />
            <AvatarFallback>
              {profile?.given_name?.[0]}
              {profile?.family_name?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              {profile?.given_name} {profile?.family_name}
            </h2>
            <p className="text-sm text-muted-foreground">{profile?.email}</p>
          </div>

          {/* Show Logout if logged in, else show Register/Sign Up */}
          {profile ? (
            <Button variant="destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <div className="flex gap-2">
              <RegisterLink>
                <Button>Register</Button>
              </RegisterLink>
              <LoginLink>
                <Button variant="outline">Log in</Button>
              </LoginLink>
            </div>
          )}
        </div>

        {/* Institution Selector */}
      </Card>
      
      <AccessRequestor/>

              <Card
          onClick={() => route.push("/policy")}
          className="w-full p-4 hover:bg-muted/50 transition cursor-pointer"
        >
          <CardHeader className="flex flex-row items-center gap-3 p-0 pb-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">Privacy & Permissions</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground p-0">
            Review policy agreements and permissions.
          </CardContent>
        </Card>

      <div className="space-y-4">
        <Card className="w-full p-4 hover:bg-muted/50 transition cursor-pointer">
          <CardHeader className="flex flex-row items-center gap-3 p-0 pb-2">
            <UserCog className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">Account</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground p-0">
            Manage profile, institution, and user details....Coming Soon
          </CardContent>
        </Card>



        <Card className="w-full p-4 hover:bg-muted/50 transition cursor-pointer">
          <CardHeader className="flex flex-row items-center gap-3 p-0 pb-2">
            <Key className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">Security</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground p-0">
            Update login methods and authentication options....Coming Soon
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
