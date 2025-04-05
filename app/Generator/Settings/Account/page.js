"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@components/ui/button";

export default function page() {
  const { isAuthenticated } = useKindeBrowserClient();
  const { user } = useKindeBrowserClient();

  return (
    <div>
      {!isAuthenticated ? (
        <div>
           <h2>
              Welcome Annomus user 
           </h2>
        </div>
      ) : (
        <div>
          <div className={" flex "}>

             
            <Avatar className={" absolute left-0 bottom-0 w-9 h-9 "}>
              <AvatarImage>
                <Image alt={""} src={user?.profile} height={50} width={50} />
              </AvatarImage>

              <AvatarFallback>hi</AvatarFallback>
            </Avatar>
          </div>
        </div>
      )}

      <p>Hello there</p>
    </div>
  );
}
