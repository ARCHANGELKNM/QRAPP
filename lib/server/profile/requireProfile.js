import { requireUser } from "./auth/requireUser";
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/db/schema";

export async function requireProfile() {
  const auth = await requireUser();
  if (!auth.ok) return auth;

  const profile = await db
    .select()
    .from(staffProfiles)
    .where(staffProfiles.kindeUserId.eq(auth.user.id))
    .limit(1);

  if (!profile.length) {
    return {
      ok: false,
      status: 404,
      error: "Profile not found",
    };
  }

  return {
    ok: true,
    user: auth.user,
    profile: profile[0],
  };
}
