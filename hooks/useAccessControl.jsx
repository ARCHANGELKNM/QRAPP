import React from "react";
("use client");

import { useProfile } from "./useProfile";

export function useAccessControl() {
  const { loading, error, profile, isAuthenticated, isStaff, isSubadmin } =
    useProfile();

  if (loading) {
    return { state: "loading" };
  }

  if (error === "unauthenticated") {
    return { state: "unauthenticated" }; // → ErrorCreateAccount
  }

  if (!profile) {
    return { state: "no-profile" }; // → ErrorAdminApproval
  }

  if (profile.approved === false) {
    return { state: "pending" }; // → ErrorAdminApproval
  }

  return {
    state: true,
    isStaff,
    isSubadmin,
  };
}
