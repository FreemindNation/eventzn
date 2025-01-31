import { NextResponse } from "next/server";

import { getFilteredEvents } from "@/lib/services/event-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = 6;
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  try {
    const { events, totalEvents } = await getFilteredEvents(page, perPage, query, category);

    if (!events) {
      console.warn("getFilteredEvents returned null, returning empty response.");
      
      return NextResponse.json({ events: [], totalEvents: 0 });
    }

    return NextResponse.json({ events, totalEvents });
  } catch (error) {
    console.error("Error fetching events in route:", error);
    
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
