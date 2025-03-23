// HTU stands for How To Use
"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import HTU from ".//Public/HTU.png";


export default function HowToUse() {
  useEffect(() => {
    AOS.init({});
  }, []);
  return (
    <div>
      <div className={"flex justify-center items-center mt-5 "}>
        <h3 className={" absolute font-bold text-2xl my-5 "} data-aos="fade-up">
          How To Use
        </h3>
      </div>

      <div className={"flex justify-center"}>
        {/* <div
          className={
            " flex justify-center items-center bg-blue-600 w-1/4 mt-5 "
          }
        >
          <div className={"w-1 h-96 bg-slate-600 mt-5"} data-aos="fade" />

          <Step1
           className={"flex justify-end"}
          />
        </div> */}

        <Image
          src={HTU}
          alt={''}
          className={"mt-2"}
          data-aos="fade-up"
         
        />
      </div>
    </div>
  );
}
