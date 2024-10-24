import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (data.email === "incorrect@email.com") {
      return NextResponse.json({ message: "Invalid email address!" });
    } else if (data.password === "invalid-password") {
      return NextResponse.json({ message: "Invalid password!" });
    } else {
      return NextResponse.json({
        success: true,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
