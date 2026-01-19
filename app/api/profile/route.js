import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json(null, { status: 401 });
    }

    // 🔹 Fetch staff profile using Kinde ID
    const staffProfile = await db
      .select()
      .from(staffProfiles)
      .where(eq(staffProfiles.kindeUserId, user.id))
      .limit(1);

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.given_name || "",
      surname: user.family_name || "",
      staff_profile: staffProfile[0] || null,
      approved: staffProfile[0]?.approved ?? false,
      institutionId: staffProfile[0]?.institutionId ?? null,
    });
  } catch (error) {
    console.error("❌ Profile API error:", error);
    return NextResponse.json(
      { error: "Failed to load profile" },
      { status: 500 },
    );
  }
}
