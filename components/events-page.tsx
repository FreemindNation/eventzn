"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";

import EventsTable from "@/components/events-table";
import EventSearchFilter from "@/components/event-search-filter";
import { fetchFilteredEvents } from "@/lib/data";


export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams?.get("page") || "1", 10);
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "All";
  const limit = 6;
  
  const [events, setEvents] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { events, totalEvents } = await fetchFilteredEvents(query, category, currentPage);

        setEvents(events);
        setTotalPages(Math.ceil(totalEvents / limit));
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); 
      }
    };
  
    fetchEvents();
  }, [query, category, currentPage]);

  const clearSuccessMessage = () => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete("created");
    newParams.delete("updated");
    newParams.delete("deleted");
    
    router.replace(`/dashboard/events?${newParams.toString()}`, { scroll: false });
    setAlertMessage(null);
    setShowAlert(false);
  };
  
  useEffect(() => {
    const created = searchParams.get("created") === "true";
    const updated = searchParams.get("updated") === "true";
    const deleted = searchParams.get("deleted") === "true";

    if (created) setAlertMessage("Event created successfully!");
    if (updated) setAlertMessage("Event updated successfully!");
    if (deleted) setAlertMessage("Event deleted successfully!");

    if (created || updated || deleted) {
      setShowAlert(true);
    }
  }, [searchParams]);

  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>

      <Card className="mt-6">
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Events</h2>
          <Button
            as={Link}
            color="primary"
            href="/dashboard/events/create"
            startContent={<PlusIcon className="w-5 h-5" />}
            variant="solid"
          >
            Create Event
          </Button>
        </CardHeader>

        <CardBody>
           {/*Show success messages */}
           {showAlert && alertMessage && (
            <Alert className="mb-4" color="success" onClose={clearSuccessMessage}>
              {alertMessage}
            </Alert>
          )}
          <EventSearchFilter />
          {loading ? <p>Loading events...</p> : <EventsTable events={events} totalPages={totalPages} />}
        </CardBody>
      </Card>
    </div>
  );
}
