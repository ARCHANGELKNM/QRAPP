import { requireAuth } from "./requireAuth";
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function requireSubAdmin() {
  const auth = await requireAuth();

  const [profile] = await db
    .select()
    .from(staffProfiles)
    .where(eq(staffProfiles.kindeUserId, auth.kindeUserId))
    .limit(1);

  if (!profile || profile.role !== "subadmin") {
    throw new Response("Forbidden", { status: 403 });
  }

  if (!profile.institutionId) {
    throw new Response("Subadmin not linked to institution", { status: 400 });
  }

  return {
    auth,                // id, email, name, surname
    profile,             // staff profile row
    institutionId: profile.institutionId, // INTEGER (important)
  };
}
