"use client";

import { QrScanner } from "react-qrcode-scanner";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
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

export default function QRCodeScanner() {
  const [qrcodeResults, setQrcodeResults] = useState(null);
  const handleScan = (value) => {
    setQrcodeResults(value);
    console.log({ value });
  };

  const handleError = (error) => {
    console.log({ error });
  };

  return (
    <div>
      <div className="  w-screen h-screen">
        <QrScanner
          vedioStyle={{ className: "w-full h-screen" }}
          onScan={handleScan}
          onError={handleError}
          className={"h-3/4 w-screen "}
        />
      </div>
      <Dialog className={" flex justify-center"} open={!!qrcodeResults}>
        <DialogTitle>
           <p></p>
        </DialogTitle>
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
              <div className={"flex justify-center"}>{qrcodeResults}</div>
              <DialogFooter>
                <DialogClose>
                  <Button asChild>Close</Button>
                </DialogClose>
              </DialogFooter>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
