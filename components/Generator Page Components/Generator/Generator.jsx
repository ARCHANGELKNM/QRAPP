// app/Pages/Generator/GeneratorClient.jsx

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCodeStyling from "qr-code-styling";
import { X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";

export default function GeneratorClient() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [grade, setGrade] = useState("");
  const [manualInstitution, setManualInstitution] = useState("");
  const [autoFetchedInstitution, setAutoFetchedInstitution] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  const qrRef = useRef(null);
  // Ref to hold the dynamically created QR Code instance
  const qrCodeRef = useRef(null);

  // --- New Function: Save QR Code History to Backend ---
  const saveQrCodeHistory = async (contentString) => {
    setIsLogging(true);
    try {
      const response = await fetch("/api/qr-codes", {
        // Using your correct route
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: contentString }),
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      console.log("QR Code generation logged successfully.");
    } catch (error) {
      console.error("Error logging QR history:", error.message);
    } finally {
      setIsLogging(false);
    }
  };

  // --- LOGIC 1: Attempt to fetch the user's institution on load (FAILSAFE) ---
  useEffect(() => {
    async function loadInstitution() {
      try {
        const res = await fetch("/api/users"); // Using your correct route
        if (res.ok) {
          const data = await res.json();
          setAutoFetchedInstitution(data.institution || null);
        }
      } catch (error) {
        console.error("Network error fetching profile:", error);
      }
    }
    loadInstitution();
  }, []);

  // --- LOGIC 2: Generate QR object whenever the sheet opens (YOUR METHOD) ---
  useEffect(() => {
    if (!showQR) return; // Only run when modal opens

    const institutionToUse =
      autoFetchedInstitution || manualInstitution || "N/A";

    const combined = `${name || "N/A"} ${surname || "N/A"} | Grade ${
      grade || "N/A"
    } | ${institutionToUse}`;

    // Call the logging function here in the useEffect where the data is finalized
    saveQrCodeHistory(combined);

    // Initialize the instance inside the effect using YOUR method
    qrCodeRef.current = new QRCodeStyling({
      width: 250,
      height: 250,
      type: "svg",
      data: combined,
      dotsOptions: { color: "#000", type: "rounded" },
      backgroundOptions: { color: "#fff" },
      // logo assumed from prior context
      // image: "/qra_logo.png"
    });

    if (qrRef.current && qrCodeRef.current) {
      qrRef.current.innerHTML = ""; // Clear previous QR codes
      qrCodeRef.current.append(qrRef.current); // Append new instance
    }
  }, [showQR, name, surname, grade, autoFetchedInstitution, manualInstitution]);

  // --- LOGIC 3: Download Handler ---
  const handleDownload = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({
        name: `${surname}_${name}_QR`,
        extension: "png",
      });
    }
  };

  // --- LOGIC 4: Handle Generation/Show Button Click ---
  const handleGenerateClick = () => {
    setShowQR(true);
  };

  return (
    <div>
      <div className={"flex justify-center items-center ml-5"}>
        <Card
          className={
            "relative w-72 h-96 place-content-center mt-20 bg-transparent shadow-2xl sm:w-72 md:w-96 md:h-96 xl:w-54"
          }
        >
          <CardHeader>
            <CardTitle
              className={"font-bold text-2xl relative flex justify-center"}
            >
              Inputs
            </CardTitle>
            <CardDescription className={"flex justify-center"}>
              Please Provide Inputs
            </CardDescription>
          </CardHeader>
          <CardContent className={"space-y-4"}>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(evt) => setName(evt.target.value)}
            />
            <Input
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(evt) => setSurname(evt.target.value)}
            />
            <Input
              type="text"
              placeholder="Grade"
              value={grade}
              onChange={(evt) => setGrade(evt.target.value)}
            />
            <Input
              type="text"
              placeholder="Institution (Auto-filled if set in settings)"
              value={autoFetchedInstitution || manualInstitution}
              onChange={(evt) => setManualInstitution(evt.target.value)}
              disabled={!!autoFetchedInstitution}
            />
            <Button
              className="flex justify-centre text-white px-4 py-2 rounded mt-2"
              onClick={handleGenerateClick}
              disabled={isLogging}
            >
              {isLogging ? "Logging..." : "Generate"}
            </Button>
          </CardContent>
        </Card>
        <div>
          <AnimatePresence>
            {showQR && (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-6 rounded-t-lg z-50 h-2/3 "
              >
                <div className="flex justify-between items-center mb-4 ">
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={() => {
                      setShowQR(false);
                    }}
                  >
                    <X />
                  </button>
                </div>
                <div
                  ref={qrRef}
                  onClick={() => handleDownload()}
                  className="flex justify-center cursor-pointer"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
