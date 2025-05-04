"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Shadcn Button

export default function CTA () {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-20 bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Animated light background */}
      <motion.div
        className="absolute top-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2  rounded-full blur-3xl opacity-50 animate-pulse"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.2 }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 6,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 space-y-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Ready to Generate or Scan your QR code?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          It's fast, simple, and totally free.
        </p>

        <div className="flex gap-4 justify-center">
          <Button className="px-8 py-4 text-lg font-semibold animate-background-move bg-gradient-to-r from-primary to-secondary bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-700">
            Get Started
          </Button>

          <Button
            variant="outline"
            className="px-8 py-4 text-lg font-semibold border-primary dark:border-primary hover:bg-primary/10 transition-all duration-300"
          >
            Scan a Qrcode
          </Button>
        </div>
      </div>
    </section>
  );
}
