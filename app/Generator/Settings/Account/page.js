

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
                   <div className="flex ">
                     <LoginLink>
                       <Button className={"  absolute right-0 bottom-0 h-6 ml-4"}>
                         LogIn
                       </Button>
                     </LoginLink>
     
                     <RegisterLink>
                       <Button className={"  absolute right-16 bottom-0 mr-2  h-6"}>
                         Sign Up
                       </Button>
                     </RegisterLink>
                   </div>
                 </div>
               ) : (
                 <div>
                   <div className={" flex "}>
                     <Avatar className={" absolute left-0 bottom-0 w-9 h-9 "}>
                       <AvatarImage>
                         <Image
                           alt={""}
                           src={user?.profile}
                           height={50}
                           width={50}
                         />
                       </AvatarImage>
     
                       <AvatarFallback>hi</AvatarFallback>
                     </Avatar>
                   </div>
                 </div>
               )}
    </div>
  );
}
