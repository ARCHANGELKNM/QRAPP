// app/api/subadmin/dashboard/route.js
import { requireSubAdmin } from "@lib/server/auth/requireSubAdmin"; 
import { db } from "@/lib/db";
import { staffProfiles, qrCodes } from "@/lib/schema";
import { eq, and, sql } from "drizzle-orm";

export async function GET(req) {
  try {
    const user = await requireSubAdmin(req);

    if (!user?.institutionId) {
      return new Response(
        JSON.stringify({ error: "Missing institution" }),
        { status: 400 }
      );
    }

    const institutionId = user.institutionId;

    // Total users
    const totalUsersRes = await db
      .select({ count: sql`count(*)` })
      .from(staffProfiles)
      .where(eq(staffProfiles.institutionId, institutionId));

    // Pending users
    const pendingUsersRes = await db
      .select({ count: sql`count(*)` })
      .from(staffProfiles)
      .where(
        and(
          eq(staffProfiles.institutionId, institutionId),
          eq(staffProfiles.approved, false)
        )
      );

    // Total QR codes
    const totalQRCodesRes = await db
      .select({ count: sql`count(*)` })
      .from(qrCodes)
      .where(eq(qrCodes.institutionId, institutionId));

    return new Response(
      JSON.stringify({
        totalUsers: Number(totalUsersRes[0]?.count ?? 0),
        pendingUsers: Number(pendingUsersRes[0]?.count ?? 0),
        totalQRCodes: Number(totalQRCodesRes[0]?.count ?? 0),
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Dashboard API error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
