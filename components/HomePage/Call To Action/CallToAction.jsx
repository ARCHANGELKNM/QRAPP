"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function CTA() {
  const { toast } = useToast();
  const [showPolicy, setShowPolicy] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);
  const router = useRouter();

  // When the user clicks Generator or Scanner
  const handleProtectedNav = (route) => {
    setPendingRoute(route);
    setShowPolicy(true);
  };

  // When user accepts the policy
  const acceptPolicy = () => {
    toast({
      title: "Welcome to QRA!",
      description:
        "Sit tight you'll be redirected to the generator or scanner page soon",
    });
    setShowPolicy(false);
    if (pendingRoute) router.push(pendingRoute);
  };

  return (
    <>
      {/* TRANSITION STRIP */}
      <div className="relative h-24 bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-800" />

      {/* CTA SECTION */}
      <section className=" w-screen relative py-20 sm:py-28 bg-gradient-to-br from-primary via-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Generate QR Codes
            <br className="hidden sm:block" /> in Seconds?
          </h2>

          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-10">
            Fast, secure, and institution-ready QR codes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* GENERATOR button (protected) */}
            <button
              onClick={() => handleProtectedNav("/generator")}
              className="px-8 py-4 rounded-xl bg-white text-black font-semibold text-lg hover:scale-105 transition-transform"
            >
              Generate a QR Code
            </button>

            {/* SCANNER button (protected) */}
            <button
              onClick={() => handleProtectedNav("/scanner")}
              className="px-8 py-4 rounded-xl border border-white/40 text-white font-medium text-lg hover:bg-white/10 transition"
            >
              Scanner
            </button>
          </div>
        </motion.div>
      </section>

      {/* POLICY POPUP */}
      {showPolicy && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-[100] px-4 pb-6 sm:pb-0">
          <div className="bg-white dark:bg-zinc-950 rounded-[2rem] sm:rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in-95 slide-in-from-bottom-10 duration-300">
            {/* Header */}
            <h2 className="text-xl md:text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 mb-3">
              Privacy & Permissions
            </h2>

            {/* Body - Added max-height and scroll for small screens */}
            <div className="max-h-[40vh] overflow-y-auto mb-6 pr-2 custom-scrollbar">
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                To continue, please acknowledge our data handling policy. QRA
                only stores the minimum data required for secure QR-code
                generation and verification.
                <br />
                <br />
                <Link
                  href="/policy"
                  className="text-[#4f46e5] font-bold underline underline-offset-4 hover:text-[#9333ea] transition-colors"
                >
                  Read the full policy
                </Link>
              </p>
            </div>

            {/* Actions - Stacks on mobile, Side-by-side on desktop */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowPolicy(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={acceptPolicy}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#9333ea] text-white font-bold text-sm shadow-lg shadow-indigo-500/20 hover:opacity-90 active:scale-95 transition-all"
              >
                Accept & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
