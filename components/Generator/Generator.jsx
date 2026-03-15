'use client';
import { AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";

// Guards & Feedback
import ErrorAdminApproval from "@components/Errors/Admin Approval/Error";
import { ErrorCreateAccount } from "@components/Errors/Create Account/Error";
import LoadingAnimation from "@components/LoadingAnimation/Loading";

//  Hooks

import { useState, useRef, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useAccessControl } from "@/hooks/useAccessControl";

export default function Generator() {
const access = useAccessControl(); // Define this FIRST
  const { profile, institutionName } = useProfile();
  
  const [showQR, setShowQR] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [grade, setGrade] = useState("");
  const [manualInstitution, setManualInstitution] = useState("");

  const qrRef = useRef(null);
  const qrCodeRef = useRef(null);

  /* -----------------------------
     2. ONBOARDING SYNC
  ------------------------------*/
  useEffect(() => {
    // Now 'access' is initialized before this runs
    if (access.state !== true) return;
    
    const syncProfile = async () => {
      try {
        await fetch("/api/onboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        console.log("Onboarding sync failed:", err);
      }
    };

    syncProfile();
  }, [access.state]);

  /* -----------------------------
     3. INIT QR INSTANCE (SSR SAFE)
  ------------------------------*/
  useEffect(() => {
    // Dynamically import to prevent "C before initialization" errors
    const initQR = async () => {
      const QRCodeStyling = (await import("qr-code-styling")).default;
      if (!qrCodeRef.current) {
        qrCodeRef.current = new QRCodeStyling({
          width: 250,
          height: 250,
          type: "svg",
          data: "",
          dotsOptions: { color: "#000", type: "rounded" },
          backgroundOptions: { color: "#fff" },
        });
      }
    };
    initQR();
  }, []);

  /* -----------------------------
     4. HANDLERS
  ------------------------------*/
  useEffect(() => {
    if (showQR && qrRef.current && qrCodeRef.current) {
      qrRef.current.innerHTML = "";
      qrCodeRef.current.append(qrRef.current);
    }
  }, [showQR]);

  function handleGenerateClick() {
    if (!qrCodeRef.current) return;
    const finalInstitution = institutionName || manualInstitution || "N/A";
    const combined = `${name || "N/A"} ${surname || "N/A"} | Grade ${grade || "N/A"} | ${finalInstitution}`;

    qrCodeRef.current.update({ data: combined });
    setShowQR(true);

    fetch("/api/qr-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: combined, institutionName: finalInstitution }),
    }).catch(() => {});
  }

  function handleDownload() {
    qrCodeRef.current?.download({ name: "qrcode", extension: "png" });
  }  /* -----------------------------
     ACCESS CONTROL (NO EARLY RETURN)
  ------------------------------*/

  if (access.state === "loading") return <LoadingAnimation />;
  if (access.state === "unauthenticated") return <ErrorCreateAccount />;
  if (access.state === "no-profile" || access.state === "pending")
    return <ErrorAdminApproval />;

  // Only authenticated and approved users reach here
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
            value={institutionName || manualInstitution}
            onChange={(e) => setManualInstitution(e.target.value)}
            disabled={!!institutionName}
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
