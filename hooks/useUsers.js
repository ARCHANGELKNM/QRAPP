"use client";
import { useEffect, useState } from "react";
import { apiGet, apiPost } from "@/src/lib/api";

export function useUsers(institutionId) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!institutionId) return;
    apiGet(`/api/users?institution_id=${institutionId}`).then(setUsers);
  }, [institutionId]);

  async function addUser(name, surname) {
    const newUser = await apiPost("/api/users", {
      name,
      surname,
      institution_id: institutionId,
    });

    setUsers((prev) => [...prev, newUser]);
  }

  return { users, addUser };
}
