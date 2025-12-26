"use client";

import { CircleX, ClockArrowDown, LucideEarthLock } from "lucide-react";

export default function ECards() {
  const base =
    "flex flex-col items-center justify-center bg-white border rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

  const size =
    "w-full max-w-[260px] h-28 sm:h-32 lg:w-36 lg:h-36 xl:w-44 xl:h-44";

  return (
    <div className="relative w-full h-full flex flex-col items-center gap-6 lg:block">
      {/* Upper Right */}
      <div
        className={`
          ${base} ${size}
          lg:absolute lg:top-8 lg:right-8
          border-red-100
        `}
      >
        <span className="text-xs font-bold uppercase tracking-widest mb-1">
          Error Free
        </span>
        <CircleX className="h-8 w-8 xl:h-12 xl:w-12 text-red-500" />
      </div>

      {/* Middle Right (slightly inward for depth) */}
      <div
        className={`
          ${base} ${size}
          lg:absolute lg:top-1/2 lg:right-16
          lg:-translate-y-1/2
          z-10
          border-blue-100
        `}
      >
        <span className="text-xs font-bold uppercase tracking-widest mb-1">
          Efficient
        </span>
        <ClockArrowDown className="h-10 w-10 xl:h-14 xl:w-14 text-blue-600" />
      </div>

      {/* Bottom Right */}
      <div
        className={`
          ${base} ${size}
          lg:absolute lg:bottom-8 lg:right-8
          border-green-100
        `}
      >
        <span className="text-xs font-bold uppercase tracking-widest mb-1">
          Secure
        </span>
        <LucideEarthLock className="h-8 w-8 xl:h-12 xl:w-12 text-green-600" />
      </div>
    </div>
  );
}
