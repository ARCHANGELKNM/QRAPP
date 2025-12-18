// app/api/institutions/request/route.js
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { institutionId, name, surname } = await req.json();

  if (!institutionId || !name || !surname) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Prevent duplicates
  const existing = await db
    .select()
    .from(staffProfiles)
    .where(eq(staffProfiles.kindeUserId, user.id))
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json(
      { error: "Access already requested or granted" },
      { status: 409 }
    );
  }

  const [created] = await db
    .insert(staffProfiles)
    .values({
      kindeUserId: user.id,
      email: user.email,
      name,
      surname,
      role: "pending",
      institutionId,
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
