import { requireAuth } from "@/lib/server/auth/requireAuth";
import { db } from "@/lib/db";
import { staffProfiles, institutions } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const auth = await requireAuth();

    if (!auth.ok) {
      return Response.json(
        { error: auth.error },
        { status: auth.status }
      );
    }

    const user = auth.user;

    // ✅ CORRECT DRIZZLE USAGE
    const staffProfile = await db.query.staffProfiles.findFirst({
      where: eq(staffProfiles.kindeUserId, user.id),
    });

    if (!staffProfile) {
      return Response.json({
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        staff_profile: null,
      });
    }

    let institution = null;

    if (staffProfile.institutionId) {
      institution = await db.query.institutions.findFirst({
        where: eq(institutions.id, staffProfile.institutionId),
      });
    }

    return Response.json({
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,

      institutionId: staffProfile.institutionId || null,
      institutionName: institution?.name || null,

      staff_profile: {
        role: staffProfile.role,
        approved: staffProfile.approved,
      },
    });
  } catch (error) {
    console.error("❌ Profile API error:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
