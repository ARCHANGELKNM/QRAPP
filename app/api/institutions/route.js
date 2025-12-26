import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { institutions } from "@/lib/schema";

export async function GET() {
  try {
    const data = await db.select().from(institutions);

    return NextResponse.json(data);
  } catch (err) {
    console.error("Institutions GET error:", err);
    return NextResponse.json(
      { error: "Failed to fetch institutions" },
      { status: 500 }
    );
  }
}
