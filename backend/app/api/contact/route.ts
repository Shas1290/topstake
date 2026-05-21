import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendThankYouEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required: name, email, subject, message",
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Save to database
    const query = await db.contactQuery.create({
      data: { name, email, subject, message },
    });

    // Send thank-you email (fire-and-forget, don't block the response)
    sendThankYouEmail({ to: email, name, subject, message }).catch((err) =>
      console.error("Background email send failed:", err)
    );

    return NextResponse.json(
      {
        success: true,
        message: "Your query has been submitted successfully",
        id: query.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save contact query:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const queries = await db.contactQuery.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: queries }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch contact queries:", error);

    return NextResponse.json(
      { success: false, error: "Failed to fetch queries" },
      { status: 500 }
    );
  }
}
