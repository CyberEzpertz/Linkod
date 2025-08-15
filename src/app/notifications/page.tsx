import { Card } from "@/components/ui/card";
import Header from "@/components/header";

export default function NotificationsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4 sm:py-8">
        <h1 className="mb-4 text-2xl font-bold sm:mb-6">Notifications</h1>
        <Card className="mb-4 p-3 sm:p-4">
          <div className="flex items-start gap-4">
            <div className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
            <div>
              <h3 className="mb-1 font-semibold">Booking Reminder</h3>
              <p className="mb-2 text-gray-600">
                You have a booking scheduled for Documents on August 17, 2025 at
                12:00 PM
              </p>
              <p className="text-sm text-gray-500">
                {new Date("2025-08-17T12:00:00").toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
}