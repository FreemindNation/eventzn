
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/button";

import { formatDate, formatPrice } from "@/lib/utils"
import { fetchEvent } from "@/lib/data";


export default async function EventPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id }  = params;
  const event = await fetchEvent(id);

  
  
  
  if (!event) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500">Event not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 min-h-screen my-20">
      <div className="w-full h-64 md:h-96 bg-gray-300 mb-8 ">
        <Image
          alt={event.title}
          className="w-full h-full object-cover"
          height={920}
          src={event.imageUrl || "/placeholder.jpg"}
          width={450}
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">{event.title}</h1>
          <div className="text-gray-700">
            <h2 className="text-lg font-bold mb-2">Date and Time</h2>
            <p>{formatDate(event.startTime)} - {formatDate(event.endTime)}</p>
          </div>
          <div className="text-gray-700">
            <h2 className="text-lg font-bold mb-2">Location</h2>
            <p>{event.location}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About this event</h2>
            <p className="text-gray-600">{event.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Organiser</h2>
            <p className="text-gray-600">{event.createdBy || "Unknown"}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 space-y-6">
          <div>
            <h4 className="text-2xl font-bold text-gray-800">
              {event.isFree ? "Free" : formatPrice(event.ticketPrice) || 0}
            </h4>
          </div>
          <Button as={Link} className="w-full bg-blue-500 text-white text-lg font-medium py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400" href={`/events/${id}/signup`}>
            Get Tickets
          </Button>
        </div>
      </div>
    </div>
  );
}
