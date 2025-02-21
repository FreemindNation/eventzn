"use client";

import React from 'react'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { UserIcon } from "@heroicons/react/24/outline"
import { capitaliseFirstWord } from '@/lib/utils';



// export const metadata: Metadata = {
//   title: 'Profile',
// };


export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) return;

    const fetchUserEvents = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load events.");
        }

        setEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, [session]);

  if (status === "loading") return <p>Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 dark:bg-transparent shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Your Account Details</h1>
      <div className="flex items-center gap-4 mb-6">
        {session?.user?.image ? (
          <Image
            alt="Profile Picture"
            className="rounded-full"
            height={80}
            src={session.user.image}
            width={80}
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <UserIcon className="w-10 h-10 text-gray-500" />
          </div>
        )}
        <div>
          <p className="text-xl font-bold">{session?.user?.name || "User"}</p>
          <p className="text-gray-600">{session?.user?.email}</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Your Events</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500">You have not registered for any events yet.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-900 transition-all duration-300 border border-transparent hover:border-purple-500 hover:shadow-purple-500/50 flex items-center gap-4">
              {event.imageUrl && (
                <Image
                  alt={event.title}
                  className="rounded-md"
                  height={80}
                  src={event.imageUrl}
                  width={80}
                />
              )}
              <div>
                <h3 className="font-semibold">{capitaliseFirstWord(event.title)}</h3>
                <p className="text-sm text-gray-500">
                  {event.startTime} - {event.endTime}
                </p>
                <p className="text-sm">{event.location}</p>
              </div>
              <Button
                as="a"
                color="primary"
                href={`/events/${event.id}`}
                variant="light"
              >
                View Event
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
