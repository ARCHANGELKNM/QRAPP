
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

export default function Generator() {
  // USER INFO
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [grade, setGrade] = useState("");
  const [institution, setInstitution] = useState("");

  // UI / QR
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef(null);
  const qrCode = useRef(null);

  // Load user profile from DB through API
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");

        if (!res.ok) {
          console.error("Profile fetch failed");
          return;
        }

        const data = await res.json();

        // Prefill fields
        setName(data.Name || "");
        setSurname(data.Surname || "");
        setGrade(data.Grade || "");
        setInstitution(data.Institution || "");
      } catch (err) {
        console.error("Profile load error:", err);
      }
    }

    fetchProfile();
  }, []);

  // Generate QR object whenever the sheet opens
  useEffect(() => {
    if (!showQR) return;

    const combined = `${name} ${surname} | Grade ${grade} | ${institution}`;

    qrCode.current = new QRCodeStyling({
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

    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.current.append(qrRef.current);
    }
  }, [showQR, name, surname, grade, institution]);

  const handleDownload = () => {
    if (qrCode.current) {
      qrCode.current.download({ name: "student_qr", extension: "png" });
    }
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
              className={"mt-2"}
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
              placeholder="Institution"
              value={institution}
              onChange={(evt) => setInstitution(evt.target.value)}
              list="institution-options"
            />

            {/* Hard-coded institutions you requested */}
            <datalist id="institution-options">
              <option value="Mhetsa Academy" />
              <option value="Nyukani" />
              <option value="Muhluri Combined" />
              <option value="Tlaruhani" />
            </datalist>

            <Button
              className="flex justify-centre text-white px-4 py-2 rounded mt-2"
              onClick={() => {
                setShowQR(true);
              }}
            >
              Generate
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
                className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-6 rounded-t-lg z-50 h-2/3"
              >
                <div className="flex justify-between items-center mb-4">
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
                  onClick={handleDownload}
                  className="flex justify-center"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

