import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { RequireAuth } from "@/lib/server/auth/requireAuth";

export async function POST(req) {
  try {
    const body = await req.json();
    const auth = await RequireAuth(req, body);

    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { user, existing, institution_id } = auth;

    if (existing) {
      await db.update(staffProfiles)
        .set({ institutionId: institution_id, approved: false }) // ✅ Match schema key: 'institutionId'
        .where(eq(staffProfiles.kindeUserId, user.id)); // ✅ Match schema key: 'kindeUserId'

      return NextResponse.json({ message: "Institution updated. Pending approval." });
    }

    await db.insert(staffProfiles).values({
      kindeUserId: user.id, // ✅ Matches schema
      name: user.given_name || "N/A",
      surname: user.family_name || "N/A",
      email: user.email,
      role: "staff",
      institutionId: institution_id, // ✅ Matches schema
      approved: false,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
