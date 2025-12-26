"use client";

import HeroTitle from "./Hero Section Title";



export default function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center bg-transparent">
      <div className="text-center px-4">
        <HeroTitle />

        <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-xl mx-auto">
          Generate fast, secure, institution-linked QR codes in seconds.
        </p>
      </div>
    </section>
  );
}
