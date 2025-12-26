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
          Seems like we don't have an account , let's create one or log into one to
          proceed.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <RegisterLink>
            <Button> Reegister </Button>
          </RegisterLink>
          <LoginLink>
            <Button variant="outline"> Log in</Button>
          </LoginLink>
        </div>
      </EmptyContent>
    </Empty>
  );
}
