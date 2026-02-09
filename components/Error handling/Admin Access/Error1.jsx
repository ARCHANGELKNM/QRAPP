"use client";

import { BarChart3 } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const title = "Empty Chart";

const Example = () => (
  <Empty>
    <EmptyHeader>
      <EmptyMedia>
        <BarChart3 className="h-16 w-16 text-muted-foreground" />
      </EmptyMedia>
      <EmptyTitle>You are not a Sub-admin</EmptyTitle>
      <EmptyDescription>
         Hello there , you can only access this section as an Admin.
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
);

export default Example;
