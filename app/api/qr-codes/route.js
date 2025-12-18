// app/api/qr-codes/route.js
import { db } from "@/lib/db";
import { qrCodes, staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [profile] = await db
    .select()
    .from(staffProfiles)
    .where(eq(staffProfiles.kindeUserId, user.id))
    .limit(1);

  if (!profile || !profile.institutionId) {
    return NextResponse.json({ error: "User not approved" }, { status: 403 });
  }

  const { content } = await req.json();

  const inserted = await db
    .insert(qrCodes)
    .values({
      content,
      userId: user.id,
      institutionId: profile.institutionId,
    })
    .returning();

  return NextResponse.json(inserted[0]);
}
