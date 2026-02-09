import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { db } from "@/lib/db";
import { institutions } from "@/lib/schema";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await db
      .select()
      .from(institutions);

    return NextResponse.json({ institutions: rows });
  } catch (error) {
    console.error("❌ Institutions API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
