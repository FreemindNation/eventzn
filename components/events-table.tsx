"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import Image from "next/image";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@heroui/link";

import PaginationControls from "./pagination";

import { capitaliseFirstWord, formatPrice } from "@/lib/utils";



const columns = [
  { name: "Image", uid: "image" },
  { name: "Event Name", uid: "name" },
  { name: "Ticket Price", uid: "ticketPrice" },
  { name: "Date Created", uid: "createdAt" },
  { name: "Category", uid: "category" },
  { name: "Booked Tickets", uid: "bookedTickets" },
  { name: "Actions", uid: "actions" },
];

export default function EventsTable({ events, totalPages }: { events: any[]; totalPages: number }) {
  return (
    <div>
      <Table aria-label="Events Table">
        <TableHeader className="text-xl font-bold">
          {columns.map((col) => (
            <TableColumn key={col.uid}>{col.name}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                {event.imageUrl ? (
                  <Image
                    alt={event.title}
                    className="rounded-md"
                    height={50}
                    src={event.imageUrl}
                    width={50}
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </TableCell>
              <TableCell className="font-medium">{capitaliseFirstWord(event.title)}</TableCell>
              <TableCell>
                {event.isFree ? "Free" : `${formatPrice(event.ticketPrice)}`}
              </TableCell>
              <TableCell>
                {new Date(event.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{event.category}</TableCell>
              <TableCell>{event.registrations || 0}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Tooltip content="View Event">
                    <Button
                      isIconOnly
                      as="a"
                      href={`/events/${event.id}`}
                      variant="light"
                    >
                      <EyeIcon className="w-5 h-5 text-primary" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Edit Event">
                    <Button
                      isIconOnly
                      as="a"
                      href={`/dashboard/events/${event.id}/edit`}
                      variant="light"
                    >
                      <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                    </Button>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete Event">
                    <Button isIconOnly as={Link} color="danger" href={`/dashboard/events/${event.id}/delete`} variant="light">
                      <TrashIcon className="w-5 h-5 text-red-500" />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationControls totalPages={totalPages} />
    </div>
  );
}
