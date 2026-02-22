"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function AccessRequestor() {
  const [profile, setProfile] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [institutionId, setInstitutionId] = useState("");

  /* ------------------------------
      LOAD PROFILE
  ------------------------------- */
  async function loadProfile() {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();

      setProfile(data);

      setName(data.name );
      setSurname(data.surname );
      setInstitutionId(data.institutionId );
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

      // Expected format: [{ id: 1, name: "School A" }]
      setInstitutions(data || []);
    } catch (err) {
      console.error("Institutions fetch error:", err);
    }
  }

  useEffect(() => {
    Promise.all([loadProfile(), loadInstitutions()]).then(() =>
      setLoading(false)
    );
  }, []);

  /* ------------------------------
      SAVE CHANGES
  ------------------------------- */
  async function saveAll() {
    try {
      await fetch("/institution/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          surname,
          institutionId: Number(institutionId),
        }),
      });

      loadProfile();
    } catch (error) {
      console.error("Profile update error:", error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6 pb-16">

      {/* INSTITUTION SELECTOR */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Institution</CardTitle>
        </CardHeader>

        <CardContent>
          <Select
            value={institutionId.toString()}
            onValueChange={(value) => setInstitutionId(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your institution" />
            </SelectTrigger>

            <SelectContent>
              {institutions.map((inst) => (
                <SelectItem key={inst.id} value={inst.id.toString()}>
                  {inst.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={saveAll} className="px-6">
          Save Changes
        </Button>
      </div>
    </div>
  );
}