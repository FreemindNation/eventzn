"use client";

import { useState, useEffect } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { UsersIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";

import EventsTable from "@/components/events-table";
import EventSearchFilter from "@/components/event-search-filter";
import { fetchFilteredEvents } from "@/lib/data";
import PaginationControls from "@/components/pagination";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams?.get("page") || "1", 10);
  const [totalPages, setTotalPages] = useState(1);
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "All";

  const [selectedTab, setSelectedTab] = useState<string>("events");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedTab === "events") {
      fetchData();
    }
  }, [currentPage, query, category, selectedTab]);

  
  const fetchData = async () => {
    setLoading(true);
    try {
      const { events, totalEvents } = await fetchFilteredEvents(query, category, currentPage);

      setEvents(events);
      setTotalPages(Math.ceil(totalEvents / 6));
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

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
            <>
              <EventSearchFilter />
              {loading ? <p>Loading events...</p> : <EventsTable events={events} />}
            </>
          ) : (
            <p className="text-gray-600">Here you will manage all users (coming soon).</p>
          )}
        </CardBody>
      </Card>
      <PaginationControls totalPages={totalPages} />
    </div>
  );
}
