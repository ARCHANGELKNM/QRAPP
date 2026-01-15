import { NextResponse } from "next/server";

export function apiError(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function apiSuccess(data, status = 200) {
  return NextResponse.json(data, { status });
}
