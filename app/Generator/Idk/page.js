"use client";

import QrScanner from 'qr-scanner';
import { useEffect } from 'react';


export default function  Scanner () {
   const handleScan = async (data) => {
    console.log('Scanned data:', data);
  };
   
   useEffect(() => {
    const scanner = new QrScanner('qr-scanner', handleScan);
    scanner.start();
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div id="qr-scanner"></div>
    </div>
  );
  
}