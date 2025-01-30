"use client";

import { useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { UsersIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState<string>("events"); 

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs fullWidth color="primary" selectedKey={selectedTab} onSelectionChange={(key) => setSelectedTab(key as string)}>
        <Tab key="events" title={
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="w-5 h-5" />
            <span>Events</span>
          </div>
        }
        />
        <Tab key="users" title={
          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5" />
            <span>Users</span>
          </div>
        }
        />
      </Tabs>
      <Card className="mt-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">
            {selectedTab === "events" ? "Manage Events" : "Manage Users"}
          </h2>
        </CardHeader>
        <CardBody>
          {selectedTab === "events" ? (
            <p className="text-gray-600">Here you will manage all events (coming soon).</p>
          ) : (
            <p className="text-gray-600">Here you will manage all users (coming soon).</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
