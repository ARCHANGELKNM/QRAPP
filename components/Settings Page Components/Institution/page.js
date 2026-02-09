"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function InstitutionSettings() {
  const [institutions, setInstitutions] = useState([]);
  const [institutionId, setInstitutionId] = useState("");
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      // Load institutions
      const instRes = await fetch("/api/institutions");
      if (instRes.ok) {
        setInstitutions(await instRes.json());
      }
      setLoadingInstitutions(false);

      // Load profile
      const profileRes = await fetch("/api/profile");
      if (profileRes.ok) {
        setProfile(await profileRes.json());
      }
    }

    load();
  }, []);

  async function requestAccess() {
    if (!institutionId) return;

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/institutions/request-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        institutionId,
        name: profile?.name ?? "",
        surname: profile?.surname ?? "",
      }),
    });

    if (!res.ok) {
      setMessage("Failed to request access");
      setLoading(false);
      return;
    }

    setMessage("Access request sent. Awaiting approval.");
    setProfile({ ...profile, role: "pending" });
    setLoading(false);
  }

  if (!profile) {
    return <p className="p-6 text-sm text-muted-foreground">Loading…</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and institution access
        </p>
      </div>

      {/* INSTITUTION SECTION */}
      <div className="border rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-lg font-medium">Institution</h2>
          <p className="text-sm text-muted-foreground">
            Select the institution you belong to
          </p>
        </div>

        {/* UNREGISTERED */}
        {profile.status === "unregistered" && (
          <>
            {loadingInstitutions ? (
              <p className="text-sm text-muted-foreground">
                Loading institutions…
              </p>
            ) : (
              <Select onValueChange={setInstitutionId}>
                <SelectTrigger className="max-w-md">
                  <SelectValue placeholder="Select institution" />
                </SelectTrigger>
                <SelectContent>
                  {institutions.map((inst) => (
                    <SelectItem key={inst.id} value={inst.id}>
                      {inst.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Button
              className="mt-2"
              disabled={loading || !institutionId}
              onClick={requestAccess}
            >
              {loading ? "Requesting…" : "Request access"}
            </Button>
          </>
        )}

        {/* PENDING */}
        {profile.role === "pending" && (
          <p className="text-sm text-yellow-600">
            Your request is pending approval by a sub-admin.
          </p>
        )}

        {/* APPROVED */}
        {profile.role !== "pending" &&
          profile.role !== "unregistered" && (
            <p className="text-sm text-green-600">
              You are registered under your institution.
            </p>
          )}

        {message && (
          <p className="text-sm text-muted-foreground">{message}</p>
        )}
      </div>
    </div>
  );
}

