"use client";


import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Card, CardHeader, CardContent } from "@components/ui/card";
import Image from "@node_modules/next/image";
import Badges from "./components/Badges"
import { useKindeBrowserClient } from "@node_modules/@kinde-oss/kinde-auth-nextjs";

export default function page() {
  
  return (
    <div>
      <div>
        <Badges />
      </div>
     </div>

    
  );
}
