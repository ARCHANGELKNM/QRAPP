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

const Header = () => {
  useEffect(() => {
    AOS.init({});
  }, []);
  return (
    <div className={" fixed w-screen h-10   border mb-10 bg-white "}>
      <h3 className={" font-bold "}>QrApp</h3>

      <div className="flex">
        <LoginLink>
          <Button className={"  absolute right-0 top-1 h-6 ml-4"}>LogIn</Button>
        </LoginLink>

        <RegisterLink>
          <Button className={"  absolute right-16 mr-2 top-1 h-6"}>Sign Up </Button>
        </RegisterLink>
      </div>
    </div>
  );
};

export default Header;
