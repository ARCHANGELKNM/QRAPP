"use client";

import {react} from 'react';
import { useRouter } from "next/navigation"; 
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function PolicyCard() {
  const route = useRouter();
  return (
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
  );
}
