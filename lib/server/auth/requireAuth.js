import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";

/**
 * Base authentication helper
 * Uses staffProfile as the authority for approval & institution
 */
export async function requireAuth() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    throw new Error("UNAUTHORIZED");
  }

  const staffProfile = await db.staffProfile.findFirst({
    where: { userId: user.id },
  });

  if (!staffProfile) {
    throw new Error("NO_STAFF_PROFILE");
  }

  if (!staffProfile.approved) {
    throw new Error("NOT_APPROVED");
  }

  return {
    userId: user.id,
    email: user.email ?? null,

    // schema-backed fields
    staffProfileId: staffProfile.id,
    institutionId: staffProfile.institutionId,
    role: staffProfile.role,
    approved: staffProfile.approved,
  };
}
