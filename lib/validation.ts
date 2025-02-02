import { z } from "zod";

export const SignUpSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter." })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      })
      .trim(),
  });

export const SignInSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(1, {message: "Password is required." }), 
  });
  


// export const EventSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters"),
//   description: z.string().optional(),
//   startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
//     message: "Invalid date format",
//   }),
//   endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
//     message: "Invalid date format",
//   }),
//   location: z.string().min(3, "Location must be at least 3 characters"),
//   category: z.string().min(1, "Category is required"),
//   imageUrl: z.string().url("Invalid image URL").optional(),
//   isFree: z.boolean(),
//   ticketPrice: z
//   .number()
//   .min(1, "Ticket price must be at least £1")
//   .optional()
//   .transform((val) => val ?? 0), // Ensures undefined values become 0
//   createdBy: z.string().min(1, "Created by user is required"),
// });


export const EventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  location: z.string().min(3, "Location must be at least 3 characters"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Invalid image URL").or(z.literal("")).optional(),
  isFree: z.coerce.boolean(), // ✅ Convert from string "true"/"false" to boolean
  ticketPrice: z
    .preprocess(
      (val) => (val === "" || val === undefined ? 0 : Number(val)), // ✅ Convert empty string to 0
      z.number()
    )
    .optional(),
  createdBy: z.string().min(1, "Created by user is required"),
}).refine(
  (data) => {
    // ✅ If event is not free, ticketPrice must be greater than 0
    if (!data.isFree && (!data.ticketPrice || data.ticketPrice <= 0)) {
      return false;
    }

    return true;
  },
  {
    message: "If event is not free, ticket price must be greater than £0",
    path: ["ticketPrice"], // ✅ Attach error message to `ticketPrice` field
  }
);
