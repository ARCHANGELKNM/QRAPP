import { db } from "@src/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const authUser = await getUser();

    if (!authUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const profile = await db
      .select()
      .from(staffProfiles)
      .where(eq(staffProfiles.kindeUserId, authUser.id))
      .limit(1);

    return NextResponse.json(profile[0] || {});
  } catch (err) {
    console.error("Error fetching profile:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { getUser } = getKindeServerSession();
    const authUser = await getUser();

    if (!authUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();

    // Update user's profile by kindeUserId
    const updated = await db
      .update(staffProfiles)
      .set(body)
      .where(eq(staffProfiles.kindeUserId, authUser.id))
      .returning();

    return NextResponse.json(updated[0] || { success: true });
  } catch (err) {
    console.error("Error updating profile:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
