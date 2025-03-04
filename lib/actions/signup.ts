"use server";

import bcrypt from "bcrypt";

import { SignUpSchema } from "../validation";

import prisma from "@/lib/prisma";
import { SignUpActionState } from "@/types";


export  async function signupAction(
    _prevState: SignUpActionState,
    formData: FormData
  ): Promise<SignUpActionState> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const redirectPath = formData.get("redirect") as string;
  
    // Validate fields using Zod safeParse
    const validatedFields = SignUpSchema.safeParse({ name, email, password });
  
    if (!validatedFields.success) {
      
      return {
        name,
        email,
        password,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
  
    try {
      
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return {
          name,
          email,
          errors: { email: ["User with this email already exists."] },
        };
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user in the database
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "USER", 
        },
      });

      return { redirectPath: redirectPath || "/", success: true};
      
    } catch (err) {
      console.error("Sign-up error:", err);

      return {
        name,
        email,
        errors: { general: ["An error occurred. Please try again later."] },
      };
    }
  }