"use client";
import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"; // Fixed path
import LoadingAnimation from "@/components/LoadingAnimation/Loading";

export default function Scanner() {
  const [qrResult, setQrResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const controlsRef = useRef(null);

  /* -----------------------------
     LOADING DELAY
  ------------------------------*/
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  /* -----------------------------
     START SCANNER (Logic Unchanged)
  ------------------------------*/
  useEffect(() => {
    if (loading || qrResult) return;

    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;

    reader
      .decodeFromConstraints(
        { video: { facingMode: { ideal: "environment" } } },
        videoRef.current,
        (result) => {
          if (result) {
            setQrResult(result.getText());
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

  const handleReset = () => setQrResult(null);

  if (loading) return <LoadingAnimation />;

  return (
    <div className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* ✅ SIZE KEPT: 11/12 aspect-square + Your NEW Branded Class */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border-scanner relative w-11/12 aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20"
      >
        {/* ✅ THE LASER: Purely visual, no logic changes */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent z-10 shadow-[0_0_15px_rgba(99,102,241,0.8)] animate-[scan-line_3s_ease-in-out_infinite]" 
             style={{ top: '10%' }} 
        />
        
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
          muted
          playsInline
        />

        {/* Decoration Corners */}
        <div className="absolute inset-0 border-[20px] border-transparent pointer-events-none">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/30 rounded-br-lg" />
        </div>
      </motion.div>

      <AnimatePresence>
        {qrResult && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center z-50 p-6"
          >
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] text-center shadow-2xl max-w-sm w-full border border-zinc-200 dark:border-zinc-800"
            >
              <h3 className="text-lg font-bold mb-2">Scan Successful</h3>
              <p className="text-sm text-zinc-500 break-all mb-6">{qrResult}</p>
              <Button 
                className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold" 
                onClick={handleReset}
              >
                Scan Another
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes scan-line {
          0%, 100% { top: 10%; }
          50% { top: 90%; }
        }
      `}</style>
    </div>
  );
}
