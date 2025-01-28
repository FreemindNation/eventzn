"use client";

import { useActionState, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { signupAction } from "@/lib/actions/signup";
import { SignUpActionState } from "@/types";

const initialState: SignUpActionState = {
  name: "",
  email: "",
  password: "",
  errors: {},
  redirectPath: "",
  success: false,
};

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState<SignUpActionState, FormData>( // ✅ FIXED HERE
    signupAction,
    initialState
  );

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const [showSuccess, setShowSuccess] = useState(false);


  useEffect(() => {
    if (state.redirectPath && state.success) {
      setShowSuccess(true); // Show success feedback
      setTimeout(() => {
        router.push(state.redirectPath || '/'); // Redirect after showing feedback
      }, 2000);
    }
  }, [state.redirectPath, state.success, router]);


  

  //   if (state?.redirectPath) {
  //     router.push(state.redirectPath); // ✅ Now TypeScript understands redirectPath exists
    
  // };

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <input
          className="border p-2 w-full"
          defaultValue={state.name}
          name="name"
          placeholder="Name"
          type="text"
        />
        {state.errors?.name && (
          <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
        )}
      </div>
      <div>
        <input
          className="border p-2 w-full"
          defaultValue={state.email}
          name="email"
          placeholder="Email"
          type="email"
        />
        {state.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
        )}
      </div>
      <div>
        <input
          className="border p-2 w-full"
          name="password"
          placeholder="Password"
          type="password"
        />
        {state.errors?.password && (
          <p className="text-red-500 text-sm">{state.errors.password[0]}</p>
        )}
      </div>
      <input name="redirect" type="hidden" value={redirectPath} />
      <button
        className="bg-primary-600 text-white p-2 rounded disabled:opacity-50"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Submitting..." : "Sign Up"}
      </button>
      {state.errors?.general && (
        <p className="text-red-500 text-sm">{state.errors.general[0]}</p>
      )}
      {state.success && showSuccess && <p className="text-green-500">Sign-up successful! Redirecting...</p>}
    </form>
  );
}
