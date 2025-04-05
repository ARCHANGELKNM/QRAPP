"use client";
import React, { useState } from "react";
import Camera from "react-camera";
import jsQR from "jsqr";
// If using ShadCN UI components, import them (example below)
// import { Button } from "@/components/ui/button";

const QrScanner = () => {
  const [qrResult, setQrResult] = useState(null);

const handleTakePhoto = (dataUri) => {
  console.log("Photo captured:", dataUri);
  const img = new Image();
  img.src = dataUri;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);
    if (code) {
      console.log("QR code detected:", code.data);
      setQrResult(code.data);
    } else {
      console.log("No QR code found.");
      setQrResult("No QR code found.");
    }
  };
};


  return (
    <div className="relative w-full h-screen b flex items-center justify-center">
      {/* Container that limits the height to 90% of the screen */}
      <div className="w-full h-[90%]">
        <Camera
          onTakePhoto={handleTakePhoto}
          idealFacingMode="environment"
          isImageMirror={false}
          imageType="jpg"
          imageCompression={0.97}
          isMaxResolution={true}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Optionally, you can include a ShadCN UI Button if you wish to trigger capture 
          but note that react-camera’s capture is built-in—you may have to rely on its own UI.
          For demonstration, here's a disabled button styled with Tailwind: */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        {/* Replace with your ShadCN UI Button if desired */}
        <button
          disabled
          className="px-4 py-2 bg-blue-600 text-white rounded shadow opacity-50 cursor-not-allowed"
        >
          Capture is triggered by the camera’s own UI
        </button>
      </div>

      {/* Display QR Code Result */}
      {qrResult && (
        <div>
        <Dialog className={" flex justify-center"} open={!!qrResult}>
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
                <p className={"flex justify-center"}>{qrResult}</p>
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
    
      )}
    </div>
  );
};

export default QrScanner;

