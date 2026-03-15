"use client";

import { react } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserCog, Key } from "lucide-react";

export default function OtherSettings() {
  return (
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
  );
}
