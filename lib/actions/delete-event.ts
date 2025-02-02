"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { deleteEvent } from "@/lib/services/event-service";



export async function deleteEventAction(eventId: string) {
  try {
    await deleteEvent(eventId);

} catch (error) {
    console.error("Error deleting event:", error);
}
revalidatePath("/dashboard"); 
redirect("/dashboard?deleted=true")
}
