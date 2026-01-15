import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";

/**
 * Ensures the current user is authenticated
 * and has the required role.
 *
 * @param {string} role - required role ("admin" | "subadmin" | "staff")
 */
export async function requireRole(role) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await db
    .select()
    .from(staffProfiles)
    .where(eq(staffProfiles.kindeUserId, user.id))
    .limit(1);

  if (!profile.length) {
    return Response.json({ error: "Profile not found" }, { status: 403 });
  }

  const staff = profile[0];

  if (staff.role !== role) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  return {
    user,
    staff,
  };
}
