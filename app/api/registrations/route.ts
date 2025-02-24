import { NextResponse } from "next/server";

import { registerUserForEvent } from "@/lib/services/registration-service";

export async function POST(req: Request) {
  try {
    const { userId, eventId } = await req.json();

    const result = await registerUserForEvent(userId, eventId);

    return NextResponse.json(
      { message: "Successfully registered!", ...result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to register for the event.",
      },
      { status: 400 }
    );
  }
}
