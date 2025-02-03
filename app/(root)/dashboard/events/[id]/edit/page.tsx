

import { notFound } from "next/navigation";

import UpdateEventForm from "@/components/update-event-form";
import { getEvent } from "@/lib/services/event-service"; 


export default async function EditEventPage(props: { params : Promise<{ id: string }>}) {
  const params = await props.params;
  const  id  = await params.id;

  const event = await getEvent(id)

  if(!event) {
    return notFound();
  }
  
 

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <UpdateEventForm eventData={event} /> 
    </div>
  );
}
