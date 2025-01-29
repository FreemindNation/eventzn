import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserRegistrations } from "@/lib/services/user-service";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const events = await getUserRegistrations(session.user.id);

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user events" }, { status: 500 });
  }
}
