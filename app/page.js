"use client"

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HowToUse from "@components/HomePage Componets/How To Use/How to Use";
import Features from "@components/HomePage Componets/Feature List/Feature List";
import CallToAction from "@components/HomePage Componets/Call To Action/CallToAction";
import WQR from "@components/HomePage Componets/Why Qrcodes/WQR";
import InfoSection from "@components/HomePage Componets/informationSection/InformationSection";
import Hero from "@components/HomePage Componets/Hero's Section/Hero's Section";

export default function Home() {
  useEffect(() => {
    AOS.init({});
  }, []);
  return (
    <section>
      <div>
        <div className="bg-fixed absolute inset-0 -z-10 h-0 w-0 bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-800 opacity-20 blur-[100px]"></div>
        </div>
      </div>

      <Hero />

      {/* <InfoSection /> */}

      <HowToUse />

      <Features />

      <WQR />

      <CallToAction />
    </section>
  );
}
