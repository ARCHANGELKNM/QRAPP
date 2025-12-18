// app/api/institutions/[id]/revoke/route.js
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const institutionId = Number(params.id);
  const { getUser } = getKindeServerSession();
  const authUser = await getUser();

  if (!authUser) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Fetch caller
  const [caller] = await db
    .select()
    .from(staffProfiles)
    .where(eq(staffProfiles.kindeUserId, authUser.id))
    .limit(1);

  if (
    !caller ||
    caller.role !== "subadmin" ||
    caller.institutionId !== institutionId
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { target_kinde_user_id } = await req.json();

  if (!target_kinde_user_id) {
    return NextResponse.json({ error: "Missing target user" }, { status: 400 });
  }

  // 🔐 SAFE revoke: institution + role locked
  const updated = await db
    .update(staffProfiles)
    .set({
      institutionId: null,
      role: null,
    })
    .where(
      and(
        eq(staffProfiles.kindeUserId, target_kinde_user_id),
        eq(staffProfiles.institutionId, institutionId),
        eq(staffProfiles.role, "teacher")
      )
    )
    .returning();

  if (updated.length === 0) {
    return NextResponse.json(
      { error: "User not revokable or not found" },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}
