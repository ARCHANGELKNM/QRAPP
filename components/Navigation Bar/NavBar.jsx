"use client";

import { AppSidebar } from "@/components/Navigation Bar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@components/ui/sidebar";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function NavigationBar() {
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className={"m-0"}>
        <header className=" sticky top-0 flex h-10 shrink-0 items-center gap-2 border-b m-0 ">
          <SidebarTrigger className="-ml-1" />
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}
