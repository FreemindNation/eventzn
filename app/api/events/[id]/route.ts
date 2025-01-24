
import { NextResponse } from "next/server";

import { getEvent } from "@/lib/services/event-service";

export async function GET(request: Request, { params }: { params: { id: string } }) {
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
