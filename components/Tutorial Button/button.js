
import React from 'react';
import Button from "@components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger, DialogHeader } from "@radix-ui/react-dialog";
import { Card, CardContent,  CardFooter, CardHeader } from "@components/ui/card";



const TButton = () => {
    return (
       {/*  <div>
        <Dialog className={""}>
               <DialogTrigger asChild>
                    <Button className={" fixed bottom-5 right-2 rounded-full w-16 h-16"}>
                         ?
                    </Button>
               </DialogTrigger>

               <DialogContent>
                  <div className={"flex justify-center"}>
                     <Card className={" justify-center place-items-center absolute h-screen w-3/6 top-10 "}>
                           
                           <CardHeader>
                             Header
                           </CardHeader>
                           <CardContent >

                                 <div>
                                   Content
                                 </div>
                           </CardContent>

                           <CardFooter>
                               <DialogClose  className={" absolute bottom-0"}>
                                   <Button>
                                       Close
                                   </Button>  
                               </DialogClose>
                           </CardFooter>
                       </Card>

                  </div>
               </DialogContent>

               
           </Dialog>
        </div>*/}
    )
}

export default TButton;