import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth/requireAuth";
import { getStaffProfile } from "@/lib/server/auth/StaffProfile";

export async function GET() {
  try {
    const user = await requireAuth();

    const profile = await getStaffProfile(user.id);

    return NextResponse.json({
      user,
      profile, // can be null — frontend handles this
    });
  } catch (err) {
    console.error("Profile API error:", err);

    return NextResponse.json(
      { error: err.message || "Unauthorized" },
      { status: 401 }
    );
  }
}
