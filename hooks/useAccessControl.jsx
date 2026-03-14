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

if (error === "unauthenticated" || isAuthenticated === false) {
  return { state: "unauthenticated" };
}

  if (!profile) {
    return { state: "no-profile" }; 
  }

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
