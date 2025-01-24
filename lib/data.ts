

export async function fetchEvents(page = 1, perPage = 6) {
  try {
    const res = await fetch(`/api/events?page=${page}&perPage=${perPage}`);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Fetch Events Error:", errorData);
      throw new Error(errorData.error || "Failed to fetch events");
    }

    const data = await res.json();
    

    return data;
  } catch (error) {
    console.error("Error in fetchEvents:", error);
    throw error;
  }
}

export async function fetchEvent(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL 

  try {
    const res = await fetch(`${baseUrl}/api/events/${id}`);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Fetch Events Error:", errorData);
      throw new Error(errorData.error || "Failed to fetch event");
    }

    const data = await res.json();
    
    console.log(data, '<--fetched event');
    

    return data;
  } catch (error) {
    console.error("Error in fetchEvent:", error);
    throw error;
  }
}

