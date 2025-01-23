// app/api/events/route.ts

import { NextResponse } from "next/server";
import { getPaginatedEvents } from "@/lib/services/event-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = 6;

  try {
    const { events, totalEvents } = await getPaginatedEvents(page, perPage);
    console.log("API Route Response:", { events, totalEvents });
    
    return NextResponse.json({ events, totalEvents });
  } catch (error) {
    console.error("Error fetching events in route:", error);
    // Ensure the payload is always an object

    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
