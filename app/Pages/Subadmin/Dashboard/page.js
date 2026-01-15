"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Clock } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState({
    totalUsers:0,
    pendingUser:0,
    pending:[],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const res = await fetch("/api/subadmin/dashboard");
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to load dashboard");
      }
      setData(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function approveUser(id) {
    await fetch("/api/subadmin/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ staffProfileId: id }),
    });
    fetchDashboard();
  }

  async function revokeUser(id) {
    await fetch("/api/subadmin/revoke", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ staffProfileId: id }),
    });
    fetchDashboard();
  }

  return (
    <div className="px-4 md:px-6 lg:px-8 pt-24 pb-12 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Institution overview and approvals
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard
          title="Total Users"
          value={data?.totalUsers}
          icon={<Users />}
          loading={loading}
        />
        <StatCard
          title="Pending Approvals"
          value={data?.pendingUsers}
          icon={<Clock />}
          loading={loading}
        />
      </div>

      {/* Pending Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending User Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-32 w-full" />
          ) : data.pending.length === 0 ? (
            <p className="text-muted-foreground">No pending users</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.pending.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {user.name} {user.surname}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" onClick={() => approveUser(user.id)}>
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => revokeUser(user.id)}
                      >
                        Revoke
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, loading, icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <div className="text-3xl font-bold">{Number(value ?? 0)}</div>
        )}
      </CardContent>
    </Card>
  );
}
