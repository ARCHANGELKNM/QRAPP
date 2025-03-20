"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { useState } from "react";

export default function page() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className={"flex justify-center relative"}>
        <div>
          <Button className={""} onClick={() => setOpen(true)}>
            Open
          </Button>
        </div>

        <Dialog open={open}>
          <DialogContent>
            <DialogHeader className={"text-lg font-bold flex justify-center"}>The results are In</DialogHeader>
            HI
            <DialogClose>
              <Button>close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
