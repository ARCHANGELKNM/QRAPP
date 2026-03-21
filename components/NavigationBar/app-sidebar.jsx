"use client";

import * as React from "react";

import { useRouter } from "next/navigation";
import { Command, Bolt, ScanLine, QrCode, Gauge, Menu } from "lucide-react";

import NavUser from "./NavUser";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";



const data = {
  navMain: [
    {
      title: "Generator",
      url: "/generator",
      icon: QrCode,
      isActive: true,
    },
    {
      title: "Scanner",
      url: "/scanner",
      icon: ScanLine,
      isActive: true,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Bolt,
      isActive: true,
    },

    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Gauge,
      isActive: true,
    },
  ],
};

export function AppSidebar() {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const { setOpen } = useSidebar();
  const router = useRouter();
  const { toggleSidebar } = useSidebar(); // Destructure toggleSidebar
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden flex flex-col h-full *:data-[sidebar=sidebar]:flex-row"
    >
     <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r flex flex-col h-full justify-between"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="md:h-8 md:p-0 group/logo" // Added a group class for hover logic
                onClick={() => toggleSidebar()} // ✅ Logic to open/close sidebar
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg relative">
                  {/* ✅ The Command icon (Default) */}
                  <Command className="size-4 transition-all group-hover/logo:opacity-0 group-hover/logo:scale-0" />

                  {/* ✅ The Menu icon (Appears on hover) */}
                  <Menu className="size-4 absolute opacity-0 scale-0 transition-all group-hover/logo:opacity-100 group-hover/logo:scale-100" />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">QRA</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        setOpen(true);
                        router.push(item.url);
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <NavUser />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </Sidebar>
  );
}
