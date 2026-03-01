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
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function SettingsPage() {
  const route = useRouter("");
  const { isAuthenticated, isLoading, user } = useKindeBrowserClient();

  if (isLoading) {
    return null;
  }
  if (!isAuthenticated) {
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
            <AvatarImage src={user?.picture} alt="User" />
            <AvatarFallback>
              {user?.given_name?.[0]}
              {user?.family_name?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              {user?.given_name} {user?.family_name}
            </h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>

          {/* Show Logout if logged in, else show Register/Sign Up */}
          {isAuthenticated ? (
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

      <AccessRequestor />

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
