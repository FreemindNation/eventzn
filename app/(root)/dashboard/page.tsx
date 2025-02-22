import { redirect } from "next/navigation";

export default function DashboardPageWrapper() {
  redirect("/dashboard/events");
}
