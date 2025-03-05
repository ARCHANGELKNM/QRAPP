"use client";

import Account from "./components/Account";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Card, CardHeader, CardContent } from "@components/ui/card";
import Image from "@node_modules/next/image";
import { useKindeBrowserClient } from "@node_modules/@kinde-oss/kinde-auth-nextjs";

export default function page() {
  const { user } = useKindeBrowserClient();
  return (
    <div>
      <div className={"flex justify-center top-20"}>
        <Avatar
          className={" top-20 w-60 h-60 md:w-72 md:h-72 ring-2 ring-sky-900"}
        >
          <AvatarImage>
            <Image src={user?.profile} alt={""} height={100} width={100} />
          </AvatarImage>

          <AvatarFallback>LO</AvatarFallback>
        </Avatar>
      </div>
      <p className={"font-bold mt-5"}>Name</p>

      <p className={"font-semibold"}>Email</p>
    </div>
  );
}
