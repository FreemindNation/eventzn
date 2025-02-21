"use client";

import { useActionState } from "react";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authenticateAction } from "@/lib/actions/signin";
import { SignInState } from "@/types";

const initialState = {
  error: null,
  submitted: false,
  user: undefined,
};

export default function SignInForm() {
  const [state, action, isPending] = useActionState<SignInState, FormData>(
    authenticateAction,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (state.submitted && state.user) {
      signIn("credentials", {
        email: state.user.email,
        password: state.user.password,
        redirect: false,
      }).then((response) => {
        if (response?.error) {
          console.error("Sign in error:", response.error);
        } else {
          router.push("/");
          router.refresh();
        }
      });
    }
  }, [state.submitted, state.user, router]);

  return (
    <form action={action}>
      <div className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input
            required
            className="w-full p-2 border rounded"
            id="email"
            name="email"
            type="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            required
            className="w-full p-2 border rounded"
            id="password"
            name="password"
            type="password"
          />
        </div>
        {state.error && <p className="text-red-500 mt-2">{state.error}</p>}
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </form>
  );
}
