import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"; // Use Kinde directly
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function RequireAuth(req, body) {
  try {
    // 1. Just get the Kinde session (Don't use requireAuth here!)
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const institution_id = body.institution_id || body.institutionId;
    const numericId = Number(institution_id);
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!institution_id) {
      return NextResponse.json(
        { error: "Institution ID required" },
        { status: 400 },
      );
    }

    // 2. Check if they already exist
    const existing = await db
      .select()
      .from(staffProfiles)
      .where(eq(staffProfiles.kindeUserId, user.id))
      .limit(1);

    if (existing.length > 0) {
      // Optional: Update their request if they chose a different school
      await db
        .update(staffProfiles)
        .set({ institutionId: numericId })
        .where(eq(staffProfiles.kindeUserId, user.id));

      return NextResponse.json({ message: "Request updated" });
    }

    // 3. Insert the new "Pending" profile
    await db.insert(staffProfiles).values({
      kinde_user_id: user.id,
      name: user.given_name || "N/A",
      surname: user.family_name || "N/A",
      email: user.email,
      role: "staff",
      institution_id: Number(institution_id),
      approved: false, // Default to false
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Request access API error:", err);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
