// app/api/qr-code/route.js
import { db } from "@lib/db";
import { qrCodes } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { content, institutionName, generatedByName, generatedByKindeId } =
      await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "Missing QR content" },
        { status: 400 }
      );
    }

    const [qr] = await db
      .insert(qrCodes)
      .values({
        content,
        institutionName,
        generatedByName,
        generatedByKindeId,
      })
      .returning();

    return NextResponse.json(qr, { status: 201 });
  } catch (err) {
    console.error("❌ QR API ERROR:", err);
    return NextResponse.json({ error: "Failed to create QR" }, { status: 500 });
  }
}
