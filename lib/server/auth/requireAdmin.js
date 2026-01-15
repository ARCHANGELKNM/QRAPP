import { requireProfile } from "./requireProfile";

export async function requireAdmin() {
  const result = await requireProfile();
  if (!result.ok) return result;

  if (result.profile.role !== "admin") {
    return {
      ok: false,
      status: 403,
      error: "Admin access required",
    };
  }

  return result;
}
