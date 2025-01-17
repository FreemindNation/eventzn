
import { Button } from "@heroui/button";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between bg-gray-50 dark:bg-gray-800 px-8 py-16">
        <div className="max-w-lg text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
            Discover Amazing Events
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Explore, connect, and make memories. Find events that match your
            interests and passions.
          </p>
          <Button
            as="a"
            className="mt-6"
            color="secondary"
            href="#events"
            size="lg"
          >
            Explore Events
          </Button>
        </div>
        <div className="w-full lg:w-1/2">
          {/* Placeholder for Hero Image */}
          <Image
          priority
          alt="Hero Image"
          className="rounded-lg" 
          height={800} 
          src='/hero.webp'
          width={1000} 
        />
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="px-8 py-16">
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Placeholder cards for events */}
          {[1, 2, 3, 4, 5, 6].map((event) => (
            <div
              key={event}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Event Title
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Event description or details go here. Keep it short and
                  engaging.
                </p>
                <Button
                  as="a"
                  href="#"
                  size="sm"
                  color="primary"
                  className="mt-4"
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Button size="sm" disabled>
            Previous
          </Button>
          <Button size="sm" className="mx-2">
            1
          </Button>
          <Button size="sm">Next</Button>
        </div>
      </section>
    </div>
  );
}
