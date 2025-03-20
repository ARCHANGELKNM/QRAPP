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
  useEffect(() => {
    AOS.init({});
  }, []);

  const { isAuthenticated } = useKindeBrowserClient();
  const { user } = useKindeBrowserClient();

  return (
    <div className={" fixed w-screen h-10   border mb-10 bg-white "}>
      <h3 className={" font-bold "}>QrApp</h3>

      {!isAuthenticated ? (
        <div>
          <div className="flex">
            <LoginLink>
              <Button className={"  absolute right-0 top-1 h-6 ml-4"}>
                LogIn
              </Button>
            </LoginLink>

            <RegisterLink>
              <Button className={"  absolute right-16 mr-2 top-1 h-6"}>
                Sign Up
              </Button>
            </RegisterLink>
          </div>
        </div>
      ) : (
        <div>
          <div className={" flex "}>
            <Avatar
              className={" absolute right-2 top-0 w-9 h-9 "}
            >
              <AvatarImage>
                <Image alt={""} src={user?.profile} height={50} width={50} />
              </AvatarImage>

              <AvatarFallback>hi</AvatarFallback>
            </Avatar>
          </div>
        </div>
      )}
    </div>
  );
}
