import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { requireSubAdmin } from "@/lib/server/auth/requireSubAdmin";

export async function POST(req) {
  const body = await req.json();
  const { staffProfileId } = body;

  const { profile, error } = await requireSubAdmin();
  if (error) return error;

  await db
    .update(staffProfiles)
    .set({ approved: false })
    .where(eq(staffProfiles.id, staffProfileId));

  return NextResponse.json({ success: true });
}
