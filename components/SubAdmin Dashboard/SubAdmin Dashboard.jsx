"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import LoadingAnimation from "@components/Loading Animation/Loading";

/* ===============================
   DASHBOARD COMPONENT
================================ */
export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
  });
  const [loading, setLoading] = useState(true);

  /* -------------------------------
     FETCH DASHBOARD DATA
  -------------------------------- */
  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/subadmin/dashboard");
      if (!res.ok) throw new Error("Failed to fetch dashboard");

      const data = await res.json();

      const usersList = data.users || [];

      setUsers(usersList);

      setStats({
        total: usersList.length,
        pending: usersList.filter(u => u.approved === false ).length,
        approved: usersList.filter(u => u.approved === true).length,
      });
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  /* -------------------------------
     ACTIONS
  -------------------------------- */
  const approveUser = async (userId) => {
    await fetch("/api/subadmin/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    fetchDashboard();
  };

  const revokeUser = async (userId) => {
    await fetch("/api/subadmin/revoke", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    fetchDashboard();
  };

  if (loading) {
    return (<LoadingAnimation/> );
  }

  /* ===============================
     RENDER
================================ */
  return (
    <div className="space-y-8">
      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Users" value={stats.total} />
        <StatCard label="Pending Approval" value={stats.pending} />
        <StatCard label="Approved Users" value={stats.approved} />
      </div>

      {/* ===== USERS TABLE ===== */}
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Surname</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-sm">
                  No users found
                </TableCell>
              </TableRow>
            )}

            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.surname}</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      user.approved === true
                        ? "success"
                        : "secondary"
                    }
                  >
                    {user.approved}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  {user.approved === false && (
                    <Button
                      size="sm"
                      onClick={() => approveUser(user.id)}
                    >
                      Approve
                    </Button>
                  )}

                  {user.approved === true && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => revokeUser(user.id)}
                    >
                      Revoke
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/* ===============================
   SMALL STAT CARD
================================ */
function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
