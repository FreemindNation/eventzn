'use client';

import React from 'react'
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import  Image from "next/image"

import SignUpForm from "@/components/signup-form";


export default function SignUpPage() {
  

  const handleGoogleSignUp = () => {
    signIn("google", { callbackUrl: "/" }); // Redirect after Google sign-up
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg p-6 rounded">
      <Link href='/'>
        <Image
          alt="Eventzn Logo"
          className="mb-8"
          height={50}
          src="/assets/images/logo.png"
          width={150}
        />
      </Link>
        <h1 className="text-2xl font-semibold text-center mb-4">
          Create Your Account
        </h1>
        <SignUpForm />
        <div className="my-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Or sign up with
          </p>
          <button
            className="w-full bg-secondary-500 text-white py-2 rounded hover:bg-secondary-600 mt-2"
            onClick={handleGoogleSignUp}
          >
            Sign Up with Google
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link className="text-blue-500 hover:underline" href="/sign-in">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
