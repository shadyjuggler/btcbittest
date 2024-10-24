import { NextResponse, NextRequest } from "next/server";

export async function POST() {
  try {
    return NextResponse.json({
      success: true,
    })
  } catch (e) {
    console.error(e);
  }
}
