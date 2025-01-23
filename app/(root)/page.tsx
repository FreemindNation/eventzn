import { Button } from "@heroui/button";
import Image from "next/image";

import EventsPage from "@/components/eventlist";



export default async function HomePage() {

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
          {/* Hero Image */}
          <Image
            priority
            alt="Hero Image"
            className="rounded-lg"
            height={1000}
            src="/hero.webp"
            width={1000}
          />
        </div>
      </section>

      {/* Events Section */}
      <section className="px-8 py-16" id="events">
      
        <EventsPage />
      </section>
    </div>
  );
}
