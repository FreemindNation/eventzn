"use client";

import { signOut } from "next-auth/react";
import { Button } from "@heroui/button";

export default function SignOutButton() {
  return (
    <Button
      className=" dark:text-white text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 px-4 py-2"
      color="danger"
      onPress={() => signOut()}
    >
      Sign Out
    </Button>
  );
}
