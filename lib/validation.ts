import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address to continue." }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long." })
    .refine((password) => /[a-zA-Z]/.test(password), {
      message: "Password must contain at least one letter.",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number.",
    })
    .refine((password) => /[^a-zA-Z0-9]/.test(password), {
      message: "Password must contain at least one special character.",
    })
});


export const SignInSchema = z.object({
    email: z.string().email("Please enter a valid email address to continue."),
    password: z.string().min(1, {message: "Password is required." }), 
  });
  


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
  isFree: z.coerce.boolean(), 
  ticketPrice: z
    .preprocess(
      (val) => (val === "" || val === undefined ? 0 : Number(val)), 
      z.number()
    )
    .optional(),
  createdBy: z.string().min(1, "Created by user is required"),
})
.refine(
  (data) => new Date(data.startTime) >= new Date(), // Start time must be in the future
  {
    message: "Start time cannot be in the past",
    path: ["startTime"],
  }
)
.refine(
  (data) => new Date(data.endTime) > new Date(data.startTime), // End time must be after start time
  {
    message: "End time must be after start time",
    path: ["endTime"],
  }
)
.refine(
  (data) => {
    
    if (!data.isFree && (!data.ticketPrice || data.ticketPrice <= 0)) {
      return false;
    }

    return true;
  },
  {
    message: "If event is not free, ticket price must be greater than £0",
    path: ["ticketPrice"], 
  }
);
