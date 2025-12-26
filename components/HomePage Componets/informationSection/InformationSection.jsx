"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ECards from "../Feature Cards/FeatureCards";

export default function InfoSection() {
  return (
    <section className="relative w-full flex justify-center px-4 sm:px-6 lg:px-8 py-16">
      <Card
        className="w-full max-w-6xl bg-white/90 backdrop-blur-md shadow-2xl border-muted"
        data-aos="fade-up"
      >
        <CardHeader className="pb-4 text-center lg:text-left">
          <CardTitle className="font-extrabold text-2xl md:text-3xl">
            What Are QR Codes?
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6 pb-10">
          {/* LEFT — Text */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-base md:text-lg leading-relaxed text-slate-700">
              A <span className="font-semibold">QR Code</span> (Quick Response
              Code) is a two-dimensional barcode originally developed to track
              automobile parts — now used worldwide for instant data access.
            </p>

            <p className="text-sm md:text-base text-slate-500">
              With a single scan, users can instantly access information,
              authenticate data, and share content securely.
            </p>
          </div>

          {/* RIGHT — Floating Cards */}
          <div className="lg:col-span-7 flex justify-center relative min-h-[360px]">
            <ECards />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
