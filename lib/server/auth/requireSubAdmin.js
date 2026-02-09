import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";

/**
 * Ensures the caller is authenticated AND is a subadmin.
 * Returns the staff profile of the subadmin.
 */
export async function requireSubAdmin() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return {
        error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      };
    }

    // Fetch staff profile using Drizzle (no Prisma .findFirst())
    const rows = await db
      .select()
      .from(staffProfiles)
      .where(eq(staffProfiles.kindeUserId, user.id))
      .limit(1);

    const profile = rows[0];

    if (!profile) {
      return {
        error: NextResponse.json(
          { error: "Staff profile not found" },
          { status: 404 },
        ),
      };
    }

    // Ensure role = "subadmin"
    if (profile.role !== "subadmin") {
      return {
        error: NextResponse.json(
          { error: "Forbidden: Not a subadmin" },
          { status: 403 },
        ),
      };
    }

    // SUCCESS → return profile
    return { profile };
  } catch (error) {
    console.error("❌ requireSubAdmin error:", error);
    return {
      error: NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      ),
    };
  }
}
