import React from "react";
import NavigationBar from "@components/Navigation Bar/NavBar";
import "../globals.css";
import { SidebarProvider } from "@components/ui/sidebar";

export const metadata = {
  title: "QRA",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <SidebarProvider>
      <NavigationBar />
      <SidebarInset>
        <main> {children} </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
