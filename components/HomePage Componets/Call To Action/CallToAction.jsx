"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CallToAction() {
  return (
    <>
      {/* TRANSITION STRIP */}
      <div className="relative h-24 bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-800" />

      {/* CTA SECTION */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-primary via-indigo-600 to-purple-700 text-white overflow-hidden">
        {/* Soft overlay to reduce harshness */}
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
            Fast, secure, and institution-ready QR codes — built for QRA.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/Pages/Generator"
              className="px-8 py-4 rounded-xl bg-white text-black font-semibold text-lg hover:scale-105 transition-transform"
            >
              Generate a QR Code
            </Link>

            <Link
              href="/Pages/Scanner"
              className="px-8 py-4 rounded-xl border border-white/40 text-white font-medium text-lg hover:bg-white/10 transition"
            >
             Scanner
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
