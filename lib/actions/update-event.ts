"use server";

import { revalidatePath } from "next/cache";

import { updateEvent } from "@/lib/services/event-service";
import { EventSchema } from "@/lib/validation";
import { EventData, EventFormState } from "@/types";

export async function updateEventAction(
  eventId: string,
  prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  try {


    const formatDateForDB = (dateString: string) => {
      
      const cleanDate = dateString.split("[")[0];

      return new Date(cleanDate).toISOString().split(".")[0] + "Z";
    };

    if (!eventId) {
      return { error: "Event ID is missing.", validationErrors: {} };
    }

    const rawData = {
      id: formData.get("id") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      startTime: formatDateForDB(formData.get("startTime") as string),
      endTime: formatDateForDB(formData.get("endTime") as string), 
      location: formData.get("location") as string,
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
      isFree: formData.get("isFree") === "true",
      ticketPrice: formData.get("isFree") === "true" ? 0 : Number(formData.get("ticketPrice")),
      createdBy: formData.get("createdBy") as string,
    };

    console.log("✅ Processed Data Before Validation:", rawData);

    // ✅ Validate data using Zod
    const validatedData = EventSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        error: "Validation failed.",
        validationErrors: validatedData.error.flatten().fieldErrors,
      };
    }

    console.log("✅ Data Passed Validation:", validatedData.data);


    // ✅ Update event in database
    await updateEvent(eventId, validatedData.data);

    // ✅ Revalidate cache and redirect
    revalidatePath("/dashboard");

    return { error: "", validationErrors: {}, success: true };

  } catch (error) {
    console.error("Error in updateEventAction:", error);

    return { error: "Failed to update event. Please try again.", validationErrors: {}, success: false };
  }
}
