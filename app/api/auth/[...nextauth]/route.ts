import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/lib/prisma";


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/sign-up", // Redirect unauthenticated users here
    error: "/auth/error", // Redirect for errors
    newUser: "/", // Redirect new users to home
  },
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password are required.");
        }

        const { email, password } = credentials;

        // Find user by email
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new Error("No user found with this email.");
        }

        if (!user.password) {
          throw new Error("This account is registered via Google. Please sign in with Google.");
        }

        // Compare hashed passwords
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          throw new Error("Incorrect password.");
        }

        // Return user object on successful authentication
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? "Unknown User",
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      // Now TypeScript knows the structure of `session.user`
      session.user = {
        id: token.id as string, // TypeScript now understands this
        email: token.email as string,
        name: token.name as string,
        role: token.role as string,
      };
  
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Ensure URLs are within your app
      if (url.startsWith(baseUrl)) {
        return url;
      }

      return baseUrl; // Default to base URL if redirect URL is invalid
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
