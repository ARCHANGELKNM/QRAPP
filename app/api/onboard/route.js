import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Check if profile exists
  const existing = await db
    .select()
    .from(staffProfiles)
    .where(eq(staffProfiles.kindeUserId, user.id))
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json({ message: "Profile exists" });
  }

  // Create profile
  await db.insert(staffProfiles).values({
    kindeUserId: user.id,
    name: user.given_name ?? "",
    surname: user.family_name ?? "",
    role: "staff",
    approved: false,
  });

  return NextResponse.json({ message: "Profile created" });
}
