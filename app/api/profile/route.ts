import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options"; 
import { getUserRegisteredEvents } from "@/lib/services/user-service";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);

    const { events, totalEvents } = await getUserRegisteredEvents(session.user.id, page, limit);

    return NextResponse.json({ events, totalEvents });
  } catch (error) {
    console.error("Error fetching user events:", error);
    
    return NextResponse.json({ error: "Failed to fetch user events" }, { status: 500 });
  }
}
