  import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { requireSubAdmin } from "@/lib/server/auth/requireSubAdmin";

export async function POST(req) {
  try {
    const subadmin = await requireSubAdmin();
    const { staff_id } = await req.json();

    if (!staff_id) {
      return NextResponse.json(
        { error: "staff_id is required" },
        { status: 400 }
      );
    }

    const result = await db
      .update(staffProfiles)
      .set({ approved: true })
      .where(
        and(
          eq(staffProfiles.id, staff_id),
          eq(staffProfiles.institutionId, subadmin.institutionId),
          eq(staffProfiles.role, "staff")
        )
      );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Staff not found or not allowed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Approve API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
