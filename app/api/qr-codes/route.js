import { db } from "@/src/db";
import { qrCodes } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("user_id");

  const rows = await db
    .select()
    .from(qrCodes)
    .where(eq(qrCodes.userId, Number(userId)));

  return Response.json(rows);
}

export async function POST(req) {
  const body = await req.json();
  const { content, user_id, institution_id } = body;

  const result = await db
    .insert(qrCodes)
    .values({
      content,
      userId: user_id,
      institutionId: institution_id,
    })
    .returning();

  return Response.json(result[0]);
}
