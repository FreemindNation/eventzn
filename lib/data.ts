import { cache } from "react";

export async function fetchFilteredEvents(query = "", category = "", page = 1) {
  try {
    const url = new URL("/api/events", window.location.origin);

    url.searchParams.set("page", page.toString());

    if (query) url.searchParams.set("query", query);
    if (category && category !== "All")
      url.searchParams.set("category", category);

    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching filtered events:", error);

    return { events: [], totalEvents: 0, error: "Failed to fetch events." };
  }
}

export async function fetchEvent(id: string) {

  //Use `NEXT_PUBLIC_BASE_URL` for client-side fetches
  //Use `NEXTAUTH_URL` for server-side fetches
  const baseUrl =
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_BASE_URL 
      : process.env.NEXTAUTH_URL;

  if (!baseUrl) {
    console.error("Base URL is missing! Set NEXT_PUBLIC_BASE_URL or NEXTAUTH_URL in env variables.");
    
    return null;
  }

  try {
    const res = await fetch(`${baseUrl}/api/events/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Fetch Events Error:", errorData);
      throw new Error(errorData.error || "Failed to fetch event");
    }

    const data = await res.json();

    

    return data;
  } catch (error) {
    console.error("Error in fetchEvent:", error);
    throw error;
  }
}
