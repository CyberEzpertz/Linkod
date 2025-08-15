"use client";

import BackNavBar from "@/components/back-nav-bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AppointmentPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <BackNavBar title="My Appointments" />
      <div className="w-full max-w-2xl space-y-8 p-8">
        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">
              Upcoming Appointments
            </h2>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="font-medium">August 17, 2025</div>
                <div className="text-gray-500">12:00 PM</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button asChild className="w-full max-w-md">
              <Link href="/appointment/book">Book New Appointment</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
