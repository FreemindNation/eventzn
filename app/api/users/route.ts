import { NextRequest, NextResponse } from "next/server";

import { getUsers } from "@/lib/services/user-service";

export async function GET(req: NextRequest) {
  try {

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const { users, totalUsers } = await getUsers(page, limit);

    return NextResponse.json({ users, totalUsers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
