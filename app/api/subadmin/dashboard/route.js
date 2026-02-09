import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* 🔍 Fetch THIS user's profile */
    const [subadminProfile] = await db
      .select()
      .from(staffProfiles)
      .where(eq(staffProfiles.kindeUserId, user.id))
      .limit(1);

    if (!subadminProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    /* 👉 IMPORTANT: Use this field */
    const institutionId = subadminProfile.institutionId;

    if (!institutionId) {
      return NextResponse.json(
        { error: "Subadmin has no institution assigned" },
        { status: 400 },
      );
    }

    /* 📌 Fetch ALL users tied to this subadmin's institution */
    const allProfiles = await db
      .select()
      .from(staffProfiles)
      .where(eq(staffProfiles.institutionId, institutionId));

    return NextResponse.json({
      institutionId,
      users: allProfiles,
    });
  } catch (error) {
    console.error("❌ Dashboard API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
