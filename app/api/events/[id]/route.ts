
import { NextResponse } from "next/server";

import { getEvent, updateEvent } from "@/lib/services/event-service";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  
  try {
    const event = await getEvent(id);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const body = await req.json();
    const updatedEvent = await updateEvent(id, body);

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}