"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { authenticateAction } from "@/lib/actions/signin";

export default function SignInForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    authenticateAction,
    { error: null }
  );

  useEffect(() => {
    if (!state.error && !isPending) {
      router.push("/"); // Redirect to the home page or any other page
    }
  }, [state.error, isPending, router]);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <input
          required
          className="border p-2 w-full"
          name="email"
          placeholder="Email"
          type="email"
        />
      </div>
      <div>
        <input
          required
          className="border p-2 w-full"
          name="password"
          placeholder="Password"
          type="password"
        />
      </div>
      <button
        className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Signing In..." : "Sign In"}
      </button>
      {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
    </form>
  );
}
