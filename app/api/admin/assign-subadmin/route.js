// app/api/admin/assign-subadmin/route.js
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { getUser } = getKindeServerSession();
  const authUser = await getUser();

  if (!authUser) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const [caller] = await db
    .select()
    .from(staffProfiles)
    .where(eq(staffProfiles.kindeUserId, authUser.id))
    .limit(1);

  if (!caller || caller.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { kinde_user_id, institution_id, name, email } = await req.json();

  if (!kinde_user_id || !institution_id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const updated = await db
    .update(staffProfiles)
    .set({
      role: "subadmin",
      institutionId: institution_id,
      name,
      email,
    })
    .where(eq(staffProfiles.kindeUserId, kinde_user_id))
    .returning();

  if (updated.length > 0) {
    return NextResponse.json({ success: true, user: updated[0] });
  }

  const inserted = await db
    .insert(staffProfiles)
    .values({
      kindeUserId: kinde_user_id,
      role: "subadmin",
      institutionId: institution_id,
      name,
      email,
    })
    .returning();

  return NextResponse.json({ success: true, user: inserted[0] });
}
