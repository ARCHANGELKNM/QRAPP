"use client";

import {react} from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut,} from "lucide-react";
import { RegisterLink, LoginLink , LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";


export default function Account () { 
const { isAuthenticated, isLoading, user } = useKindeBrowserClient();
  
  return(
    
             <div>
            <Card className="p-4 md:p-6">
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.picture} alt="User" />
                <AvatarFallback>
                  {user?.given_name?.[0]}
                  {user?.family_name?.[0]}
                </AvatarFallback>
              </Avatar>
    
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold truncate">
                  {user?.given_name} {user?.family_name}
                </h2>
                <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
              </div>
    
              <div className="w-full md:w-auto mt-2 md:mt-0">
                {isAuthenticated ? (
                  <LogoutLink> 
                    <Button variant="destructive" className="w-full md:w-auto">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </LogoutLink>
                ) : (
                  <div className="flex flex-col md:flex-row gap-2">
                    <RegisterLink>
                      <Button className="w-full">Register</Button>
                    </RegisterLink>
                    <LoginLink>
                      <Button variant="outline" className="w-full">Log in</Button>
                    </LoginLink>
                  </div>
                )}
              </div>
            </div>
          </Card>
    </div>  
  )
}