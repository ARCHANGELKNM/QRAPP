import { db } from "@src/db";
import { institutions } from "@src/db/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { staffProfiles } from "@/lib/schema";

export async function GET() {
  const rows = await db.select().from(institutions);
  return Response.json(rows);
}

export async function POST(req) {
  try {
    const { getUser } = getKindeServerSession();
    const authUser = await getUser();

    if (!authUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Check if user is admin
    const userProfile = await db
      .select()
      .from(staffProfiles)
      .where(eq(staffProfiles.kindeUserId, authUser.id))
      .limit(1);

    if (
      !userProfile ||
      userProfile.length === 0 ||
      userProfile[0].role !== "admin"
    ) {
      return NextResponse.json(
        { error: "Only admins can create institutions" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name } = body;
    const result = await db.insert(institutions).values({ name }).returning();
    return NextResponse.json(result[0]);
  } catch (err) {
    console.error("Error creating institution:", err);
    return NextResponse.json(
      { error: "Failed to create institution" },
      { status: 500 }
    );
  }
}
