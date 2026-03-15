"use client";

import React from "react";
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

import { useAccessControl } from "@/hooks/useAccessControl";
import ErrorAdminApproval from "@components/Errors/Admin Approval/Error";
import { ErrorCreateAccount } from "@components/Errors/Create Account/Error";
import LoadingAnimation from "@components/LoadingAnimation/Loading";
import ErrorAdminsOnly from "@components/Errors/Admin Access/Error1";

export default function Dashboard() {
  /* -----------------------------
     HOOKS — ALWAYS TOP LEVEL
  ------------------------------*/
  const access = useAccessControl();
  const [users, setUsers] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    // Only fetch if the hook says access is 'true' AND user is subadmin
    if (access.state !== true || !access.isSubadmin) return;

    async function fetchData() {
      try {
        const res = await fetch("/api/subadmin/dashboard");
        const data = await res.json();
        if (data.users) {
          setUsers(data.users);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoadingData(false);
      }
    }

    fetchData();
  }, [access.state, access.isSubadmin]);


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

  if (access.state === "loading") return <LoadingAnimation />;
  if (access.state === "unauthenticated") return <ErrorCreateAccount />;
  if (access.state === "no-profile" || access.state === "pending") return <ErrorAdminApproval />;
  if (access.state === true && !access.isSubadmin) {
    return <ErrorAdminsOnly />;
  }
  
  /* -----------------------------
     UI (RESPONSIVE & CENTERED)
  ------------------------------*/
  return (
    <div className="min-h-screen ">
      {/* Main container - centered with max-width */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
      
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
