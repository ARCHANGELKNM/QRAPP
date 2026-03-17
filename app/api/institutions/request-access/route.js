import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";

import { eq } from "drizzle-orm";
import { RequireAuth } from "@lib/server/auth/requireAuth";

export async function POST(req) {
  try {
    const { user } = await RequireAuth();
    const body = await req.json();

    const institution_id = body.institution_id || body.institutionId;
    // 🛑 STOP: If Kinde didn't return a user, don't try to read user.id
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!institution_id) {
      return NextResponse.json(
        { error: "Institution ID required" },
        { status: 400 },
      );
    }

    const existing = await db
      .select()
      .from(staffProfiles)
      .where(eq(staffProfiles.kindeUserId, user.id))
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

    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
