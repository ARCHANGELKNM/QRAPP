"use client";
import React from 'react';
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
    </SidebarProvider>
  );
}
