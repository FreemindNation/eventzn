'use client';


import React, { useState } from 'react'
import { signIn } from "next-auth/react";
import Link from "next/link";

import SignInForm from "@/components/signin-form";


// export const metadata: Metadata = {
//   title: 'Sign in',
// };


export default function SignInPage() {

  const [isGoogleSigningIn, setGoogleSigningIn] = useState(false);

  const handleGoogleSignIn = () => {
    setGoogleSigningIn(true);
    signIn("google", { callbackUrl: "/" }); // Redirect after Google sign-up
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg p-6 rounded">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Sign In to Eventzn
        </h1>
        <SignInForm />
        <div className="my-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Or</p>
          <button
            className="w-full bg-secondary-500 text-white py-2 rounded hover:bg-secondary-600 mt-2"
            disabled={isGoogleSigningIn}
            onClick={handleGoogleSignIn} 
          >
            {isGoogleSigningIn ? "Redirecting..." : "Sign In with Google"}
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm">
            New to Eventzn?{" "}
            <Link className="text-primary-500 hover:underline" href="/sign-up">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 
