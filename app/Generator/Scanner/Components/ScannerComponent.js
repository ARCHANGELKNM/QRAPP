
"use client";

import QrScanner from "qr-scanner";
import { useEffect } from "react";

// library used nimiq/qr-scanner

export default function Scanner() {
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
            console.log(result.data);
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
    <div className={"flex justify-center h-screen"}>
      <video
        id="qr-video"
        style={{ width: "70%" }}
        className={"flex justify-center h-screen"}
      />
    </div>
  );
}
