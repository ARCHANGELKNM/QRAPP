"use client";

import { useEffect, useState } from "react";

export default function SubAdminDashboard() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ─────────────────────────────────────────────
  // Load dashboard data (NO redirects)
  // ─────────────────────────────────────────────
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await fetch("/api/subadmin/dashboard");

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data?.error || "Failed to load dashboard");
        }

        const data = await res.json();
        setPending(data.pending || []);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // ─────────────────────────────────────────────
  // Approve handler
  // ─────────────────────────────────────────────
  const handleApprove = async (staffId) => {
    try {
      const res = await fetch("/api/subadmin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staff_id: staffId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || "Approve failed");
      }

      // Optimistic UI update
      setPending((prev) => prev.filter((p) => p.id !== staffId));
    } catch (err) {
      alert(err.message);
    }
  };

  // ─────────────────────────────────────────────
  // Revoke handler
  // ─────────────────────────────────────────────
  const handleRevoke = async (staffId) => {
    try {
      const res = await fetch("/api/subadmin/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staff_id: staffId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || "Revoke failed");
      }

      setPending((prev) => prev.filter((p) => p.id !== staffId));
    } catch (err) {
      alert(err.message);
    }
  };

  // ─────────────────────────────────────────────
  // UI STATES
  // ─────────────────────────────────────────────
  if (loading) {
    return <p className="p-6">Loading dashboard…</p>;
  }

  if (error) {
    return (
      <div className="p-6 rounded-md bg-red-50 text-red-700">
        <p className="font-semibold">Dashboard error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Pending Staff Requests</h1>

      {pending.length === 0 && (
        <p className="text-muted-foreground">
          No pending requests for your institution.
        </p>
      )}

      {pending.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div>
            <p className="font-medium">
              {user.name} {user.surname}
            </p>
            <p className="text-sm text-muted-foreground">
              Requested on {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleApprove(user.id)}
              className="rounded bg-green-600 px-3 py-1 text-white"
            >
              Approve
            </button>

            <button
              onClick={() => handleRevoke(user.id)}
              className="rounded bg-red-600 px-3 py-1 text-white"
            >
              Revoke
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
