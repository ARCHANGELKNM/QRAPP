"use client";

import {Loader2 , Lock} from 'lucide-react';
import { useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAccessControl } from '@hooks/useAccessControl';

export default function AccessRequestor() {

  const access = useAccessControl();
  const { profile, state, isApproved } = access;  
  const { isAuthenticated, user, isLoading: authLoading } = useKindeBrowserClient();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
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
  // 1. Guard check
  if (!user?.id) {
    toast({
      variant: "destructive",
      title: "Authentication Error",
      description: "Please log in to submit a request.",
    });
    return;
  }

  setIsSaving(true); // 🔄 Start Loading

  try {
    // ✅ Use the parsed 'res' properly
    const res = await fetch("/api/institutions/request-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // ✅ We only send the institution_id; the server gets the rest from Kinde
      body: JSON.stringify({
        institution_id: Number(newInstitutionId),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ SUCCESS / UPDATE TOAST
      toast({
        title: data.message || "Request Sent Successfully",
        description: "Your request is now in our database. Please wait for an admin to approve your access.",
      });
    } else {
      // ❌ API ERROR (401, 400, etc.)
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: data.error || "We couldn't save your request. Please try again.",
      });
    }
  } catch (error) {
    // ❌ NETWORK ERROR
    console.error("Save error:", error);
    toast({
      variant: "destructive",
      title: "Connection Error",
      description: "Check your internet and try again.",
    });
  } finally {
    setIsSaving(false); // ⏹️ Stop Loading
  }
}

  if (!isAuthenticated || authLoading) return null;

return (
  // ✅ Responsive padding: p-4 for mobile, mt-10 for desktop

  <div>
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">
          {" "}
          Select an institutional domain{" "}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Select
          disabled={isSaving || state === true}
          value={institutionId ? institutionId.toString() : ""}
          onValueChange={async (value) => {
            setInstitutionId(value);
            await saveAll(value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your institution" />
            {isSaving && (
              <Loader2 className="absolute right-3 h-4 w-4 animate-spin text-muted-foreground" />
            )}

            {state === true && (
              <Lock className="absolute right-3 h-4 w-4 text-muted-foreground opacity-50" />
            )}
          </SelectTrigger>

          <SelectContent>
            {(Array.isArray(institutions) ? institutions : []).map((inst) => (
              <SelectItem key={inst.id} value={inst.id.toString()}>
                {inst.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="text-xs text-muted-foreground mt-2">
          {state === true
            ? "Your institution is locked. Contact an admin to change it."
            : "Select your school to request access."}
        </p>
      </CardContent>
    </Card>
  </div>
);
}
