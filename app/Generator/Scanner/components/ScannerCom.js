"use client";

import { QrReader } from "react-qr-reader";
import { useState, useRef } from "react";
import { Button } from "@components/ui/button";
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@components/ui/drawer";
import { CardContent, Card } from "@components/ui/card";

export default function ScannerCom() {
  const [scanResult, setScanResult] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className={"flex justify-center"}>
      <QrReader
        className={" h-screen max-w-72 bg-slate-500 "}
        constraints={{
          facingMode: "environment",
          width: 600,
          height: 600,
        }}
        style={{ width: "100%" }}
        onResult={(result, error) => {
          if (!!result) {
            setScanResult(result?.text);
            setOpen(true);

            return (
              <div>
                <Drawer open={open}>
                  <DrawerContent>
                    <DrawerTitle>Scanner Results</DrawerTitle>

                    <DrawerDescription>ok the results are in</DrawerDescription>
                    <div>
                      <p className={""}>Result : {scanResult}</p>
                    </div>
                    <DrawerFooter>
                      <Button>Scan Again</Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            );
          }

          if (!!error) {
            console.info(error);
          }
        }}
      />
     
    </div>
  );
}
