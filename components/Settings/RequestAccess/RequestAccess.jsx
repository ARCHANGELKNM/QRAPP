"use client";

import { useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function AccessRequestor() {
  const { isAuthenticated, user, isLoading: authLoading } = useKindeBrowserClient();
  const { toast } = useToast();
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
 
  if (!user || !user.id || !user.email) {
    console.error("User data not ready yet");
    return;
  }

  try {
    await fetch("/api/institutions/request-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.given_name,
        surname: user.family_name,
        email: user.email, // ✅ Ensure this isn't null
        kindeId: user.id,
        institution_id: Number(newInstitutionId),
        role: "staff",
        approved: false,
      }),
   
   
    });
  } catch (error) {
    console.error("Save error:", error);
  }



}
  if (!isAuthenticated || authLoading) return null;

return (
    // ✅ Responsive padding: p-4 for mobile, mt-10 for desktop

    <div>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg"> Select an institutional domain </CardTitle>
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
