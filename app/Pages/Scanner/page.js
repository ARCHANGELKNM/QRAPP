"use client";
import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@Components/ui/button";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-black">
    <div className="w-16 h-16 border-4 border-white border-t-transparent border-b-transparent rounded-full animate-spin"></div>
  </div>
);

const QrScanner = () => {
  const [qrResult, setQrResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const codeReader = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      codeReader.current = new BrowserMultiFormatReader();
      codeReader.current.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result, err) => {
          if (result) {
            setQrResult(result.getText());
          }
        }
      );
    }
  }, [loading]);

  useEffect(() => {
    if (qrResult) {
      const resetTimer = setTimeout(() => {
        setQrResult(null);
      }, 60000);
      return () => clearTimeout(resetTimer);
    }
  }, [qrResult]);

  const handleReset = () => {
    setQrResult(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Scanner Box Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative flex items-center justify-center w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/2 aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-2xl"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Animated Scan Line */}
        <motion.div
          className="absolute left-1/2 w-3/4 h-0.5 bg-blue-500 rounded-full opacity-80"
          style={{ transform: "translateX(-50%)" }}
          initial={{ top: "15%" }}
          animate={{ top: "85%" }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      {/* QR Result + Blur */}
      <AnimatePresence>
        {qrResult && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md z-10"
            />
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-20 flex flex-col justify-center items-center p-6"
            >
              <div className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-2xl text-center w-1/2">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  The Results Are In
                </h3>
                <p className="text-gray-700 text-sm sm:text-base break-words">
                  {qrResult}
                </p>
                <Button
                  onClick={handleReset}
                  className="mt-6 px-5 py-3  text-white text-base rounded-full shadow-md"
                >
                  Scan Another
                </Button>
                <p className="text-gray-500 mt-2 text-xs">
                  (Auto-reset in 60s)
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QrScanner;
