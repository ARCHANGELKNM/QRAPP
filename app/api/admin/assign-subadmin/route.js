import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { getUser } = getKindeServerSession();
    const authUser = await getUser();
    if (!authUser)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const caller = await db
      .select()
      .from(staffProfiles)
      .where(eq(staffProfiles.kindeUserId, authUser.id))
      .limit(1);

    if (!caller || caller.length === 0 || caller[0].role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { kinde_user_id, institution_id, name, email } = body;
    if (!kinde_user_id || !institution_id) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Try to update existing profile
    const updated = await db
      .update(staffProfiles)
      .set({ role: "subadmin", institutionId: institution_id, name, email })
      .where(eq(staffProfiles.kindeUserId, kinde_user_id))
      .returning();

    if (updated && updated.length > 0) {
      return NextResponse.json({ success: true, updated: updated[0] });
    }

    // Insert new sub-admin
    const inserted = await db
      .insert(staffProfiles)
      .values({ kindeUserId: kinde_user_id, name, email, role: "subadmin", institutionId: institution_id })
      .returning();

    return NextResponse.json({ success: true, inserted: inserted[0] });
  } catch (err) {
    console.error("assign-subadmin error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
