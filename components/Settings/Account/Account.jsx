"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { QrCode, ChevronRight } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";  
import { useRouter } from "next/navigation";

export default function Account () {
  const router = useRouter();
  const { user } = useKindeBrowserClient();
  const initials = `${user?.given_name?.[0] || ""}${user?.family_name?.[0] || ""}`.toUpperCase();
 


  return (
    <Card className="group flex w-full items-center gap-5 border-none bg-white p-4 transition-all hover:bg-zinc-50/80 dark:bg-transparent dark:hover:bg-zinc-900/50 rounded-3xl cursor-pointer">
      
      {/* 1. SHADCN AVATAR + BRANDED GRADIENT */}
      <div className="relative">
        {/* Animated Brand Ring */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#4f46e5] via-[#9333ea] to-transparent animate-[spin_6s_linear_infinite] opacity-40" />
        
        <Avatar className="h-20 w-20 border-[3px] border-white dark:border-zinc-950 shadow-xl">
          <AvatarFallback 
            className="text-2xl font-black tracking-tighter text-white"
            style={{ background: `linear-gradient(270deg, #4f46e5, #6366f1, #9333ea)` }}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* 2. USER INFO */}
      <div className="flex flex-1 flex-col min-w-0">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {user?.given_name} {user?.family_name}
        </h2>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 truncate">
          {user?.email}
        </p>
        
        {/* SHADCN BADGE */}
        <div className="mt-2 flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-500/10 text-green-600 hover:bg-green-500/10 border-none px-2 py-0 text-[10px] uppercase tracking-widest font-bold">
            <span className="mr-1 h-1 w-1 rounded-full bg-green-500 animate-pulse" />
            Verified
          </Badge>
        </div>
      </div>

      {/* 3. ACTIONS */}
      <div className="flex items-center gap-3" onClick={route.push('/generator')}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-all group-hover:bg-[#4f46e5] group-hover:text-white dark:bg-zinc-800">
          <QrCode size={20} />
        </div>
        <ChevronRight className="h-5 w-5 text-zinc-300 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white" />
      </div>
    </Card>
  );
}
