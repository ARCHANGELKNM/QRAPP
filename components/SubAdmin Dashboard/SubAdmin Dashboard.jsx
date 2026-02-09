"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ErrorAdminApproval from "@components/Error handling/Admin Approval/Error";
import { ErrorCreateAccount } from "@components/Error handling/Create Account/Error";
import LoadingAnimation from "@components/Loading Animation/Loading";

export default function Dashboard() {
  /* -----------------------------
     HOOKS — ALWAYS TOP LEVEL
  ------------------------------*/
  const [accessState, setAccessState] = useState("loading");
  const [profile, setProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  /* -----------------------------
     CHECK ACCESS
  ------------------------------*/
  useEffect(() => {
    async function check() {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();

        if (!res.ok) {
          setAccessState("unauthenticated");
          return;
        }

        setProfile(data);

        // Staff or Subadmin
        if (data.approved === true) {
          setAccessState(true);
          return;
        }

        // Not approved yet
        if (data.approved === false) {
          setAccessState("pending");
          return;
        }
      } catch (err) {
        setAccessState("unauthenticated");
      }
    }

    check();
  }, []);

  /* -----------------------------
     LOAD USERS ONCE APPROVED
  ------------------------------*/
  useEffect(() => {
    if (accessState !== true) return;

    async function fetchData() {
      try {
        const res = await fetch("/api/subadmin/dashboard");
        const data = await res.json();

        if (data.users) {
          setUsers(data.users);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }

      setLoadingData(false);
    }

    fetchData();
  }, [accessState]);

  /* -----------------------------
     ACTION HANDLER
  ------------------------------*/
  async function handleAction(id, action) {
    const url =
      action === "approve" ? "/api/subadmin/approve" : "/api/subadmin/revoke";

    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ staffProfileId: id }),
    });

    // refresh table
    const res = await fetch("/api/subadmin/dashboard");
    const data = await res.json();
    setUsers(data.users || []);
  }

  /* -----------------------------
     ACCESS STATE HANDLING
  ------------------------------*/
  if (accessState === "loading") {
    return <LoadingAnimation />;
  }

  if (accessState === "unauthenticated") {
    return <ErrorCreateAccount />;
  }

  if (accessState === "pending") {
    return <ErrorAdminApproval />;
  }

  if (accessState !== true) {
    return <ErrorAdminApproval />;
  }

  /* -----------------------------
     UI (RESPONSIVE & CENTERED)
  ------------------------------*/
  return (
    <div className="min-h-screen ">
      {/* Main container - centered with max-width */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Subadmin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage staff approvals and access</p>
          </div>

          {/* Table Container - Responsive */}
          <div className=" overflow-hidden">
            {loadingData ? (
              <div className="flex items-center justify-center p-8">
                <LoadingAnimation />
              </div>
            ) : users.length === 0 ? (
              <div className="flex items-center justify-center p-8">
                <p className="text-muted-foreground">No users to manage </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Surname</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">{u.name || "—"}</TableCell>
                        <TableCell>{u.surname || "—"}</TableCell>

                        <TableCell>
                          {u.approved ? (
                            <Badge className="bg-green-600 hover:bg-green-700">Approved</Badge>
                          ) : (
                            <Badge variant="destructive">Pending</Badge>
                          )}
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end flex-wrap">
                            {u.approved ? (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleAction(u.id, "revoke")}
                              >
                                Revoke
                              </Button>
                            ) : (
                              <Button 
                                size="sm"
                                onClick={() => handleAction(u.id, "approve")}
                              >
                                Approve
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
