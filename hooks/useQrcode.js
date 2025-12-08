"use client";
import { useState, useEffect } from "react";
import { apiGet, apiPost } from "@/src/lib/api";

export function useQRCodes(userId) {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    if (!userId) return;
    apiGet(`/api/qr-codes?user_id=${userId}`).then(setCodes);
  }, [userId]);

  async function saveQRCode(content, institutionId) {
    const saved = await apiPost("/api/qr-codes", {
      content,
      user_id: userId,
      institution_id: institutionId,
    });

    setCodes((prev) => [...prev, saved]);
  }

  return { codes, saveQRCode };
}
