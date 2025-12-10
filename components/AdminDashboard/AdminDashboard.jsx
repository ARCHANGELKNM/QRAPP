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
import { Input } from "@/components/ui/input";

export default function AdminDashboard() {
  const [institutions, setInstitutions] = useState([]);
  const [newInstitutionName, setNewInstitutionName] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin status and load institutions
  useEffect(() => {
    async function loadData() {
      try {
        // Verify admin status
        const profileRes = await fetch("/api/profile");
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData.role !== "admin") {
            setMessage("Access denied: Admin privileges required");
            return;
          }
          setIsAdmin(true);
        }

        // Load institutions
        const instRes = await fetch("/api/institutions");
        if (instRes.ok) {
          const instData = await instRes.json();
          setInstitutions(instData);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setMessage("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function createInstitution(e) {
    e.preventDefault();
    if (!newInstitutionName.trim()) {
      setMessage("Institution name cannot be empty");
      return;
    }

    setCreating(true);
    setMessage("");

    try {
      const res = await fetch("/api/institutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newInstitutionName }),
      });

      if (!res.ok) {
        const error = await res.json();
        setMessage(error.error || "Failed to create institution");
        setCreating(false);
        return;
      }

      const newInst = await res.json();
      setInstitutions([...institutions, newInst]);
      setNewInstitutionName("");
      setMessage("Institution created successfully!");
    } catch (err) {
      console.error("Error creating institution:", err);
      setMessage("Error creating institution");
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex justify-center mt-10">
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{message}</p>
          </CardContent>
          <CardFooter>
            <Link href="/Pages/Settings">
              <Button variant="outline">Back to Settings</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mt-10 mx-auto max-w-4xl px-4">
      {/* Create Institution Card */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Institution</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createInstitution} className="space-y-4">
            <Input
              type="text"
              placeholder="Institution name"
              value={newInstitutionName}
              onChange={(e) => setNewInstitutionName(e.target.value)}
              disabled={creating}
            />
            <Button type="submit" className="w-full" disabled={creating}>
              {creating ? "Creating..." : "Create Institution"}
            </Button>
          </form>
          {message && (
            <p
              className={`text-sm mt-3 ${
                message.includes("Error") || message.includes("Failed")
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Institutions List */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Institutions ({institutions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {institutions.length === 0 ? (
            <p className="text-gray-500 text-sm">No institutions yet</p>
          ) : (
            <ul className="space-y-2">
              {institutions.map((inst) => (
                <li
                  key={inst.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded border"
                >
                  <span>{inst.name}</span>
                  <span className="text-xs text-gray-400">ID: {inst.id}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Back Button */}
      <div className="flex justify-start">
        <Link href="/Pages/Settings">
          <Button variant="outline">Back to Settings</Button>
        </Link>
      </div>
    </div>
  );
}
