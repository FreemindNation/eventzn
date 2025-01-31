
// "use server";

// import { revalidatePath } from "next/cache";
// import { createEvent } from "@/lib/services/event-service";
// import { redirect } from "next/navigation";
// import { EventSchema } from "@/lib/validation";

// export async function createEventAction(prevState: any, formData: FormData) {
//   try {
//     const rawData = {
//       title: formData.get("title") as string,
//       description: formData.get("description") as string,
//       startTime: formData.get("startTime") as string,
//       endTime: formData.get("endTime") as string,
//       location: formData.get("location") as string,
//       category: formData.get("category") as string,
//       imageUrl: formData.get("imageUrl") as string,
//       isFree: formData.get("isFree") === "true",
//       ticketPrice: formData.get("isFree") === "true" ? 0 : Number(formData.get("ticketPrice")),
//       createdBy: formData.get("createdBy") as string,
//     };

//     // ✅ Validate the form data using Zod
//     const validatedData = EventSchema.safeParse(rawData);

//     if (!validatedData.success) {
//       return {
//         error: "Validation failed. Please check your inputs.",
//         validationErrors: validatedData.error.flatten().fieldErrors,
//       };
//     }

//     // ✅ Save event to database
//     await createEvent(validatedData.data);

//     // ✅ Refresh dashboard and redirect
//     revalidatePath("/dashboard");
//     redirect("/dashboard");
//   } catch (error) {
//     console.error("Error in createEventAction:", error);
//     return { error: "Failed to create event. Please try again." };
//   }
// }





// function validateEventData(event: {
//     isFree: boolean;
//     ticketPrice?: number | null;
//     startTime: Date;
//     endTime: Date;
//   }): void {
//     if (event.isFree && event.ticketPrice !== null) {
//       throw new Error("Ticket price must be null if the event is free.");
//     }
  
//     if (new Date(event.startTime) >= new Date(event.endTime)) {
//       throw new Error("Start time must be before end time.");
//     }
//   }