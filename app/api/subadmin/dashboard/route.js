import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { isNull } from "drizzle-orm";

export async function GET() {
  try {
    const pendingStaff = await db
      .select({
        id: staffProfiles.id,
        name: staffProfiles.name,
        surname: staffProfiles.surname,
        role: staffProfiles.role,
        createdAt: staffProfiles.created_at,
      })
      .from(staffProfiles)
      .where(isNull(staffProfiles.institution_id));

    return NextResponse.json(pendingStaff);
  } catch (error) {
    console.error("❌ Dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}
