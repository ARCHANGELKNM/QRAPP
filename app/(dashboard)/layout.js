import React from "react";
import NavBar from "@components/NavigationBar/NavBar"; // Import your NavigationBar component
import "../globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* ✅ The NavBar (which contains SidebarProvider/AppSidebar) handles the layout */}
        <NavBar>
          {children}
        </NavBar>
      </body>
    </html>
  );
}
