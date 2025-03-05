"use client";

import { Card, CardContent, CardHeader } from "@components/ui/card";
import { Dialog, DialogContent } from "@components/ui/dialog";
import QrScanner from "qr-scanner";
import { useEffect } from "react";
import { useState } from "react";

// library used nimiq/qr-scanner

export default function Scanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const video = document.getElementById("qr-video");

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = stream;
        video.play();

        const scanner = new QrScanner(
          video,
          (result) => {
            return (
              <Dialog open={setOpen}>
                <DialogContent>
                  <div>
                    <Card>
                      <CardContent>
                        <CardHeader>Scan complete</CardHeader>
                        <CardDescription>Here are the results</CardDescription>
                        <div className={"flex justify-center place-content-center"}>
                          results
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
              </Dialog>
            );
          },
          {
            onDecodeError: (error) => {
              console.error(error);
            },
            highlightScanRegion: true,
            highlightCodeOutline: true,
          }
        );

        scanner.start();

        return () => {
          scanner.stop();
          stream.getTracks().forEach((track) => track.stop());
        };
      } catch (err) {
        console.error("Error accessing the camera:", err);
      }
    };

    startVideo();
  }, []);

  return (
    <video
      id="qr-video"
      style={{ width: "90%" }}
      className={"absolute ml-10 flex justify-center h-full "}
    />
  );
}
