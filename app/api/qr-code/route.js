import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { qrCodes } from "@/lib/schema";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      content,
      generatedByKindeId,
      generatedByName,
      institutionName,
    } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Missing content" },
        { status: 400 }
      );
    }

    await db.insert(qrCodes).values({
      content,
      generatedByKindeId: generatedByKindeId ?? null,
      generatedByName: generatedByName ?? null,
      institutionName: institutionName ?? null,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("QR API error:", err);
    return NextResponse.json(
      { error: "Failed to log QR code" },
      { status: 500 }
    );
  }
}
