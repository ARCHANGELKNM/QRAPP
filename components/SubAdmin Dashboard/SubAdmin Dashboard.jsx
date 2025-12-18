"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SubadminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    const res = await fetch("/api/sub-admin/dashboard");
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    loadDashboard().finally(() => setLoading(false));
  }, []);

  async function approveUser(kindeUserId) {
    await fetch(`/api/institutions/${data.institution.id}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target_kinde_user_id: kindeUserId }),
    });
    loadDashboard();
  }

  async function revokeUser(kindeUserId) {
    await fetch(`/api/institutions/${data.institution.id}/revoke`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target_kinde_user_id: kindeUserId }),
    });
    loadDashboard();
  }

  if (loading) return <p className="p-6">Loading…</p>;

  if (!data?.institution) return <p className="p-6">Access denied</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">{data.institution.name}</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            Users: {data.stats.totalUsers}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            QR Codes: {data.stats.totalQrCodes}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            Pending: {data.stats.pendingApprovals}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-medium mb-3">Approved Users</h2>
          {data.users.length === 0 && <p className="text-sm">No users</p>}
          <ul className="space-y-2">
            {data.users.map((u) => (
              <li key={u.kindeUserId} className="flex justify-between">
                <span>{u.email}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => revokeUser(u.kindeUserId)}
                >
                  Revoke
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-medium mb-3">Pending Approvals</h2>
          {data.pending.length === 0 && <p className="text-sm">None</p>}
          <ul className="space-y-2">
            {data.pending.map((u) => (
              <li key={u.kindeUserId} className="flex justify-between">
                <span>{u.email}</span>
                <Button size="sm" onClick={() => approveUser(u.kindeUserId)}>
                  Approve
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
