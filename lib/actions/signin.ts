"use server";

import bcrypt from "bcrypt";

import { SignInSchema } from "../validation";

import { SignInState } from "@/types";
import prisma from "@/lib/prisma";


export async function authenticateAction(
  prevState: SignInState,
  formData: FormData
): Promise<SignInState> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate input fields
    const validatedFields = SignInSchema.safeParse({ email, password });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors.email?.[0] || "Invalid input.",
        submitted: false,
      };
    }

    // Check if the user exists in the database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return { error: "Invalid email or password", submitted: false };
    }

    // Validate the password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return { error: "Invalid email or password", submitted: false };
    }
    

    // Successful sign-in
    return { 
      error: null,
      submitted: true,
      user: { email, password }
    };
  } catch (error) {
    console.error("Authentication error:", error);

    return { error: "An unexpected error occurred during sign in", submitted: false };
  }
}
