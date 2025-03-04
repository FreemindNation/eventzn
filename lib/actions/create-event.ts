"use server";

import { revalidatePath } from "next/cache";

import { createEvent } from "@/lib/services/event-service";
import { EventSchema } from "@/lib/validation";
import { EventFormState } from "@/types";


export async function CreateEventAction(prevState: EventFormState, formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      startTime: formData.get("startTime") ? new Date(formData.get("startTime") as string).toISOString() : "",
      endTime: formData.get("endTime") ? new Date(formData.get("endTime") as string).toISOString() : "",
      location: formData.get("location") as string,
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
      isFree: formData.get("isFree") === "true",
      ticketPrice: formData.get("isFree") === "true" ? 0 : Number(formData.get("ticketPrice")),
      createdBy: formData.get("createdBy") as string,
    };



    const validatedData = EventSchema.safeParse(rawData);


    if (!validatedData.success) {
      console.error("Validation Errors:", validatedData.error.format());

      return {
        error: "Failed to create event.",
        validationErrors: validatedData.error.flatten().fieldErrors,
      };
    }


    
    await createEvent(validatedData.data);

    
    revalidatePath("/dashboard/events");
    
    return { error: "", validationErrors: {}, success: true, redirect:"/dashboard/events?created=true" };
  } catch (error) {
    console.error("Error in createEventAction:", error);
    
    return { error: "Failed to create event. Please try again.", validationErrors: {} };
  }
}
