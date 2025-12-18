import { db } from "@/lib/db";
import { institutions } from "@/lib/schema";

export async function GET() {
  try {
    const rows = await db.select().from(institutions);
    return Response.json(rows);
  } catch (err) {
    console.error("institutions GET error:", err);
    return Response.json(
      { error: "Failed to fetch institutions" },
      { status: 500 }
    );
  }
}
