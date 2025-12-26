import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { institutionId } = await req.json();

    if (!institutionId) {
      return NextResponse.json(
        { error: "Missing institutionId" },
        { status: 400 }
      );
    }

    // Prevent duplicate pending / approved profiles
    const existing = await db
      .select()
      .from(staffProfiles)
      .where(eq(staffProfiles.kindeUserId, user.id))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Access request already exists" },
        { status: 409 }
      );
    }

    // ✅ CREATE FULL PENDING PROFILE
    await db.insert(staffProfiles).values({
      kindeUserId: user.id,
      name: user.given_name ?? "Unknown",
      surname: user.family_name ?? "User",
      email: user.email ?? null,
      role: "pending",
      institutionId,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("request-access error:", err);
    return NextResponse.json(
      { error: "Failed to request access" },
      { status: 500 }
    );
  }
}
