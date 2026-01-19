import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth/requireAuth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const user = await requireAuth();
    const body = await req.json();

    const staffProfile = await db.staffProfile.findFirst({
      where: { userId: user.id },
    });

    if (!staffProfile || staffProfile.approved !== true) {
      return new NextResponse("Not approved", { status: 403 });
    }

    if (!body?.content) {
      return new NextResponse("Missing QR content", { status: 400 });
    }

    await db.qrCode.create({
      data: {
        content: body.content,
        institutionId: staffProfile.institutionId,
        generatedByUserId: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ QR API error:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
