"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Image } from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LogoutLink,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@components/ui/button";
import { CircleUser } from "lucide-react";

export default function page() {
  const { isAuthenticated } = useKindeBrowserClient();
  const { user } = useKindeBrowserClient();
  const initials =
    (user?.given_name?.charAt(0) || "") + (user?.family_name?.charAt(0) || "");

  return (
    <div>
      {/* For users that aren't logged in */}
      {!isAuthenticated ? (
        <div>
          <div className={" flex-col   "}>
            <h2 className={" flex justify-center font-bold text-3xl mt-5"}>
              Welcome Dear User
            </h2>

            {/* Account Avatar */}

            <div className={"flex justify-center"}>
              <Avatar className={"  w-72 h-72  mt-5"}>
                <AvatarImage>
                  <Image
                    alt={""}
                    src={""}
                    height={500}
                    width={500}
                    className={" w-96 "}
                  />
                </AvatarImage>

                <AvatarFallback>
                  <CircleUser className={"w-72 h-72"} />
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Login or Sign in */}

            <div className={"flex justify-center"}>
              <div className={" relative  w-44 h-6 mt-5 "}>
                <LoginLink>
                  <Button className={"  absolute h-6 left-0"}>Log In</Button>
                </LoginLink>

                <RegisterLink>
                  <Button className={"  absolute h-6 right-0"}>Sign Up</Button>
                </RegisterLink>
              </div>
            </div>
          </div>

          <Alert
            variant="destructive"
            className={"absolute right-0 bottom-5 w-23 mr-5 "}
          >
            <AlertTitle>You Don't Have An Account ?</AlertTitle>
            <AlertDescription>Please sign in or Log in.</AlertDescription>
          </Alert>
        </div>
      ) : (
        // For Users that have account and are logged in

        <div>
          <div className={" flex-col"}>
            <h2 className={"flex justify-center font-bold text-3xl"}>
              Welcome Back {user?.given_name}
            </h2>

            <div className={" flex justify-center   mt-5 "}>
              <Avatar className={"w-72 h-72 "}>
                <AvatarImage>
                  <Image alt={""} src={user?.picture} height={50} width={50} />
                </AvatarImage>

                <AvatarFallback>
                  <h2 className={" font-semibold  text-4xl  "}>{initials}</h2>
                </AvatarFallback>
              </Avatar>
            </div>

            <div className={" flex justify-center mt-5"}>
              <LogoutLink>
                <Button className={""} variant="destructive">
                  Log Out
                </Button>
              </LogoutLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
