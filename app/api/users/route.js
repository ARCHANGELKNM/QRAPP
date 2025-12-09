import { db } from "@src/db";
import { users } from "@src/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const inst = searchParams.get("institution_id");

  const rows = await db
    .select()
    .from(users)
    .where(eq(users.institutionId, Number(inst)));

  return Response.json(rows);
}

export async function POST(req) {
  const body = await req.json();
  const { name, surname, email, institution_id } = body;

  const result = await db
    .insert(users)
    .values({
      name,
      surname,
      email,
      institutionId: institution_id,
    })
    .returning();

  return Response.json(result[0]);
}
