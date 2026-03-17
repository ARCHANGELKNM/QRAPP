"use client";
import React from 'react';
import { AppSidebar } from "@components/NavigationBar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@components/ui/sidebar";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function NavBar({children}) {
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen">
        <header className=" sticky top-0 flex h-10 shrink-0 items-center gap-2 border-b m-0 bg-sidebar ">
          <SidebarTrigger className="-ml-1" />
        </header>

        <main  className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>  
      </SidebarInset>
    </SidebarProvider>
  );
}
