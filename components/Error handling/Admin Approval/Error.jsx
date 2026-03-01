"use client";
import React from "react";

import { UserPlus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";


import { useRouter } from "next/navigation";

export default function ErrorAdminApproval() {
   const router = useRouter();
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Users />
        </EmptyMedia>
        <EmptyTitle>Access not authorized </EmptyTitle>
        <EmptyDescription>
          Try requesting access to an institutional domain
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button className="w-full" onClick={() => router.push("/Pages/Settings")}>
          <UserPlus />
          Request Access
        </Button>
      </EmptyContent>
    </Empty>
  );
}
