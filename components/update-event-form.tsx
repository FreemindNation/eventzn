"use client";

import { useActionState, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { Select, SelectItem } from "@heroui/select";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Link } from "@heroui/link";
import { useRouter } from "next/navigation";
import { Form } from "@heroui/form";
import { parseAbsoluteToLocal } from "@internationalized/date"

import { EventFormState } from "@/types";
import { updateEventAction, } from "@/lib/actions/update-event";


interface UpdateEventFormProps {
  eventData: {
    id: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    location: string;
    category: string;
    imageUrl?: string;
    isFree: boolean;
    ticketPrice?: number;
    createdBy: string;
  };
}

const initialState: EventFormState = {
  error: "",
  validationErrors: {},
  success: false,
  redirect: "", 
};

export default function UpdateEventForm({ eventData }: UpdateEventFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isFree, setIsFree] = useState(eventData.isFree);
  const updateEventWithId = updateEventAction.bind(null, eventData.id)

  const [state, action, isPending] = useActionState<EventFormState, FormData>(
    updateEventWithId,
    initialState
  );
  

  useEffect(() => {
    if (state.success && state.redirect) {
      router.push(state.redirect);
    }
  }, [state.success, state.redirect, router]);

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold">Update Event</h2>
      </CardHeader>
      <CardBody>
        <Form action={action} className="space-y-4">
          <Input
            isRequired
            defaultValue={eventData.title}
            label="Title"
            name="title"
            type="text"
            onKeyDown={() => {}}
          />
          {state.validationErrors?.title && (
            <p className="text-red-500 text-sm">{state.validationErrors.title[0]}</p>
          )}

          <Textarea
            defaultValue={eventData.description}
            label="Description"
            name="description"
            onKeyDown={() => {}}
          />

          <DatePicker
            isRequired
            //@ts-ignore
            defaultValue={parseAbsoluteToLocal(eventData.startTime.toISOString())}
            granularity="minute"
            label="Start Time"
            name="startTime"

          />
          {state.validationErrors?.startTime && (
            <p className="text-red-500 text-sm">{state.validationErrors.startTime[0]}</p>
          )}

          <DatePicker
            isRequired
            //@ts-ignore
            defaultValue={parseAbsoluteToLocal(eventData.endTime.toISOString())}
            granularity="minute"
            label="End Time"
            name="endTime"
          />
          {state.validationErrors?.endTime && (
            <p className="text-red-500 text-sm">{state.validationErrors.endTime[0]}</p>
          )}

          <Input
            isRequired
            defaultValue={eventData.location}
            label="Location"
            name="location"
            onKeyDown={() => {}}
          />
          {state.validationErrors?.location && (
            <p className="text-red-500 text-sm">{state.validationErrors.location[0]}</p>
          )}

          <Select isRequired defaultSelectedKeys={[eventData.category]} label="Category" name="category">
            <SelectItem key="Music">Music</SelectItem>
            <SelectItem key="Sports">Sports</SelectItem>
            <SelectItem key="Technology">Technology</SelectItem>
            <SelectItem key="Comedy">Comedy</SelectItem>
          </Select>
          {state.validationErrors?.category && (
            <p className="text-red-500 text-sm">{state.validationErrors.category[0]}</p>
          )}

          <Input
            defaultValue={eventData.imageUrl}
            label="Image URL"
            name="imageUrl"
            type="url"
            onKeyDown={() => {}}
          />
          {state.validationErrors?.imageUrl && (
            <p className="text-red-500 text-sm">{state.validationErrors.imageUrl[0]}</p>
          )}

          <Select
            isRequired
            defaultSelectedKeys={[eventData.isFree ? "true" : "false"]}
            label="Is the event free?"
            name="isFree"
            onChange={(e) => setIsFree(e.target.value === "true")}
          >
            <SelectItem key="true">Yes</SelectItem>
            <SelectItem key="false">No</SelectItem>
          </Select>
          {state.validationErrors?.isFree && (
            <p className="text-red-500 text-sm">{state.validationErrors.isFree[0]}</p>
          )}

          {!isFree && (
            <div>
              <Input
                defaultValue={(eventData.ticketPrice?.toFixed(2))}
                label="Ticket Price"
                name="ticketPrice"
                type="number"
                onKeyDown={() => {}}
              />
              {state.validationErrors?.ticketPrice && (
                <p className="text-red-500 text-sm">{state.validationErrors.ticketPrice[0]}</p>
              )}
            </div>
          )}
          
          {!session?.user?.id && (
            <p className="text-red-500 text-sm">Error: Could not determine event creator.</p>
          )}
          <input name="createdBy" type="hidden" value={session?.user?.id || ""} />

          {state.error && <p className="text-red-500">{state.error}</p>}

          <CardFooter className="flex gap-4">
            <Button color="primary" disabled={isPending} type="submit">
              {isPending ? "Updating..." : "Update Event"}
            </Button>
            <Button as={Link} color="secondary" href="/dashboard" type="button">
              Cancel
            </Button>
          </CardFooter>
        </Form>
      </CardBody>
    </Card>
  );
}
