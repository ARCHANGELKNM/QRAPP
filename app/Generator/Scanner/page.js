"use client";  

import ScannerCom from "./components/ScannerCom";
import React, { useEffect, useRef } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const App = () => {
  const scannerRef = useRef(null);

  useEffect(() => {
    // Check for camera access
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        // Stream was successful
      })
      .catch((error) => {
        console.error("Error accessing camera: ", error);
      });
  }, []);

  const handleScan = (result) => {
    if (result) {
      console.log(result);
    }
  };

  const handleError = (error) => {
    console.error("Error accessing camera: ", error);
  };

  return (
    <div className="flex items-center justify-center h-screen ml-4 mt-4">
      <div className="w-72 h-72" ref={scannerRef}>
        {" "}
        {/* Adjust the width and height as needed */}
        <Scanner
          onScan={handleScan}
          onError={handleError}
          delay={500} // Adjust the delay to 500 milliseconds
        />
      </div>
    </div>
  );
};

export default App;
