import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { db } from "@/lib/db";
import { staffProfiles, institutions } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* 🔒 Existing staff profile fetch */
    const [result] = await db
      .select({
        staffProfile: staffProfiles,
        institutionName: institutions.name,
      })
      .from(staffProfiles)
      .leftJoin(institutions, eq(staffProfiles.institutionId, institutions.id))
      .where(eq(staffProfiles.kindeUserId, user.id))
      .limit(1);

    if (!result) {
      return NextResponse.json(
        { error: "Staff profile not found" },
        { status: 404 },
      );
    }

    const { staffProfile, institutionName } = result;

    return NextResponse.json({
      /* ✅ NOTHING REMOVED */
      ...staffProfile,

      /* ✅ EXISTING FIELDS (UNCHANGED NAMES) */
      kindeId: user.id,
      institutionName: institutionName ?? null,
      approved: staffProfile.approved ?? false,

      /* ✅ PREVIOUSLY REQUESTED ADDITIONS */
      name: user.given_name ?? "",
      surname: user.family_name ?? "",
    });
  } catch (error) {
    console.error("❌ Profile API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
