"use client";
import React from "react";
import { useState, useEffect } from "react";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");

        if (res.status === 401) {
          setError("unauthenticated");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError("unknown");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return {
    loading,
    error,
    profile,
    isAuthenticated: !!profile && !error,

    isStaff: profile?.role === "staff",
    isSubadmin: profile?.role === "subadmin",

    isApproved: profile?.approved === true,
    institutionName: profile?.institutionName ?? null,
  };
}
