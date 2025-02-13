"use client";

import React from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Header = () => {

     useEffect(() => {
       AOS.init({});
     }, []);
  return (
    <div className={"   w-screen h-10   border  mb-5"}>
      <h3 className={" font-bold "}>QrApp</h3>

    </div>
  );
};

export default Header;
