"use client";

import { QrScanner } from "react-qrcode-scanner";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@components/ui/card";
import { useState, useRef, useEffect } from "react";


export default function QRCodeScanner(value) {
  const [qrcodeResults, setQrcodeResults] = useState(null);
    const scannerRef = useRef(null);
  const handleScan = (value) => {
    setQrcodeResults(value);
    console.log({ value });
  };

  const handleError = (error) => {
    console.log({ error });
  };


    useEffect(() => {
      if (scannerRef.current) {
        const height = window.innerHeight * 0.9; // 90% of screen height
        scannerRef.current.style.height = `${height}px`; // Apply height
      }
    }, []); 

  return (
    <div>
      {/* The Scanner Component */}

      <div className="w-full h-screen bg-black flex justify-center items-center">
        <div className="relative w-full h-[90vh] max-w-[100%]">
          <QrScanner
            style={{ width: "90vw", height: "90vh" }}
            delay={300}
            onScan={handleScan}
            onError={handleError}
            className="qr-screen"
            ref={scannerRef}
          />
        </div>
      </div>

      {/* This component displays the scanner's results */}
      <div>
        <Dialog className={" flex justify-center"} open={!!qrcodeResults}>
          <DialogContent>
            <Card>
              <CardContent>
                <CardHeader>
                  <DialogHeader>
                    <p className={"font-bold text-lg flex justify-center"}>
                      The Results Are In
                    </p>
                  </DialogHeader>
                </CardHeader>
                <p className={"flex justify-center"}>{value}</p>
                <DialogFooter></DialogFooter>
              </CardContent>
            </Card>

            <DialogClose>
              <Button asChild className={"absolute bottom-0"}>
            
                Close
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
