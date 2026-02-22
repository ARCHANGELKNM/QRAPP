"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut, UserCog, ShieldCheck, Globe, Key } from "lucide-react";
import AccessRequestor from "@/components/Settings Page Components/RequestAccess/RequestAccess";

export default function SettingsPage() {
  const [profile, setProfile] = useState(null);
  const [institution, setInstitution] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile", { credentials: "include" });
        if (!res.ok) return;

        const data = await res.json();
        setProfile(data);

        if (data?.institutionName) {
          setInstitution(data.institutionName);
        }
      } catch (err) {
        console.error("Settings profile error:", err);
      }
    }
    loadProfile();
  }, []);

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

          <Button variant="destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Institution Selector */}
        <AccessRequestor />
      </Card>

      <Separator />

      {/* ---------------------------- */}
      {/*   SETTINGS LIST — STACKED     */}
      {/* ---------------------------- */}
      <div className="space-y-4">
        <Card className="w-full p-4 hover:bg-muted/50 transition cursor-pointer">
          <CardHeader className="flex flex-row items-center gap-3 p-0 pb-2">
            <UserCog className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">Account</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground p-0">
            Manage profile, institution, and user details.
          </CardContent>
        </Card>

        <Card className="w-full p-4 hover:bg-muted/50 transition cursor-pointer">
          <CardHeader className="flex flex-row items-center gap-3 p-0 pb-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">Privacy & Permissions</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground p-0">
            Review policy agreements and permissions.
          </CardContent>
        </Card>

        <Card className="w-full p-4 hover:bg-muted/50 transition cursor-pointer">
          <CardHeader className="flex flex-row items-center gap-3 p-0 pb-2">
            <Globe className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">Region & Language</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground p-0">
            Change app region, timezone, and language.
          </CardContent>
        </Card>

        <Card className="w-full p-4 hover:bg-muted/50 transition cursor-pointer">
          <CardHeader className="flex flex-row items-center gap-3 p-0 pb-2">
            <Key className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">Security</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground p-0">
            Update login methods and authentication options.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
