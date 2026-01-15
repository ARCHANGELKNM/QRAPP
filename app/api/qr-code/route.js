import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth/requireAuth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    // 1️⃣ AUTH
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2️⃣ LOAD PROFILE (SINGLE SOURCE OF TRUTH)
    const profileRes = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/profile`,
      {
        headers: {
          cookie: req.headers.get("cookie") || "",
        },
      }
    );

    if (!profileRes.ok) {
      return NextResponse.json(
        { error: "Failed to load profile" },
        { status: 403 }
      );
    }

    const profile = await profileRes.json();

    // 3️⃣ APPROVAL CHECK
    if (!profile.approved || !profile.institutionId) {
      return NextResponse.json(
        { error: "You are not approved to generate QR codes" },
        { status: 403 }
      );
    }

    // 4️⃣ BODY
    const body = await req.json();
    const content = body.content || body.data;

    if (!content) {
      return NextResponse.json(
        { error: "QR content is required" },
        { status: 400 }
      );
    }

    // 5️⃣ SAVE QR LOG (NON-BLOCKING FOR DEMO)
    await db.qrCode.create({
      data: {
        content,
        generatedById: profile.id,
        institutionId: profile.institutionId,
        institutionName: profile.institutionName,
      },
    });

    // 6️⃣ SUCCESS
    return NextResponse.json({
      success: true,
      message: "QR code generated",
    });
  } catch (error) {
    console.error("QR API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
