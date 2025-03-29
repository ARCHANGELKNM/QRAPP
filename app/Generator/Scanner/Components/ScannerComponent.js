"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@components/ui/card";
import { Button } from "@components/ui/button";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Dialog, DialogContent, DialogClose } from "@components/ui/dialog";
import "tailwindcss/tailwind.css";
import { useRef } from "react";

export default function Scanner() {
  const [data, setData] = useState("No result");
  const[scanning, setScanning] = useState(false)
  const [open, setOpen] = useState(false);
  const scannerRef = useRef(null);

  // the code the makes the start and stop botton  work

  const handleStart = () => {
    setScanning(true);
    scannerRef.current.open();
  };

  const handleStop = () => {
     setScanning(false);
    scannerRef.current.close();
  };

  return (
    <div>
      <div className="flex justify-center w-screen h-screen">
        <QrReader
          ref={scannerRef}
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              setOpen(true);
              return (
                <Dialog open={open}>
                  <DialogContent>
                    <Card>
                      <CardContent>
                        <CardHeader>
                          <DialogHeader>
                            <p
                              className={
                                "font-bold text-lg flex justify-center"
                              }
                            >
                              The Results Are In
                            </p>
                          </DialogHeader>
                        </CardHeader>
                        <p className={"flex justify-center"}>{data}</p>
                        <DialogFooter>
                          <DialogClose>
                            <Button asChild>Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </CardContent>
                    </Card>
                  </DialogContent>
                </Dialog>
              );
            }
            if (!!error) {
              console.info(error);
            }
          }}
          constraints={{ facingMode: "user" }}
          style={{ width: "100%" }}
          className={" mt-10 w-screen h-screen bg-slate-500 "}
        />
      </div>

      <div
        className={
          "fixed flex left-1/2 -translate-x-1/2 justify-center bottom-2"
        }
      >
        <div
          className={
            "  mt-5 border shadow-md  w-52 flex justify-center rounded-lg  bg-white"
          }
        >
          <Button className={" mr-2 "} onClick={handleStart} disabled={scanning}>
            Start
          </Button>

          <Button className={""} onClick={handleStop} disabled={!scanning}>
            Stop
          </Button>
        </div>
      </div>
    </div>
  );
}
