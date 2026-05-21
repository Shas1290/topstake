import { NextRequest, NextResponse } from "next/server";
import { sendThankYouEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Send thank-you email (fire-and-forget, don't block the response)
    sendThankYouEmail({ to: email, name, subject, message }).catch((err) =>
      console.error("Background email send failed:", err)
    );

    return NextResponse.json(
      { success: true, message: "Thank you email triggered" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to process contact api:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
