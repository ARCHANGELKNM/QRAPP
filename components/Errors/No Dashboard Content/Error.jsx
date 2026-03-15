"use client";

import { SearchX } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";



export default function ErrorNDC() {
 return (
 <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <SearchX />
      </EmptyMedia>
      <EmptyTitle>No Dashboard Data</EmptyTitle>
      <EmptyDescription>
       Seems There's NO Data Available Right Now.
      </EmptyDescription>
    </EmptyHeader>

  </Empty>
);
}


