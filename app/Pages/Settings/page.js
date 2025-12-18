// app/settings/page.js
"use client";

import { useState } from "react";
import InstitutionSelector from "@/components/Settings Page Components/Institution/page"; // Import Institution Selector component
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Import card and subcomponents for the content wrapper

export default function SettingsPage() { 
  return (
    <div className={" flex justifiy-center items-place-center"}>
       <InstitutionSelector />  
    </div>
  );
}
