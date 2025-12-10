"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function InstitutionSelector() {
  const [institution, setInstitution] = useState("");
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Load institutions list and user profile on mount
  useEffect(() => {
    async function loadData() {
      try {
        // Fetch live institutions list
        setLoadingInstitutions(true);
        const instRes = await fetch("/api/institutions");
        if (instRes.ok) {
          const instData = await instRes.json();
          setInstitutions(instData);
        } else {
          setMessage("Failed to load institutions list");
        }
      } catch (err) {
        console.error("Error loading institutions:", err);
        setMessage("Error loading institutions");
      } finally {
        setLoadingInstitutions(false);
      }

      try {
        // Fetch current user profile
        const profileRes = await fetch("/api/profile");
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setInstitution(profileData.institution || "");
          setIsAdmin(profileData.role === "admin");
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    }

    loadData();
  }, []);

  async function saveInstitution() {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ institution }),
      });

      if (!res.ok) {
        setMessage("Failed to save settings. Are you logged in?");
        setLoading(false);
        return;
      }

      setMessage("Institution saved successfully!");
    } catch (err) {
      console.error("Error saving institution:", err);
      setMessage("Error saving institution");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Select Your Institution</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {loadingInstitutions ? (
            <p className="text-sm text-gray-500">Loading institutions...</p>
          ) : (
            <Select value={institution} onValueChange={setInstitution}>
              <SelectTrigger>
                <SelectValue placeholder="Select institution" />
              </SelectTrigger>

              <SelectContent>
                {institutions.map((inst) => (
                  <SelectItem
                    key={inst.id || inst.name}
                    value={inst.name || inst}
                  >
                    {inst.name || inst}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Button
            className="w-full"
            onClick={saveInstitution}
            disabled={loading || !institution || loadingInstitutions}
          >
            {loading ? "Saving..." : "Save Institution"}
          </Button>
        </CardContent>
        {message && (
          <CardFooter>
            <p
              className={`text-sm ${
                message.includes("Error") || message.includes("Failed")
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {message}
            </p>
          </CardFooter>
        )}
      </Card>

      {isAdmin && (
        <div className="mt-6">
          <Link href="/Pages/Settings/AdminDashboard">
            <Button variant="outline">Admin Panel - Manage Institutions</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
