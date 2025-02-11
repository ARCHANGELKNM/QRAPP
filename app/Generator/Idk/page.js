"use client";
import React, { useState, useEffect } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@components/ui/dialog";


const QrScannerComponent = () => {


  
  const [scannedData, setScannedData] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // List available video input devices (cameras)
    navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
      const videoDevices = deviceInfos.filter(
        (device) => device.kind === "videoinput"
      );
      setDevices(videoDevices);
      setSelectedDeviceId(videoDevices[0]?.deviceId || "");
    });
  }, []);

  const handleScan = (result) => {
    if (result) {
      setScannedData(result[0].rawValue);
    }
  };

  const handleError = (error) => {
    console.error("Error scanning QR Code:", error);
  };

  return (
    <div>
      {/* Dropdown to select camera */}
      <select
        value={selectedDeviceId}
        onChange={(e) => setSelectedDeviceId(e.target.value)}
      >
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${device.deviceId}`}
          </option>
        ))}
      </select>

      {/* <div
        className={
          " ml-1  mt-1 flex justify-center items-center h-screen w-screen"
        }
      >
        <div
          className={"w-56 h-screen  mx-auto flex justify-center items-center "}
        >
          <Scanner
            className={""}
            onScan={handleScan}
            onError={handleError}
                                                                      // constraints={{ video: { deviceId: selectedDeviceId } }}
          />
        </div>
      </div> */}

       <div className="flex items-center justify-center h-screen ml-4">
            <div className="w-72 h-screen" >
              {/* Adjust the width and height as needed */}
              <Scanner
                onScan={handleScan}
                onError={handleError}
                delay={500} // Adjust the delay to 500 milliseconds
              />
            </div>
          </div>
      {scannedData && (
        <div>
          <h2>Scanned Data:</h2>
          <p>{scannedData}</p>
        </div>
      )}
    </div>
  );
};


