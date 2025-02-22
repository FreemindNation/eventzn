"use client";

import { Suspense } from "react";

import UsersPage from "@/components/users-page";

export default function UsersPageWrapper() {
  return (
    <Suspense fallback={<p>Loading Users...</p>}>
      <UsersPage />
    </Suspense>
  );
}
