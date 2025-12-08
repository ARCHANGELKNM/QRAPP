"use client";
import { useState, useEffect } from "react";
import { apiGet, apiPost } from "@/src/lib/api";

export function useInstitutions() {
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    apiGet("/api/institutions").then(setInstitutions);
  }, []);

  async function addInstitution(name) {
    const newInst = await apiPost("/api/institutions", { name });
    setInstitutions((prev) => [...prev, newInst]);
  }

  return { institutions, addInstitution };
}
