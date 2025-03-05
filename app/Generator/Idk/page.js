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


const QrCodeScanner = () => {
  const [data, setData] = useState("No result");
  const [open, setOpen] = useState(false);
  const scannerRef = useRef(null);

  // the code the makes the start and stop botton  work

  const handleStart = () => {
    scannerRef.current.start();
  };

  const handleStop = () => {
    scannerRef.current.stop();
  };

  return (
    <div>
      <div className="flex justify-center">
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
                      <CardContent>{data}</CardContent>
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
          className={"ml-10 mt-10 w-10/12 h-screen bg-slate-500 "}
        />
      </div>

      <div
        className={"fixed flex left-1/2 -translate-x-1/2 justify-center bottom-2"}
      >
        <div
          className={"  mt-5 border shadow-md  w-52 flex justify-center rounded-lg  bg-white"}
        >
          <Button className={" mr-2 "} onClick={handleStart}>
            Start
          </Button>

          <Button className={""} onClick={handleStop}>
            Stop
          </Button>

          
        </div>
      </div>
    </div>
  );
};

export default QrCodeScanner;
