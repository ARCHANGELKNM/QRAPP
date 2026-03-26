'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation"; 
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PolicyPage() {
  const router = useRouter(); 

  return (
    <div className="w-full min-h-screen flex justify-center items-center py-10 px-4 bg-zinc-50/50 dark:bg-zinc-950">
      <Card className="max-w-3xl w-full shadow-2xl border-zinc-200 dark:border-zinc-800 rounded-[2rem] overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-[#4f46e5]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
              Policy & Permissions
            </CardTitle>
          </div>
          <p className="text-sm text-zinc-500 font-medium ml-11">
            Last updated: March 2024
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          <ScrollArea className="h-[60vh] w-full pr-6 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed custom-scrollbar">
            
            <div className="space-y-8 pb-10">
              {/* --- SECTION 1 --- */}
              <section>
                <h2 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg mb-2 tracking-tight">1. Introduction</h2>
                <p>
                  This Privacy Policy and Permissions Agreement (“Agreement”)
                  governs the use of the <strong>QRA Application</strong>. By
                  accessing the Application, you acknowledge that you have read and agree to the terms outlined below.
                </p>
              </section>

              {/* --- SECTION 4 (Permissions) --- */}
              <section>
                <h2 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg mb-2 tracking-tight">4. Permissions Required</h2>
                <div className="grid gap-4 mt-3">
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 block mb-1 text-xs uppercase tracking-widest">Camera Access</span>
                    <p className="text-xs">Required exclusively for QR scanning. We do not record or store any video footage.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 block mb-1 text-xs uppercase tracking-widest">Network Access</span>
                    <p className="text-xs">Used for secure server communication, validation, and real-time syncing.</p>
                  </div>
                </div>
              </section>

              {/* ... Other sections (Definitions, Security, etc.) ... */}
              
              <section>
                <h2 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg mb-2 tracking-tight">10. Acceptance</h2>
                <p>
                  By using the Generator, Scanner, or any administrative tools,
                  you acknowledge your acceptance of this Agreement.
                </p>
              </section>
            </div>
          </ScrollArea>

          {/* --- FOOTER ACTIONS --- */}
          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <button
              onClick={() => router.push('/')}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold text-sm hover:bg-zinc-200 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>

            <button
              onClick={() => {
                localStorage.setItem("qra_policy_accepted", "true");
                router.push("/generator");
              }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#9333ea] text-white font-bold text-sm shadow-lg shadow-indigo-500/20 hover:opacity-90 active:scale-95 transition-all"
            >
              Accept & Continue
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
