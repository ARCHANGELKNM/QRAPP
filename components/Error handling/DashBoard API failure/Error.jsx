"use client";

import { FolderOpen } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function ErrorAPIFailure() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <FolderOpen className="h-16 w-16 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle> API Failure</EmptyTitle>
        <EmptyDescription>
           Seems Like We're Having Trouble Fetching Dashboard Data. Please Try Again Later.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
