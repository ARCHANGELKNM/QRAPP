import { db } from "@/src/db/db";
import { qrCodes } from "@/src/db/schema";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userName, userSurname, institution, content } = body;

    const result = await db
      .insert(qrCodes)
      .values({
        userName,
        userSurname,
        institution,
        content,
      })
      .returning();

    return Response.json(result[0], { status: 201 });
  } catch (err) {
    console.error("❌ QR POST error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await db.select().from(qrCodes);
    return Response.json(result);
  } catch (err) {
    console.error("❌ QR GET error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
