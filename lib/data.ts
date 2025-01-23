// fetchEvents.ts

export async function fetchEvents(page = 1, perPage = 6) {
  try {
    const res = await fetch(`/api/events?page=${page}&perPage=${perPage}`);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Fetch Events Error:", errorData);
      throw new Error(errorData.error || "Failed to fetch events");
    }

    const data = await res.json();
    console.log("Fetched Events Data:", data);

    return data;
  } catch (error) {
    console.error("Error in fetchEvents:", error);
    throw error;
  }
}
