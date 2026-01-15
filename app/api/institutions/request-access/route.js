import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { requireAuth } from "@/lib/server/auth/requireAuth";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const user = await requireAuth();
    const { institution_id } = await req.json();

    if (!institution_id) {
      return NextResponse.json(
        { error: "Institution ID required" },
        { status: 400 }
      );
    }

    const existing = await db
      .select()
      .from(staffProfiles)
      .where(eq(staffProfiles.kinde_user_id, user.id))
      .limit(1);

    if (existing.length) {
      return NextResponse.json({ message: "Request already exists" });
    }

    await db.insert(staffProfiles).values({
      kinde_user_id: user.id,
      name: user.given_name || "N/A",
      surname: user.family_name || "N/A",
      role: "staff",
      institution_id,
      approved: false,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Request access API error:", err);

    return NextResponse.json(
      { error: "Request failed" },
      { status: 500 }
    );
  }
}
