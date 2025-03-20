"use client";

import Account from "./components/Account";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Card, CardHeader, CardContent } from "@components/ui/card";
import Image from "@node_modules/next/image";
import { useKindeBrowserClient } from "@node_modules/@kinde-oss/kinde-auth-nextjs";

export default function page() {
  const { user } = useKindeBrowserClient();
  const{isAuthenticated} = useKindeBrowserClient();

  return (
    <div>
 
      {!isAuthenticated ? (
              <div>
                <div className="flex">
                  {/* <LoginLink>
                    <Button className={"  absolute right-0 top-1 h-6 ml-4"}>
                      LogIn
                    </Button>
                  </LoginLink>
      
                  <RegisterLink>
                    <Button className={"  absolute right-16 mr-2 top-1 h-6"}>
                      Sign Up
                    </Button>
                  </RegisterLink> */}
                </div>
              </div>
            ) : (
              <div>
                <div className={"flex relative justify-center top-12 "}>
                  <Avatar
                    className={"relative  w-52 h-52 mb-10  "}
                  >
                    <AvatarImage>
                      <Image alt={""} src={user?.profile} height={50} width={50} />
                    </AvatarImage>
      
                    <AvatarFallback>hi</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            )}
    {/* <div className={" "}>
        <div className={"flex-col "}>
          <Card className={" absolute  h-12 w-32  bottom-0 left-1/2"}>
            <CardContent>hello</CardContent>
          </Card>

          <Card className={"absolute right-1/4 bottom-0 h-12 w-32 mt-10"}>
            <CardContent>Life</CardContent>
          </Card>
        </div>
      </div> */}
    </div>
  );
}
