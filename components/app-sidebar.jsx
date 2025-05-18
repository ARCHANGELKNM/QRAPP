"use client";

import * as React from "react";

import { LucideQrCode, ScanIcon, Settings, Settings2 } from "lucide-react";
import {
  Sidebar,
  SidebarFooter,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@components/ui/button";

// This is sample data.

const menuItems = [
  {
    id: 1,
    name: "Scanner",
    path: "/Generator/Scanner",
    icon: ScanIcon,
  },

  {
    id: 2,
    name: "Generator",
    path: "/Generator",
    icon: LucideQrCode,
  },

  {
    id: 3,
    name: "Account",
    icon: Settings,
    path: "/Generator/Settings/Account",
  },
];

export function AppSidebar(index) {
  const { isAuthenticated } = useKindeBrowserClient();
  const { user } = useKindeBrowserClient();
  return (
    <Sidebar>
      <SidebarHeader className={" font-bold"}>
        QrApp
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent key={index}>
        {menuItems.map((item) => (
          <SidebarMenu>
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton className={"flex"}>
                <Link href={item.path}> {item.name}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ))}

        <SidebarFooter>
          {!isAuthenticated ? (
            <div>
              <div className="flex justify-center">
                <LoginLink>
                  <Button className={"  absolute right-0 bottom-0 h-6 ml-4"}>
                    LogIn
                  </Button>
                </LoginLink>

                <RegisterLink>
                  <Button className={"  absolute right-16 bottom-0 mr-2  h-6"}>
                    Sign Up
                  </Button>
                </RegisterLink>
              </div>
            </div>
          ) : (
            <div>
              <div className={" flex "}>
                <Avatar className={" absolute left-0 bottom-0 w-9 h-9 "}>
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
        </SidebarFooter>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
