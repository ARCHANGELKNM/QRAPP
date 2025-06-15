"use client";

import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import GeneratorButton from "@components/Generate Button/GeneratorButton";
import AOS from "aos";
import "aos/dist/aos.css";
import ECards from "@components/HomepageComponents/explaintory cards";
import HowToUse from "@components/HomepageComponents/How To Use/How to Use";
import Features from "@components/HomepageComponents/Feature List/Feature List";
import CTA from "@components/HomepageComponents/Call To Action/CTA";
import WQR from "@components/HomepageComponents/Why Qrcodes/WQR";

export default function Home() {
  const route = useRouter();
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

      <div className={" mt-10 md:top-1 md:mt-10 "}>
        <h3
          className={
            " relative flex justify-center font-bold text-3xl mt-5 sm:text-2xl md:ml-6 md:mb-1 xl:text-5xl "
          }
        >
          QRCODE Generator
        </h3>

        <p className={" relative flex justify-center font-semibold  mb-1     "}>
          Generate beautiful qrcodes for free
        </p>

        <GeneratorButton />

        <div className={"flex justify-center place-items-center mb-4"}>
          <Card
            className={
              " relative  h-4/5 w-3/4   sm:w-3/4 sm:h-96 xl:h-96 xl:w-3/4  xl:mb-5 bg-transparent"
            }
            data-aos="fade-up"
          >
            <CardHeader className={" top-0 "}>
              <CardTitle className={"font-bold text-2xl mb-5 "}>
                What Are Qrcodes
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/*
                  <h3 className={'mb-5 break-all'}>
                    QRCODE stands for Quick Response Code
                 </h3>
                 */}

              <div className={"w-60"}>
                <p className={"mb-5 font-semibold"}>
                  A QR code, quick-response code, is a type of two-dimensional
                  matrix barcode invented in 1994 by Masahiro Hara of Japanese
                  company Denso Wave for labelling automobile parts. It features
                  black squares on a white background with fiducial markers,
                  readable by imaging devices like cameras.
                </p>
              </div>

              <ECards />
            </CardContent>
          </Card>

          
        </div>

        <div>
          <HowToUse />

        
        </div>

        <div>
          <Features />
        </div>

        <div>
          <WQR />
        </div>

        <div>
          <CTA />
        </div>
      </div>
    </section>
  );
}
