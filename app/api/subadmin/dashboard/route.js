import { NextResponse } from "next/server";
import { requireSubAdmin } from "@/lib/server/auth/requireSubAdmin";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const subadmin = await requireSubAdmin();

    const pendingUsers = await db.staffProfile.findMany({
      where: {
        institutionId: subadmin.institutionId,
        approved: false,
      },
    });

    const approvedUsers = await db.staffProfile.findMany({
      where: {
        institutionId: subadmin.institutionId,
        approved: true,
      },
    });

    return NextResponse.json({
      stats: {
        totalUsers: approvedUsers.length,
        pendingUsers: pendingUsers.length,
      },
      pendingUsers,
      approvedUsers,
    });
  } catch (err) {
    return new NextResponse("Forbidden", { status: 403 });
  }
}
