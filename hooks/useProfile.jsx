import React from "react";
("use client");

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
    isAuthenticated: !error,
    isStaff: profile?.approved === true,
    isSubadmin: profile?.role === "subadmin",
    institutionName: profile?.institutionName ?? null,
  };
}
