// app/api/profile/route.js

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { staffProfiles, institutions } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [profile] = await db
      .select({
        id: staffProfiles.id,
        kindeUserId: staffProfiles.kindeUserId,
        name: staffProfiles.name,
        surname: staffProfiles.surname,
        role: staffProfiles.role,
        institutionId: staffProfiles.institutionId,
        institutionName: institutions.name, // ✅ IMPORTANT
      })
      .from(staffProfiles)
      .leftJoin(
        institutions,
        eq(staffProfiles.institutionId, institutions.id)
      )
      .where(eq(staffProfiles.kindeUserId, user.id));

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (err) {
    console.error("PROFILE API ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

