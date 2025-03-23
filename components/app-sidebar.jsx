import * as React from "react";

import { LucideQrCode, ScanIcon, Settings, Settings2 } from "lucide-react";
import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

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
    name: "Settings",
    icon: Settings,
    path: "/Generator/Settings",
  },
];

export function AppSidebar({}) {
  return (
    <Sidebar>
      <SidebarHeader className={" font-bold"}>
          QrApp
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((item) => (
          <SidebarMenu>
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton className={"flex"}>
                
                <Link href={item.path}> 
                  {item.name}
                 </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
