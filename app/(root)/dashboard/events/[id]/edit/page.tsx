

import { notFound } from "next/navigation";

import UpdateEventForm from "@/components/update-event-form";
import { getEvent } from "@/lib/services/event-service"; 


export default async function EditEventPage(props: { params : { id: string }}) {
  const params = await props.params;
  const { id } = await params;

  const event = await getEvent(id)

  if(!event) {
    return notFound();
  }
  
  
  console.log(event, '<-- event');
  
  
 

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <UpdateEventForm eventData={event} /> {/* ✅ Pass event data to the form */}
    </div>
  );
}
