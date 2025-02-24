"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { deleteEvent } from "@/lib/services/event-service";



export async function deleteEventAction(eventId: string) {
  try {
    await deleteEvent(eventId);
    
  } catch (error) {
    console.error("Error deleting event:", error);
    
    return { success: false, message: error instanceof Error ? error.message : "Failed to delete event." };
  }
  revalidatePath("/dashboard/events"); 
  redirect("/dashboard/events?deleted=true")
}
