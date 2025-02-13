// HTU stands for How To Use
"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HTU() {

      useEffect(() => {
        AOS.init({});
      }, []);
  return (
    <div>
      <div className={"flex justify-center items-center mt-5 "}>
        <h3
          className={" absolute font-bold text-2xl  xl:mb-5"}
          data-aos="fade-up"
        >
          How To Use
        </h3>
      </div>

      <div>
        <div className={"flex justify-center items-center "}>
          <div className={"w-1 h-96 bg-slate-600 mt-5"} data-aos="fade"></div>

          <div className={""}>

          </div>
        </div>
      </div>
    </div>
  );
}
