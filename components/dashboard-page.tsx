"use client";

import { useState, useEffect } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardHeader, CardBody } from "@heroui/card";
import {
  UsersIcon,
  CalendarDaysIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";

import EventsTable from "@/components/events-table";
import EventSearchFilter from "@/components/event-search-filter";
import { fetchFilteredEvents } from "@/lib/data";
import PaginationControls from "@/components/pagination";
import UsersTable from "@/components/users-table";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams?.get("page") || "1", 10);
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "All";

  const [selectedTab, setSelectedTab] = useState<string>("events");
  const [events, setEvents] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showDeletedAlert, setShowDeletedAlert] = useState(
    searchParams.get("deleted") === "true"
  );

 
  useEffect(() => {
    if (selectedTab === "events") {
      setLoading(true);
      fetchFilteredEvents(query, category, currentPage)
        .then(({ events, totalEvents }) => {
          setEvents(events);
          setTotalPages(Math.ceil(totalEvents / 6));
        })
        .catch((error) => console.error("Error fetching events:", error))
        .finally(() => setLoading(false));
    }
  }, [selectedTab, query, category, currentPage]);


  useEffect(() => {
    if (showDeletedAlert) {
      router.replace("/dashboard", { scroll: false });
    }
  }, [showDeletedAlert, router]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs
        fullWidth
        color="primary"
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key as string)}
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

      
      <Card className="mt-6">
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {selectedTab === "events" ? "Manage Events" : "Manage Users"}
          </h2>

          {selectedTab === "events" && (
            <Button
              as={Link}
              color="primary"
              href="/dashboard/events/create"
              startContent={<PlusIcon className="w-5 h-5" />}
              variant="solid"
            >
              Create Event
            </Button>
          )}
        </CardHeader>

        <CardBody>
          
          {showDeletedAlert && (
            <Alert className="mb-4" color="success" onClose={() => setShowDeletedAlert(false)}>
              Event deleted successfully.
            </Alert>
          )}

          {selectedTab === "events" ? (
            <>
              <EventSearchFilter />
              {loading ? <p>Loading events...</p> : <EventsTable events={events} />}
            </>
          ) : (
            <UsersTable />
          )}
        </CardBody>
      </Card>

      <PaginationControls totalPages={totalPages} />
    </div>
  );
}
