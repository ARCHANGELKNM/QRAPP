'use client';
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,

} from "@/components/ui/empty";

import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

export function ErrorCreateAccount() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Avatar className="size-12">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="grayscale"
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </EmptyMedia>

        <EmptyDescription>
          Seems like we don't have an account , let's create one or log into one
          to proceed.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex flex-col gap-3 w-full max-w-xs mx-auto mt-2">
          <RegisterLink>
            <Button className="w-full py-3 text-base">Register</Button>
          </RegisterLink>
          <LoginLink>
            <Button variant="outline" className="w-full py-3 text-base">
              Log in
            </Button>
          </LoginLink>
        </div>
      </EmptyContent>
    </Empty>
  );
}
