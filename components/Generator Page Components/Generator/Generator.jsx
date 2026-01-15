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

import ErrorAdminApproval from "@components/Error handling/Admin Approval/Error";
import { ErrorCreateAccount } from "@components/Error handling/Create Account/Error";
import LoadingAnimation from "@components/Loading Animation/Loading";

export default function GeneratorClient() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canGenerate, setCanGenerate] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [grade, setGrade] = useState("");

  const [autoFetchedInstitution, setAutoFetchedInstitution] = useState(null);
  const [manualInstitution, setManualInstitution] = useState("");

  const [showQR, setShowQR] = useState(false);

  const qrRef = useRef(null);
  const qrCodeRef = useRef(null);

  /* -----------------------------
     LOAD PROFILE (ONCE)
  ------------------------------*/
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) {
          setProfile(null);
          return;
        }

        const data = await res.json();
        setProfile(data);

        if (data?.approved === true && data?.institutionId) {
          setCanGenerate(true);
          setAutoFetchedInstitution(data.institutionName || null);
        }
      } catch (err) {
        console.error("Profile load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  /* -----------------------------
     ACCESS STATES
  ------------------------------*/
  if (loading) return <LoadingAnimation />;

  if (!profile) {
    return (
      <ErrorCreateAccount
        title="You're not logged in"
        description="Please sign in to generate QR codes."
        actionLabel="Sign In"
      />
    );
  }

  if (!canGenerate) {
    return (
      <ErrorAdminApproval
        title="Approval Required"
        description="You need approval before generating QR codes."
        actionLabel="Request Access"
      />
    );
  }

  /* -----------------------------
     GENERATE QR
  ------------------------------*/
  async function handleGenerateClick() {
    const institution = autoFetchedInstitution || manualInstitution || "N/A";

    const combined = `${name || "N/A"} ${surname || "N/A"} | Grade ${
      grade || "N/A"
    } | ${institution}`;

    // Render QR immediately
    setShowQR(true);

    if (qrRef.current) {
      qrRef.current.innerHTML = "";

      qrCodeRef.current = new QRCodeStyling({
        width: 250,
        height: 250,
        type: "svg",
        data: combined,
        dotsOptions: { type: "rounded" },
        backgroundOptions: { color: "#fff" },
      });

      qrCodeRef.current.append(qrRef.current);
    }

    // Log QR (non-blocking)
    fetch("/api/qr-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: combined }),
    }).catch(() => {});
  }

  function handleDownload() {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({ name: "qra-code", extension: "png" });
    }
  }

  /* -----------------------------
     RENDER
  ------------------------------*/
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
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
          <Input placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} />

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
