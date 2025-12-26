"use client";

import ErrorAPIFailure from "@components/Error handling/DashBoard API failure/Error";
import ErrorNDC from "@components/Error handling/No Dashboard Content/Error";
import LoadingAnimation from "@components/Loading Animation/Loading";
import { useEffect, useState } from "react";

export default function SubAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/dashboard");

      if (!res.ok) {
        console.error("Dashboard API failed:", res.status);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false); // 🔴 THIS was missing before
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  async function approve(targetKindeUserId) {
    await fetch("/api/subadmin/approve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-kinde-user-id": profile.kindeUserId, // ✅ SUBADMIN
      },
      body: JSON.stringify({ targetKindeUserId }),
    });

    loadDashboard();
  }

  // ---------------- UI STATES ----------------

  if (loading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <ErrorAPIFailure />;
  }

  if (!data) {
    return <ErrorNDC />;
  }

  // ---------------- SUCCESS UI ----------------

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Sub-admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Approved Users" value={data.stats.approved} />
        <Stat label="Pending Requests" value={data.stats.pending} />
        <Stat label="Total Users" value={data.stats.totalUsers} />
        <Stat label="QR Codes Generated" value={data.stats.totalQRCodes} />
      </div>

      {/* Pending users */}
      <section>
        <h2 className="text-lg font-medium mb-2">Pending Users</h2>
        {data.pending.length === 0 && (
          <p className="text-sm text-gray-500">No pending requests</p>
        )}

        {data.pending.map((u) => (
          <div
            key={u.kindeUserId}
            className="flex justify-between items-center border-b py-2"
          >
            <span>
              {u.name} {u.surname}
            </span>
            <button
              className="text-sm text-green-600"
              onClick={() => approve(u.kindeUserId)}
            >
              Approve
            </button>
          </div>
        ))}
      </section>

      {/* Approved users */}
      <section>
        <h2 className="text-lg font-medium mb-2">Approved Users</h2>

        {data.approved.map((u) => (
          <div
            key={u.kindeUserId}
            className="flex justify-between items-center border-b py-2"
          >
            <span>
              {u.name} {u.surname}
            </span>
            <button
              className="text-sm text-red-600"
              onClick={() => revoke(u.kindeUserId)}
            >
              Revoke
            </button>
          </div>
        ))}
      </section>
    </div>
  );

  // ---------------- ACTIONS ----------------

  async function revoke(targetKindeUserId) {
    await fetch("/api/subadmin/revoke", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-kinde-user-id": data.kindeUserId,
      },
      body: JSON.stringify({ targetKindeUserId }),
    });

    loadDashboard();
  }
}

// ---------------- SMALL COMPONENT ----------------

function Stat({ label, value }) {
  return (
    <div className="border rounded p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
