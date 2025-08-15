import { Card } from "@/components/ui/card"
import Header from "@/components/header"

export default function NotificationsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4 sm:py-8">
        <h1 className="text-2xl font-bold mb-4 sm:mb-6">Notifications</h1>
        <Card className="p-3 sm:p-4 mb-4">
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full" />
            <div>
              <h3 className="font-semibold mb-1">Booking Reminder</h3>
              <p className="text-gray-600 mb-2">
                You have a booking scheduled for Documents on August 17, 2025 at 12:00 PM
              </p>
              <p className="text-sm text-gray-500">
                {new Date("2025-08-17T12:00:00").toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </main>
    </>
  )
}