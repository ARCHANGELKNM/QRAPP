"use client";
import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@components/ui/button";
import LoadingAnimation from "@components/LoadingAnimation/Loading";

export default function Scanner ()  {
  const [qrResult, setQrResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const controlsRef = useRef(null);

  const text = "QRA";
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayed((prev) => prev + text[index]);
      setIndex((prev) => prev + 1);
    }, 180);

    return () => clearTimeout(timeout);
  }, [index]);


  /* -----------------------------
     LOADING DELAY
  ------------------------------*/
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  /* -----------------------------
     START SCANNER
  ------------------------------*/
  useEffect(() => {
    if (loading || qrResult) return;

    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;

    reader
      .decodeFromConstraints(
        {
          video: { facingMode: { ideal: "environment" } }, // ✅ rear camera
        },
        videoRef.current,
        (result) => {
          if (result) {
            setQrResult(result.getText());

            // ✅ STOP CAMERA AFTER SUCCESSFUL SCAN
            if (controlsRef.current) {
              controlsRef.current.stop();
              controlsRef.current = null;
            }
          }
        }
      )
      .then((controls) => {
        controlsRef.current = controls;
      })
      .catch(() => {});

    return () => {

      if (controlsRef.current) {
        controlsRef.current.stop();
        controlsRef.current = null;
      }
    };
  }, [loading, qrResult]);

  /* -----------------------------
     RESET SCAN
  ------------------------------*/
  const handleReset = () => {
    setQrResult(null);
  };

  if (loading) {
    return (
       <LoadingAnimation/>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <motion.div className="relative w-11/12 aspect-square border-4  rounded-2xl overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
        />
      </motion.div>

      <AnimatePresence>
        {qrResult && (
          <motion.div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl text-center">
              <p className="break-words">{qrResult}</p>
              <Button className="mt-4" onClick={handleReset}>
                Scan Another
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


