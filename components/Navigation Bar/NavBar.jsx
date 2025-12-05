"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@Components/ui/sidebar";
import { Button } from "@Components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@Components/ui/avatar";

export default function Nav() {
  useEffect(() => {
    AOS.init({});
  }, []);

  const { isAuthenticated } = useKindeBrowserClient();
  const { user } = useKindeBrowserClient();
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
