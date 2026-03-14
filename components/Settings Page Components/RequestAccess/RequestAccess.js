"use client";

import { useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"; // Added Import
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";



export default function AccessRequestor() {
  const {
    isAuthenticated,
    user,
    isLoading: authLoading,
  } = useKindeBrowserClient();

  const [profile, setProfile] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [institutionId, setInstitutionId] = useState("");

  /* ------------------------------
      LOAD PROFILE
  ------------------------------- */
  async function loadProfile() {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data) {
        setProfile(data);
        setInstitutionId(data.institutionId);
      }
    } catch (err) {
      console.error("Profile load error:", err);
    }
  }

  /* ------------------------------
      LOAD INSTITUTIONS
  ------------------------------- */
  async function loadInstitutions() {
    try {
      const res = await fetch("/api/institutions");
      const data = await res.json();
      // ✅ Correctly targets the "institutions" key from your API object
      setInstitutions(data.institutions || []);
    } catch (err) {
      console.error("Institutions fetch error:", err);
      setInstitutions([]);
    }
  }

  useEffect(() => {
    // Only run fetches if Kinde has finished checking auth
    if (!authLoading) {
      Promise.all([loadProfile(), loadInstitutions()]).then(() =>
        setLoading(false),
      );
    }
  }, [authLoading]);

  /* ------------------------------
      SAVE CHANGES
  ------------------------------- */
  async function saveAll(newInstitutionId) {
    if (!user) return;

    try {
      await fetch("/api/institution/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // ✅ Using Kinde details for the new profile entry
          name: user.given_name,
          surname: user.family_name,
          email: user.email,
          kindeId: user.id,
          institution_id: Number(newInstitutionId ?? institutionId),
          role: "staff",
          approved: false,
        }),
      });
      loadProfile();
    } catch (error) {
      console.error("Profile update error:", error);
    }
  }

  // Handle Auth Guard
  if (!isAuthenticated) return null;

  return (
    // ✅ Responsive padding: p-4 for mobile, mt-10 for desktop

    <div>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Institution</CardTitle>
        </CardHeader>

        <CardContent>
          <Select
            value={institutionId ? institutionId.toString() : ""}
            onValueChange={async (value) => {
              setInstitutionId(value);
              await saveAll(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your institution" />
            </SelectTrigger>

            <SelectContent>
              {(Array.isArray(institutions) ? institutions : []).map((inst) => (
                <SelectItem key={inst.id} value={inst.id.toString()}>
                  {inst.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}
