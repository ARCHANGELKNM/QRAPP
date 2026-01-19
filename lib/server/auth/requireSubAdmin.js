import { requireAuth } from "./requireAuth";

export async function requireSubAdmin() {
  const auth = await requireAuth();

  if (auth.role !== "subadmin") {
    throw new Error("FORBIDDEN");
  }

  return auth;
}
