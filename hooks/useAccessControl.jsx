"use client";
import React from "react";


import { useProfile } from "./useProfile";

export function useAccessControl() {


  const {
    loading,
    error,
    profile,
    isAuthenticated,
    isStaff,
    isSubadmin,
    isApproved,
  } = useProfile();

  if (loading) {
    return { state: "loading" };
  }

  // 🛑 GUARD 1: Not logged in? Boot them.
  if (error === "unauthenticated" || !isAuthenticated) {
    return { state: "unauthenticated" };
  }

  // 🛑 GUARD 2: No profile in your DB? They haven't requested access yet.
  if (!profile) {
    return { state: "no-profile" };
  }

  // 🛑 GUARD 3: In the DB but 'approved' is false? Keep them out.
  if (profile.approved === false) {
    return { state: "pending" };
  }
  return {
    state: true,
    isStaff,
    isSubadmin,
    role: profile?.role 
  };
}
