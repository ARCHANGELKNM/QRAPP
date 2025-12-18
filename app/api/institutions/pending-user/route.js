// app/api/institutions/pending-users/route.js
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq, isNull } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const authUser = await getUser();

  if (!authUser) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const [caller] = await db
    .select()
    .from(staffProfiles)
    .where(eq(staffProfiles.kindeUserId, authUser.id))
    .limit(1);

  if (!caller || caller.role !== "subadmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const pending = await db
    .select()
    .from(staffProfiles)
    .where(isNull(staffProfiles.institutionId));

  return NextResponse.json(pending);
}
