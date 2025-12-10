import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const institutionId = Number(params.id);
    const { getUser } = getKindeServerSession();
    const authUser = await getUser();
    if (!authUser)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const caller = await db
      .select()
      .from(staffProfiles)
      .where(eq(staffProfiles.kindeUserId, authUser.id))
      .limit(1);

    if (!caller || caller.length === 0 || caller[0].role !== "subadmin" || caller[0].institutionId !== institutionId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { target_kinde_user_id, name, email } = await req.json();
    if (!target_kinde_user_id) return NextResponse.json({ error: "Missing target_kinde_user_id" }, { status: 400 });

    const updated = await db
      .update(staffProfiles)
      .set({ institutionId: institutionId, role: "teacher", name, email })
      .where(eq(staffProfiles.kindeUserId, target_kinde_user_id))
      .returning();

    if (updated && updated.length > 0) return NextResponse.json({ success: true, updated: updated[0] });

    const inserted = await db
      .insert(staffProfiles)
      .values({ kindeUserId: target_kinde_user_id, name, email, role: "teacher", institutionId: institutionId })
      .returning();

    return NextResponse.json({ success: true, inserted: inserted[0] });
  } catch (err) {
    console.error("approve-user error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
