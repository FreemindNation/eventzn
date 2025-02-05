import { NextResponse } from "next/server";

import { createEvent, getFilteredEvents } from "@/lib/services/event-service";

export async function GET(request: Request) {

  try {
    const { searchParams } = new URL(request.url);
    const pageStr = searchParams.get("page");
    const page = pageStr && !isNaN(parseInt(pageStr, 10)) ? parseInt(pageStr, 10) : 1;    
    const perPage = 6;
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || "";

    const result = await getFilteredEvents(page, perPage, query, category);
    
    if (!result || !result.events) {
      console.error("Unexpected result structure:", result);

      return NextResponse.json({ error: "Invalid events data" }, { status: 500 });
    }

   
    return NextResponse.json(result);
  } catch (error) {
    console.error("Detailed error fetching events:", error);

    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const eventData = Object.fromEntries(formData) as Record<string, string>;

    
    const parsedEvent = {
      ...eventData,
      isFree: eventData.isFree === "true",
      ticketPrice: eventData.isFree === "true" ? 0 : Number(eventData.ticketPrice),
      startTime: new Date(eventData.startTime),
      endTime: new Date(eventData.endTime),
    };

    const newEvent = await createEvent(parsedEvent);

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error in event creation API:", error);

    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

