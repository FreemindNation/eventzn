import Image from "next/image";

export default function EventPage() {
  // Placeholder data
  const placeholderEvents = [
    {
      id: "1",
      title: "Community Meetup",
      description: "A meetup for the community to connect.",
      date: "2023-12-01",
      location: "Town Hall",
      image: "/placeholder.jpg", // Replace with an actual image path later
    },
    {
      id: "2",
      title: "Workshop: Intro to Programming",
      description: "A beginner-friendly programming workshop.",
      date: "2023-12-05",
      location: "Community Center",
      image: "/placeholder.jpg", // Replace with an actual image path later
    },
    {
      id: "3",
      title: "Music Night",
      description: "Enjoy live music performances.",
      date: "2023-12-10",
      location: "City Park Amphitheatre",
      image: "/placeholder.jpg", // Replace with an actual image path later
    },
  ];

  return (
    <div className="container mx-auto px-8 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {placeholderEvents.map((event) => (
          <div
            key={event.id}
            className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800"
          >
            <Image
              alt={event.title}
              className="w-full h-48 object-cover rounded-md"
              height={150}
              src={event.image}
              width={200}
            />
            <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              {event.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {event.description}
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Date: {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Location: {event.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
