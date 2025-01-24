import { Button } from "@heroui/button";
import Link from "next/link";

const events = [
  { id: "1", title: "Event 1", date: "2024-02-01", location: "London" },
  { id: "2", title: "Event 2", date: "2024-02-15", location: "Manchester" },
  { id: "3", title: "Event 3", date: "2024-03-01", location: "Birmingham" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Event Dashboard</h1>

      {/* Create Event Button */}
      <Button
        as={Link}
        href="/dashboard/events/create"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Create New Event
      </Button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Events</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="border border-gray-300 px-4 py-2">{event.title}</td>
                <td className="border border-gray-300 px-4 py-2">{event.date}</td>
                <td className="border border-gray-300 px-4 py-2">{event.location}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Button
                    as={Link}
                    href={`/dashboard/events/${event.id}/update`}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </Button>
                  <Button
                    as={Link}
                    href={`/dashboard/events/${event.id}/delete`}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
