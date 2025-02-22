"use client";

import { CalendarDaysIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Tabs, Tab } from "@heroui/tabs";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs
        fullWidth
        color="primary"
        selectedKey={pathname.includes("users") ? "users" : "events"}
        onSelectionChange={(key) => router.push(`/dashboard/${key}`)} // Navigates between routes
      >
         <Tab
          key="events"
          title={
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="w-5 h-5" />
              <span>Events</span>
            </div>
          }
        />
        <Tab
          key="users"
          title={
            <div className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5" />
              <span>Users</span>
            </div>
          }
        />
      </Tabs>

      <div className="mt-6">{children}</div>
    </div>
  );
}
