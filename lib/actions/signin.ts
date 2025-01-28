"use server";

import { signIn } from "next-auth/react";
import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."), // Ensure password is not empty
});

export async function authenticateAction(
  _prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate input fields
  const validatedFields = SignInSchema.safeParse({ email, password });
  
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors.email?.[0] || "Invalid input." };
  }

  // Use NextAuth `signIn` to authenticate
  const result = await signIn("credentials", {
    redirect: false, // Prevent automatic redirection
    email,
    password,
  });

  if (result?.error) {
    return { error: result.error }; // Return authentication error
  }

  return { error: null }; // Successful sign-in
}
