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
  return (
    <div>
      <div className={"flex justify-center items-center ml-5"}>
        <Card
          className={
            "relative  w-72 h-96  place-content-center mt-20 bg-transparent shadow-2xl sm:w-72   md:w-96 md:h-96    xl:w-54 "
          }
        >
          <CardHeader>
            <CardTitle
              className={"font-bold text-2xl relative flex justify-center "}
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

            <Button
              className="flex justify-centre  text-white px-4 py-2 rounded mt-2"
              onClick={() => {
                setShowQR(true);
                SaveToDB();
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
                  className="flex justify-center "
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
