// app/api/sub-admin/revoke/route.js
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const kindeUserId = req.headers.get("x-kinde-user-id");
  const { targetKindeUserId } = await req.json();

  if (!kindeUserId || !targetKindeUserId) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const [subadmin] = await db
    .select()
    .from(staffProfiles)
    .where(eq(staffProfiles.kindeUserId, kindeUserId))
    .limit(1);

  if (!subadmin || subadmin.role !== "subadmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await db
    .update(staffProfiles)
    .set({
      role: "pending",
      institutionId: null,
    })
    .where(eq(staffProfiles.kindeUserId, targetKindeUserId));

  return NextResponse.json({ success: true });
}
