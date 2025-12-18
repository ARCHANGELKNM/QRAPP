// app/api/sub-admin/dashboard/route.js
import { db } from "@/lib/db";
import { staffProfiles, institutions, qrCodes } from "@/lib/schema";
import { eq, isNull } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const authUser = await getUser();

  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [subadmin] = await db
    .select()
    .from(staffProfiles)
    .where(eq(staffProfiles.kindeUserId, authUser.id))
    .limit(1);

  if (!subadmin || subadmin.role !== "subadmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const institutionId = subadmin.institutionId;

  const [institution] = await db
    .select()
    .from(institutions)
    .where(eq(institutions.id, institutionId))
    .limit(1);

  const approvedUsers = await db
    .select()
    .from(staffProfiles)
    .where(eq(staffProfiles.institutionId, institutionId));

  const pendingUsers = await db
    .select()
    .from(staffProfiles)
    .where(isNull(staffProfiles.institutionId));

  const qrCount = await db
    .select()
    .from(qrCodes)
    .where(eq(qrCodes.institutionId, institutionId));

  return NextResponse.json({
    institution,
    stats: {
      totalUsers: approvedUsers.length,
      totalQrCodes: qrCount.length,
      pendingApprovals: pendingUsers.length,
    },
    users: approvedUsers,
    pending: pendingUsers,
  });
}
