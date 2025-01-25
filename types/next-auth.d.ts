// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: string; // Add custom fields here
    };
  }

  interface User {
    id: string;
    email: string;
    name: string | null;
    role: string;
    password?: string; // Optional if using Credentials Provider
  }

  interface JWT {
    id: string;
    email: string;
    name: string | null;
    role: string;
  }
}
