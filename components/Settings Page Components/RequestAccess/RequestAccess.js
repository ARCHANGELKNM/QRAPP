"use client";

import { useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function AccessRequestor() {
  const { isAuthenticated, user, isLoading: authLoading } = useKindeBrowserClient();
  
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [institutionId, setInstitutionId] = useState("");

  /* ------------------------------
      LOAD INSTITUTIONS ONLY
  ------------------------------- */
  async function loadInstitutions() {
    try {
      const res = await fetch("/api/institutions");
      const data = await res.json();
      // Ensure we target the 'institutions' key from your specific API format
      setInstitutions(data.institutions || []);
    } catch (err) {
      console.error("Institutions fetch error:", err);
      setInstitutions([]);
    }
  }

  useEffect(() => {
    if (!authLoading) {
      loadInstitutions().then(() => setLoading(false));
    }
  }, [authLoading]);

  /* ------------------------------
      SAVE CHANGES (Directly to Access API)
  ------------------------------- */
  async function saveAll(newInstitutionId) {
    if (!user) return;

    try {
      // ✅ We only hit the request-access API, no internal profile API needed here
      await fetch("/api/institution/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.given_name,
          surname: user.family_name,
          email: user.email,
          kindeId: user.id,
          institution_id: Number(newInstitutionId),
          role: "staff",
          approved: false,
        }),
      });
      // You can add a toast notification here to confirm the request was sent
    } catch (error) {
      console.error("Request access error:", error);
    }
  }

  if (!isAuthenticated || authLoading) return null;

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
