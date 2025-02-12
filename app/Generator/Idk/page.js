"use client";

import QrScanner from "qr-scanner";
import { useEffect } from "react";

// library used nimiq/qr-scanner

export default function Scanner() {
  useEffect(() => {
    const video = document.getElementById("qr-video");
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

    return () => {
      scanner.stop();
    };
  }, []);

  return <video id="qr-video" />;
}
