"use client";

import React from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Header() {




  return (
    <div className={" fixed w-screen h-10   border mb-10 bg-white "}>
      <h3 className={" font-bold "}>QrApp</h3>


    </div>
  );
}
