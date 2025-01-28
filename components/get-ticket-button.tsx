import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";

export default function GetTicketButton({ eventId }: { eventId: string }) {
  const router = useRouter();

  const handleGetTicket = () => {
    router.push(`/sign-up?redirect=/events/${eventId}`);
  };

  return (
    <Button
      className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      onPress={handleGetTicket}
    >
      Get Ticket
    </Button>
  );
}
