"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CTA() {
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
    setShowPolicy(false);
    if (pendingRoute) router.push(pendingRoute);
  };

  return (
    <>
      {/* TRANSITION STRIP */}
      <div className="relative h-24 bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-800" />

      {/* CTA SECTION */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-primary via-indigo-600 to-purple-700 text-white overflow-hidden">
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

            {/* GENERATOR button (protected) */}
            <button
              onClick={() => handleProtectedNav("/Pages/Generator")}
              className="px-8 py-4 rounded-xl bg-white text-black font-semibold text-lg hover:scale-105 transition-transform"
            >
              Generate a QR Code
            </button>

            {/* SCANNER button (protected) */}
            <button
              onClick={() => handleProtectedNav("/Pages/Scanner")}
              className="px-8 py-4 rounded-xl border border-white/40 text-white font-medium text-lg hover:bg-white/10 transition"
            >
              Scanner
            </button>
          </div>
        </motion.div>
      </section>

      {/* POLICY POPUP */}
      {showPolicy && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white text-black rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h2 className="text-xl font-bold mb-3">Privacy Policy & Permissions</h2>

            <p className="text-sm text-gray-700 mb-4">
              To continue, please acknowledge our data handling policy.  
              QRA only stores the minimum data required for attendance tracking.
              <Link href="/policy" className="text-indigo-600 underline">Learn more</Link>
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPolicy(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={acceptPolicy}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
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
