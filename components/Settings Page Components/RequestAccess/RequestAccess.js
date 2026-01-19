"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function RequestAccess() {
  const [profile, setProfile] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const [institutionId, setInstitutionId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const profileRes = await fetch("/api/profile");
      const profileData = await profileRes.json();
      setProfile(profileData);

      const instRes = await fetch("/api/institutions");
      const instData = await instRes.json();
      setInstitutions(instData);
    }

    load();
  }, []);

  async function requestAccess() {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/institutions/request-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ institutionId }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Request failed");
    } else {
      setMessage("Request sent. Await approval.");
      setProfile({ ...profile, role: "pending" });
    }

    setLoading(false);
  }

  if (!profile) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Institution Access</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {profile.role === "guest" && (
            <p>Please sign in to request institution access.</p>
          )}

          {profile.role === "pending" && (
            <p className="text-yellow-600">Your request is pending approval.</p>
          )}

          {profile.role === "teacher" && (
            <p className="text-green-600">
              Approved institution ID: {profile.institutionId}
            </p>
          )}

          {(profile.role === "guest" || profile.role === "pending") && (
            <>
              <Select value={institutionId} onValueChange={setInstitutionId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select institution" />
                </SelectTrigger>
                <SelectContent>
                  {institutions.map((inst) => (
                    <SelectItem key={inst.id} value={String(inst.id)}>
                      {inst.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                disabled={!institutionId || loading}
                onClick={requestAccess}
              >
                {loading ? "Sending..." : "Request Access"}
              </Button>
            </>
          )}

          {message && <p className="text-sm">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
