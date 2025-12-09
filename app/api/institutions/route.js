import { db } from "@src/db";
import { institutions } from "@src/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const rows = await db.select().from(institutions);
  return Response.json(rows);
}

export async function POST(req) {
  const body = await req.json();
  const { name } = body;

  const result = await db.insert(institutions).values({ name }).returning();

  return Response.json(result[0]);
}
