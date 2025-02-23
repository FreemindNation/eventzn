"use client";

import { useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Modal, ModalBody, ModalHeader, ModalContent } from "@heroui/modal";
import { Button } from "@heroui/button";
import Link from "next/link";

import { SignUpActionState } from "@/types";
import { signupAction } from "@/lib/actions/signup";

const initialState: SignUpActionState = {
  name: "",
  email: "",
  password: "",
  errors: {},
  redirectPath: "",
  success: false,
};

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState<
    SignUpActionState,
    FormData
  >(signupAction, initialState);

  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success) {
      setShowSuccess(true);
    }
  }, [state.success]);

  return (
    <>
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
            <p className="text-red-500 text-sm mt-2">{state.errors.name[0]}</p>
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
            <p className="text-red-500 text-sm mt-2">{state.errors.email[0]}</p>
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
            <ul className="text-red-500 text-sm mt-2">
              {state.errors.password.map((error, index) => (
                <li key={index}>. {error}</li>
              ))}
            </ul>
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
      </form>
      {/* Success Modal */}
      {showSuccess && ( <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)}>
        <ModalContent>
          <ModalHeader>🎉 Welcome to Eventzn!</ModalHeader>
          <ModalBody>
            <p>Your account was created successfully.</p>
            <p className="mt-2">Now please sign in to continue.</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="light" onPress={() => setShowSuccess(false)}>
                Close
              </Button>
              <Button as={Link} color="primary" href="/sign-in">
                Go to Sign In
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal> )}
    </>
  );
}
