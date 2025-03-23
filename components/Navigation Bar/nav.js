"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  RegisterLink, 
} from "@kinde-oss/kinde-auth-nextjs/components";import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Nav() {

    useEffect(() => {
      AOS.init({});
    }, []);

    const { isAuthenticated } = useKindeBrowserClient();
    const { user } = useKindeBrowserClient();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className=" sticky top-0 flex h-10 shrink-0 items-center gap-2 border-b m-0 ">
          <SidebarTrigger className="-ml-1" />
          {!isAuthenticated ? (
            <div>
              <div className="flex">
                <LoginLink>
                  <Button className={"  absolute right-0 top-1 h-6 ml-4"}>
                    LogIn
                  </Button>
                </LoginLink>

                <RegisterLink>
                  <Button className={"  absolute right-16 mr-2 top-1 h-6"}>
                    Sign Up
                  </Button>
                </RegisterLink>
              </div>
            </div>
          ) : (
            <div>
              <div className={" flex "}>
                <Avatar className={" absolute right-2 top-0 w-9 h-9 "}>
                  <AvatarImage>
                    <Image
                      alt={""}
                      src={user?.profile}
                      height={50}
                      width={50}
                    />
                  </AvatarImage>

                  <AvatarFallback>hi</AvatarFallback>
                </Avatar>
              </div>
            </div>
          )}
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}
