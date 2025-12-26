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
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [grade, setGrade] = useState("");

  const [manualInstitution, setManualInstitution] = useState("");
  const [autoFetchedInstitution, setAutoFetchedInstitution] = useState(null);

  const [showQR, setShowQR] = useState(false);

  // 🔑 Refs (MUST exist outside conditionals)
  const qrRef = useRef(null);
  const qrCodeRef = useRef(null);

  /* -----------------------------
     LOAD PROFILE (AUTH ONLY)
  ------------------------------*/
  useEffect(() => {
    async function loadProfile() {
      const res = await fetch("/api/profile");
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setProfile(data);
      setAutoFetchedInstitution(data?.institutionName || null);
      setLoading(false);
    }
    loadProfile();
  }, []);

  /* -----------------------------
     GENERATE QR AFTER UI OPENS
  ------------------------------*/
  useEffect(() => {
    if (!showQR) return;
    if (!qrRef.current) return;

    const institution = autoFetchedInstitution ;

    const combined = `${name || "N/A"} ${surname || "N/A"} | Grade ${
      grade || "N/A"
    } | ${institution}`;

    // Clear old QR
    qrRef.current.innerHTML = "";

    // Create new QR instance
    qrCodeRef.current = new QRCodeStyling({
      width: 250,
      height: 250,
      type: "svg",
      data: combined,
      dotsOptions: {
        color: "#000",
        type: "rounded",
      },
      backgroundOptions: {
        color: "#fff",
      },
    });

    // Append to DOM
    qrCodeRef.current.append(qrRef.current);

    // Log QR generation (NON-BLOCKING)
    if (profile) {
      fetch("/api/qr-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: combined,
          generatedByKindeId: profile.id,
          generatedByName: `${profile.name || "N/A"} ${profile.surname || ""}`,
          institutionName: institution,
        }),
      }).catch(() => {});
    }
  }, [showQR]);

  /* -----------------------------
     HANDLERS
  ------------------------------*/
  const handleGenerateClick = () => {
    setShowQR(true);
  };

  const handleDownload = () => {
    if (!qrCodeRef.current) return;
    qrCodeRef.current.download({
      name: "qr-code",
      extension: "png",
    });
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div className="flex justify-center items-center">
      <Card className="w-96 mt-20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center">QR Generator</CardTitle>
          <CardDescription className="text-center">
            Fill any fields you want
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <Input
            placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />

          <Input
            placeholder="Institution"
            value={autoFetchedInstitution || manualInstitution}
            onChange={(e) => setManualInstitution(e.target.value)}
            disabled={!!autoFetchedInstitution}
          />

          <Button className="w-full" onClick={handleGenerateClick}>
            Generate
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t p-6 h-2/3 z-50"
          >
            <div className="flex justify-end mb-4">
              <button onClick={() => setShowQR(false)}>
                <X />
              </button>
            </div>

            <div
              ref={qrRef}
              onClick={handleDownload}
              className="flex justify-center cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
