import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@Components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@Components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className={"m-0 h-0"}>
        <header className="flex h-10 shrink-0 items-center gap-2 border-b m-0 ">
          <SidebarTrigger className="-ml-1" />
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}
